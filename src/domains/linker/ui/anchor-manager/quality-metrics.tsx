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
    <div className="space-y-3 rounded-xl border bg-card p-4 shadow-2xs transition-all hover:shadow-xs">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-foreground leading-tight">{label}</span>
        <Badge variant={badgeVariant} className="font-semibold px-2.5 py-0.5 shadow-2xs">
          {value}%
        </Badge>
      </div>
      <Progress value={value} className="h-2 bg-muted" />
      <p className="text-xs text-muted-foreground leading-normal">{helperText}</p>
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
    <Card className=" bg-card shadow-2xs">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold tracking-tight text-foreground">Anchor Quality Metrics</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Analysis of anchor text health and SEO impact
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
