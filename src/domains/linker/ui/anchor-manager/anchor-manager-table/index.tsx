"use client";

import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Card, CardContent } from "@/components/ui/card";
import { anchors, columns } from "@/domains/linker/ui/anchor-manager/anchor-manager-table/column";
import { DataTable } from "@/ui/shared/data-table";

export default function AnchorManagerTable() {
  const table = useReactTable({
    data: anchors,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <Card>
      <CardContent className="p-0">
        <DataTable table={table} />
      </CardContent>
    </Card>
  );
}
