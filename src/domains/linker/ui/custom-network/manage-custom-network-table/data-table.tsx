"use client";

import {
  type Column,
  type ColumnFiltersState,
  type ExpandedState,
  type FilterFn,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { CustomNetworkCollectionValues } from "@/domains/linker/validations/custom-network.validation";
import { getColumns, type UrlUsageMap } from "./columns";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { ExpandedRowContent } from "./expanded-row-content";

const globalFilterWithNested: FilterFn<CustomNetworkCollectionValues> = (row, _columnId, filterValue) => {
  const search = String(filterValue).toLowerCase();

  // 1. Check parent fields
  const inParent = [row.original.url, row.original.state, row.original.targetLinks].some((val) =>
    val?.toLowerCase().includes(search)
  );

  if (inParent) return true;

  // 2. Check nested children fields
  const inChildren = row.original.nestedData?.some((child) =>
    [child.title, child.url, child.anchor, child.status].some((val) => val?.toLowerCase().includes(search))
  );

  return !!inChildren;
};

// ── Sortable header cell ──
interface SortableHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  children: React.ReactNode;
}
function SortableHeader<TData, TValue>({ column, children }: SortableHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) return <>{children}</>;
  return (
    <Button
      variant="ghost"
      onClick={column.getToggleSortingHandler()}
      className="flex items-center gap-1 group select-none"
    >
      {children}
      <span className="text-muted-foreground/50 group-hover:text-muted-foreground transition-colors">
        {column.getIsSorted() === "asc" ? (
          <ChevronUp className="size-3 text-primary" />
        ) : column.getIsSorted() === "desc" ? (
          <ChevronDown className="size-3 text-primary" />
        ) : (
          <ChevronsUpDown className="size-3" />
        )}
      </span>
    </Button>
  );
}

export function RegistryDataTable({ data }: { data: CustomNetworkCollectionValues[] }) {
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const isFiltered = globalFilter.length > 0 || columnFilters.length > 0;

  const urlUsageMap = useMemo<UrlUsageMap>(() => {
    const counts: UrlUsageMap = {};
    data.forEach((p) => {
      p.nestedData?.forEach((c) => {
        if (c.url) counts[c.url] = (counts[c.url] || 0) + 1;
      });
    });
    return counts;
  }, [data]);

  const handleReset = () => {
    setGlobalFilter("");
    setColumnFilters([]);
  };

  // Memoize columns to prevent table jittering on re-renders
  const columns = useMemo(
    () =>
      getColumns({
        urlUsageMap,
      }),
    [urlUsageMap]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      sorting,
      globalFilter,
      columnFilters,
      columnVisibility: {
        nestedStatus: false,
      },
      // Use true for all rows during filter, otherwise use manual state
      expanded: isFiltered ? true : expanded,
    },
    getRowId: (row) => row.id,
    getRowCanExpand: (row) => (row.original.nestedData?.length ?? 0) > 0,
    globalFilterFn: globalFilterWithNested,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    paginateExpandedRows: false,
    initialState: {},
  });
  return (
    <div className="space-y-4">
      <DataTableToolbar
        table={table}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
        onReset={handleReset}
      />

      {/* THE TABLE */}
      <div className=" border bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-[10px] font-bold uppercase text-slate-400">
                    <SortableHeader column={header.column}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </SortableHeader>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-16 text-muted-foreground text-sm">
                  No results match your filters.
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => {
                return (
                  <React.Fragment key={row.id}>
                    <TableRow
                      className="group cursor-pointer border-b transition-colors hover:bg-slate-50/50"
                      onClick={row.getCanExpand() ? row.getToggleExpandedHandler() : undefined}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="p-4">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>

                    {row.getIsExpanded() && <ExpandedRowContent row={row} table={table} />}
                  </React.Fragment>
                );
              })
            )}
          </TableBody>
        </Table>
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
