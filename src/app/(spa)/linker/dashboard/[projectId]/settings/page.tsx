// src/app/(spa)/linker/(dashboard)/projects/[id]/page.tsx

"use client";

// import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Loader2, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { AUTH_CONFIG } from "@/domains/linker/constants/auth.constants";
import { useDeleteProject, useProjects, useUpdateProject } from "@/domains/linker/hooks/use-projects";
import { ProjectStatusBadge } from "@/domains/linker/ui/dashboard/project-card";

export default function ProjectSettingsPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.projectId as string;

  const { data: projects, isLoading } = useProjects();
  const project = projects?.find((p) => p.id === projectId);

  const updateProject = useUpdateProject(projectId);
  const deleteProject = useDeleteProject();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      name: project?.name,
      description: project?.description,
    },
  });

  const onSubmit = () => {
    // updateProject.mutate(data);
  };

  const handleStatusToggle = () => {
    // updateProject.mutate({ status: checked ? "active" : "inactive" });
  };

  const handleDelete = () => {
    deleteProject.mutate(projectId, {
      onSuccess: () => {
        router.push(`${AUTH_CONFIG.ROUTES.DASHBOARD}`);
      },
    });
  };

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

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle>General</CardTitle>
          <CardDescription>Update your project basic information</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name")} placeholder="My Project" />
              {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...register("description")} placeholder="Project description" rows={3} />
              {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
            </div>

            <Button type="submit" disabled={updateProject.isPending}>
              {updateProject.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Status */}
      <Card>
        <CardHeader>
          <CardTitle>Status</CardTitle>
          <CardDescription>Control your project status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Current Status</Label>
              <p className="text-sm text-gray-600">
                <ProjectStatusBadge status={project.status} />
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={project.status === "active"}
                onCheckedChange={handleStatusToggle}
                disabled={updateProject.isPending}
              />
              <Label>{project.status === "active" ? "Deactivate" : "Activate"}</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Details */}
      <Card>
        <CardHeader>
          <CardTitle>Details</CardTitle>
          <CardDescription>Project information and metadata</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-600">Project ID</Label>
              <p className="font-mono text-sm mt-1">{project.id}</p>
            </div>
            <div>
              <Label className="text-gray-600">Created At</Label>
              <p className="text-sm mt-1">{new Date(project.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-600">Updated At</Label>
              <p className="text-sm mt-1">{new Date(project.updatedAt).toLocaleDateString()}</p>
            </div>
            <div>
              <Label className="text-gray-600">Last Crawled</Label>
              <p className="text-sm mt-1">
                {project.lastCrawled ? new Date(project.lastCrawled).toLocaleDateString() : "Never"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Usage</CardTitle>
          <CardDescription>Current project statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-gray-600">Total Links</Label>
              <p className="text-3xl font-bold text-blue-600">{project.totalLinks.toLocaleString()}</p>
            </div>
            <div className="space-y-2">
              <Label className="text-gray-600">Total Silos</Label>
              <p className="text-3xl font-bold text-green-600">{project.totalSilos}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
          <CardDescription>Irreversible and destructive actions</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Deleting this project will permanently remove all associated data including links, silos, and reports.
              This action cannot be undone.
            </AlertDescription>
          </Alert>

          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Project</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete the project and remove all associated data.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>
                    Type <span className="font-bold">{project.name}</span> to confirm
                  </Label>
                  <Input
                    value={deleteConfirmText}
                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                    placeholder={project.name}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={deleteConfirmText !== project.name || deleteProject.isPending}
                >
                  {deleteProject.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Delete Project
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
