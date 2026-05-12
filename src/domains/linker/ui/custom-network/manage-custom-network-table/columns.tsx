import type { ColumnDef, FilterFn, Row } from "@tanstack/react-table";
import { CheckCircle2, ChevronRight, ExternalLink, RefreshCw, Trash2Icon, Unlink } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useRemoveCustomNetworkRow } from "@/domains/linker/hooks/use-projects";
import {
  type CustomNetworkCollectionValues,
  type CustomNetworkNestedLinkValues,
  DeleteCustomNetworkRowSchema,
} from "@/domains/linker/validations/custom-network.validation";
import { fuzzyFilter, fuzzySort } from "@/infra/utils.tanstack-table";
import { cn } from "@/lib/utils";
import { AppearsInAudit } from "./appeares-in-audit";

/**
 * Type-safe filter function for nested statuses
 * filterValue is explicitly typed as an array of valid statuses
 */
const nestedStatusFilterFn: FilterFn<CustomNetworkCollectionValues> = (
  row,
  _columnId,
  filterValue: CustomNetworkNestedLinkValues["status"][]
) => {
  // If no filters are selected in the faceted filter, show all rows
  if (!filterValue || filterValue.length === 0) {
    return true;
  }

  // Check if any child object has a status included in the filter selection
  return row.original.nestedData?.some((child) => filterValue.includes(child.status)) ?? false;
};
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
type StatusType = keyof typeof STATUS_CONFIG;

export const NestedStatusBadge = ({ status }: { status: StatusType }) => {
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

export type UrlUsageMap = Record<string, number>;

interface ColumnProps {
  urlUsageMap: UrlUsageMap;
}

export const getColumns = ({ urlUsageMap }: ColumnProps): ColumnDef<CustomNetworkCollectionValues>[] => [
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
      <ChevronRight className={cn("h-4 w-4 transition-transform", row.getIsExpanded() && "rotate-90")} />
    ),
  },
  {
    accessorKey: "url",
    header: "Page URL",
    filterFn: fuzzyFilter,
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
    cell: ({ row, table }) => <AppearsInAudit row={row} table={table} urlUsageMap={urlUsageMap} />,
  },
  {
    id: "composition",
    header: "Link Composition",
    cell: ({ row }) => {
      const children = row.original.nestedData || [];
      const total = children.length;

      if (total === 0) return <span className="text-[10px] text-slate-400 italic">No links</span>;

      const activeCount = children.filter((c) => c.status === "ACTIVE").length;
      const staleCount = children.filter((c) => c.status === "STALE").length;
      const unlinkedCount = children.filter((c) => c.status === "UNLINKED").length;

      // Convert to percentages for the bar segments
      const activeP = (activeCount / total) * 100;
      const staleP = (staleCount / total) * 100;
      const unlinkedP = (unlinkedCount / total) * 100;

      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-36 cursor-help space-y-1.5">
              {/* Segmented Bar */}
              <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-slate-100 shadow-inner">
                <div
                  style={{ width: `${activeP}%` }}
                  className="bg-green-500 shadow-[inset_-1px_0_0_rgba(0,0,0,0.1)]"
                />
                <div style={{ width: `${staleP}%` }} className="bg-amber-400 shadow-[inset_-1px_0_0_rgba(0,0,0,0.1)]" />
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
          <span className={cn("size-1.5 rounded-full shrink-0", cfg.dot)} />
          <span className={cn("text-xs font-medium", cfg.text)}>{state}</span>
        </div>
      );
    },
  },
  {
    id: "nestedStatus",
    accessorFn: (row) => row.nestedData?.map((c) => c.status) ?? [],
    filterFn: nestedStatusFilterFn,
    enableColumnFilter: true,
    enableGlobalFilter: false,
  },
  {
    id: "actions",
    enableSorting: false,
    enableColumnFilter: false,
    header: "Action",
    cell: ({ row }) => <DeleteRow row={row} />,
  },
];

/*
 * TODO
 * refactor the useMuatations with onsuccess and onError toast with sonner
 */
function DeleteRow({ row }: { row: Row<CustomNetworkCollectionValues> }) {
  const { projectId, customNetworkId } = useParams<{ projectId: string; customNetworkId: string }>();

  const { mutate, isPending } = useRemoveCustomNetworkRow(projectId, customNetworkId);
  const [open, setOpen] = React.useState(false);

  const handleDeleteConfirm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    const res = DeleteCustomNetworkRowSchema.safeParse({
      projectId,
      customNetworkId,
      collectionId: row.id,
    });

    if (!res.success) return null;
    handleDeleteConfirm;

    mutate(res.data, {
      onError: (error) => toast(error?.message),
      onSettled: () => {
        setOpen(false);
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="bg-transparent hover:bg-transparent text-rose-500"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Row?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this Row. All nested data will also be deleted!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending} variant="outline" onClick={(e) => e.stopPropagation()}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction disabled={isPending} variant="destructive" onClick={handleDeleteConfirm}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
