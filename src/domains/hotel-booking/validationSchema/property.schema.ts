import { z } from "zod";
import { AMENITY_OPTIONS, PROPERTY_TYPES } from "../constants/property.constants";

export const locationSchema = z.object({
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  address: z.string().optional(),
});

export const pricingSchema = z.object({
  perNight: z.number().min(0, "Must be ≥ 0"),
  cleaningFee: z.number().min(0, "Must be ≥ 0"),
  serviceFee: z.number().min(0, "Must be ≥ 0"),
  currency: z.string(),
});

export const capacitySchema = z.object({
  guests: z.number().min(1, "At least 1 guest"),
  bedrooms: z.number().min(1, "At least 1 bedroom"),
  beds: z.number().min(1, "At least 1 bed"),
  bathrooms: z.number().min(1, "At least 1 bathroom"),
});

export const propertyImageSchema = z.object({
  url: z.url("Must be a valid URL"),
  alt: z.string().optional(),
});

export const propertySchema = z.object({
  title: z.string().min(3, "Title is required").max(100, "Title cannot be more than 100 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  type: z.enum(PROPERTY_TYPES),
  tags: z.array(z.string()),
  location: locationSchema,
  pricing: pricingSchema,
  capacity: capacitySchema,
  images: z.array(propertyImageSchema),
  amenities: z.array(z.enum(AMENITY_OPTIONS)),
  isPublished: z.boolean(),
  isFeatured: z.boolean(),
  minimumNights: z.number().min(1),
  maximumNights: z.number().min(1),
});

export type PropertyFormValues = z.infer<typeof propertySchema>;

export const propertyFormDefaults: PropertyFormValues = {
  title: "Quiet Canopy Retreat",
  description:
    "Escape the noise at Quiet Canopy Retreat, a serene forest hideaway nestled high among the trees, crafted for quiet mornings, starry nights, and total peace of mind.",
  type: "Entire home",
  tags: [],
  location: { city: "New York", country: "United States", address: "123 Ocean Avenue, New York, USA" },
  pricing: { perNight: 120, cleaningFee: 20, serviceFee: 30, currency: "USD" },
  capacity: { guests: 1, bedrooms: 1, beds: 1, bathrooms: 1 },
  images: [
    {
      url: "https://plus.unsplash.com/premium_photo-1689609950112-d66095626efb?q=80?auto=format&fit=crop&w=800&q=80",
      alt: "Main",
    },
    {
      url: "https://plus.unsplash.com/premium_photo-1689609949921-6b2529511e38?auto=format&fit=crop&w=600&q=80",
      alt: "Living",
    },
    {
      url: "https://plus.unsplash.com/premium_photo-1689609949898-5f7a10649fef?auto=format&fit=crop&w=600&q=80",
      alt: "Pool",
    },
    {
      url: "https://plus.unsplash.com/premium_photo-1689609950083-2cdf620ba026?auto=format&fit=crop&w=600&q=80",
      alt: "Kitchen",
    },
    {
      url: "https://plus.unsplash.com/premium_photo-1689609950074-0638dcbd38df?auto=format&fit=crop&w=600&q=80",
      alt: "Bedroom",
    },
  ],

  amenities: [],
  isPublished: true,
  isFeatured: false,
  minimumNights: 1,
  maximumNights: 365,
};
