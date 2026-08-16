import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectsLoading() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-[#0a0a0a] dark:text-zinc-100 font-sans transition-colors duration-300">
      {/* Navbar Skeleton */}
      <header className="sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-800/60 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
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
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-10">
        {/* Header Breadcrumb & Title */}
        <div className="space-y-4 pt-4">
          <Skeleton className="h-3 w-40 bg-zinc-200 dark:bg-zinc-800/80 rounded" />
          <Skeleton className="h-12 w-64 bg-zinc-200 dark:bg-zinc-800/80 rounded-lg" />
          <Skeleton className="h-4 w-full max-w-lg bg-zinc-200 dark:bg-zinc-800/60 rounded" />
        </div>

        {/* Search and Filters Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 pb-4">
          <Skeleton className="h-10 w-full sm:w-80 rounded-lg bg-zinc-200 dark:bg-zinc-800/80" />
          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
            <Skeleton className="h-4 w-28 bg-zinc-200 dark:bg-zinc-800/60 rounded" />
            <Skeleton className="h-9 w-24 rounded-lg bg-zinc-200 dark:bg-zinc-800/80" />
          </div>
        </div>

        {/* Projects Grid Layout (2 Columns matching the layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-950 p-6 space-y-5 flex flex-col justify-between"
            >
              {/* Project Preview Box / Image Placeholder */}
              <Skeleton className="h-56 w-full rounded-xl bg-zinc-200 dark:bg-zinc-900" />

              {/* Card Meta & Title */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-3 w-24 bg-zinc-200 dark:bg-zinc-800/60 rounded" />
                  <Skeleton className="h-6 w-6 rounded-full bg-zinc-200 dark:bg-zinc-800/80" />
                </div>
                <Skeleton className="h-7 w-48 bg-zinc-200 dark:bg-zinc-800/80 rounded" />
                <div className="space-y-2 pt-1">
                  <Skeleton className="h-4 w-full bg-zinc-200 dark:bg-zinc-800/60 rounded" />
                  <Skeleton className="h-4 w-3/4 bg-zinc-200 dark:bg-zinc-800/60 rounded" />
                </div>
              </div>

              {/* Tags / Tech Stack Footer */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-200 dark:border-zinc-900">
                <Skeleton className="h-5 w-14 rounded bg-zinc-200 dark:bg-zinc-900" />
                <Skeleton className="h-5 w-20 rounded bg-zinc-200 dark:bg-zinc-900" />
                <Skeleton className="h-5 w-16 rounded bg-zinc-200 dark:bg-zinc-900" />
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer Skeleton */}
      <footer className="border-t border-zinc-200 dark:border-zinc-900 mt-28 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
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
