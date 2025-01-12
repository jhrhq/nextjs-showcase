import connectDB from "@/config/database";
import Review from "@/models/review-model";

export async function getReviews({ propertyId }: { propertyId: string }) {
  await connectDB();

  const reviews = await Review.find({ property: propertyId }).sort({
    createdAt: "desc",
  });

  const reviewsCount = await Review.countDocuments({ property: propertyId });
  return {
    reviews,
    reviewsCount,
  };
}
