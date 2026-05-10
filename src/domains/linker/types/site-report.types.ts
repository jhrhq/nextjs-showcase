export type ISODateString = string;

export type Status = "pass" | "warning" | "fail";
export interface CountMetric {
  count: number;
}

export interface ScoreMetric extends CountMetric {
  score: number;
}
export interface CategoryDistribution {
  category: string;
  count: number;
}

export interface ContentMetric {
  name: string;
  score: number;
  count: number;
}

export interface LinkMetrics {
  doFollowLinks: number;
  noFollowLinks: number;
  activeLinks: number;
  brokenLinks: number;
  redirects: number;
}

export interface TopLinkingPage {
  url: string;
  internalLinks: number;
  externalLinks: number;
  totalLinks: number;
}

export interface ExternalDomain {
  domain: string;
  links: number;
}
export interface TechnicalSeoMetric {
  metric: string;
  status: Status;
  value: string;
  recommendation: string;
}

export interface MissingElement {
  element: string;
  count: number;
}

export interface DuplicateContent {
  type: string;
  count: number;
}
export interface PerformanceResource {
  type: string;
  count: number;
  size: string;
  percentage: number;
}

export interface PerformanceMetrics {
  avgPageSize: string;
  avgRequests: number;
  timeToInteractive: number;
  speedIndex: number;
  resources: PerformanceResource[];
}
export interface SecurityCheck {
  feature: string;
  status: Status;
  details: string;
}

export interface SiteReport {
  // Content & pages
  totalPosts: number;
  totalPages: number;
  indexedPages: number;

  // Links
  totalLinks: number;
  totalInternalLinks: number;
  totalExternalLinks: number;
  linkMetrics: LinkMetrics;
  topLinkingPages: TopLinkingPage[];
  topExternalDomains: ExternalDomain[];

  // SEO scores
  seoScore: number;
  mobileScore: number;
  desktopScore: number;

  // Performance
  avgLoadTime: number;
  performance: PerformanceMetrics;

  // Analytics
  categoryDistribution: CategoryDistribution[];
  contentMetrics: ContentMetric[];

  // Quality issues
  technicalSeo: TechnicalSeoMetric[];
  missingElements: MissingElement[];
  duplicateContent: DuplicateContent[];

  // Security
  security: SecurityCheck[];

  // Meta
  generatedAt: ISODateString;
}

export type PieDatum = {
  name: string;
  value: number;
};
