import mongoose, { Document, Schema } from "mongoose";

export interface IBulkEnquiry extends Document {
  name: string;
  company: string;
  country: string;
  product: string;
  quantity: string;
  message?: string;
  email: string;
  phone: string;
  status: "new" | "contacted" | "quoted" | "closed";
  createdAt: Date;
  updatedAt: Date;
}

const BulkEnquirySchema = new Schema<IBulkEnquiry>(
  {
    name: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    product: { type: String, required: true, trim: true },
    quantity: { type: String, required: true, trim: true },
    message: { type: String, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["new", "contacted", "quoted", "closed"],
      default: "new",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

BulkEnquirySchema.index({ createdAt: -1 });

export const BulkEnquiry = mongoose.model<IBulkEnquiry>("BulkEnquiry", BulkEnquirySchema);
