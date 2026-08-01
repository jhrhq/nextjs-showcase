import { Skeleton } from "@/components/ui/skeleton";

export default function SignInSkeleton() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md p-8 sm:p-10 border border-gray-200/80 dark:border-gray-800 rounded-3xl space-y-6 bg-white dark:bg-gray-900 shadow-xs">
        {/* 1. Card Header (Title & Subtitle) */}
        <div className="flex flex-col items-center text-center space-y-2">
          {/* Title: "Sign in to Hotel Booking" */}
          <Skeleton className="h-8 w-64 rounded-lg" />

          {/* Subtitle: "Welcome back! Let's get you signed in." */}
          <Skeleton className="h-4 w-52 rounded-md" />
        </div>

        {/* 2. Divider with "or" text */}
        <div className="flex items-center w-full my-6">
          <div className="w-full h-px bg-gray-100 dark:bg-gray-800" />
          <Skeleton className="h-3 w-6 mx-3 rounded shrink-0" />
          <div className="w-full h-px bg-gray-100 dark:bg-gray-800" />
        </div>

        {/* 3. Form Input Fields & Button */}
        <div className="space-y-4">
          {/* Email Input Field */}
          <Skeleton className="h-12 w-full rounded-full" />

          {/* Password Input Field */}
          <Skeleton className="h-12 w-full rounded-full" />

          {/* Continue CTA Button */}
          <Skeleton className="h-12 w-full rounded-full pt-1" />
        </div>

        {/* 4. Card Footer ("Don't have an account? Sign up") */}
        <div className="pt-2 flex justify-center">
          <Skeleton className="h-4 w-48 rounded-md" />
        </div>
      </div>
    </div>
  );
}
