// ─── Domain Types ─────────────────────────────────────────────────────────────

export interface SidebarPost {
  id: number;
  title: string;
  /** Fully-qualified URL, e.g. "https://cleaningtuts.com/some-slug/" */
  slug: string;
}

export interface SidebarPage {
  items: SidebarPost[];
  /** `undefined` when there are no more pages */
  nextPage: number | undefined;
}

export interface LinkResult {
  id: string;
  title: string;
  /** Root-relative path, e.g. "/some-post-slug/" */
  slug: string;
  /** Relevance score 0–100 */
  score: number;
  clicks: number;
  impressions: number;
  /** Average SERP position */
  position: number;
}

// ─── Form Types ───────────────────────────────────────────────────────────────

export interface TargetUrlFormValues {
  url: string;
}
