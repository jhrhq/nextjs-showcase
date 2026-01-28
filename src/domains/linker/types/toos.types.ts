import { Activity, BarChart2, Import, Layers } from "lucide-react";
import type { AUTH_CONFIG } from "@/domains/linker/constants/auth.constants";
import type { BadgeVariant } from "@/types/shared/variants.types";

export type RouteKey = keyof typeof AUTH_CONFIG.ROUTES;

export type ToolName = Extract<RouteKey, "INBOUNDS" | "SILO" | "LINKS_REPORT" | "SITE_REPORT">;

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
  SILO: { Icon: Layers, className: "text-green-500 w-6 h-6" },
  LINKS_REPORT: { Icon: BarChart2, className: "text-yellow-500 w-6 h-6" },
  SITE_REPORT: { Icon: Activity, className: "text-purple-500 w-6 h-6" },
};

export interface InboundLink {
  id: string;
  sourceUrl: string;
  targetUrl: string;
  anchorText: string;
  doFollow: boolean;
  status: "active" | "broken" | "redirect";
  discoveredAt: string;
}

export interface SiloStructure {
  id: string;
  name: string;
  pages: SiloPage[];
  depth: number;
  totalLinks: number;
}

export interface SiloPage {
  id: string;
  url: string;
  title: string;
  level: number;
  children: string[];
}

export interface LinksReport {
  id: string;
  url: string;
  internalLinks: number;
  externalLinks: number;
  brokenLinks: number;
  status: number;
  lastChecked: string;
}

export interface SiteReport {
  projectId: string;
  totalPages: number;
  indexedPages: number;
  avgLoadTime: number;
  mobileScore: number;
  desktopScore: number;
  seoScore: number;
  generatedAt: string;
}
