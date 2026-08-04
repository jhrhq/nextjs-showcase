"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";
import { toast } from "sonner";
import { useProjects, useUpdateProject } from "@/domains/linker/hooks/use-projects";
import { QueryErrorState } from "@/domains/linker/query-error-state";
import { ProjectsEmpty } from "@/domains/linker/ui/dashboard/project-empty";
import { ProjectsListSkeleton } from "@/domains/linker/ui/dashboard/project-list-skeleton";
import {
  SettingsDetails,
  SettingsGeneral,
  SettingsGeneralStatus,
  SettingsProjectDelete,
  SettingsUsage,
} from "@/domains/linker/ui/project-settings";

export default function ProjectSettingsPage() {
  const params = useParams();
  const projectId = params.projectId as string;

  const query = useProjects();
  const updateProject = useUpdateProject(projectId);

  // Memoize project lookup to prevent unnecessary recalculations on re-render
  const project = useMemo(() => query.data?.find((p) => p.id === projectId), [query.data, projectId]);

  function handleStatusToggle(checked: boolean) {
    updateProject.mutate(
      { status: checked ? "active" : "inactive", projectId },
      {
        onSuccess: () => toast.success("Status update successful"),
        onError: (error) => {
          console.error("Status update failed:", error);
          toast.error("Status update failed!");
        },
      }
    );
  }

  if (query.isLoading) {
    return <ProjectsListSkeleton />;
  }

  if (query.isError) {
    return <QueryErrorState query={query} />;
  }

  // Handle empty state vs. specific project not found
  if (!query.data || query.data.length === 0) {
    return <ProjectsEmpty />;
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h2 className="text-lg font-semibold text-foreground">Project Not Found</h2>
        <p className="text-sm text-muted-foreground mt-1">
          The project you are looking for does not exist or has been removed.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6 pt-2 pb-10">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Project Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your project configuration, integrations, and preferences.
        </p>
      </div>

      <div className="space-y-6">
        <SettingsGeneral project={project} />
        <SettingsGeneralStatus
          project={project}
          onToggleStatus={handleStatusToggle}
          isLoading={updateProject.isPending}
        />
        <SettingsDetails project={project} />
        <SettingsUsage project={project} />
        <SettingsProjectDelete project={project} />
      </div>
    </div>
  );
}
