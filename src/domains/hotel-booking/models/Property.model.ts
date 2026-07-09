import mongoose, { Document, Model, Schema } from "mongoose";
import type { ILocation, IHost, IReviewSnapshot } from "./shared.types";

// ─── Re-export shared types so callers can import from one place ──────────────
export type { ILocation, IHost, IReviewSnapshot };

// ─── Types ────────────────────────────────────────────────────────────────────

export type PropertyType =
  | "Entire home"
  | "Private room"
  | "Shared room"
  | "Unique stay"
  | "Hotel room";

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

// ─── Main interface ───────────────────────────────────────────────────────────

export interface IProperty {
  // ── Identity
  title: string;
  description: string;
  type: PropertyType;
  tags: string[];                 // e.g. ["beachfront", "pet-friendly", "pool"]

  // ── Embedded host snapshot (avoids join on card render)
  host: IHost;

  // ── Location (your exact interface)
  location: ILocation;

  // ── Media
  images: IPropertyImage[];       // first image used as card thumbnail
  amenities: string[];

  // ── Pricing & capacity
  pricing: IPricing;
  capacity: ICapacity;

  // ── Cached metadata — updated by Review post-hooks, never manually
  ratingAvg: number;
  reviewCount: number;
  /**
   * Hard-capped array of the 3 most recent reviews.
   * Each entry is a denormalised snapshot (name + avatar + comment)
   * so the details page hero section renders with zero extra queries.
   * Managed exclusively via the Review post-save / post-delete hook.
   */
  recentReviews: IReviewSnapshot[];

  // ── Visibility flags
  isPublished: boolean;
  isFeatured: boolean;

  minimumNights: number;
  maximumNights: number;
}

export interface IPropertyDocument extends IProperty, Document {
  createdAt: Date;
  updatedAt: Date;
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

const reviewSnapshotSchema = new Schema<IReviewSnapshot>(
  {
    reviewId: { type: Schema.Types.ObjectId, ref: "Review", required: true },
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    authorName: { type: String, required: true },
    authorAvatar: String,
    overallRating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    createdAt: { type: Date, required: true },
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
      enum: [
        "Entire home",
        "Private room",
        "Shared room",
        "Unique stay",
        "Hotel room",
      ] satisfies PropertyType[],
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

    // ── Cached metadata (managed by Review hooks — never write these manually)
    ratingAvg: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    recentReviews: {
      type: [reviewSnapshotSchema],
      default: [],
      validate: {
        validator: (arr: IReviewSnapshot[]) => arr.length <= 3,
        message: "recentReviews is hard-capped at 3 entries",
      },
    },

    isPublished: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },

    minimumNights: { type: Number, default: 1 },
    maximumNights: { type: Number, default: 365 },
  },
  { timestamps: true }
);


propertySchema.index({ "host.userId": 1 });                          // Manage Hotels
propertySchema.index({ isPublished: 1, isFeatured: -1, ratingAvg: -1 }); // homepage sort
propertySchema.index({ "location.city": 1, isPublished: 1 });        // city filter
propertySchema.index({ tags: 1, isPublished: 1 });                   // tag filter
propertySchema.index({ "pricing.perNight": 1 });                     // price sort/filter
propertySchema.index({ title: "text", description: "text" });        // search bar

const Property: Model<IPropertyDocument> =
  (mongoose.models.Property as Model<IPropertyDocument>) ||
  mongoose.model<IPropertyDocument>("Property", propertySchema);

export default Property;
