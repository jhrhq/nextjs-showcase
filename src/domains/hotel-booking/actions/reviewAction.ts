"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import z from "zod";
import Booking from "@/domains/hotel-booking/models/Booking.model";
import { auth } from "@/lib/auth";
import { connectToDatabase } from "../config/database";
import { REVIEW_MESSAGES } from "../constants/review.constants";
import { Review } from "../models";
import { ReviewInputSchema } from "../validationSchema/review.schema";
import { actionCreator } from "./action-creator";

const createReviewSchema = ReviewInputSchema.extend({
  path: z.string().min(1, "Path is required."),
});

export const createReviewAction = actionCreator(createReviewSchema, async ({ path, ...reviewData }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error(REVIEW_MESSAGES.UNAUTHORIZED);
  }

  const { propertyId, bookingId } = reviewData;
  const { id: userId, name: authorName } = session.user;
  const authorAvatar = session.user.image ?? "";
  await connectToDatabase();

  const isEligible = await Booking.exists({
    _id: bookingId,
    propertyId,
    userId,
    status: "confirmed",
  });

  if (!isEligible) {
    throw new Error(REVIEW_MESSAGES.NOT_ELIGIBLE);
  }

  // 2. Prevent duplicate reviews (replaces Mongo 11000 type casting)
  const alreadyReviewed = await Review.exists({ bookingId });
  if (alreadyReviewed) {
    throw new Error(REVIEW_MESSAGES.ALREADY_REVIEWED);
  }

  // 3. Create review
  await Review.create({
    authorId: userId,
    authorName,
    authorAvatar,
    ...reviewData,
  });

  revalidatePath(path);

  return { message: REVIEW_MESSAGES.CREATE_SUCCESS };
});
