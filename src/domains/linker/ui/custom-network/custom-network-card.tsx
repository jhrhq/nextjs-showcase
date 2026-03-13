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
import { useCallback, useMemo, useState } from "react";
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
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type Stage = "start" | "progress" | "complete";

interface Page {
  id: string;
  slug: string;
  label: string;
  url: string;
}

export interface NetworkItem {
  id: string;
  name: string;
  date: string;
  seedCount: number;
  pages: Page[];
}

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

interface MatrixDialogProps {
  open: boolean;
  onClose: () => void;
  network: NetworkItem;
  pages: Page[];
  isConnected: (a: string, b: string) => boolean;
  onToggle: (a: string, b: string) => void;
  metrics: Metrics;
  stage: Stage;
  cfg: StageConfig;
}

interface CustomNetworkCardProps {
  network: NetworkItem;
  onDelete: (id: string) => void;
}

function seedConnections(pages: Page[], count: number): Set<string> {
  const keys: string[] = [];
  for (const src of pages) for (const tgt of pages) if (src.id !== tgt.id) keys.push(`${src.id}->${tgt.id}`);
  return new Set(keys.slice(0, Math.min(count, keys.length)));
}

function calcMetrics(pages: Page[], connections: Set<string>): Metrics {
  const possible = pages.length * (pages.length - 1);
  const built = connections.size;
  const remaining = Math.max(possible - built, 0);
  const completion = possible > 0 ? Math.round((built / possible) * 100) : 0;
  return { pageCount: pages.length, possible, built, remaining, completion };
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
    <div className={cn("flex flex-col items-center justify-center gap-0.5 px-3 py-2 flex-1", bg)}>
      <span className={cn("text-[10px] font-semibold uppercase tracking-wider leading-none", labelCls)}>{label}</span>
      <span className={cn("text-sm font-bold tabular-nums leading-tight", valueCls)}>{value}</span>
    </div>
  );
}

