export const formatDate = (date: string | Date): string | null => {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return null;
  }
  return parsedDate.toLocaleString("en-US", { year: "numeric", month: "long" });
};

// domains/hotel-booking/utils/dates.ts
import { differenceInDays, format, parseISO } from "date-fns";

/**
 * 1. Parses a "YYYY-MM-DD" string strictly into a UTC Midnight Date object.
 * This prevents local server/client timezone offsets from shifting the day.
 */
export function parseToUTCMidnight(dateStr: string): Date {
  // Append timezone offset to force UTC midnight
  return parseISO(`${dateStr}T00:00:00.000Z`);
}

/**
 * 2. Formats a Date object back to a clean input-friendly string "YYYY-MM-DD".
 * Essential for Stripe metadata and input defaults.
 */
export function formatToISOString(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

/**
 * 3. Formats a Date object into a beautiful, human-readable display.
 * Example: "Jul 13, 2026"
 */
export function formatForDisplay(date: Date): string {
  return format(date, "MMM d, yyyy");
}

/**
 * 4. Safely calculates the number of nights between check-in and check-out.
 */
export function calculateNights(checkIn: Date, checkOut: Date): number {
  const nights = differenceInDays(checkOut, checkIn);
  return nights > 0 ? nights : 0;
}
