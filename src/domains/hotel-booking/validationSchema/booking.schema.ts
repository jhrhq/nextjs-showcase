import { z } from "zod";

export const createBookingSchema = (maxGuests: number) =>
  z
    .object({
      checkin: z.date({ error: "Check-in date is required." }),
      checkout: z.date({ error: "Check-out date is required." }),
      guests: z
        .number({ error: "Guests is required." })
        .int({ error: "Guests must be a whole number." })
        .min(1, { error: "Guests must be at least 1." })
        .max(maxGuests, { error: `Guests must be at most ${maxGuests}.` }),
    })
    .refine((data) => data.checkout > data.checkin, {
      error: "Check-out must be after check-in.",
      path: ["checkout"],
    });

export type BookingFormValues = z.infer<ReturnType<typeof createBookingSchema>>;
