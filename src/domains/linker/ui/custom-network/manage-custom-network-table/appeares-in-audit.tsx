"use client";

import type { Row, Table } from "@tanstack/react-table";
import { BarChart2, ExternalLink, Link2, Search } from "lucide-react";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { CustomNetworkCollectionValues } from "@/domains/linker/validations/custom-network.validation";

interface AppearsInAuditProps {
  row: Row<CustomNetworkCollectionValues>;
  table: Table<CustomNetworkCollectionValues>;
  urlUsageMap: Record<string, number>;
}

export function AppearsInAudit({ row, table, urlUsageMap }: AppearsInAuditProps) {
  const currentUrl = row.original.url;
  const count = urlUsageMap[currentUrl] || 0;

  // Safely cast data from table options
  const allData = table.options.data as CustomNetworkCollectionValues[];

  // Memoize the instances calculation for performance
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

  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip delayDuration={200}>
          {/* Tooltip wraps DialogTrigger to avoid nesting conflicts */}
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 gap-1 text-muted-foreground hover:text-primary transition-colors"
                onClick={(e) => e.stopPropagation()} // Prevents row expansion
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

      <DialogContent className="max-w-3xl h-[80vh] flex flex-col p-0 border-none shadow-2xl">
        {/* 1. Header with Stats */}
        <div className="bg-slate-900 p-6 text-white shrink-0">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <DialogTitle className="text-xl font-bold flex items-center gap-2">
                <Link2 className="size-5 text-blue-400" />
                Link Audit Profile
              </DialogTitle>
              <p className="text-slate-400 text-xs font-mono break-all max-w-md bg-slate-800/50 p-2 rounded">
                {currentUrl}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-blue-400">{count}</div>
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Total Usages</div>
            </div>
          </div>
        </div>

        {/* 2. Mini Toolbar */}
        <div className="p-4 border-b bg-slate-50 flex gap-2 shrink-0">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <Input placeholder="Filter these pages..." className="pl-9 h-9 bg-white shadow-sm" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-35 h-9 bg-white shadow-sm">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="ACTIVE">Active Only</SelectItem>
              <SelectItem value="STALE">Stale Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 3. Instance List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-slate-100/30">
          {globalInstances.length > 0 ? (
            globalInstances.map((inst, i) => (
              <div
                key={`${inst.parentUrl}-${i}`}
                className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-white hover:border-blue-300 transition-all group"
              >
                <div className="flex flex-col min-w-0 pr-4">
                  <span className="text-xs font-bold text-slate-800 truncate">{inst.parentUrl}</span>
                  <span className="text-[11px] text-slate-500 italic truncate">
                    {inst.anchor ? `"${inst.anchor}"` : "— No anchor text —"}
                  </span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Badge
                    variant={inst.status === "ACTIVE" ? "default" : "destructive"}
                    className="text-[9px] h-5 px-1.5 uppercase font-bold"
                  >
                    {inst.status}
                  </Badge>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-blue-600">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-2">
              <Search size={32} strokeWidth={1} />
              <p className="text-sm">No external instances found.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-white flex justify-between items-center shrink-0">
          <p className="text-[10px] text-slate-400 font-medium italic">
            Scan complete. Displaying all unique occurrences in the registry.
          </p>
          <DialogClose asChild>
            <Button size="sm" className="px-6">
              Done
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
