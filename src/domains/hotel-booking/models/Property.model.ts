import mongoose, { type Model, Schema, type Types } from "mongoose";
import { CURRENCIES, PROPERTY_TYPES } from "../constants/property.constants";
import type { IProperty, IPropertyDocument } from "../type/property.type";

export interface IPropertyModel extends Model<IPropertyDocument> {
  calculateReviewStats(propertyId: Types.ObjectId | string): Promise<void>;
}

const propertySchema = new Schema<IProperty>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: PROPERTY_TYPES,
    },
    tags: { type: [String], default: [] },

    host: {
      userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
      name: { type: String, required: true },
      avatar: String,
      isSuperhost: { type: Boolean, default: false },
      joinedYear: Number,
    },
    location: {
      street: String,
      city: { type: String, required: true, index: true },
      state: String,
      country: { type: String, required: true },
      address: String,
      postalCode: String,
      coordinates: { lat: Number, lng: Number },
    },
    images: [{ url: { type: String, required: true }, alt: String }],
    amenities: [String],

    pricing: {
      perNight: { type: Number, required: true, min: 0 },
      cleaningFee: { type: Number, default: 0, min: 0 },
      serviceFee: { type: Number, default: 0, min: 0 },
      currency: { type: String, enum: CURRENCIES, default: "USD" },
    },

    capacity: {
      guests: { type: Number, required: true, min: 1 },
      bedrooms: { type: Number, required: true, min: 0 },
      beds: { type: Number, required: true, min: 0 },
      bathrooms: { type: Number, required: true, min: 0 },
    },
    ratingAvg: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },

    isPublished: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },

    minimumNights: { type: Number, default: 1 },
    maximumNights: { type: Number, default: 365 },
  },
  { timestamps: true }
);

propertySchema.index({ "host.userId": 1 }); // Manage Hotels
propertySchema.index({ isPublished: 1, isFeatured: -1, ratingAvg: -1 }); // homepage sort
propertySchema.index({ "location.city": 1, isPublished: 1 }); // city filter
propertySchema.index({ tags: 1, isPublished: 1 }); // tag filter
propertySchema.index({ "pricing.perNight": 1 }); // price sort/filter
propertySchema.index({ title: "text", description: "text" }); // search bar

propertySchema.statics.calculateReviewStats = async function (propertyId: Types.ObjectId | string): Promise<void> {
  const Review = mongoose.model("Review");
  const targetId = typeof propertyId === "string" ? new mongoose.Types.ObjectId(propertyId) : propertyId;

  type AggregationOutput = { ratingAvg: number; reviewCount: number };

  const [result] = await Review.aggregate<AggregationOutput>([
    { $match: { propertyId: targetId } },
    {
      $group: {
        _id: null,
        ratingAvg: { $avg: "$overallRating" },
        reviewCount: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        ratingAvg: { $round: ["$ratingAvg", 2] },
        reviewCount: 1,
      },
    },
  ]);

  await this.findByIdAndUpdate(
    targetId,
    {
      ratingAvg: result ? result.ratingAvg : 0,
      reviewCount: result ? result.reviewCount : 0,
    },
    { runValidators: false }
  );
};
const Property: Model<IProperty> =
  (mongoose.models.Property as Model<IProperty>) || mongoose.model<IProperty>("Property", propertySchema);

export default Property;
