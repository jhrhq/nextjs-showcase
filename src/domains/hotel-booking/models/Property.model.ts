import mongoose, { Document, Model, Schema } from "mongoose";

// ─── Sub-document interfaces ───────────────────────────────────────────────

export interface IReview {
  _id?: mongoose.Types.ObjectId;
  author: string;
  avatar?: string;
  rating: number;
  comment: string;
  date: Date;
}

export interface ILocation {
  city: string;
  country: string;
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface IHost {
  name: string;
  avatar?: string;
  isSuperhost: boolean;
  joinedYear?: number;
}

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

export interface IRating {
  overall: number;
  cleanliness: number;
  accuracy: number;
  communication: number;
  location: number;
  value: number;
}

// ─── Property types ────────────────────────────────────────────────────────

export type PropertyType = "Entire home" | "Private room" | "Shared room" | "Unique stay" | "Hotel room";

// ─── Main document interface ───────────────────────────────────────────────

export interface IProperty {
  title: string;
  description: string;
  type: PropertyType;
  location: ILocation;
  host: IHost;
  images: string[];
  amenities: string[];
  pricing: IPricing;
  capacity: ICapacity;
  rating: IRating;
  reviews: IReview[];
  reviewCount: number;
  isAvailable: boolean;
  isFeatured: boolean;
  tags: string[];
  minimumNights: number;
  maximumNights: number;
}

// Extends IProperty with Mongoose Document (adds _id, createdAt, updatedAt, etc.)
export interface IPropertyDocument extends IProperty, Document {
  createdAt: Date;
  updatedAt: Date;
}

// ─── Sub-document schemas ──────────────────────────────────────────────────

const reviewSchema = new Schema<IReview>(
  {
    author: { type: String, required: true },
    avatar: { type: String },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  { _id: true }
);

const locationSchema = new Schema<ILocation>(
  {
    city: { type: String, required: true },
    country: { type: String, required: true },
    address: { type: String },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
  },
  { _id: false }
);

const hostSchema = new Schema<IHost>(
  {
    name: { type: String, required: true },
    avatar: { type: String },
    isSuperhost: { type: Boolean, default: false },
    joinedYear: { type: Number },
  },
  { _id: false }
);

const pricingSchema = new Schema<IPricing>(
  {
    perNight: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    cleaningFee: { type: Number, default: 0 },
    serviceFee: { type: Number, default: 0 },
  },
  { _id: false }
);

const capacitySchema = new Schema<ICapacity>(
  {
    guests: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    beds: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
  },
  { _id: false }
);

const ratingSchema = new Schema<IRating>(
  {
    overall: { type: Number, default: 0, min: 0, max: 5 },
    cleanliness: { type: Number, default: 0 },
    accuracy: { type: Number, default: 0 },
    communication: { type: Number, default: 0 },
    location: { type: Number, default: 0 },
    value: { type: Number, default: 0 },
  },
  { _id: false }
);

// ─── Main schema ───────────────────────────────────────────────────────────

const propertySchema = new Schema<IPropertyDocument>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ["Entire home", "Private room", "Shared room", "Unique stay", "Hotel room"] satisfies PropertyType[],
    },
    location: { type: locationSchema, required: true },
    host: { type: hostSchema, required: true },
    images: [{ type: String }],
    amenities: [{ type: String }],
    pricing: { type: pricingSchema, required: true },
    capacity: { type: capacitySchema, required: true },
    rating: { type: ratingSchema, default: () => ({}) },
    reviews: [reviewSchema],
    reviewCount: { type: Number, default: 0 },
    isAvailable: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    tags: [{ type: String }],
    minimumNights: { type: Number, default: 1 },
    maximumNights: { type: Number, default: 365 },
  },
  {
    timestamps: true, // adds createdAt + updatedAt automatically
  }
);

// ─── Indexes ───────────────────────────────────────────────────────────────

propertySchema.index({ "location.city": 1 });
propertySchema.index({ "location.country": 1 });
propertySchema.index({ "pricing.perNight": 1 });
propertySchema.index({ "rating.overall": -1 });
propertySchema.index({ isFeatured: 1 });
propertySchema.index({ isAvailable: 1 });
propertySchema.index({ tags: 1 });
propertySchema.index({ title: "text", description: "text" }); // full-text search

// ─── Model (Next.js hot-reload safe) ──────────────────────────────────────
// Prevents "Cannot overwrite model once compiled" errors in dev mode.

const Property: Model<IPropertyDocument> =
  (mongoose.models.Property as Model<IPropertyDocument>) ||
  mongoose.model<IPropertyDocument>("Property", propertySchema);

export default Property;
