"use client";

import type { Row, Table } from "@tanstack/react-table";
import { BarChart2, ExternalLink, Link2, Search } from "lucide-react";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { CustomNetworkCollectionValues } from "@/domains/linker/validations/custom-network.validation";
import { cn } from "@/lib/utils";

interface AppearsInAuditProps {
  row: Row<CustomNetworkCollectionValues>;
  table: Table<CustomNetworkCollectionValues>;
  urlUsageMap: Record<string, number>;
}

export function AppearsInAudit({ row, table, urlUsageMap }: AppearsInAuditProps) {
  const currentUrl = row.original.url;
  const count = urlUsageMap[currentUrl] || 0;
  const allData = table.options.data as CustomNetworkCollectionValues[];

  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");

  const globalInstances = React.useMemo(() => {
    return allData.flatMap((parent) =>
      (parent.nestedData ?? [])
        .filter((child) => child.url === currentUrl)
        .map((child) => ({
          parentUrl: parent.url,
          ...child,
        }))
    );
  }, [allData, currentUrl]);

  const filteredInstances = React.useMemo(() => {
    return globalInstances.filter((inst) => {
      const matchesSearch =
        inst.parentUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (inst.anchor?.toLowerCase() ?? "").includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === "all" || inst.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [globalInstances, searchQuery, statusFilter]);

  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 gap-1 text-muted-foreground hover:text-primary transition-colors shadow-2xs"
                onClick={(e) => e.stopPropagation()}
                disabled={count < 1}
              >
                <BarChart2 size={12} />
                <span className="text-[10px] font-bold tabular-nums">{count}x</span>
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent side="top" className="text-xs">
            Appears {count}× across all pages
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="max-w-3xl h-[80vh] flex flex-col p-0 overflow-hidden bg-card text-foreground shadow-2xl rounded-2xl">
        {/* Header */}
        <DialogHeader className="bg-card p-6 shrink-0 space-y-0 border-b border-border">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <DialogTitle className="text-xl font-bold flex items-center gap-2 text-foreground">
                <Link2 className="size-5 text-chart-1" />
                Link Audit Profile
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-xs font-mono break-all max-w-md bg-muted/50 p-2 rounded-lg shadow-2xs">
                {currentUrl}
              </DialogDescription>
            </div>
            <div className="text-right pr-6 sm:pr-0">
              <div className="text-2xl font-black text-chart-1">{count}</div>
              <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Total Usages</div>
            </div>
          </div>
        </DialogHeader>

        {/* Filter / Controls Bar */}
        <div className="p-4 border-b border-border bg-muted/20 flex gap-2 shrink-0">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Filter these pages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 bg-background shadow-2xs border-border"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-35 h-9 bg-background shadow-2xs border-border">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-popover text-popover-foreground border-border shadow-xl rounded-xl">
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="ACTIVE">Active Only</SelectItem>
              <SelectItem value="STALE">Stale Only</SelectItem>
              <SelectItem value="UNLINKED">Unlinked Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-muted/10">
          {filteredInstances.length > 0 ? (
            filteredInstances.map((inst, i) => (
              <div
                key={`${inst.parentUrl}-${i}`}
                className="flex items-center justify-between p-3 rounded-xl border border-border bg-card hover:border-border/80 shadow-2xs transition-all group"
              >
                <div className="flex flex-col min-w-0 pr-4">
                  <span className="text-xs font-bold text-foreground truncate">{inst.parentUrl}</span>
                  <span className="text-[11px] text-muted-foreground italic truncate">
                    {inst.anchor ? `"${inst.anchor}"` : "— No anchor text —"}
                  </span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[9px] h-5 px-1.5 uppercase font-bold shadow-2xs",
                      inst.status === "ACTIVE" && "bg-chart-2/10 text-chart-2",
                      inst.status === "STALE" && "bg-chart-1/10 text-chart-1",
                      inst.status === "UNLINKED" && "bg-muted text-muted-foreground"
                    )}
                  >
                    {inst.status}
                  </Badge>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg shadow-2xs"
                    onClick={() => window.open(inst.parentUrl, "_blank", "noopener noreferrer")}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground gap-2">
              <Search size={32} strokeWidth={1} />
              <p className="text-sm">No matching instances found.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <DialogFooter className="mx-0 mb-0 flex-row items-center justify-between rounded-none border-t border-border bg-card p-4 sm:justify-between">
          <p className="text-[10px] text-muted-foreground font-medium italic">
            Scan complete. Displaying all unique occurrences in the registry.
          </p>
          <DialogClose asChild>
            <Button size="sm" className="px-6 shadow-2xs">
              Done
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
