import { z } from "zod";

export const paymentSchema = z.object({
  uiMode: z.literal("embedded"),
  userId: z.string().min(1, "User session required"),
  propertyId: z.string().min(1, "Property reference required"),
  checkin: z.coerce.date({
    error: () => ({ message: "Invalid check-in date" }),
  }),
  checkout: z.coerce.date({
    error: () => ({ message: "Invalid check-out date" }),
  }),
  guests: z.coerce.number().int().positive().min(1, "Guest configuration required"),
  totalPrice: z.number().positive("Valid transaction calculation required"),
});

export type PaymentInput = z.infer<typeof paymentSchema>;
