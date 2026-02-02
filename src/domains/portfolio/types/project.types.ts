export interface Project {
  id: string;
  name: string;
  domain: string;
  description?: string;
  status: "active" | "inactive" | "pending";
  totalLinks: number;
  totalSilos: number;
  lastCrawled?: string;
  createdAt: string;
  updatedAt: string;
}

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
