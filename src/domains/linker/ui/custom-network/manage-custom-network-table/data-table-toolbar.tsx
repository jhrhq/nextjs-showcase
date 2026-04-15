"use client";
import type { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { CustomNetworkCollectionValues } from "@/domains/linker/validations/custom-network.validation";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

export const STATE_OPTIONS = [
  { label: "In Progress", value: "In Progress" },
  { label: "Fully Linked", value: "Fully Linked" },
  { label: "Unlinked", value: "Unlinked" },
];

interface DataTableToolbarProps {
  table: Table<CustomNetworkCollectionValues>;
  globalFilter: string;
  onGlobalFilterChange: (q: string) => void;
  onReset: () => void;
}

export function DataTableToolbar({ table, globalFilter, onGlobalFilterChange }: DataTableToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 px-4 py-2 border-b">
      {/* Search input */}
      <div className="relative">
        <Input
          value={globalFilter}
          onChange={(e) => onGlobalFilterChange(e.target.value)}
          placeholder={"Filter pages…"}
          className="h-9 w-62.5 lg:w-87.5"
        />
        {globalFilter && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 size-5 text-muted-foreground hover:text-foreground"
            onClick={() => onGlobalFilterChange("")}
          >
            <X className="size-3" />
          </Button>
        )}
      </div>

      {/* Faceted filter — State */}
      {table.getColumn("state") && (
        <DataTableFacetedFilter column={table.getColumn("state")} title="State" options={STATE_OPTIONS} />
      )}
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

      {/* Reset */}
      {table.getState().columnFilters.length > 0 && (
        <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-9 px-3">
          Reset
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
