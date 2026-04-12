import {
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  type FilterFn,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { NestedStatusBadge } from "@/domains/linker/ui/custom-network/manage-custom-network-table/columns";
import { fuzzyFilter } from "@/infra/utils.tanstack-table";
import type { RegistryRowData } from "../data";
import { arrIncludesSomeFilter, deepLinkFilter } from "../utils";
import { getColumns, type UrlUsageMap } from "./columns";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

const globalFilterWithNested: FilterFn<RegistryRowData> = (row, columnId, filterValue) => {
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

export function RegistryDataTable({ data }: { data: RegistryRowData[] }) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [expanded, setExpanded] = useState({});
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
      globalFilter,
      columnFilters,
      columnVisibility: {
        nestedStatus: false,
      },
      // Use true for all rows during filter, otherwise use manual state
      expanded: isFiltered ? true : expanded,
    },
    filterFns: { fuzzy: fuzzyFilter, deepLink: deepLinkFilter, arrIncludesSome: arrIncludesSomeFilter },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onExpandedChange: setExpanded,
    getRowCanExpand: () => true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });
  return (
    <div className="space-y-4">
      {/* TOOLBAR: Search + shadcn Faceted Filters */}
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search all rows..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="h-9 w-62.5 lg:w-87.5"
        />

        {table.getColumn("state") && (
          <DataTableFacetedFilter
            column={table.getColumn("state")}
            title="State"
            options={[
              { label: "In Progress", value: "In Progress" },
              { label: "Fully Linked", value: "Fully Linked" },
              { label: "Unlinked", value: "Unlinked" },
            ]}
          />
        )}

        {/* NEW: Nested Status Filter */}
        {table.getColumn("nestedStatus") && (
          <DataTableFacetedFilter
            column={table.getColumn("nestedStatus")}
            title="Child Status"
            options={[
              { label: "Active", value: "ACTIVE" },
              { label: "Stale", value: "STALE" },
              { label: "Unlinked", value: "UNLINKED" },
            ]}
          />
        )}
        {/* Reset button shows only when filtered */}
        {table.getState().columnFilters.length > 0 && (
          <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-9 px-3">
            Reset
          </Button>
        )}
      </div>

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
            {table.getRowModel().rows.map((row) => {
              // 1. Get the current filter states from the table instance
              const statusFilter = table.getColumn("nestedStatus")?.getFilterValue() as string[];
              const search = globalFilter?.toLowerCase() || "";

              // 2. Filter the nested data locally for this row
              const filteredChildren = row.original.nestedData?.filter((child) => {
                // Check if child matches Faceted Status Filter
                const matchesStatus = !statusFilter?.length || statusFilter.includes(child?.status);

                // Check if child matches Global Search (title, url, or anchor)
                const matchesSearch =
                  !search ||
                  child.title?.toLowerCase().includes(search) ||
                  child.url?.toLowerCase().includes(search) ||
                  child.anchor?.toLowerCase().includes(search);

                return matchesStatus && matchesSearch;
              });

              return (
                <React.Fragment key={row.id}>
                  {/* PARENT ROW */}
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

                  {/* EXPANDED NESTED TABLE ROW */}
                  {row.getIsExpanded() && (
                    <TableRow className="bg-slate-50/30 border-none hover:bg-slate-50/30">
                      <TableCell colSpan={row.getVisibleCells().length} className="p-4">
                        <div className=" border border-slate-200 bg-white shadow-sm overflow-hidden">
                          {/* Nested Table Header */}
                          <div className="flex items-center justify-between border-b bg-slate-50/50 px-4 py-2">
                            <div className="text-[10px] font-bold uppercase text-blue-600 flex items-center gap-2">
                              <span className="text-xs">🔗</span>
                              Target Links for {row.original.url}
                            </div>
                            {/* Counter badge: Shows how many links are visible out of total */}
                            <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-100">
                              Showing {filteredChildren.length} of {row.original.nestedData?.length}
                            </span>
                          </div>

                          <table className="w-full text-left">
                            <thead className="bg-slate-50/50 text-[10px] uppercase text-slate-400 border-b">
                              <tr>
                                <th className="px-4 py-2 font-semibold">Page Title & URL</th>
                                <th className="px-4 py-2 font-semibold">Anchor Text</th>
                                <th className="px-4 py-2 font-semibold">Status</th>
                                <th className="px-4 py-2 text-right font-semibold">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {filteredChildren.length > 0 ? (
                                filteredChildren.map((child) => (
                                  <tr
                                    key={child.id}
                                    className="text-sm group/child hover:bg-slate-50/80 transition-colors"
                                  >
                                    <td className="px-4 py-3">
                                      <div className="font-bold text-slate-800">{child.title}</div>
                                      <div className="text-xs text-blue-500 truncate max-w-50">{child.url}</div>
                                    </td>
                                    <td className="px-4 py-3 text-slate-500 italic">
                                      {child.anchor ? `"${child.anchor}"` : "—"}
                                    </td>
                                    <td className="px-4 py-3">
                                      <NestedStatusBadge status={child.status} />
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                      <div className="flex items-center justify-end gap-1">
                                        {/* CASE 1: LINK DOESN'T EXIST */}
                                        {child.isUnlinked && (
                                          <Button
                                            variant="link"
                                            size="sm"
                                            className="h-7 hover:no-underline text-xs px-2.5"
                                          >
                                            Add Link
                                          </Button>
                                        )}

                                        {/* CASE 2: LINK EXISTS BUT IS STALE */}
                                        {child.isStale && !child.isUnlinked && (
                                          <Button
                                            variant="secondary"
                                            size="sm"
                                            className="h-7 bg-transparent border-none text-xs px-2.5"
                                          >
                                            Refresh
                                          </Button>
                                        )}

                                        {/* CASE 3: LINK IS HEALTHY (ACTIVE) */}
                                        {!child.isUnlinked && !child.isStale && (
                                          <Button
                                            variant="link"
                                            size="sm"
                                            className="h-7 text-xs px-2.5 text-rose-400 hover:text-destructive hover:no-underline"
                                          >
                                            Remove
                                          </Button>
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan={4} className="p-8 text-center">
                                    <div className="flex flex-col items-center gap-1">
                                      <span className="text-lg">🔍</span>
                                      <p className="text-xs text-slate-400">
                                        No links in this row match your current filters.
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
