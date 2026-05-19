"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

type TypeDistributionItem = {
  name: string;
  count: number;
};

export function DistributionAnalysisCard({ data }: { data: TypeDistributionItem[] }) {
  const total = React.useMemo(() => {
    return data.reduce((sum, item) => sum + item.count, 0);
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Anchor Text Distribution Analysis</CardTitle>
        <CardDescription>
          {total.toLocaleString()} total entries across {data.length} active categories
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-[320px_1fr]">
        {/* Pie Chart Component */}
        <PieCard data={data} />

        {/* Breakdown List */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Breakdown</h3>
          {data.map((item) => (
            <BreakdownCard key={item.name} item={item} total={total} />
          ))}

          {/* Total row */}
          <Card className="bg-muted/60 px-4 py-3 font-medium">
            <div className="flex items-center justify-between">
              <span>Total</span>
              <Badge>{total.toLocaleString()}</Badge>
            </div>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}

type PieCardProps = {
  data: TypeDistributionItem[];
};

export function PieCard({ data }: PieCardProps) {
  // 1. Generate dynamic ChartConfig and map data to use chart color variables
  const { chartConfig, processedData } = React.useMemo(() => {
    const config: ChartConfig = {};

    const processed = data.map((item, index) => {
      // Creates a safe key name string (e.g., "Exact Match" -> "exact-match")
      const configKey = item.name.toLowerCase().replace(/[^a-z0-9]/g, "-");

      // Rotates through shadcn theme chart colors (var(--chart-1), var(--chart-2), etc.)
      const colorIndex = (index % 5) + 1;

      config[configKey] = {
        label: item.name,
        color: `var(--chart-${colorIndex})`,
      };

      return {
        ...item,
        fill: `var(--color-${configKey})`,
      };
    });

    return { chartConfig: config, processedData: processed };
  }, [data]);

  // 2. Calculate grand total for center label display
  const totalEntries = React.useMemo(() => {
    return data.reduce((sum, item) => sum + item.count, 0);
  }, [data]);

  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[260px] w-full">
      <PieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Pie data={processedData} dataKey="count" nameKey="name" innerRadius={70} outerRadius={100} strokeWidth={5}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                    <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                      {totalEntries.toLocaleString()}
                    </tspan>
                    <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground text-xs">
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

const COLOR_MAP: Record<string, string> = {
  "Exact Match": "#38bdf8", // Indigo
  "Partial Match": "#fb7185", // Pink
  Branded: "#facc15", // Amber
  Generic: "#86efac", // Green
  "Naked URL": "#3B82F6", // Blue
};
type BreakdownCardProps = {
  item: TypeDistributionItem;
  total: number;
};
export function BreakdownCard({ item, total }: BreakdownCardProps) {
  const percent = Math.round((item.count / total) * 100);

  return (
    <Card className=" bg-muted/40 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLOR_MAP[item.name] || "#9CA3AF" }} />
          <div>
            <div className="text-sm">{item.name}</div>
            <div className="text-xs text-muted-foreground">{percent}%</div>
          </div>
        </div>
        <Badge variant="secondary">{item.count}</Badge>
      </div>
    </Card>
  );
}
