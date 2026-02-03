import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { SiteReport } from "@/domains/linker/types/site-report.types";
import { StatsCard } from "@/domains/linker/ui/site-report/stats-card";
import { getScoreColor, getScoreVariant } from "@/domains/linker/utils";

export default function ReportStatsSection({ report }: { report: SiteReport }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard title="Total Pages" value={report.totalPages} />

      <StatsCard
        title="Indexed Pages"
        value={report.indexedPages}
        valueClassName="text-blue-600"
        footer={`${((report.indexedPages / report.totalPages) * 100).toFixed(1)}% indexed`}
      />

      <StatsCard
        title="Avg Load Time"
        value={`${report.avgLoadTime}s`}
        valueClassName="text-purple-600"
        footer={
          <div className="flex items-center">
            {report.avgLoadTime <= 2 ? (
              <TrendingDown className="h-4 w-4 text-green-600" />
            ) : report.avgLoadTime <= 3 ? (
              <Minus className="h-4 w-4 text-yellow-600" />
            ) : (
              <TrendingUp className="h-4 w-4 text-red-600" />
            )}
            <span className="text-xs text-gray-500 ml-1">
              {report.avgLoadTime <= 2 ? "Excellent" : report.avgLoadTime <= 3 ? "Good" : "Needs improvement"}
            </span>
          </div>
        }
      />

      <StatsCard
        title="SEO Score"
        value={report.seoScore}
        valueClassName={getScoreColor(report.seoScore)}
        footer={
          <Badge variant={getScoreVariant(report.seoScore)} className="mt-2">
            {report.seoScore >= 90 ? "Excellent" : report.seoScore >= 70 ? "Good" : "Poor"}
          </Badge>
        }
      />
    </div>
  );
}
