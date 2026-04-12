"use client";
import { CheckCircle2, RefreshCw, Unlink } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { UrlOccurrence } from "./data";

const STATUS_CFG = {
  ACTIVE: { label: "Active", Icon: CheckCircle2, iconCls: "text-emerald-500" },
  STALE: { label: "Stale", Icon: RefreshCw, iconCls: "text-amber-500" },
  UNLINKED: { label: "Unlinked", Icon: Unlink, iconCls: "text-gray-500" },
} as const;

interface FreqSheetProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  freqUrl: string | null;
  urlFreqMap: Map<string, UrlOccurrence[]>;
}

export function FreqSheet({ open, onOpenChange, freqUrl, urlFreqMap }: FreqSheetProps) {
  const occurrences = freqUrl ? (urlFreqMap.get(freqUrl) ?? []) : [];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-100px flex flex-col p-0 gap-0">
        {/* Header */}
        <SheetHeader className="bg-slate-900 px-6 py-5 shrink-0 space-y-0 pr-12">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">URL Frequency</p>
          <SheetTitle className="text-sm font-mono text-blue-300 font-normal break-all leading-snug">
            {freqUrl}
          </SheetTitle>
          <SheetDescription className="sr-only">All pages linking to this URL</SheetDescription>
        </SheetHeader>

        {/* Summary bar */}
        <div className="px-6 py-3 bg-muted/50 border-b flex items-center gap-2 shrink-0">
          <span className="text-2xl font-bold text-foreground">{occurrences.length}</span>
          <span className="text-sm text-muted-foreground">
            appearance{occurrences.length !== 1 ? "s" : ""} across all pages
          </span>
        </div>

        {/* Occurrence list */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {occurrences.length === 0 ? (
            <p className="text-sm text-muted-foreground italic text-center py-8">No occurrences found.</p>
          ) : (
            occurrences.map((occ, i) => {
              const cfg = STATUS_CFG[occ.link.status as keyof typeof STATUS_CFG] ?? STATUS_CFG.UNLINKED;
              const Icon = cfg.Icon;
              return (
                <div key={i} className="border bg-background p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={13} className={cfg.iconCls} />
                    <span className={cn("text-[11px] font-semibold", cfg.iconCls)}>{cfg.label}</span>
                    <span className="text-[10px] text-muted-foreground ml-auto font-mono tabular-nums">#{i + 1}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1">Appears in</p>
                  <code className="text-xs font-mono text-primary font-semibold">{occ.parentRow.url}</code>
                  {occ.link.anchor && (
                    <p className="text-xs text-muted-foreground italic mt-2">&ldquo;{occ.link.anchor}&rdquo;</p>
                  )}
                </div>
              );
            })
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
