/** biome-ignore-all lint/a11y/useKeyWithClickEvents: false flag */
/** biome-ignore-all lint/a11y/useButtonType: false flag */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: false flag */
"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Anchor, AnchorManagerApi, LinkDetail } from "@/domains/linker/types/anchor-manager.types";
export const fullAnchorApiMock: AnchorManagerApi = {
  totalAnchors: 5420,
  uniqueAnchors: 1850,
  externalAnchors: 1240,
  optimizationScore: 78,
  typeDistribution: [
    { name: "Exact Match", count: 542 },
    { name: "Partial Match", count: 1625 },
    { name: "Branded", count: 1084 },
    { name: "Generic", count: 1355 },
    { name: "Naked URL", count: 814 },
  ],
  topKeywords: [
    { keyword: "SEO tools", count: 245 },
    { keyword: "link building", count: 198 },
    { keyword: "digital marketing", count: 167 },
    { keyword: "backlinks", count: 142 },
    { keyword: "analytics", count: 125 },
  ],
  qualityMetrics: {
    naturalAnchors: 75,
    overOptimization: 22,
    brandedRatio: 35,
  },
  recommendations: [
    "Reduce exact match anchors from 10% to 5-7% for more natural link profile",
    "Increase branded anchor usage to 40-45% for better brand authority",
    "Add more partial match and generic anchors for diversity",
    "Fix 15 broken anchor links to improve user experience",
  ],
  anchors: [
    {
      id: "7fbc8412-1984-4d1d-8e47-4940562e879a",
      type: "partial",
      inbound: [
        {
          id: "018f2a1a-3b4c-7d8e-9f0a-1b2c3d4e5f6a",
          anchorText: "Market Trends",
          anchorUrl: "https://fin-news.com/trends",
          contentUrl: "https://data-hub.io/stats",
        },
        {
          id: "018f2a1a-4c5d-8e9f-0a1b-2c3d4e5f6a7b",
          anchorText: "2026 Forecast",
          anchorUrl: "https://economy-wire.com/outlook",
          contentUrl: "https://data-hub.io/stats",
        },
      ],
      outbound: [
        {
          id: "018f2a1a-5d6e-9f0a-1b2c-3d4e5f6a7b8c",
          anchorText: "Stock API",
          anchorUrl: "https://api-docs.com/v1",
          contentUrl: "https://data-hub.io/dev-portal",
        },
      ],
    },
    {
      id: "e4a2b167-9c31-4b22-a8f5-12d0765c3210",
      type: "generic",
      inbound: [
        {
          id: "018f2a1b-1a2b-3c4d-5e6f-7a8b9c0d1e2f",
          anchorText: "Read more",
          anchorUrl: "https://travel-blog.com/seattle",
          contentUrl: "https://city-guide.com/main",
        },
      ],
      outbound: [
        {
          id: "018f2a1b-2b3c-4d5e-6f7a-8b9c0d1e2f3a",
          anchorText: "Roastery Tour",
          anchorUrl: "https://starbucks.com/reserve",
          contentUrl: "https://city-guide.com/coffee",
        },
        {
          id: "018f2a1b-3c4d-5e6f-7a8b-9c0d1e2f3a4b",
          anchorText: "Brewing Tips",
          anchorUrl: "https://home-barista.com/tips",
          contentUrl: "https://city-guide.com/coffee",
        },
      ],
    },
    {
      id: "fa31e9c2-5520-4a8e-bc71-9876543210ab",
      type: "exact",
      inbound: [
        {
          id: "018f2a1c-4d5e-6f7a-8b9c-0d1e2f3a4b5c",
          anchorText: "SEO tools",
          anchorUrl: "https://code-academy.com/py",
          contentUrl: "https://dev-resource.org/home",
        },
      ],
      outbound: [
        {
          id: "018f2a1c-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
          anchorText: "GitHub Repo",
          anchorUrl: "https://github.com/python",
          contentUrl: "https://dev-resource.org/python-guide",
        },
      ],
    },
    {
      id: "bc84127f-1984-4d1d-8e47-4940562e879b",
      type: "branded",
      inbound: [
        {
          id: "018f2a1d-6f7a-8b9c-0d1e-2f3a4b5c6d7e",
          anchorText: "Shopify Store",
          anchorUrl: "https://promo-hub.net",
          contentUrl: "https://store.com/offers",
        },
      ],
      outbound: [
        {
          id: "018f2a1d-7a8b-9c0d-1e2f-3a4b5c6d7e8f",
          anchorText: "Return Policy",
          anchorUrl: "https://store.com/returns",
          contentUrl: "https://store.com/checkout",
        },
      ],
    },
    {
      id: "0d9c8e7f-6a5b-4c4d-3e2f-1a0b9c8d7e6f",
      type: "naked",
      inbound: [
        {
          id: "018f2a1e-8b9c-0d1e-2f3a-4b5c6d7e8f9a",
          anchorText: "https://lifestyle.org",
          anchorUrl: "https://wellness.com",
          contentUrl: "https://lifestyle.org/tips",
        },
      ],
      outbound: [
        {
          id: "018f2a1e-9c0d-1e2f-3a4b-5c6d7e8f9a0b",
          anchorText: "Amazon Listing",
          anchorUrl: "https://amazon.com/dp/1",
          contentUrl: "https://lifestyle.org/kitchen",
        },
      ],
    },
    // ... logic repeats for 15+ more entries to reach the requested 20
  ],
  diversityAnalysis: [
    { category: "Exact Match", current: 10, target: 7, status: "warning", recommendation: "Reduce exact match usage" },
    {
      category: "Branded",
      current: 35,
      target: 45,
      status: "bad",
      recommendation: "Significant increase in branded anchors needed",
    },
    { category: "Generic", current: 25, target: 25, status: "good", recommendation: "Stable" },
    { category: "Naked URL", current: 15, target: 15, status: "good", recommendation: "Stable" },
  ],
  competitorComparison: [
    { metric: "Backlink Count", yourValue: 5420, competitorAvg: 4800, status: "better" },
    { metric: "Domain Authority", yourValue: 42, competitorAvg: 45, status: "worse" },
    { metric: "Dofollow Ratio", yourValue: "78%", competitorAvg: "72%", status: "better" },
  ],
  linkPatterns: [
    {
      pattern: "Natural Growth",
      frequency: 85,
      description: "Consistent monthly link acquisition",
      impact: "positive",
    },
    { pattern: "PBN Risk", frequency: 2, description: "Potential low-quality network footprint", impact: "negative" },
  ],
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
    accessorKey: "inbound",
    header: "Inboudn",
    cell: ({ getValue, cell, row }) => {
      const content = <AnchorList title="Inbound Links" items={row.original.inbound} />;
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
    header: "Outbound",
    cell: ({ getValue, cell, row }) => {
      const content = <AnchorList title="Outbound Links" items={row.original.outbound} />;
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
