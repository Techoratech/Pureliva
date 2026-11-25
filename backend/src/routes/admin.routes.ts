import { Router } from "express";
import {
  adminLogin,
  adminLogout,
  getAdminMe,
  changeAdminPassword,
} from "../controllers/admin.auth.controller.js";
import { getAdminStats } from "../controllers/admin.stats.controller.js";
import {
  getAdminOrders,
  getAdminOrderById,
  updateOrderStatus,
} from "../controllers/admin.order.controller.js";
import {
  getAdminProducts,
  createAdminProduct,
  updateAdminProduct,
  patchAdminProduct,
  deleteAdminProduct,
} from "../controllers/admin.product.controller.js";
import {
  getAdminContactMessages,
  updateContactMessageStatus,
  deleteContactMessage,
  getAdminBulkEnquiries,
  updateBulkEnquiryStatus,
  deleteBulkEnquiry,
  getAdminSubscribers,
} from "../controllers/admin.enquiry.controller.js";
import { authenticateAdmin } from "../middleware/auth.js";
import { validateRequest } from "../middleware/validate.js";
import { loginRateLimiter } from "../middleware/rateLimit.js";
import {
  adminLoginSchema,
  changePasswordSchema,
  productInputSchema,
  updateOrderStatusSchema,
  updateItemStockPriceSchema,
} from "../validators/schemas.js";

export const adminRouter = Router();

// --- Auth Routes ---
adminRouter.post("/auth/login", loginRateLimiter, validateRequest({ body: adminLoginSchema }), adminLogin);
adminRouter.post("/auth/logout", adminLogout);
adminRouter.get("/auth/me", authenticateAdmin, getAdminMe);
adminRouter.patch(
  "/auth/change-password",
  authenticateAdmin,
  validateRequest({ body: changePasswordSchema }),
  changeAdminPassword
);

// --- All routes below require Admin Authentication ---
adminRouter.use(authenticateAdmin);

// Dashboard stats
adminRouter.get("/stats", getAdminStats);

// Orders management
adminRouter.get("/orders", getAdminOrders);
adminRouter.get("/orders/:id", getAdminOrderById);
adminRouter.patch(
  "/orders/:id/status",
  validateRequest({ body: updateOrderStatusSchema }),
  updateOrderStatus
);

// Products management
adminRouter.get("/products", getAdminProducts);
adminRouter.post(
  "/products",
  validateRequest({ body: productInputSchema }),
  createAdminProduct
);
adminRouter.put(
  "/products/:id",
  validateRequest({ body: productInputSchema }),
  updateAdminProduct
);
adminRouter.patch(
  "/products/:id",
  validateRequest({ body: updateItemStockPriceSchema }),
  patchAdminProduct
);
adminRouter.delete("/products/:id", deleteAdminProduct);

// Contact messages
adminRouter.get("/contact-messages", getAdminContactMessages);
adminRouter.patch("/contact-messages/:id", updateContactMessageStatus);
adminRouter.delete("/contact-messages/:id", deleteContactMessage);

// Bulk enquiries
adminRouter.get("/bulk-enquiries", getAdminBulkEnquiries);
adminRouter.patch("/bulk-enquiries/:id", updateBulkEnquiryStatus);
adminRouter.delete("/bulk-enquiries/:id", deleteBulkEnquiry);

// Newsletter subscribers
adminRouter.get("/subscribers", getAdminSubscribers);
