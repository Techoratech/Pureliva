import { Router } from "express";
import {
  handleContactMessage,
  handleBulkEnquiry,
  handleNewsletterSubscribe,
} from "../controllers/enquiry.controller.js";
import { validateRequest } from "../middleware/validate.js";
import {
  contactMessageSchema,
  bulkEnquirySchema,
  newsletterSubscribeSchema,
} from "../validators/schemas.js";
import { publicFormLimiter } from "../middleware/rateLimit.js";

export const enquiryRouter = Router();

enquiryRouter.post(
  "/contact",
  publicFormLimiter,
  validateRequest({ body: contactMessageSchema }),
  handleContactMessage
);

enquiryRouter.post(
  "/bulk-enquiry",
  publicFormLimiter,
  validateRequest({ body: bulkEnquirySchema }),
  handleBulkEnquiry
);

enquiryRouter.post(
  "/newsletter/subscribe",
  publicFormLimiter,
  validateRequest({ body: newsletterSubscribeSchema }),
  handleNewsletterSubscribe
);
