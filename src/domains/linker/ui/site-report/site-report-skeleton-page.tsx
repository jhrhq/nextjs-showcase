import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function SiteReportSkeletonPage() {
  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-64" />

        <div className="space-y-2">
          <Skeleton className="h-10 w-72" />
          <Skeleton className="h-4 w-105" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>

      {/* Top Metrics */}
      <div className="grid gap-4 xs:grid-cols-2 sm:grid-cols-4 ">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>

            <CardContent className="space-y-3">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-3 w-28" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="space-y-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-56" />
            </CardHeader>

            <CardContent>
              <Skeleton className="h-70 w-full rounded-xl" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Secondary Metrics */}
      <div className="grid gap-4 xs:grid-cols-2 sm:grid-cols-4 ">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>

            <CardContent className="space-y-3">
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-3 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Link Quality */}
      <Card>
        <CardHeader className="space-y-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>

        <CardContent className="space-y-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-5 w-14" />
              </div>

              <Skeleton className="h-2 w-full" />

              <Skeleton className="h-3 w-28" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Performance */}
      <Card>
        <CardHeader className="space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-52" />
        </CardHeader>

        <CardContent className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-10" />
              </div>

              <Skeleton className="h-3 w-full" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader className="space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-56" />
        </CardHeader>

        <CardContent>
          <div className="overflow-hidden rounded-xl border">
            {/* Table Header */}
            <div className="grid grid-cols-4 border-b bg-muted/40 px-4 py-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-24" />
              ))}
            </div>

            {/* Rows */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="grid grid-cols-4 items-center border-b px-4 py-5 last:border-0">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-5 w-10" />
                <Skeleton className="h-5 w-10" />
                <Skeleton className="h-5 w-14" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bottom Cards */}
      <div className="grid gap-4 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="space-y-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-52" />
            </CardHeader>

            <CardContent className="space-y-4">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="flex items-center justify-between rounded-lg border p-3">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-5 w-16" />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs Section */}
      <Card>
        <CardHeader>
          <div className="flex gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-28" />
            ))}
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="pt-6">
          <Skeleton className="h-90 w-full rounded-xl" />
        </CardContent>
      </Card>

      {/* Final Stats */}
      <Card>
        <CardHeader className="space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-52" />
        </CardHeader>

        <CardContent className="space-y-6">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-full" />

          <div className="grid gap-4 md:grid-cols-2">
            <Skeleton className="h-24 w-full rounded-xl" />
            <Skeleton className="h-24 w-full rounded-xl" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
