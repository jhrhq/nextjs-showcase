"use client";

import type { Table } from "@tanstack/react-table";
import { Search, Settings2 } from "lucide-react";
import type React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

interface ExpansionControls {
  canCollapseAll: boolean;
  collapseAll: () => void;
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  expansion?: ExpansionControls; // optional collapse-all support
  leftActions?: React.ReactNode; // optional slot for custom left actions
  rightActions?: React.ReactNode; // optional slot for custom right actions
}

export function CustomDataTableToolbar<TData>({
  table,
  globalFilter,
  setGlobalFilter,
  leftActions,
  rightActions,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      {/* Left section: search + custom actions */}
      <div className="flex flex-1 gap-2 items-center w-full sm:w-auto">
        {/* Global Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Search all columns..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-8"
          />
        </div>

        {/* Optional slot for extra left actions */}
        {leftActions}
      </div>

      {/* Right section: collapse + column visibility + custom actions */}
      <div className="flex gap-2 items-center">
        {/* Collapse All button */}
        {/*  {expansion?.canCollapseAll && (
          <Button variant="outline" size="sm" onClick={expansion.collapseAll}>
            Collapse All Cells
          </Button>
        )} */}

        {/* Column Visibility Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Settings2 className="mr-2 h-4 w-4" />
              Columns
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Optional slot for extra right actions */}
        {rightActions}
      </div>
    </div>
  );
}
