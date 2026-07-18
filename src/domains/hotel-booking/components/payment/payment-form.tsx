"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
// import type Stripe from "stripe";
import { FieldError, FieldGroup } from "@/domains/hotel-booking/components/ui/field";
import type { PaymentInput } from "@/domains/hotel-booking/validationSchema/payment-form-schema";
import { authClient } from "@/lib/auth-client";
import { createCheckoutSession } from "../../actions/stripe-action";
import type { IPropertyDocument } from "../../models/Property.model";
import { Button } from "../ui/button";
import CheckoutClient from "./checkout-client";

type PaymentFormProps = {
  property: IPropertyDocument;
  totalNights: number;
};

export default function PaymentForm({ property, totalNights }: PaymentFormProps) {
  // 1. Group Hooks cleanly at the top level
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const { data: session, isPending: isAuthPending } = authClient.useSession();

  const [clientSecret, setClientSecret] = useState<string | null>(null);

  // 2. Parse pricing and URL parameters safely
  const checkin = searchParams.get("checkin") || "";
  const checkout = searchParams.get("checkout") || "";
  const guests = searchParams.get("guests") || "";

  const { perNight, cleaningFee, serviceFee } = property.pricing;
  const accommodationCost = perNight * totalNights;
  const totalPrice = accommodationCost + cleaningFee + serviceFee;

  const form = useForm<PaymentInput>({
    // resolver: zodResolver(paymentSchema),
    values: {
      uiMode: "embedded",
      userId: session?.user.id ?? "",
      propertyId: params.id ?? "",
      checkin,
      checkout,
      guests: Number(guests),
      totalPrice,
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const isDisabled = isSubmitting || isAuthPending || !session;

  async function onSubmit(values: PaymentInput) {
    const requiredKeys: (keyof PaymentInput)[] = ["userId", "propertyId", "checkin", "checkout", "guests"];

    const hasMissingMetadata = requiredKeys.some((key) => !values[key]?.toString().trim());

    if (hasMissingMetadata || !values.totalPrice) {
      form.setError("root.serverError", {
        type: "custom",
        message: "Booking details are incomplete. Please ensure you are logged in and have selected valid dates.",
      });
      return;
    }

    try {
      const { client_secret } = await createCheckoutSession(values);
      setClientSecret(client_secret);
    } catch (_error) {
      form.setError("root.serverError", {
        message: "Payment processing failed. Please try again.",
      });
    }
  }

  return (
    <>
      <form id="payment-booking-form" noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">Pay with American Express</h2>

          <FieldGroup className="space-y-4">
            <input {...form.register("uiMode")} type="hidden" />
            <input {...form.register("userId")} type="hidden" />
            <input {...form.register("propertyId")} type="hidden" />
            <input {...form.register("checkin")} type="hidden" />
            <input {...form.register("checkout")} type="hidden" />
            <input {...form.register("guests")} type="hidden" />
            <input {...form.register("totalPrice")} type="hidden" />
          </FieldGroup>
        </section>

        {/* Global Server Catch Block */}
        {form.formState.errors?.root?.serverError && <FieldError errors={[form.formState.errors.root.serverError]} />}

        <Button
          type="submit"
          form="payment-booking-form"
          disabled={isDisabled}
          className="w-full text-base h-12 bg-primary text-white rounded-lg py-3 hover:bg-primary/90 transition-all font-medium"
        >
          {isAuthPending ? (
            "Verifying session..."
          ) : isSubmitting ? (
            <span className="submitLoader" />
          ) : (
            "Request to book"
          )}
        </Button>
      </form>

      {/* Stripe Interactive Node */}
      <CheckoutClient clientSecret={clientSecret} />
    </>
  );
}
