"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field";
import { authClient } from "@/lib/auth-client";
import { createCheckoutSession } from "../../actions";
import { useBookingParams } from "../../hooks/use-booking-params";
import type { PaymentInput } from "../../validationSchema/payment-form.schema";
import CheckoutClient from "./checkout-client";

interface IPropertyPricing {
  perNight: number;
  cleaningFee: number;
  serviceFee: number;
}

type PaymentFormProps = {
  propertyId: string;
  pricing: IPropertyPricing;
  maxGuests: number;
};

export default function PaymentForm({ maxGuests, pricing, propertyId }: PaymentFormProps) {
  const params = useParams<{ id: string }>();
  const { data: session, isPending: isAuthPending } = authClient.useSession();
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const { checkinStr, checkoutStr, guestsCount, calculatedNights } = useBookingParams(maxGuests);

  const { perNight, cleaningFee, serviceFee } = pricing;
  const totalPrice = calculatedNights > 0 ? perNight * calculatedNights + cleaningFee + serviceFee : 0;

  const form = useForm<PaymentInput>({
    values: {
      uiMode: "embedded_page",
      userId: session?.user?.id ?? "",
      propertyId: params.id ?? propertyId ?? "",
      checkin: checkinStr,
      checkout: checkoutStr,
      guests: guestsCount,
      totalPrice,
    },
  });

  const isSubmitting = form.formState.isSubmitting;
  const isDisabled = isSubmitting || isAuthPending || !session || calculatedNights === 0;

  // biome-ignore lint/correctness/useExhaustiveDependencies: suppress dependency to recheck checkinStr, checkoutStr,guestsCount
  useEffect(() => {
    setClientSecret(null);
  }, [checkinStr, checkoutStr, guestsCount]);

  async function onSubmit(values: PaymentInput) {
    if (!values.userId || !values.propertyId || !values.checkin || !values.checkout || calculatedNights === 0) {
      form.setError("root.serverError", {
        type: "custom",
        message: "Booking details are incomplete. Please verify dates and ensure you are logged in.",
      });
      return;
    }

    try {
      const { client_secret } = await createCheckoutSession(values);
      setClientSecret(client_secret);
    } catch {
      form.setError("root.serverError", {
        message: "Payment processing failed. Please try again.",
      });
    }
  }

  return (
    <>
      {/* Form Submission */}
      <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-10">
        {form.formState.errors?.root?.serverError && <FieldError errors={[form.formState.errors.root.serverError]} />}
        <Button
          type="submit"
          disabled={isDisabled}
          className="w-full text-base h-12 bg-primary text-white rounded-xl py-3 hover:bg-primary/90 active:scale-[0.99] transition-all font-medium shadow-sm"
        >
          {isAuthPending ? (
            "Verifying session..."
          ) : isSubmitting ? (
            <span className="submitLoader" />
          ) : calculatedNights === 0 ? (
            "Select dates to continue"
          ) : (
            "Request to book"
          )}
        </Button>
      </form>

      <CheckoutClient clientSecret={clientSecret} />
    </>
  );
}
