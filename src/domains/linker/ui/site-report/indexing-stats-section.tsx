import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { SiteReport } from "@/domains/linker/types/site-report.types";
import { IndexingStatBox, IndexingSummary } from "@/domains/linker/ui/site-report/indexing-summar-card";

export default function IndexingStatsSection({ report }: { report: SiteReport }) {
  const indexingRate = report.totalPages > 0 ? (report.indexedPages / report.totalPages) * 100 : 0;

  const notIndexed = (report.totalPages - report.indexedPages).toLocaleString();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Indexing Status</CardTitle>
        <CardDescription>Search engine indexing overview</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <IndexingSummary indexed={report.indexedPages} total={report.totalPages} />
          <Progress value={indexingRate} className="h-3" />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <IndexingStatBox label="Not Indexed" value={notIndexed} />
            <IndexingStatBox label="Coverage" value={`${indexingRate}%`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
