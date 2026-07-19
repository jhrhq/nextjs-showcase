import type { Types } from "mongoose";
import Property, { type IPropertyDocument } from "@/domains/hotel-booking/models/Property.model";
import { connectToDatabase } from "../config/database";

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

  // .lean() strips Mongoose internal tracking overhead, returning a lightweight plain JS object
  return await Property.findById(propertyId).lean<IPropertyDocument | null>();
}

export { getAllProperties, getSelectedPropertyDetails };
