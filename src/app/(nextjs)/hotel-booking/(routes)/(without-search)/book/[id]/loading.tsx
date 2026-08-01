import { Skeleton } from "@/components/ui/skeleton";

export default function CheckoutSkeleton() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container max-w-5xl px-6 py-8 mx-auto space-y-8">
        {/* Back Link / Page Header */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-5 w-36 rounded-md" />
        </div>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Trip Details & Request Action (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* "Your trip" Card */}
            <div className="p-6 border border-gray-200/80 dark:border-gray-800 rounded-2xl space-y-6">
              {/* Card Title */}
              <Skeleton className="h-7 w-28 rounded-md" />

              {/* Dates Row */}
              <div className="flex items-center justify-between pt-2">
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-12 rounded" />
                  <Skeleton className="h-4 w-28 rounded" />
                </div>
                <Skeleton className="h-9 w-16 rounded-lg" />
              </div>

              <div className="h-px bg-gray-100 dark:bg-gray-800" />

              {/* Guests Row */}
              <div className="flex items-center justify-between">
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-14 rounded" />
                  <Skeleton className="h-4 w-20 rounded" />
                </div>
                <Skeleton className="h-9 w-16 rounded-lg" />
              </div>
            </div>

            {/* Request to Book CTA Button */}
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>

          {/* Right Column: Order Summary Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="p-6 border border-gray-200/80 dark:border-gray-800 rounded-2xl space-y-6">
              {/* Property Info Header */}
              <div className="flex items-center gap-4">
                <Skeleton className="w-16 h-16 rounded-xl shrink-0" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-5 w-4/5 rounded-md" />
                  <Skeleton className="h-4 w-28 rounded-md" />
                </div>
              </div>

              <div className="h-px bg-gray-200 dark:bg-gray-800" />

              {/* Price Details Heading */}
              <Skeleton className="h-5 w-28 rounded-md" />

              {/* Price Line Items */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-32 rounded" />
                  <Skeleton className="h-4 w-12 rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-24 rounded" />
                  <Skeleton className="h-4 w-10 rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-20 rounded" />
                  <Skeleton className="h-4 w-10 rounded" />
                </div>
              </div>

              <div className="h-px bg-gray-200 dark:bg-gray-800" />

              {/* Total Line */}
              <div className="flex items-center justify-between pt-1">
                <Skeleton className="h-6 w-28 rounded-md" />
                <Skeleton className="h-6 w-14 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
