import { Calendar, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ProjectStatus, ProjectStatusVariant } from "@/domains/linker/types/project.types";
import type { ProjectDTO } from "@/domains/linker/validations/projects.validations";

type ProjectCardProps = {
  project: ProjectDTO;
  onEdit: (project: ProjectDTO) => void;
  onDelete: (id: string) => void;
};

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  return (
    <Link href={`/linker/dashboard/${project.id}`}>
      <Card className="rounded-none shadow-sm">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <ProjectStatusBadge status={project.status} />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="font-medium text-slate-600" onClick={() => onEdit(project)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem className=" font-medium text-red-500" onClick={() => onDelete(project.id)}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="space-y-1">
            <h3 className="text-base font-semibold">{project.name}</h3>
            <p className="text-sm text-muted-foreground">{project.description}</p>
          </div>

          <div className="flex items-center gap-3 bg-muted/40 p-3">
            <div className="flex h-8 w-8 items-center justify-center bg-white">
              <span className="text-xs font-semibold">TC</span>
            </div>
            <div className="text-sm">
              <p className="font-medium">TechCorp</p>
              <p className="text-xs text-muted-foreground">{project.domain}</p>
            </div>
          </div>
        </CardHeader>

        <CardFooter className="flex items-center justify-between pt-4">
          <div className="flex font-medium text-slate-600">Total Links: {project.totalLinks}</div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-4 w-4" />
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
