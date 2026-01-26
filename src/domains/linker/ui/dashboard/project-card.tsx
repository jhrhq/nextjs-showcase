import { Calendar, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ProjectDTO } from "@/domains/linker/validations/projects.validations";

type ProjectCardProps = {
  project: ProjectDTO;
  onEdit: (project: ProjectDTO) => void;
  onDelete: (id: string) => void;
};

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  return (
    <Card className="rounded-none shadow-sm">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <ProjectStatusBadge status={project.status} />

          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(project)}>Edit</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive" onClick={() => onDelete(project.id)}>
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
        <div className="flex -space-x-2">
          <Avatar className="h-7 w-7">
            <AvatarImage />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <Avatar className="h-7 w-7">
            <AvatarImage />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <Avatar className="h-7 w-7">
            <AvatarImage />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>

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
  );
}

const statusVariant: Record<ProjectDTO["status"], "default" | "secondary" | "outline"> = {
  active: "default",
  inactive: "secondary",
  pending: "outline",
};

export function ProjectStatusBadge({ status }: { status: ProjectDTO["status"] }) {
  return <Badge variant={statusVariant[status]}>{status}</Badge>;
}
