"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { SiteReport } from "@/domains/linker/types/site-report.types";
import LinkMetricItem from "@/domains/linker/ui/site-report/link-metric-card";
import PerformanceScoreItem from "@/domains/linker/ui/site-report/performance-score-card";

export default function PerformanceSection({ report }: { report: SiteReport }) {
  return (
    <div className="space-y-4">
      <Card className="border border-border bg-card shadow-2xs">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold tracking-tight text-foreground">Link Quality Analysis</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Detailed breakdown of link health and distribution
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <LinkMetricItem
              label="DoFollow Links"
              value={report.linkMetrics.doFollowLinks}
              total={report.totalLinks}
              badgeVariant="default"
              footerText="of total links"
            />
            <LinkMetricItem
              label="NoFollow Links"
              value={report.linkMetrics.noFollowLinks}
              total={report.totalLinks}
              badgeVariant="secondary"
              footerText="of total links"
            />
            <LinkMetricItem
              label="Broken Links"
              value={report.linkMetrics.brokenLinks}
              total={report.totalLinks}
              badgeVariant="destructive"
              footerText="need fixing"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border bg-card shadow-2xs">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold tracking-tight text-foreground">Performance Scores</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Device-specific performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <PerformanceScoreItem label="Mobile Score" score={report.mobileScore} />
          <PerformanceScoreItem label="Desktop Score" score={report.desktopScore} />
          <PerformanceScoreItem label="SEO Score" score={report.seoScore} />
        </CardContent>
      </Card>
    </div>
  );
}
