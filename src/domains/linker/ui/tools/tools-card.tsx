"use client";
import { Import } from "lucide-react";
import Link from "next/link";
import type { ToolsType } from "@/app/(spa)/linker/dashboard/[projectId]/page";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import type { ProjectStatus, ProjectStatusVariant as ToolStatusVariant } from "@/domains/linker/types/project.types";

type ToolsGridProps = {
  tools: ToolsType;
  // onEdit: (project: ProjectDTO) => void;
  // onDelete: (id: string) => void;
};
export function ToolGrid({ tools }: ToolsGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
}

type ToolCardProps = {
  tool: ToolsType[0];
  // onEdit: (project: ProjectDTO) => void;
  // onDelete: (id: string) => void;
};

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link href={`/linker/dashboard/${tool.id}`}>
      <Card className="rounded-none shadow-sm">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <Import className="-rotate-90 text-primary" />
            <ToolStatusBadge status={tool.status as ProjectStatus} />
          </div>

          <div className="space-y-1">
            <h3 className="text-base font-semibold capitalize text-slate-900">{tool.name}</h3>
            <p className="text-sm text-muted-foreground">{tool.description}</p>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}

const toolStatusVariant: ToolStatusVariant = {
  active: "default-lighter",
  inactive: "inactive",
  pending: "pending",
};

export function ToolStatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <Badge variant={toolStatusVariant[status]} className="capitalize">
      {status}
    </Badge>
  );
}
