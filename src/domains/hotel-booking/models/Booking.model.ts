import mongoose, { Document, Model, Schema } from "mongoose";

export type BookingStatus =
  | "pending" // reserved, payment not yet confirmed
  | "confirmed" // payment successful → success.html shown
  | "cancelled"
  | "completed"; // check-out date has passed

export interface IPriceSummary {
  perNight: number;
  numberOfNights: number;
  cleaningFee: number; // copied from Property at booking time so it never changes
  serviceFee: number; // copied from Property at booking time so it never changes
  totalCost: number; // perNight × numberOfNights + cleaningFee + serviceFee
  currency: string;
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
  property: mongoose.Types.ObjectId; // ref → Property
  guest: mongoose.Types.ObjectId; // ref → User
  checkIn: Date;
  checkOut: Date;
  guests: number;
  status: BookingStatus;
  priceSummary: IPriceSummary; // snapshot so edits to Property don't affect past bookings
  billingAddress: IBillingAddress; // collected on paymentProcess page
  receiptSentAt?: Date; // set after email receipt is dispatched
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
    property: { type: Schema.Types.ObjectId, ref: "Property", required: true },
    guest: { type: Schema.Types.ObjectId, ref: "User", required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    guests: { type: Number, required: true, min: 1 },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"] satisfies BookingStatus[],
      default: "pending",
    },
    priceSummary: { type: priceSummarySchema, required: true },
    billingAddress: { type: billingAddressSchema, required: true },
    receiptSentAt: { type: Date },
  },
  { timestamps: true }
);

bookingSchema.index({ guest: 1 }); // Bookings page — list user's bookings
bookingSchema.index({ property: 1 }); // host's manage view
bookingSchema.index({ property: 1, guest: 1 }); // check if guest has booked → unlock review button
bookingSchema.index({ status: 1 });

const Booking: Model<IBookingDocument> =
  (mongoose.models.Booking as Model<IBookingDocument>) || mongoose.model<IBookingDocument>("Booking", bookingSchema);

export default Booking;
