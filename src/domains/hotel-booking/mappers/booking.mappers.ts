import type { IUserBooking } from "../db/queries";
import type { BookingStatus } from "../models/Booking.model";
import type { IProperty } from "../type/property.type";
import type { ILocation } from "../type/shared.types";

export function toIdString(id: unknown): string {
  if (!id) return "";
  if (typeof id === "string") return id;
  if (typeof id === "object" && "toString" in id) return id.toString();
  return String(id);
}

export interface PropertySummaryDTO {
  id: string;
  title: string;
  location: ILocation;
  images: IProperty["images"];
}

export interface UserBookingDTO {
  id: string;
  checkin: Date;
  checkout: Date;
  guests: number;
  status: BookingStatus;
  userId: string;
  priceSummary: {
    totalCost: number;
    currency: string;
  };
  property: PropertySummaryDTO;
}

export function toUserBookingDTO({ _id, propertyId, ...rest }: IUserBooking): UserBookingDTO {
  const property = propertyId ?? {};
  return {
    id: toIdString(_id),
    ...rest,
    userId: toIdString(rest.userId),
    property: {
      id: toIdString(property._id),
      title: property.title,
      location: property.location,
      images: property.images ?? [],
    },
  };
}
