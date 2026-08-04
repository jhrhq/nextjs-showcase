"use client";

import { ExternalLink, Link2, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { AnchorManager } from "@/domains/linker/types/anchor-manager.types";

export default function OverviewCard({ data }: { data: AnchorManager }) {
  const totalAnchorsValue = data.totalAnchors.toLocaleString();
  const uniqueAnchorsValue = data.uniqueAnchors.toLocaleString();
  const externalAnchorsValue = data.externalAnchors.toLocaleString();
  const externalAnchorsSubtitle = data.totalAnchors
    ? `${((data.externalAnchors / data.totalAnchors) * 100).toFixed(1)}% of total`
    : "0.0% of total";

  const optimizationScoreValue = data.optimizationScore;
  const optimizationScoreLabel =
    optimizationScoreValue >= 80 ? "Excellent" : optimizationScoreValue >= 60 ? "Good" : "Needs Work";

  const badgeVariantClass =
    optimizationScoreValue >= 80
      ? "bg-chart-2/10 text-chart-2 border-chart-2/20"
      : optimizationScoreValue >= 60
        ? "bg-chart-1/10 text-chart-1 border-chart-1/20"
        : "bg-chart-4/10 text-chart-4 border-chart-4/20";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <OverviewStatCard
        title="Total Anchors"
        icon={<Link2 className="size-4 text-muted-foreground" />}
        value={totalAnchorsValue}
        subtitle="Across all pages"
        valueClassName="text-foreground"
      />
      <OverviewStatCard
        title="Unique Anchors"
        icon={<Link2 className="size-4 text-chart-1" />}
        value={uniqueAnchorsValue}
        subtitle="Different anchor texts"
        valueClassName="text-chart-1"
      />
      <OverviewStatCard
        title="External Anchors"
        icon={<ExternalLink className="size-4 text-chart-2" />}
        value={externalAnchorsValue}
        subtitle={externalAnchorsSubtitle}
        valueClassName="text-chart-2"
      />
      <OverviewStatCard
        title="Optimization Score"
        icon={<TrendingUp className="size-4 text-chart-5" />}
        value={optimizationScoreValue}
        badgeText={optimizationScoreLabel}
        badgeClassName={badgeVariantClass}
        valueClassName="text-chart-5"
      />
    </div>
  );
}

interface OverviewStatCardProps {
  title: string;
  icon: React.ReactNode;
  value: string | number;
  valueClassName?: string;
  subtitle?: string;
  badgeText?: string;
  badgeClassName?: string;
}

function OverviewStatCard({
  title,
  icon,
  value,
  valueClassName = "",
  subtitle,
  badgeText,
  badgeClassName = "",
}: OverviewStatCardProps) {
  return (
    <Card className=" bg-card shadow-2xs transition-all hover:border-primary/30 hover:shadow-xs">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</span>
          <div className="flex size-8 items-center justify-center rounded-full bg-accent/60">{icon}</div>
        </div>
      </CardHeader>
      <CardContent className="space-y-1.5">
        <div className={`text-2xl font-semibold tracking-tight ${valueClassName}`}>{value}</div>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        {badgeText && (
          <Badge variant="outline" className={`mt-1 font-medium shadow-2xs border ${badgeClassName}`}>
            {badgeText}
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}
