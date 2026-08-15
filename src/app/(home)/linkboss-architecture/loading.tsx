import { Skeleton } from "@/components/ui/skeleton";

export default function CaseStudyLoading() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-[#0a0a0a] dark:text-zinc-100 font-sans transition-colors duration-300">
      {/* Navbar Skeleton */}
      <header className="sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-800/60 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Skeleton className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800/80 rounded" />
          <div className="hidden md:flex items-center space-x-6">
            <Skeleton className="h-4 w-16 bg-zinc-200 dark:bg-zinc-800/80 rounded" />
            <Skeleton className="h-4 w-20 bg-zinc-200 dark:bg-zinc-800/80 rounded" />
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-8 w-32 rounded-full bg-zinc-200 dark:bg-zinc-800/80" />
            <Skeleton className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-800/80" />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-6 py-16 space-y-28">
        {/* Hero Section */}
        <section className="space-y-8 pt-6">
          <Skeleton className="h-3 w-36 bg-zinc-200 dark:bg-zinc-800/80 rounded" />

          <div className="space-y-4">
            <Skeleton className="h-12 md:h-16 w-full max-w-3xl bg-zinc-200 dark:bg-zinc-800/80 rounded-lg" />
            <Skeleton className="h-12 md:h-16 w-2/3 max-w-2xl bg-zinc-200 dark:bg-zinc-800/80 rounded-lg" />
          </div>

          <div className="space-y-3 pt-2 max-w-2xl">
            <Skeleton className="h-4 w-full bg-zinc-200 dark:bg-zinc-800/60 rounded" />
            <Skeleton className="h-4 w-5/6 bg-zinc-200 dark:bg-zinc-800/60 rounded" />
          </div>

          {/* Metrics Pill Grid */}
          <div className="grid grid-cols-3 gap-4 pt-4 max-w-xl">
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-950 space-y-2">
              <Skeleton className="h-3 w-16 bg-zinc-200 dark:bg-zinc-800/60 rounded" />
              <Skeleton className="h-6 w-24 bg-zinc-200 dark:bg-zinc-800/80 rounded" />
            </div>
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-950 space-y-2">
              <Skeleton className="h-3 w-16 bg-zinc-200 dark:bg-zinc-800/60 rounded" />
              <Skeleton className="h-6 w-24 bg-zinc-200 dark:bg-zinc-800/80 rounded" />
            </div>
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-950 space-y-2">
              <Skeleton className="h-3 w-16 bg-zinc-200 dark:bg-zinc-800/60 rounded" />
              <Skeleton className="h-6 w-24 bg-zinc-200 dark:bg-zinc-800/80 rounded" />
            </div>
          </div>

          {/* Technology stack row */}
          <div className="pt-6 border-t border-zinc-200 dark:border-zinc-900 space-y-3">
            <Skeleton className="h-3 w-28 bg-zinc-200 dark:bg-zinc-800/80 rounded" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="h-7 w-20 rounded-md bg-zinc-100 dark:bg-zinc-900" />
              ))}
            </div>
          </div>
        </section>

        {/* Section 01: Starting Point / Content Cards */}
        <section className="space-y-8 pt-10 border-t border-zinc-200 dark:border-zinc-900">
          <div className="space-y-2">
            <Skeleton className="h-3 w-24 bg-zinc-200 dark:bg-zinc-800/80 rounded" />
            <Skeleton className="h-8 w-96 bg-zinc-200 dark:bg-zinc-800/80 rounded-md" />
            <Skeleton className="h-4 w-full max-w-xl bg-zinc-200 dark:bg-zinc-800/60 rounded" />
          </div>

          {/* Dual Column Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-950 p-6 space-y-6">
              <Skeleton className="h-8 w-8 rounded-lg bg-zinc-200 dark:bg-zinc-900" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-48 bg-zinc-200 dark:bg-zinc-800/80 rounded" />
                <Skeleton className="h-4 w-full bg-zinc-200 dark:bg-zinc-800/60 rounded" />
              </div>
              <div className="space-y-2 pt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full rounded-lg bg-zinc-200/60 dark:bg-zinc-900/60" />
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-950 p-6 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <Skeleton className="h-8 w-8 rounded-lg bg-zinc-200 dark:bg-zinc-900" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-56 bg-zinc-200 dark:bg-zinc-800/80 rounded" />
                  <Skeleton className="h-4 w-full bg-zinc-200 dark:bg-zinc-800/60 rounded" />
                </div>
              </div>
              <Skeleton className="h-48 w-full rounded-xl bg-zinc-200 dark:bg-zinc-900" />
            </div>
          </div>
        </section>

        {/* Section 02: Product Growth Grid */}
        <section className="space-y-8 pt-10 border-t border-zinc-200 dark:border-zinc-900">
          <div className="space-y-2">
            <Skeleton className="h-3 w-28 bg-zinc-200 dark:bg-zinc-800/80 rounded" />
            <Skeleton className="h-8 w-80 bg-zinc-200 dark:bg-zinc-800/80 rounded-md" />
            <Skeleton className="h-4 w-full max-w-xl bg-zinc-200 dark:bg-zinc-800/60 rounded" />
          </div>

          {/* Grid of Mini Feature Blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-950 p-6 space-y-4"
              >
                <Skeleton className="h-8 w-8 rounded-lg bg-zinc-200 dark:bg-zinc-900" />
                <Skeleton className="h-6 w-32 bg-zinc-200 dark:bg-zinc-800/80 rounded" />
                <Skeleton className="h-4 w-full bg-zinc-200 dark:bg-zinc-800/60 rounded" />
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Navigation / Return Button */}
        <section className="pt-16 flex justify-center border-t border-zinc-200 dark:border-zinc-900">
          <Skeleton className="h-10 w-44 rounded-xl bg-zinc-200 dark:bg-zinc-800/80" />
        </section>
      </main>

      {/* Footer Skeleton */}
      <footer className="border-t border-zinc-200 dark:border-zinc-900 mt-28 py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <Skeleton className="h-4 w-44 bg-zinc-200 dark:bg-zinc-800/60 rounded" />
          <div className="flex space-x-4">
            <Skeleton className="h-5 w-5 rounded-full bg-zinc-200 dark:bg-zinc-800/80" />
            <Skeleton className="h-5 w-5 rounded-full bg-zinc-200 dark:bg-zinc-800/80" />
          </div>
          <Skeleton className="h-4 w-36 bg-zinc-200 dark:bg-zinc-800/60 rounded" />
        </div>
      </footer>
    </div>
  );
}
