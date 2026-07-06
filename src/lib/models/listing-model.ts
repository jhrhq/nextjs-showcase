/**
 * lib/models/Listing.model.ts
 *
 * Mongoose schema for the `listings` collection.
 *
 * A Listing represents a rentable property created and managed by a user
 * whose role is "owner".  The `ownerId` field is the pivot for the
 * ownership-blacklist gate in the review mutex:
 *
 *   if (listing.ownerId.equals(session.userId)) → 403 Forbidden
 *
 * Hot-reload guard applied via:
 *   mongoose.models.Listing ?? mongoose.model('Listing', ListingSchema)
 */

import mongoose, { type Document, type Model, Schema, Types } from "mongoose";

// ---------------------------------------------------------------------------
// Embedded sub-documents
// ---------------------------------------------------------------------------

export interface IListingAddress {
  street: string;
  city: string;
  country: string;
  zip: string;
  /** [longitude, latitude] — GeoJSON Point order. */
  coordinates: [number, number];
}

const ListingAddressSchema = new Schema<IListingAddress>(
  {
    street: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    zip: { type: String, required: true, trim: true },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: (v: number[]) => v.length === 2,
        message: "coordinates must be [longitude, latitude]",
      },
    },
  },
  { _id: false }
);

// ---------------------------------------------------------------------------
// Listing interface
// ---------------------------------------------------------------------------

export type ListingStatus = "active" | "inactive" | "archived";
export type ListingType = "hotel" | "apartment" | "villa" | "hostel" | "resort";

export interface IListing {
  _id: Types.ObjectId;

  /** Reference to the owning User document. */
  ownerId: Types.ObjectId;

  title: string;
  description: string;
  type: ListingType;
  status: ListingStatus;

  address: IListingAddress;

  /** Price per night in the smallest currency unit (e.g., cents/paisa). */
  pricePerNight: number;

  /** Maximum number of guests allowed. */
  maxGuests: number;

  /** Total number of bedrooms. */
  bedrooms: number;

  /** Total number of bathrooms. */
  bathrooms: number;

  /** Array of amenity slugs, e.g. ["wifi", "pool", "parking"]. */
  amenities: string[];

  /**
   * Denormalised aggregate rating.  Updated by the review mutation handler
   * after every approved review write.
   *
   *   averageRating = sum(review.rating) / totalReviews
   *
   * Stored here to support O(1) listing-card rendering without a $lookup.
   */
  averageRating: number;
  totalReviews: number;

  /** Array of image URLs (CDN paths). */
  images: string[];

  createdAt: Date;
  updatedAt: Date;
}

export type ListingDocument = IListing & Document<Types.ObjectId>;

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

const ListingSchema = new Schema<IListing>(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 3000,
    },
    type: {
      type: String,
      enum: ["hotel", "apartment", "villa", "hostel", "resort"] as const,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "archived"] as const,
      default: "active",
      index: true,
    },
    address: {
      type: ListingAddressSchema,
      required: true,
    },
    pricePerNight: {
      type: Number,
      required: true,
      min: [1, "pricePerNight must be at least 1"],
    },
    maxGuests: {
      type: Number,
      required: true,
      min: [1, "maxGuests must be at least 1"],
    },
    bedrooms: {
      type: Number,
      required: true,
      min: [0, "bedrooms cannot be negative"],
    },
    bathrooms: {
      type: Number,
      required: true,
      min: [0, "bathrooms cannot be negative"],
    },
    amenities: {
      type: [String],
      default: [],
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
      min: 0,
    },
    images: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    collection: "listings",
    versionKey: false,
  }
);

// ---------------------------------------------------------------------------
// Indexes
// ---------------------------------------------------------------------------

/**
 * 2dsphere index enables geospatial queries:
 *   db.listings.find({ "address.coordinates": { $near: { ... } } })
 * Used by the "listings near me" search endpoint.
 */
ListingSchema.index({ "address.coordinates": "2dsphere" });

/**
 * Compound index for the most common listing-search query:
 *   { status: "active", type: <value>, pricePerNight: <range> }
 */
ListingSchema.index({ status: 1, type: 1, pricePerNight: 1 });

/**
 * Index supporting owner dashboard queries:
 *   Listing.find({ ownerId, status })
 */
ListingSchema.index({ ownerId: 1, status: 1 });

// ---------------------------------------------------------------------------
// Model (hot-reload–safe)
// ---------------------------------------------------------------------------

export const ListingModel: Model<IListing> =
  (mongoose.models.Listing as Model<IListing> | undefined) ?? mongoose.model<IListing>("Listing", ListingSchema);
