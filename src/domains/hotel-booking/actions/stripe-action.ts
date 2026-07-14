"use server";

import { headers } from "next/headers";
import type { Stripe } from "stripe";
import { stripe } from "@/lib/stripe-configs/stripe";
import { formatAmountForStripe } from "@/lib/stripe-configs/stripe-helpers";
import type { PaymentInput } from "../validationSchema/payment-form-schema";
// import { parseToUTCMidnight } from "../utils/date-time-utils";

export async function createCheckoutSession(
  data: PaymentInput
): Promise<{ client_secret: string | null; url: string | null }> {
  // const ui_mode = data.get("uiMode") as Stripe.Checkout.SessionCreateParams.UiMode;

  const originHeader = await headers();
  const origin = originHeader.get("origin") as string;
  // const checkInDate = parseToUTCMidnight(data.checkin);
  // const checkOutDate = parseToUTCMidnight(data.checkout);
  const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create({
    mode: "payment",
    submit_type: "pay",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          product_data: {
            name: "Hotel Stay Reservation",
            description: `${data.guests} Guests • Stay from ${data.checkin} to ${data.checkout}`,
          },
          // Stripe requires amounts in cents (525 -> 52500)
          unit_amount: Math.round(data.totalPrice * 100),
        },
      },
    ],
    // Metadata only handles flat strings - perfect match for input data
    metadata: {
      userId: data.userId,
      propertyId: data.propertyId,
      checkin: data.checkin,
      checkout: data.checkout,
      guests: data.guests,
    },

    ...{
      return_url: `${origin}/book/6a4ff659a9e5bd00be602ba5?session_id={CHECKOUT_SESSION_ID}`,
    },

    ui_mode: "embedded_page", // Stripe's modern embedded enum value
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
