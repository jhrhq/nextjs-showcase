"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import type { Anchor, AnchorType } from "../../types/anchor-manager.types";

type AnchorUIType = AnchorType | "Other";

export const ANCHOR_COLOR_MAP: Record<
  AnchorUIType,
  {
    chart: string;
    badge: string;
    dot: string;
  }
> = {
  "Exact Match": {
    chart: "var(--chart-1)",
    badge: "bg-chart-1/10 text-chart-1 border-chart-1/20",
    dot: "bg-chart-1",
  },
  "Partial Match": {
    chart: "var(--chart-2)",
    badge: "bg-chart-2/10 text-chart-2 border-chart-2/20",
    dot: "bg-chart-2",
  },
  Branded: {
    chart: "var(--chart-3)",
    badge: "bg-chart-3/10 text-chart-3 border-chart-3/20",
    dot: "bg-chart-3",
  },
  Generic: {
    chart: "var(--chart-4)",
    badge: "bg-chart-4/10 text-chart-4 border-chart-4/20",
    dot: "bg-chart-4",
  },
  "Naked URL": {
    chart: "var(--chart-5)",
    badge: "bg-chart-5/10 text-chart-5 border-chart-5/20",
    dot: "bg-chart-5",
  },
  Other: {
    chart: "var(--chart-5)",
    badge: "bg-muted text-muted-foreground border-border",
    dot: "bg-muted-foreground",
  },
} as const;

export function getAnchorColors(type: string) {
  return ANCHOR_COLOR_MAP[type as AnchorUIType] || ANCHOR_COLOR_MAP.Other;
}

type TypeDistributionItem = {
  name: Anchor["type"];
  count: number;
};

export function DistributionAnalysisCard({ data }: { data: TypeDistributionItem[] }) {
  const total = React.useMemo(() => {
    return data.reduce((sum, item) => sum + item.count, 0);
  }, [data]);

  return (
    <Card className="rounded-2xl bg-card shadow-2xs">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold tracking-tight text-foreground">
          Anchor Text Distribution Analysis
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {total.toLocaleString()} total entries across {data.length} active categories
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-[320px_1fr] items-center">
        <PieCard data={data} />
        <div className="space-y-2.5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1">Breakdown</h3>
          <div className="space-y-2">
            {data.map((item) => (
              <BreakdownCard key={item.name} item={item} total={total} />
            ))}
          </div>
          <div className="flex items-center justify-between rounded-xl  bg-muted/40 px-4 py-3 font-medium text-sm text-foreground">
            <span>Total Entries</span>
            <Badge variant="outline" className="rounded-full bg-background font-semibold px-3 ">
              {total.toLocaleString()}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

type PieCardProps = {
  data: TypeDistributionItem[];
};

export function PieCard({ data }: PieCardProps) {
  const { chartConfig, processedData } = React.useMemo(() => {
    const config: ChartConfig = {};
    const processed = data.map((item) => {
      const configKey = item.name.toLowerCase().replace(/[^a-z0-9]/g, "-");
      const colors = getAnchorColors(item.name);
      config[configKey] = {
        label: item.name,
      };
      return {
        ...item,
        fill: colors.chart,
      };
    });
    return { chartConfig: config, processedData: processed };
  }, [data]);

  const totalEntries = React.useMemo(() => {
    return data.reduce((sum, item) => sum + item.count, 0);
  }, [data]);

  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-64 w-full">
      <PieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Pie
          data={processedData}
          dataKey="count"
          nameKey="name"
          innerRadius={70}
          outerRadius={95}
          stroke="var(--card)"
          strokeWidth={4}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-semibold tracking-tight"
                    >
                      {totalEntries.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 22}
                      className="fill-muted-foreground text-xs font-medium uppercase tracking-wider"
                    >
                      Total
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}

type BreakdownCardProps = {
  item: TypeDistributionItem;
  total: number;
};

export function BreakdownCard({ item, total }: BreakdownCardProps) {
  const percent = total > 0 ? Math.round((item.count / total) * 100) : 0;
  const colors = getAnchorColors(item.name);

  return (
    <div className="flex items-center justify-between rounded-xl bg-card p-3 shadow-2xs transition-all border hover:shadow-xs">
      <div className="flex items-center gap-3">
        <span className={cn("size-2.5 rounded-full shrink-0", colors.dot)} />
        <div>
          <div className="text-sm font-medium text-foreground leading-tight">{item.name}</div>
          <div className="text-xs text-muted-foreground mt-0.5">{percent}% of overall anchor profile</div>
        </div>
      </div>
      <Badge
        variant="outline"
        className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium border shadow-2xs", colors.badge)}
      >
        {item.count.toLocaleString()}
      </Badge>
    </div>
  );
}
