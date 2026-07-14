import { z } from "zod";

export const paymentSchema = z.object({
  uiMode: z.string({ error: "this is required." }),
  userId: z.string({ error: "this is required." }),
  propertyId: z.string({ error: "this is required." }),
  checkin: z.string({ error: "this is required." }),
  checkout: z.string({ error: "this is required." }),
  guests: z.string({ error: "this is required." }),
  totalPrice: z.number({ error: "this is required." }),
});

export type PaymentInput = z.infer<typeof paymentSchema>;
