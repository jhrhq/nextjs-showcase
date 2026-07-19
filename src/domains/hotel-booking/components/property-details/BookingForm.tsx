"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/domains/hotel-booking/components/ui/button";
import { Calendar } from "@/domains/hotel-booking/components/ui/calendar";
import { Field, FieldError, FieldGroup } from "@/domains/hotel-booking/components/ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "@/domains/hotel-booking/components/ui/popover";
import { cn } from "@/lib/utils";
import { AUTH_CONFIG } from "../../constants/auth.constants";
import { Input } from "../ui/input";

const createBookingSchema = (maxGuests: number) =>
  z
    .object({
      checkin: z.date({
        error: "Check-in date is required.",
      }),
      checkout: z.date({
        error: "Check-out date is required.",
      }),
      guests: z
        .number({
          error: "Guests is required.",
        })
        .int({ error: "Guests must be a whole number." })
        .min(1, { error: "Guests must be at least 1" })
        .max(maxGuests, { error: `Guests must be at most ${maxGuests}` }),
    })
    .refine((data) => data.checkout > data.checkin, {
      error: "Check-out must be after check-in.",
      path: ["checkout"],
    });

type BookingFormValues = z.infer<ReturnType<typeof createBookingSchema>>;

type BookingFormProps = {
  isBooked: boolean;
  guests: number;
  maxGuests: number;
  checkin?: Date | string;
  checkout?: Date | string;
};

function parseToDate(dateInput: string | Date | undefined): Date | undefined {
  if (!dateInput) return undefined;
  const parsed = dateInput instanceof Date ? dateInput : new Date(dateInput);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

export function BookingForm({ isBooked, checkin, checkout, guests = 0, maxGuests }: BookingFormProps) {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const formSchema = useMemo(() => createBookingSchema(maxGuests), [maxGuests]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      checkin: parseToDate(checkin),
      checkout: parseToDate(checkout),
      guests: guests > 0 ? guests : 1,
    },
  });

  useEffect(() => {
    form.reset({
      checkin: parseToDate(checkin),
      checkout: parseToDate(checkout),
      guests: guests > 0 ? guests : 1,
    });
  }, [checkin, checkout, guests, form.reset]);

  const watchedCheckin = useWatch({
    control: form.control,
    name: "checkin",
  });

  function onSubmit(data: BookingFormValues) {
    if (isBooked) return;
    const payload = {
      ...data,
      checkin: format(data.checkin, "yyyy-MM-dd"),
      checkout: format(data.checkout, "yyyy-MM-dd"),
    };

    const params = new URLSearchParams(searchParams.toString());

    Object.entries(payload).forEach(([key, value]) => {
      params.set(key, String(value));
    });

    router.push(`${AUTH_CONFIG.ROUTES.BOOK(id)}?${params.toString()}`);
  }

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-0">
          <Field className="flex flex-col">
            <Controller
              control={form.control}
              name="checkin"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                        disabled={isBooked}
                      >
                        {field.value ? format(field.value, "yyyy-MM-dd") : <span>Check Out</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date() || isBooked}
                      />
                    </PopoverContent>
                  </Popover>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </Field>

          <Field className="flex flex-col">
            <Controller
              control={form.control}
              name="checkout"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                        disabled={isBooked}
                      >
                        {field.value ? format(field.value, "yyyy-MM-dd") : <span>Check Out</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date: Date) => {
                          const isBeforeOrEqualCheckin = watchedCheckin ? date <= watchedCheckin : false;
                          return date < new Date() || isBeforeOrEqualCheckin || isBooked;
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </Field>

          <Controller
            name="guests"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="flex flex-col md:col-span-2">
                <Input
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    field.onChange(val === "" ? "" : Number(val));
                  }}
                  disabled={isBooked}
                  type="number"
                  id="form-booking-guests"
                  aria-invalid={fieldState.invalid}
                  placeholder="Number of guests"
                  autoComplete="off"
                  className="w-full h-auto  rounded-lg px-4 py-3
              border border-gray-300  focus:outline-none focus:ring-2 focus:ring-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>

        <Button
          type="submit"
          className={cn(
            "w-full block md:text-base text-center bg-primary text-white rounded-lg transition-all hover:brightness-90",
            isBooked && "disabled"
          )}
          disabled={isBooked}
        >
          {isBooked ? "Reserved" : "Reserve"}
        </Button>
      </form>

      <div className="text-center mt-4 text-gray-600">
        <p>You won&apos;t be charged yet</p>
      </div>
    </>
  );
}
