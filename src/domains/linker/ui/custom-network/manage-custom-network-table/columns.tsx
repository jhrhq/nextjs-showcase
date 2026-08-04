"use client";

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
import { useRemoveCustomNetworkCollection } from "@/domains/linker/hooks/use-projects";
import {
  CustomNetworkCollectionPayloadSchema,
  type CustomNetworkCollectionValues,
  type CustomNetworkNestedLinkValues,
} from "@/domains/linker/validations/custom-network.validation";
import { fuzzyFilter, fuzzySort } from "@/infra/utils.tanstack-table";
import { cn } from "@/lib/utils";
import { AppearsInAudit } from "./appeares-in-audit";

const nestedStatusFilterFn: FilterFn<CustomNetworkCollectionValues> = (
  row,
  _columnId,
  filterValue: CustomNetworkNestedLinkValues["status"][]
) => {
  if (!filterValue || filterValue.length === 0) {
    return true;
  }
  return row.original.nestedData?.some((child) => filterValue.includes(child.status)) ?? false;
};

export const STATE_CFG: Record<string, { dot: string; text: string }> = {
  "In Progress": { dot: "bg-chart-3", text: "text-chart-3" },
  "Fully Linked": { dot: "bg-chart-2", text: "text-chart-2" },
  Unlinked: { dot: "bg-muted-foreground", text: "text-muted-foreground" },
};

const STATUS_CONFIG = {
  ACTIVE: {
    label: "Active",
    Icon: CheckCircle2,
    cls: "bg-chart-2/10 text-chart-2",
    iconCls: "size-3 text-chart-2",
  },
  STALE: {
    label: "Stale",
    Icon: RefreshCw,
    cls: "bg-chart-1/10 text-chart-1",
    iconCls: "size-3 text-chart-1",
  },
  UNLINKED: {
    label: "Unlinked",
    Icon: Unlink,
    cls: "bg-muted text-muted-foreground",
    iconCls: "size-3 text-muted-foreground",
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
            className={cn(
              "inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-1 rounded-lg shadow-2xs",
              cfg.cls
            )}
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
      <ChevronRight
        className={cn("h-4 w-4 transition-transform text-muted-foreground", row.getIsExpanded() && "rotate-90")}
      />
    ),
  },
  {
    accessorKey: "url",
    header: "Page URL",
    filterFn: fuzzyFilter,
    sortingFn: fuzzySort,
    cell: ({ getValue }) => (
      <span className="text-primary text-sm font-medium flex items-center gap-2">
        {getValue() as string}
        <ExternalLink className="size-3 text-muted-foreground/40 shrink-0" />
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
      if (total === 0) return <span className="text-[10px] text-muted-foreground italic">No links</span>;

      const activeCount = children.filter((c) => c.status === "ACTIVE").length;
      const staleCount = children.filter((c) => c.status === "STALE").length;
      const unlinkedCount = children.filter((c) => c.status === "UNLINKED").length;

      const activeP = (activeCount / total) * 100;
      const staleP = (staleCount / total) * 100;
      const unlinkedP = (unlinkedCount / total) * 100;

      return (
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-36 cursor-help space-y-1.5">
                <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-muted shadow-inner">
                  <div style={{ width: `${activeP}%` }} className="bg-chart-2 shadow-2xs" />
                  <div style={{ width: `${staleP}%` }} className="bg-chart-1 shadow-2xs" />
                  <div style={{ width: `${unlinkedP}%` }} className="bg-muted-foreground/30" />
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold text-muted-foreground">
                  <span className="tabular-nums">{total} Links</span>
                  <div className="flex gap-1.5">
                    {activeCount > 0 && <span className="text-chart-2">{activeCount}A</span>}
                    {staleCount > 0 && <span className="text-chart-1">{staleCount}S</span>}
                    {unlinkedCount > 0 && <span className="text-muted-foreground">{unlinkedCount}U</span>}
                  </div>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent className="p-3 bg-popover text-popover-foreground shadow-xl rounded-xl">
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-chart-2" />
                  <span>{activeCount} Active Links</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-chart-1" />
                  <span>{staleCount} Stale Links</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground" />
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
          <span className={cn("size-1.5 rounded-full shrink-0 shadow-2xs", cfg.dot)} />
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

function DeleteRow({ row }: { row: Row<CustomNetworkCollectionValues> }) {
  const { projectId, customNetworkId } = useParams<{ projectId: string; customNetworkId: string }>();
  const { mutate, isPending } = useRemoveCustomNetworkCollection(projectId, customNetworkId);
  const [open, setOpen] = React.useState(false);

  const handleDeleteConfirm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    const res = CustomNetworkCollectionPayloadSchema.safeParse({
      projectId,
      customNetworkId,
      collectionId: row.original.id,
    });

    if (!res.success) return null;

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
          className="bg-transparent hover:bg-destructive/10 text-destructive shadow-2xs"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm" className="bg-card shadow-xl rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive rounded-xl shadow-2xs">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle className="text-foreground">Delete Row?</AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground">
            This will permanently delete this Row. All nested data will also be deleted!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isPending}
            variant="outline"
            onClick={(e) => e.stopPropagation()}
            className="hover:bg-accent text-foreground shadow-2xs"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            variant="destructive"
            onClick={handleDeleteConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-2xs"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
