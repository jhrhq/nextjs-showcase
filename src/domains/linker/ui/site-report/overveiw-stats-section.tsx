import { ExternalLink, FileText, Link2 } from "lucide-react";
import type { SiteReport } from "@/domains/linker/types/site-report.types";
import { StatsCard } from "@/domains/linker/ui/site-report/stats-card";

export default function OverveiwStatsSection({ report }: { report: SiteReport }) {
  const internalLinkRate = report.totalLinks > 0 ? (report.totalInternalLinks / report.totalLinks) * 100 : 0;

  const externalLinkRate = report.totalLinks > 0 ? (report.totalExternalLinks / report.totalLinks) * 100 : 0;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard icon={<FileText />} title="Total Posts" value={report.totalPosts} footer="Published content" />

      <StatsCard
        icon={<Link2 />}
        title="Total Links"
        value={report.totalLinks}
        valueClassName="text-blue-600"
        footer="All links found"
      />

      <StatsCard
        icon={<Link2 />}
        title="Internal Links"
        value={report.totalInternalLinks}
        valueClassName="text-green-600"
        footer={`${internalLinkRate}% of total`}
      />

      <StatsCard
        icon={<ExternalLink />}
        title="External Links"
        value={report.totalExternalLinks}
        valueClassName="text-purple-600"
        footer={`${externalLinkRate}% of total`}
      />
    </div>
  );
}
