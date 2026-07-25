import mongoose, { type Document, type Model, Schema, type Types } from "mongoose";
import type { IPropertyModel } from "./Property.model";

export interface IReviewDocument extends Document {
  _id: Types.ObjectId;
  propertyId: Types.ObjectId;
  bookingId: Types.ObjectId;
  authorId: Types.ObjectId;
  authorName: string;
  authorAvatar?: string;
  overallRating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReviewDocument>(
  {
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
      index: true,
    },
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
      unique: true,
    },
    authorId: { type: Schema.Types.ObjectId, required: true },
    authorName: { type: String, required: true },
    authorAvatar: { type: String, default: "" },
    overallRating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true, maxlength: 1000 },
  },
  { timestamps: true }
);

ReviewSchema.index({ propertyId: 1, authorId: 1 }, { unique: true });

// Strongly-typed model accessor helper
function getPropertyModel(): IPropertyModel {
  return mongoose.model<Document, IPropertyModel>("Property");
}

ReviewSchema.post("save", async function (doc: IReviewDocument) {
  const Property = getPropertyModel();
  await Property.calculateReviewStats(doc.propertyId);
});

ReviewSchema.post("findOneAndDelete", async function (doc: IReviewDocument | null) {
  if (doc) {
    const Property = getPropertyModel();
    await Property.calculateReviewStats(doc.propertyId);
  }
});

const Review: Model<IReviewDocument> =
  mongoose.models.Review ?? mongoose.model<IReviewDocument>("Review", ReviewSchema);

export default Review;
