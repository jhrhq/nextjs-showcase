export type UrlCategory = "Design" | "Dev Tools" | "AI" | "Documentation" | "News" | "Cloud" | "Analytics";

export interface SidebarUrl {
  id: string;
  url: string;
  title: string;
  domain: string;
  category: UrlCategory;
  description: string;
}

export interface FetchUrlsResult {
  data: SidebarUrl[];
  nextPage: number | null;
  totalCount: number;
}
