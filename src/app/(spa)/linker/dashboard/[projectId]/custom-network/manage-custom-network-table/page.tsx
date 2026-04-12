"use client";

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
import { Check, ExternalLink, PlusCircle, Search } from "lucide-react";
import React, { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: { label: string; value: string; icon?: React.ComponentType<{ className?: string }> }[];
}

// Custom hook and component to render a faceted filter for a column.
// Uses shadcn/ui components: Popover, Command, Badge, Button, Separator.
export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 border-dashed rounded-full px-4">
          <PlusCircle className="mr-2 h-4 w-4" />
          <span className="font-bold text-xs uppercase tracking-tight">{title}</span>
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge variant="secondary" key={option.value} className="rounded-sm px-1 font-normal">
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-50 p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      isSelected ? selectedValues.delete(option.value) : selectedValues.add(option.value);
                      const filterValues = Array.from(selectedValues);
                      column?.setFilterValue(filterValues.length ? filterValues : undefined);
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check className="h-4 w-4" />
                    </div>
                    {option.icon && <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
                    <span>{option.label}</span>
                    {facets?.get(option.value) && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

const globalFilterWithNested: FilterFn<RegistryRowData> = (row, filterValue) => {
  const search = filterValue.toLowerCase();

  // 1. Check parent fields (URL, State, etc.)
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

import { BarChart2, ChevronRight } from "lucide-react";

// Define the shape of your Usage Map for type safety
export type UrlUsageMap = Record<string, number>;

interface ColumnProps {
  urlUsageMap: UrlUsageMap;
}

const getColumns = ({ urlUsageMap }: ColumnProps): ColumnDef<RegistryRowData>[] => [
  {
    id: "expander",
    header: () => null,
    cell: ({ row }) => (
      <Button variant="ghost" size="sm" onClick={row.getToggleExpandedHandler()} className="h-8 w-8 p-0">
        <ChevronRight className={cn("h-4 w-4 transition-transform", row.getIsExpanded() && "rotate-90")} />
      </Button>
    ),
  },
  {
    accessorKey: "url",
    header: "Page URL",
    cell: ({ getValue }) => <span className="text-blue-600 font-medium">{getValue() as string}</span>,
  },
  {
    id: "appearsIn",
    header: "Appears In",
    accessorFn: (row) => urlUsageMap[row.url] || 0,
    cell: ({ row, table }) => {
      const currentUrl = row.original.url;
      const count = urlUsageMap[currentUrl] || 0;
      const allData = table.options.data as RegistryRowData[];

      // Find all occurrences
      const globalInstances = allData.flatMap((parent) =>
        parent.nestedData
          .filter((child) => child.url === currentUrl)
          .map((child) => ({ parentUrl: parent.url, ...child }))
      );

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="h-7 gap-2 px-2 font-mono text-[11px] hover:bg-blue-50">
              <BarChart2 className="h-3 w-3" />
              {count}x
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl h-[80vh] flex flex-col p-0 border-none shadow-2xl">
            {/* 1. Header with Stats */}
            <div className="bg-slate-900 p-6 text-white shrink-0">
              <div className="flex justify-between items-start">
                <div>
                  <DialogTitle className="text-xl font-bold">Link Audit Profile</DialogTitle>
                  <p className="text-slate-400 text-xs font-mono mt-1 truncate max-w-md">{currentUrl}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-blue-400">{count}</div>
                  <div className="text-[10px] uppercase font-bold text-slate-500">Total Usages</div>
                </div>
              </div>
            </div>

            {/* 2. Mini Toolbar inside Dialog */}
            <div className="p-4 border-b bg-slate-50 flex gap-2 shrink-0">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                <Input placeholder="Filter these 100+ pages..." className="pl-9 h-9 bg-white" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-32.5 h-9 bg-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active Only</SelectItem>
                  <SelectItem value="stale">Stale Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 3. High-Performance Virtualized-style List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-slate-100/30">
              {globalInstances.map((inst, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-white hover:border-blue-300 transition-all group"
                >
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-slate-800 truncate">{inst.parentUrl}</span>
                    <span className="text-[11px] text-slate-500 italic truncate">"{inst.anchor}"</span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-4">
                    <Badge variant={inst.status === "ACTIVE" ? "default" : "destructive"} className="text-[9px] h-5">
                      {inst.status}
                    </Badge>
                    <Button size="icon" variant="ghost" className="h-7 w-7">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t bg-white flex justify-between items-center shrink-0">
              <p className="text-[10px] text-slate-400 font-medium">
                Tip: Use the search bar to find specific parent domains.
              </p>
              <DialogClose asChild>
                <Button size="sm">Done</Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },
  {
    id: "composition",
    header: "Link Composition",
    cell: ({ row }) => {
      const children = row.original.nestedData || [];
      const total = children.length;

      if (total === 0) return <span className="text-[10px] text-slate-400 italic">No links</span>;

      const activeCount = children.filter((c) => c.status === "ACTIVE").length;
      const staleCount = children.filter((c) => c.status === "STALE" || c.isStale).length;
      const unlinkedCount = children.filter((c) => c.status === "UNLINKED" || c.isUnlinked).length;

      // Convert to percentages for the bar segments
      const activeP = (activeCount / total) * 100;
      const staleP = (staleCount / total) * 100;
      const unlinkedP = (unlinkedCount / total) * 100;

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-36 cursor-help space-y-1.5">
                {/* Segmented Bar */}
                <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-slate-100 shadow-inner">
                  <div
                    style={{ width: `${activeP}%` }}
                    className="bg-green-500 shadow-[inset_-1px_0_0_rgba(0,0,0,0.1)]"
                  />
                  <div
                    style={{ width: `${staleP}%` }}
                    className="bg-amber-400 shadow-[inset_-1px_0_0_rgba(0,0,0,0.1)]"
                  />
                  <div style={{ width: `${unlinkedP}%` }} className="bg-slate-300" />
                </div>

                {/* Labels */}
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-500">
                  <span className="tabular-nums">{total} Links</span>
                  <div className="flex gap-1.5">
                    {activeCount > 0 && <span className="text-green-600">{activeCount}A</span>}
                    {staleCount > 0 && <span className="text-amber-600">{staleCount}S</span>}
                    {unlinkedCount > 0 && <span className="text-slate-400">{unlinkedCount}U</span>}
                  </div>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent className="p-3 bg-slate-900 text-white border-none shadow-xl">
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span>{activeCount} Active Links</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>{staleCount} Stale Links</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-400" />
                  <span>{unlinkedCount} Unlinked Links</span>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "state",
    header: "State",
    cell: ({ getValue }) => (
      <Badge variant="outline" className="font-normal border-slate-200">
        {getValue() as string}
      </Badge>
    ),
  },
  {
    id: "nestedStatus",
    // Invisible column used for the Faceted Filter logic
    accessorFn: (row) => row.nestedData.map((c) => c.status),
    filterFn: (row, id, value: string[]) => {
      if (!value.length) return true;
      return row.original.nestedData.some((c) => value.includes(c.status));
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Action</div>,
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-2">
        <Button variant="link" size="sm" className="h-8 px-2 text-blue-600 font-semibold">
          Mark Complete
        </Button>
      </div>
    ),
  },
];

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
        nestedStatus: false, // This hides it from getVisibleCells() and getHeaderGroups()
      },
      // Logic: Auto-expand everything if searching, else use manual state
      expanded: isFiltered ? true : expanded,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onExpandedChange: setExpanded,
    globalFilterFn: globalFilterWithNested,
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
      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-[10px] font-bold uppercase text-slate-400">
                    {flexRender(header.column.columnDef.header, header.getContext())}
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
                  <TableRow className="group transition-colors hover:bg-slate-50/50">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="p-4">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>

                  {/* EXPANDED NESTED TABLE ROW */}
                  {row.getIsExpanded() && (
                    <TableRow className="bg-slate-50/30 border-none hover:bg-slate-50/30">
                      <TableCell colSpan={row.getVisibleCells().length} className="p-4 pt-0">
                        <div className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
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
                                      <span
                                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${
                                          child.status === "ACTIVE"
                                            ? "bg-green-50 text-green-700 border-green-200"
                                            : "bg-slate-50 text-slate-500 border-slate-200"
                                        }`}
                                      >
                                        {child.status}
                                      </span>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                      <Button
                                        variant="link"
                                        className="text-xs font-semibold text-slate-400 hover:text-blue-600 transition-colors"
                                      >
                                        Refresh
                                      </Button>
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

import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import InternalLinkManagement from "@/domains/linker/ui/custom-network/manage-custom-network-table/custom-network-table";
import {
  REGISTRY_DATA,
  type RegistryRowData,
} from "@/domains/linker/ui/custom-network/manage-custom-network-table/data";

export default function CreateCustomNetworkTable() {
  return (
    <>
      <RegistryDataTable data={REGISTRY_DATA} />
      <InternalLinkManagement />
    </>
  );
}
