import mongoose, { type Document, type Model, Schema } from "mongoose";

export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

export interface IPriceSummary {
  perNight: number;
  numberOfNights: number;
  cleaningFee: number;
  serviceFee: number;
  totalCost: number;
  currency: string;
}

export interface IPaymentInfo {
  stripeSessionId: string;
  stripePaymentIntentId?: string;
  amountPaid?: number;
  paidAt?: Date;
}

export interface IBillingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  country: string;
  postalCode: string;
}

export interface IBooking {
  propertyId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  checkin: Date;
  checkout: Date;
  guests: number;
  status: BookingStatus;
  priceSummary: IPriceSummary;
  paymentInfo: IPaymentInfo; // Added missing type definition here
  billingAddress: IBillingAddress;
  receiptSentAt?: Date;
}

export interface IBookingDocument extends IBooking, Document {
  createdAt: Date;
  updatedAt: Date;
}

const priceSummarySchema = new Schema<IPriceSummary>(
  {
    perNight: { type: Number, required: true },
    numberOfNights: { type: Number, required: true },
    cleaningFee: { type: Number, required: true },
    serviceFee: { type: Number, required: true },
    totalCost: { type: Number, required: true },
    currency: { type: String, default: "USD" },
  },
  { _id: false }
);

const PaymentInfoSchema = new Schema<IPaymentInfo>(
  {
    stripeSessionId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    stripePaymentIntentId: {
      type: String,
      trim: true,
    },
    amountPaid: {
      type: Number,
      min: 0,
    },
    paidAt: {
      type: Date,
    },
  },
  { _id: false }
);

const billingAddressSchema = new Schema<IBillingAddress>(
  {
    fullName: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    state: { type: String },
    country: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  { _id: false }
);

const bookingSchema = new Schema<IBookingDocument>(
  {
    propertyId: { type: Schema.Types.ObjectId, ref: "Property", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    checkin: { type: Date, required: true },
    checkout: { type: Date, required: true },
    guests: { type: Number, required: true, min: 1 },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"] satisfies BookingStatus[],
      default: "pending",
    },
    priceSummary: { type: priceSummarySchema, required: true },
    paymentInfo: { type: PaymentInfoSchema, required: true },
    billingAddress: { type: billingAddressSchema },
    receiptSentAt: { type: Date },
  },
  { timestamps: true }
);

// Fixed: Mapped compound indexes to use the actual schema paths (userId and propertyId)
bookingSchema.index({ userId: 1 });
bookingSchema.index({ propertyId: 1 });
bookingSchema.index({ propertyId: 1, userId: 1 });
bookingSchema.index({ status: 1 });

const Booking: Model<IBookingDocument> =
  (mongoose.models.Booking as Model<IBookingDocument>) || mongoose.model<IBookingDocument>("Booking", bookingSchema);

export default Booking;
