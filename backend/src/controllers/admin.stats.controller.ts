import { Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Order } from "../models/Order.js";
import { ContactMessage } from "../models/ContactMessage.js";
import { BulkEnquiry } from "../models/BulkEnquiry.js";
import { Product } from "../models/Product.js";
import { Subscriber } from "../models/Subscriber.js";
import { AuthRequest } from "../middleware/auth.js";

export const getAdminStats = asyncHandler(async (_req: AuthRequest, res: Response) => {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // 1. Order Totals & Revenue
  const [orderMetrics] = await Order.aggregate([
    {
      $facet: {
        total: [{ $count: "count" }],
        today: [
          { $match: { createdAt: { $gte: startOfToday } } },
          { $count: "count" },
        ],
        revenue: [
          { $match: { status: { $ne: "cancelled" } } },
          { $group: { _id: null, totalRevenue: { $sum: "$total" } } },
        ],
        statusBreakdown: [
          { $group: { _id: "$status", count: { $sum: 1 } } },
        ],
      },
    },
  ]);

  const totalOrders = orderMetrics?.total[0]?.count || 0;
  const todayOrders = orderMetrics?.today[0]?.count || 0;
  const totalRevenue = orderMetrics?.revenue[0]?.totalRevenue || 0;

  const ordersByStatus: Record<string, number> = {
    new: 0,
    confirmed: 0,
    packed: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
  };
  (orderMetrics?.statusBreakdown || []).forEach((item: { _id: string; count: number }) => {
    if (item._id) ordersByStatus[item._id] = item.count;
  });

  // 2. Last 7 Days Daily Orders & Revenue Chart
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const dailyAggregates = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: sevenDaysAgo },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        },
        orders: { $sum: 1 },
        revenue: {
          $sum: {
            $cond: [{ $ne: ["$status", "cancelled"] }, "$total", 0],
          },
        },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  // Fill in missing days so the chart is smooth
  const chartMap = new Map(dailyAggregates.map((d) => [d._id, d]));
  const chartData: Array<{ date: string; orders: number; revenue: number }> = [];

  for (let i = 0; i < 7; i++) {
    const d = new Date(sevenDaysAgo);
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().split("T")[0];
    const match = chartMap.get(dateStr);
    chartData.push({
      date: dateStr,
      orders: match ? match.orders : 0,
      revenue: match ? match.revenue : 0,
    });
  }

  // 3. New Enquiries, Messages, Products & Subscribers count
  const [newMessages, newBulkEnquiries, totalProducts, totalSubscribers] = await Promise.all([
    ContactMessage.countDocuments({ status: "new" }),
    BulkEnquiry.countDocuments({ status: "new" }),
    Product.countDocuments({}),
    Subscriber.countDocuments({ isActive: true }),
  ]);

  res.status(200).json({
    success: true,
    data: {
      totalOrders,
      todayOrders,
      totalRevenue,
      ordersByStatus,
      chartData,
      newMessages,
      newBulkEnquiries,
      totalProducts,
      totalSubscribers,
    },
  });
});
