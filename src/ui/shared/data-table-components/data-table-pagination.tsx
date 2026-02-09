"use client";

import type { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pageSizeOptions?: number[];
}

export function DataTablePagination<TData>({
  table,
  pageSizeOptions = [5, 10, 20, 30],
}: DataTablePaginationProps<TData>) {
  const { pageIndex, pageSize } = table.getState().pagination;

  const totalRows = table.getFilteredRowModel().rows.length;
  const pageCount = table.getPageCount();

  const from = totalRows === 0 ? 0 : pageIndex * pageSize + 1;

  const to = totalRows === 0 ? 0 : Math.min((pageIndex + 1) * pageSize, totalRows);

  return (
    <Card>
      <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4">
        {/* Results info */}
        <div className="text-sm text-slate-600">
          Showing <span className="font-medium">{from}</span> to <span className="font-medium">{to}</span> of{" "}
          <span className="font-medium">{totalRows}</span> results
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          {/* Page size */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600">Rows per page</span>

            <Select value={String(pageSize)} onValueChange={(value) => table.setPageSize(Number(value))}>
              <SelectTrigger className="h-8 w-18">
                <SelectValue />
              </SelectTrigger>

              <SelectContent side="top">
                {pageSizeOptions.map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>

            <span className="text-sm text-slate-600 whitespace-nowrap">
              Page <span className="font-medium">{pageIndex + 1}</span> of{" "}
              <span className="font-medium">{pageCount}</span>
            </span>

            <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
