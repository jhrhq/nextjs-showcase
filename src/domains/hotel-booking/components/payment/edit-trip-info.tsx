"use client";

import type { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useBookingParams } from "../../hooks/use-booking-params";
import { formatStayDuration, isPastDate } from "../../utils/date-time-utils";
import { GuestStepper } from "./guest-stepper";

export default function EditTripInfo({ maxGuests }: { maxGuests: number }) {
  const { startDate, endDate, guestsCount, updateBookingParams } = useBookingParams(maxGuests);

  const handleDateChange = (range: DateRange | undefined) => {
    if (!range) return;
    updateBookingParams({
      checkin: range.from,
      checkout: range.to,
    });
  };

  return (
    <section className="p-6 bg-background mb-8 rounded-xl border border-zinc-100">
      <h2 className="text-xl font-semibold mb-6 text-zinc-900 tracking-tight">Your trip</h2>

      {/* Date Row */}
      <div className="flex justify-between items-center mb-6 pb-6 border-b border-zinc-100">
        <div>
          <h3 className="font-medium text-sm text-zinc-900">Dates</h3>
          <p className="text-zinc-500 text-sm mt-0.5">{formatStayDuration(startDate, endDate)}</p>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button type="button" variant="secondary" className="font-semibold px-4 py-2 rounded-md">
              Edit
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 rounded-md" align="end">
            <Calendar
              mode="range"
              selected={{ from: startDate, to: endDate }}
              onSelect={handleDateChange}
              disabled={isPastDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Guests Row */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium text-sm text-zinc-900">Guests</h3>
          <p className="text-zinc-500 text-sm mt-0.5">
            {guestsCount} guest{guestsCount > 1 ? "s" : ""}
          </p>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button type="button" variant="secondary" className="font-semibold px-4 py-2 rounded-md border-zinc-200">
              Edit
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-4 rounded-md shadow-lg border border-zinc-100" align="end">
            <GuestStepper
              value={guestsCount}
              maxGuests={maxGuests}
              onChange={(newGuests) => updateBookingParams({ guests: newGuests })}
            />
          </PopoverContent>
        </Popover>
      </div>
    </section>
  );
}
