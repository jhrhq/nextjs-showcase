"use client";
import { useParams } from "next/navigation";
import { fullAnchorApiMock } from "@/app/expandable-table/anchor-mananer/project";
import AnchorManagerHeader from "@/domains/linker/ui/anchor-manager/anchor-manager-header";
import AnchorManagerTable from "@/domains/linker/ui/anchor-manager/anchor-manager-table";
import { AnchorChartsSection } from "@/domains/linker/ui/anchor-manager/chart-card";
import { DistributionAnalysisCard } from "@/domains/linker/ui/anchor-manager/distribution-analysis-card";
import OverviewCard from "@/domains/linker/ui/anchor-manager/overview-card";
import { QualityMetricCard } from "@/domains/linker/ui/anchor-manager/quality-metrics";

const PIE_DATA = [
  { name: "Branded Keyword", value: 90, percent: 23.4, color: "#38bdf8" },
  { name: "Full‑Part Match", value: 20, percent: 5.2, color: "#22d3ee" },
  { name: "Partial Match", value: 191, percent: 49.7, color: "#fb7185" },
  { name: "Other Anchor", value: 51, percent: 13.3, color: "#86efac" },
  { name: "Exact Anchor", value: 17, percent: 4.4, color: "#facc15" },
];
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
      <AnchorChartsSection data={anchorData.typeDistribution} />
      <QualityMetricCard data={anchorData.qualityMetrics} />
      <DistributionAnalysisCard data={PIE_DATA} />
      <AnchorManagerTable />
    </div>
  );
}
