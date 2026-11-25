import { z } from "zod";

// Phone regex: matches 10 digits with optional +91, 0, or spaces/dashes
export const phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/;
// Indian 6-digit Pincode regex
export const pincodeRegex = /^[1-9][0-9]{5}$/;

export const phoneSchema = z
  .string()
  .trim()
  .regex(phoneRegex, "Please enter a valid 10-digit Indian phone number");

export const pincodeSchema = z
  .string()
  .trim()
  .regex(pincodeRegex, "Please enter a valid 6-digit Indian PIN code");

// Anti-bot check helper: honeypot must be empty, form must have taken at least 1.5 seconds to submit
export const antiBotSchema = z.object({
  _hp: z.string().optional().refine((val) => !val || val.trim().length === 0, {
    message: "Bot submission detected",
  }),
  _timestamp: z
    .number()
    .optional()
    .refine(
      (ts) => {
        if (!ts) return true; // Optional if client didn't supply it
        const elapsed = Date.now() - ts;
        return elapsed >= 1000 && elapsed < 24 * 60 * 60 * 1000;
      },
      { message: "Form submitted too quickly or timestamp invalid" }
    ),
});

// Order creation item
export const orderItemSchema = z.object({
  slug: z.string().trim().min(1, "Product slug is required"),
  quantity: z
    .number()
    .int("Quantity must be an integer")
    .min(1, "Quantity must be at least 1")
    .max(10, "Maximum 10 units per item allowed"),
});

// Create Order Schema
export const createOrderSchema = antiBotSchema.extend({
  customer: z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
    phone: phoneSchema,
    email: z.string().trim().email("Please provide a valid email").optional().or(z.literal("")),
  }),
  address: z.object({
    line1: z.string().trim().min(5, "Address must be at least 5 characters").max(250),
    city: z.string().trim().min(2, "City is required").max(100),
    state: z.string().trim().min(2, "State is required").max(100),
    pincode: pincodeSchema,
  }),
  items: z.array(orderItemSchema).min(1, "At least one product item is required"),
  paymentMethod: z.enum(["COD", "WhatsApp", "Online"]).default("WhatsApp"),
  notes: z.string().trim().max(500).optional(),
});

// Track Order Query
export const trackOrderQuerySchema = z.object({
  orderNumber: z.string().trim().min(5, "Order number is required"),
  phone: z.string().trim().min(10, "Phone number is required"),
});

// Contact Message Schema
export const contactMessageSchema = antiBotSchema.extend({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please provide a valid email"),
  phone: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || phoneRegex.test(val), "Invalid phone format"),
  subject: z.string().trim().max(150).optional(),
  message: z.string().trim().min(5, "Message must be at least 5 characters").max(2000),
});

// Bulk Enquiry Schema
export const bulkEnquirySchema = antiBotSchema.extend({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  company: z.string().trim().min(2, "Company name is required").max(150),
  country: z.string().trim().min(2, "Country is required").max(100),
  product: z.string().trim().min(2, "Product is required").max(150),
  quantity: z.string().trim().min(1, "Estimated quantity is required").max(100),
  message: z.string().trim().max(2000).optional(),
  email: z.string().trim().email("Please provide a valid email"),
  phone: z.string().trim().min(6, "Valid contact number is required").max(30),
});

// Newsletter Subscribe Schema
export const newsletterSubscribeSchema = antiBotSchema.extend({
  email: z.string().trim().email("Please provide a valid email address"),
});

// Admin Auth Schemas
export const adminLoginSchema = z.object({
  email: z.string().trim().email("Please provide a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters long"),
});

// Admin Product Schema
export const productInputSchema = z
  .object({
    id: z.string().trim().optional(),
    slug: z.string().trim().min(1, "Slug is required"),
    name: z.string().trim().min(1, "Product name is required"),
    titleWithVariant: z.string().trim().optional().default(""),
    tagline: z.string().trim().default(""),
    type: z.enum(["Roasted & Salted", "Raw"]).default("Roasted & Salted"),
    sku: z.string().trim().min(1, "SKU code is required"),
    netWeight: z.string().trim().default("100 g"),
    accent: z.string().trim().default("#1B4332"),
    accentTextDark: z.boolean().default(false),
    servingsPerPack: z.string().trim().default("About 3 per pack"),
    servingSizeGrams: z.coerce.number().default(30),
    ingredients: z.string().trim().default(""),
    description: z.string().trim().default(""),
    storage: z.string().trim().default(""),
    allergen: z.string().trim().default(""),
    keyStats: z
      .array(
        z.object({
          label: z.string().trim().default(""),
          value: z.string().trim().default(""),
          detail: z.string().trim().default(""),
        })
      )
      .default([]),
    nutrients: z
      .array(
        z.object({
          label: z.string().trim().default(""),
          per100g: z.union([z.number(), z.string()]).default(0),
          unit: z.string().trim().default("g"),
          rda: z.number().optional(),
        })
      )
      .default([]),
    images: z
      .object({
        bowl: z.string().default(""),
        packFront: z.string().default(""),
        packBack: z.string().default(""),
      })
      .default({ bowl: "", packFront: "", packBack: "" }),
    price: z.coerce.number().min(0, "Price cannot be negative"),
    mrp: z.coerce.number().min(0, "MRP cannot be negative"),
    stock: z.coerce.number().int().min(0, "Stock cannot be negative").default(100),
    isActive: z.coerce.boolean().default(true),
    sortOrder: z.coerce.number().default(0),
  })
  .passthrough();

export const updateOrderStatusSchema = z.object({
  status: z.enum(["new", "confirmed", "packed", "shipped", "delivered", "cancelled"]),
  note: z.string().trim().max(500).optional(),
  notifyCustomer: z.boolean().default(true),
});

export const updateItemStockPriceSchema = z
  .object({
    price: z.coerce.number().min(0).optional(),
    mrp: z.coerce.number().min(0).optional(),
    stock: z.coerce.number().int().min(0).optional(),
    isActive: z.coerce.boolean().optional(),
  })
  .passthrough();
