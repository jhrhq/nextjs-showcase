"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup } from "@/domains/hotel-booking/components/ui/field";
import { Input } from "@/domains/hotel-booking/components/ui/input";
import { type PaymentInput, paymentSchema } from "@/domains/hotel-booking/validationSchema/payment-form-schema";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export default function PaymentForm() {
  const form = useForm<PaymentInput>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: "",
      expiration: "",
      cvv: "",
      streetAddress: "",
      aptSuite: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  const pending = form.formState.isSubmitting;

  async function onSubmit(values: PaymentInput) {
    try {
      console.log("Processing payment details:", values);
      // Execute your payment action here
    } catch (error) {
      form.setError("root.serverError", { message: "Payment processing failed." });
    }
  }

  return (
    <form id="payment-booking-form" noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      {/* Payment Details Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">Pay with American Express</h2>
        <FieldGroup className="space-y-4">
          {/* Card Number */}
          <Controller
            name="cardNumber"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  type="text"
                  placeholder="Card number"
                  className="w-full h-auto  rounded-lg px-4 py-3
              border border-gray-300  focus:outline-none focus:ring-2 focus:ring-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0"
                  aria-invalid={fieldState.invalid}
                  autoComplete="cc-number"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            {/* Expiration Date */}
            <Controller
              name="expiration"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Expiration (MM/YY)"
                    className="w-full h-auto  rounded-lg px-4 py-3
                border border-gray-300  focus:outline-none focus:ring-2 focus:ring-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0"
                    aria-invalid={fieldState.invalid}
                    autoComplete="cc-exp"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* CVV */}
            <Controller
              name="cvv"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    type="text"
                    placeholder="CVV"
                    className="w-full h-auto  rounded-lg px-4 py-3
                border border-gray-300  focus:outline-none focus:ring-2 focus:ring-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0"
                    aria-invalid={fieldState.invalid}
                    autoComplete="cc-csc"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>
        </FieldGroup>
      </section>

      {/* Billing Address Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">Billing address</h2>
        <FieldGroup className="space-y-4">
          {/* Street Address */}
          <Controller
            name="streetAddress"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  type="text"
                  placeholder="Street address"
                  className="w-full h-auto  rounded-lg px-4 py-3
              border border-gray-300  focus:outline-none focus:ring-2 focus:ring-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0"
                  aria-invalid={fieldState.invalid}
                  autoComplete="street-address"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Apt or Suite Number */}
          <Controller
            name="aptSuite"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  type="text"
                  placeholder="Apt or suite number (optional)"
                  className="w-full h-auto  rounded-lg px-4 py-3
              border border-gray-300  focus:outline-none focus:ring-2 focus:ring-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* City */}
          <Controller
            name="city"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  type="text"
                  placeholder="City"
                  className="w-full h-auto  rounded-lg px-4 py-3
              border border-gray-300  focus:outline-none focus:ring-2 focus:ring-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0"
                  aria-invalid={fieldState.invalid}
                  autoComplete="address-level2"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            {/* State */}
            <Controller
              name="state"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    type="text"
                    placeholder="State"
                    className="w-full h-auto  rounded-lg px-4 py-3
                border border-gray-300  focus:outline-none focus:ring-2 focus:ring-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0"
                    aria-invalid={fieldState.invalid}
                    autoComplete="address-level1"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* ZIP Code */}
            <Controller
              name="zipCode"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    type="text"
                    placeholder="ZIP code"
                    className="w-full h-auto  rounded-lg px-4 py-3
                border border-gray-300  focus:outline-none focus:ring-2 focus:ring-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0"
                    aria-invalid={fieldState.invalid}
                    autoComplete="postal-code"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>
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
        {pending ? <span className="submitLoader" /> : "Confirm and Pay"}
      </Button>
      {/*<Link
        // href="/hotel-booking/payment-success"
        href="/hotel-booking/signin"
        className="w-full block text-center bg-primary text-white py-3 rounded-lg mt-6 hover:brightness-90"
      >
        Request to book login
      </Link>*/}
    </form>
  );
}
