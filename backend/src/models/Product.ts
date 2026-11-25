import mongoose, { Document, Schema } from "mongoose";

export interface INutrientItem {
  label: string;
  per100g: number | string;
  unit: string;
  rda?: number;
}

export interface IKeyStat {
  label: string;
  value: string;
  detail: string;
}

export interface IProductImages {
  bowl: string;
  packFront: string;
  packBack: string;
}

export interface IProduct extends Document {
  id: string;
  slug: string;
  name: string;
  titleWithVariant: string;
  tagline: string;
  type: "Roasted & Salted" | "Raw";
  sku: string;
  netWeight: string;
  accent: string;
  accentTextDark: boolean;
  servingsPerPack: string;
  servingSizeGrams: number;
  ingredients: string;
  description: string;
  storage: string;
  allergen: string;
  keyStats: IKeyStat[];
  nutrients: INutrientItem[];
  images: IProductImages;
  price: number;
  mrp: number;
  stock: number;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    id: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    name: { type: String, required: true, trim: true },
    titleWithVariant: { type: String, required: true, trim: true },
    tagline: { type: String, default: "", trim: true },
    type: { type: String, required: true, enum: ["Roasted & Salted", "Raw"] },
    sku: { type: String, required: true, unique: true, uppercase: true, trim: true, index: true },
    netWeight: { type: String, default: "100 g", trim: true },
    accent: { type: String, default: "#1B4332", trim: true },
    accentTextDark: { type: Boolean, default: false },
    servingsPerPack: { type: String, default: "About 3 per pack", trim: true },
    servingSizeGrams: { type: Number, default: 30 },
    ingredients: { type: String, default: "", trim: true },
    description: { type: String, default: "", trim: true },
    storage: { type: String, default: "", trim: true },
    allergen: { type: String, default: "", trim: true },
    keyStats: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true },
        detail: { type: String, required: true },
      },
    ],
    nutrients: [
      {
        label: { type: String, required: true },
        per100g: { type: Schema.Types.Mixed, required: true },
        unit: { type: String, required: true },
        rda: { type: Number },
      },
    ],
    images: {
      bowl: { type: String, default: "" },
      packFront: { type: String, default: "" },
      packBack: { type: String, default: "" },
    },
    price: { type: Number, required: true, default: 0, min: 0 },
    mrp: { type: Number, required: true, default: 0, min: 0 },
    stock: { type: Number, required: true, default: 100, min: 0 },
    isActive: { type: Boolean, default: true, index: true },
    sortOrder: { type: Number, default: 0, index: true },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model<IProduct>("Product", ProductSchema);
