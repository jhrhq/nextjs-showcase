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

export function SettingsGeneral({ project }: { project: ProjectDTO }) {
  return (
    <Card className="shadow-xs transition-shadow hover:shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl">General</CardTitle>
        <CardDescription>Update your project basic information</CardDescription>
      </CardHeader>
      <CardContent>
        <ProjectUpdateForm project={project} />
      </CardContent>
    </Card>
  );
}

export function SettingsGeneralStatus({
  project,
  onToggleStatus,
  isLoading,
}: {
  project: ProjectDTO;
  onToggleStatus: (checked: boolean) => void;
  isLoading: boolean;
}) {
  return (
    <Card className="shadow-xs transition-shadow hover:shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl">Status</CardTitle>
        <CardDescription>Control your project active state and availability</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 p-4">
          <div className="space-y-1">
            <Label className="text-sm font-medium text-foreground">Current Status</Label>
            <div>
              <ProjectStatusBadge status={project.status} />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Switch checked={project.status === "active"} onCheckedChange={onToggleStatus} disabled={isLoading} />
            <Label className="text-sm font-medium text-muted-foreground">
              {project.status === "active" ? "Deactivate" : "Activate"}
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function SettingsDetails({ project }: { project: ProjectDTO }) {
  return (
    <Card className="shadow-xs transition-shadow hover:shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl">Details</CardTitle>
        <CardDescription>Project identification metadata</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Project ID</Label>
            <p className="font-mono text-sm mt-1 text-foreground">{project.id}</p>
          </div>
          <div>
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Created At</Label>
            <p className="text-sm mt-1 text-foreground">{new Date(project.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        <Separator />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Updated At</Label>
            <p className="text-sm mt-1 text-foreground">{new Date(project.updatedAt).toLocaleDateString()}</p>
          </div>
          <div>
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Last Crawled</Label>
            <p className="text-sm mt-1 text-foreground">
              {project.lastCrawled ? new Date(project.lastCrawled).toLocaleDateString() : "Never"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function SettingsUsage({ project }: { project: ProjectDTO }) {
  return (
    <Card className="shadow-xs transition-shadow hover:shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl">Usage</CardTitle>
        <CardDescription>Current project data breakdown statistics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1 rounded-lg border border-border/60 bg-muted/30 p-4">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Links</Label>
            <p className="text-3xl font-bold text-chart-1 tracking-tight">{project.totalLinks.toLocaleString()}</p>
          </div>
          <div className="space-y-1 rounded-lg border border-border/60 bg-muted/30 p-4">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Total CustomNetworks
            </Label>
            <p className="text-3xl font-bold text-chart-2 tracking-tight">
              {project.totalCustomNetworks.toLocaleString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function SettingsProjectDelete({ project }: { project: ProjectDTO }) {
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
    <Card className="border-destructive/30 bg-destructive/5 shadow-xs">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl text-destructive">Danger Zone</CardTitle>
        <CardDescription>Irreversible and permanent project deletion actions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant="destructive" className="border-destructive/20 bg-destructive/10 text-destructive">
          <AlertTriangle className="size-4 shrink-0" />
          <AlertDescription>
            Deleting this project will permanently remove all associated data including links, custom networks, and
            reports. This action cannot be undone.
          </AlertDescription>
        </Alert>
        <Button variant="destructive" onClick={() => setProjectToDelete(project)}>
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
