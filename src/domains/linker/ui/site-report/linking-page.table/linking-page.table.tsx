"use client";

import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { TopLinkingPage } from "@/domains/linker/types/site-report.types";
import { topLinkingPagesColumns } from "@/domains/linker/ui/site-report/linking-page.table/linking-page.column";
import { DataTable } from "@/ui/shared/data-table-components/data-table";

type TechnicalSeoTableProps = {
  data: TopLinkingPage[];
};

export function TechnicalSeoTable({ data }: TechnicalSeoTableProps) {
  const table = useReactTable({
    data,
    columns: topLinkingPagesColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Linking Pages</CardTitle>
        <CardDescription>Pages with the most outbound links</CardDescription>
      </CardHeader>

      <CardContent>
        <DataTable table={table} emptyMessage="No Linking pages found" />
      </CardContent>
    </Card>
  );
}
