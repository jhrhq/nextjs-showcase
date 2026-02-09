"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { QualityMetrics } from "@/domains/linker/types/anchor-manager.types";
import type { BadgeVariant } from "@/types/shared/variants.types";

type QualityMetricProps = {
  label: string;
  value: number;
  badgeVariant: BadgeVariant;
  helperText: string;
};

export function QualityMetric({ label, value, badgeVariant, helperText }: QualityMetricProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <Badge variant={badgeVariant}>{value}%</Badge>
      </div>

      <Progress value={value} className="h-2" />

      <p className="text-xs text-gray-500">{helperText}</p>
    </div>
  );
}

type QualityMetricItem = {
  key: string;
  label: string;
  value: number;
  badgeVariant: BadgeVariant;
  helperText: string;
};
const getAnchorMetrics = (metrics: { naturalAnchors: number; overOptimization: number; brandedRatio: number }) =>
  [
    {
      key: "natural",
      label: "Natural Anchors",
      value: metrics.naturalAnchors,
      badgeVariant: "default",
      helperText: "Good anchor text diversity",
    },
    {
      key: "overOptimization",
      label: "Over-Optimization",
      value: metrics.overOptimization,
      badgeVariant: metrics.overOptimization > 30 ? "destructive" : "secondary",
      helperText: metrics.overOptimization > 30 ? "Reduce exact match anchors" : "Healthy distribution",
    },
    {
      key: "branded",
      label: "Branded Ratio",
      value: metrics.brandedRatio,
      badgeVariant: "outline",
      helperText: "Good brand presence",
    },
  ] as QualityMetricItem[];

export function QualityMetricCard({ data }: { data: QualityMetrics }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Anchor Quality Metrics</CardTitle>
        <CardDescription>Analysis of anchor text health and SEO impact</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {getAnchorMetrics(data).map((metric) => (
            <QualityMetric
              key={metric.key}
              label={metric.label}
              value={metric.value}
              badgeVariant={metric.badgeVariant}
              helperText={metric.helperText}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
