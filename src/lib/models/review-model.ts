/**
 * lib/models/Review.model.ts
 *
 * Mongoose schema for the `reviews` collection.
 *
 * This schema is the database-layer half of the review mutex.  The
 * application-layer half lives in the review Route Handler (module 6).
 *
 * Three-gate enforcement matrix
 * ──────────────────────────────
 *
 *  Gate 1 — Ownership blacklist (application layer)
 *    Listing.ownerId === session.userId → 403
 *    Prevents owners from reviewing their own properties.
 *
 *  Gate 2 — One-review cap (DB layer — this schema)
 *    Unique compound index: { userId: 1, listingId: 1 }
 *    A duplicate write throws MongoServerError code 11000 → handler returns 409.
 *
 *  Gate 3 — Verified reservation gate (application layer)
 *    Reservation must exist with { guestId, listingId, status: "completed",
 *    checkOut: { $lte: now } } → 403 if absent.
 *
 * Having Gate 2 enforced at the database level (unique index) means that
 * even if two concurrent requests bypass the application-layer check, only
 * one write succeeds — the second gets a write conflict that the handler
 * maps to a 409 Conflict response.
 *
 * Hot-reload guard:
 *   mongoose.models.Review ?? mongoose.model('Review', ReviewSchema)
 */

import mongoose, { type Document, type Model, Schema, Types } from "mongoose";

// ---------------------------------------------------------------------------
// Interface
// ---------------------------------------------------------------------------

/**
 * Rating is a discrete integer in [1, 5].
 * Stored as a Number in MongoDB; Zod validates the range at the API boundary.
 */
export type ReviewRating = 1 | 2 | 3 | 4 | 5;

export interface IReview {
  _id: Types.ObjectId;

  /** The guest who authored this review. */
  userId: Types.ObjectId;

  /** The listing being reviewed. */
  listingId: Types.ObjectId;

  /**
   * The completed reservation that unlocked this review.
   *
   * Storing the reservationId here creates an auditable link: any review can
   * be traced back to the specific stay that earned the right to post it.
   * It also allows the handler to assert the reservation has not already been
   * used to post a review for the same listing (belt-and-suspenders on top of
   * the unique index).
   */
  reservationId: Types.ObjectId;

  rating: ReviewRating;
  comment: string;

  /**
   * Moderation state.
   *   "published" — visible to all users.
   *   "pending"   — awaiting admin review (e.g., flagged by another user).
   *   "removed"   — soft-deleted by admin; not shown on listing page.
   */
  moderationStatus: "published" | "pending" | "removed";

  createdAt: Date;
  updatedAt: Date;
}

export type ReviewDocument = IReview & Document<Types.ObjectId>;

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

const ReviewSchema = new Schema<IReview>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    listingId: {
      type: Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
      index: true,
    },
    reservationId: {
      type: Schema.Types.ObjectId,
      ref: "Reservation",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: [1, "rating must be between 1 and 5"],
      max: [5, "rating must be between 1 and 5"],
      /**
       * Enforce integer constraint at the schema level.
       * Zod also validates this at the API boundary, but defence-in-depth
       * means a direct DB write (e.g. from a script) cannot insert 3.7.
       */
      validate: {
        validator: (v: number) => Number.isInteger(v),
        message: "rating must be an integer",
      },
    },
    comment: {
      type: String,
      required: true,
      trim: true,
      minlength: [10, "comment must be at least 10 characters"],
      maxlength: [2000, "comment must not exceed 2000 characters"],
    },
    moderationStatus: {
      type: String,
      enum: ["published", "pending", "removed"] as const,
      default: "published",
      index: true,
    },
  },
  {
    timestamps: true,
    collection: "reviews",
    versionKey: false,
  }
);

// ---------------------------------------------------------------------------
// Indexes
// ---------------------------------------------------------------------------

/**
 * Gate 2 — One-review-per-user-per-listing.
 *
 * `unique: true` causes MongoDB to reject any second document with the same
 * (userId, listingId) pair with a MongoServerError { code: 11000 }.
 *
 * The Route Handler catches this specific error code and returns HTTP 409
 * rather than letting a 500 bubble to the client.
 *
 * Why not enforce this only at the application layer?
 *   Application-layer guards are subject to TOCTOU (time-of-check /
 *   time-of-use) races under concurrent requests.  The unique index is
 *   atomic from MongoDB's perspective — the second writer always loses,
 *   deterministically, with no race window.
 */
ReviewSchema.index(
  { userId: 1, listingId: 1 },
  {
    unique: true,
    name: "unique_review_per_user_per_listing",
  }
);

/**
 * Listing-page aggregation index:
 *   { listingId, moderationStatus, createdAt }
 *
 * Covers the paginated review feed query:
 *   Review.find({ listingId, moderationStatus: "published" })
 *         .sort({ createdAt: -1 })
 *         .skip(offset)
 *         .limit(pageSize)
 */
ReviewSchema.index({ listingId: 1, moderationStatus: 1, createdAt: -1 });

/**
 * User profile — "my reviews" query:
 *   { userId, createdAt }
 */
ReviewSchema.index({ userId: 1, createdAt: -1 });

/**
 * Reservation audit trail — look up the review tied to a specific stay:
 *   { reservationId }
 * Sparse because many reservations will never have a corresponding review.
 */
ReviewSchema.index({ reservationId: 1 }, { sparse: true });

// ---------------------------------------------------------------------------
// Model (hot-reload–safe)
// ---------------------------------------------------------------------------

export const ReviewModel: Model<IReview> =
  (mongoose.models.Review as Model<IReview> | undefined) ?? mongoose.model<IReview>("Review", ReviewSchema);
