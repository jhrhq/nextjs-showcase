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

export interface ExpandableColumnMeta<TData> {
  expandable?: boolean;
  expandedRenderer?: ExpandableCellRenderer<TData>;
}

export type DataTableColumn<TData> = ColumnDef<TData, unknown> & {
  meta?: ExpandableColumnMeta<TData>;
};

/* -----------------------------------------------------
 * Per‑cell expansion state
 * ---------------------------------------------------*/

type CellExpansionState = Record<string, boolean>;

function cellKey(rowId: string, columnId: string) {
  return `${rowId}:${columnId}`;
}

const defaultExpandedRenderer: ExpandableCellRenderer<unknown> = ({ value }) => (
  <div className="text-muted-foreground">{String(value)}</div>
);

/* -----------------------------------------------------
 * DataTable Component
 * ---------------------------------------------------*/

interface DataTableProps<TData extends { id: string }> {
  data: TData[];
  columns: DataTableColumn<TData>[];
}

export function DataTable<TData extends { id: string }>({ data, columns }: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState<string>("");
  const [expandedCells, setExpandedCells] = React.useState<CellExpansionState>({});

  /**
   * Normalize columns so every expandable column
   * ALWAYS has a valid expandedRenderer.
   * This prevents runtime and build‑time failures.
   */
  const normalizedColumns = React.useMemo<DataTableColumn<TData>[]>(() => {
    return columns.map((col) => {
      const meta = col.meta;
      if (meta?.expandable && !meta.expandedRenderer) {
        return {
          ...col,
          meta: {
            ...meta,
            expandedRenderer: defaultExpandedRenderer as ExpandableCellRenderer<TData>,
          },
        };
      }
      return col;
    });
  }, [columns]);

  const table = useReactTable({
    data,
    columns: normalizedColumns,
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
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  const meta = cell.column.columnDef.meta as ExpandableColumnMeta<TData> | undefined;

                  const expandable = meta?.expandable === true;
                  const expanded = expandedCells[cellKey(row.id, cell.column.id)] ?? false;

                  return (
                    <TableCell key={cell.id} className="align-top">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex-1">{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>

                          {expandable && (
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() =>
                                setExpandedCells((s) => ({
                                  ...s,
                                  [cellKey(row.id, cell.column.id)]: !expanded,
                                }))
                              }
                            >
                              {expanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                            </Button>
                          )}
                        </div>

                        {expandable && expanded && meta?.expandedRenderer && (
                          <div className="rounded-md bg-muted p-2 text-sm">
                            {meta.expandedRenderer({
                              value: cell.getValue(),
                              row: row.original,
                              columnId: cell.column.id,
                              expanded,
                            })}
                          </div>
                        )}
                      </div>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

/* -----------------------------------------------------
 * Full UI Demo (renders end-to-end)
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
    meta: { expandable: true }, // uses default renderer
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ getValue }) => <span className="text-sm">{String(getValue())}</span>,
    meta: {
      expandable: true,
      expandedRenderer: ({ row }) => (
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">Full record</div>
          <pre className="text-xs overflow-x-auto rounded bg-background p-2">{JSON.stringify(row, null, 2)}</pre>
        </div>
      ),
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ getValue }) => <Badge variant="secondary">{String(getValue())}</Badge>,
    meta: { expandable: true },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const v = String(getValue());
      return <Badge variant={v === "active" ? "default" : v === "invited" ? "outline" : "destructive"}>{v}</Badge>;
    },
    meta: {
      expandable: true,
      expandedRenderer: ({ value }) => (
        <div className="text-xs">
          Status help text for <strong>{String(value)}</strong>
        </div>
      ),
    },
  },
];

export default function ChatGptDataTableDemoPage() {
  return (
    <div className="container mx-auto py-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Chatgpt Users</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable data={USERS} columns={userColumns} />
        </CardContent>
      </Card>
    </div>
  );
}
