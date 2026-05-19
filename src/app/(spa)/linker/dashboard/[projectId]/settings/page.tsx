"use client";

import { useParams } from "next/navigation";
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
} from "@/domains/linker/ui/settings";

export default function ProjectSettingsPage() {
  const params = useParams();
  const projectId = params.projectId as string;

  const query = useProjects();
  const project = query.data?.find((p) => p.id === projectId);
  const udpateProject = useUpdateProject(projectId);

  async function handleStatusToggle(checked: boolean) {
    try {
      udpateProject.mutate(
        { status: checked ? "active" : "inactive", projectId },
        {
          onSuccess: () => toast.success("Status update successfull"),
          onError: () => toast.error("Status update failed!"),
        }
      );
    } catch (error) {
      console.error("API call failed:", error);
    }
  }

  if (query.isLoading) {
    return <ProjectsListSkeleton />;
  }
  if (query.isError) {
    return <QueryErrorState query={query} />;
  }

  if (!query.data || query.data.length === 0 || !project) {
    return <ProjectsEmpty />;
  }

  return (
    <div className="space-y-6 mt-6">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-slate-200">Project Settings</h1>
        <p className="text-slate-600 mt-1">Manage your project configuration</p>
      </div>

      <SettingsGeneral project={project} />

      <SettingsGeneralStatus
        project={project}
        onToggleStatus={handleStatusToggle}
        isLoading={udpateProject.isPending}
      />

      <SettingsDetails project={project} />

      <SettingsUsage project={project} />

      <SettingsProjectDelete project={project} />
    </div>
  );
}
