import { z } from "zod";

export const paymentSchema = z.object({
  uiMode: z.literal("embedded_page"),
  userId: z.string().min(1, "User session required"),
  propertyId: z.string().min(1, "Property reference required"),
  checkin: z.string("Invalid check-in date"),
  checkout: z.string("Invalid check-out date"),
  guests: z.coerce.number().int().positive().min(1, "Guest configuration required"),
  totalPrice: z.number().positive("Valid transaction calculation required"),
});

export type PaymentInput = z.infer<typeof paymentSchema>;
