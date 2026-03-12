import { Activity, Import, Layers, SlidersHorizontal } from "lucide-react";
import type { AUTH_CONFIG } from "@/domains/linker/constants/auth.constants";
import type { BadgeVariant } from "@/types/shared/variants.types";

export type RouteKey = keyof typeof AUTH_CONFIG.ROUTES;

export type ToolName = Extract<RouteKey, "INBOUNDS" | "CUSTOM_NETWORK" | "ANCHOR_MANAGER" | "SITE_REPORT">;

export type ToolStatus = "new" | "active" | "inactive";

export type Tool = {
  id: string;
  name: ToolName;
  displayName: string;
  description: string;
  status?: ToolStatus;
};

export type ToolStatusVariant = Record<ToolStatus, BadgeVariant>;

interface ToolIconConfig {
  Icon: React.ElementType;
  className?: string;
}
// Strictly type the keys
export const TOOL_ICON_MAP: Record<ToolName, ToolIconConfig> = {
  INBOUNDS: { Icon: Import, className: "-rotate-90 text-primary" },
  CUSTOM_NETWORK: { Icon: Layers, className: "text-green-500" },
  ANCHOR_MANAGER: { Icon: SlidersHorizontal, className: "text-yellow-500" },
  SITE_REPORT: { Icon: Activity, className: "text-purple-500" },
};

export interface CustomNetworkStructure {
  id: string;
  name: string;
  pages: CustomNetworkPage[];
  depth: number;
  totalLinks: number;
}

export interface CustomNetworkPage {
  id: string;
  url: string;
  title: string;
  level: number;
  children: string[];
}
