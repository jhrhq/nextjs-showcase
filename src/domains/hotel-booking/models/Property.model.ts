import mongoose, { type Document, type Model, Schema, type Types } from "mongoose";
import type { IHost, ILocation } from "./shared.types";

export type { IHost, ILocation };

export type PropertyType = "Entire home" | "Private room" | "Shared room" | "Unique stay" | "Hotel room";

export interface IPricing {
  perNight: number;
  currency: string;
  cleaningFee: number;
  serviceFee: number;
}

export interface ICapacity {
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
}

export interface IPropertyImage {
  url: string;
  alt?: string;
}

export interface IProperty {
  title: string;
  description: string;
  type: PropertyType;
  tags: string[]; // e.g. ["beachfront", "pet-friendly", "pool"]

  host: IHost;

  location: ILocation;

  // ── Media
  images: IPropertyImage[];
  amenities: string[];

  pricing: IPricing;
  capacity: ICapacity;

  ratingAvg: number;
  reviewCount: number;

  isPublished: boolean;
  isFeatured: boolean;

  minimumNights: number;
  maximumNights: number;
}

export interface IPropertyDocument extends IProperty, Document {
  createdAt: Date;
  updatedAt: Date;
}

// Statics Interface
export interface IPropertyModel extends Model<IPropertyDocument> {
  calculateReviewStats(propertyId: Types.ObjectId | string): Promise<void>;
}

const locationSchema = new Schema<ILocation>(
  {
    street: String,
    city: { type: String, required: true },
    state: String,
    country: { type: String, required: true },
    address: String,
    postalCode: String,
    coordinates: { lat: Number, lng: Number },
  },
  { _id: false }
);

const hostSchema = new Schema<IHost>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    avatar: String,
    isSuperhost: { type: Boolean, default: false },
    joinedYear: Number,
  },
  { _id: false }
);

const propertySchema = new Schema<IPropertyDocument>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ["Entire home", "Private room", "Shared room", "Unique stay", "Hotel room"] satisfies PropertyType[],
    },
    tags: { type: [String], default: [] },

    host: { type: hostSchema, required: true },
    location: { type: locationSchema, required: true },

    images: [{ url: { type: String, required: true }, alt: String }],
    amenities: [String],

    pricing: {
      perNight: { type: Number, required: true },
      currency: { type: String, default: "USD" },
      cleaningFee: { type: Number, default: 0 },
      serviceFee: { type: Number, default: 0 },
    },
    capacity: {
      guests: { type: Number, required: true },
      bedrooms: { type: Number, required: true },
      beds: { type: Number, required: true },
      bathrooms: { type: Number, required: true },
    },

    ratingAvg: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },

    isPublished: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },

    minimumNights: { type: Number, default: 1 },
    maximumNights: { type: Number, default: 365 },
  },
  { timestamps: true }
);

propertySchema.index({ "host.userId": 1 }); // Manage Hotels
propertySchema.index({ isPublished: 1, isFeatured: -1, ratingAvg: -1 }); // homepage sort
propertySchema.index({ "location.city": 1, isPublished: 1 }); // city filter
propertySchema.index({ tags: 1, isPublished: 1 }); // tag filter
propertySchema.index({ "pricing.perNight": 1 }); // price sort/filter
propertySchema.index({ title: "text", description: "text" }); // search bar

// inside property.model.ts

propertySchema.statics.calculateReviewStats = async function (propertyId: Types.ObjectId | string): Promise<void> {
  const Review = mongoose.model("Review");
  const targetId = typeof propertyId === "string" ? new mongoose.Types.ObjectId(propertyId) : propertyId;

  type AggregationOutput = { ratingAvg: number; reviewCount: number };

  const [result] = await Review.aggregate<AggregationOutput>([
    { $match: { propertyId: targetId } },
    {
      $group: {
        _id: null,
        ratingAvg: { $avg: "$overallRating" },
        reviewCount: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        ratingAvg: { $round: ["$ratingAvg", 2] },
        reviewCount: 1,
      },
    },
  ]);

  await this.findByIdAndUpdate(
    targetId,
    {
      ratingAvg: result ? result.ratingAvg : 0,
      reviewCount: result ? result.reviewCount : 0,
    },
    { runValidators: false }
  );
};
const Property: Model<IPropertyDocument> =
  (mongoose.models.Property as Model<IPropertyDocument>) ||
  mongoose.model<IPropertyDocument>("Property", propertySchema);

export default Property;
