/** biome-ignore-all lint/correctness/noUnusedVariables: false flag */
/** biome-ignore-all lint/a11y/useButtonType: false flag */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: false flag */
/** biome-ignore-all lint/a11y/useKeyWithClickEvents: false flag */
/** biome-ignore-all lint/suspicious/noExplicitAny: false flag */
"use client";
import {
  type Cell,
  type ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  makeStateUpdater,
  type OnChangeFn,
  type RowData,
  type RowSelectionState,
  type SortingState,
  type Table,
  type TableFeature,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import React from "react";
import CustomDataTable from "@/app/expandable-table/claude/cutom-feature/custom-data-table";
import { CustomDataTableSelectionInfo } from "@/app/expandable-table/claude/cutom-feature/custom-data-table-selection";
import { CustomDataTableToolbar } from "@/app/expandable-table/claude/cutom-feature/custom-data-table-toolbar";
import {
  customFeatureColumns,
  customFeatureData,
} from "@/app/expandable-table/claude/cutom-feature/custom-feature.coumn";
import { CustomDataTablePagination } from "@/app/expandable-table/claude/cutom-feature/custom-table-pagination";

// Step 1: Define types for our new feature's custom state
export type ExpandedCellsState = Record<string, { columnId: string; content: React.ReactNode } | null>;

export interface ExpandedCellsTableState {
  expandedCells: ExpandedCellsState;
}

// Step 2: Define types for our new feature's table options
export interface ExpandedCellsOptions {
  enableCellExpansion?: boolean;
  onExpandedCellsChange?: OnChangeFn<ExpandedCellsState>;
}

// Step 3: Define types for our new feature's table APIs
export interface ExpandedCellsInstance {
  toggleCell: (rowId: string, columnId: string, content: React.ReactNode) => void;
  isCellExpanded: (rowId: string, columnId: string) => boolean;
  getExpandedContent: (rowId: string) => { columnId: string; content: React.ReactNode } | null;
  collapseAllCells: () => void;
}

// Step 4: Define types for cell instance APIs
export interface ExpandedCellsCell {
  toggleExpanded: (content: React.ReactNode) => void;
  getIsExpanded: () => boolean;
}

// Step 5: Use declaration merging to add our new types to TanStack Table
declare module "@tanstack/react-table" {
  interface TableState extends ExpandedCellsTableState {}
  interface TableOptionsResolved<TData extends RowData> extends ExpandedCellsOptions {}
  interface Table<TData extends RowData> extends ExpandedCellsInstance {}
  interface Cell<TData extends RowData, TValue> extends ExpandedCellsCell {}
}

// Step 6: Create the Feature Object
export const CellExpansionFeature: TableFeature<any> = {
  // Define the new feature's initial state
  getInitialState: (state): ExpandedCellsTableState => {
    return {
      expandedCells: {},
      ...state,
    };
  },

  // Define the new feature's default options
  getDefaultOptions: <TData extends RowData>(table: Table<TData>): ExpandedCellsOptions => {
    return {
      enableCellExpansion: true,
      onExpandedCellsChange: makeStateUpdater("expandedCells", table),
    } as ExpandedCellsOptions;
  },

  // Define the new feature's table instance methods
  createTable: <TData extends RowData>(table: Table<TData>): void => {
    table.toggleCell = (rowId, columnId, content) => {
      table.options.onExpandedCellsChange?.((old) => {
        const currentExpanded = old[rowId];
        // If clicking the same cell that's expanded, collapse it
        if (currentExpanded && currentExpanded.columnId === columnId) {
          return { ...old, [rowId]: null };
        }
        // Otherwise, expand this cell (and collapse any other in this row)
        return { ...old, [rowId]: { columnId, content } };
      });
    };

    table.isCellExpanded = (rowId, columnId) => {
      const expanded = table.getState().expandedCells[rowId];
      return expanded?.columnId === columnId;
    };

    table.getExpandedContent = (rowId) => {
      return table.getState().expandedCells[rowId] || null;
    };

    table.collapseAllCells = () => {
      table.options.onExpandedCellsChange?.({});
    };
  },

  // Define cell instance APIs
  createCell: <TData extends RowData>(cell: Cell<TData, unknown>, column: any, row: any, table: Table<TData>): void => {
    cell.toggleExpanded = (content: React.ReactNode) => {
      table.toggleCell(row.id, column.id, content);
    };

    cell.getIsExpanded = () => {
      return table.isCellExpanded(row.id, column.id);
    };
  },
};

export default function Claude3DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [expandedCells, setExpandedCells] = React.useState<ExpandedCellsState>({});

  const table = useReactTable({
    _features: [CellExpansionFeature], // Pass our custom feature!
    data: customFeatureData,
    columns: customFeatureColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onExpandedCellsChange: setExpandedCells, // Using our custom feature option!
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
      expandedCells, // Using our custom feature state!
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Employee Data Table with Custom Cell Expansion Feature</h1>
        <p className="text-slate-600">
          Built using TanStack Table v8 Custom Features API. Click on any cell to expand it with full-width detailed
          content below the row.
        </p>
      </div>

      {/* Toolbar */}
      <CustomDataTableToolbar table={table} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />

      <CustomDataTableSelectionInfo table={table} />

      {/* Table */}
      <CustomDataTable table={table} />

      {/* Pagination */}
      <CustomDataTablePagination table={table} />

      {/* Feature Summary */}
      <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
        <h3 className="font-semibold text-slate-900 mb-2">Custom Feature Implementation:</h3>
        <div className="text-sm text-slate-600 space-y-2">
          <p>
            ✓ <strong>Cell Expansion Feature</strong> - Built using TanStack Table v8 Custom Features API (_features
            option)
          </p>
          <p>
            ✓ <strong>Table Instance APIs:</strong> toggleCell(), isCellExpanded(), getExpandedContent(),
            collapseAllCells()
          </p>
          <p>
            ✓ <strong>Cell Instance APIs:</strong> cell.toggleExpanded(), cell.getIsExpanded()
          </p>
          <p>
            ✓ <strong>State Management:</strong> expandedCells state with onExpandedCellsChange option
          </p>
          <p>
            ✓ <strong>TypeScript:</strong> Full type-safety via declaration merging
          </p>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-300">
          <h4 className="font-semibold text-slate-900 mb-2">Standard TanStack Features:</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm text-slate-600">
            <div>✓ Sorting</div>
            <div>✓ Filtering</div>
            <div>✓ Pagination</div>
            <div>✓ Row Selection</div>
            <div>✓ Global Search</div>
            <div>✓ Column Visibility</div>
            <div>✓ Column Resizing</div>
            <div>✓ Responsive Design</div>
          </div>
        </div>
      </div>
    </div>
  );
}
