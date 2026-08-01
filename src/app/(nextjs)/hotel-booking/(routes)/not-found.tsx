import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center w-full">
          {/* Top Icon Pill with Spinner */}
          <div className="p-3 text-primary rounded-full bg-primary/5 dark:bg-gray-800">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>

          {/* Heading & Subtitle */}
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">Loading...</h1>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Please wait a moment while we fetch your information.
          </p>

          {/* Animated Progress Bar */}
          <div className="w-full mt-6 bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
            <div className="bg-primary dark:bg-blue-600 h-1.5 rounded-full animate-pulse w-3/4 mx-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}
