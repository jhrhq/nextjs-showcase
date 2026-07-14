import mongoose from "mongoose";
import { Property } from "./models/Property";
import { Review } from "./models/Review";

async function submitReview(propertyId: string, userId: string, rating: number, comment: string) {
  // Start a MongoDB Session for the transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // WRITE 1: Insert the full, permanent review into the source-of-truth collection
    const [newReview] = await Review.create(
      [
        {
          property_id: propertyId,
          user_id: userId,
          rating,
          comment,
        },
      ],
      { session }
    );

    // Calculate new metrics (Advanced: incremental math prevents an expensive aggregation fetch)
    const property = await Property.findById(propertyId).session(session);
    const newReviewCount = (property?.reviewCount || 0) + 1;
    const currentTotalStars = (property?.ratingAvg || 0) * (property?.reviewCount || 0);
    const newRatingAvg = Math.round(((currentTotalStars + rating) / newReviewCount) * 10) / 10;

    // WRITE 2: Update the parent property cache (The optimized query we discussed)
    await Property.updateOne(
      { _id: propertyId },
      {
        $set: {
          ratingAvg: newRatingAvg,
          reviewCount: newReviewCount,
        },
        $push: {
          recentReviews: {
            $each: [{ user_id: userId, comment, rating, createdAt: new Date() }],
            $sort: { createdAt: -1 },
            $slice: 3, // Keep the cache strictly capped
          },
        },
      },
      { session }
    );

    // Commit the changes to the database
    await session.commitTransaction();
    return newReview;
  } catch (error) {
    // If anything fails (network error, database crash), abort everything
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}

// gell all reveiws
// Backend Route handler
const page = parseInt(req.query.page as string) || 1;
const limit = parseInt(req.query.limit as string) || 10;
const skipOffset = 3; // The 3 reviews already rendered in the UI cache

const reviewsForModal = await Review.find({ property_id })
  .sort({ createdAt: -1 })
  // On page 1: (0 * 10) + 3 = skip 3. It jumps straight to the 4th review!
  .skip((page - 1) * limit + skipOffset)
  .limit(limit);

// review exlusion
const { excludeIds } = req.body; // Array of IDs to avoid

{
  excludeIds: ["rev_001", "rev_002", "rev_003"];
}
const reviewsForModal = await Review.find({
  property_id: id,
  _id: { $nin: excludeIds }, // "Hey Mongo, do NOT return any reviews with these IDs"
})
  .sort({ createdAt: -1 })
  .limit(10);
