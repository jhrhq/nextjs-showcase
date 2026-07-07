"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/domains/hotel-booking/components/ui/button";
import { Calendar } from "@/domains/hotel-booking/components/ui/calendar";
import { Field, FieldGroup, FieldError } from "@/domains/hotel-booking/components/ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "@/domains/hotel-booking/components/ui/popover";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import FormError from "@/ui/shared/auth-errro-alert";

const FormSchema = z
  .object({
    checkin: z.date({
      error: "Check-in date is required.",
    }),
    checkout: z.date({
      error: "Check-out date is required.",
    }),
    guests: z
      .number({error: "Guests is required"})
      .int()
      .min(1, "Guests must be at least 1")
      .max(6, "Guests must be at most 6")
  })
  .refine((data) => data.checkout > data.checkin, {
    message: "Check-out must be after check-in.",
    path: ["checkout"],
  });

export function BookingCardForm() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      checkin: undefined,
      checkout: undefined,
      guests: undefined,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Valid form data:", data);
    // Safely navigate only after successful validation
    // router.push("/hotel-booking/payment-process");
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-0">

          {/* Check In Field */}
          <Field className="flex flex-col">
            <Controller
              control={control}
              name="checkin"
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? format(field.value, "PPP") : <span>Check In</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      // Allow today and future dates
                      disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
            {errors.checkin?.message && (
              <FieldError>
                <FormError error={errors.checkin.message} />
              </FieldError>
            )}
          </Field>

          {/* Check Out Field */}
          <Field className="flex flex-col">
            <Controller
              control={control}
              name="checkout"
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? format(field.value, "PPP") : <span>Check Out</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
              <FieldError>
                <FormError error={errors.checkout?.message} />
              </FieldError>
          </Field>

          {/* Guests Field */}
          <Controller
            name="guests"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="flex flex-col md:col-span-2">
                <Input
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => {
                    const value = e.target.valueAsNumber;
                    field.onChange(Number.isNaN(value) ? undefined : value);
                  }}
                  type="number"
                  id="form-booking-guests"
                  aria-invalid={fieldState.invalid}
                  placeholder="Number of guests"
                  autoComplete="off"
                />

                <FieldError>
                  <FormError error={errors.guests?.message} />
                </FieldError>
              </Field>
            )}
          />
        </FieldGroup>

        <Button
          type="submit"
          className="w-full block md:text-base text-center bg-primary text-white py-3 rounded-lg transition-all hover:brightness-90"
        >
          Reserve
        </Button>
      </form>

      <div className="text-center mt-4 text-gray-600">
        <p>You won&apos;t be charged yet</p>
      </div>
    </>
  );
}
