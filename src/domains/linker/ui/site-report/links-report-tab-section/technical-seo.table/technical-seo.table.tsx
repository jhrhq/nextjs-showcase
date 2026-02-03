import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { TechnicalSeoMetric } from "@/domains/linker/types/site-report.types";
import { technicalSeoColumns } from "@/domains/linker/ui/site-report/links-report-tab-section/technical-seo.table/technical-seo.column";
import { DataTable } from "@/ui/shared/data-table";

type TechnicalSeoTableProps = {
  data: TechnicalSeoMetric[];
};

export function TechnicalSeoTable({ data }: TechnicalSeoTableProps) {
  const table = useReactTable({
    data,
    columns: technicalSeoColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Technical SEO Audit</CardTitle>
        <CardDescription>Core web vitals and technical requirements</CardDescription>
      </CardHeader>

      <CardContent>
        <DataTable table={table} emptyMessage="No technical SEO issues found" />
      </CardContent>
    </Card>
  );
}
