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

export const COLOR_MAP: Record<string, { bg: string; text: string }> = {
  "Exact Match": { bg: "bg-sky-100", text: "text-sky-800" },
  "Partial Match": { bg: "bg-rose-100", text: "text-rose-800" },
  Branded: { bg: "bg-amber-100", text: "text-amber-800" },
  Generic: { bg: "bg-green-100", text: "text-green-800" },
  "Naked URL": { bg: "bg-blue-100", text: "text-blue-800" },
};

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
            <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
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
            <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
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
      const colorSet = COLOR_MAP[anchorType] || { bg: "bg-gray-100", text: "text-gray-700" };

      return <Badge className={cn(colorSet.bg, colorSet.text)}>{anchorType}</Badge>;
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
      className="flex items-center justify-between cursor-pointer group hover:bg-slate-50 p-2 -m-2 transition-colors"
      onClick={onToggle}
    >
      <div className="flex-1 truncate">{value}</div>
      <Button variant="link" className="text-slate-600" aria-label={isExpanded ? "Collapse cell" : "Expand cell"}>
        {isExpanded ? <ChevronUp /> : <ChevronDown />}
      </Button>
    </div>
  );
}

function AnchorList({ title, items }: { title: string; items: LinkDetail[] }) {
  if (items.length === 0) {
    return <div className="text-xs text-slate-500 italic">No {title.toLowerCase()} links</div>;
  }

  return (
    <div className="space-y-2">
      <div className="text-sm font-semibold text-slate-700">{title}</div>

      <ScrollArea className="h-40 rounded border border-slate-200">
        <div className="space-y-2 p-2 text-xs">
          {items.map((link) => (
            <div key={link.id} className="rounded bg-slate-50 p-2 space-y-1">
              <div className="font-medium text-slate-700">{link.anchorText}</div>

              <div className="text-slate-500 truncate">
                Anchor URL:{" "}
                <a href={link.anchorUrl} target="_blank" className="text-blue-600 underline">
                  {link.anchorUrl}
                </a>
              </div>

              <div className="text-slate-500 truncate">Content URL: {link.contentUrl}</div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
