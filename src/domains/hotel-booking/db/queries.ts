import type { Types } from "mongoose";
import { headers } from "next/headers";
import Property from "@/domains/hotel-booking/models/Property.model";
import { auth } from "@/lib/auth";
import { connectToDatabase } from "../config/database";
import { toUserBookingDTO, type UserBookingDTO } from "../mappers/booking.mappers";
import { Booking, Review } from "../models";
import type { IBookingDocument } from "../type/booking.type";
import type { IProperty } from "../type/property.type";
import type { IReview } from "../type/review.type";

type PaginatedProperties = {
  allProperties: IProperty[];
  total: number;
};

async function getAllProperties(
  page: number = 1,
  pageSize: number = 10,
  search: string = ""
): Promise<PaginatedProperties> {
  await connectToDatabase();

  const skip = (page - 1) * pageSize;

  const query = search ? { $or: [{ title: new RegExp(search, "i") }] } : {};

  const total = await Property.countDocuments(query);
  const allProperties = await Property.find(query).skip(skip).limit(pageSize).lean<IProperty[]>();

  return { allProperties, total };
}

async function getSelectedPropertyDetails(propertyId?: string | Types.ObjectId): Promise<IProperty | null> {
  // Defensive check against empty inputs
  if (!propertyId) return null;

  await connectToDatabase();

  return await Property.findById(propertyId).lean<IProperty | null>();
}

async function getSelectedPropertyBookinDetails(propertyId?: string | Types.ObjectId) {
  if (!propertyId) return null;

  await connectToDatabase();

  return await Booking.findOne({ propertyId }).lean();
}

export type IUserBooking = Omit<IBookingDocument, "propertyId"> & {
  propertyId: Pick<IProperty, "_id" | "title" | "location" | "images">;
};

export async function getUserBookings(userId: string): Promise<UserBookingDTO[]> {
  // 1. Guard Clause Type Safety
  // Must return an empty array typed implicitly as UserBookingDTO[]
  if (!userId) return [];

  await connectToDatabase();

  if (!Property) {
    throw new Error("Property model not registered for populate");
  }

  const rawBookings = await Booking.find({ userId })
    .populate({
      path: "propertyId",
      select: "title location images",
    })
    .sort({ createdAt: -1 })
    .lean<IUserBooking[]>();

  // 3. Transformation Type Safety
  // rawBookings is RawPopulatedBooking[], toUserBookingDTO expects RawPopulatedBooking.
  // TS automatically verifies every element maps correctly to UserBookingDTO.
  return rawBookings.map(toUserBookingDTO);
}
export async function getUserBooking(id: string): Promise<UserBookingDTO | null> {
  // 1. Guard Clause Type Safety
  // Must return an empty array typed implicitly as UserBookingDTO[]
  if (!id) return null;

  await connectToDatabase();

  if (!Property) {
    throw new Error("Property model not registered for populate");
  }

  const rawBookings = await Booking.findById(id)
    .populate({
      path: "propertyId",
      select: "title location images",
    })
    .lean<IUserBooking>();

  if (!rawBookings) return null;

  return toUserBookingDTO(rawBookings);
}

async function getReviewsForProperty(propertyId: string): Promise<IReview[]> {
  try {
    await connectToDatabase();

    const reviews = await Review.find({ propertyId }).sort({ createdAt: -1 }).lean<IReview>();

    return JSON.parse(JSON.stringify(reviews));
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}

async function getHostProperties(): Promise<IProperty[] | null> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) throw new Error("Unauthorized");

  await connectToDatabase();

  const properties = await Property.find({
    "host.userId": session.user.id,
  })
    .sort({ createdAt: -1 })
    .lean<IProperty[]>();

  return properties;
}

export {
  getAllProperties,
  getHostProperties,
  getReviewsForProperty,
  getSelectedPropertyBookinDetails,
  getSelectedPropertyDetails,
};
