import type { HydratedDocument, Types } from "mongoose";
import type { BOOKING_STATUSES } from "../constants/booking.constants";
import type { BookingFormValues } from "../validationSchema/booking.schema";
import type { IPricing } from "./property.type";

export type BookingStatus = (typeof BOOKING_STATUSES)[number];

export interface IPriceSummary extends IPricing {
  numberOfNights: number;
  totalCost: number;
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

export interface IBooking extends BookingFormValues {
  _id: Types.ObjectId;
  propertyId: Types.ObjectId;
  userId: Types.ObjectId;
  status: BookingStatus;
  priceSummary: IPriceSummary;
  paymentInfo: IPaymentInfo;
  billingAddress: IBillingAddress;
  receiptSentAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type IBookingDocument = HydratedDocument<IBooking>;
