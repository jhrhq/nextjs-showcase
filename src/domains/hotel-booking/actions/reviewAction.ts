"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import z from "zod";
import Booking from "@/domains/hotel-booking/models/Booking.model";
import { auth } from "@/lib/auth";
import { connectToDatabase } from "../config/database";
import { Review } from "../models";
import { type PropertyReview, ReviewInputSchema } from "../validationSchema/review-schema";

interface ActionResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

export async function createReviewAction({
  data,
  path,
}: {
  data: PropertyReview;
  path: string;
}): Promise<ActionResponse> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        success: false,
        message: "Unauthorized access",
      };
    }

    const parsed = ReviewInputSchema.safeParse(data);
    if (!parsed.success) {
      const { fieldErrors } = z.flattenError(parsed.error);

      return {
        success: false,
        message: "Validation failed",
        errors: fieldErrors,
      };
    }

    const { propertyId, bookingId } = parsed.data;
    const { id: userId } = session.user;

    await connectToDatabase();

    const isEligible = await Booking.exists({
      _id: bookingId,
      propertyId,
      userId,
      status: "confirmed",
    });

    if (!isEligible) {
      return {
        success: false,
        message: "You are not authorized to review this property.",
      };
    }

    await Review.create({
      authorId: userId,
      authorName: session.user.name,
      authorAvatar: session.user.image,
      ...parsed.data,
    });
    revalidatePath(path);
    return { success: true, message: "Review published successfully!" };
  } catch (error) {
    return handleReviewError(error);
  }
}

/**
 * Isolated Error Handler for Mongo and Mongoose codes
 */
function handleReviewError(error: unknown): ActionResponse {
  console.error("[CREATE_REVIEW_ERROR]", error);

  // Native MongoDB Duplicate Key Error (Unique index violation on bookingId)
  if (typeof error === "object" && error !== null && "code" in error && (error as { code?: number }).code === 11000) {
    return {
      success: false,
      message: "You have already submitted a review for this booking.",
    };
  }

  return {
    success: false,
    message: error instanceof Error ? error.message : "Failed to create review.",
  };
}
