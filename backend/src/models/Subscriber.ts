import mongoose, { Document, Schema } from "mongoose";

export interface ISubscriber extends Document {
  email: string;
  subscribedAt: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SubscriberSchema = new Schema<ISubscriber>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    subscribedAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true, index: true },
  },
  {
    timestamps: true,
  }
);

SubscriberSchema.index({ createdAt: -1 });

export const Subscriber = mongoose.model<ISubscriber>("Subscriber", SubscriberSchema);
