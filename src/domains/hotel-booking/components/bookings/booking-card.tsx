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

  const thumbnail = property?.images?.[0]?.url || "/placeholder.jpg";
  const bookingCode = formatBookingCode(booking.id);
  const stayDuration = formatStayDuration(checkin, checkout);
  const calculatedNights = calculateNights(checkin, checkout);

  // Status Badge Styling
  const isPending = status.toLowerCase() === "pending";

  return (
    <div className="group bg-white border border-zinc-200/80 rounded-lg p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 hover:border-zinc-300 hover:shadow-lg transition-shadow">
      {/* Left Section: Image + Meta Info */}
      <div className="flex items-center space-x-4 w-full md:w-auto">
        {/* Thumbnail Image */}
        <div className="relative w-24 size-24 sm:w-28 sm:h-28 rounded-md overflow-hidden bg-zinc-100 shrink-0">
          <Image
            src={thumbnail}
            alt={property?.title || "Property image"}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            // sizes="112px"
          />
        </div>

        {/* Content Breakdown */}
        <div className="space-y-1.5 flex-1 min-w-0">
          {/* Header Row: Title & Status */}
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-base sm:text-lg text-zinc-900 font-semibold truncate leading-tight">
              {property?.title || "Untitled Property"}
            </h2>

            {/* Dynamic Status Pill */}
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${
                isPending
                  ? "bg-amber-50 text-amber-700 border-amber-200"
                  : "bg-emerald-50 text-emerald-700 border-emerald-200"
              }`}
            >
              {isPending ? (
                <>
                  <Clock className="w-3 h-3 text-amber-600 animate-pulse" />
                  Payment Pending
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Confirmed
                </>
              )}
            </span>
          </div>

          {/* Subtitle: Location & Code */}
          <p className="text-zinc-500 text-xs sm:text-sm font-medium">
            {property?.location?.city}, {property?.location?.country} •{" "}
            <span className="font-mono text-zinc-700 font-semibold">{bookingCode}</span>
          </p>

          {/* Date & Guest Specs */}
          <div className="flex items-center gap-3 text-xs text-zinc-500 pt-0.5">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-zinc-400" />
              {stayDuration} ({calculatedNights} nights)
            </span>
            <span className="text-zinc-300">•</span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-zinc-400" />
              {guests} guests
            </span>
          </div>
        </div>
      </div>

      {/* Right Section: Price & Action Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between md:justify-end gap-3 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-zinc-100">
        {/* Total Price Display */}
        <div className="text-left md:text-right sm:mr-2">
          <span className="text-xs text-zinc-400 block font-medium">Total Cost</span>
          <span className="text-lg font-bold text-zinc-900">
            ${priceSummary.totalCost}{" "}
            <span className="text-xs font-normal text-zinc-500 uppercase">{priceSummary.currency}</span>
          </span>
        </div>

        {/* Action Group */}
        <div className="flex items-center gap-2">
          <BookingDetailsSheet booking={booking} />
          <DownloadReceiptButton
            bookingId={booking.id}
            label="Receipt"
            size="sm"
            iconClassName="w-3.5 h-3.5 text-zinc-500"
          />
        </div>
      </div>
    </div>
  );
}
