"use server";

import { differenceInDays, parseISO } from "date-fns";
import { headers } from "next/headers";
import type { Stripe } from "stripe";
import { auth } from "@/lib/auth";
import { stripe } from "@/lib/stripe-configs/stripe";
import { formatAmountForStripe } from "@/lib/stripe-configs/stripe-helpers";
import { connectToDatabase } from "../config/database";
import { AUTH_CONFIG } from "../constants/auth.constants";
import { PAYMENT_MESSAGES } from "../constants/payment.constants";
import { Property } from "../models";
import type { PaymentInput } from "../validationSchema/payment-form.schema";

export async function createCheckoutSession(
  data: PaymentInput
): Promise<{ client_secret: string | null; url: string | null }> {
  const reqHeaders = await headers();

  const session = await auth.api.getSession({ headers: reqHeaders });
  if (!session?.user?.id) {
    throw new Error(PAYMENT_MESSAGES.UNAUTHORIZED);
  }
  const userId = session.user.id;

  const origin = reqHeaders.get("origin") ?? reqHeaders.get("referer");
  if (!origin) {
    throw new Error(PAYMENT_MESSAGES.MISSING_ORIGIN);
  }

  await connectToDatabase();

  const property = await Property.findById(data.propertyId);
  if (!property) {
    throw new Error(PAYMENT_MESSAGES.PROPERTY_NOT_FOUND);
  }

  const checkinDate = parseISO(data.checkin);
  const checkoutDate = parseISO(data.checkout);
  const numberOfNights = differenceInDays(checkoutDate, checkinDate);

  if (numberOfNights < 1) {
    throw new Error(PAYMENT_MESSAGES.INVALID_DATES);
  }

  const { perNight, cleaningFee, serviceFee } = property.pricing;
  const totalCost = perNight * numberOfNights + cleaningFee + serviceFee;

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
    // Store all booking params in Stripe metadata (strings only)
    metadata: {
      userId,
      propertyId: data.propertyId,
      checkin: data.checkin,
      checkout: data.checkout,
      guests: data.guests.toString(),
      perNight: perNight.toString(),
      numberOfNights: numberOfNights.toString(),
      cleaningFee: cleaningFee.toString(),
      serviceFee: serviceFee.toString(),
      totalCost: totalCost.toString(),
    },
    return_url: `${origin}${AUTH_CONFIG.ROUTES.BOOKING_SUCCESS(data.propertyId)}?session_id={CHECKOUT_SESSION_ID}`,
    ui_mode: "embedded_page",
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
