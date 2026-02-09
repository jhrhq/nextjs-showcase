"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type DistributionItem = {
  name: string;
  value: number;
  percent: number;
  color: string;
};

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type PieCardProps = {
  data: DistributionItem[];
  height?: number;
};

export function PieCard({ data, height = 260 }: PieCardProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0); // auto total

  return (
    <div className="relative" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={70} outerRadius={110}>
            {data.map((d, i) => (
              <Cell key={i} fill={d.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-2xl font-semibold">{total}</div>
        <div className="text-xs text-muted-foreground">Total</div>
      </div>
    </div>
  );
}

type BreakdownCardProps = {
  item: DistributionItem;
};

export function BreakdownCard({ item }: BreakdownCardProps) {
  return (
    <Card className="rounded-lg bg-muted/40 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
          <div>
            <div className="text-sm">{item.name}</div>
            <div className="text-xs text-muted-foreground">{item.percent}%</div>
          </div>
        </div>
        <Badge variant="secondary">{item.value}</Badge>
      </div>
    </Card>
  );
}

export function DistributionAnalysisCard({ data }: { data: DistributionItem[] }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Anchor Text Distribution Analysis</CardTitle>
        <CardDescription>
          {total} total entries across {data.length} active categories
        </CardDescription>
      </CardHeader>

      <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-[320px_1fr]">
        {/* Pie */}
        <PieCard data={data} />

        {/* Breakdown */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Breakdown</h3>
          {data.map((item) => (
            <BreakdownCard key={item.name} item={item} />
          ))}

          {/* Total row */}
          <Card className="rounded-lg bg-muted/60 px-4 py-3 font-medium">
            <div className="flex items-center justify-between">
              <span>Total</span>
              <Badge>{total}</Badge>
            </div>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
