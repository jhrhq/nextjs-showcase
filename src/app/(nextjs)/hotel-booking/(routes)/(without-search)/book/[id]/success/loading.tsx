import { Skeleton } from "@/components/ui/skeleton";

export default function BookingConfirmationSkeleton() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-6">
      <div className="max-w-2xl mx-auto flex flex-col items-center space-y-8">
        {/* 1. Top Success Badge & Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          {/* Checkmark Icon Circle Skeleton */}
          <Skeleton className="w-14 h-14 rounded-full" />

          {/* "Payment Successful!" Title */}
          <Skeleton className="h-8 w-64 rounded-lg mt-2" />

          {/* Subtitle */}
          <Skeleton className="h-4 w-80 sm:w-96 rounded-md" />
        </div>

        {/* 2. Main Reservation Details Card */}
        <div className="w-full p-6 border border-gray-200/80 dark:border-gray-800 rounded-2xl space-y-6">
          {/* Property Info Top Row */}
          <div className="flex items-start gap-4">
            <Skeleton className="w-20 h-20 rounded-xl shrink-0" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-6 w-48 rounded-md" />
              <Skeleton className="h-4 w-28 rounded" />
              <Skeleton className="h-4 w-full rounded" />
            </div>
          </div>

          <div className="h-px bg-gray-100 dark:bg-gray-800" />

          {/* Details & Payment Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Left: Reservation Details */}
            <div className="space-y-3">
              <Skeleton className="h-5 w-36 rounded-md" />
              <div className="space-y-2 pt-1">
                <div className="flex justify-between sm:justify-start sm:gap-6">
                  <Skeleton className="h-4 w-20 rounded" />
                  <Skeleton className="h-4 w-24 rounded" />
                </div>
                <div className="flex justify-between sm:justify-start sm:gap-6">
                  <Skeleton className="h-4 w-20 rounded" />
                  <Skeleton className="h-4 w-24 rounded" />
                </div>
                <div className="flex justify-between sm:justify-start sm:gap-6">
                  <Skeleton className="h-4 w-20 rounded" />
                  <Skeleton className="h-4 w-16 rounded" />
                </div>
              </div>
            </div>

            {/* Right: Payment Summary */}
            <div className="space-y-3">
              <Skeleton className="h-5 w-36 rounded-md" />
              <div className="space-y-2 pt-1">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-28 rounded" />
                  <Skeleton className="h-5 w-20 rounded-md" />
                </div>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-20 rounded" />
                  <Skeleton className="h-6 w-16 rounded-md" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Next Steps Card */}
        <div className="w-full p-6 border border-gray-200/80 dark:border-gray-800 rounded-2xl space-y-6">
          <Skeleton className="h-6 w-28 rounded-md" />

          <div className="space-y-5">
            {/* Step 1 */}
            <div className="flex items-start gap-3">
              <Skeleton className="w-8 h-8 rounded-lg shrink-0" />
              <div className="space-y-1.5 flex-1">
                <Skeleton className="h-4 w-36 rounded" />
                <Skeleton className="h-3.5 w-4/5 rounded" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-3">
              <Skeleton className="w-8 h-8 rounded-lg shrink-0" />
              <div className="space-y-1.5 flex-1">
                <Skeleton className="h-4 w-32 rounded" />
                <Skeleton className="h-3.5 w-3/4 rounded" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-3">
              <Skeleton className="w-8 h-8 rounded-lg shrink-0" />
              <div className="space-y-1.5 flex-1">
                <Skeleton className="h-4 w-28 rounded" />
                <Skeleton className="h-3.5 w-5/6 rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* 4. Action Button & Help Footer */}
        <div className="flex flex-col items-center space-y-4 pt-2">
          <Skeleton className="h-11 w-48 rounded-xl" />
          <Skeleton className="h-4 w-56 rounded-md" />
        </div>
      </div>
    </div>
  );
}
