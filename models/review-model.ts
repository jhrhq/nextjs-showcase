import { Model, model, models, ObjectId, Schema } from "mongoose";

interface ReviewUser {
  _id?: ObjectId;
  name: string;
  email: string;
  password?: string;
  avatar?: {
    id?: string;
    url: string;
  };
  isBooked: boolean;
  user: ObjectId;
  property: ObjectId;
  verified: boolean;
  rating: number;
  comment: string;
}
const reviewSchema = new Schema<ReviewUser>(
  {
    user: {
      type: Schema.Types.ObjectId as unknown as typeof String,
      ref: "User",
    },
    isBooked: {
      type: Boolean,
      required: true,
      default: false,
    },
    property: {
      type: Schema.Types.ObjectId as unknown as typeof String,
      ref: "properties",
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Review =
  (models.Review as Model<ReviewUser>) ||
  model<ReviewUser>("Review", reviewSchema);

export default Review;
