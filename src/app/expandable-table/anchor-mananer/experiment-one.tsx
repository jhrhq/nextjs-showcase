"use client";

import { BookOpen, Download, MoreHorizontal, PlayCircle, SlidersHorizontal } from "lucide-react";
import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const PIE_DATA = [
  { name: "Branded Keyword", value: 90, percent: 23.4, color: "#38bdf8" },
  { name: "Full‑Part Match", value: 20, percent: 5.2, color: "#22d3ee" },
  { name: "Partial Match", value: 191, percent: 49.7, color: "#fb7185" },
  { name: "Other Anchor", value: 51, percent: 13.3, color: "#86efac" },
  { name: "Exact Anchor", value: 17, percent: 4.4, color: "#facc15" },
];

export default function AnchorManagerPage() {
  const [search, setSearch] = React.useState("");

  const anchors = [
    { id: 1, text: "Your Bissell carpet cleaner", internal: 1, external: 0, type: "Branded Keyword" },
    {
      id: 2,
      text: "replace the motor on your Bissell carpet cleaner",
      internal: 1,
      external: 0,
      type: "Branded Keyword",
    },
    { id: 3, text: "clothes smell like pee", internal: 1, external: 0, type: "Full‑Part Match" },
    { id: 4, text: "white clothes turning pink", internal: 1, external: 0, type: "Full‑Part Match" },
    { id: 5, text: "tile cleaning tips and tricks", internal: 1, external: 0, type: "Partial Match" },
    { id: 6, text: "clean grout from tile", internal: 1, external: 0, type: "Partial Match" },
    { id: 7, text: "how to clean tile grout", internal: 1, external: 0, type: "Partial Match" },
    { id: 8, text: "cleaning tile grout benefits", internal: 1, external: 0, type: "Branded Keyword" },
  ];

  const filtered = anchors.filter((a) => a.text.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-primary/10 p-2 text-primary">⚓</div>
          <div>
            <h1 className="text-2xl font-semibold">Anchor Manager</h1>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Optimize your anchor text distribution across your website. This tool helps you manage all your anchor
              texts, ensuring they are relevant, diverse, and properly distributed to maximize SEO impact.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>Credits: 209 out of 10900</span>
        </div>
      </div>

      {/* Helper actions */}
      <div className="flex items-center justify-between rounded-xl bg-muted/40 p-4">
        <div className="flex gap-2">
          <Button variant="secondary" size="sm">
            <PlayCircle className="mr-2 h-4 w-4" /> Watch Tutorial
          </Button>
          <Button variant="secondary" size="sm">
            <BookOpen className="mr-2 h-4 w-4" /> Read Full Guide
          </Button>
        </div>
        <Button variant="outline" size="sm">
          Update Content in Realtime?
        </Button>
      </div>

      {/* Distribution Card */}
      <Card>
        <CardHeader>
          <CardTitle>Anchor Text Distribution Analysis</CardTitle>
          <CardDescription>384 total entries across 9 active categories</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-[320px_1fr]">
          {/* Pie */}
          <div className="relative h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={PIE_DATA} dataKey="value" nameKey="name" innerRadius={70} outerRadius={110}>
                  {PIE_DATA.map((d, i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-2xl font-semibold">384</div>
              <div className="text-xs text-muted-foreground">Total</div>
            </div>
          </div>

          {/* Breakdown */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Breakdown</h3>
            {PIE_DATA.map((row) => (
              <div key={row.name} className="flex items-center justify-between rounded-lg bg-muted/40 px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: row.color }} />
                  <div>
                    <div className="text-sm">{row.name}</div>
                    <div className="text-xs text-muted-foreground">{row.percent}%</div>
                  </div>
                </div>
                <Badge variant="secondary">{row.value}</Badge>
              </div>
            ))}
            <div className="flex items-center justify-between rounded-lg bg-muted/60 px-4 py-3 font-medium">
              <span>Total</span>
              <Badge>384</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table controls */}
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search all columns..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> Export to CSV
          </Button>
          <Button variant="outline" size="sm">
            <SlidersHorizontal className="mr-2 h-4 w-4" /> View
          </Button>
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Anchor</TableHead>
                <TableHead>Internal</TableHead>
                <TableHead>External</TableHead>
                <TableHead>Type</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.text}</TableCell>
                  <TableCell>{row.internal}</TableCell>
                  <TableCell>{row.external}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{row.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
