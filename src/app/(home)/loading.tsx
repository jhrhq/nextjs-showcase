import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-[#0a0a0a] dark:text-zinc-100 font-sans transition-colors duration-300">
      {/* Navbar Skeleton */}
      <header className="sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-800/60 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Skeleton className="h-6 w-16 bg-zinc-200 dark:bg-zinc-800/80 rounded" />
          <div className="hidden md:flex items-center space-x-6">
            <Skeleton className="h-4 w-12 bg-zinc-200 dark:bg-zinc-800/80 rounded" />
            <Skeleton className="h-4 w-28 bg-zinc-200 dark:bg-zinc-800/80 rounded" />
            <Skeleton className="h-4 w-16 bg-zinc-200 dark:bg-zinc-800/80 rounded" />
            <Skeleton className="h-4 w-16 bg-zinc-200 dark:bg-zinc-800/80 rounded" />
            <Skeleton className="h-4 w-16 bg-zinc-200 dark:bg-zinc-800/80 rounded" />
            <Skeleton className="h-4 w-16 bg-zinc-200 dark:bg-zinc-800/80 rounded" />
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-8 w-28 rounded-full bg-zinc-200 dark:bg-zinc-800/80" />
            <Skeleton className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-800/80" />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 py-16 space-y-28">
        {/* Hero Section */}
        <section className="space-y-8 pt-6">
          <div className="flex items-center space-x-3">
            <Skeleton className="h-3 w-32 bg-zinc-200 dark:bg-zinc-800/80 rounded-full" />
          </div>

          <div className="space-y-4">
            <Skeleton className="h-12 md:h-16 w-full max-w-3xl bg-zinc-200 dark:bg-zinc-800/80 rounded-lg" />
            <Skeleton className="h-12 md:h-16 w-2/3 max-w-2xl bg-zinc-200 dark:bg-zinc-800/80 rounded-lg" />
          </div>

          <Skeleton className="h-6 w-64 bg-zinc-200 dark:bg-zinc-800/80 rounded" />

          <div className="space-y-3 pt-2 max-w-2xl">
            <Skeleton className="h-4 w-full bg-zinc-200 dark:bg-zinc-800/60 rounded" />
            <Skeleton className="h-4 w-5/6 bg-zinc-200 dark:bg-zinc-800/60 rounded" />
          </div>

          <div className="flex space-x-4 pt-2">
            <Skeleton className="h-10 w-44 rounded-lg bg-zinc-200 dark:bg-zinc-800/80" />
            <Skeleton className="h-10 w-28 rounded-lg bg-zinc-200 dark:bg-zinc-800/80" />
          </div>

          <div className="flex space-x-4 pt-2">
            <Skeleton className="h-6 w-6 rounded-full bg-zinc-200 dark:bg-zinc-800/80" />
            <Skeleton className="h-6 w-6 rounded-full bg-zinc-200 dark:bg-zinc-800/80" />
            <Skeleton className="h-6 w-6 rounded-full bg-zinc-200 dark:bg-zinc-800/80" />
          </div>

          <Skeleton className="h-4 w-32 bg-zinc-200 dark:bg-zinc-800/60 rounded pt-4" />
        </section>

        {/* Tech Stack Marquee / Grid bar */}
        <section className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-3 py-6 border-y border-zinc-200 dark:border-zinc-800/60">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-xl bg-zinc-100 dark:bg-zinc-900" />
          ))}
        </section>

        {/* Section 01: Featured Work */}
        <section className="space-y-10 pt-10">
          <div className="space-y-2">
            <Skeleton className="h-3 w-32 bg-zinc-200 dark:bg-zinc-800/80 rounded" />
            <Skeleton className="h-8 w-80 bg-zinc-200 dark:bg-zinc-800/80 rounded-md" />
            <Skeleton className="h-4 w-full max-w-xl bg-zinc-200 dark:bg-zinc-800/60 rounded" />
          </div>

          {/* Featured Bento Grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Big Project Card Skeleton */}
            <div className="lg:col-span-7 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-950 p-6 space-y-6">
              <Skeleton className="h-64 w-full rounded-xl bg-zinc-200 dark:bg-zinc-900" />
              <div className="flex space-x-2">
                <Skeleton className="h-5 w-24 rounded-full bg-zinc-200 dark:bg-zinc-800/80" />
                <Skeleton className="h-5 w-28 rounded-full bg-zinc-200 dark:bg-zinc-800/80" />
              </div>
              <Skeleton className="h-7 w-64 bg-zinc-200 dark:bg-zinc-800/80 rounded" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full bg-zinc-200 dark:bg-zinc-800/60 rounded" />
                <Skeleton className="h-4 w-4/5 bg-zinc-200 dark:bg-zinc-800/60 rounded" />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-900">
                <Skeleton className="h-4 w-40 bg-zinc-200 dark:bg-zinc-800/50 rounded" />
                <Skeleton className="h-4 w-40 bg-zinc-200 dark:bg-zinc-800/50 rounded" />
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="h-6 w-16 rounded bg-zinc-200 dark:bg-zinc-900" />
                ))}
              </div>
            </div>

            {/* Right Stacked Projects Column */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {[1, 2].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-950 p-6 space-y-4"
                >
                  <Skeleton className="h-36 w-full rounded-xl bg-zinc-200 dark:bg-zinc-900" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-6 w-48 bg-zinc-200 dark:bg-zinc-800/80 rounded" />
                    <Skeleton className="h-5 w-14 rounded-full bg-zinc-200 dark:bg-zinc-800/80" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full bg-zinc-200 dark:bg-zinc-800/60 rounded" />
                    <Skeleton className="h-4 w-3/4 bg-zinc-200 dark:bg-zinc-800/60 rounded" />
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton key={i} className="h-5 w-16 rounded bg-zinc-200 dark:bg-zinc-900" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 02: Archive & Labs */}
        <section className="space-y-8 pt-10 border-t border-zinc-200 dark:border-zinc-900">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <Skeleton className="h-3 w-32 bg-zinc-200 dark:bg-zinc-800/80 rounded" />
              <Skeleton className="h-10 w-full max-w-md bg-zinc-200 dark:bg-zinc-800/80 rounded-lg" />
              <Skeleton className="h-16 w-full max-w-lg bg-zinc-200 dark:bg-zinc-800/60 rounded" />
              <Skeleton className="h-10 w-36 rounded-lg bg-zinc-200 dark:bg-zinc-800/80 pt-2" />
            </div>

            <div className="lg:col-span-6 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-950 p-6 space-y-4">
              {[1, 2, 3].map((row) => (
                <div
                  key={row}
                  className="flex items-center justify-between py-3 border-b border-zinc-200 dark:border-zinc-900 last:border-0"
                >
                  <div className="flex items-center space-x-3">
                    <Skeleton className="h-8 w-8 rounded-lg bg-zinc-200 dark:bg-zinc-900" />
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-32 bg-zinc-200 dark:bg-zinc-800/80 rounded" />
                      <Skeleton className="h-3 w-20 bg-zinc-200 dark:bg-zinc-800/60 rounded" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-8 bg-zinc-200 dark:bg-zinc-800/80 rounded" />
                </div>
              ))}
              <div className="flex justify-between items-center pt-2">
                <Skeleton className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800/60 rounded" />
                <Skeleton className="h-4 w-20 bg-zinc-200 dark:bg-zinc-800/80 rounded" />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Banner Card */}
        <section className="rounded-3xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-950 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 w-full max-w-lg">
            <Skeleton className="h-3 w-24 bg-zinc-200 dark:bg-zinc-800/80 rounded" />
            <Skeleton className="h-8 w-64 bg-zinc-200 dark:bg-zinc-800/80 rounded-md" />
            <Skeleton className="h-4 w-full bg-zinc-200 dark:bg-zinc-800/60 rounded" />
          </div>
          <Skeleton className="h-11 w-44 rounded-xl bg-zinc-200 dark:bg-zinc-800/80 shrink-0" />
        </section>
      </main>

      {/* Footer Skeleton */}
      <footer className="border-t border-zinc-200 dark:border-zinc-900 mt-28 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <Skeleton className="h-4 w-44 bg-zinc-200 dark:bg-zinc-800/60 rounded" />
          <div className="flex space-x-4">
            <Skeleton className="h-5 w-5 rounded-full bg-zinc-200 dark:bg-zinc-800/80" />
            <Skeleton className="h-5 w-5 rounded-full bg-zinc-200 dark:bg-zinc-800/80" />
            <Skeleton className="h-5 w-5 rounded-full bg-zinc-200 dark:bg-zinc-800/80" />
          </div>
          <Skeleton className="h-4 w-36 bg-zinc-200 dark:bg-zinc-800/60 rounded" />
        </div>
      </footer>
    </div>
  );
}
