"use client";
import { ExternalLink, FileText, Link2, Loader2, Minus, TrendingDown, TrendingUp } from "lucide-react";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProjects, useSiteReport } from "@/domains/linker/hooks/use-projects";
import type { PieDatum } from "@/domains/linker/types/site-report.types";
import { CategoryBarChart, LinksDistributionPieChart } from "@/domains/linker/ui/site-report/chart-card";
import { IndexingStatBox, IndexingSummary } from "@/domains/linker/ui/site-report/indexing-summar-card";
import { LinkAnalysis } from "@/domains/linker/ui/site-report/link-analysis";
import LinkMetricItem from "@/domains/linker/ui/site-report/link-metric-card";
import PerformanceScoreItem from "@/domains/linker/ui/site-report/performance-score-card";
import { StatsCard } from "@/domains/linker/ui/site-report/stats-card";
import LinkReportTab from "@/domains/linker/ui/site-report/test-tab";
import { getScoreColor, getScoreVariant } from "@/domains/linker/utils";

export default function SiteReportPage() {
  const params = useParams();
  const projectId = params.projectId as string;

  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: report, isLoading: reportLoading } = useSiteReport(projectId);

  const project = projects?.find((p) => p.id === projectId);

  if (projectsLoading || reportLoading) {
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

  if (!report) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-600">No site report available</p>
      </div>
    );
  }

  const linksPieData: PieDatum[] = [
    { name: "Internal Links", value: report.totalInternalLinks },
    { name: "External Links", value: report.totalExternalLinks },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Site Report</h1>
        <p className="text-slate-600 mt-1">Comprehensive SEO analysis for {project.name}</p>
        <p className="text-sm text-gray-500 mt-1">Generated {new Date(report.generatedAt).toLocaleString()}</p>
      </div>
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          icon={<FileText className="h-4 w-4" />}
          title="Total Posts"
          value={report.totalPosts}
          footer="Published content"
        />

        <StatsCard
          icon={<Link2 className="h-4 w-4" />}
          title="Total Links"
          value={report.totalLinks}
          valueClassName="text-blue-600"
          footer="All links found"
        />

        <StatsCard
          icon={<Link2 className="h-4 w-4" />}
          title="Internal Links"
          value={report.totalInternalLinks}
          valueClassName="text-green-600"
          footer={`${((report.totalInternalLinks / report.totalLinks) * 100).toFixed(1)}% of total`}
        />

        <StatsCard
          icon={<ExternalLink className="h-4 w-4" />}
          title="External Links"
          value={report.totalExternalLinks}
          valueClassName="text-purple-600"
          footer={`${((report.totalExternalLinks / report.totalLinks) * 100).toFixed(1)}% of total`}
        />
      </div>
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution Bar Chart */}
        {report.categoryDistribution.length > 0 && <CategoryBarChart data={report.categoryDistribution} />}
        <LinksDistributionPieChart data={linksPieData} />
      </div>
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
      <Card>
        <CardHeader>
          <CardTitle>Link Quality Analysis</CardTitle>
          <CardDescription>Detailed breakdown of link health and distribution</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <LinkMetricItem
              label="DoFollow Links"
              value={report.linkMetrics.doFollowLinks}
              total={report.totalLinks}
              badgeVariant="default"
              footerText="of total links"
            />

            <LinkMetricItem
              label="NoFollow Links"
              value={report.linkMetrics.noFollowLinks}
              total={report.totalLinks}
              badgeVariant="secondary"
              footerText="of total links"
            />

            <LinkMetricItem
              label="Broken Links"
              value={report.linkMetrics.brokenLinks}
              total={report.totalLinks}
              badgeVariant="destructive"
              footerText="need fixing"
            />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Performance Scores</CardTitle>
          <CardDescription>Device-specific performance metrics</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <PerformanceScoreItem label="Mobile Score" score={report.mobileScore} />

          <PerformanceScoreItem label="Desktop Score" score={report.desktopScore} />

          <PerformanceScoreItem label="SEO Score" score={report.seoScore} />
        </CardContent>
      </Card>
      <LinkAnalysis report={report} />
      <LinkReportTab report={report} />
      <Card>
        <CardHeader>
          <CardTitle>Indexing Status</CardTitle>
          <CardDescription>Search engine indexing overview</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <IndexingSummary indexed={report.indexedPages} total={report.totalPages} />

            <Progress value={(report.indexedPages / report.totalPages) * 100} className="h-3" />

            <div className="grid grid-cols-2 gap-4 mt-4">
              <IndexingStatBox label="Not Indexed" value={(report.totalPages - report.indexedPages).toLocaleString()} />

              <IndexingStatBox
                label="Coverage"
                value={`${((report.indexedPages / report.totalPages) * 100).toFixed(0)}%`}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
