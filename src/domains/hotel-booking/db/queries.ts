import type { Types } from "mongoose";
import Property, { type IPropertyDocument } from "@/domains/hotel-booking/models/Property.model";
import { connectToDatabase } from "../config/database";
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
async function getSelectedPropertyBookinDetails(
  propertyId?: string | Types.ObjectId
): Promise<IBookingDocument | null> {
  if (!propertyId) return null;

  await connectToDatabase();

  return await Booking.findOne({ propertyId }).lean<IBookingDocument | null>();
}

export { getAllProperties, getSelectedPropertyBookinDetails, getSelectedPropertyDetails };
