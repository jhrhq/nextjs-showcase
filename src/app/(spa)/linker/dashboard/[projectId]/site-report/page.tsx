"use client";
import { useParams } from "next/navigation";
import { useProject, useSiteReport } from "@/domains/linker/hooks/use-projects";
import { QueryErrorState } from "@/domains/linker/query-error-state";
import ChartSection from "@/domains/linker/ui/site-report/chart-section";
import IndexingStatsSection from "@/domains/linker/ui/site-report/indexing-stats-section";
import { LinkAnalysisSection } from "@/domains/linker/ui/site-report/link-analysis-section";
import LinkReportTabSection from "@/domains/linker/ui/site-report/links-report-tab-section";
import OverveiwStatsSection from "@/domains/linker/ui/site-report/overveiw-stats-section";
import PerformanceSection from "@/domains/linker/ui/site-report/performance-section";
import ReportHeader from "@/domains/linker/ui/site-report/report-header";
import ReportStatsSection from "@/domains/linker/ui/site-report/report-stats-section";
import { SiteReportEmpty } from "@/domains/linker/ui/site-report/site-report-empty-page";
import SiteReportSkeletonPage from "@/domains/linker/ui/site-report/site-report-skeleton-page";

export default function SiteReportPage() {
  const { projectId } = useParams<{ projectId: string }>();

  const { project, isPending } = useProject(projectId);
  const query = useSiteReport(projectId);

  if (query.isPending || isPending) {
    return <SiteReportSkeletonPage />;
  }
  if (query.isError) {
    return <QueryErrorState query={query} />;
  }
  const report = query.data;
  if (!project || !report) {
    return <SiteReportEmpty />;
  }

  return (
    <div className="space-y-6">
      <ReportHeader projectName={project?.name} generatedDate={report.generatedAt} />
      <OverveiwStatsSection report={report} />
      <ChartSection report={report} />
      <ReportStatsSection report={report} />
      <PerformanceSection report={report} />
      <LinkAnalysisSection report={report} />
      <LinkReportTabSection report={report} />
      <IndexingStatsSection report={report} />
    </div>
  );
}
