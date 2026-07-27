import Stripe from "stripe";
import { connectToDatabase } from "../config/database";
import type { IBookingDocument } from "../models/Booking.model";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

/**
 * Checks a pending booking against Stripe to ensure database consistency
 * even if the user completely bypassed the redirect return URL page.
 */
export async function reconcileBookingStatus(booking: IBookingDocument) {
  if (booking.status !== "pending") return booking;

  try {
    await connectToDatabase();

    // Retrieve latest status directly from Stripe API
    const session = await stripe.checkout.sessions.retrieve(booking.paymentInfo.stripeSessionId);

    if (session.status === "complete" && session.payment_status === "paid") {
      booking.status = "confirmed";
      booking.paymentInfo.stripePaymentIntentId = session.payment_intent as string;
      booking.paymentInfo.paidAt = new Date();

      await booking.save();
    }
  } catch (error) {
    console.error(`Failed to reconcile booking ID ${booking._id}:`, error);
  }

  return booking;
}
