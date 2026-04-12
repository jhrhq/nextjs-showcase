"use client";
import type { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
  const { pageIndex, pageSize } = table.getState().pagination;
  const totalFiltered = table.getFilteredRowModel().rows.length;
  const start = totalFiltered === 0 ? 0 : pageIndex * pageSize + 1;
  const end = Math.min((pageIndex + 1) * pageSize, totalFiltered);
  const selectedCount = table.getFilteredSelectedRowModel().rows.length;

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t">
      {/* Left — row count + page size */}
      <div className="flex items-center gap-4">
        {selectedCount > 0 && (
          <p className="text-xs text-muted-foreground">
            {selectedCount} of {totalFiltered} row{totalFiltered !== 1 ? "s" : ""} selected
          </p>
        )}
        <div className="flex items-center gap-2">
          <p className="text-xs text-muted-foreground whitespace-nowrap">Rows per page</p>
          <Select value={`${pageSize}`} onValueChange={(v) => table.setPageSize(Number(v))}>
            <SelectTrigger className="h-8 w-17 text-xs">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[4, 6, 10, 20, 50].map((s) => (
                <SelectItem key={s} value={`${s}`}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Right — page info + nav */}
      <div className="flex items-center gap-4">
        <p className="text-xs text-muted-foreground whitespace-nowrap">
          {totalFiltered > 0 ? `${start}–${end} of ${totalFiltered}` : "No results"}
        </p>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="size-4" />
          </Button>
          {/* Page number pills */}
          {Array.from({ length: table.getPageCount() }, (_, i) => (
            <Button
              key={i}
              variant={pageIndex === i ? "default" : "outline"}
              size="icon"
              className="size-8 text-xs"
              onClick={() => table.setPageIndex(i)}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
