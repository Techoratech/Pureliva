import { Router } from "express";
import { healthRouter } from "./health.routes.js";
import { productRouter } from "./product.routes.js";
import { orderRouter } from "./order.routes.js";
import { enquiryRouter } from "./enquiry.routes.js";
import { adminRouter } from "./admin.routes.js";

export const apiRouter = Router();

apiRouter.use("/health", healthRouter);
apiRouter.use("/products", productRouter);
apiRouter.use("/orders", orderRouter);
apiRouter.use("/", enquiryRouter);
apiRouter.use("/admin", adminRouter);
