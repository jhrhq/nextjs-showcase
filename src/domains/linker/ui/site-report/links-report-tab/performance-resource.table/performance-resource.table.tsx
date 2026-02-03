import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { PerformanceResource } from "@/domains/linker/types/site-report.types";
import { performanceResourceColumns } from "@/domains/linker/ui/site-report/links-report-tab/performance-resource.table/performance-resource.column";
import { DataTable } from "@/ui/shared/data-table";

type PerformanceResourceTableProps = {
  data: PerformanceResource[];
};

export function PerformanceResourceTable({ data }: PerformanceResourceTableProps) {
  const table = useReactTable({
    data,
    columns: performanceResourceColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resource Breakdown</CardTitle>
        <CardDescription>Analysis of page resources</CardDescription>
      </CardHeader>

      <CardContent>
        <DataTable table={table} emptyMessage="No resource data available" />
      </CardContent>
    </Card>
  );
}
