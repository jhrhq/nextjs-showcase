"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { AUTH_CONFIG } from "@/domains/linker/constants/auth.constants";
import { TOOL_ICON_MAP, type Tool, type ToolStatus, type ToolStatusVariant } from "@/domains/linker/types/tools.types";
import { cn } from "@/lib/utils";

type ToolsGridProps = {
  tools: Tool[];
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
};

export type RouteKey = keyof typeof AUTH_CONFIG.ROUTES;

export function ToolCard({ tool }: ToolCardProps) {
  const params = useParams();
  const toolPath = `${AUTH_CONFIG.ROUTES.DASHBOARD}/${params.projectId}${AUTH_CONFIG.ROUTES[tool.name]}`;
  const { Icon, className } = TOOL_ICON_MAP[tool.name];

  return (
    <Link href={toolPath} className="block group h-full">
      <Card className="h-full border border-border bg-card shadow-2xs transition-all duration-200 hover:border-primary/40 hover:shadow-xs">
        <CardHeader className="space-y-4 p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center size-9 rounded-lg border border-border bg-muted/50 transition-colors group-hover:border-primary/30 group-hover:bg-primary/5">
              <Icon className={cn("size-5 shrink-0", className)} />
            </div>
            <ToolStatusBadge status={tool?.status} />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-base font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
              {tool.displayName}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{tool.description}</p>
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
    <Badge variant={toolStatusVariant[status] ?? "secondary"} className="capitalize font-medium shadow-2xs">
      {status}
    </Badge>
  );
}
