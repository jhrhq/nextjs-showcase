"use server";

import { differenceInDays, parseISO } from "date-fns";
import mongoose from "mongoose";
import { headers } from "next/headers";
import type { Stripe } from "stripe";
import { stripe } from "@/lib/stripe-configs/stripe";
import { formatAmountForStripe } from "@/lib/stripe-configs/stripe-helpers";
import { connectToDatabase } from "../config/database";
import { AUTH_CONFIG } from "../constants/auth.constants";
import { Booking, Property } from "../models";
import type { PaymentInput } from "../validationSchema/payment-form-schema";

export async function createCheckoutSession(
  data: PaymentInput
): Promise<{ client_secret: string | null; url: string | null }> {
  const originHeader = await headers();
  const origin = originHeader.get("origin") as string;

  const property = await Property.findById(data.propertyId);
  if (!property) throw new Error("Property no found");

  const checkinDate = parseISO(data.checkin);
  const checkoutDate = parseISO(data.checkout);
  const numberOfNights = Math.max(1, differenceInDays(checkoutDate, checkinDate));

  const { perNight, cleaningFee, serviceFee } = property.pricing;
  const totalCost = perNight * numberOfNights + cleaningFee + serviceFee;

  const preGeneratedBookingId = new mongoose.Types.ObjectId();

  const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create({
    mode: "payment",
    submit_type: "pay",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `Stay at ${property.title}`,
            description: `${numberOfNights} nights reservation`,
          },
          unit_amount: Math.round(totalCost * 100),
        },
        quantity: 1,
      },
    ],
    // Metadata only handles flat strings - perfect match for input data
    metadata: {
      bookingId: preGeneratedBookingId.toString(),
      userId: data.userId,
      propertyId: data.propertyId,
      checkin: data.checkin,
      checkout: data.checkout,
      guests: data.guests,
    },

    ...{
      return_url: `${origin}${AUTH_CONFIG.ROUTES.BOOKING_SUCCESS(data.propertyId)}?session_id={CHECKOUT_SESSION_ID}`,
    },

    ui_mode: "embedded_page",
  });

  await connectToDatabase();
  await Booking.create({
    _id: preGeneratedBookingId,
    propertyId: new mongoose.Types.ObjectId(data.propertyId),
    userId: new mongoose.Types.ObjectId(data.userId),
    checkin: checkinDate,
    checkout: checkoutDate,
    guests: data.guests,
    status: "pending",
    priceSummary: { perNight, numberOfNights, cleaningFee, serviceFee, totalCost, currency: "usd" },
    paymentInfo: {
      stripeSessionId: checkoutSession.id,
      stripePaymentIntentId: checkoutSession.payment_intent,
      amountPaid: checkoutSession.amount_total,
      paidAt: new Date(checkoutSession.created * 1000),
    },
  });

  return {
    client_secret: checkoutSession.client_secret,
    url: checkoutSession.url,
  };
}

export async function createPaymentIntent(data: FormData): Promise<{ client_secret: string }> {
  const paymentIntent: Stripe.PaymentIntent = await stripe.paymentIntents.create({
    amount: formatAmountForStripe(Number(data.get("customDonation") as string), "usd"),
    automatic_payment_methods: { enabled: true },
    currency: "usd",
  });

  return { client_secret: paymentIntent.client_secret as string };
}
