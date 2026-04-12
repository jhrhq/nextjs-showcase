"use client";
import type { Row } from "@tanstack/react-table";
import { BarChart2, CheckCircle2, Link2, RefreshCw, Unlink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { deepSearch, type NestedMatchField, type RegistryRowData, type UrlOccurrence } from "./data";

const STATUS_CFG = {
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

const FIELD_LABEL: Record<NestedMatchField, string> = { url: "URL", title: "Title", anchor: "Anchor" };

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

interface NestedPanelProps {
  row: Row<RegistryRowData>;
  deepQuery: string;
  urlFreqMap: Map<string, UrlOccurrence[]>;
  onUrlClick: (url: string) => void;
}

export function NestedPanel({ row, deepQuery, urlFreqMap, onUrlClick }: NestedPanelProps) {
  const links = row.original.nestedData ?? [];
  const matchInfo = deepQuery ? deepSearch(row.original, deepQuery).nestedMatches : [];
  const matchedIds = new Set(matchInfo.map((m) => m.link.id));

  return (
    <div className="bg-slate-50 border-t border-border px-6 py-5">
      {/* Panel header */}
      <div className="flex items-center gap-2 px-6 py-3 border-b border-border">
        <Link2 size={13} className="text-muted-foreground" />
        <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Target Links for</span>
        <code className="text-[11px] font-mono text-primary bg-primary/5 px-2 py-0.5 rounded">{row.original.url}</code>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-12 px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground border-b border-border/60">
        <div className="col-span-4">Page</div>
        <div className="col-span-4">Anchor Text</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-2 text-right">Actions</div>
      </div>

      {/* Link rows */}
      <div className="divide-y divide-border/60">
        {links.map((link) => {
          const cfg = STATUS_CFG[link.status as keyof typeof STATUS_CFG] ?? STATUS_CFG.UNLINKED;
          const Icon = cfg.Icon;
          const freq = urlFreqMap.get(link.url)?.length ?? 0;
          const isHighlighted = matchedIds.has(link.id);
          const matchedFields = matchInfo.find((m) => m.link.id === link.id)?.matchedFields ?? [];
          const isUnlinked = link.status === "UNLINKED" || link.isUnlinked;
          const isStale = link.status === "STALE" || link.isStale;

          return (
            <div
              key={link.id}
              className={cn(
                "grid grid-cols-12 items-center px-6 py-3.5 bg-background transition-colors hover:bg-muted/30"
              )}
            >
              {/* Col 1 — title + url */}
              <div className="col-span-4 min-w-0 pr-3">
                <p
                  className={cn(
                    "text-sm font-semibold truncate",
                    isUnlinked ? "text-muted-foreground italic" : "text-foreground"
                  )}
                >
                  {deepQuery && matchedFields.includes("title") ? (
                    <Highlight text={link.title} query={deepQuery} />
                  ) : (
                    link.title
                  )}
                </p>
                <Button
                  variant="link"
                  size="sm"
                  className="h-auto p-0 text-[11px] font-mono text-primary justify-start font-normal"
                  onClick={() => onUrlClick(link.url)}
                >
                  {deepQuery && matchedFields.includes("url") ? (
                    <Highlight text={link.url} query={deepQuery} />
                  ) : (
                    link.url
                  )}
                </Button>
                {isHighlighted &&
                  matchedFields.map((f) => (
                    <span
                      key={f}
                      className="mr-1 text-[9px] font-bold bg-yellow-200 text-yellow-800 rounded px-1.5 py-0.5"
                    >
                      {FIELD_LABEL[f]}
                    </span>
                  ))}
              </div>

              {/* Col 2 — anchor (centre) */}
              <div className="col-span-4 min-w-0 pr-3">
                {link.anchor ? (
                  <p className="text-xs text-muted-foreground italic truncate">
                    &ldquo;
                    {deepQuery && matchedFields.includes("anchor") ? (
                      <Highlight text={link.anchor} query={deepQuery} />
                    ) : (
                      link.anchor
                    )}
                    &rdquo;
                  </p>
                ) : (
                  <span className="text-xs text-muted-foreground/40 italic">—</span>
                )}
              </div>

              {/* Col 3 — icon-only status with tooltip */}
              <div className="col-span-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-1 rounded-md",
                        cfg.cls
                      )}
                    >
                      <Icon size={15} className={cfg.iconCls} />
                      {cfg.label}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>{cfg.label}</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              {/* Col 4 — actions */}
              <div className="col-span-2 flex items-center justify-end gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 gap-1 text-muted-foreground hover:text-primary"
                      onClick={() => onUrlClick(link.url)}
                    >
                      <BarChart2 size={12} />
                      <span className="text-[10px] font-bold tabular-nums">{freq}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>Appears {freq}× across all pages</p>
                  </TooltipContent>
                </Tooltip>
                {!link.isUnlinked && (
                  <span className="text-xs text-slate-500">{link.isStale ? "Active" : "Stale"}</span>
                )}

                {isUnlinked && (
                  <Button variant="link" size="sm" className="h-7 hover:no-underline text-xs px-2.5">
                    Add Link
                  </Button>
                )}
                {isStale && !isUnlinked && (
                  <Button variant="secondary" size="sm" className="h-7 bg-transparent border-none text-xs px-2.5">
                    Refresh
                  </Button>
                )}
                {!isUnlinked && !isStale && (
                  <Button
                    variant="link"
                    size="sm"
                    className="h-7 text-xs px-2.5 text-rose-400 hover:text-destructive hover:no-underline"
                  >
                    Remove
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
