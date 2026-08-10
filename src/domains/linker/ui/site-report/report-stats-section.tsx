"use client";

import type { LucideIcon } from "lucide-react";
import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { SiteReport } from "@/domains/linker/types/site-report.types";
import { StatsCard } from "@/domains/linker/ui/site-report/stats-card";
import { getScoreColor, getScoreVariant, getSeoScoreStatus } from "@/domains/linker/utils";
import { cn } from "@/lib/utils";

type LoadTimeRule = {
  max: number;
  Icon: LucideIcon;
  color: string;
  label: string;
};

const LOAD_TIME_RULES: LoadTimeRule[] = [
  {
    max: 2,
    Icon: TrendingDown,
    color: "text-emerald-600 dark:text-emerald-400",
    label: "Excellent",
  },
  {
    max: 3,
    Icon: Minus,
    color: "text-amber-600 dark:text-amber-400",
    label: "Good",
  },
  {
    max: Infinity,
    Icon: TrendingUp,
    color: "text-destructive",
    label: "Needs improvement",
  },
];

function getLoadTimeRule(avgLoadTime: number): LoadTimeRule {
  for (const rule of LOAD_TIME_RULES) {
    if (avgLoadTime <= rule.max) {
      return rule;
    }
  }
  return LOAD_TIME_RULES[LOAD_TIME_RULES.length - 1];
}

export default function ReportStatsSection({ report }: { report: SiteReport }) {
  const indexingPageRate = report.totalPages > 0 ? (report.indexedPages / report.totalPages) * 100 : 0;
  const { Icon, color, label } = getLoadTimeRule(report.avgLoadTime);
  const getSeoScoreLabel = getSeoScoreStatus(report.seoScore);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard title="Total Pages" value={report.totalPages} valueClassName="text-foreground" />
      <StatsCard
        title="Indexed Pages"
        value={report.indexedPages}
        valueClassName="text-chart-1"
        footer={`${indexingPageRate.toFixed(1)}% indexed`}
      />
      <StatsCard
        title="Avg Load Time"
        value={`${report.avgLoadTime}s`}
        valueClassName="text-chart-5"
        footer={
          <div className="flex items-center gap-1.5">
            <Icon className={cn("size-3.5 shrink-0", color)} />
            <span className="text-xs text-muted-foreground">{label}</span>
          </div>
        }
      />
      <StatsCard
        title="SEO Score"
        value={report.seoScore}
        valueClassName={getScoreColor(report.seoScore)}
        footer={
          <Badge variant={getScoreVariant(report.seoScore)} className="mt-1 font-medium shadow-2xs">
            {getSeoScoreLabel}
          </Badge>
        }
      />
    </div>
  );
}
