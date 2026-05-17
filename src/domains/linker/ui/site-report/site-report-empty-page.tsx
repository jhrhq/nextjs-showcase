"use client";

import { BarChart3, FileSearch, Globe, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";

type SiteReportEmptyProps = {
  onCreate?: () => void;
};

export function SiteReportEmpty({ onCreate }: SiteReportEmptyProps) {
  return (
    <div className="flex-1 p-6">
      {/* Header */}
      <div className="mb-8 space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Site Report</h1>

        <p className="max-w-3xl text-muted-foreground">
          Comprehensive SEO, indexing, performance, and link analysis for your project.
        </p>
      </div>

      {/* Empty State */}
      <div className="overflow-hidden rounded-2xl border bg-background">
        <Empty className="py-20">
          <EmptyHeader>
            <EmptyMedia variant="icon" className="bg-primary/10 text-primary">
              <FileSearch className="size-7" />
            </EmptyMedia>

            <EmptyTitle>No report data found</EmptyTitle>

            <EmptyDescription className="max-w-md">
              No analytics or SEO report data is available for this project yet. Generate a report to start tracking
              pages, links, performance, and indexing insights.
            </EmptyDescription>
          </EmptyHeader>

          <EmptyContent>
            <Button onClick={onCreate}>
              <Plus className="mr-2 size-4" />
              Generate Report
            </Button>
          </EmptyContent>
        </Empty>

        {/* Preview Cards */}
        <div className="border-t bg-muted/20 px-6 py-8">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "SEO Analysis",
                icon: Globe,
              },
              {
                title: "Performance",
                icon: BarChart3,
              },
              {
                title: "Indexing",
                icon: FileSearch,
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border bg-background p-5">
                <div className="mb-4 flex items-center gap-2">
                  <item.icon className="size-4 text-muted-foreground" />

                  <span className="text-sm font-medium">{item.title}</span>
                </div>

                <div className="space-y-2">
                  <div className="h-2 rounded-full bg-muted" />
                  <div className="h-2 w-3/4 rounded-full bg-muted" />
                  <div className="h-2 w-1/2 rounded-full bg-muted" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
