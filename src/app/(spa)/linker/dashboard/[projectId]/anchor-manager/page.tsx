"use client";
import { useParams } from "next/navigation";
import AnchorManagerHeader from "@/domains/linker/ui/anchor-manager/anchor-manager-header";
import AnchorManagerTable from "@/domains/linker/ui/anchor-manager/anchor-manager-table";
import { fullAnchorApiMock } from "@/domains/linker/ui/anchor-manager/anchor-manager-table/anchor-manager.column";
import { DistributionAnalysisCard } from "@/domains/linker/ui/anchor-manager/distribution-analysis-card";
import OverviewCard from "@/domains/linker/ui/anchor-manager/overview-card";
import { QualityMetricCard } from "@/domains/linker/ui/anchor-manager/quality-metrics";

export default function AnchorManagerPage() {
  const params = useParams();
  const projectId = params.projectId as string;

  /*   const { data: projects, isLoading: projectsLoading } = useProjects();
    const { data: anchorData, isLoading: anchorLoading } = useAnchorManager(projectId);
   */

  const anchorData = fullAnchorApiMock;

  // const project = projects?.find((p) => p.id === projectId);

  /* if (projectsLoading || anchorLoading) {
      return (
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      );
    }
  
    if (!project) {
      return (
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-600">Project not found</p>
        </div>
      );
    }
  
    if (!anchorData) {
      return (
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-600">No anchor data available</p>
        </div>
      );
    } */

  return (
    <div className="space-y-6">
      <AnchorManagerHeader projectName={projectId} />
      <OverviewCard data={anchorData} />
      <QualityMetricCard data={anchorData.qualityMetrics} />
      <DistributionAnalysisCard data={anchorData.typeDistribution} />
      <AnchorManagerTable data={anchorData.anchors} />
    </div>
  );
}
