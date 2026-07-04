"use server";
import mongoose from "mongoose";
// import { auth } from "@/auth";
// import connectDB from "@/domains/hotel-booking/config/database";
import Property from "@/domains/hotel-booking/models/Property";
import Review from "@/domains/hotel-booking/models/review-model";
import { type PropertyReview, ReviewInputSchema } from "@/domains/hotel-booking/validationSchema/review-schema";

export async function getReviews({ propertyId }: { propertyId: string }) {
  // await connectDB();

  const reviews = await Review.find({ property: propertyId }).sort({
    createdAt: "desc",
  });

  const reviewsCount = await Review.countDocuments({ property: propertyId });
  return {
    reviews,
    reviewsCount,
  };
}

export async function createReviewAction({
  data,
  // path,
}: {
  data: PropertyReview;
  // path: string;
}) {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("User is not authenticated");
    }

    const review = ReviewInputSchema.safeParse({
      ...data,
      user: session?.user?.id,
    });
    if (!review.success) return { status: false, errors: review.error.formErrors.fieldErrors };

    // await connectDB();
    await Review.create(review.data);
    await updatePropertyReview(review?.data.property);
    // revalidatePath(path)
    return {
      status: true,
      message: "Review created successfully",
      // data: JSON.parse(JSON.stringify(newReview)),
    };
  } catch (error) {
    return { status: false, message: error.message };
  }
}

const updatePropertyReview = async (productId: string) => {
  // Calculate the new average rating, number of reviews, and rating distribution
  const result = await Review.aggregate([
    { $match: { property: new mongoose.Types.ObjectId(productId) } },
    {
      $group: {
        _id: "$rating",
        count: { $sum: 1 },
      },
    },
  ]);
  // Calculate the total number of reviews and average rating
  const totalReviews = result.reduce((sum, { count }) => sum + count, 0);
  const avgRating = result.reduce((sum, { _id, count }) => sum + _id * count, 0) / totalReviews;

  // Convert aggregation result to a map for easier lookup
  const ratingMap = result.reduce((map, { _id, count }) => {
    map[_id] = count;
    return map;
  }, {});
  // Ensure all ratings 1-5 are represented, with missing ones set to count: 0
  const ratingDistribution = [];
  for (let i = 1; i <= 5; i++) {
    ratingDistribution.push({ rating: i, count: ratingMap[i] || 0 });
  }
  // Update product fields with calculated values
  await Property.findByIdAndUpdate(productId, {
    avgRating: avgRating.toFixed(1),
    numReviews: totalReviews,
    ratingDistribution,
  });
};