function MatrixDialog({ open, onClose, network, pages, isConnected, onToggle, metrics, cfg }: MatrixDialogProps) {
  const { built, possible, remaining, completion } = metrics;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-xl w-full p-0 gap-0 rounded-none overflow-hidden">
        <DialogHeader className="px-6 pt-5 pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-sm font-semibold">{network.name}</DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                Row = source · Column = target · click to toggle
              </DialogDescription>
            </div>
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
          </div>
        </DialogHeader>

        <div className="px-6 py-3 bg-muted/40 border-b border-border">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-muted-foreground">
              Built:{" "}
              <span className="font-semibold text-foreground tabular-nums">
                {built} / {possible}
              </span>
            </span>
            <span className="text-xs font-bold tabular-nums">{completion}%</span>
          </div>
          <Progress value={completion} className={cn("h-1.5 rounded-none", cfg.progressBar)} />
        </div>

        <TooltipProvider delayDuration={80}>
          <div className="px-6 py-5 overflow-x-auto">
            <div className="flex items-center gap-4 mb-4">
              {(
                [
                  {
                    icon: "✓",
                    cls: "bg-emerald-50 border border-emerald-200 text-emerald-600 font-bold",
                    label: "Linked",
                  },
                  { icon: "✗", cls: "bg-white border border-border text-muted-foreground/40", label: "No link" },
                  { icon: "—", cls: "bg-muted/30 border border-border/40 text-muted-foreground/25", label: "Self" },
                ] as const
              ).map(({ icon, cls, label }) => (
                <span key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className={cn("size-5 flex items-center justify-center font-mono text-[11px]", cls)}>
                    {icon}
                  </span>
                  {label}
                </span>
              ))}
            </div>

            <table className="border-collapse">
              <thead>
                <tr>
                  <th className="w-[88px]" />
                  {pages.map((p) => (
                    <th key={p.id} className="w-9 pb-2 px-0.5 text-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="block text-[10px] font-semibold text-muted-foreground truncate max-w-[34px] cursor-default">
                            {p.label}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="font-mono text-xs rounded-none">
                          {p.slug}
                        </TooltipContent>
                      </Tooltip>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pages.map((src) => (
                  <tr key={src.id}>
                    <td className="pr-3 py-0.5">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="text-[11px] font-mono text-muted-foreground truncate block max-w-[84px] cursor-default">
                            {src.slug}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="left" className="text-xs rounded-none">
                          {src.url}
                        </TooltipContent>
                      </Tooltip>
                    </td>
                    {pages.map((tgt) => {
                      const isSelf = src.id === tgt.id;
                      const linked = !isSelf && isConnected(src.id, tgt.id);
                      return (
                        <td key={tgt.id} className="px-0.5 py-0.5">
                          <Button
                            disabled={isSelf}
                            onClick={() => !isSelf && onToggle(src.id, tgt.id)}
                            className={cn(
                              "size-9 text-sm font-mono flex items-center justify-center border transition-all select-none",
                              isSelf
                                ? "bg-muted/30 border-border/40 text-muted-foreground/25 cursor-default"
                                : linked
                                  ? "bg-emerald-50 border-emerald-200 text-emerald-600 font-bold hover:bg-emerald-100 cursor-pointer"
                                  : "bg-white border-border text-muted-foreground/40 hover:bg-muted/40 cursor-pointer"
                            )}
                          >
                            {isSelf ? "—" : linked ? "✓" : "✗"}
                          </Button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TooltipProvider>

        <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-muted/20">
          <p className="text-xs text-muted-foreground">
            {remaining > 0 ? `${remaining} connection${remaining !== 1 ? "s" : ""} remaining` : "All links connected!"}
          </p>
          <Button size="sm" onClick={onClose} className="rounded-none text-xs">
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function CustomNetworkCard({ network, onDelete }: CustomNetworkCardProps) {
  const [connections, setConnections] = useState<Set<string>>(() => seedConnections(network.pages, network.seedCount));
  const [matrixOpen, setMatrixOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const toggle = useCallback((a: string, b: string): void => {
    const key = `${a}->${b}`;
    setConnections((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }, []);

  const isConnected = useCallback((a: string, b: string): boolean => connections.has(`${a}->${b}`), [connections]);

  const metrics = useMemo<Metrics>(() => calcMetrics(network.pages, connections), [connections, network.pages]);

  const { pageCount, possible, built, remaining, completion } = metrics;
  const stage = getStage(built, possible);
  const cfg = STAGE_CONFIG[stage];

  return (
    <>
      <Card
        className="relative w-full overflow-hidden rounded-none cursor-pointer border-border transition-all duration-150 hover:shadow-md active:scale-[0.995]"
        onClick={() => setMatrixOpen(true)}
      >
        <CardHeader className="px-5 pt-4 pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground leading-tight truncate">{network.name}</p>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                <Calendar className="size-3 shrink-0" />
                <span>{fmt(network.date)}</span>
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
                    onClick={() => setMatrixOpen(true)}
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

        <CardContent className="px-5 pt-3 pb-4 space-y-3">
          <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
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
          </div>

          <div className="flex items-center justify-between gap-3" onClick={(e) => e.stopPropagation()}>
            <span className="text-xs text-muted-foreground tabular-nums">{completion}% complete</span>

            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "rounded-none text-xs font-semibold gap-1.5 px-3 h-8 border-0 shadow-none",
                cfg.btnFg,
                cfg.btnHoverBg
              )}
              onClick={() => setMatrixOpen(true)}
            >
              <cfg.BtnIcon className="size-3.5 shrink-0" />
              {cfg.btnLabel}
              <ArrowRight className="size-3.5 shrink-0" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <MatrixDialog
        open={matrixOpen}
        onClose={() => setMatrixOpen(false)}
        network={network}
        pages={network.pages}
        isConnected={isConnected}
        onToggle={toggle}
        metrics={metrics}
        stage={stage}
        cfg={cfg}
      />

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent className="rounded-none">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-sm font-semibold">Delete "{network.name}"?</AlertDialogTitle>
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
    </>
  );
}
