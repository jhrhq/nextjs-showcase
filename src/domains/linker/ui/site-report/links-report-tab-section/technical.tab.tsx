"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { SiteReport } from "@/domains/linker/types/site-report.types";
import { TechnicalSeoTable } from "@/domains/linker/ui/site-report/links-report-tab-section/technical-seo.table/technical-seo.table";
import { cn } from "@/lib/utils";

interface Props {
  report: SiteReport;
}

export function TechnicalTab({ report }: Props) {
  return (
    <div className="space-y-4 pt-2">
      <TechnicalSeoTable data={report.technicalSeo} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard label="Largest Contentful Paint" value="1.2s" status="good" />
        <MetricCard label="First Input Delay" value="85ms" status="good" />
        <MetricCard label="Cumulative Layout Shift" value="0.15" status="warning" />
      </div>
    </div>
  );
}

function MetricCard({ label, value, status }: { label: string; value: string; status: "good" | "warning" }) {
  const isGood = status === "good";

  return (
    <Card className="border border-border bg-card shadow-2xs">
      <CardHeader className="p-4 pb-1">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-2">
        <div className="text-2xl font-semibold tracking-tight text-foreground">{value}</div>
        <Badge
          variant="outline"
          className={cn(
            "font-medium shadow-2xs text-xs px-2 py-0.5 border",
            isGood
              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
              : "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400"
          )}
        >
          {isGood ? "Good" : "Needs Improvement"}
        </Badge>
      </CardContent>
    </Card>
  );
}
