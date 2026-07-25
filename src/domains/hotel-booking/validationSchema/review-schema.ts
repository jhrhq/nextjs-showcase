import { z } from "zod";

export const ReviewInputSchema = z.object({
  propertyId: z.string(),
  bookingId: z.string(),
  // title: z.string().min(1, "Title is required"),
  comment: z.string().min(1, "Review can not be empty"),
  overallRating: z.number().int().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5"),
});

export type PropertyReview = z.infer<typeof ReviewInputSchema>;
