import { z } from "zod";

export const propertySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  type: z.enum(["Entire home", "Private room", "Shared room", "Unique stay", "Hotel room"]),
  tags: z.array(z.string()),
  location: z.object({
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
    address: z.string().optional(),
  }),
  pricing: z.object({
    perNight: z.number().min(0, "Must be ≥ 0"),
    cleaningFee: z.number().min(0, "Must be ≥ 0"),
    serviceFee: z.number().min(0, "Must be ≥ 0"),
    currency: z.string(),
  }),
  capacity: z.object({
    guests: z.number().min(1, "At least 1 guest"),
    bedrooms: z.number().min(0),
    beds: z.number().min(0),
    bathrooms: z.number().min(0),
  }),
  images: z.array(z.object({ url: z.string().url("Must be a valid URL"), alt: z.string() })),
  amenities: z.array(z.string()),
  isPublished: z.boolean(),
  isFeatured: z.boolean(),
  minimumNights: z.number().min(1),
  maximumNights: z.number().min(1),
});

export type PropertyFormValues = z.infer<typeof propertySchema>;

export const propertyFormDefaults: PropertyFormValues = {
  title: "Relaxing Lakeside Home",
  description: "Lovely lakeside family home.",
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
