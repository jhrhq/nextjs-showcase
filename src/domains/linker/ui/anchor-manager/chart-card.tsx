"use client";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { TypeDistributionItem } from "@/domains/linker/types/anchor-manager.types";

interface ChartCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

function ChartCard({ title, description, children }: ChartCardProps) {
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

interface AnchorTypeDistributionChartProps {
  data: { name: string; count: number }[];
}

const formatPieLabel = ({ name, percent }: { name: string; percent: number }) =>
  `${name} ${(percent * 100).toFixed(0)}%`;

const COLORS = ["#38bdf8", "#22d3ee", "#fb7185", "#86efac", "#facc15"];

const pieColors = COLORS;

function AnchorTypeDistributionChart({ data }: AnchorTypeDistributionChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={5}
          dataKey="count"
          label={formatPieLabel}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function AnchorChartsSection({ data }: { data: TypeDistributionItem[] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ChartCard title="Anchor Type Distribution" description="Breakdown by anchor text type">
        <AnchorTypeDistributionChart data={data} />
      </ChartCard>
    </div>
  );
}
