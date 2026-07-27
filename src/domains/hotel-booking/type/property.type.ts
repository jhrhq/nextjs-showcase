import type { HydratedDocument, Types } from "mongoose";
import type z4 from "zod/v4";
import type { AMENITY_OPTIONS, CURRENCIES, PROPERTY_TYPES } from "../constants/property.constants";
import type { propertySchema } from "../validationSchema/property-schema";

export type AmenityKey = (typeof AMENITY_OPTIONS)[number];
export type Currency = (typeof CURRENCIES)[number];
export type PropertyType = (typeof PROPERTY_TYPES)[number];

export type IPropertyHost = {
  userId: Types.ObjectId;
  name: string;
  avatar?: string;
  isSuperhost: boolean;
  joinedYear?: number;
};

export interface IProperty extends z4.infer<typeof propertySchema> {
  _id: Types.ObjectId;
  host: IPropertyHost;
  ratingAvg: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export type IPropertyDocument = HydratedDocument<IProperty>;
