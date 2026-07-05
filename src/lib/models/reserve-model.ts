/**
 * lib/models/Reservation.model.ts
 *
 * Mongoose schema for the `reservations` collection.
 *
 * The Reservation document is the third gate in the review mutex:
 *
 *   Gate 3 — Verified reservation gate
 *   ────────────────────────────────────
 *   Before any review write is permitted, the handler asserts:
 *
 *     ReservationModel.exists({
 *       guestId:   session.userId,
 *       listingId: <target listing>,
 *       status:    "completed",
 *       checkOut:  { $lte: new Date() },
 *     })
 *
 *   A missing or non-completed document → 403 Forbidden.
 *
 * Hot-reload guard:
 *   mongoose.models.Reservation ?? mongoose.model('Reservation', ...)
 */

import mongoose, {
  type Document,
  type Model,
  Schema,
  Types,
} from "mongoose";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Reservation lifecycle:
 *
 *   pending   → confirmed  (owner or system accepts)
 *   confirmed → checked_in (guest checks in on checkIn date)
 *   checked_in → completed (guest checks out on/after checkOut date)
 *   pending | confirmed → cancelled (guest or owner cancels)
 *
 * Only `completed` reservations unlock the review gate.
 */
export type ReservationStatus =
  | "pending"
  | "confirmed"
  | "checked_in"
  | "completed"
  | "cancelled";

export interface IReservation {
  _id:       Types.ObjectId;

  /** Guest who made the booking — referenced as guestId in review mutex. */
  guestId:   Types.ObjectId;

  /** Listing being reserved. */
  listingId: Types.ObjectId;

  checkIn:   Date;
  checkOut:  Date;

  /** Number of guests declared at booking time. */
  guestCount: number;

  /**
   * Total price in smallest currency unit (cents/paisa), locked at the time
   * of booking.  Persisting it here makes the value immutable even if the
   * listing's pricePerNight changes later.
   */
  totalPrice: number;

  status:    ReservationStatus;

  /**
   * Cancellation metadata — populated only when status === "cancelled".
   */
  cancellation: {
    cancelledAt: Date;
    cancelledBy: "guest" | "owner" | "system";
    reason:      string | null;
  } | null;

  createdAt: Date;
  updatedAt: Date;
}

export type ReservationDocument = IReservation & Document<Types.ObjectId>;

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

const CancellationSchema = new Schema(
  {
    cancelledAt: { type: Date,   required: true },
    cancelledBy: {
      type:     String,
      enum:     ["guest", "owner", "system"] as const,
      required: true,
    },
    reason: { type: String, default: null },
  },
  { _id: false }
);

const ReservationSchema = new Schema<IReservation>(
  {
    guestId: {
      type:     Schema.Types.ObjectId,
      ref:      "User",
      required: true,
      index:    true,
    },
    listingId: {
      type:     Schema.Types.ObjectId,
      ref:      "Listing",
      required: true,
      index:    true,
    },
    checkIn: {
      type:     Date,
      required: true,
    },
    checkOut: {
      type:     Date,
      required: true,
    },
    guestCount: {
      type:     Number,
      required: true,
      min:      [1, "guestCount must be at least 1"],
    },
    totalPrice: {
      type:     Number,
      required: true,
      min:      [0, "totalPrice cannot be negative"],
    },
    status: {
      type:    String,
      enum:    ["pending", "confirmed", "checked_in", "completed", "cancelled"] as const,
      default: "pending",
      index:   true,
    },
    cancellation: {
      type:    CancellationSchema,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: "reservations",
    versionKey: false,
  }
);

// ---------------------------------------------------------------------------
// Validation — checkOut must be after checkIn
// ---------------------------------------------------------------------------

ReservationSchema.pre("validate", function (next) {
  if (this.checkOut <= this.checkIn) {
    this.invalidate(
      "checkOut",
      "checkOut must be strictly after checkIn",
      this.checkOut
    );
  }
  next();
});

// ---------------------------------------------------------------------------
// Indexes
// ---------------------------------------------------------------------------

/**
 * Primary review-gate query index:
 *   { guestId, listingId, status, checkOut }
 *
 * Covers the exact query issued by the review mutex:
 *   ReservationModel.exists({ guestId, listingId, status: "completed", checkOut: { $lte: now } })
 *
 * Field order follows ESR (Equality → Sort → Range) rule:
 *   guestId   = Equality
 *   listingId = Equality
 *   status    = Equality
 *   checkOut  = Range ($lte)
 */
ReservationSchema.index({ guestId: 1, listingId: 1, status: 1, checkOut: 1 });

/**
 * Availability / overlap detection query:
 *   { listingId, status, checkIn, checkOut }
 * Used when creating a new reservation to detect date conflicts.
 */
ReservationSchema.index({ listingId: 1, status: 1, checkIn: 1, checkOut: 1 });

/**
 * Guest dashboard — "my bookings" query:
 *   { guestId, status, createdAt }
 */
ReservationSchema.index({ guestId: 1, status: 1, createdAt: -1 });

// ---------------------------------------------------------------------------
// Model (hot-reload–safe)
// ---------------------------------------------------------------------------

export const ReservationModel: Model<IReservation> =
  (mongoose.models.Reservation as Model<IReservation> | undefined) ??
  mongoose.model<IReservation>("Reservation", ReservationSchema);
