import { z } from "zod";
const MongoId = z.string().regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid MongoDB ID" });

export const ReviewInputSchema = z.object({
  property: MongoId,
  user: MongoId,
  isBooked: z.boolean(),
  // title: z.string().min(1, "Title is required"),
  comment: z.string().min(1, "Review can not be empty"),
  rating: z.coerce.number().int().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5"),
});

export type PropertyReview = z.infer<typeof ReviewInputSchema>;
