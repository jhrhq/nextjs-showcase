"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { startTransition, useCallback, useMemo } from "react";
import { calculateNights, formatDateISO, parseUrlDate } from "../utils/date-time-utils";

export function useBookingParams(maxGuests: number, defaultGuests = 1) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const checkinStr = searchParams.get("checkin") || "";
  const checkoutStr = searchParams.get("checkout") || "";
  const guestsStr = searchParams.get("guests") || "";

  const startDate = useMemo(() => parseUrlDate(checkinStr), [checkinStr]);
  const endDate = useMemo(() => parseUrlDate(checkoutStr), [checkoutStr]);

  const guestsCount = useMemo(() => {
    const raw = guestsStr ? Number(guestsStr) : defaultGuests;
    if (Number.isNaN(raw)) return defaultGuests;
    return Math.min(maxGuests, Math.max(1, raw));
  }, [guestsStr, defaultGuests, maxGuests]);

  const calculatedNights = useMemo(() => calculateNights(startDate, endDate), [startDate, endDate]);

  const updateBookingParams = useCallback(
    (updates: { checkin?: Date; checkout?: Date; guests?: number }) => {
      const params = new URLSearchParams(searchParams.toString());

      if ("checkin" in updates) {
        if (updates.checkin) params.set("checkin", formatDateISO(updates.checkin));
        else params.delete("checkin");
      }

      if ("checkout" in updates) {
        if (updates.checkout) params.set("checkout", formatDateISO(updates.checkout));
        else params.delete("checkout");
      }

      if ("guests" in updates) {
        if (updates.guests) params.set("guests", String(updates.guests));
        else params.delete("guests");
      }

      const newUrl = `${pathname}?${params.toString()}`;

      // Wrap router updates in startTransition to prevent blocking UI renders
      startTransition(() => {
        router.replace(newUrl, { scroll: false });
      });
    },
    [searchParams, pathname, router]
  );

  return {
    checkinStr,
    checkoutStr,
    startDate,
    endDate,
    guestsCount,
    calculatedNights,
    updateBookingParams,
  };
}
