/** biome-ignore-all lint/a11y/useKeyWithClickEvents: false flag */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: false flag */
"use client";

import { flexRender, type Table as ReactTable } from "@tanstack/react-table";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import * as React from "react";
import { ColumnFilter } from "@/app/expandable-table/table-component";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface DataTableProps<TData> {
  table: ReactTable<TData>;
  emptyMessage?: string;
}

export default function ExpandablecellDataTable<TData>({
  table,
  emptyMessage = "No results found.",
}: DataTableProps<TData>) {
  return (
    <div className="border overflow-hidden rounded-md">
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <React.Fragment key={headerGroup.id}>
                <TableRow className="border-b">
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} style={{ width: header.getSize() }}>
                      {header.isPlaceholder ? null : (
                        <div className="flex items-center gap-2">
                          <div
                            className={
                              header.column.getCanSort()
                                ? "cursor-pointer select-none flex items-center gap-1 hover:text-slate-900"
                                : ""
                            }
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {header.column.getCanSort() && (
                              <span className="ml-1">
                                {header.column.getIsSorted() === "asc" ? (
                                  <ChevronUp />
                                ) : header.column.getIsSorted() === "desc" ? (
                                  <ChevronDown />
                                ) : (
                                  <ChevronsUpDown />
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </TableHead>
                  ))}
                </TableRow>

                {/* Filter row */}
                <TableRow>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="px-4 py-2">
                      {header.column.getCanFilter() ? <ColumnFilter column={header.column} table={table} /> : null}
                    </TableHead>
                  ))}
                </TableRow>
              </React.Fragment>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => {
                const expandedContent = table.getExpandedContent(row.id);
                return (
                  <React.Fragment key={row.id}>
                    {/* Main row */}
                    <TableRow>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>

                    {/* Expanded row - full width */}
                    {expandedContent && (
                      <TableRow>
                        <TableCell colSpan={row.getVisibleCells().length} className="px-4 py-3">
                          <div className="p-3 border text-sm">
                            <div className="text-xs mb-2 font-medium uppercase">
                              Expanded value: {expandedContent.columnId}
                            </div>
                            {expandedContent.content}
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={table.getAllColumns().length} className="px-4 py-8 text-center text-sm">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
