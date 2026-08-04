"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { AUTH_CONFIG } from "../../constants/auth.constants";
import { useBookingParams } from "../../hooks/use-booking-params";
import { formatDateISO, isPastDate, parseUrlDate } from "../../utils/date-time-utils";
import { type BookingFormValues, createBookingSchema } from "../../validationSchema/booking.schema";
import { GuestStepper } from "../payment/guest-stepper";

type BookingFormProps = {
  isBooked: boolean;
  guests: number;
  maxGuests: number;
  checkin?: Date | string;
  checkout?: Date | string;
};

export function BookingForm({ isBooked, checkin, checkout, guests, maxGuests }: BookingFormProps) {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. Shared Booking Hook (handles URL parsing + clamping)
  const {
    startDate: urlStartDate,
    endDate: urlEndDate,
    guestsCount: urlGuestsCount,
  } = useBookingParams(maxGuests, guests);

  // 2. Initial values prioritize URL state, fallback to props
  const initialValues = useMemo(
    () => ({
      checkin: urlStartDate ?? parseUrlDate(checkin),
      checkout: urlEndDate ?? parseUrlDate(checkout),
      guests: urlGuestsCount,
    }),
    [urlStartDate, urlEndDate, urlGuestsCount, checkin, checkout]
  );

  // 3. Shared Zod Validation Schema
  const formSchema = useMemo(() => createBookingSchema(maxGuests), [maxGuests]);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  // Sync form when search parameters change externally
  useEffect(() => {
    form.reset(initialValues);
  }, [initialValues, form.reset]);

  const watchedCheckin = useWatch({
    control: form.control,
    name: "checkin",
  });

  function onSubmit(data: BookingFormValues) {
    if (isBooked) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("checkin", formatDateISO(data.checkin));
    params.set("checkout", formatDateISO(data.checkout));
    params.set("guests", String(data.guests));

    const targetUrl = `${AUTH_CONFIG.ROUTES.BOOK(id)}?${params.toString()}`;

    window.history.replaceState({ ...window.history.state }, "", `${window.location.pathname}?${params.toString()}`);
    router.push(targetUrl);
  }

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-0">
          {/* Check-in Date */}
          <Controller
            control={form.control}
            name="checkin"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="flex flex-col">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "pl-3 text-left font-normal border-zinc-200 rounded-lg h-11",
                        !field.value && "text-muted-foreground"
                      )}
                      disabled={isBooked}
                    >
                      {field.value ? formatDateISO(field.value) : <span>Check in</span>}
                      <CalendarIcon className="ml-auto size-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 rounded-2xl" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => isPastDate(date) || isBooked}
                    />
                  </PopoverContent>
                </Popover>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Check-out Date */}
          <Controller
            control={form.control}
            name="checkout"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="flex flex-col">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "pl-3 text-left font-normal border-zinc-200 rounded-lg h-11",
                        !field.value && "text-muted-foreground"
                      )}
                      disabled={isBooked}
                    >
                      {field.value ? formatDateISO(field.value) : <span>Check Out</span>}
                      <CalendarIcon className="ml-auto size-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 rounded-2xl" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => {
                        const isBeforeOrEqualCheckin = watchedCheckin ? date <= watchedCheckin : false;
                        return isPastDate(date) || isBeforeOrEqualCheckin || isBooked;
                      }}
                    />
                  </PopoverContent>
                </Popover>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="guests"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="flex flex-col md:col-span-2">
                <div className="p-3.5 border border-zinc-200 rounded-lg bg-background">
                  <GuestStepper
                    value={field.value ?? 1}
                    maxGuests={maxGuests}
                    disabled={isBooked}
                    onChange={(val) => field.onChange(val)}
                  />
                </div>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>

        <Button
          type="submit"
          className={cn(
            "w-full block text-base text-center bg-primary text-white rounded-lg transition-all hover:brightness-90 font-medium shadow-sm",
            isBooked && "disabled"
          )}
          disabled={isBooked}
        >
          {isBooked ? "Reserved" : "Reserve"}
        </Button>
      </form>

      <div className="text-center mt-4 text-zinc-500 text-sm">
        <p>You won&apos;t be charged yet</p>
      </div>
    </>
  );
}
