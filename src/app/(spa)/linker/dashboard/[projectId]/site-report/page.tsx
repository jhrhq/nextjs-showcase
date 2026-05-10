"use client";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useProjects, useSiteReport } from "@/domains/linker/hooks/use-projects";
import ChartSection from "@/domains/linker/ui/site-report/chart-section";
import { EmptyState } from "@/domains/linker/ui/site-report/empty-state";
import IndexingStatsSection from "@/domains/linker/ui/site-report/indexing-stats-section";
import { LinkAnalysisSection } from "@/domains/linker/ui/site-report/link-analysis-section";
import LinkReportTabSection from "@/domains/linker/ui/site-report/links-report-tab-section";
import OverveiwStatsSection from "@/domains/linker/ui/site-report/overveiw-stats-section";
import PerformanceSection from "@/domains/linker/ui/site-report/performance-section";
import ReportHeader from "@/domains/linker/ui/site-report/report-header";
import ReportStatsSection from "@/domains/linker/ui/site-report/report-stats-section";

export default function SiteReportPage() {
  const params = useParams();
  const projectId = params.projectId as string;

  const { projects, isFetching: projectsLoading } = useProjects();
  const { siteReport, isFetching: reportLoading } = useSiteReport(projectId);

  const project = projects?.find((p) => p.id === projectId);

  if (projectsLoading || reportLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="size-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!project) {
    return <EmptyState message="Project not found" />;
  }

  if (!siteReport) {
    return <EmptyState message="No site report available" />;
  }

  return (
    <div className="space-y-6">
      <ReportHeader projectName={project.name} generatedDate={siteReport.generatedAt} />
      <OverveiwStatsSection report={siteReport} />
      <ChartSection report={siteReport} />
      <ReportStatsSection report={siteReport} />
      <PerformanceSection report={siteReport} />
      <LinkAnalysisSection report={siteReport} />
      <LinkReportTabSection report={siteReport} />
      <IndexingStatsSection report={siteReport} />
    </div>
  );
}
