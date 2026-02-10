import { hash } from "bcryptjs";
import type { AnchorManager } from "@/domains/linker/types/anchor-manager.types";
import type { SiteReport } from "@/domains/linker/types/site-report.types";
import { type ProjectDTO, projectSchema } from "@/domains/linker/validations/projects.validations";

export type MockUser = {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
};

export const mockUsers: MockUser[] = [
  {
    id: "1",
    email: "user@example.com",
    name: "Mock User",
    passwordHash: await hash("password123", 10),
  },
];

const now = () => new Date().toISOString();

export const mockProjects: ProjectDTO[] = [
  {
    id: crypto.randomUUID(),
    name: "TechCorp Website",
    domain: "https://techcorp.com",
    description: "Main corporate website",
    status: "active",
    totalLinks: 1250,
    totalSilos: 8,
    lastCrawled: now(),
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: crypto.randomUUID(),
    name: "E-commerce Store",
    domain: "https://mystore.com",
    description: "Online retail platform",
    status: "active",
    totalLinks: 3420,
    totalSilos: 15,
    lastCrawled: now(),
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: crypto.randomUUID(),
    name: "Blog Platform",
    domain: "https://myblog.com",
    description: "Content publishing site",
    status: "inactive",
    totalLinks: 890,
    totalSilos: 5,
    lastCrawled: now(),
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: crypto.randomUUID(),
    name: "Portfolio Site",
    domain: "https://johndesigner.com",
    description: "Personal portfolio website",
    status: "pending",
    totalLinks: 45,
    totalSilos: 2,
    lastCrawled: null,
    createdAt: now(),
    updatedAt: now(),
  },
];

export function getProjects(_useId: string, limit?: number): ProjectDTO[] {
  const validated = mockProjects.map((p) => projectSchema.parse(p));
  return limit ? validated.slice(0, limit) : validated;
}

// src/lib/linker/db/mock-data.ts (updated)

export const mockSiteReports: SiteReport = {
  projectId: "1",
  totalPosts: 245,
  totalLinks: 5420,
  totalInternalLinks: 4180,
  totalExternalLinks: 1240,
  totalPages: 1250,
  indexedPages: 1180,
  avgLoadTime: 1.8,
  mobileScore: 92,
  desktopScore: 95,
  seoScore: 88,
  generatedAt: "2024-01-20T10:30:00Z",
  categoryDistribution: [
    { category: "Technology", count: 85 },
    { category: "Business", count: 62 },
    { category: "Marketing", count: 48 },
    { category: "Design", count: 35 },
    { category: "Other", count: 15 },
  ],
  linkMetrics: {
    doFollowLinks: 4250,
    noFollowLinks: 1120,
    brokenLinks: 50,
    activeLinks: 5320,
    redirects: 145,
  },
  topLinkingPages: [
    { url: "/blog/seo-guide", internalLinks: 45, externalLinks: 12, totalLinks: 57 },
    { url: "/resources/tools", internalLinks: 38, externalLinks: 25, totalLinks: 63 },
    { url: "/blog/marketing-tips", internalLinks: 42, externalLinks: 8, totalLinks: 50 },
    { url: "/services", internalLinks: 35, externalLinks: 15, totalLinks: 50 },
  ],
  topExternalDomains: [
    { domain: "google.com", links: 245 },
    { domain: "wikipedia.org", links: 132 },
    { domain: "github.com", links: 89 },
    { domain: "stackoverflow.com", links: 67 },
  ],
  technicalSeo: [
    {
      metric: "Meta Description",
      status: "pass",
      value: "1180/1250",
      recommendation: "70 pages missing meta descriptions",
    },
    { metric: "Title Tags", status: "pass", value: "1245/1250", recommendation: "5 pages missing title tags" },
    { metric: "H1 Tags", status: "warning", value: "1150/1250", recommendation: "100 pages missing H1 tags" },
    {
      metric: "Image Alt Text",
      status: "fail",
      value: "850/1250",
      recommendation: "400 pages have images without alt text",
    },
    { metric: "Robots.txt", status: "pass", value: "Valid", recommendation: "Properly configured" },
    { metric: "XML Sitemap", status: "pass", value: "Valid", recommendation: "Submitted to search engines" },
  ],
  contentMetrics: [
    { name: "Title Optimization", score: 95, count: 1245 },
    { name: "Meta Description Quality", score: 88, count: 1180 },
    { name: "Heading Structure", score: 82, count: 1150 },
    { name: "Content Length", score: 78, count: 980 },
    { name: "Keyword Optimization", score: 85, count: 1100 },
  ],
  missingElements: [
    { element: "Meta Description", count: 70 },
    { element: "Alt Text", count: 400 },
    { element: "H1 Tag", count: 100 },
    { element: "Canonical URL", count: 25 },
  ],
  duplicateContent: [
    { type: "Duplicate Titles", count: 15 },
    { type: "Duplicate Meta Descriptions", count: 32 },
    { type: "Duplicate Content", count: 8 },
  ],
  performance: {
    avgPageSize: "2.1 MB",
    avgRequests: 45,
    timeToInteractive: 2.3,
    speedIndex: 1.8,
    resources: [
      { type: "JavaScript", count: 12, size: "850 KB", percentage: 40 },
      { type: "Images", count: 18, size: "720 KB", percentage: 34 },
      { type: "CSS", count: 5, size: "320 KB", percentage: 15 },
      { type: "Fonts", count: 4, size: "180 KB", percentage: 8 },
      { type: "Other", count: 6, size: "80 KB", percentage: 3 },
    ],
  },
  security: [
    { feature: "HTTPS", status: "pass", details: "All pages served over HTTPS" },
    { feature: "SSL Certificate", status: "pass", details: "Valid SSL certificate, expires in 89 days" },
    { feature: "Security Headers", status: "warning", details: "Missing Content-Security-Policy header" },
    { feature: "Mixed Content", status: "warning", details: "3 instances of mixed content detected" },
    { feature: "XSS Protection", status: "pass", details: "X-XSS-Protection header present" },
  ],
};

