"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { SiteReport } from "@/domains/linker/types/site-report.types";
import { ContentTab } from "@/domains/linker/ui/site-report/links-report-tab-section/content.tab";
import { PerformanceTab } from "@/domains/linker/ui/site-report/links-report-tab-section/performance.tab";
import { SecurityTab } from "@/domains/linker/ui/site-report/links-report-tab-section/securit.tab";
import { TechnicalTab } from "@/domains/linker/ui/site-report/links-report-tab-section/technical.tab";

interface LinkReportTabProps {
  report: SiteReport;
}

export default function LinkReportTabSection({ report }: LinkReportTabProps) {
  return (
    <div className="w-full bg-white overflow-hidden">
      <Tabs
        defaultValue="technical"
        className="animate-in fade-in slide-in-from-bottom-2 flex-none duration-300 bg-white"
      >
        <TabsList className="border-b p-0 w-full rounded-none inline-block bg-white group-data-[orientation=horizontal]/tabs:h-fit space-x-2.5 ">
          <TabsTrigger value="technical">Technical SEO</TabsTrigger>
          <TabsTrigger value="content">Content Analysis</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="technical">
          <TechnicalTab report={report} />
        </TabsContent>

        <TabsContent value="content">
          <ContentTab report={report} />
        </TabsContent>

        <TabsContent value="performance">
          <PerformanceTab report={report} />
        </TabsContent>

        <TabsContent value="security">
          <SecurityTab report={report} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
