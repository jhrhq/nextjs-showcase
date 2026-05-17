import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function AnchorManagerSkeletonPage() {
  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Top Breadcrumb/Header */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-64" />

        <div className="space-y-2">
          <Skeleton className="h-10 w-72" />
          <Skeleton className="h-4 w-130" />
          <Skeleton className="h-4 w-115" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="space-y-3 pb-2">
              <Skeleton className="h-4 w-28" />
            </CardHeader>

            <CardContent className="space-y-3">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quality Metrics */}
      <Card>
        <CardHeader className="space-y-2">
          <Skeleton className="h-5 w-56" />
          <Skeleton className="h-4 w-72" />
        </CardHeader>

        <CardContent>
          <div className="grid gap-8 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-10" />
                </div>

                <Skeleton className="h-2 w-full" />
                <Skeleton className="h-3 w-32" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chart + Breakdown */}
      <Card>
        <CardHeader className="space-y-2">
          <Skeleton className="h-5 w-64" />
          <Skeleton className="h-4 w-52" />
        </CardHeader>

        <CardContent>
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            {/* Chart */}
            <div className="flex min-h-105 items-center justify-center border">
              <div className="space-y-4 text-center">
                <Skeleton className="mx-auto size-40 rounded-full" />
                <Skeleton className="mx-auto h-8 w-30" />
                <Skeleton className="mx-auto h-4 w-32" />
              </div>
            </div>

            {/* Breakdown */}
            <div className="space-y-4">
              <Skeleton className="h-5 w-28" />

              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="border p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-3 w-3 rounded-full" />
                      <Skeleton className="h-4 w-24" />
                    </div>

                    <Skeleton className="h-4 w-12" />
                  </div>

                  <Skeleton className="h-2 w-full" />
                </div>
              ))}

              <Separator />

              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-6 w-16" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table Toolbar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Skeleton className="h-10 w-full md:w-[320px]" />
            <Skeleton className="h-10 w-30" />
          </div>

          {/* Table */}
          <div className="mt-6 overflow-hidden border">
            {/* Header */}
            <div className="grid grid-cols-5 border-b bg-muted/30 px-4 py-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-20" />
              ))}
            </div>

            {/* Filter Row */}
            <div className="grid grid-cols-5 gap-4 border-b px-4 py-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-9 w-full" />
              ))}
            </div>

            {/* Rows */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="grid grid-cols-5 items-center border-b px-4 py-5 last:border-0">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-8 w-10 rounded-full" />
                <Skeleton className="h-8 w-10 rounded-full" />
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-7 w-24 rounded-full" />
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Skeleton className="h-4 w-48" />

            <div className="flex items-center gap-4">
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-28" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
