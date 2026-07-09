import mongoose, { Document, Model, Schema } from "mongoose";

export interface ILocation {
  street?: string;
  city: string;
  state?: string;
  country: string;
  address?: string;
  postalCode?: string;
  coordinates?: { lat: number; lng: number };
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

export interface IPropertyImage {
  url: string;
  alt?: string;
}
export interface ICachedReview {
  reviewId: mongoose.Types.ObjectId;
  authorId: mongoose.Types.ObjectId;
  authorName: string; // Cached to avoid an extra lookup to the User collection
  comment?: string;
  overallRating?: number;
  createdAt: Date;
}

const cachedReviewSchema = new Schema<ICachedReview>(
  {
    reviewId: { type: Schema.Types.ObjectId, ref: "Review", required: true },
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    authorName: { type: String, required: true },
    comment: { type: String },
    overallRating: { type: Number },
    createdAt: { type: Date, required: true }
  },
  { _id: false }
)
export type PropertyType =
  | "Entire home"
  | "Private room"
  | "Shared room"
  | "Unique stay"
  | "Hotel room";

export interface IProperty {
  title: string;
  description: string;
  type: PropertyType;
  location: ILocation;
  host: IHost;
  images: IPropertyImage[];
  amenities: string[];
  pricing: IPricing;
  capacity: ICapacity;
  averageRating: number;
  reviewCount: number;
  recentReviews: ICachedReview[]; // ◄ ADD THIS LINE
  isPublished: boolean
  isFeatured: boolean;
  tags: string[];
  minimumNights: number;
  maximumNights: number;
}

export interface IPropertyDocument extends IProperty, Document {
  createdAt: Date;
  updatedAt: Date;
}
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
    images: [{ url: { type: String, required: true }, alt: String }],
    amenities: [{ type: String }],
    pricing: { type: pricingSchema, required: true },
    capacity: { type: capacitySchema, required: true },
    averageRating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    tags: [{ type: String }],
    recentReviews: { type: [cachedReviewSchema], default: [] }, // ◄ ADD THIS LINE
    minimumNights: { type: Number, default: 1 },
    maximumNights: { type: Number, default: 365 },
  },
  { timestamps: true }
);

propertySchema.index({ "location.city": 1 });
propertySchema.index({ "location.country": 1 });
propertySchema.index({ "pricing.perNight": 1 });
propertySchema.index({ isFeatured: 1 });
propertySchema.index({ averageRating: -1 }); // Matches your averageRating field
propertySchema.index({ isPublished: 1 });propertySchema.index({ tags: 1 });
propertySchema.index({ title: "text", description: "text" });

const Property: Model<IPropertyDocument> =
  (mongoose.models.Property as Model<IPropertyDocument>) ||
  mongoose.model<IPropertyDocument>("Property", propertySchema);

export default Property;
