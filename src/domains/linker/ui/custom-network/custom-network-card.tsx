/** biome-ignore-all lint/a11y/useKeyWithClickEvents: false flag */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: false flag */
"use client";

import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  CircleCheckBig,
  CircleDashed,
  Link2,
  List,
  Loader,
  MoreHorizontal,
  Network,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// 🔹 Exact type alias as requested
export type CreateCustomNetworkResponseSchemaValues = {
  id: string;
  projectId: string;
  collectionName: string;
  date?: string; // Optional fallback for UI
  collections: {
    id: string;
    url: string;
    targetLinks: string;
    state: "In Progress" | "Fully Linked" | "Not Started";
    nestedData: {
      id: string;
      title: string;
      url: string;
      anchor: string;
      status: "ACTIVE" | "STALE" | "UNLINKED";
    }[];
  }[];
};

type Stage = "start" | "progress" | "complete";

interface Metrics {
  pageCount: number;
  possible: number;
  built: number;
  remaining: number;
  completion: number;
}

interface StageConfig {
  label: string;
  StatusIcon: LucideIcon;
  BtnIcon: LucideIcon;
  btnLabel: string;
  badgeBg: string;
  badgeFg: string;
  btnFg: string;
  btnHoverBg: string;
  statBg: string;
  statFg: string;
  statHighBg: string;
  statHighFg: string;
  progressBar: string;
}

interface StatCellProps {
  label: string;
  value: number;
  bg: string;
  labelCls: string;
  valueCls: string;
}

// 🔹 Derive metrics directly from collections & nestedData
function calcMetrics(network: CreateCustomNetworkResponseSchemaValues): Metrics {
  const pageCount = network.collections.length;
  let possible = 0;
  let built = 0;

  for (const collection of network.collections) {
    possible += collection.nestedData.length;
    built += collection.nestedData.filter((n) => n.status === "ACTIVE").length;
  }

  const remaining = Math.max(possible - built, 0);
  const completion = possible > 0 ? Math.round((built / possible) * 100) : 0;

  return { pageCount, possible, built, remaining, completion };
}

function getStage(built: number, possible: number): Stage {
  if (built === 0) return "start";
  if (built < possible) return "progress";
  return "complete";
}

function fmt(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const STAGE_CONFIG: Record<Stage, StageConfig> = {
  start: {
    label: "Not Started",
    StatusIcon: CircleDashed,
    BtnIcon: Network,
    btnLabel: "Start Connecting Links",
    badgeBg: "bg-slate-100",
    badgeFg: "text-slate-600",
    btnFg: "text-slate-700",
    btnHoverBg: "hover:bg-slate-100",
    statBg: "bg-slate-50",
    statFg: "text-slate-500",
    statHighBg: "bg-slate-100",
    statHighFg: "text-slate-800",
    progressBar: "[&>div]:bg-slate-400",
  },
  progress: {
    label: "In Progress",
    StatusIcon: Loader,
    BtnIcon: Link2,
    btnLabel: "Continue Connecting Links",
    badgeBg: "bg-amber-100",
    badgeFg: "text-amber-700",
    btnFg: "text-amber-600",
    btnHoverBg: "hover:bg-amber-50",
    statBg: "bg-amber-50",
    statFg: "text-amber-600",
    statHighBg: "bg-amber-100",
    statHighFg: "text-amber-800",
    progressBar: "[&>div]:bg-amber-400",
  },
  complete: {
    label: "Fully Connected",
    StatusIcon: CircleCheckBig,
    BtnIcon: CheckCircle2,
    btnLabel: "Manage Internal Links",
    badgeBg: "bg-emerald-100",
    badgeFg: "text-emerald-700",
    btnFg: "text-emerald-700",
    btnHoverBg: "hover:bg-emerald-50",
    statBg: "bg-emerald-50",
    statFg: "text-emerald-600",
    statHighBg: "bg-emerald-100",
    statHighFg: "text-emerald-800",
    progressBar: "[&>div]:bg-emerald-500",
  },
};

function StatCell({ label, value, bg, labelCls, valueCls }: StatCellProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-0.5 p-2 flex-1", bg)}>
      <span className={cn("text-[10px] font-semibold uppercase tracking-normal leading-none", labelCls)}>{label}</span>
      <span className={cn("text-sm font-bold tabular-nums leading-tight", valueCls)}>{value}</span>
    </div>
  );
}

