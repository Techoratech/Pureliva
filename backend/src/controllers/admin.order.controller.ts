import { Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Order } from "../models/Order.js";
import { AuthRequest } from "../middleware/auth.js";
import { mailService } from "../services/mail.service.js";

export const getAdminOrders = asyncHandler(async (req: AuthRequest, res: Response) => {
  const page = Math.max(1, parseInt(String(req.query.page || "1"), 10));
  const limit = Math.min(100, Math.max(1, parseInt(String(req.query.limit || "20"), 10)));
  const search = String(req.query.search || "").trim();
  const status = String(req.query.status || "").trim();
  const startDate = String(req.query.startDate || "").trim();
  const endDate = String(req.query.endDate || "").trim();
  const exportCsv = String(req.query.export || "").toLowerCase() === "csv";

  const query: any = {};

  if (search) {
    const searchRegex = new RegExp(search, "i");
    query.$or = [
      { orderNumber: searchRegex },
      { "customer.name": searchRegex },
      { "customer.phone": searchRegex },
      { "customer.email": searchRegex },
      { "address.city": searchRegex },
    ];
  }

  if (status && status !== "all") {
    query.status = status;
  }

  if (startDate || endDate) {
    query.createdAt = {};
    if (startDate) {
      query.createdAt.$gte = new Date(startDate);
    }
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      query.createdAt.$lte = end;
    }
  }

  if (exportCsv) {
    const allOrders = await Order.find(query).sort({ createdAt: -1 });

    const csvHeaders = "Order Number,Date,Customer Name,Phone,Email,City,Total,Items,Payment Method,Status\n";
    const csvRows = allOrders.map((o) => {
      const itemsStr = o.items.map((i) => `${i.quantity}x ${i.title}`).join("; ").replace(/,/g, " ");
      return [
        o.orderNumber,
        new Date(o.createdAt).toISOString().split("T")[0],
        `"${o.customer.name.replace(/"/g, '""')}"`,
        `"${o.customer.phone}"`,
        `"${o.customer.email || ""}"`,
        `"${o.address.city.replace(/"/g, '""')}"`,
        o.total,
        `"${itemsStr}"`,
        o.paymentMethod,
        o.status,
      ].join(",");
    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename=pureliva_orders_${Date.now()}.csv`);
    return res.status(200).send(csvHeaders + csvRows.join("\n"));
  }

  const skip = (page - 1) * limit;

  const [orders, total] = await Promise.all([
    Order.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Order.countDocuments(query),
  ]);

  res.status(200).json({
    success: true,
    data: {
      orders,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    },
  });
});

import mongoose from "mongoose";

const getOrderQuery = (id: string) => {
  return mongoose.Types.ObjectId.isValid(id) ? { _id: id } : { orderNumber: id };
};

export const getAdminOrderById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const order = await Order.findOne(getOrderQuery(id));

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  res.status(200).json({
    success: true,
    data: order,
  });
});

export const updateOrderStatus = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { status, note, notifyCustomer = true } = req.body;

  const order = await Order.findOne(getOrderQuery(id));
  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  order.status = status;
  order.statusHistory.push({
    status,
    note,
    at: new Date(),
  });

  await order.save();

  // Optionally email customer if email is available and notifyCustomer is true
  if (notifyCustomer && order.customer.email) {
    mailService.sendOrderStatusUpdateAsync(
      {
        orderNumber: order.orderNumber,
        customerName: order.customer.name,
        status: order.status,
        note,
        updatedAt: new Date(),
      },
      order.customer.email
    );
  }

  res.status(200).json({
    success: true,
    message: `Order status updated to ${status}`,
    data: order,
  });
});
