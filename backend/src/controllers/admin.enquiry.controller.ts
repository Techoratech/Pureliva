import { Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ContactMessage } from "../models/ContactMessage.js";
import { BulkEnquiry } from "../models/BulkEnquiry.js";
import { Subscriber } from "../models/Subscriber.js";
import { AuthRequest } from "../middleware/auth.js";

// Contact Messages
export const getAdminContactMessages = asyncHandler(async (req: AuthRequest, res: Response) => {
  const page = Math.max(1, parseInt(String(req.query.page || "1"), 10));
  const limit = Math.min(100, Math.max(1, parseInt(String(req.query.limit || "20"), 10)));
  const status = String(req.query.status || "").trim();

  const query: any = {};
  if (status && status !== "all") {
    query.status = status;
  }

  const skip = (page - 1) * limit;
  const [messages, total] = await Promise.all([
    ContactMessage.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    ContactMessage.countDocuments(query),
  ]);

  res.status(200).json({
    success: true,
    data: {
      messages,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    },
  });
});

export const updateContactMessageStatus = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const message = await ContactMessage.findByIdAndUpdate(id, { status }, { new: true });
  if (!message) {
    throw new ApiError(404, "Contact message not found");
  }

  res.status(200).json({
    success: true,
    message: "Message status updated",
    data: message,
  });
});

export const deleteContactMessage = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const message = await ContactMessage.findByIdAndDelete(id);
  if (!message) {
    throw new ApiError(404, "Contact message not found");
  }

  res.status(200).json({
    success: true,
    message: "Message deleted successfully",
  });
});

// Bulk Enquiries
export const getAdminBulkEnquiries = asyncHandler(async (req: AuthRequest, res: Response) => {
  const page = Math.max(1, parseInt(String(req.query.page || "1"), 10));
  const limit = Math.min(100, Math.max(1, parseInt(String(req.query.limit || "20"), 10)));
  const status = String(req.query.status || "").trim();

  const query: any = {};
  if (status && status !== "all") {
    query.status = status;
  }

  const skip = (page - 1) * limit;
  const [enquiries, total] = await Promise.all([
    BulkEnquiry.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    BulkEnquiry.countDocuments(query),
  ]);

  res.status(200).json({
    success: true,
    data: {
      enquiries,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    },
  });
});

export const updateBulkEnquiryStatus = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const enquiry = await BulkEnquiry.findByIdAndUpdate(id, { status }, { new: true });
  if (!enquiry) {
    throw new ApiError(404, "Bulk enquiry not found");
  }

  res.status(200).json({
    success: true,
    message: "Enquiry status updated",
    data: enquiry,
  });
});

export const deleteBulkEnquiry = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const enquiry = await BulkEnquiry.findByIdAndDelete(id);
  if (!enquiry) {
    throw new ApiError(404, "Bulk enquiry not found");
  }

  res.status(200).json({
    success: true,
    message: "Enquiry deleted successfully",
  });
});

// Subscribers
export const getAdminSubscribers = asyncHandler(async (req: AuthRequest, res: Response) => {
  const exportCsv = String(req.query.export || "").toLowerCase() === "csv";

  if (exportCsv) {
    const subscribers = await Subscriber.find({}).sort({ createdAt: -1 });
    const csvHeaders = "Email,Subscribed At,Status\n";
    const csvRows = subscribers.map((s) => `${s.email},${new Date(s.subscribedAt).toISOString()},${s.isActive ? "Active" : "Inactive"}`);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename=pureliva_subscribers_${Date.now()}.csv`);
    return res.status(200).send(csvHeaders + csvRows.join("\n"));
  }

  const page = Math.max(1, parseInt(String(req.query.page || "1"), 10));
  const limit = Math.min(100, Math.max(1, parseInt(String(req.query.limit || "50"), 10)));
  const skip = (page - 1) * limit;

  const [subscribers, total] = await Promise.all([
    Subscriber.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Subscriber.countDocuments({}),
  ]);

  res.status(200).json({
    success: true,
    data: {
      subscribers,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    },
  });
});
