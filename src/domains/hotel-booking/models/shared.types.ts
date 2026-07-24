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

// Embedded snapshot of a reviewer — name + avatar captured at review time
// so deleting the User account doesn't wipe historical review display data
export interface IReviewSnapshot {
  authorId: string; // ref → User
  authorName: string;
  authorAvatar?: string;
  overallRating: number;
  comment: string;
}
