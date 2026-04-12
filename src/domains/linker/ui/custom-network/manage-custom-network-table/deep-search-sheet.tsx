"use client";
import { CheckCircle2, Layers, RefreshCw, Search, XCircle, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { NestedMatchField, NestedMatchInfo, RegistryRowData } from "./data";

const STATUS_CFG = {
  ACTIVE: { label: "Active", Icon: CheckCircle2, iconCls: "text-emerald-500" },
  STALE: { label: "Stale", Icon: RefreshCw, iconCls: "text-amber-500" },
  UNLINKED: { label: "Missing", Icon: XCircle, iconCls: "text-rose-500" },
} as const;

const STATE_DOT: Record<string, string> = {
  "In Progress": "bg-amber-500",
  "Fully Linked": "bg-emerald-500",
  Unlinked: "bg-slate-400",
};
const STATE_TEXT: Record<string, string> = {
  "In Progress": "text-amber-700",
  "Fully Linked": "text-emerald-700",
  Unlinked: "text-slate-500",
};

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

interface DeepSearchSheetProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  query: string;
  results: Array<{ row: RegistryRowData; rowUrlMatch: boolean; nestedMatches: NestedMatchInfo[] }>;
}

export function DeepSearchSheet({ open, onOpenChange, query, results }: DeepSearchSheetProps) {
  const totalNested = results.reduce((s, r) => s + r.nestedMatches.length, 0);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-130 flex flex-col p-0 gap-0">
        {/* Dark header */}
        <SheetHeader className="bg-slate-900 px-6 py-5 shrink-0 space-y-0 pr-12">
          <div className="flex items-center gap-2 mb-2">
            <Layers size={14} className="text-blue-400" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Deep Link Search</span>
          </div>
          <SheetTitle className="text-sm font-mono text-blue-300 break-all font-normal leading-snug">
            {query}
          </SheetTitle>
          <SheetDescription className="sr-only">Deep search results</SheetDescription>

          {/* Stats */}
          <div className="flex gap-3 mt-3">
            {[
              { val: results.length, label: "Pages matched" },
              { val: totalNested, label: "Nested refs" },
              { val: results.filter((r) => r.rowUrlMatch).length, label: "Direct match" },
            ].map(({ val, label }) => (
              <div key={label} className="flex-1 bg-white/5 rounded-lg px-3 py-2 text-center">
                <p className="text-xl font-bold text-white">{val}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wide">{label}</p>
              </div>
            ))}
          </div>
        </SheetHeader>

        {/* Results */}
        <div className="flex-1 overflow-y-auto">
          {results.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground gap-3">
              <Search size={28} className="opacity-30" />
              <p className="text-sm">No results for this query</p>
            </div>
          ) : (
            results.map((result, i) => (
              <div key={result.row.id} className="border-b last:border-0">
                {/* Parent row */}
                <div
                  className={cn(
                    "flex items-center gap-3 px-5 py-3",
                    result.rowUrlMatch ? "bg-blue-50 border-b border-blue-100" : "bg-muted/40"
                  )}
                >
                  <span className="text-[11px] font-bold text-muted-foreground w-5 text-center shrink-0">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <code className="text-sm font-mono font-bold text-blue-700 break-all">
                        <Highlight text={result.row.url} query={query} />
                      </code>
                      {result.rowUrlMatch && (
                        <Badge className="text-[9px] bg-blue-600 text-white border-0 gap-0.5 shrink-0 px-1.5">
                          <Zap size={8} />
                          direct
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 text-[10px] font-medium",
                          STATE_TEXT[result.row.state]
                        )}
                      >
                        <span className={cn("size-1.5 rounded-full", STATE_DOT[result.row.state])} />
                        {result.row.state}
                      </span>
                      {result.nestedMatches.length > 0 && (
                        <span className="text-[10px] text-muted-foreground">
                          {result.nestedMatches.length} ref{result.nestedMatches.length > 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Nested matches */}
                {result.nestedMatches.map((nm) => {
                  const cfg = STATUS_CFG[nm.link.status as keyof typeof STATUS_CFG] ?? STATUS_CFG.MISSING;
                  const Icon = cfg.Icon;
                  return (
                    <div
                      key={nm.link.id}
                      className="flex gap-2 px-5 py-3 border-b border-border/40 last:border-0 hover:bg-muted/20 transition-colors"
                    >
                      <div className="flex flex-col items-center pt-1 ml-7 shrink-0">
                        <div className="w-px flex-1 bg-border" />
                      </div>
                      <div className="ml-2 flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                          <Icon size={12} className={cfg.iconCls} />
                          {nm.matchedFields.map((f) => (
                            <Badge
                              key={f}
                              variant="secondary"
                              className="text-[9px] font-bold bg-yellow-100 text-yellow-800 border-0 rounded-sm px-1.5"
                            >
                              {FIELD_LABEL[f]}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">URL</p>
                        <code className="text-xs font-mono text-primary break-all block mb-2">
                          <Highlight text={nm.link.url} query={query} />
                        </code>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">Title</p>
                        <p className="text-xs font-medium text-foreground mb-2">
                          <Highlight text={nm.link.title} query={query} />
                        </p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">Anchor</p>
                        {nm.link.anchor ? (
                          <p className="text-xs text-muted-foreground italic">
                            &ldquo;
                            <Highlight text={nm.link.anchor} query={query} />
                            &rdquo;
                          </p>
                        ) : (
                          <p className="text-xs text-muted-foreground/40 italic">not set</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
