import { Router } from "express";
import { createOrder, trackOrder } from "../controllers/order.controller.js";
import { validateRequest } from "../middleware/validate.js";
import { createOrderSchema, trackOrderQuerySchema } from "../validators/schemas.js";
import { publicFormLimiter } from "../middleware/rateLimit.js";

export const orderRouter = Router();

orderRouter.post(
  "/",
  publicFormLimiter,
  validateRequest({ body: createOrderSchema }),
  createOrder
);

orderRouter.get(
  "/track",
  validateRequest({ query: trackOrderQuerySchema }),
  trackOrder
);
