"use client";
import type { ColumnDef } from "@tanstack/react-table";
import { BarChart2, CheckCircle2, ChevronDown, ChevronRight, ExternalLink, RefreshCw, Unlink, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { fuzzySort } from "@/infra/utils.tanstack-table";
import { cn } from "@/lib/utils";
import type { RegistryRowData, UrlOccurrence } from "./data";

// ── Highlight ───
function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase().trim());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-yellow-200 text-yellow-900 rounded-sm px-0.5">
        {text.slice(idx, idx + query.trim().length)}
      </mark>
      {text.slice(idx + query.trim().length)}
    </>
  );
}

// ── State badge ──
export const STATE_CFG: Record<string, { dot: string; text: string }> = {
  "In Progress": { dot: "bg-amber-500", text: "text-amber-700" },
  "Fully Linked": { dot: "bg-emerald-500", text: "text-emerald-700" },
  Unlinked: { dot: "bg-slate-400", text: "text-slate-500" },
};

// Define the mapping outside to prevent re-creation on every render
const STATUS_CONFIG = {
  ACTIVE: {
    label: "Active",
    Icon: CheckCircle2,
    cls: "bg-emerald-50 text-emerald-700 border-emerald-200",
    iconCls: "size-3 text-emerald-500",
  },
  STALE: {
    label: "Stale",
    Icon: RefreshCw,
    cls: "bg-indigo-50  text-indigo-700  border-indigo-200",
    iconCls: "size-3 text-indigo-500",
  },
  UNLINKED: {
    label: "Unlinked",
    Icon: Unlink,
    cls: "bg-gray-50 text-gray-700 border-gray-200",
    iconCls: "size-3 text-gray-500",
  },
} as const;
export const NestedStatusBadge = ({ status }: { status: string }) => {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.UNLINKED;
  const Icon = cfg.Icon;

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn("inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-1 rounded-md", cfg.cls)}
          >
            <Icon size={14} className={cfg.iconCls} />
            <span>{cfg.label}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="text-[10px]">
          <p>Link Status: {cfg.label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

// ── Column factory ───
interface ColumnOptions {
  urlFreqMap: Map<string, UrlOccurrence[]>;
  deepMode: boolean;
  deepQuery: string;
  deepResults: Array<{ row: RegistryRowData; rowUrlMatch: boolean }>;
  onFreqClick: (url: string) => void;
}

export function getColumns({
  urlFreqMap,
  deepMode,
  deepQuery,
  deepResults,
  onFreqClick,
}: ColumnOptions): ColumnDef<RegistryRowData>[] {
  return [
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
      size: 36,
      header: "",
      cell: ({ row }) =>
        row.getCanExpand() ? (
          <Button
            variant="ghost"
            size="icon"
            className="size-7 text-muted-foreground hover:text-foreground"
            onClick={row.getToggleExpandedHandler()}
          >
            {row.getIsExpanded() ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
          </Button>
        ) : null,
      enableSorting: false,
      enableColumnFilter: false,
    },

    {
      accessorKey: "url",
      header: "Page URL",
      filterFn: "fuzzy",
      sortingFn: fuzzySort,
      cell: ({ getValue, row }) => {
        const url = getValue() as string;
        const isDeepMatch = deepMode && deepResults.find((r) => r.row.id === row.id)?.rowUrlMatch;
        return (
          <div className="flex items-center gap-2">
            <code className={cn("text-sm font-mono font-semibold", isDeepMatch ? "text-yellow-700" : "text-primary")}>
              {deepMode && deepQuery ? <Highlight text={url} query={deepQuery} /> : url}
            </code>
            {isDeepMatch && (
              <Badge className="text-[9px] bg-yellow-100 text-yellow-800 border-0 gap-0.5 shrink-0 px-1.5">
                <Zap className="size-2" />
                direct
              </Badge>
            )}
            <ExternalLink className="size-3 text-muted-foreground/40 shrink-0" />
          </div>
        );
      },
    },

    {
      accessorKey: "targetLinks",
      header: "Target Links",
      enableColumnFilter: false,
      cell: ({ getValue }) => {
        return (
          <span className="text-sm font-medium text-gray-600 tabular-nums w-9 shrink-0">{getValue() as string}</span>
        );
      },
    },

    {
      id: "appearsIn",
      header: "Appears In",
      enableSorting: false,
      enableColumnFilter: false,
      cell: ({ row }) => {
        const occurrences = urlFreqMap.get(row.original.url) ?? [];
        if (occurrences.length === 0)
          return <span className="text-xs text-muted-foreground/50 italic">Not linked</span>;

        return (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 gap-1 text-muted-foreground hover:text-primary"
                onClick={(e) => {
                  e.stopPropagation();
                  onFreqClick(row.original.url);
                }}
              >
                <BarChart2 size={12} />
                <span className="text-[10px] font-bold tabular-nums">{occurrences.length}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Appears {occurrences.length}× across all pages</p>
            </TooltipContent>
          </Tooltip>
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
      id: "actions",
      header: "Action",
      enableSorting: false,
      enableColumnFilter: false,
      cell: ({ row }) =>
        row.original.state === "Fully Linked" ? (
          <CheckCircle2 className="size-4 text-emerald-500" />
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs text-primary hover:bg-primary/10 font-medium"
            onClick={(e) => e.stopPropagation()}
          >
            Mark Complete
          </Button>
        ),
    },
  ];
}
