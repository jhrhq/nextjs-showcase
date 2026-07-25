import mongoose, { type Document, type Model, Schema } from "mongoose";

export interface IBetterAuthUser extends Document {
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IBetterAuthUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    emailVerified: { type: Boolean, default: false },
    image: { type: String },
    createdAt: Date,
    updatedAt: Date,
  },
  { collection: "user" }
);

export const User: Model<IBetterAuthUser> = mongoose.models.User ?? mongoose.model<IBetterAuthUser>("User", UserSchema);
