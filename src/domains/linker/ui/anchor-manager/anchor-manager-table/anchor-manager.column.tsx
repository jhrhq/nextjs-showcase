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
            <span className="inline-flex rounded-full bg-blue-100 dark:bg-blue-950/40 px-2 py-1 text-xs font-medium text-blue-800 dark:text-blue-400">
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
            <span className="inline-flex rounded-full bg-blue-100 dark:bg-blue-950/40 px-2 py-1 text-xs font-medium text-blue-800 dark:text-blue-400">
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

      return <Badge className={cn("rounded-md border-0", colors.badge)}>{anchorType}</Badge>;
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
      className="flex items-center justify-between cursor-pointer group hover:bg-zinc-50 dark:hover:bg-zinc-900 p-2 -m-2 transition-colors rounded"
      onClick={onToggle}
    >
      <div className="flex-1 truncate">{value}</div>
      <Button
        variant="link"
        className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 p-0 h-auto"
        aria-label={isExpanded ? "Collapse cell" : "Expand cell"}
      >
        {isExpanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
      </Button>
    </div>
  );
}

function AnchorList({ title, items }: { title: string; items: LinkDetail[] }) {
  if (items.length === 0) {
    return <div className="text-xs text-zinc-500 dark:text-zinc-500 italic">No {title.toLowerCase()} links</div>;
  }

  return (
    <div className="space-y-2">
      <div className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{title}</div>
      <ScrollArea className="h-40 rounded border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="space-y-2 p-2 text-xs">
          {items.map((link) => (
            <div
              key={link.id}
              className="rounded bg-zinc-50 dark:bg-zinc-900 p-2 space-y-1 border border-transparent dark:border-zinc-800/50"
            >
              <div className="font-medium text-zinc-700 dark:text-zinc-200">{link.anchorText}</div>
              <div className="text-zinc-500 dark:text-zinc-400 truncate">
                Anchor URL:{" "}
                <a
                  href={link.anchorUrl}
                  target="_blank"
                  className="text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300"
                  rel="noopener"
                >
                  {link.anchorUrl}
                </a>
              </div>
              <div className="text-zinc-500 dark:text-zinc-400 truncate">Content URL: {link.contentUrl}</div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
