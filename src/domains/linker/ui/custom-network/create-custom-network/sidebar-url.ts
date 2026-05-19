"use client";

export type UrlCategory = "Design" | "Dev Tools" | "AI" | "Documentation" | "News" | "Cloud" | "Analytics";

export type SidebarUrl = {
  id: string;
  url: string;
  title: string;
  domain: string;
  category: UrlCategory;
  description: string;
};

export type FetchUrlsResult = {
  data: SidebarUrl[];
  nextPage: number | null;
  totalCount: number;
};
