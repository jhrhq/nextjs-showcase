import type { Types } from "mongoose";
import Property, { type IPropertyDocument } from "@/domains/hotel-booking/models/Property.model";
import { connectToDatabase } from "../config/database";
import { toUserBookingDTO, type UserBookingDTO } from "../mappers/booking.mappers";
import { Booking } from "../models";
import type { IBookingDocument } from "../models/Booking.model";

type PaginatedProperties = {
  allProperties: IPropertyDocument[];
  total: number;
};

async function getAllProperties(
  page: number = 1,
  pageSize: number = 10,
  search: string = ""
): Promise<PaginatedProperties> {
  const skip = (page - 1) * pageSize;

  const query = search ? { $or: [{ title: new RegExp(search, "i") }] } : {};

  const total = await Property.countDocuments(query);
  const allProperties = await Property.find(query).skip(skip).limit(pageSize).lean<IPropertyDocument[]>();

  return { allProperties, total };
}

async function getSelectedPropertyDetails(propertyId?: string | Types.ObjectId): Promise<IPropertyDocument | null> {
  // Defensive check against empty inputs
  if (!propertyId) return null;

  await connectToDatabase();

  return await Property.findById(propertyId).lean<IPropertyDocument | null>();
}
async function getSelectedPropertyBookinDetails(propertyId?: string | Types.ObjectId) {
  if (!propertyId) return null;

  await connectToDatabase();

  return await Booking.findOne({ propertyId }).lean();
}

export type IUserBooking = Omit<IBookingDocument, "propertyId"> & {
  propertyId: Pick<IPropertyDocument, "_id" | "title" | "location" | "images">;
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

export { getAllProperties, getSelectedPropertyBookinDetails, getSelectedPropertyDetails };
