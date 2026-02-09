"use client";

import type { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface DataTableSelectionInfoProps<TData> {
  table: Table<TData>;
  onClearSelection?: () => void;
}

export function DataTableSelectionInfo<TData>({ table, onClearSelection }: DataTableSelectionInfoProps<TData>) {
  const selectedCount = table.getSelectedRowModel().rows.length;

  if (selectedCount === 0) return null;

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardContent className="flex items-center gap-2 text-sm text-slate-600 p-3">
        <span className="font-medium">{selectedCount} row(s) selected</span>

        <Button
          variant="outline"
          size="sm"
          className="ml-auto"
          onClick={() => {
            table.resetRowSelection();
            onClearSelection?.();
          }}
        >
          Clear Selection
        </Button>
      </CardContent>
    </Card>
  );
}
