"use client";

import { Calendar, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import type React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  onDelete: (project: ProjectDTO) => void;
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
    onDelete(project);
  }

  const navigatePath =
    status === "active"
      ? `${AUTH_CONFIG.ROUTES.DASHBOARD}/${id}`
      : `${AUTH_CONFIG.ROUTES.DASHBOARD}/${id}${AUTH_CONFIG.ROUTES.SETTINGS}`;

  return (
    <Link href={navigatePath}>
      <Card className="rounded-none shadow-sm dark:bg-zinc-900/40 dark:border-zinc-800 hover:dark:border-zinc-700 transition-colors">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <ProjectStatusBadge status={project.status} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 dark:hover:bg-zinc-800">
                  <MoreHorizontal className="size-4 text-muted-foreground dark:text-zinc-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="dark:bg-zinc-900 dark:border-zinc-800">
                <DropdownMenuItem className="font-medium text-zinc-600 dark:text-zinc-300" onClick={handleEdit}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="font-medium text-red-500 dark:text-red-400 dark:focus:text-red-400"
                  onClick={handleDelete}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="space-y-1">
            <h3 className="text-base font-semibold capitalize text-zinc-900 dark:text-zinc-50">{project.name}</h3>
            <p className="text-sm text-muted-foreground dark:text-zinc-400">
              {project.description?.slice(0, 39)}
              {project.description && project.description?.length > 39 && "..."}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-muted/40 dark:bg-zinc-800/40 p-3 border border-transparent dark:border-zinc-800/60 ">
            <div className="flex size-8 items-center justify-center bg-white dark:bg-zinc-950 border dark:border-zinc-800 shadow-sm ">
              <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-50">
                {project.name.slice(0, 2).toUpperCase()}
              </span>
            </div>
            <div className="text-sm">
              <p className="font-medium text-zinc-900 dark:text-zinc-200">{project.name}</p>
              <p className="text-xs text-muted-foreground dark:text-zinc-400">{project.domain}</p>
            </div>
          </div>
        </CardHeader>

        <CardFooter className="flex items-center justify-between pt-4 border-t dark:border-zinc-800/60">
          <div className="flex font-medium text-zinc-600 dark:text-zinc-300 text-sm">
            Total Links:{" "}
            <span className="font-semibold ml-1 text-zinc-900 dark:text-zinc-50">{project.totalLinks}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground dark:text-zinc-400">
            <Calendar className="size-3.5" />
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
  active: "default",
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
