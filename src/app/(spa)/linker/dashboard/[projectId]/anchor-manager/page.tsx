"use client";
import { useParams } from "next/navigation";
import { useAnchorManager, useProject } from "@/domains/linker/hooks/use-projects";
import { QueryErrorState } from "@/domains/linker/query-error-state";
import { AnchorManagerEmpty } from "@/domains/linker/ui/anchor-manager/anchor-manager-empty";
import AnchorManagerHeader from "@/domains/linker/ui/anchor-manager/anchor-manager-header";
import AnchorManagerTable from "@/domains/linker/ui/anchor-manager/anchor-manager-table";
import AnchorManagerSkeletonPage from "@/domains/linker/ui/anchor-manager/anchor-manger-skeleton-page";
import { DistributionAnalysisCard } from "@/domains/linker/ui/anchor-manager/distribution-analysis-card";
import OverviewCard from "@/domains/linker/ui/anchor-manager/overview-card";
import { QualityMetricCard } from "@/domains/linker/ui/anchor-manager/quality-metrics";

export default function AnchorManagerPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const { project, isPending } = useProject(projectId);
  const query = useAnchorManager(projectId);

  if (query.isLoading || isPending) {
    return <AnchorManagerSkeletonPage />;
  }
  if (query.isError) {
    return <QueryErrorState query={query} />;
  }

  if (!project || !query.data) {
    return <AnchorManagerEmpty />;
  }

  return (
    <div className="space-y-6">
      <AnchorManagerHeader projectName={project.name} />
      <OverviewCard data={query.data} />
      <QualityMetricCard data={query.data.qualityMetrics} />
      <DistributionAnalysisCard data={query.data.typeDistribution} />
      <AnchorManagerTable data={query.data.anchors} />
    </div>
  );
}
