import { Router } from "express";
import { getPublicProducts, getPublicProductBySlug } from "../controllers/product.controller.js";

export const productRouter = Router();

productRouter.get("/", getPublicProducts);
productRouter.get("/:slug", getPublicProductBySlug);
