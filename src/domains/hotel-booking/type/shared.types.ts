export interface ILocation {
  street?: string;
  city: string;
  state?: string;
  country: string;
  address?: string; // human-readable one-liner e.g. "12 Baker St, London"
  postalCode?: string;
  coordinates?: { lat: number; lng: number };
}
