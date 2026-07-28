import type { HydratedDocument, Types } from "mongoose";
import type { z } from "zod/v4";
import type { AMENITY_OPTIONS, CURRENCIES, PROPERTY_TYPES } from "../constants/property.constants";
import type {
  capacitySchema,
  locationSchema,
  PropertyFormValues,
  pricingSchema,
  propertyImageSchema,
} from "../validationSchema/property.schema";

export type AmenityKey = (typeof AMENITY_OPTIONS)[number];
export type Currency = (typeof CURRENCIES)[number];
export type PropertyType = (typeof PROPERTY_TYPES)[number];

export type ILocation = z.infer<typeof locationSchema>;
export type IPricing = z.infer<typeof pricingSchema>;
export type ICapacity = z.infer<typeof capacitySchema>;
export type IPropertyImage = z.infer<typeof propertyImageSchema>;

export type IPropertyHost = {
  userId: Types.ObjectId;
  name: string;
  avatar?: string;
  isSuperhost: boolean;
  joinedYear?: number;
};

export interface IProperty extends PropertyFormValues {
  _id: Types.ObjectId;
  host: IPropertyHost;
  ratingAvg: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export type IPropertyDocument = HydratedDocument<IProperty>;
