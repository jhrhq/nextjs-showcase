import { z } from "zod";

export const paymentSchema = z.object({
  cardNumber: z
    .string()
    .min(15, "Card number must be at least 15 digits.")
    .max(16, "Card number cannot exceed 16 digits.")
    .regex(/^\d+$/, "Card number must contain only numbers."),
  expiration: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Expiration must be in MM/YY format."),
  cvv: z
    .string()
    .min(3, "CVV must be at least 3 digits.")
    .max(4, "CVV cannot exceed 4 digits.")
    .regex(/^\d+$/, "CVV must contain only numbers."),
  streetAddress: z.string().min(1, "Street address is required."),
  aptSuite: z.string().optional(),
  city: z.string().min(1, "City is required."),
  state: z.string().min(1, "State is required."),
  zipCode: z.string().min(5, "ZIP code must be at least 5 characters."),
});

export type PaymentInput = z.infer<typeof paymentSchema>;
