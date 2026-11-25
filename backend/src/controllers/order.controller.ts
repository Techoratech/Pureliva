import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { processAndCreateOrder } from "../services/order.service.js";
import { Order } from "../models/Order.js";

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const { order, whatsappMessage } = await processAndCreateOrder(req.body);

  res.status(201).json({
    success: true,
    data: {
      orderNumber: order.orderNumber,
      total: order.total,
      subtotal: order.subtotal,
      shippingCharge: order.shippingCharge,
      whatsappMessage,
      status: order.status,
    },
    message: "Order placed successfully",
  });
});

export const trackOrder = asyncHandler(async (req: Request, res: Response) => {
  const orderNumber = String(req.query.orderNumber || "").trim();
  const phone = String(req.query.phone || "").trim();

  if (!orderNumber || !phone) {
    throw new ApiError(400, "Both orderNumber and phone are required to track order");
  }

  // Clean phone matching: matches full phone or last 10 digits
  const cleanPhone = phone.replace(/\D/g, "");
  const last10 = cleanPhone.slice(-10);

  const order = await Order.findOne({
    orderNumber: { $regex: new RegExp(`^${orderNumber}$`, "i") },
    "customer.phone": { $regex: new RegExp(`${last10}$`) },
  }).select("orderNumber status statusHistory items createdAt total paymentMethod -_id");

  if (!order) {
    throw new ApiError(404, "No matching order found. Please verify the order number and phone.");
  }

  // Return public non-sensitive tracking info
  res.status(200).json({
    success: true,
    data: {
      orderNumber: order.orderNumber,
      status: order.status,
      statusHistory: order.statusHistory,
      total: order.total,
      paymentMethod: order.paymentMethod,
      createdAt: order.createdAt,
      items: order.items.map((item) => ({
        title: item.title,
        quantity: item.quantity,
      })),
    },
  });
});
