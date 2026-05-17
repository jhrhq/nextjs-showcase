import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function CustomNetworkSkeletonPage() {
  return (
    <div className="flex-1 p-6">
      {/* Top Actions */}
      <div className="mb-6 flex items-center justify-between">
        <Skeleton className="h-4 w-64" />

        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-28" />
        </div>
      </div>

      <Separator className="mb-8" />

      {/* Header */}
      <div className="mb-8 space-y-3">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-80" />
          <Skeleton className="h-6 w-20" />
        </div>

        <Skeleton className="h-4 w-130" />
      </div>

      {/* Cards */}
      <div className="grid gap-6 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            {/* Card Header */}
            <CardHeader className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <Skeleton className="h-7 w-48" />

                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Skeleton className="h-7 w-32 rounded-full" />
                  <Skeleton className="h-6 w-6 rounded-md" />
                </div>
              </div>
            </CardHeader>

            <Separator />

            {/* Metrics */}
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-4 gap-3">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div key={j} className="rounded-lg border p-3 space-y-2">
                    <Skeleton className="h-3 w-12" />
                    <Skeleton className="h-7 w-8" />
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-28" />

                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-4 rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
