"use client";

import { FolderKanban } from "lucide-react";
import type { ReactNode } from "react";

import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { CreateProjectDialog } from "./create-project-dialog";

type EmptyProjectsProps = {
  title?: string;
  description?: string;

  onCreate?: () => void;
  createLabel?: string;

  secondaryAction?: ReactNode;
};

export function ProjectsEmpty({
  title = "No projects yet",
  description = "You haven't created any projects yet. Start by adding your first project to begin tracking links, monitoring status, and managing your portfolio.",
  secondaryAction,
}: EmptyProjectsProps) {
  return (
    <div className="flex-1 p-6">
      {/* Header */}
      <div className="mb-8 space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Projects</h1>

        <p className="max-w-3xl text-muted-foreground">
          Manage all your projects in one place. Track link counts, monitor project status, and organize your portfolio
          from a single dashboard.
        </p>
      </div>

      {/* Empty State */}
      <div className="rounded-2xl border bg-background">
        <Empty className="py-20">
          <EmptyHeader>
            <EmptyMedia variant="icon" className="bg-primary/10 text-primary">
              <FolderKanban className="size-7" />
            </EmptyMedia>

            <EmptyTitle>{title}</EmptyTitle>

            <EmptyDescription className="max-w-md">{description}</EmptyDescription>
          </EmptyHeader>

          <EmptyContent className="flex flex-wrap items-center justify-center gap-3">
            <CreateProjectDialog />

            {secondaryAction}
          </EmptyContent>
        </Empty>

        {/* Decorative Preview - Mock Project Cards */}
        <div className="border-t bg-muted/20 px-6 py-8">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { status: "Pending", title: "Portfolio Site", links: "45 links" },
              { status: "Active", title: "Blog Platform", links: "890 links" },
              { status: "Inactive", title: "TechCorp Website", links: "1250 links" },
            ].map((_, i) => (
              <div key={i} className="rounded-xl border bg-background p-4">
                {/* Status Badge Placeholder */}
                <div className="mb-3 flex items-start justify-between">
                  <div
                    className={`h-6 w-16 rounded-md ${
                      i === 0 ? "bg-yellow-100" : i === 1 ? "bg-blue-100" : "bg-gray-100"
                    }`}
                  />
                  <div className="h-4 w-4 rounded-full bg-muted" />
                </div>

                {/* Title & Description */}
                <div className="mb-4 space-y-1">
                  <div className="h-5 w-28 rounded bg-muted" />
                  <div className="h-4 w-36 rounded bg-muted/60" />
                </div>

                {/* URL Section */}
                <div className="mb-4 flex items-start gap-2 rounded-lg bg-muted/30 p-2">
                  <div className="mt-0.5 h-6 w-6 rounded bg-muted" />
                  <div className="flex-1 space-y-1">
                    <div className="h-3 w-24 rounded bg-muted" />
                    <div className="h-2 w-32 rounded bg-muted/60" />
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t pt-3">
                  <div className="h-3 w-20 rounded bg-muted" />
                  <div className="flex items-center gap-1">
                    <div className="h-4 w-4 rounded bg-muted" />
                    <div className="h-3 w-16 rounded bg-muted" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
