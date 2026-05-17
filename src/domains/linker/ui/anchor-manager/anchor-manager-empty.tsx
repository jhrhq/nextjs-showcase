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
  return (
    <div className="flex-1 p-6">
      {/* Header */}
      <div className="mb-8 space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Anchor Manager</h1>

        <p className="max-w-3xl text-muted-foreground">
          Analyze anchor text distribution, identify over-optimization risks, and manage anchor inventory across your
          website.
        </p>
      </div>

      {/* Empty State */}
      <div className="rounded-2xl border bg-background">
        <Empty className="py-20">
          <EmptyHeader>
            <EmptyMedia variant="icon" className="bg-primary/10 text-primary">
              <BarChart3 className="size-7" />
            </EmptyMedia>

            <EmptyTitle>{title}</EmptyTitle>

            <EmptyDescription className="max-w-md">{description}</EmptyDescription>
          </EmptyHeader>

          <EmptyContent className="flex flex-wrap items-center justify-center gap-3">
            <Button onClick={onCreate}>
              <Plus className="mr-2 size-4" />
              {createLabel}
            </Button>

            {secondaryAction}
          </EmptyContent>
        </Empty>

        {/* Decorative Preview */}
        <div className="border-t bg-muted/20 px-6 py-8">
          <div className="grid gap-4 md:grid-cols-3">
            {["Exact Match", "Branded", "Generic"].map((item) => (
              <div key={item} className="rounded-xl border bg-background p-4">
                <div className="mb-4 flex items-center gap-2">
                  <Link2 className="size-4 text-muted-foreground" />

                  <span className="text-sm font-medium">{item}</span>
                </div>

                <div className="space-y-2">
                  <div className="h-2 rounded-full bg-muted" />

                  <div className="h-2 w-2/3 rounded-full bg-muted" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
