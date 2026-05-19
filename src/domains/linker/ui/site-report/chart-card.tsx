"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
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
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export function CategoryBarChart({ data }: { data: CategoryDistribution[] }) {
  return (
    <ChartCard title="Content by Category" description="Distribution of posts across categories">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

type SimplePieChartProps = {
  data: { name: string; value: number }[];
  innerRadius?: number;
  outerRadius?: number;
};

function SimplePieChart({ data, innerRadius = 60, outerRadius = 100 }: SimplePieChartProps) {
  // 1. Generate dynamic configurations and data attributes dynamically
  const { chartConfig, processedData } = React.useMemo(() => {
    const config: ChartConfig = {};

    const processed = data.map((item, index) => {
      // Formats strings securely into a style-friendly identifier (e.g., "Internal Links" -> "internal-links")
      const configKey = item.name.toLowerCase().replace(/[^a-z0-9]/g, "-");

      // Cycle safely through shadcn color variables 1 through 5
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
    // 2. Wrap using the chart container instance matching your original layout parameters
    <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px] w-full">
      <PieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Pie
          data={processedData}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={5}
          dataKey="value"
          nameKey="name"
          label={({ name, percent = 0 }) => `${name} ${(percent * 100).toFixed(0)}%`}
        />
        <Legend verticalAlign="bottom" height={36} iconType="circle" className="text-xs" />
      </PieChart>
    </ChartContainer>
  );
}

// 3. Simple layout framework card matching the context profile target
export function LinksDistributionPieChart({ data }: { data: { name: string; value: number }[] }) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-2">
        <CardTitle>Link Distribution</CardTitle>
        <CardDescription>Internal vs External links breakdown</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <SimplePieChart data={data} />
      </CardContent>
    </Card>
  );
}
