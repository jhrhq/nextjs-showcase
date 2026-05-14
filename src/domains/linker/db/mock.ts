import { hash } from "bcryptjs";
import type { AnchorManager } from "@/domains/linker/types/anchor-manager.types";
import type { SiteReport } from "@/domains/linker/types/site-report.types";
import type { InboundData, SuggestedSentences } from "@/domains/linker/validations/inbound.validation";
import { type ProjectDTO, projectSchema } from "@/domains/linker/validations/projects.validations";

export type MockUser = {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
};
const now = () => new Date().toISOString();

export const mockUsers: MockUser[] = [
  {
    id: "7f4c2a1b-9e8f-4d32-a1b6-3f8e5d0c7b4a",
    email: "user@example.com",
    name: "Mock User",
    passwordHash: await hash("password123", 10),
  },
];

export const mockProjects: ProjectDTO[] = [
  {
    id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d", // Valid (Variant '9' is correct)
    name: "TechCorp Website",
    domain: "https://techcorp.com",
    description: "Main corporate website",
    status: "active",
    totalLinks: 1250,
    totalCustomNetworks: 8,
    lastCrawled: now(),
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "3e4f5a6b-7c8d-4e9f-a0b1-c2d3e4f5a6b7", // Fixed variant (changed 'a' position/bit)
    name: "Blog Platform",
    domain: "https://myblog.com",
    description: "Content publishing site",
    status: "inactive",
    totalLinks: 890,
    totalCustomNetworks: 5,
    lastCrawled: now(),
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "1a2b3c4d-5e6f-40a1-b2c3-d4e5f6a7b8c9", // Fixed variant (changed 'b' bit)
    name: "Portfolio Site",
    domain: "https://johndesigner.com",
    description: "Personal portfolio website",
    status: "pending",
    totalLinks: 45,
    totalCustomNetworks: 2,
    lastCrawled: null,
    createdAt: now(),
    updatedAt: now(),
  },
];
export function getProjects(_useId: string, limit?: number): ProjectDTO[] {
  const validated = mockProjects.map((p) => projectSchema.parse(p));
  return limit ? validated.slice(0, limit) : validated;
}

