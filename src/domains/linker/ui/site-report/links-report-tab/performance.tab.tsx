import type { SiteReport } from "@/domains/linker/types/site-report.types";
import { PerformanceResourceTable } from "@/domains/linker/ui/site-report/links-report-tab/performance-resource.table/performance-resource.table";

export function PerformanceTab({ report }: { report: SiteReport }) {
  return (
    <div className="space-y-4 p-6">
      <PerformanceResourceTable data={report.performance.resources} />
    </div>
  );
}
