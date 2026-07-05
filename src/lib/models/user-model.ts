/**
 * lib/models/User.model.ts
 *
 * Mongoose schema for the `users` collection.
 *
 * Better Auth writes its own fields into this collection via the MongoDB
 * adapter.  The fields defined here extend the Better Auth baseline with
 * hotel-booking–specific profile data.
 *
 * Compatibility contract
 * ──────────────────────
 * Better Auth expects the following field names (snake_case) in the users
 * collection:
 *   _id, email, emailVerified, name, image, createdAt, updatedAt
 *
 * We define them explicitly so Mongoose validation and TypeScript types stay
 * in sync with what Better Auth reads and writes.
 *
 * Hot-reload guard
 * ────────────────
 * `mongoose.models.User || mongoose.model('User', UserSchema)` prevents
 * Next.js from re-registering the model on every hot-reload cycle.
 */

import mongoose, { type Document, type Model, Schema, Types } from "mongoose";

// ---------------------------------------------------------------------------
// Embedded sub-document: address
// ---------------------------------------------------------------------------

export interface IAddress {
  street:  string;
  city:    string;
  country: string;
  zip:     string;
}

const AddressSchema = new Schema<IAddress>(
  {
    street:  { type: String, required: true, trim: true },
    city:    { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    zip:     { type: String, required: true, trim: true },
  },
  { _id: false }   // Embedded — no separate _id needed.
);

// ---------------------------------------------------------------------------
// User interface
// ---------------------------------------------------------------------------

export interface IUser {
  // ── Better Auth baseline fields ──────────────────────────────────────────
  _id:           Types.ObjectId;
  email:         string;
  emailVerified: boolean;
  name:          string;
  image:         string | null;
  createdAt:     Date;
  updatedAt:     Date;

  // ── Hotel-booking profile extensions ────────────────────────────────────
  /** Phone number in E.164 format, e.g. "+8801700000000". */
  phone:        string | null;
  address:      IAddress | null;

  /**
   * Role determines which server-side guards are applied:
   *   "guest"  — can search listings, make reservations, leave reviews.
   *   "owner"  — can create and manage listings; blacklisted from reviewing
   *              their own properties (enforced in the review mutex).
   *   "admin"  — platform-level access; can manage all resources.
   */
  role:         "guest" | "owner" | "admin";

  /** Soft-delete flag.  Deleted accounts cannot sign in. */
  isActive:     boolean;
}

/** Mongoose Document type for the User model. */
export type UserDocument = IUser & Document<Types.ObjectId>;

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

const UserSchema = new Schema<IUser>(
  {
    // ── Better Auth baseline ─────────────────────────────────────────────
    email: {
      type:     String,
      required: true,
      unique:   true,
      lowercase: true,
      trim:     true,
      index:    true,
    },
    emailVerified: {
      type:    Boolean,
      default: false,
    },
    name: {
      type:     String,
      required: true,
      trim:     true,
    },
    image: {
      type:    String,
      default: null,
    },

    // ── Hotel-booking profile extensions ─────────────────────────────────
    phone: {
      type:    String,
      default: null,
      trim:    true,
    },
    address: {
      type:    AddressSchema,
      default: null,
    },
    role: {
      type:    String,
      enum:    ["guest", "owner", "admin"] as const,
      default: "guest",
      index:   true,
    },
    isActive: {
      type:    Boolean,
      default: true,
      index:   true,
    },
  },
  {
    /**
     * timestamps: true instructs Mongoose to manage `createdAt` and
     * `updatedAt` automatically.  Better Auth also writes these fields, so
     * the values will be consistent.
     */
    timestamps:  true,
    collection:  "users",
    versionKey:  false,   // Suppress __v — Better Auth does not expect it.
  }
);

// ---------------------------------------------------------------------------
// Indexes
// ---------------------------------------------------------------------------

/**
 * Compound sparse index on (email, isActive) supports the common query:
 *   User.findOne({ email, isActive: true })
 * used by the credentials sign-in path.
 */
UserSchema.index({ email: 1, isActive: 1 });

// ---------------------------------------------------------------------------
// Model (hot-reload–safe)
// ---------------------------------------------------------------------------

export const UserModel: Model<IUser> =
  (mongoose.models.User as Model<IUser> | undefined) ??
  mongoose.model<IUser>("User", UserSchema);
