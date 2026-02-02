import { AlertTriangle, Loader2, Trash2 } from "lucide-react";
import React from "react";
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
import { ProjectStatusBadge } from "@/domains/linker/ui/dashboard/project-card";
import ProjectUpdateForm from "@/domains/linker/ui/settings/project-update-form";
import type { ProjectDTO } from "@/domains/linker/validations/projects.validations";

type SettingsGeneralProps = {
  project: ProjectDTO;
};

export function SettingsGeneral({ project }: SettingsGeneralProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>General</CardTitle>
        <CardDescription>Update your project basic information</CardDescription>
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
    <Card>
      <CardHeader>
        <CardTitle>Status</CardTitle>
        <CardDescription>Control your project status</CardDescription>
      </CardHeader>
      <CardContent>
        {/* <form id="form-rhf-switch" className="space-y-4">
          <FieldGroup className="flex items-center justify-between">
            <Controller
              name="status"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                  <FieldContent className="gap-2">
                    <FieldLabel htmlFor="form-rhf-switch-project-status" className="font-medium">
                      Current Status
                    </FieldLabel>
                    <ProjectStatusBadge status={project.status} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </FieldContent>
                  <div className="self-end flex gap-2">
                    <Switch
                      id="form-rhf-switch-project-status"
                      name={field.name}
                      aria-invalid={fieldState.invalid}
                      checked={project.status === "active"}
                      onCheckedChange={async (checked) => {
                        const statusString = checked ? "active" : "inactive";
                        field.onChange(statusString);
                        await handleStatusToggle(checked);
                      }}
                      disabled={updateProject.isPending}
                    />
                    <Label>{project.status === "active" ? "Deactivate" : "Activate"}</Label>
                  </div>
                </Field>
              )}
            />
          </FieldGroup>
        </form> */}

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Current Status</Label>
            <p className="text-sm text-gray-600">
              <ProjectStatusBadge status={project.status} />
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Switch checked={project.status === "active"} onCheckedChange={onToggleStatus} disabled={isLoading} />
            <Label>{project.status === "active" ? "Deactivate" : "Activate"}</Label>
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
  );
}

type SettingsUsageProps = {
  project: ProjectDTO;
};

export function SettingsUsage({ project }: SettingsUsageProps) {
  return (
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
  );
}

type SettingsProjectDeleteProps = {
  project: ProjectDTO;
  onDelete: () => void;
  isLoading: boolean;
};

export function SettingsProjectDelete({ project, onDelete, isLoading }: SettingsProjectDeleteProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = React.useState("");

  return (
    <Card className="border-red-200">
      <CardHeader>
        <CardTitle className="text-red-500">Danger Zone</CardTitle>
        <CardDescription>Irreversible and destructive actions</CardDescription>
      </CardHeader>
      <CardContent>
        <Alert variant="destructive" className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Deleting this project will permanently remove all associated data including links, silos, and reports. This
            action cannot be undone.
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
                onClick={onDelete}
                disabled={deleteConfirmText !== project.name || isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Delete Project
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
