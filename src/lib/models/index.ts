/**
 * lib/models/index.ts
 *
 * Barrel export for all hotel-booking Mongoose models.
 *
 * Import pattern in Route Handlers / Server Actions:
 *
 *   import { UserModel, ListingModel, ReservationModel, ReviewModel }
 *     from "@/lib/models";
 *
 * Always call connectDB() before using any model:
 *
 *   import { connectDB } from "@/lib/db/mongoose";
 *   await connectDB();
 */

export type {
  IListing,
  IListingAddress,
  ListingDocument,
  ListingStatus,
  ListingType,
} from "@/lib/models/Listing.model";
export { ListingModel } from "@/lib/models/Listing.model";
export type { IReservation, ReservationDocument, ReservationStatus } from "@/lib/models/Reservation.model";
export { ReservationModel } from "@/lib/models/Reservation.model";
export type { IReview, ReviewDocument, ReviewRating } from "@/lib/models/Review.model";
export { ReviewModel } from "@/lib/models/Review.model";
// Re-export interfaces for use in Route Handlers and Server Actions
// without requiring a direct import from the individual model files.
export type { IAddress, IUser, UserDocument } from "@/lib/models/User.model";
export { UserModel } from "@/lib/models/User.model";
