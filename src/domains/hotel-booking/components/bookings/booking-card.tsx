import { Calendar, CheckCircle2, Clock, Users } from "lucide-react";
import Image from "next/image";
import { calculateNights, formatStayDuration } from "@/domains/hotel-booking/utils/date-time-utils";
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
    <div className="group bg-card text-card-foreground border border-border rounded-lg p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 hover:border-border/80 hover:shadow-lg transition-all">
      {/* Left Section: Image + Meta Info */}
      <div className="flex items-center space-x-4 w-full md:w-auto">
        {/* Thumbnail Image */}
        <div className="relative w-24 size-24 sm:w-28 sm:h-28 rounded-md overflow-hidden bg-muted shrink-0">
          <Image
            src={thumbnail}
            alt={property?.title || "Property image"}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="112px"
            loading="lazy"
          />
        </div>

        {/* Content Breakdown */}
        <div className="space-y-1.5 flex-1 min-w-0">
          {/* Header Row: Title & Status */}
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-base sm:text-lg text-foreground font-semibold truncate leading-tight">
              {property?.title || "Untitled Property"}
            </h2>

            {/* Dynamic Status Pill */}
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${
                isPending
                  ? "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20"
                  : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20"
              }`}
            >
              {isPending ? (
                <>
                  <Clock className="w-3 h-3 text-amber-600 dark:text-amber-400 animate-pulse" />
                  Payment Pending
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Confirmed
                </>
              )}
            </span>
          </div>

          {/* Subtitle: Location & Code */}
          <p className="text-muted-foreground text-xs sm:text-sm font-medium">
            {property?.location?.city}, {property?.location?.country} •{" "}
            <span className="font-mono text-foreground font-semibold">{bookingCode}</span>
          </p>

          {/* Date & Guest Specs */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground pt-0.5">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
              {stayDuration} ({calculatedNights} nights)
            </span>
            <span className="text-border">•</span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-muted-foreground" />
              {guests} guests
            </span>
          </div>
        </div>
      </div>

      {/* Right Section: Price & Action Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between md:justify-end gap-3 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-border">
        {/* Total Price Display */}
        <div className="text-left md:text-right sm:mr-2">
          <span className="text-xs text-muted-foreground block font-medium">Total Cost</span>
          <span className="text-lg font-bold text-foreground">
            ${priceSummary.totalCost}{" "}
            <span className="text-xs font-normal text-muted-foreground uppercase">{priceSummary.currency}</span>
          </span>
        </div>

        {/* Action Group */}
        <div className="flex items-center gap-2">
          <BookingDetailsSheet booking={booking} />
          <DownloadReceiptButton
            bookingId={booking.id}
            label="Receipt"
            size="sm"
            iconClassName="w-3.5 h-3.5 text-muted-foreground"
          />
        </div>
      </div>
    </div>
  );
}
