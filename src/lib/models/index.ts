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

export { UserModel }        from "@/lib/models/User.model";
export { ListingModel }     from "@/lib/models/Listing.model";
export { ReservationModel } from "@/lib/models/Reservation.model";
export { ReviewModel }      from "@/lib/models/Review.model";

// Re-export interfaces for use in Route Handlers and Server Actions
// without requiring a direct import from the individual model files.
export type { IUser, UserDocument, IAddress }                from "@/lib/models/User.model";
export type { IListing, ListingDocument, ListingStatus,
              ListingType, IListingAddress }                  from "@/lib/models/Listing.model";
export type { IReservation, ReservationDocument,
              ReservationStatus }                             from "@/lib/models/Reservation.model";
export type { IReview, ReviewDocument, ReviewRating }        from "@/lib/models/Review.model";
