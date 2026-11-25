import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ContactMessage } from "../models/ContactMessage.js";
import { BulkEnquiry } from "../models/BulkEnquiry.js";
import { Subscriber } from "../models/Subscriber.js";
import { mailService } from "../services/mail.service.js";

export const handleContactMessage = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, phone, subject, message } = req.body;

  const contact = new ContactMessage({
    name,
    email,
    phone,
    subject,
    message,
    status: "new",
  });
  await contact.save();

  // Send asynchronous emails
  mailService.sendContactFormEmailsAsync({
    name,
    email,
    phone,
    subject,
    message,
    createdAt: contact.createdAt,
  });

  res.status(201).json({
    success: true,
    message: "Thank you for reaching out! We have received your message and will respond shortly.",
    data: {
      id: contact._id,
      name: contact.name,
    },
  });
});

export const handleBulkEnquiry = asyncHandler(async (req: Request, res: Response) => {
  const { name, company, country, product, quantity, message, email, phone } = req.body;

  const enquiry = new BulkEnquiry({
    name,
    company,
    country,
    product,
    quantity,
    message,
    email,
    phone,
    status: "new",
  });
  await enquiry.save();

  // Send asynchronous emails
  mailService.sendBulkEnquiryEmailsAsync({
    name,
    company,
    country,
    product,
    quantity,
    message,
    email,
    phone,
    createdAt: enquiry.createdAt,
  });

  res.status(201).json({
    success: true,
    message: "Your bulk export enquiry has been submitted. Our B2B team will contact you shortly.",
    data: {
      id: enquiry._id,
      company: enquiry.company,
    },
  });
});

export const handleNewsletterSubscribe = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  const existing = await Subscriber.findOne({ email });
  if (existing) {
    if (!existing.isActive) {
      existing.isActive = true;
      await existing.save();
    }
    return res.status(200).json({
      success: true,
      message: "You are already subscribed to our newsletter!",
    });
  }

  const subscriber = new Subscriber({
    email,
    subscribedAt: new Date(),
    isActive: true,
  });
  await subscriber.save();

  res.status(201).json({
    success: true,
    message: "Thank you for subscribing to Pureliva Foods updates!",
  });
});
