"use server";

import { parseISO } from "date-fns";
import mongoose from "mongoose";
import { parseServerError } from "@/lib/auth-error";
import { stripe } from "@/lib/stripe-configs/stripe";
import type { ActionState } from "@/types/shared/action.types";
import { connectToDatabase } from "../config/database";
import { Booking } from "../models";

export async function createBookingFromSessionAction(sessionId: string): Promise<ActionState<{ bookingId: string }>> {
  try {
    if (!sessionId) {
      return { success: false, message: "Stripe session ID is required." };
    }

    await connectToDatabase();

    const existingBooking = await Booking.findOne({
      "paymentInfo.stripeSessionId": sessionId,
    });

    if (existingBooking) {
      return {
        success: true,
        data: { bookingId: existingBooking._id.toString() },
      };
    }

    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);

    if (checkoutSession.payment_status !== "paid") {
      return { success: false, message: "Payment has not been completed." };
    }

    const metadata = checkoutSession.metadata;
    if (!metadata) {
      return { success: false, message: "Invalid session metadata." };
    }

    const stripePaymentIntentId =
      typeof checkoutSession.payment_intent === "string"
        ? checkoutSession.payment_intent
        : (checkoutSession.payment_intent?.id ?? "");

    const newBooking = await Booking.create({
      propertyId: new mongoose.Types.ObjectId(metadata.propertyId),
      userId: new mongoose.Types.ObjectId(metadata.userId),
      checkin: parseISO(metadata.checkin),
      checkout: parseISO(metadata.checkout),
      guests: Number(metadata.guests),
      status: "confirmed", // Updated to confirmed since payment is verified
      priceSummary: {
        perNight: Number(metadata.perNight),
        numberOfNights: Number(metadata.numberOfNights),
        cleaningFee: Number(metadata.cleaningFee),
        serviceFee: Number(metadata.serviceFee),
        totalCost: Number(metadata.totalCost),
        currency: "usd",
      },
      paymentInfo: {
        stripeSessionId: checkoutSession.id,
        stripePaymentIntentId,
        amountPaid: checkoutSession.amount_total ?? Math.round(Number(metadata.totalCost) * 100),
        paidAt: new Date(checkoutSession.created * 1000),
      },
    });

    return {
      success: true,
      data: { bookingId: newBooking._id.toString() },
    };
  } catch (error) {
    return {
      success: false,
      message: parseServerError(error),
    };
  }
}
