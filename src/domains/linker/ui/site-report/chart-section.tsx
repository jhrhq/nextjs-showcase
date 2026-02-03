import type { PieDatum, SiteReport } from "@/domains/linker/types/site-report.types";
import { CategoryBarChart, LinksDistributionPieChart } from "@/domains/linker/ui/site-report/chart-card";

export default function ChartSection({ report }: { report: SiteReport }) {
  const linksPieData: PieDatum[] = [
    { name: "Internal Links", value: report.totalInternalLinks },
    { name: "External Links", value: report.totalExternalLinks },
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Category Distribution Bar Chart */}
      {report.categoryDistribution.length > 0 && <CategoryBarChart data={report.categoryDistribution} />}
      <LinksDistributionPieChart data={linksPieData} />
    </div>
  );
}
