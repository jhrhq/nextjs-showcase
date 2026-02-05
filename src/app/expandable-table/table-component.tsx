// TableComponent.tsx
/** biome-ignore-all lint/a11y/noStaticElementInteractions: false flag */
/** biome-ignore-all lint/a11y/useKeyWithClickEvents: false flag */
"use client";
import { type Column, flexRender, type Table as ReactTable } from "@tanstack/react-table";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import React from "react";
import { Input } from "@/components/ui/input";

interface TableProps<TData> {
  table: ReactTable<TData>;
}

function TableComponent<TData>({ table }: TableProps<TData>) {
  return (
    <div className="overflow-x-auto w-full">
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
                                <ChevronsUpDown className="text-slate-400" />
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </th>
                ))}
              </tr>

              {/* Filter Row */}
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
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
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
            ))
          ) : (
            <tr>
              <td colSpan={table.getAllColumns().length} className="px-4 py-8 text-center text-sm text-slate-500">
                No results found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TableComponent;

interface ColumnFilterProps<TData> {
  column: Column<TData, unknown>;
  table: ReactTable<TData>;
}

export function ColumnFilter<TData>({ column, table }: ColumnFilterProps<TData>) {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  // Number range filter
  if (typeof firstValue === "number") {
    return (
      <div className="flex space-x-2">
        <Input
          type="number"
          value={(columnFilterValue as [number, number])?.[0] ?? ""}
          onChange={(e) => column.setFilterValue((old: [number, number]) => [Number(e.target.value), old?.[1]])}
          placeholder="Min"
          className="w-24 h-8"
        />
        <Input
          type="number"
          value={(columnFilterValue as [number, number])?.[1] ?? ""}
          onChange={(e) => column.setFilterValue((old: [number, number]) => [old?.[0], Number(e.target.value)])}
          placeholder="Max"
          className="w-24 h-8"
        />
      </div>
    );
  }

  // Text filter
  return (
    <Input
      type="text"
      value={(columnFilterValue ?? "") as string}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder="Search..."
      className="w-full h-8"
    />
  );
}