export const mockSiteReports: SiteReport = {
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
  qualityMetrics: { naturalAnchors: 75, overOptimization: 22, brandedRatio: 35 },
  recommendations: [
    "Reduce exact match anchors from 10% to 5-7% for more natural link profile",
    "Increase branded anchor usage to 40-45% for better brand authority",
    "Add more partial match and generic anchors for diversity",
    "Fix 15 broken anchor links to improve user experience",
  ],
  anchors: [
    {
      id: "d9e8f7a6-b5c4-4d3e-af1a-0b9c8d7e6f5a", // Fixed variant (a)
      type: "Partial Match",
      anchorText: "Market Trends",
      inbound: [
        {
          id: "7c8d9e0f-1a2b-4c3d-be5f-6a7b8c9d0e1f", // Fixed variant (b)
          anchorText: "Market Trends",
          anchorUrl: "https://fin-news.com/trends",
          contentUrl: "https://data-hub.io/stats",
        },
        {
          id: "5a6b7c8d-9e0f-41a2-b3c4-d5e6f7a8b9c0", // Fixed variant (b)
          anchorText: "Market Trends",
          anchorUrl: "https://economy-wire.com/outlook",
          contentUrl: "https://data-hub.io/stats",
        },
        {
          id: "2f3a4b5c-6d7e-48f9-a0b1-c2d3e4f5a6b7", // Fixed variant (a)
          anchorText: "Market Trends",
          anchorUrl: "https://finance-insights.com/market",
          contentUrl: "https://data-hub.io/stats",
        },
        {
          id: "a1b2c3d4-e5f6-47a8-b9c0-d1e2f3a4b5c6", // Fixed variant (b)
          anchorText: "Market Trends",
          anchorUrl: "https://finwire.com/latest",
          contentUrl: "https://data-hub.io/stats",
        },
      ],
      outbound: [],
    },
    {
      id: "e9d8c7b6-a543-4210-9876-543210fedcba", // Valid
      type: "Generic",
      anchorText: "Read more",
      inbound: [
        {
          id: "3d2c1b0a-4e5f-4a7b-8c9d-0e1f2a3b4c5d", // Fixed version (4) + variant (8)
          anchorText: "Read more",
          anchorUrl: "https://travel-blog.com/seattle",
          contentUrl: "https://city-guide.com/main",
        },
        {
          id: "f5e4d3c2-b1a0-4f9e-8d7c-6b5a49382716", // Fixed variant (8)
          anchorText: "Read more",
          anchorUrl: "https://wanderlust.com/seattle",
          contentUrl: "https://city-guide.com/main",
        },
      ],
      outbound: [],
    },
    {
      id: "b7a6c5d4-e3f2-4109-b8d7-c6a5b4e3f2d1", // Fixed variant (b)
      type: "Exact Match",
      anchorText: "SEO tools",
      inbound: [
        {
          id: "4e5f6a7b-8c9d-40e1-a2a3-b4c5d6e7f8a9", // Fixed variant (a)
          anchorText: "SEO tools",
          anchorUrl: "https://code-academy.com/py",
          contentUrl: "https://dev-resource.org/home",
        },
      ],
      outbound: [
        {
          id: "d1c2b3a4-e5f6-47a8-b9c0-d1e2f3a4b5c6", // Fixed variant (b)
          anchorText: "SEO tools",
          anchorUrl: "https://api-docs.com/v1",
          contentUrl: "https://dev-resource.org/dev-portal",
        },
      ],
    },
    {
      id: "a0b1c2d3-e4f5-46a7-b8c9-d0e1f2a3b4c5", // Fixed variant (b)
      type: "Branded",
      anchorText: "Shopify Store",
      inbound: [
        {
          id: "7f6e5d4c-3b2a-4109-8765-43210fedcba9", // Fixed variant (8)
          anchorText: "Shopify Store",
          anchorUrl: "https://promo-hub.net",
          contentUrl: "https://store.com/offers",
        },
      ],
      outbound: [],
    },
    {
      id: "9a8b7c6d-5e4f-4321-a0b1-c2d3e4f5a6b7", // Fixed variant (a)
      type: "Naked URL",
      anchorText: "https://lifestyle.org",
      inbound: [
        {
          id: "e1d2c3b4-a5b6-4c7d-8e9f-0a1b2c3d4e5f", // Fixed variant (8)
          anchorText: "https://lifestyle.org",
          anchorUrl: "https://wellness.com",
          contentUrl: "https://lifestyle.org/tips",
        },
      ],
      outbound: [],
    },
    {
      id: "5c4d3e2f-1a0b-49e8-87c6-b5a43210fedc", // Fixed variant (8)
      type: "Generic",
      anchorText: "Roastery Tour",
      inbound: [],
      outbound: [
        {
          id: "d8e9f0a1-b2c3-4d4e-8f6a-7b8c9d0e1f2a", // Fixed variant (8)
          anchorText: "Roastery Tour",
          anchorUrl: "https://starbucks.com/reserve",
          contentUrl: "https://city-guide.com/coffee",
        },
        {
          id: "1c2d3e4f-5a6b-47c8-89e0-f1a2b3c4d5e6", // Fixed variant (8)
          anchorText: "Roastery Tour",
          anchorUrl: "https://bluebottle.com/reserve",
          contentUrl: "https://city-guide.com/coffee",
        },
      ],
    },
    {
      id: "2b3a4c5d-6e7f-48a9-b0c1-d2e3f4a5b6c7", // Fixed variant (b)
      type: "Exact Match",
      anchorText: "GitHub Repo",
      inbound: [],
      outbound: [
        {
          id: "87071192-3112-4523-9524-118465715783",
          anchorText: "GitHub Repo",
          anchorUrl: "https://github.com/python",
          contentUrl: "https://dev-resource.org/python-guide",
        },
        {
          id: "24467006-2586-4251-8973-196123431688", // Fixed variant (8)
          anchorText: "GitHub Repo",
          anchorUrl: "https://github.com/javascript",
          contentUrl: "https://dev-resource.org/js-guide",
        },
        {
          id: "d3e4f5a6-b7c8-49e0-a1b2-c3d4e5f6a7b8", // Fixed variant (a)
          anchorText: "GitHub Repo",
          anchorUrl: "https://github.com/react",
          contentUrl: "https://dev-resource.org/react-guide",
        },
      ],
    },
    {
      id: "c2d3e4f5-b6a7-48b9-9c0d-e1f2a3b4c5d6", // Fixed variant (9)
      type: "Partial Match",
      anchorText: "Digital Marketing Insights",
      inbound: [
        {
          id: "b1c2d3e4-f5a6-47b8-9c0d-e1f2a3b4c5d6", // Fixed variant (9)
          anchorText: "Digital Marketing Insights",
          anchorUrl: "https://marketinghub.io/blog",
          contentUrl: "https://digitalworld.com/articles",
        },
        {
          id: "3f1f9c8e-6c5b-4c1a-9d2e-7a8b9c0d1e2f", // Fixed variant (9)
          anchorText: "Digital Marketing Insights",
          anchorUrl: "https://growthinsights.com/blog",
          contentUrl: "https://digitalworld.com/articles",
        },
      ],
      outbound: [],
    },
    {
      id: "a7b2c3d4-e5f6-47a8-9b1c-2d3e4f5a6b7c", // Fixed variant (9)
      type: "Generic",
      anchorText: "Analytics Tools",
      inbound: [],
      outbound: [
        {
          id: "9a2d7c4e-1b3f-4e5a-8c9d-0f1a2b3c4d5e", // Fixed variant (8)
          anchorText: "Analytics Tools",
          anchorUrl: "https://analyticspro.io",
          contentUrl: "https://marketingtools.com/dashboard",
        },
        {
          id: "7c6b5a4d-3e2f-4a1b-9d8c-6f5e4d3c2b1a", // Fixed variant (9)
          anchorText: "Analytics Tools",
          anchorUrl: "https://datainsight.io",
          contentUrl: "https://marketingtools.com/dashboard",
        },
      ],
    },
    {
      id: "2d4c6b8a-1e3f-4a5b-9c7d-0e1f2a3b4c5d", // Fixed variant (9)
      type: "Branded",
      anchorText: "Marketing Automation",
      inbound: [
        {
          id: "8e7d6c5b-4a3f-4b1c-9d2e-6f5a4b3c2d1e", // Fixed variant (9)
          anchorText: "Marketing Automation",
          anchorUrl: "https://automatehub.com/tools",
          contentUrl: "https://marketingpro.io/blog",
        },
      ],
      outbound: [
        {
          id: "4c3b2a1d-6e5f-4a7b-9c8d-2e1f3a4b5c6d", // Fixed variant (9)
          anchorText: "Marketing Automation",
          anchorUrl: "https://automatehub.com/tools",
          contentUrl: "https://marketingpro.io/resources",
        },
      ],
    },
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

export const mockInboundData: InboundData = {
  post: {
    id: "1b2c3d4e-5f6a-4b7c-9d8e-0f1a2b3c4d6e",
    title: "How to Build Scalable Microservices with Node.js",
    url: "https://example.com/blog/scalable-microservices-nodejs",
    language: "en",
    postType: "blog",
    category: "[58]",
    projectId: "3c4d5e6f-7a8b-4c9d-9e0f-1a2b3c4d5e6f",
  },
  suggestions: [
    {
      id: "f1a2b3c4-d5e6-4789-8c7d-6e5f4a3b2c1d",
      title: "Understanding Event-Driven Architecture",
      url: "https://example.com/blog/event-driven-architecture",
      language: "en",
      postType: "blog",
      category: "[58]",
      _postId: "9d8c7b6a-5e4f-4a3b-9c2d-1e0f2a3b4c5d",
      score: 95,
    },
    {
      id: "8b9c0d1e-2f3a-4b5c-8d7e-8f9a0b1c2d3e",
      title: "Scaling Applications with Kubernetes",
      url: "https://example.com/blog/scaling-with-kubernetes",
      language: "en",
      postType: "tutorial",
      category: "[58]",
      _postId: "a1b2c3d4-e5f6-4789-9a8b-7c6d5e4f3a2b",
      score: 91,
    },
    {
      id: "4e5f6a7b-8c9d-4e1f-ba3b-4c5d6e7f8a9b",
      title: "Best Practices for REST API Design",
      url: "https://example.com/blog/rest-api-best-practices",
      language: "en",
      postType: "guide",
      category: "[58]",
      _postId: "5f4e3d2c-1b6a-4987-8c9d-0a1b2c3d4e5f",
      score: 88,
    },
    {
      id: "c1d2e3f4-a5b6-4c7d-8e9f-0a1b2c3d4e5f",
      title: "Introduction to Distributed Systems",
      url: "https://example.com/blog/distributed-systems-intro",
      language: "en",
      postType: "article",
      category: "[58]",
      _postId: "6b5a4d3c-2e1f-4a8b-9c7d-5e4f3a2b1c0d",
      score: 85,
    },
    {
      id: "01234567-89ab-4cde-af01-23456789abcd",
      title: "Monitoring and Logging in Microservices",
      url: "https://example.com/blog/monitoring-logging-microservices",
      language: "en",
      postType: "blog",
      category: "[58]",
      _postId: "7d6c5b4a-3e2f-4a1b-9c8d-6f5e4d3c2b1a",
      score: 83,
    },
    {
      id: "fedcba98-7654-4321-b012-3456789abcde",
      title: "Container Orchestration Best Practices",
      url: "https://example.com/blog/container-orchestration-best-practices",
      language: "en",
      postType: "guide",
      category: "[58]",
      _postId: "e1f2a3b4-c5d6-4e7f-8a9b-0c1d2e3f4a5b",
      score: 80,
    },
  ],
};
export const mockSentenceSuggestions: SuggestedSentences[] = [
  [
    {
      id: "d1d0a7f0-3c62-4b63-bc18-2a1f3f3a1b11",
      text: "We've outlined the most common reasons why your Bissell cleaner might be catching on your carpet.",
    },
    {
      id: "a1c6a5c7-3a7f-4c54-9e1a-2b2e8c9e5b12",
      text: "Let's start with the common machine-related reasons your Bissell carpet cleaner might catch.",
    },
    {
      id: "a8f24e51-8f8a-4c3c-9a7a-6c3a2f8e0c13",
      text: "If your Bissell carpet cleaner keeps catching, it is likely due to the roller not being placed properly.",
    },
    {
      id: "1a59c7e1-b3c4-4b62-91f0-0c7e62c34d14",
      text: "There are a few things you can do to prevent your Bissell carpet cleaner from catching on the carpet.",
    },
    {
      id: "1b63f83b-1e43-4c9b-a2b4-3d3c2e9a5e15",
      text: "If you're using ultra-plush carpets, that may be why your Bissell vacuum is failing to clean smoothly.",
    },
  ],
  [
    {
      id: "6d73c63b-cc91-4f3a-b8f1-29a61e24c216",
      text: "Regular maintenance of your ProHeat 2X extends its lifespan significantly.",
    },
    {
      id: "cde66c87-d4f1-4d6a-9b89-0f3b61d7f217",
      text: "The brush roll is the most commonly clogged component and should be checked monthly.",
    },
    {
      id: "fdf1be25-5b2a-4e8c-b6f5-91c0d21b0218",
      text: "After every use, empty the dirty water tank to prevent odors and bacterial growth.",
    },
    {
      id: "c3a2a6d9-b03b-4a0f-9a3f-2f9f52f2d219",
      text: "Descaling the internal hoses every six months prevents mineral buildup in hard-water areas.",
    },
    {
      id: "e27aa8e3-0a74-4e22-b79e-b0b21e8f0c20",
      text: "Always rinse the clean water tank before refilling to avoid detergent residue accumulation.",
    },
  ],
  [
    {
      id: "5df7c1e5-7c32-41a0-8a2b-6dcd77e60221",
      text: "The CrossWave handles hard floors and area rugs while the Symphony focuses purely on steam cleaning.",
    },
    {
      id: "ad5ef2b3-8b10-4e9c-9f6c-43f3e51fa522",
      text: "If you have pets, the CrossWave's dual-action brush roll gives it a notable edge over competitors.",
    },
    {
      id: "e2c43c70-4c6e-4e7c-93a7-8c9f7c2d7c23",
      text: "Both models are priced similarly, making the decision come down to your floor type.",
    },
    {
      id: "a8deb7e2-b09f-44df-9c67-3f1e3df1b824",
      text: "The Symphony requires no cleaning solution, making it a better choice for chemical-sensitive households.",
    },
    {
      id: "a0e15f06-2f88-4cbb-8d1c-b0c9e1a1cc25",
      text: "CrossWave's self-cleaning cycle is a standout feature that keeps the brush roll odor-free.",
    },
  ],
  [
    {
      id: "6c1b0d4a-ec0e-4e91-b4f0-1e3b9c21d026",
      text: "Residue is often caused by using too much cleaning solution in the water tank.",
    },
    {
      id: "12f15b9c-14e3-4d9a-bbdf-6a5e8a6f3027",
      text: "Always dilute cleaning formulas according to the manufacturer's instructions.",
    },
    {
      id: "10b1fa0f-7d63-4c98-93c3-b1df7c5f2d28",
      text: "Running a clean water pass after cleaning helps remove any leftover soap residue.",
    },
    {
      id: "a1c25b63-9980-4b7a-8bcb-7e6e1a9f1e29",
      text: "Hard water reacts with certain Bissell formulas and accelerates residue buildup on fibers.",
    },
    {
      id: "4e8c6f4f-1a93-4f45-91d4-bfa8cbb76c30",
      text: "Switching to Bissell's own cleaning formula reduces incompatibility residue by up to 40%.",
    },
  ],
  [
    {
      id: "9b1a9f8c-3a32-4b5c-9f34-7b3e7d6d9a31",
      text: "Loss of suction is most frequently caused by a full or improperly seated dirty water tank.",
    },
    {
      id: "3a728ad6-1c14-4e7b-b33a-7a2b7b8d3c32",
      text: "Check the nozzle and brush window for hair and fiber clogs before deeper disassembly.",
    },
    {
      id: "e82eda02-5b92-47e2-9e27-1c5b6a8e4c33",
      text: "A cracked or loose hose connection is a silent suction killer that is easy to miss visually.",
    },
    {
      id: "2e61e03f-4c4c-4c2c-b13a-93f3c7e62e34",
      text: "Filters should be rinsed monthly and replaced every three to six months under regular use.",
    },
    {
      id: "7e4ab9e6-2d98-4d21-96df-3b1e3e92c635",
      text: "Never operate the unit without the clean water tank seated — it disrupts the internal airflow path.",
    },
  ],
  [
    {
      id: "8e6041f9-12e3-4a1a-a9c6-9c2bdf0a3e36",
      text: "Persistent odors are almost always sourced from a dirty water tank that wasn't emptied promptly.",
    },
    {
      id: "6d2c3e2a-2c1c-4a3e-92a7-b3e9d1b0a437",
      text: "Bissell's Deep Clean + Antibacterial formula neutralizes odor-causing bacteria at the fiber level.",
    },
    {
      id: "a3a5f6b7-8a8e-4f5a-b0c9-7b7c3e9a4438",
      text: "Soaking removable brush rolls in white vinegar for 20 minutes eliminates embedded mildew smell.",
    },
    {
      id: "b9a3d5b1-3a5c-4f0c-98a3-8e8c9a2f4939",
      text: "Running a 50/50 water and white vinegar cycle through the machine deodorizes internal components.",
    },
    {
      id: "6c2d4c4c-b92b-4e63-9f31-2e7b2a8b3c40",
      text: "If odor persists after cleaning, the foam filter may need replacement rather than rinsing.",
    },
  ],
  [
    {
      id: "1c2bed3a-5a1f-4e9b-8a12-9f3a6e1d1141",
      text: "Streak marks on hard floors typically indicate either too much solution or a worn brush strip.",
    },
    {
      id: "4e3caf7b-cc31-4d52-8d2e-7b6d9e3c1242",
      text: "The edge brush strips on CrossWave models wear down after approximately 40 hours of use.",
    },
    {
      id: "6c1d8f9e-2b4e-4b4e-bb2e-6e7b3c8e7f43",
      text: "Using the hard floor setting while cleaning area rugs redistributes solution unevenly and causes streaking.",
    },
    {
      id: "6e8f2b4d-3c9a-4a8a-b6c7-9e2a4b5c5a44",
      text: "Always ensure the brush roll is spinning freely before each session to avoid drag marks.",
    },
    {
      id: "a7b4c9d1-0f4a-4f74-a6b3-1e7b3a6d3b45",
      text: "Buff out existing streaks with a dry microfiber cloth immediately after the cleaning pass.",
    },
  ],
];
