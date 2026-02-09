"use client";

import { ExternalLink, Link2, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import type { AnchorManagerApi } from "@/domains/linker/types/anchor-manager.types";

interface OverviewStatCardProps {
  title: string;
  icon: React.ReactNode;
  value: string | number;
  valueClassName?: string;
  subtitle?: string;
  badgeText?: string;
}

function OverviewStatCard({ title, icon, value, valueClassName = "", subtitle, badgeText }: OverviewStatCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardDescription className="flex items-center gap-2">
          {icon}
          {title}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className={`text-3xl font-bold ${valueClassName}`}>{value}</div>

        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}

        {badgeText && <Badge className="mt-2">{badgeText}</Badge>}
      </CardContent>
    </Card>
  );
}

export default function OverviewCard({ data }: { data: AnchorManagerApi }) {
  const totalAnchorsValue = data.totalAnchors.toLocaleString();
  const uniqueAnchorsValue = data.uniqueAnchors.toLocaleString();
  const externalAnchorsValue = data.externalAnchors.toLocaleString();

  const externalAnchorsSubtitle = data.totalAnchors
    ? `${((data.externalAnchors / data.totalAnchors) * 100).toFixed(1)}% of total`
    : "0.0% of total";

  const optimizationScoreValue = data.optimizationScore;

  const optimizationScoreLabel =
    optimizationScoreValue >= 80 ? "Excellent" : optimizationScoreValue >= 60 ? "Good" : "Needs Work";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <OverviewStatCard
        title="Total Anchors"
        icon={<Link2 className="h-4 w-4" />}
        value={totalAnchorsValue}
        subtitle="Across all pages"
        valueClassName="text-gray-900"
      />

      <OverviewStatCard
        title="Unique Anchors"
        icon={<Link2 className="h-4 w-4" />}
        value={uniqueAnchorsValue}
        subtitle="Different anchor texts"
        valueClassName="text-blue-600"
      />

      <OverviewStatCard
        title="External Anchors"
        icon={<ExternalLink className="h-4 w-4" />}
        value={externalAnchorsValue}
        subtitle={externalAnchorsSubtitle}
        valueClassName="text-green-600"
      />

      <OverviewStatCard
        title="Optimization Score"
        icon={<TrendingUp className="h-4 w-4" />}
        value={optimizationScoreValue}
        badgeText={optimizationScoreLabel}
        valueClassName="text-purple-600"
      />
    </div>
  );
}