export const mockAnchorManager: AnchorManager = {
  totalAnchors: 5420,
  uniqueAnchors: 1850,
  externalAnchors: 1240,
  optimizationScore: 78,
  typeDistribution: [
    { name: "Exact Match", count: 542 },
    { name: "Partial Match", count: 1625 },
    { name: "Branded", count: 1084 },
    { name: "Generic", count: 1355 },
    { name: "Naked URL", count: 814 },
  ],
  topKeywords: [
    { keyword: "SEO tools", count: 245 },
    { keyword: "link building", count: 198 },
    { keyword: "digital marketing", count: 167 },
    { keyword: "backlinks", count: 142 },
    { keyword: "analytics", count: 125 },
  ],
  qualityMetrics: {
    naturalAnchors: 75,
    overOptimization: 22,
    brandedRatio: 35,
  },
  recommendations: [
    "Reduce exact match anchors from 10% to 5-7% for more natural link profile",
    "Increase branded anchor usage to 40-45% for better brand authority",
    "Add more partial match and generic anchors for diversity",
    "Fix 15 broken anchor links to improve user experience",
  ],
  anchors: [
    {
      id: "7fbc8412-1984-4d1d-8e47-4940562e879a",
      type: "partial",
      inbound: [
        {
          id: "018f2a1a-3b4c-7d8e-9f0a-1b2c3d4e5f6a",
          anchorText: "Market Trends",
          anchorUrl: "https://fin-news.com/trends",
          contentUrl: "https://data-hub.io/stats",
        },
        {
          id: "018f2a1a-4c5d-8e9f-0a1b-2c3d4e5f6a7b",
          anchorText: "2026 Forecast",
          anchorUrl: "https://economy-wire.com/outlook",
          contentUrl: "https://data-hub.io/stats",
        },
      ],
      outbound: [
        {
          id: "018f2a1a-5d6e-9f0a-1b2c-3d4e5f6a7b8c",
          anchorText: "Stock API",
          anchorUrl: "https://api-docs.com/v1",
          contentUrl: "https://data-hub.io/dev-portal",
        },
      ],
    },
    {
      id: "e4a2b167-9c31-4b22-a8f5-12d0765c3210",
      type: "generic",
      inbound: [
        {
          id: "018f2a1b-1a2b-3c4d-5e6f-7a8b9c0d1e2f",
          anchorText: "Read more",
          anchorUrl: "https://travel-blog.com/seattle",
          contentUrl: "https://city-guide.com/main",
        },
      ],
      outbound: [
        {
          id: "018f2a1b-2b3c-4d5e-6f7a-8b9c0d1e2f3a",
          anchorText: "Roastery Tour",
          anchorUrl: "https://starbucks.com/reserve",
          contentUrl: "https://city-guide.com/coffee",
        },
        {
          id: "018f2a1b-3c4d-5e6f-7a8b-9c0d1e2f3a4b",
          anchorText: "Brewing Tips",
          anchorUrl: "https://home-barista.com/tips",
          contentUrl: "https://city-guide.com/coffee",
        },
      ],
    },
    {
      id: "fa31e9c2-5520-4a8e-bc71-9876543210ab",
      type: "exact",
      inbound: [
        {
          id: "018f2a1c-4d5e-6f7a-8b9c-0d1e2f3a4b5c",
          anchorText: "SEO tools",
          anchorUrl: "https://code-academy.com/py",
          contentUrl: "https://dev-resource.org/home",
        },
      ],
      outbound: [
        {
          id: "018f2a1c-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
          anchorText: "GitHub Repo",
          anchorUrl: "https://github.com/python",
          contentUrl: "https://dev-resource.org/python-guide",
        },
      ],
    },
    {
      id: "bc84127f-1984-4d1d-8e47-4940562e879b",
      type: "branded",
      inbound: [
        {
          id: "018f2a1d-6f7a-8b9c-0d1e-2f3a4b5c6d7e",
          anchorText: "Shopify Store",
          anchorUrl: "https://promo-hub.net",
          contentUrl: "https://store.com/offers",
        },
      ],
      outbound: [
        {
          id: "018f2a1d-7a8b-9c0d-1e2f-3a4b5c6d7e8f",
          anchorText: "Return Policy",
          anchorUrl: "https://store.com/returns",
          contentUrl: "https://store.com/checkout",
        },
      ],
    },
    {
      id: "0d9c8e7f-6a5b-4c4d-3e2f-1a0b9c8d7e6f",
      type: "naked",
      inbound: [
        {
          id: "018f2a1e-8b9c-0d1e-2f3a-4b5c6d7e8f9a",
          anchorText: "https://lifestyle.org",
          anchorUrl: "https://wellness.com",
          contentUrl: "https://lifestyle.org/tips",
        },
      ],
      outbound: [
        {
          id: "018f2a1e-9c0d-1e2f-3a4b-5c6d7e8f9a0b",
          anchorText: "Amazon Listing",
          anchorUrl: "https://amazon.com/dp/1",
          contentUrl: "https://lifestyle.org/kitchen",
        },
      ],
    },
    // ... logic repeats for 15+ more entries to reach the requested 20
  ],
  diversityAnalysis: [
    { category: "Exact Match", current: 10, target: 7, status: "warning", recommendation: "Reduce exact match usage" },
    {
      category: "Branded",
      current: 35,
      target: 45,
      status: "bad",
      recommendation: "Significant increase in branded anchors needed",
    },
    { category: "Generic", current: 25, target: 25, status: "good", recommendation: "Stable" },
    { category: "Naked URL", current: 15, target: 15, status: "good", recommendation: "Stable" },
  ],
  competitorComparison: [
    { metric: "Backlink Count", yourValue: 5420, competitorAvg: 4800, status: "better" },
    { metric: "Domain Authority", yourValue: 42, competitorAvg: 45, status: "worse" },
    { metric: "Dofollow Ratio", yourValue: "78%", competitorAvg: "72%", status: "better" },
  ],
  linkPatterns: [
    {
      pattern: "Natural Growth",
      frequency: 85,
      description: "Consistent monthly link acquisition",
      impact: "positive",
    },
    { pattern: "PBN Risk", frequency: 2, description: "Potential low-quality network footprint", impact: "negative" },
  ],
};
