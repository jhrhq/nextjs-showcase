"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

/* -----------------------------------------------------
 * Types
 * ---------------------------------------------------*/

export type ExpandableCellRenderer<TData> = (props: {
  value: unknown;
  row: TData;
  columnId: string;
  expanded: boolean;
}) => React.ReactNode;

// ✅ FIX: properly closed interface
export interface ExpandableColumnMeta<TData> {
  expandable?: boolean;
  expandedRenderer?: ExpandableCellRenderer<TData>;
}

export type DataTableColumn<TData> = ColumnDef<TData, unknown> & {
  meta?: ExpandableColumnMeta<TData>;
};

/* -----------------------------------------------------
 * Internal helpers
 * ---------------------------------------------------*/

type CellExpansionState = Record<string, boolean>;

const cellKey = (rowId: string, columnId: string) => `${rowId}:${columnId}`;

const defaultExpandedRenderer: ExpandableCellRenderer<unknown> = ({ value }) => (
  <div className="text-sm text-muted-foreground">Expanded value: {String(value)}</div>
);

/* -----------------------------------------------------
 * DataTable
 * ---------------------------------------------------*/

export function DataTable<TData extends object>({
  data,
  columns,
}: {
  data: TData[];
  columns: DataTableColumn<TData>[];
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  // per-row accordion expansion state
  const [expandedCells, setExpandedCells] = React.useState<CellExpansionState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    enableRowSelection: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between gap-2">
        <Input
          placeholder="Filter all columns..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Columns</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table.getAllLeafColumns().map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <React.Fragment key={row.id}>
                <TableRow>
                  {row.getVisibleCells().map((cell) => {
                    const meta = cell.column.columnDef.meta as ExpandableColumnMeta<TData> | undefined;
                    const expandable = meta?.expandable === true;
                    const key = cellKey(row.id, cell.column.id);
                    const expanded = expandedCells[key] ?? false;

                    return (
                      <TableCell key={cell.id} className="align-top">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex-1">{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>

                          {expandable && (
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() =>
                                setExpandedCells((prev) => {
                                  const next: CellExpansionState = {};

                                  // keep expanded cells from OTHER rows
                                  Object.entries(prev).forEach(([k, v]) => {
                                    const [rowId] = k.split(":");
                                    if (v && rowId !== row.id) next[k] = true;
                                  });

                                  // toggle current cell exclusively (accordion)
                                  if (!expanded) next[key] = true;

                                  return next;
                                })
                              }
                            >
                              {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    );
                  })}
                </TableRow>

                {(() => {
                  const expandedEntry = Object.entries(expandedCells).find(([k, v]) => v && k.startsWith(`${row.id}:`));

                  if (!expandedEntry) return null;

                  const [, columnId] = expandedEntry[0].split(":");
                  const cell = row.getVisibleCells().find((c) => c.column.id === columnId);
                  if (!cell) return null;

                  const meta = cell.column.columnDef.meta as ExpandableColumnMeta<TData> | undefined;
                  if (!meta?.expandable) return null;

                  const renderer = meta.expandedRenderer ?? (defaultExpandedRenderer as ExpandableCellRenderer<TData>);

                  return (
                    <TableRow className="transition-all duration-300 ease-in-out">
                      <TableCell colSpan={row.getVisibleCells().length} className="bg-muted overflow-hidden">
                        <div
                          className="p-3 text-sm transition-[max-height,opacity] duration-300 ease-in-out"
                          style={{ maxHeight: 500, opacity: 1 }}
                        >
                          {renderer({
                            value: cell.getValue(),
                            row: row.original,
                            columnId: cell.column.id,
                            expanded: true,
                          })}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })()}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

/* -----------------------------------------------------
 * Full UI Demo
 * ---------------------------------------------------*/

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "member" | "viewer";
  status: "active" | "invited" | "disabled";
}

const USERS: User[] = Array.from({ length: 25 }).map((_, i) => ({
  id: String(i + 1),
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? "admin" : i % 3 === 1 ? "member" : "viewer",
  status: i % 4 === 0 ? "disabled" : i % 2 === 0 ? "invited" : "active",
}));

const userColumns: DataTableColumn<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ getValue }) => <span className="font-medium">{String(getValue())}</span>,
    meta: { expandable: true },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ getValue }) => <span className="text-sm">{String(getValue())}</span>,
    meta: {
      expandable: true,
      expandedRenderer: ({ row }) => (
        <pre className="text-xs rounded bg-background p-2 overflow-x-auto">{JSON.stringify(row, null, 2)}</pre>
      ),
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ getValue }) => <Badge variant="secondary">{String(getValue())}</Badge>,
    meta: { expandable: true },
  },
];

export default function ChatGptCustomFeaturesDataTableDemoPage() {
  return (
    <div className="container mx-auto py-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable data={USERS} columns={userColumns} />
        </CardContent>
      </Card>
    </div>
  );
}
