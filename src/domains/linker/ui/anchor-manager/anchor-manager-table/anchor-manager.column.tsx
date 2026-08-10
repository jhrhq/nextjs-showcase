/** biome-ignore-all lint/a11y/useKeyWithClickEvents: false flag */
/** biome-ignore-all lint/a11y/useButtonType: false flag */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: false flag */
"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Anchor, LinkDetail } from "@/domains/linker/types/anchor-manager.types";
import { cn } from "@/lib/utils";
import { getAnchorColors } from "../distribution-analysis-card";

export const anchorColumns: ColumnDef<Anchor>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
  },
  {
    accessorKey: "anchorText",
    header: "Anchor",
    cell: ({ getValue }) => <span className="font-medium text-foreground">{getValue() as string}</span>,
  },
  {
    accessorKey: "inbound",
    header: "Internal",
    cell: ({ getValue, cell, row }) => {
      const content = <AnchorList title="Internal Links" items={row.original.inbound} />;
      const totalInbounds = getValue() as LinkDetail[];
      return (
        <ExpandableCell
          value={
            <span className="inline-flex items-center rounded-full border border-chart-1/20 bg-chart-1/10 px-2.5 py-0.5 text-xs font-semibold text-chart-1 shadow-2xs">
              {totalInbounds.length}
            </span>
          }
          isExpanded={cell.getIsExpanded()}
          onToggle={() => cell.toggleExpanded(content)}
        />
      );
    },
    filterFn: "equals",
  },
  {
    accessorKey: "outbound",
    header: "External",
    cell: ({ getValue, cell, row }) => {
      const content = <AnchorList title="External Links" items={row.original.outbound} />;
      const totalOutbounds = getValue() as LinkDetail[];
      return (
        <ExpandableCell
          value={
            <span className="inline-flex items-center rounded-full border border-chart-2/20 bg-chart-2/10 px-2.5 py-0.5 text-xs font-semibold text-chart-2 shadow-2xs">
              {totalOutbounds.length}
            </span>
          }
          isExpanded={cell.getIsExpanded()}
          onToggle={() => cell.toggleExpanded(content)}
        />
      );
    },
    filterFn: "equals",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ getValue }) => {
      const anchorType = getValue() as string;
      const colors = getAnchorColors(anchorType);
      return (
        <Badge variant="outline" className={cn("font-medium shadow-2xs border", colors.badge)}>
          {anchorType}
        </Badge>
      );
    },
  },
];

function ExpandableCell({
  value,
  isExpanded,
  onToggle,
}: {
  value: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="flex items-center justify-between cursor-pointer group p-1.5 -m-1.5 transition-colors rounded-lg hover:bg-accent hover:text-accent-foreground"
      onClick={onToggle}
    >
      <div className="flex-1 truncate">{value}</div>
      <Button
        variant="ghost"
        size="icon"
        className="size-7 text-muted-foreground hover:text-foreground hover:bg-accent p-0"
        aria-label={isExpanded ? "Collapse cell" : "Expand cell"}
      >
        {isExpanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
      </Button>
    </div>
  );
}

function AnchorList({ title, items }: { title: string; items: LinkDetail[] }) {
  if (items.length === 0) {
    return <div className="text-xs text-muted-foreground italic px-1 py-2">No {title.toLowerCase()} links</div>;
  }

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-sm font-medium tracking-tight text-foreground">{title}</h3>
        <span className="text-xs text-muted-foreground">
          {items.length} {items.length === 1 ? "item" : "items"}
        </span>
      </div>

      <ScrollArea className="h-60 rounded-xl border border-border bg-muted/20 shadow-2xs">
        <div className="space-y-2 p-2.5 text-xs">
          {items.map((link) => (
            <div
              key={link.id}
              className="group rounded-lg border border-border bg-card p-3.5 shadow-2xs transition-all hover:border-primary/40 hover:shadow-xs"
            >
              <div className="font-semibold text-foreground leading-snug">{link.anchorText}</div>

              <div className="mt-2.5 space-y-1.5 text-muted-foreground">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="font-medium shrink-0 text-foreground/80">Anchor URL:</span>
                  <a
                    href={link.anchorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate font-mono text-primary hover:underline hover:text-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm"
                  >
                    {link.anchorUrl}
                  </a>
                </div>

                <div className="flex items-center gap-1.5 truncate">
                  <span className="font-medium shrink-0 text-foreground/80">Content URL:</span>
                  <span className="truncate font-mono text-muted-foreground/90">{link.contentUrl}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
