import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function InternalLinkManagementSkeleton() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      {/* Header Section */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-[300px]" />
        <Skeleton className="h-4 w-[600px]" />
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center space-x-2">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-[120px]" />
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-8 w-[40px]" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-10 w-[300px]" />
          <Skeleton className="h-10 w-[100px]" />
          <Skeleton className="h-10 w-[120px]" />
        </div>
        <Skeleton className="h-10 w-[100px]" />
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <div className="space-y-2 p-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between space-x-4 p-4">
              <div className="flex items-center space-x-4 flex-1">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-[250px]" />
              </div>
              <div className="flex-1">
                <Skeleton className="h-4 w-[60px]" />
              </div>
              <div className="flex-1">
                <Skeleton className="h-4 w-[150px]" />
              </div>
              <div className="flex-1">
                <Skeleton className="h-4 w-[100px]" />
              </div>
              <div className="flex-1">
                <Skeleton className="h-8 w-[60px]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-[150px]" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-10 w-[100px]" />
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-10 w-10" />
          ))}
        </div>
      </div>
    </div>
  );
}
