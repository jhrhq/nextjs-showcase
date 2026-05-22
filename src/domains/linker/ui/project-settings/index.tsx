"use client";

import { AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { ProjectStatusBadge } from "@/domains/linker/ui/dashboard/project-card";
import ProjectUpdateForm from "@/domains/linker/ui/project-settings/project-update-form";
import type { ProjectDTO } from "@/domains/linker/validations/projects.validations";
import { AUTH_CONFIG } from "../../constants/auth.constants";
import { useDeleteProject } from "../../hooks/use-projects";
import { DeleteProjectDialog } from "../dashboard/delete-project-dialog";

type SettingsGeneralProps = {
  project: ProjectDTO;
};

export function SettingsGeneral({ project }: SettingsGeneralProps) {
  return (
    <Card className="dark:bg-zinc-900/40 dark:border-zinc-800">
      <CardHeader>
        <CardTitle className="dark:text-zinc-50">General</CardTitle>
        <CardDescription className="dark:text-zinc-400">Update your project basic information</CardDescription>
      </CardHeader>
      <CardContent>
        <ProjectUpdateForm project={project} />
      </CardContent>
    </Card>
  );
}

type SettingsGeneralStatusProps = {
  project: ProjectDTO;
  onToggleStatus: (checked: boolean) => void;
  isLoading: boolean;
};

export function SettingsGeneralStatus({ project, onToggleStatus, isLoading }: SettingsGeneralStatusProps) {
  return (
    <Card className="dark:bg-zinc-900/40 dark:border-zinc-800">
      <CardHeader>
        <CardTitle className="dark:text-zinc-50">Status</CardTitle>
        <CardDescription className="dark:text-zinc-400">Control your project status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="dark:text-zinc-300">Current Status</Label>
            <div className="text-sm mt-1">
              <ProjectStatusBadge status={project.status} />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch checked={project.status === "active"} onCheckedChange={onToggleStatus} disabled={isLoading} />
            <Label className="dark:text-zinc-300">{project.status === "active" ? "Deactivate" : "Activate"}</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

type SettingsDetailsProps = {
  project: ProjectDTO;
};

export function SettingsDetails({ project }: SettingsDetailsProps) {
  return (
    <Card className="dark:bg-zinc-900/40 dark:border-zinc-800">
      <CardHeader>
        <CardTitle className="dark:text-zinc-50">Details</CardTitle>
        <CardDescription className="dark:text-zinc-400">Project information and metadata</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-zinc-500 dark:text-zinc-400">Project ID</Label>
            <p className="font-mono text-sm mt-1 text-zinc-900 dark:text-zinc-100">{project.id}</p>
          </div>
          <div>
            <Label className="text-zinc-500 dark:text-zinc-400">Created At</Label>
            <p className="text-sm mt-1 text-zinc-900 dark:text-zinc-100">
              {new Date(project.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <Separator className="dark:bg-zinc-800" />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-zinc-500 dark:text-zinc-400">Updated At</Label>
            <p className="text-sm mt-1 text-zinc-900 dark:text-zinc-100">
              {new Date(project.updatedAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <Label className="text-zinc-500 dark:text-zinc-400">Last Crawled</Label>
            <p className="text-sm mt-1 text-zinc-900 dark:text-zinc-100">
              {project.lastCrawled ? new Date(project.lastCrawled).toLocaleDateString() : "Never"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

type SettingsUsageProps = {
  project: ProjectDTO;
};

export function SettingsUsage({ project }: SettingsUsageProps) {
  return (
    <Card className="dark:bg-zinc-900/40 dark:border-zinc-800">
      <CardHeader>
        <CardTitle className="dark:text-zinc-50">Usage</CardTitle>
        <CardDescription className="dark:text-zinc-400">Current project statistics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-zinc-500 dark:text-zinc-400">Total Links</Label>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 tracking-tight">
              {project.totalLinks.toLocaleString()}
            </p>
          </div>
          <div className="space-y-2">
            <Label className="text-zinc-500 dark:text-zinc-400">Total CustomNetworks</Label>
            <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 tracking-tight">
              {project.totalCustomNetworks.toLocaleString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

type SettingsProjectDeleteProps = {
  project: ProjectDTO;
};

export function SettingsProjectDelete({ project }: SettingsProjectDeleteProps) {
  const router = useRouter();
  const deleteMutation = useDeleteProject();
  const [projectToDelete, setProjectToDelete] = React.useState<ProjectDTO | null>(null);

  function handleDelete() {
    if (projectToDelete) {
      deleteMutation.mutate(project.id, {
        onSuccess: () => {
          setProjectToDelete(null);
          router.push(`${AUTH_CONFIG.ROUTES.DASHBOARD}`);
        },
      });
    }
  }

  return (
    <Card className="border-red-200 dark:border-red-950 bg-red-50/10 dark:bg-red-950/10">
      <CardHeader>
        <CardTitle className="text-red-500 dark:text-red-400">Danger Zone</CardTitle>
        <CardDescription className="dark:text-zinc-400">Irreversible and destructive actions</CardDescription>
      </CardHeader>
      <CardContent>
        <Alert variant="destructive" className="mb-4 dark:bg-red-950/20 dark:text-red-300 border-none">
          <AlertTriangle className="size-4" />
          <AlertDescription className=" dark:text-red-300 ">
            Deleting this project will permanently remove all associated data including links, custom networks, and
            reports. This action cannot be undone.
          </AlertDescription>
        </Alert>
        <Button variant={"destructive"} className="dark:text-rose-800 " onClick={() => setProjectToDelete(project)}>
          Delete Project
        </Button>
        <DeleteProjectDialog
          isOpen={projectToDelete !== null}
          onClose={() => setProjectToDelete(null)}
          projectName={projectToDelete?.name || ""}
          onDelete={handleDelete}
          isPending={deleteMutation.isPending}
          error={deleteMutation.error}
        />
      </CardContent>
    </Card>
  );
}
