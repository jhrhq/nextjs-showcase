import mongoose, { type Document, type Model, Schema } from "mongoose";

// ─── Interfaces ───────────────────────────────────────────────────────────────

export type PaymentStatus = "pending" | "succeeded" | "failed" | "refunded";

export type PaymentMethod = "card" | "google_pay" | "apple_pay" | "bank_transfer";

export interface IPayment {
  booking: mongoose.Types.ObjectId; // ref → Booking (1-to-1)
  guest: mongoose.Types.ObjectId; // ref → User (denormalised for quick lookup)
  amount: number; // total charged — mirrors Booking.priceSummary.totalCost
  currency: string;
  status: PaymentStatus;
  method: PaymentMethod;
  // Store gateway transaction ID (e.g. Stripe charge ID) for reconciliation
  transactionId?: string;
  paidAt?: Date; // set when status → "succeeded"
  refundedAt?: Date; // set when status → "refunded"
}

export interface IPaymentDocument extends IPayment, Document {
  createdAt: Date;
  updatedAt: Date;
}

// ─── Schema ───────────────────────────────────────────────────────────────────

const paymentSchema = new Schema<IPaymentDocument>(
  {
    booking: { type: Schema.Types.ObjectId, ref: "Booking", required: true, unique: true },
    guest: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    status: {
      type: String,
      enum: ["pending", "succeeded", "failed", "refunded"] satisfies PaymentStatus[],
      default: "pending",
    },
    method: {
      type: String,
      enum: ["card", "google_pay", "apple_pay", "bank_transfer"] satisfies PaymentMethod[],
      required: true,
    },
    transactionId: { type: String },
    paidAt: { type: Date },
    refundedAt: { type: Date },
  },
  { timestamps: true }
);

paymentSchema.index({ guest: 1 });
paymentSchema.index({ status: 1 });
paymentSchema.index({ transactionId: 1 }, { sparse: true }); // gateway lookup

const Payment: Model<IPaymentDocument> =
  (mongoose.models.Payment as Model<IPaymentDocument>) || mongoose.model<IPaymentDocument>("Payment", paymentSchema);

export default Payment;
