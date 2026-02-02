"use client";

import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { AUTH_CONFIG } from "@/domains/linker/constants/auth.constants";
import { useDeleteProject, useProjects, useUpdateProject } from "@/domains/linker/hooks/use-projects";
import {
  SettingsDetails,
  SettingsGeneral,
  SettingsGeneralStatus,
  SettingsProjectDelete,
  SettingsUsage,
} from "@/domains/linker/ui/settings";

export default function ProjectSettingsPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.projectId as string;

  const { data: projects, isLoading } = useProjects();
  const project = projects?.find((p) => p.id === projectId);
  const udpateProject = useUpdateProject(projectId);
  const deleteProject = useDeleteProject();

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

  function handleDelete() {
    deleteProject.mutate(projectId, {
      onSuccess: () => {
        router.push(`${AUTH_CONFIG.ROUTES.DASHBOARD}`);
      },
    });
  }

  if (isLoading) {
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

  return (
    <div className="space-y-6 mt-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Project Settings</h1>
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

      <SettingsProjectDelete project={project} onDelete={handleDelete} isLoading={deleteProject.isPending} />
    </div>
  );
}
