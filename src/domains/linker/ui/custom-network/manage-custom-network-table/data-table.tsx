"use client";
import type { RankingInfo } from "@tanstack/match-sorter-utils";
import {
  type Column,
  type ColumnFiltersState,
  type ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, ChevronsUpDown, ChevronUp, Layers } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TooltipProvider } from "@/components/ui/tooltip";
import { fuzzyFilter } from "@/infra/utils.tanstack-table";
import { cn } from "@/lib/utils";
import { getColumns } from "./columns";
import { buildUrlFrequencyMap, deepSearch, REGISTRY_DATA, type RegistryRowData } from "./data";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { DeepSearchSheet } from "./deep-search-sheet";
import { FreqSheet } from "./freq-sheet";
import { NestedPanel } from "./nested-panel";
import { arrIncludesSomeFilter, deepLinkFilter } from "./utils";

// ── Module augmentation ──
declare module "@tanstack/react-table" {
  interface FilterFns {
    fuzzy: import("@tanstack/react-table").FilterFn<unknown>;
    deepLink: import("@tanstack/react-table").FilterFn<unknown>;
    arrIncludesSome: import("@tanstack/react-table").FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

interface SortableHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  children: React.ReactNode;
}
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

// ── Main DataTable ──
export function DataTable() {
  const urlFreqMap = useMemo(() => buildUrlFrequencyMap(), []);

  // Core state
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  // Deep search
  const [deepMode, setDeepMode] = useState(false);
  const [deepQuery, setDeepQuery] = useState("");
  const [deepSheetOpen, setDeepSheetOpen] = useState(false);

  // Freq sheet
  const [freqUrl, setFreqUrl] = useState<string | null>(null);
  const [freqSheetOpen, setFreqSheetOpen] = useState(false);

  const openFreq = useCallback((url: string) => {
    setFreqUrl(url);
    setFreqSheetOpen(true);
  }, []);

  // Deep search results (scans all rows, not just visible)
  const deepResults = useMemo(() => {
    if (!deepQuery.trim()) return [];
    return REGISTRY_DATA.map((row) => {
      const { rowUrlMatch, nestedMatches } = deepSearch(row, deepQuery);
      return { row, rowUrlMatch, nestedMatches };
    }).filter((r) => r.rowUrlMatch || r.nestedMatches.length > 0);
  }, [deepQuery]);

  // Auto-expand rows with nested matches in deep mode
  useEffect(() => {
    if (!deepMode || !deepQuery.trim()) return;
    const toExpand: Record<string, boolean> = {};
    for (const r of deepResults) if (r.nestedMatches.length > 0) toExpand[r.row.id] = true;
    setExpanded((prev) => ({ ...(prev as Record<string, boolean>), ...toExpand }));
  }, [deepResults, deepMode, deepQuery]);

  const handleModeChange = (deep: boolean) => {
    setDeepMode(deep);
    if (!deep) {
      setDeepQuery("");
      setDeepSheetOpen(false);
    }
  };

  const handleDeepQueryChange = (q: string) => {
    setDeepQuery(q);
    if (q.trim()) setDeepSheetOpen(false);
    else setDeepSheetOpen(false);
  };

  const handleReset = () => {
    setGlobalFilter("");
    setColumnFilters([]);
    setDeepQuery("");
    setDeepSheetOpen(false);
  };

  const columns = useMemo(
    () =>
      getColumns({
        urlFreqMap,
        deepMode,
        deepQuery,
        deepResults,
        onFreqClick: openFreq,
      }),
    [urlFreqMap, deepMode, deepQuery, deepResults, openFreq]
  );

  const activeGlobalFilter = deepMode ? deepQuery : globalFilter;

  const table = useReactTable<RegistryRowData>({
    data: REGISTRY_DATA,
    columns,
    state: { expanded, sorting, columnFilters, globalFilter: activeGlobalFilter, rowSelection },
    getRowId: (row) => row.id,
    onExpandedChange: setExpanded,
    getRowCanExpand: (row) => (row.original.nestedData?.length ?? 0) > 0,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: deepMode ? setDeepQuery : setGlobalFilter,
    globalFilterFn: (deepMode ? "deepLink" : "fuzzy") as "fuzzy" | "deepLink",
    filterFns: { fuzzy: fuzzyFilter, deepLink: deepLinkFilter, arrIncludesSome: arrIncludesSomeFilter },
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    paginateExpandedRows: false,
    initialState: { pagination: { pageSize: 6 } },
  });

  return (
    <TooltipProvider delayDuration={120}>
      <div className="bg-card overflow-hidden border">
        {/* Toolbar */}
        <DataTableToolbar
          table={table}
          deepMode={deepMode}
          deepQuery={deepQuery}
          globalFilter={globalFilter}
          deepResultCount={deepResults.length}
          deepNestedCount={deepResults.reduce((s, r) => s + r.nestedMatches.length, 0)}
          onModeChange={handleModeChange}
          onDeepQueryChange={handleDeepQueryChange}
          onGlobalFilterChange={setGlobalFilter}
          onOpenDeepSheet={() => setDeepSheetOpen(true)}
          onReset={handleReset}
        />

        {/* Deep mode hint */}
        {deepMode && !deepQuery && (
          <div className="flex items-center gap-2 px-4 py-2.5 bg-primary/5 border-b border-primary/10 text-xs text-primary">
            <Layers className="h-3.5 w-3.5 shrink-0" />
            <span>
              Deep Search scans <strong>all nested link URLs, titles & anchors</strong> — try{" "}
              <code className="bg-primary/10 px-1.5 py-0.5 rounded font-mono text-[11px]">
                /solutions/financial-services
              </code>
            </span>
          </div>
        )}

        {/* Table */}
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id} className="bg-muted/50 hover:bg-muted/50 border-b">
                {hg.headers.map((h) => (
                  <TableHead
                    key={h.id}
                    className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground py-3"
                    style={{ width: h.getSize() !== 150 ? h.getSize() : undefined }}
                  >
                    <SortableHeader column={h.column}>
                      {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                    </SortableHeader>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-16 text-muted-foreground text-sm">
                  No results match your {deepMode ? "deep search" : "filters"}.
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => {
                const deepRowResult = deepMode ? deepResults.find((r) => r.row.id === row.id) : null;
                const hasNestedMatch = (deepRowResult?.nestedMatches.length ?? 0) > 0;

                return (
                  <React.Fragment key={row.id}>
                    <TableRow
                      className={cn(
                        "cursor-pointer border-b transition-colors",
                        row.getIsSelected() && "bg-primary/5",
                        row.getIsExpanded() && !row.getIsSelected() && "bg-muted/30",
                        hasNestedMatch && !row.getIsSelected() && "bg-yellow-50/40"
                      )}
                      onClick={row.getCanExpand() ? row.getToggleExpandedHandler() : undefined}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="py-3">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>

                    {row.getIsExpanded() && (
                      <TableRow className="hover:bg-transparent border-0">
                        <TableCell colSpan={row.getAllCells().length} className="p-0">
                          <NestedPanel
                            row={row}
                            deepQuery={deepMode ? deepQuery : ""}
                            urlFreqMap={urlFreqMap}
                            onUrlClick={openFreq}
                          />
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <DataTablePagination table={table} />
      </div>

      {/* Sheets */}
      <DeepSearchSheet open={deepSheetOpen} onOpenChange={setDeepSheetOpen} query={deepQuery} results={deepResults} />
      <FreqSheet open={freqSheetOpen} onOpenChange={setFreqSheetOpen} freqUrl={freqUrl} urlFreqMap={urlFreqMap} />
    </TooltipProvider>
  );
}
