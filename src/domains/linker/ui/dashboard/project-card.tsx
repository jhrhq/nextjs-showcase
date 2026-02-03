import { Calendar, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import type React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AUTH_CONFIG } from "@/domains/linker/constants/auth.constants";
import type { ProjectStatus, ProjectStatusVariant } from "@/domains/linker/types/project.types";
import type { ProjectDTO } from "@/domains/linker/validations/projects.validations";

type ProjectCardProps = {
  project: ProjectDTO;
  onEdit: (projectId: string) => void;
  onDelete: (projectId: string) => void;
};

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  const { id, status } = project;

  function handleEdit(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();
    e.stopPropagation();
    onEdit(id);
  }

  function handleDelete(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();
    e.stopPropagation();
    onDelete(id);
  }

  const navigatePath =
    status === "active"
      ? `${AUTH_CONFIG.ROUTES.DASHBOARD}/${id}`
      : `${AUTH_CONFIG.ROUTES.DASHBOARD}/${id}${AUTH_CONFIG.ROUTES.SETTINGS}`;

  return (
    <Link href={navigatePath}>
      <Card className="rounded-none shadow-sm">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <ProjectStatusBadge status={project.status} />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="font-medium text-slate-600" onClick={handleEdit}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem className=" font-medium text-red-500" onClick={handleDelete}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="space-y-1">
            <h3 className="text-base font-semibold capitalize">{project.name}</h3>
            <p className="text-sm text-muted-foreground">
              {project.description?.slice(0, 39)}
              {project.description && project.description?.length > 39 && "..."}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-muted/40 p-3">
            <div className="flex h-8 w-8 items-center justify-center bg-white">
              <span className="text-xs font-semibold">{project.name.slice(0, 2).toUpperCase()}</span>
            </div>
            <div className="text-sm">
              <p className="font-medium">{project.name}</p>
              <p className="text-xs text-muted-foreground">{project.domain}</p>
            </div>
          </div>
        </CardHeader>

        <CardFooter className="flex items-center justify-between pt-4">
          <div className="flex font-medium text-slate-600">Total Links: {project.totalLinks}</div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar />
            <span>
              {new Date(project.updatedAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "2-digit",
              })}
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

const projectStatusVariant: ProjectStatusVariant = {
  active: "default-lighter",
  inactive: "inactive",
  pending: "pending",
};

export function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <Badge variant={projectStatusVariant[status]} className="capitalize">
      {status}
    </Badge>
  );
}
