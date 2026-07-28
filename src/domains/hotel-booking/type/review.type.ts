import type { Document, HydratedDocument, Types } from "mongoose";

export interface IReview extends Document {
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

export type IReviewDocument = HydratedDocument<IReview>;
