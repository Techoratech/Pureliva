import { Product } from "../models/Product.js";
import { Order, IOrder, IOrderItem } from "../models/Order.js";
import { getNextOrderNumber } from "../models/Counter.js";
import { ApiError } from "../utils/ApiError.js";
import { mailService } from "./mail.service.js";

export interface CreateOrderInput {
  customer: {
    name: string;
    phone: string;
    email?: string;
  };
  address: {
    line1: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: Array<{
    slug: string;
    quantity: number;
  }>;
  paymentMethod: "COD" | "WhatsApp" | "Online";
  notes?: string;
}

export async function processAndCreateOrder(input: CreateOrderInput): Promise<{
  order: IOrder;
  whatsappMessage: string;
}> {
  // 1. Fetch products from DB by slugs to verify validity, price, and stock
  const slugs = input.items.map((i) => i.slug);
  const dbProducts = await Product.find({ slug: { $in: slugs }, isActive: true });

  const productMap = new Map(dbProducts.map((p) => [p.slug, p]));

  // Verify all requested items exist
  const snapshotItems: IOrderItem[] = [];
  let subtotal = 0;

  for (const item of input.items) {
    const product = productMap.get(item.slug);
    if (!product) {
      throw new ApiError(400, `Product not found or unavailable: ${item.slug}`);
    }

    if (product.stock < item.quantity) {
      throw new ApiError(
        400,
        `Insufficient stock for "${product.name}". Available: ${product.stock}, requested: ${item.quantity}`
      );
    }

    const unitPrice = product.price; // Recomputed from server DB, ignoring client price
    const itemSubtotal = unitPrice * item.quantity;
    subtotal += itemSubtotal;

    snapshotItems.push({
      productId: product._id.toString(),
      slug: product.slug,
      title: product.titleWithVariant,
      sku: product.sku,
      quantity: item.quantity,
      unitPrice,
    });
  }

  // Calculate shipping (Free shipping on all orders or above 499)
  const shippingCharge = 0;
  const total = subtotal + shippingCharge;

  // 2. Generate sequential atomic order number (e.g. PUR-2026-000123)
  const orderNumber = await getNextOrderNumber();

  // 3. Create Order document
  const order = new Order({
    orderNumber,
    customer: {
      name: input.customer.name,
      phone: input.customer.phone,
      email: input.customer.email || undefined,
    },
    address: {
      line1: input.address.line1,
      city: input.address.city,
      state: input.address.state,
      pincode: input.address.pincode,
    },
    items: snapshotItems,
    subtotal,
    shippingCharge,
    total,
    paymentMethod: input.paymentMethod || "WhatsApp",
    paymentStatus: "pending",
    status: "new",
    statusHistory: [
      {
        status: "new",
        note: "Order placed via website",
        at: new Date(),
      },
    ],
    notes: input.notes,
    source: "website",
  });

  await order.save();

  // 4. Atomically decrement stock
  for (const item of snapshotItems) {
    await Product.findByIdAndUpdate(item.productId, {
      $inc: { stock: -item.quantity },
    });
  }

  // 5. Send order notification emails asynchronously
  mailService.sendOrderEmailsAsync({
    orderNumber: order.orderNumber,
    customerName: order.customer.name,
    customerPhone: order.customer.phone,
    customerEmail: order.customer.email,
    address: order.address,
    items: order.items.map((i) => ({
      title: i.title,
      quantity: i.quantity,
      unitPrice: i.unitPrice,
    })),
    subtotal: order.subtotal,
    shippingCharge: order.shippingCharge,
    total: order.total,
    paymentMethod: order.paymentMethod,
    status: order.status,
    createdAt: order.createdAt,
  });

  // 6. Build WhatsApp text message for the client
  const itemsText = snapshotItems.map((i) => `• ${i.quantity}x ${i.title}`).join("\n");
  const whatsappMessage = [
    `Hello Pureliva, I have placed order *#${orderNumber}* on your website!`,
    "",
    `*Customer:* ${order.customer.name}`,
    `*Phone:* ${order.customer.phone}`,
    `*Delivery City:* ${order.address.city} (${order.address.pincode})`,
    "",
    "*Items:*",
    itemsText,
    "",
    `*Total:* ₹${total}`,
    `*Payment Method:* ${order.paymentMethod}`,
    "",
    "Please confirm my order and share delivery schedule.",
  ].join("\n");

  return {
    order,
    whatsappMessage,
  };
}
