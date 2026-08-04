"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { CategoryDistribution } from "@/domains/linker/types/site-report.types";

type ChartCardProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export function ChartCard({ title, description, children }: ChartCardProps) {
  return (
    <Card className="flex flex-col h-full border border-border bg-card shadow-2xs transition-all">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold tracking-tight text-foreground">{title}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pt-2 pb-4">{children}</CardContent>
    </Card>
  );
}

const categoryChartConfig = {
  count: {
    label: "Posts",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function CategoryBarChart({ data }: { data: CategoryDistribution[] }) {
  return (
    <ChartCard title="Content by Category" description="Distribution of posts across categories">
      <ChartContainer config={categoryChartConfig} className="h-[280px] w-full">
        <BarChart data={data} margin={{ top: 16, right: 12, left: -20, bottom: 0 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border/50" />
          <XAxis
            dataKey="category"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            className="text-xs font-medium fill-muted-foreground"
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            className="text-xs font-medium fill-muted-foreground"
            allowDecimals={false}
          />
          <ChartTooltip
            cursor={{ fill: "var(--accent)", opacity: 0.4 }}
            content={<ChartTooltipContent indicator="dashed" />}
          />
          <Bar dataKey="count" fill="var(--color-count)" radius={[6, 6, 0, 0]} maxBarSize={48} />
        </BarChart>
      </ChartContainer>
    </ChartCard>
  );
}

type SimplePieChartProps = {
  data: { name: string; value: number }[];
  innerRadius?: number;
  outerRadius?: number;
};

function SimplePieChart({ data, innerRadius = 55, outerRadius = 95 }: SimplePieChartProps) {
  const { chartConfig, processedData } = React.useMemo(() => {
    const config: ChartConfig = {};
    const processed = data.map((item, index) => {
      const configKey = item.name.toLowerCase().replace(/[^a-z0-9]/g, "-");
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

  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[280px] w-full">
      <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Pie
          data={processedData}
          cx="50%"
          cy="45%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={4}
          dataKey="value"
          nameKey="name"
          stroke="var(--background)"
          strokeWidth={2}
          labelLine={false}
          label={({ name, percent = 0 }) => (percent > 0.05 ? `${name} ${(percent * 100).toFixed(0)}%` : "")}
        >
          {processedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <Legend
          verticalAlign="bottom"
          height={32}
          iconType="circle"
          iconSize={8}
          formatter={(value) => <span className="text-xs font-medium text-muted-foreground">{value}</span>}
        />
      </PieChart>
    </ChartContainer>
  );
}

export function LinksDistributionPieChart({ data }: { data: { name: string; value: number }[] }) {
  return (
    <ChartCard title="Link Distribution" description="Internal vs External links breakdown">
      <SimplePieChart data={data} />
    </ChartCard>
  );
}
