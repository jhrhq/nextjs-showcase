/** biome-ignore-all lint/correctness/noUnusedVariables: false flag */
/** biome-ignore-all lint/a11y/useButtonType: false flag */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: false flag */
/** biome-ignore-all lint/a11y/useKeyWithClickEvents: false flag */
/** biome-ignore-all lint/suspicious/noExplicitAny: false flag */
"use client";
import {
  type ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type RowSelectionState,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import React from "react";
import type { Anchor } from "@/domains/linker/types/anchor-manager.types";
import { anchorColumns } from "@/domains/linker/ui/anchor-manager/anchor-manager-table/anchor-manager.column";
import {
  CellExpansionFeature,
  type ExpandedCellsState,
} from "@/ui/shared/custom-expandable-cell-table/cell-expansion-feature";
import { DataTablePagination } from "@/ui/shared/data-table-components/data-table-pagination";
import { DataTableSelectionInfo } from "@/ui/shared/data-table-components/data-table-selection";
import DataTableToolBar from "@/ui/shared/data-table-components/data-table-toolbar";
import ExpandablecellDataTable from "@/ui/shared/data-table-components/expandable-cell-data-table";

export default function AnchorManagerTable({ data }: { data: Anchor[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [expandedCells, setExpandedCells] = React.useState<ExpandedCellsState>({});

  const table = useReactTable({
    _features: [CellExpansionFeature],
    data: data,
    columns: anchorColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onExpandedCellsChange: setExpandedCells,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
      expandedCells,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-4">
      <DataTableToolBar
        table={table}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        /*  expansion={{
          canCollapseAll: table.getIsSomeRowsExpanded(),
          collapseAll: () => table.toggleAllRowsExpanded(false),
        }} */
      />

      <DataTableSelectionInfo table={table} />

      {/* Table */}
      <ExpandablecellDataTable table={table} />

      {/* Pagination */}
      <DataTablePagination table={table} />
    </div>
  );
}
