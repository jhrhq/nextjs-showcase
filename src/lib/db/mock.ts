import { hash } from "bcryptjs";
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
