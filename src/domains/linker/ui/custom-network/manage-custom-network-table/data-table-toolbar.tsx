"use client";
import type { Table } from "@tanstack/react-table";
import { Layers, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import type { RegistryRowData } from "./data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

const STATE_OPTIONS = [
  { label: "In Progress", value: "In Progress" },
  { label: "Fully Linked", value: "Fully Linked" },
  { label: "Unlinked", value: "Unlinked" },
];

interface DataTableToolbarProps {
  table: Table<RegistryRowData>;
  deepMode: boolean;
  deepQuery: string;
  globalFilter: string;
  deepResultCount: number;
  deepNestedCount: number;
  onModeChange: (mode: boolean) => void;
  onDeepQueryChange: (q: string) => void;
  onGlobalFilterChange: (q: string) => void;
  onOpenDeepSheet: () => void;
  onReset: () => void;
}

export function DataTableToolbar({
  table,
  deepMode,
  deepQuery,
  globalFilter,
  deepResultCount,
  deepNestedCount,
  onModeChange,
  onDeepQueryChange,
  onGlobalFilterChange,
  onOpenDeepSheet,
  onReset,
}: DataTableToolbarProps) {
  const isFiltered = table.getState().columnFilters.length > 0 || !!globalFilter || !!deepQuery;

  return (
    <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b">
      {/* Mode toggle — pill style */}
      <div className="flex items-center bg-muted rounded-lg p-0.5 gap-0.5 shrink-0">
        <Button
          variant="ghost"
          size="sm"
          className={`h-7 px-3 text-xs gap-1.5 rounded-md font-medium transition-all ${!deepMode ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          onClick={() => onModeChange(false)}
        >
          <Search className="size-3" /> Standard
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`h-7 px-3 text-xs gap-1.5 rounded-md font-medium transition-all ${deepMode ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          onClick={() => onModeChange(true)}
        >
          <Layers className="size-3" /> Deep Search
        </Button>
      </div>

      <Separator orientation="vertical" className="h-5" />

      {/* Search input */}
      <div className="relative">
        {deepMode ? (
          <Layers className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-primary pointer-events-none" />
        ) : (
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
        )}
        <Input
          value={deepMode ? deepQuery : globalFilter}
          onChange={(e) => (deepMode ? onDeepQueryChange(e.target.value) : onGlobalFilterChange(e.target.value))}
          placeholder={deepMode ? "Search URL, title, or anchor…" : "Filter pages…"}
          className={`h-8 pl-8 pr-7 text-xs w-64 ${deepMode ? "border-primary/40 bg-primary/5 focus-visible:ring-primary/30" : ""}`}
        />
        {(deepMode ? deepQuery : globalFilter) && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 size-5 text-muted-foreground hover:text-foreground"
            onClick={() => (deepMode ? onDeepQueryChange("") : onGlobalFilterChange(""))}
          >
            <X className="size-3" />
          </Button>
        )}
      </div>

      {/* Faceted filter — State */}
      {table.getColumn("state") && (
        <DataTableFacetedFilter column={table.getColumn("state")} title="State" options={STATE_OPTIONS} />
      )}

      {/* Deep search results pill */}
      {deepMode && deepQuery.trim() && (
        <Button size="sm" className="h-8 text-xs gap-1.5 bg-primary hover:bg-primary/90" onClick={onOpenDeepSheet}>
          <Layers className="size-3" />
          {deepResultCount} match{deepResultCount !== 1 ? "es" : ""}
          {deepNestedCount > 0 && <span className="opacity-70">· {deepNestedCount} refs</span>}
        </Button>
      )}

      {/* Reset */}
      {isFiltered && (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 text-xs text-muted-foreground hover:text-destructive gap-1"
          onClick={onReset}
        >
          Reset <X className="size-3" />
        </Button>
      )}

      {/* Right side */}
      <div className="ml-auto flex items-center gap-2">
        {table.getFilteredSelectedRowModel().rows.length > 0 && (
          <span className="text-xs text-primary font-medium bg-primary/10 border border-primary/20 rounded-md px-2.5 py-1">
            {table.getFilteredSelectedRowModel().rows.length} selected
          </span>
        )}
        <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => table.toggleAllRowsExpanded()}>
          {table.getIsAllRowsExpanded() ? "Collapse All" : "Expand All"}
        </Button>
      </div>
    </div>
  );
}
