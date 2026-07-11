import mongoose, { type Document, type Model, Schema } from "mongoose";
import type { IReviewSnapshot } from "./shared.types";

// ─── Interfaces ───────────────────────────────────────────────────────────────

// Full Review document — stored in the `reviews` collection
export interface IReview {
  property: mongoose.Types.ObjectId; // ref → Property
  author: mongoose.Types.ObjectId; // ref → User
  booking: mongoose.Types.ObjectId; // ref → Booking (proof of stay)

  // Author snapshot — captured at write time so the reviewer's display
  // data survives account edits or deletion
  authorName: string;
  authorAvatar?: string;

  overallRating: number; // 1–5
  comment: string;
}

export interface IReviewDocument extends IReview, Document {
  createdAt: Date;
  updatedAt: Date;
}

// ─── Schema ───────────────────────────────────────────────────────────────────

const reviewSchema = new Schema<IReviewDocument>(
  {
    property: { type: Schema.Types.ObjectId, ref: "Property", required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    booking: { type: Schema.Types.ObjectId, ref: "Booking", required: true },

    authorName: { type: String, required: true },
    authorAvatar: String,

    overallRating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

// ─── Indexes ──────────────────────────────────────────────────────────────────

// DB-level: one review per user per property
reviewSchema.index({ property: 1, author: 1 }, { unique: true });

reviewSchema.index({ property: 1, createdAt: -1 }); // full review list on details page
reviewSchema.index({ author: 1 }); // "has user reviewed?" guard

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Recomputes ratingAvg, reviewCount, and the hard-capped recentReviews[3]
 * cache on Property after any review mutation.
 */
async function syncPropertyCache(propertyId: mongoose.Types.ObjectId) {
  const ReviewModel = mongoose.model<IReviewDocument>("Review");
  const PropertyModel = mongoose.model("Property");

  // Single aggregation: avg + count + 3 most recent in one pass
  const [agg] = await ReviewModel.aggregate([
    { $match: { property: propertyId } },
    {
      $facet: {
        stats: [
          {
            $group: {
              _id: null,
              avg: { $avg: "$overallRating" },
              count: { $sum: 1 },
            },
          },
        ],
        recent: [
          { $sort: { createdAt: -1 } },
          { $limit: 3 },
          {
            $project: {
              reviewId: "$_id",
              authorId: "$author",
              authorName: 1,
              authorAvatar: 1,
              overallRating: 1,
              comment: 1,
              createdAt: 1,
              _id: 0,
            },
          },
        ],
      },
    },
  ]);

  const stats = agg?.stats?.[0];
  const recentReviews: IReviewSnapshot[] = agg?.recent ?? [];

  await PropertyModel.findByIdAndUpdate(propertyId, {
    ratingAvg: stats ? Math.round(stats.avg * 10) / 10 : 0,
    reviewCount: stats?.count ?? 0,
    recentReviews, // always exactly 0–3 entries
  });
}

// ─── Post-hooks ───────────────────────────────────────────────────────────────

reviewSchema.post("save", async function () {
  await syncPropertyCache(this.property);
});

// Called by: Review.findByIdAndDelete(id)
reviewSchema.post("findOneAndDelete", async function (doc: IReviewDocument | null) {
  if (doc) await syncPropertyCache(doc.property);
});

// ─── Model ────────────────────────────────────────────────────────────────────

const Review: Model<IReviewDocument> =
  (mongoose.models.Review as Model<IReviewDocument>) || mongoose.model<IReviewDocument>("Review", reviewSchema);

export default Review;
