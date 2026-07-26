export const PROPERTY_TYPES = [
  "Entire home",
  "Private room",
  "Shared room",
  "Unique stay",
  "Hotel room",
] as const;

export const CURRENCIES = [
  "USD",
  "EUR",
  "GBP",
  "CAD",
  "AUD",
  "JPY",
  "INR",
] as const;

export const AMENITY_OPTIONS = [
  "WiFi",
  "Kitchen",
  "Washer",
  "Dryer",
  "Air conditioning",
  "Heating",
  "Dedicated workspace",
  "TV",
  "Hair dryer",
  "Iron",
  "Pool",
  "Hot tub",
  "Free parking",
  "EV charger",
  "Crib",
  "Gym",
  "BBQ grill",
  "Breakfast",
  "Indoor fireplace",
  "Smoking allowed",
  "Beachfront",
  "Waterfront",
  "Ski-in/ski-out",
  "Smoke alarm",
  "Carbon monoxide alarm",
] as const;

export type Amenity = (typeof AMENITY_OPTIONS)[number];
export type Currency = (typeof CURRENCIES)[number];
export type PropertyType = (typeof PROPERTY_TYPES)[number];
