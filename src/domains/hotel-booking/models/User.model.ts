import mongoose, { type Model, Schema } from "mongoose";
import type { IAuthUserDocument } from "../type/user.type";

const UserSchema = new Schema<IAuthUserDocument>(
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

const User: Model<IAuthUserDocument> = mongoose.models.User ?? mongoose.model<IAuthUserDocument>("User", UserSchema);

export default User;
