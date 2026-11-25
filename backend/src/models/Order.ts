import mongoose, { Document, Schema } from "mongoose";

export interface IOrderItem {
  productId: string;
  slug: string;
  title: string;
  sku: string;
  quantity: number;
  unitPrice: number;
}

export interface IOrderStatusHistory {
  status: "new" | "confirmed" | "packed" | "shipped" | "delivered" | "cancelled";
  note?: string;
  at: Date;
}

export interface IOrder extends Document {
  orderNumber: string;
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
  items: IOrderItem[];
  subtotal: number;
  shippingCharge: number;
  total: number;
  paymentMethod: "COD" | "WhatsApp" | "Online";
  paymentStatus: "pending" | "paid" | "failed";
  status: "new" | "confirmed" | "packed" | "shipped" | "delivered" | "cancelled";
  statusHistory: IOrderStatusHistory[];
  notes?: string;
  source: "website";
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: { type: String, required: true, unique: true, index: true },
    customer: {
      name: { type: String, required: true, trim: true },
      phone: { type: String, required: true, trim: true, index: true },
      email: { type: String, lowercase: true, trim: true },
    },
    address: {
      line1: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      state: { type: String, required: true, trim: true },
      pincode: { type: String, required: true, trim: true },
    },
    items: [
      {
        productId: { type: String, required: true },
        slug: { type: String, required: true },
        title: { type: String, required: true },
        sku: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1, max: 10 },
        unitPrice: { type: Number, required: true, min: 0 },
      },
    ],
    subtotal: { type: Number, required: true, min: 0 },
    shippingCharge: { type: Number, required: true, default: 0, min: 0 },
    total: { type: Number, required: true, min: 0 },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["COD", "WhatsApp", "Online"],
      default: "WhatsApp",
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    status: {
      type: String,
      required: true,
      enum: ["new", "confirmed", "packed", "shipped", "delivered", "cancelled"],
      default: "new",
      index: true,
    },
    statusHistory: [
      {
        status: { type: String, required: true },
        note: { type: String },
        at: { type: Date, default: Date.now },
      },
    ],
    notes: { type: String, trim: true },
    source: { type: String, default: "website" },
  },
  {
    timestamps: true,
  }
);

OrderSchema.index({ createdAt: -1 });
OrderSchema.index({ "customer.phone": 1, orderNumber: 1 });

export const Order = mongoose.model<IOrder>("Order", OrderSchema);
