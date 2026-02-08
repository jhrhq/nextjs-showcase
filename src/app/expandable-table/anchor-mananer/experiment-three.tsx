"use client";

import { type ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface AnchorUsage {
  contentUrl: string;
  anchorText: string;
  anchorUrl: string;
  direction: "Inbound" | "Outbound";
  placement: "Body" | "Footer" | "Sidebar" | "Nav";
  intent: "Informational" | "Commercial" | "Navigational";
  rel: "follow" | "nofollow" | "ugc" | "sponsored";
  status: "Healthy" | "Cannibalized" | "Orphaned" | "Risky";
}

interface AnchorSummary {
  id: number;
  anchor: string;
  type: string;
  destinations: number;
  usageCount: number;
}

/* =============================
   DATA (REALISTIC VARIETY)
============================= */

const anchorSummaries: AnchorSummary[] = [
  { id: 1, anchor: "how to clean tile grout", type: "Exact", destinations: 3, usageCount: 14 },
  { id: 2, anchor: "tile cleaning tips", type: "Partial", destinations: 4, usageCount: 11 },
  { id: 3, anchor: "professional tile cleaning", type: "Commercial", destinations: 2, usageCount: 6 },
  { id: 4, anchor: "click here", type: "Generic", destinations: 5, usageCount: 9 },
  { id: 5, anchor: "brand tile services", type: "Branded", destinations: 1, usageCount: 7 },
];

const anchorUsages: AnchorUsage[] = [
  {
    contentUrl: "/blog/tile-guide",
    anchorText: "how to clean tile grout",
    anchorUrl: "/guides/grout-cleaning",
    direction: "Inbound",
    placement: "Body",
    intent: "Informational",
    rel: "follow",
    status: "Healthy",
  },
  {
    contentUrl: "/blog/grout-mistakes",
    anchorText: "how to clean tile grout",
    anchorUrl: "/services/grout-cleaning",
    direction: "Inbound",
    placement: "Body",
    intent: "Commercial",
    rel: "follow",
    status: "Cannibalized",
  },
  {
    contentUrl: "/services/tile-cleaning",
    anchorText: "tile cleaning tips",
    anchorUrl: "/blog/tile-maintenance",
    direction: "Outbound",
    placement: "Sidebar",
    intent: "Informational",
    rel: "nofollow",
    status: "Healthy",
  },
  {
    contentUrl: "/blog/seo-basics",
    anchorText: "click here",
    anchorUrl: "/contact",
    direction: "Outbound",
    placement: "Footer",
    intent: "Navigational",
    rel: "follow",
    status: "Risky",
  },
  {
    contentUrl: "/home",
    anchorText: "brand tile services",
    anchorUrl: "/services/tile-cleaning",
    direction: "Inbound",
    placement: "Nav",
    intent: "Commercial",
    rel: "follow",
    status: "Healthy",
  },
  {
    contentUrl: "/old-blog",
    anchorText: "tile cleaning tips",
    anchorUrl: "/services/tile-cleaning",
    direction: "Inbound",
    placement: "Body",
    intent: "Commercial",
    rel: "nofollow",
    status: "Orphaned",
  },
];

const DISTRIBUTION = [
  { name: "Exact", value: 28, color: "#ef4444" },
  { name: "Partial", value: 34, color: "#facc15" },
  { name: "Branded", value: 18, color: "#22c55e" },
  { name: "Generic", value: 20, color: "#38bdf8" },
];

export default function AnchorManagerPageThree() {
  const summaryColumns = React.useMemo<ColumnDef<AnchorSummary>[]>(
    () => [
      { accessorKey: "anchor", header: "Anchor Text" },
      { accessorKey: "type", header: "Type" },
      { accessorKey: "destinations", header: "Destinations" },
      { accessorKey: "usageCount", header: "Total Uses" },
      {
        id: "actions",
        header: "",
        cell: () => (
          <Button>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        ),
      },
    ],
    []
  );

  const usageColumns = React.useMemo<ColumnDef<AnchorUsage>[]>(
    () => [
      { accessorKey: "contentUrl", header: "Content URL" },
      { accessorKey: "anchorText", header: "Anchor Text" },
      { accessorKey: "anchorUrl", header: "Anchor URL" },
      { accessorKey: "placement", header: "Placement" },
      { accessorKey: "intent", header: "Intent" },
      { accessorKey: "direction", header: "Direction", cell: (i) => <Badge>{i.getValue() as string}</Badge> },
      { accessorKey: "rel", header: "Rel", cell: (i) => <Badge>{i.getValue() as string}</Badge> },
      { accessorKey: "status", header: "SEO Status", cell: (i) => <Badge>{i.getValue() as string}</Badge> },
    ],
    []
  );

  const summaryTable = useReactTable({
    data: anchorSummaries,
    columns: summaryColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const usageTable = useReactTable({
    data: anchorUsages,
    columns: usageColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Anchor Text Distribution</CardTitle>
          <CardDescription>Distribution by anchor category</CardDescription>
        </CardHeader>
        <CardContent className="h-65">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={DISTRIBUTION} dataKey="value" innerRadius={60} outerRadius={100}>
                {DISTRIBUTION.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Anchor Summary</CardTitle>
          <CardDescription>Many-to-many anchor overview</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              {summaryTable.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id}>
                  {hg.headers.map((h) => (
                    <TableHead key={h.id}>{h.column.columnDef.header as string}</TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {summaryTable.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{cell.renderValue() as string}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Anchor Usage Details</CardTitle>
          <CardDescription>Each anchor usage instance</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              {usageTable.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id}>
                  {hg.headers.map((h) => (
                    <TableHead key={h.id}>{h.column.columnDef.header as string}</TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {usageTable.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{cell.renderValue() as string}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
