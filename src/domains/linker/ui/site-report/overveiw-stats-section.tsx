"use client";

import { ExternalLink, FileText, Link2 } from "lucide-react";
import type { SiteReport } from "@/domains/linker/types/site-report.types";
import { StatsCard } from "@/domains/linker/ui/site-report/stats-card";

export default function OverveiwStatsSection({ report }: { report: SiteReport }) {
  const internalLinkRate = report.totalLinks > 0 ? (report.totalInternalLinks / report.totalLinks) * 100 : 0;
  const externalLinkRate = report.totalLinks > 0 ? (report.totalExternalLinks / report.totalLinks) * 100 : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        icon={<FileText className="size-4 text-muted-foreground" />}
        title="Total Posts"
        value={report.totalPosts}
        footer="Published content"
        valueClassName="text-foreground"
      />
      <StatsCard
        icon={<Link2 className="size-4 text-chart-1" />}
        title="Total Links"
        value={report.totalLinks}
        valueClassName="text-chart-1"
        footer="All links found"
      />
      <StatsCard
        icon={<Link2 className="size-4 text-chart-2" />}
        title="Internal Links"
        value={report.totalInternalLinks}
        valueClassName="text-chart-2"
        footer={`${internalLinkRate.toFixed(1)}% of total`}
      />
      <StatsCard
        icon={<ExternalLink className="size-4 text-chart-5" />}
        title="External Links"
        value={report.totalExternalLinks}
        valueClassName="text-chart-5"
        footer={`${externalLinkRate.toFixed(1)}% of total`}
      />
    </div>
  );
}
