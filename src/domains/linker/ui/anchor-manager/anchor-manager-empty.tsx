"use client";

import { BarChart3, Link2, Plus } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";

type AnchorManagerEmptyProps = {
  title?: string;
  description?: string;
  onCreate?: () => void;
  createLabel?: string;
  secondaryAction?: ReactNode;
};

export function AnchorManagerEmpty({
  title = "No data available",
  description = "There’s nothing to display for this project yet. Data will appear here once content, records, or analysis becomes available.",
  createLabel = "Add Data",
  secondaryAction,
  onCreate,
}: AnchorManagerEmptyProps) {
  const previewItems = [
    { label: "Exact Match", color: "bg-chart-1" },
    { label: "Branded", color: "bg-chart-2" },
    { label: "Generic", color: "bg-chart-3" },
  ];

  return (
    <div className="flex-1 p-6 space-y-6">
      <div className="space-y-1.5">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Anchor Manager</h1>
        <p className="max-w-2xl text-sm text-muted-foreground leading-relaxed">
          Analyze anchor text distribution, identify over-optimization risks, and manage anchor inventory across your
          website.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-2xs overflow-hidden">
        <Empty className="py-16 px-4">
          <EmptyHeader className="space-y-3">
            <EmptyMedia
              variant="icon"
              className="size-14 rounded-full bg-accent text-primary p-0 flex items-center justify-center mx-auto shadow-2xs border border-border/50"
            >
              <BarChart3 className="size-6" />
            </EmptyMedia>
            <EmptyTitle className="text-lg font-semibold text-foreground">{title}</EmptyTitle>
            <EmptyDescription className="max-w-md text-sm text-muted-foreground leading-relaxed">
              {description}
            </EmptyDescription>
          </EmptyHeader>

          <EmptyContent className="flex flex-wrap items-center justify-center gap-3 mt-2">
            <Button
              onClick={onCreate}
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xs px-5 h-9 font-medium"
            >
              <Plus className="mr-2 size-4" />
              {createLabel}
            </Button>
            {secondaryAction}
          </EmptyContent>
        </Empty>

        <div className="border-t border-border bg-muted/30 p-6">
          <div className="grid gap-4 md:grid-cols-3">
            {previewItems.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-border bg-card p-4 shadow-2xs transition-all hover:border-primary/40 hover:shadow-xs"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Link2 className="size-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                  </div>
                  <span className={`size-2 rounded-full ${item.color}`} />
                </div>
                <div className="space-y-2">
                  <div className="h-2 rounded-full bg-muted/80 w-full" />
                  <div className="h-2 rounded-full bg-muted/50 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
