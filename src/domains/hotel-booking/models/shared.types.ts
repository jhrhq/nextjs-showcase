// ─── Shared sub-document interfaces ──────────────────────────────────────────
// Used across Property, Review, and Booking models.

export interface ILocation {
  street?: string;
  city: string;
  state?: string;
  country: string;
  address?: string; // human-readable one-liner e.g. "12 Baker St, London"
  postalCode?: string;
  coordinates?: { lat: number; lng: number };
}

// Embedded snapshot of the host — avoids a join on every card render
export interface IHost {
  userId: import("mongoose").Types.ObjectId; // ref → User
  name: string;
  avatar?: string;
  isSuperhost: boolean;
  joinedYear?: number;
}
