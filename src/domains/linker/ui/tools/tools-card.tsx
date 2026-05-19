"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { AUTH_CONFIG } from "@/domains/linker/constants/auth.constants";
import { TOOL_ICON_MAP, type Tool, type ToolStatus, type ToolStatusVariant } from "@/domains/linker/types/tools.types";

type ToolsGridProps = {
  tools: Tool[];
  // onEdit: (project: ProjectDTO) => void;
  // onDelete: (id: string) => void;
};
export function ToolsGrid({ tools }: ToolsGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
}

type ToolCardProps = {
  tool: Tool;
  // onEdit: (project: ProjectDTO) => void;
  // onDelete: (id: string) => void;
};
export type RouteKey = keyof typeof AUTH_CONFIG.ROUTES;

export function ToolCard({ tool }: ToolCardProps) {
  const parms = useParams();
  const toolPath = `${AUTH_CONFIG.ROUTES.DASHBOARD}/${parms.projectId}${AUTH_CONFIG.ROUTES[tool.name]}`;
  const { Icon, className } = TOOL_ICON_MAP[tool.name];
  return (
    <Link href={toolPath}>
      <Card className="rounded-none shadow-sm">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <Icon className={className} />
            <ToolStatusBadge status={tool?.status} />
          </div>

          <div className="space-y-1">
            <h3 className="text-base font-semibold capitalize text-slate-900 dark:text-slate-200">
              {tool.displayName}
            </h3>
            <p className="text-sm text-muted-foreground">{tool.description}</p>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}

const toolStatusVariant: ToolStatusVariant = {
  new: "new",
  active: "green-lighter",
  inactive: "inactive",
};

export function ToolStatusBadge({ status }: { status?: ToolStatus }) {
  if (!status) return null;
  return (
    <Badge variant={toolStatusVariant[status]} className="capitalize">
      {status}
    </Badge>
  );
}
