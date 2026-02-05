"use client";

import type { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

interface DataTableSelectionInfoProps<TData> {
  table: Table<TData>;
  onClearSelection?: () => void;
}

export function CustomDataTableSelectionInfo<TData>({ table, onClearSelection }: DataTableSelectionInfoProps<TData>) {
  const selectedCount = table.getSelectedRowModel().rows.length;

  if (selectedCount === 0) return null;

  return (
    <div className="flex items-center gap-2 text-sm text-slate-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
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
    </div>
  );
}
