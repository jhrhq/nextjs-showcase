/** biome-ignore-all lint/a11y/useKeyWithClickEvents: false flag */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: false flag */
"use client";

import { flexRender, type Table as ReactTable } from "@tanstack/react-table";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import * as React from "react";
import { ColumnFilter } from "@/app/expandable-table/table-component";

interface DataTableProps<TData> {
  table: ReactTable<TData>;
  emptyMessage?: string;
}

export default function CustomDataTable<TData>({ table, emptyMessage = "No results found." }: DataTableProps<TData>) {
  return (
    <div className=" border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <React.Fragment key={headerGroup.id}>
                <tr className="border-b border-slate-200 bg-slate-50">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider"
                      style={{ width: header.getSize() }}
                    >
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
                    </th>
                  ))}
                </tr>
                {/* Filter row */}
                <tr className="border-b border-slate-200 bg-slate-50">
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="px-4 py-2">
                      {header.column.getCanFilter() ? <ColumnFilter column={header.column} table={table} /> : null}
                    </th>
                  ))}
                </tr>
              </React.Fragment>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => {
                const expandedContent = table.getExpandedContent(row.id);
                return (
                  <React.Fragment key={row.id}>
                    {/* Main row */}
                    <tr className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="px-4 py-3 text-sm text-slate-900"
                          style={{ width: cell.column.getSize() }}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                    {/* Expanded row - full width */}
                    {expandedContent && (
                      <tr className="border-b border-slate-200 bg-slate-50">
                        <td colSpan={row.getVisibleCells().length} className="px-4 py-3">
                          <div className="p-3 bg-white border border-slate-200 text-sm">
                            <div className="text-xs text-slate-500 mb-2 font-medium uppercase">
                              Expanded value: {expandedContent.columnId}
                            </div>
                            {expandedContent.content}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            ) : (
              <tr>
                <td colSpan={table.getAllColumns().length} className="px-4 py-8 text-center text-sm text-slate-500">
                  {emptyMessage}{" "}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
