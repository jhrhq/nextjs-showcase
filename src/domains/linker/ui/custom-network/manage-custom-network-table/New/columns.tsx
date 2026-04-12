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
import { BarChart2, Check, ChevronRight, ExternalLink, PlusCircle, Search } from "lucide-react";

import React, { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { NestedStatusBadge, STATE_CFG } from "@/domains/linker/ui/custom-network/manage-custom-network-table/columns";
import InternalLinkManagement from "@/domains/linker/ui/custom-network/manage-custom-network-table/custom-network-table";
import {
  REGISTRY_DATA,
  type RegistryRowData,
} from "@/domains/linker/ui/custom-network/manage-custom-network-table/data";
import { fuzzySort } from "@/infra/utils.tanstack-table";
import { cn } from "@/lib/utils";
import type { RegistryRowData } from "../data";

export type UrlUsageMap = Record<string, number>;

interface ColumnProps {
  urlUsageMap: UrlUsageMap;
}

export const getColumns = ({ urlUsageMap }: ColumnProps): ColumnDef<RegistryRowData>[] => [
  {
    id: "select",
    size: 40,
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
        aria-label="Select all"
        className="size-3"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(v) => row.toggleSelected(!!v)}
        aria-label="Select row"
        className="size-3"
        onClick={(e) => e.stopPropagation()}
      />
    ),
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    id: "expander",
    header: () => null,
    cell: ({ row }) => (
      <Button
        variant="ghost"
        size="icon"
        onClick={row.getToggleExpandedHandler()}
        className="size-7 text-muted-foreground hover:text-foreground"
      >
        <ChevronRight className={cn("h-4 w-4 transition-transform", row.getIsExpanded() && "rotate-90")} />
      </Button>
    ),
  },
  {
    accessorKey: "url",
    header: "Page URL",
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
    cell: ({ getValue }) => (
      <span className="text-blue-600 text-sm font-medium flex items-center gap-2">
        {getValue() as string} <ExternalLink className="size-3 text-muted-foreground/40 shrink-0" />
      </span>
    ),
  },
  {
    id: "appearsIn",
    header: "Appears In",
    enableSorting: false,
    enableColumnFilter: false,
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
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 gap-1 text-muted-foreground hover:text-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <BarChart2 size={12} />
                  <span className="text-[10px] font-bold tabular-nums">{count}x</span>
                </Button>
                {/*<Button variant="outline" className="h-7 gap-2 px-2 font-mono text-[11px] hover:bg-blue-50">
              <BarChart2 className="h-3 w-3" />
              {count}x
            </Button>*/}
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Appears {count}× across all pages</p>
            </TooltipContent>
          </Tooltip>
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
    filterFn: "arrIncludesSome",
    cell: ({ getValue }) => {
      const state = getValue() as string;
      const cfg = STATE_CFG[state] ?? STATE_CFG.Unlinked;
      return (
        <div className="flex items-center gap-1.5">
          <span className={cn("size-2 rounded-full shrink-0", cfg.dot)} />
          <span className={cn("text-xs font-medium", cfg.text)}>{state}</span>
        </div>
      );
    },
  },
  {
    id: "nestedStatus",
    // Invisible column used for the Faceted Filter logic
    accessorFn: (row) => row.nestedData.map((c) => c.status),
    filterFn: (row, _, value: string[]) => {
      if (!value.length) return true;
      return row.original.nestedData.some((c) => value.includes(c.status));
    },
  },
  {
    id: "actions",
    enableSorting: false,
    enableColumnFilter: false,
    header: () => <div className="text-right">Action</div>,
    cell: () => (
      <div className="flex items-center justify-end gap-2">
        <Button variant="link" size="sm" className="h-7 text-xs text-primary hover:bg-primary/10 font-medium">
          Mark Complete
        </Button>
      </div>
    ),
  },
];
