import { format } from "date-fns";
import { AlertCircle, Calendar, CalendarOff, Users } from "lucide-react";
import Link from "next/link";
import { AUTH_CONFIG } from "@/domains/hotel-booking/constants/auth.constants";
import type { IBookingDocument } from "@/domains/hotel-booking/models/Booking.model";

export interface PropertyBookedWidgetProps {
  existingBooking: IBookingDocument;
  // onClearDates: () => void;
}

export default function PropertyBooked({ existingBooking }: PropertyBookedWidgetProps) {
  const start = new Date(existingBooking.checkin);
  const end = new Date(existingBooking.checkout);

  // Formats to clear display window: "Jul 18 - 19, 2026"
  const formattedDates = `${format(start, "MMM d")} - ${format(end, "d, yyyy")}`;

  return (
    <aside className="w-full max-w-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden sticky top-6">
      {/* Muted Rate Banner */}
      <div className="p-6 pb-4 border-b border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/50 flex justify-between items-baseline opacity-60 select-none">
        <div>
          <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            ${existingBooking.priceSummary.perNight}
          </span>
          <span className="text-zinc-500 dark:text-zinc-400 text-sm font-medium"> / night</span>
        </div>
        <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          {existingBooking.priceSummary.currency.toUpperCase()}
        </span>
      </div>

      <div className="p-6 space-y-5">
        {/* Unavailability Notice Banner */}
        <div className="flex gap-3 p-4 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 rounded-xl items-start">
          <CalendarOff className="w-5 h-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h4 className="text-sm font-bold text-amber-900 dark:text-amber-400">Reserved for these dates</h4>
            <p className="text-xs text-amber-700/80 dark:text-amber-400/70 leading-relaxed">
              This property is locked in by another party for the timeline selected below.
            </p>
          </div>
        </div>

        {/* Selected parameters (Locked State) */}
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl divide-y divide-zinc-200 dark:divide-zinc-800 bg-zinc-50/30 dark:bg-zinc-900/30">
          {/* Dates Input simulation */}
          <div className="p-3.5 flex items-center justify-between opacity-75">
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">
                  Chosen Window
                </span>
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{formattedDates}</span>
              </div>
            </div>
          </div>

          {/* Guests Box simulation */}
          <div className="p-3.5 flex items-center justify-between opacity-75">
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">
                  Capacity Selected
                </span>
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {existingBooking.guests} {existingBooking.guests === 1 ? "Guest" : "Guests"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Blocks */}
        <div className="space-y-3 pt-1">
          {/* Primary Action Button (Disabled state transformation) */}
          <button
            type="button"
            disabled
            className="w-full py-3.5 bg-zinc-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 font-bold text-sm rounded-xl cursor-not-allowed select-none transition-colors"
          >
            Dates Unavailable
          </button>

          {/* Recovery Button to reset calendar search variables */}
          <Link
            // onClick={onClearDates}
            // type="button"
            href={AUTH_CONFIG.ROUTES.HOME}
            className="w-full flex items-center justify-center py-3 bg-transparent border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-zinc-800 dark:text-zinc-200 font-semibold text-xs rounded-xl transition-all cursor-pointer text-center"
          >
            {/*Check Alternative Dates*/}
            Back to properties
          </Link>
        </div>
      </div>

      {/* Subtle Integrity Footnote */}
      <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-900/40 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center gap-2 justify-center text-[11px] text-zinc-400 select-none">
        <AlertCircle className="w-3.5 h-3.5" />
        <span>Live verification system enabled</span>
      </div>
    </aside>
  );
}
