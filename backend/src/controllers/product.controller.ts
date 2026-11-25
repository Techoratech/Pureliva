import { Request, Response } from "express";
import { Product } from "../models/Product.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const getPublicProducts = asyncHandler(async (_req: Request, res: Response) => {
  const products = await Product.find({ isActive: true })
    .sort({ sortOrder: 1, createdAt: 1 })
    .select("-__v");

  res.status(200).json({
    success: true,
    data: products,
  });
});

export const getPublicProductBySlug = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const product = await Product.findOne({ slug, isActive: true }).select("-__v");

  if (!product) {
    throw new ApiError(404, `Product not found: ${slug}`);
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});
