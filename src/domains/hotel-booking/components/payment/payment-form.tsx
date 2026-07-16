"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
// import type Stripe from "stripe";
import { FieldError, FieldGroup } from "@/domains/hotel-booking/components/ui/field";
import { type PaymentInput, paymentSchema } from "@/domains/hotel-booking/validationSchema/payment-form-schema";
import { authClient } from "@/lib/auth-client";
import getStripe from "@/lib/stripe-configs/get-stripejs";
// import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { createCheckoutSession } from "../../actions/stripe-action";
import type { IPropertyDocument } from "../../models/Property.model";
import { Button } from "../ui/button";

type PaymentFormProps = {
  property: IPropertyDocument;
  totalNights: number;
};

export default function PaymentForm({ property, totalNights }: PaymentFormProps) {
  // const session = authClient.useSession();

  const params = useParams<{ id: string; checkin: string; checkout: string; guests: string }>();
  // 2. Get the query parameters from the search string (?checkin=...)
  const searchParams = useSearchParams();
  const checkin = searchParams.get("checkin"); // '2026-07-14'
  const checkout = searchParams.get("checkout"); // '2026-07-15'
  const guests = searchParams.get("guests"); // '2'

  const { perNight, cleaningFee, serviceFee } = property.pricing;
  const accommodationCost = perNight * totalNights;
  const totalPrice = accommodationCost + cleaningFee + serviceFee;
  const { useSession } = authClient;
  const session = useSession();
  console.log("session", session);

  const form = useForm<PaymentInput>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      uiMode: "embedded",
      userId: "6a4a519456438e2db2115b6f",
      propertyId: params.id,
      checkin: checkin || "",
      checkout: checkout || "",
      guests: guests || "",
      totalPrice: totalPrice,
    },
  });
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const pending = form.formState.isSubmitting;

  async function onSubmit(values: PaymentInput) {
    console.log("Processing payment details:", values);
    const { client_secret, url: _url } = await createCheckoutSession(values);

    return setClientSecret(client_secret);
    // try {
    //   console.log("Processing payment details:", values);
    //   // Execute your payment action here
    // } catch (error) {
    //   form.setError("root.serverError", { message: "Payment processing failed." });
    // }
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

        {/* Submit Interface */}
        <Button
          type="submit"
          form="payment-booking-form"
          disabled={pending}
          className={cn(
            "w-full text-base h-12 bg-primary text-white rounded-lg py-3 hover:bg-primary/90 transition-all font-medium"
          )}
        >
          {pending ? <span className="submitLoader" /> : "Request to book"}
        </Button>
        {/*<Link
        // href="/hotel-booking/payment-success"
        href="/hotel-booking/signin"
        className="w-full block text-center bg-primary text-white py-3 rounded-lg mt-6 hover:brightness-90"
      >
        Request to book login
      </Link>*/}
      </form>
      {clientSecret ? (
        <EmbeddedCheckoutProvider stripe={getStripe()} options={{ clientSecret }}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      ) : null}
    </>
  );
}
