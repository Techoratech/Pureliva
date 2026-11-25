import { Response } from "express";
import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Product } from "../models/Product.js";
import { AuthRequest } from "../middleware/auth.js";

const getProductQuery = (id: string) => {
  return mongoose.Types.ObjectId.isValid(id)
    ? { _id: id }
    : { $or: [{ id: id }, { slug: id }] };
};

export const getAdminProducts = asyncHandler(async (_req: AuthRequest, res: Response) => {
  const products = await Product.find({}).sort({ sortOrder: 1, createdAt: 1 });
  res.status(200).json({
    success: true,
    data: products,
  });
});

export const createAdminProduct = asyncHandler(async (req: AuthRequest, res: Response) => {
  const productData = req.body;

  // Auto-fill fallback fields if omitted
  if (!productData.id) {
    productData.id = productData.slug || `prod-${Date.now()}`;
  }
  if (!productData.titleWithVariant) {
    productData.titleWithVariant = `${productData.name} – ${productData.type || "Roasted & Salted"} (${productData.netWeight || "100g"})`;
  }
  if (!productData.images) {
    productData.images = { bowl: "", packFront: "", packBack: "" };
  }
  if (!productData.keyStats) productData.keyStats = [];
  if (!productData.nutrients) productData.nutrients = [];

  const existingSlug = await Product.findOne({ slug: productData.slug });
  if (existingSlug) {
    throw new ApiError(409, `Product with slug "${productData.slug}" already exists`);
  }

  const existingSku = await Product.findOne({ sku: productData.sku });
  if (existingSku) {
    throw new ApiError(409, `Product with SKU "${productData.sku}" already exists`);
  }

  const product = new Product(productData);
  await product.save();

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: product,
  });
});

export const updateAdminProduct = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const updateData = { ...req.body };

  const query = getProductQuery(id);
  const product = await Product.findOne(query);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  // If slug is changing, verify uniqueness
  if (updateData.slug && updateData.slug !== product.slug) {
    const slugExists = await Product.findOne({ slug: updateData.slug, _id: { $ne: product._id } });
    if (slugExists) {
      throw new ApiError(409, `Product slug "${updateData.slug}" is already in use`);
    }
  }

  // If sku is changing, verify uniqueness
  if (updateData.sku && updateData.sku !== product.sku) {
    const skuExists = await Product.findOne({ sku: updateData.sku, _id: { $ne: product._id } });
    if (skuExists) {
      throw new ApiError(409, `Product SKU "${updateData.sku}" is already in use`);
    }
  }

  // Remove immutable / MongoDB managed metadata fields
  delete updateData._id;
  delete updateData.__v;
  delete updateData.createdAt;
  delete updateData.updatedAt;

  const updatedProduct = await Product.findByIdAndUpdate(
    product._id,
    { $set: updateData },
    { new: true, runValidators: false }
  );

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: updatedProduct,
  });
});

export const patchAdminProduct = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { price, mrp, stock, isActive } = req.body;

  const query = getProductQuery(id);
  const product = await Product.findOne(query);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  const updateFields: Record<string, any> = {};
  if (price !== undefined) updateFields.price = price;
  if (mrp !== undefined) updateFields.mrp = mrp;
  if (stock !== undefined) updateFields.stock = stock;
  if (isActive !== undefined) updateFields.isActive = isActive;

  const updatedProduct = await Product.findByIdAndUpdate(
    product._id,
    { $set: updateFields },
    { new: true, runValidators: false }
  );

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: updatedProduct,
  });
});

export const deleteAdminProduct = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const query = getProductQuery(id);
  const product = await Product.findOneAndDelete(query);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  res.status(200).json({
    success: true,
    message: `Product "${product.name}" deleted successfully`,
  });
});
