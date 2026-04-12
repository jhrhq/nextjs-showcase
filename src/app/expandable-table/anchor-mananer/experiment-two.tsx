"use client";

import { type ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

/* =============================
   TYPES
============================= */

interface AnchorUsage {
  contentUrl: string;
  anchorText: string;
  anchorUrl: string;
  direction: "Inbound" | "Outbound";
}

interface AnchorSummary {
  id: number;
  anchor: string;
  type: string;
  internal: number;
  external: number;
}

/* =============================
   DATA (ADJUSTED MODEL)
============================= */

const anchorSummaries: AnchorSummary[] = [
  {
    id: 1,
    anchor: "how to clean tile grout",
    type: "Exact Match",
    internal: 12,
    external: 4,
  },
  {
    id: 2,
    anchor: "tile cleaning tips",
    type: "Partial Match",
    internal: 7,
    external: 2,
  },
];

const anchorUsages: AnchorUsage[] = [
  {
    contentUrl: "/blog/how-to-clean-tile-grout",
    anchorText: "how to clean tile grout",
    anchorUrl: "/how-to-clean-tile-grout",
    direction: "Inbound",
  },
  {
    contentUrl: "/blog/tile-maintenance-guide",
    anchorText: "tile cleaning tips",
    anchorUrl: "/services/tile-cleaning",
    direction: "Outbound",
  },
  {
    contentUrl: "/blog/grout-problems",
    anchorText: "how to clean tile grout",
    anchorUrl: "/how-to-clean-tile-grout",
    direction: "Inbound",
  },
];

const DISTRIBUTION = [
  { name: "Exact", value: 32, color: "#ef4444" },
  { name: "Partial", value: 41, color: "#facc15" },
  { name: "Branded", value: 19, color: "#22c55e" },
  { name: "Generic", value: 8, color: "#38bdf8" },
];

/* =============================
   PAGE
============================= */

export default function AnchorManagerPage() {
  const summaryColumns = React.useMemo<ColumnDef<AnchorSummary>[]>(
    () => [
      { accessorKey: "anchor", header: "Anchor Text" },
      { accessorKey: "type", header: "Type" },
      { accessorKey: "internal", header: "Internal" },
      { accessorKey: "external", header: "External" },
      {
        id: "actions",
        header: "",
        cell: () => (
          <Button>
            <MoreHorizontal className="size-4" />
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
      {
        accessorKey: "direction",
        header: "Direction",
        cell: (info) => <Badge>{info.getValue() as string}</Badge>,
      },
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
          <CardDescription>Overall anchor type split</CardDescription>
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
          <CardDescription>Aggregated internal vs external counts</CardDescription>
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
          <CardDescription>Content URL → anchor → destination URL</CardDescription>
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
