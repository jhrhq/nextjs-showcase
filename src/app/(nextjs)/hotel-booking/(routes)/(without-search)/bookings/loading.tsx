import { Skeleton } from "@/components/ui/skeleton";

export default function MyBookingsSkeleton() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8 px-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Page Title: "My Bookings" */}
        <div className="pb-2">
          <Skeleton className="h-8 w-40 rounded-lg" />
        </div>

        {/* Bookings List Cards */}
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="p-4 sm:p-5 border border-gray-200/80 dark:border-gray-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-gray-900"
            >
              {/* Left Section: Image + Details */}
              <div className="flex items-start gap-4 flex-1 min-w-0">
                {/* Property Thumbnail */}
                <Skeleton className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl shrink-0" />

                {/* Info Column */}
                <div className="space-y-2.5 flex-1 min-w-0 pt-0.5">
                  {/* Title & Status Badge */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <Skeleton className="h-5 w-44 sm:w-56 rounded-md" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </div>

                  {/* Location & Booking ID */}
                  <Skeleton className="h-4 w-36 sm:w-48 rounded" />

                  {/* Dates & Guests Line */}
                  <div className="flex items-center gap-3 pt-1">
                    <Skeleton className="h-4 w-32 rounded" />
                    <span className="text-gray-300 dark:text-gray-700">•</span>
                    <Skeleton className="h-4 w-20 rounded" />
                  </div>
                </div>
              </div>

              {/* Right Section: Price & Action Buttons */}
              <div className="flex items-center justify-between md:justify-end gap-4 sm:gap-6 pt-2 md:pt-0 border-t md:border-t-0 border-gray-100 dark:border-gray-800 shrink-0">
                {/* Total Cost Column */}
                <div className="flex flex-col md:items-end space-y-1">
                  <Skeleton className="h-3 w-14 rounded" />
                  <Skeleton className="h-6 w-20 rounded-md" />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  {/* View Trip Details Button */}
                  <Skeleton className="h-9 w-32 sm:w-36 rounded-lg" />
                  {/* Receipt Button */}
                  <Skeleton className="h-9 w-20 sm:w-24 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
