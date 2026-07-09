import mongoose, { Document, Model, Schema } from "mongoose";


export interface IReview {
  propertyId: mongoose.Types.ObjectId; // ref → Property
  authorId: mongoose.Types.ObjectId; // ref → User
  bookingId: mongoose.Types.ObjectId; // ref → Booking  (proof of stay — required to leave a review)
  overallRating: number; // 1–5, shown as "Overall Rating" in ReviewModal
  comment: string;
}

export interface IReviewDocument extends IReview, Document {
  createdAt: Date;
  updatedAt: Date;
}

// ─── Schema ───────────────────────────────────────────────────────────────────

const reviewSchema = new Schema<IReviewDocument>(
  {
    propertyId: { type: Schema.Types.ObjectId, ref: "Property", required: true },
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    bookingId: { type: Schema.Types.ObjectId, ref: "Booking", required: true },
    overallRating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

// One review per user per property — enforced at DB level
reviewSchema.index({ property: 1, author: 1 }, { unique: true });
reviewSchema.index({ property: 1 }); // fetch all reviews for a property
reviewSchema.index({ author: 1 }); // check if user already reviewed

const Review: Model<IReviewDocument> =
  (mongoose.models.Review as Model<IReviewDocument>) || mongoose.model<IReviewDocument>("Review", reviewSchema);

export default Review;
