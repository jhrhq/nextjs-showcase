export interface Project {
  id: string;
  name: string;
  domain: string;
  description?: string;
  status: "active" | "inactive" | "pending";
  totalLinks: number;
  totalCustomNetworks: number;
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
