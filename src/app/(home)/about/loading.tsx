import { Skeleton } from "@/components/ui/skeleton";

export default function AboutLoading() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 font-sans selection:bg-zinc-800">
      {/* Navbar Skeleton */}
      <header className="sticky top-0 z-50 border-b border-zinc-800/60 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Skeleton className="h-6 w-16 bg-zinc-800/80 rounded" />
          <div className="hidden md:flex items-center space-x-6">
            <Skeleton className="h-4 w-16 bg-zinc-800/80 rounded" />
            <Skeleton className="h-4 w-16 bg-zinc-800/80 rounded" />
            <Skeleton className="h-4 w-20 bg-zinc-800/80 rounded" />
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-8 w-28 rounded-full bg-zinc-800/80" />
            <Skeleton className="h-8 w-8 rounded-full bg-zinc-800/80" />
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-4xl mx-auto px-6 py-16 space-y-32">
        {/* Section 01: Hero / About Me */}
        <section className="space-y-8 pt-6">
          <div className="flex items-center space-x-3">
            <Skeleton className="h-3 w-20 bg-zinc-800/80 rounded" />
          </div>

          <div className="space-y-4">
            <Skeleton className="h-12 w-full max-w-2xl bg-zinc-800/80 rounded-lg" />
            <Skeleton className="h-12 w-3/4 bg-zinc-800/80 rounded-lg" />
          </div>

          <div className="space-y-3 pt-2">
            <Skeleton className="h-4 w-full bg-zinc-800/60 rounded" />
            <Skeleton className="h-4 w-5/6 bg-zinc-800/60 rounded" />
            <Skeleton className="h-4 w-4/6 bg-zinc-800/60 rounded" />
          </div>

          <div className="flex space-x-4 pt-4">
            <Skeleton className="h-10 w-28 rounded-lg bg-zinc-800/80" />
            <Skeleton className="h-10 w-28 rounded-lg bg-zinc-800/80" />
          </div>
        </section>

        {/* Section 02: Profile / Bio expansion */}
        <section className="space-y-6 border-t border-zinc-900 pt-20">
          <Skeleton className="h-3 w-16 bg-zinc-800/80 rounded" />
          <Skeleton className="h-8 w-80 bg-zinc-800/80 rounded-md" />

          <div className="space-y-4 pt-4">
            <Skeleton className="h-4 w-full bg-zinc-800/60 rounded" />
            <Skeleton className="h-4 w-full bg-zinc-800/60 rounded" />
            <Skeleton className="h-4 w-11/12 bg-zinc-800/60 rounded" />
            <Skeleton className="h-4 w-4/5 bg-zinc-800/60 rounded" />
          </div>
        </section>

        {/* Section 03: Experience Card Skeleton */}
        <section className="space-y-6 border-t border-zinc-900 pt-20">
          <Skeleton className="h-3 w-20 bg-zinc-800/80 rounded" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32 bg-zinc-800/80 rounded" />
            <Skeleton className="h-8 w-64 bg-zinc-800/80 rounded-md" />
            <Skeleton className="h-4 w-40 bg-zinc-800/80 rounded" />
          </div>

          {/* Card Wrapper */}
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950 p-8 space-y-6">
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-48 bg-zinc-800/80 rounded" />
              <Skeleton className="h-5 w-32 rounded-full bg-zinc-800/80" />
            </div>

            <div className="space-y-3">
              <Skeleton className="h-4 w-full bg-zinc-800/60 rounded" />
              <Skeleton className="h-4 w-full bg-zinc-800/60 rounded" />
              <Skeleton className="h-4 w-3/4 bg-zinc-800/60 rounded" />
            </div>

            {/* Grid Checkmarks / List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-zinc-900">
              <Skeleton className="h-4 w-48 bg-zinc-800/50 rounded" />
              <Skeleton className="h-4 w-48 bg-zinc-800/50 rounded" />
              <Skeleton className="h-4 w-48 bg-zinc-800/50 rounded" />
              <Skeleton className="h-4 w-48 bg-zinc-800/50 rounded" />
            </div>

            <div className="flex space-x-4 pt-4">
              <Skeleton className="h-9 w-36 rounded-lg bg-zinc-800/80" />
              <Skeleton className="h-9 w-44 rounded-lg bg-zinc-800/80" />
            </div>
          </div>
        </section>

        {/* Section 04: Technology Grid Skeleton */}
        <section className="space-y-6 border-t border-zinc-900 pt-20">
          <Skeleton className="h-3 w-20 bg-zinc-800/80 rounded" />
          <Skeleton className="h-8 w-3/4 max-w-lg bg-zinc-800/80 rounded-md" />

          <div className="flex flex-wrap gap-2 pt-4">
            {Array.from({ length: 14 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-20 rounded-md bg-zinc-800/70" />
            ))}
          </div>
        </section>
      </main>

      {/* Footer Skeleton */}
      <footer className="border-t border-zinc-900 mt-32 py-8">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <Skeleton className="h-4 w-48 bg-zinc-800/60 rounded" />
          <div className="flex space-x-4">
            <Skeleton className="h-5 w-5 rounded-full bg-zinc-800/80" />
            <Skeleton className="h-5 w-5 rounded-full bg-zinc-800/80" />
            <Skeleton className="h-5 w-5 rounded-full bg-zinc-800/80" />
          </div>
          <Skeleton className="h-4 w-32 bg-zinc-800/60 rounded" />
        </div>
      </footer>
    </div>
  );
}
