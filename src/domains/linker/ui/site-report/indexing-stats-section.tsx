"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { SiteReport } from "@/domains/linker/types/site-report.types";
import { IndexingStatBox, IndexingSummary } from "@/domains/linker/ui/site-report/indexing-summar-card";

export default function IndexingStatsSection({ report }: { report: SiteReport }) {
  const indexingRate = report.totalPages > 0 ? (report.indexedPages / report.totalPages) * 100 : 0;
  const notIndexed = (report.totalPages - report.indexedPages).toLocaleString();

  return (
    <Card className="border border-border bg-card shadow-2xs">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold tracking-tight text-foreground">Indexing Status</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">Search engine indexing overview</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <IndexingSummary indexed={report.indexedPages} total={report.totalPages} />
        <Progress value={indexingRate} className="h-2 bg-muted" />
        <div className="grid grid-cols-2 gap-4">
          <IndexingStatBox label="Not Indexed" value={notIndexed} />
          <IndexingStatBox label="Coverage" value={`${indexingRate.toFixed(1)}%`} />
        </div>
      </CardContent>
    </Card>
  );
}