export interface CustomNetworkCardProps {
  network: CreateCustomNetworkResponseSchemaValues;
  onDelete: (id: string) => void;
  onNavigateCustomNetwork: (customNetowrkId: string) => void;
  onViewLinks?: (network: CreateCustomNetworkResponseSchemaValues) => void;
}

export function CustomNetworkCard({ network, onDelete, onNavigateCustomNetwork, onViewLinks }: CustomNetworkCardProps) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [matrixOpen, setMatrixOpen] = useState(false); // Added missing state

  const metrics = useMemo(() => calcMetrics(network), [network]);
  const { pageCount, possible, built, remaining, completion } = metrics;
  const stage = getStage(built, possible);
  const cfg = STAGE_CONFIG[stage];

  // Safe date fallback since `date` wasn't in the original schema
  const displayDate = network.date || new Date().toISOString();

  return (
    <>
      <Card
        onClick={() => onNavigateCustomNetwork(network.id)}
        className="relative w-full overflow-hidden @container grid grid-rows-[auto,1fr,auto] gap-4 rounded-none cursor-pointer border-border transition-all duration-150 hover:shadow-md active:scale-[0.995]"
      >
        <CardHeader className="px-5 pt-4 pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground leading-tight truncate">{network.collectionName}</p>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                <Calendar className="size-3 shrink-0" />
                <span>{fmt(displayDate)}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
              <Badge
                className={cn(
                  "text-[11px] font-semibold px-2.5 py-1 rounded-none border-0 flex items-center gap-1.5",
                  cfg.badgeBg,
                  cfg.badgeFg
                )}
              >
                <cfg.StatusIcon className="size-3" />
                {cfg.label}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-7 rounded-none text-muted-foreground hover:text-foreground"
                  >
                    <MoreHorizontal className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44 rounded-none">
                  <DropdownMenuItem
                    className="text-xs gap-2 cursor-pointer rounded-none"
                    onClick={() => onViewLinks?.(network)}
                  >
                    <List className="size-3.5" />
                    View links
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-xs gap-2 text-destructive focus:text-destructive cursor-pointer rounded-none"
                    onClick={() => setDeleteOpen(true)}
                  >
                    <Trash2 className="size-3.5" />
                    Delete network
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="grid gap-3 grid-cols-1 @xs:grid-cols-4 @xs:gap-2 @lg:grid-cols-4">
          <StatCell label="Pages" value={pageCount} bg={cfg.statBg} labelCls={cfg.statFg} valueCls={cfg.statFg} />
          <StatCell label="Possible" value={possible} bg={cfg.statBg} labelCls={cfg.statFg} valueCls={cfg.statFg} />
          <StatCell label="Built" value={built} bg={cfg.statBg} labelCls={cfg.statFg} valueCls={cfg.statFg} />
          <StatCell
            label="Remaining"
            value={remaining}
            bg={cfg.statHighBg}
            labelCls={cfg.statHighFg}
            valueCls={cfg.statHighFg}
          />
        </CardContent>
        <div
          className="flex flex-col items-center gap-3 @xs:flex-row @xs:gap-2 @xs:items-center @xs:justify-between px-4"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-xs text-muted-foreground tabular-nums">{completion}% complete</span>
          <Button
            variant="ghost"
            size="sm"
            className={cn("text-xs font-semibold gap-1.5 px-3 h-8 border-0", cfg.btnFg, cfg.btnHoverBg)}
            onClick={() => setMatrixOpen(true)}
          >
            <cfg.BtnIcon className="size-3.5 shrink-0" />
            {cfg.btnLabel}
            <ArrowRight className="size-3.5 shrink-0" />
          </Button>
        </div>
      </Card>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent className="rounded-none">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-sm font-semibold">Delete "{network.collectionName}"?</AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-muted-foreground">
              This will permanently remove the network and all link connections. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-none text-xs h-8">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="rounded-none text-xs h-8 bg-destructive hover:bg-destructive/90"
              onClick={() => onDelete(network.id)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={matrixOpen} onOpenChange={setMatrixOpen}>
        <DialogContent className="sm:max-w-3xl rounded-none">
          <DialogHeader>
            <DialogTitle className="text-sm font-semibold">Link Matrix: {network.collectionName}</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Managing {pageCount} collections with {possible} potential connections.
            </DialogDescription>
          </DialogHeader>
          <div className="py-8 text-center text-sm text-muted-foreground">
            {/* Replace with your actual matrix/table component */}
            Matrix UI renders here using <code>network.collections</code>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
