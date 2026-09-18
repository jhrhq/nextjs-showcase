import { Calendar, CheckCircle2, Clock, Users } from "lucide-react";
import Image from "next/image";
import { calculateNights, formatStayDuration } from "@/domains/hotel-booking/utils/date-time-utils";
import { cn } from "@/lib/utils";
import { toIdString, type UserBookingDTO } from "../../mappers/booking.mappers";
import { DownloadReceiptButton } from "../download-receipt-button";
import { BookingDetailsSheet } from "./booking-details-sheet";

export function formatBookingCode(id: unknown): string {
  const idStr = toIdString(id);

  if (!idStr) return "#BOOKING";

  return `#${idStr.slice(-6).toUpperCase()}`;
}

export function BookingCard({ booking }: { booking: UserBookingDTO }) {
  const { property, checkin, checkout, guests, status, priceSummary } = booking;

  const thumbnail = property?.images?.[0]?.url || "/placeholder.svg";
  const bookingCode = formatBookingCode(booking.id);
  const stayDuration = formatStayDuration(checkin, checkout);
  const calculatedNights = calculateNights(checkin, checkout);

  const isPending = status.toLowerCase() === "pending";

  return (
    <div className="group bg-card text-card-foreground border border-border rounded-xl p-4 sm:p-5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 lg:gap-6 hover:border-border/80 hover:shadow-md transition-all">
      {/* Left Section: Thumbnail + Metadata */}
      <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 min-w-0 flex-1">
        {/* Thumbnail Image */}
        <div className="relative size-20 sm:size-24 md:size-28 rounded-lg overflow-hidden bg-muted shrink-0">
          <Image
            src={thumbnail}
            alt={property?.title || "Property image"}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 112px"
            loading="lazy"
          />
        </div>

        {/* Content Breakdown */}
        <div className="flex flex-col gap-1.5 min-w-0 flex-1">
          {/* Header Row: Title & Status */}
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-sm sm:text-base md:text-lg text-foreground font-semibold truncate max-w-full leading-snug">
              {property?.title || "Untitled Property"}
            </h2>

            {/* Dynamic Status Pill */}
            <span
              className={cn(
                "inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full border shrink-0",
                isPending
                  ? "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20"
                  : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20"
              )}
            >
              {isPending ? (
                <>
                  <Clock className="size-3 text-amber-600 dark:text-amber-400 animate-pulse" />
                  <span>Pending</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="size-3 text-emerald-600 dark:text-emerald-400" />
                  <span>Confirmed</span>
                </>
              )}
            </span>
          </div>

          {/* Location & Booking Code */}
          <p className="text-muted-foreground text-xs sm:text-sm font-medium truncate">
            {property?.location?.city}, {property?.location?.country}
            <span className="mx-1.5 text-muted-foreground/60">•</span>
            <span className="font-mono text-foreground font-semibold">{bookingCode}</span>
          </p>

          {/* Date & Guest Specs */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground pt-0.5">
            <span className="inline-flex items-center gap-1">
              <Calendar className="size-3.5 shrink-0" />
              <span>
                {stayDuration} ({calculatedNights} {calculatedNights === 1 ? "night" : "nights"})
              </span>
            </span>
            <span className="text-muted-foreground/50 hidden sm:inline">•</span>
            <span className="inline-flex items-center gap-1">
              <Users className="size-3.5 shrink-0" />
              <span>
                {guests} {guests === 1 ? "guest" : "guests"}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Right Section: Price & Action Buttons */}
      <div className="flex flex-col sm:flex-row lg:flex-col sm:items-center lg:items-end justify-between lg:justify-center gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-border/80 shrink-0">
        {/* Total Price */}
        <div className="text-left lg:text-right">
          <span className="text-[11px] uppercase tracking-wider text-muted-foreground block font-medium">Total</span>
          <span className="text-base sm:text-lg font-bold text-foreground leading-tight">
            ${priceSummary.totalCost}{" "}
            <span className="text-xs font-normal text-muted-foreground uppercase">{priceSummary.currency}</span>
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <BookingDetailsSheet booking={booking} />
          <DownloadReceiptButton
            bookingId={booking.id}
            label="Receipt"
            size="sm"
            iconClassName="size-3.5 text-muted-foreground"
          />
        </div>
      </div>
    </div>
  );
}
