import { hash } from "bcryptjs";
import type { AnchorManager } from "@/domains/linker/types/anchor-manager.types";
import type { SiteReport } from "@/domains/linker/types/site-report.types";
import type { InboundData, SentenceSuggestions } from "@/domains/linker/validations/inbound.validation";
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
    totalCustomNetworks: 8,
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
    totalCustomNetworks: 5,
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

// src/lib/linker/db/mock-data.ts (updated)

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
    {
      url: "/blog/seo-guide",
      internalLinks: 45,
      externalLinks: 12,
      totalLinks: 57,
    },
    {
      url: "/resources/tools",
      internalLinks: 38,
      externalLinks: 25,
      totalLinks: 63,
    },
    {
      url: "/blog/marketing-tips",
      internalLinks: 42,
      externalLinks: 8,
      totalLinks: 50,
    },
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
    {
      metric: "Title Tags",
      status: "pass",
      value: "1245/1250",
      recommendation: "5 pages missing title tags",
    },
    {
      metric: "H1 Tags",
      status: "warning",
      value: "1150/1250",
      recommendation: "100 pages missing H1 tags",
    },
    {
      metric: "Image Alt Text",
      status: "fail",
      value: "850/1250",
      recommendation: "400 pages have images without alt text",
    },
    {
      metric: "Robots.txt",
      status: "pass",
      value: "Valid",
      recommendation: "Properly configured",
    },
    {
      metric: "XML Sitemap",
      status: "pass",
      value: "Valid",
      recommendation: "Submitted to search engines",
    },
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
    {
      feature: "HTTPS",
      status: "pass",
      details: "All pages served over HTTPS",
    },
    {
      feature: "SSL Certificate",
      status: "pass",
      details: "Valid SSL certificate, expires in 89 days",
    },
    {
      feature: "Security Headers",
      status: "warning",
      details: "Missing Content-Security-Policy header",
    },
    {
      feature: "Mixed Content",
      status: "warning",
      details: "3 instances of mixed content detected",
    },
    {
      feature: "XSS Protection",
      status: "pass",
      details: "X-XSS-Protection header present",
    },
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
      type: "Partial Match",
      anchorText: "Market Trends",
      inbound: [
        {
          id: "018f2a1a-3b4c-7d8e-9f0a-1b2c3d4e5f6a",
          anchorText: "Market Trends",
          anchorUrl: "https://fin-news.com/trends",
          contentUrl: "https://data-hub.io/stats",
        },
        {
          id: "018f2a1a-4c5d-8e9f-0a1b-2c3d4e5f6a7b",
          anchorText: "Market Trends",
          anchorUrl: "https://economy-wire.com/outlook",
          contentUrl: "https://data-hub.io/stats",
        },
        {
          id: "018f2a1a-9d3c-7b8a-2e1f-4c5d6e7f8a9b",
          anchorText: "Market Trends",
          anchorUrl: "https://finance-insights.com/market",
          contentUrl: "https://data-hub.io/stats",
        },
        {
          id: "018f2a1a-1b2c-3d4e-5f6a-7b8c9d0e1f2a",
          anchorText: "Market Trends",
          anchorUrl: "https://finwire.com/latest",
          contentUrl: "https://data-hub.io/stats",
        },
      ],
      outbound: [],
    },
    {
      id: "e4a2b167-9c31-4b22-a8f5-12d0765c3210",
      type: "Generic",
      anchorText: "Read more",
      inbound: [
        {
          id: "018f2a1b-1a2b-3c4d-5e6f-7a8b9c0d1e2f",
          anchorText: "Read more",
          anchorUrl: "https://travel-blog.com/seattle",
          contentUrl: "https://city-guide.com/main",
        },
        {
          id: "018f2a1b-4d5e-6f7a-8b9c-0d1e2f3a4b5d",
          anchorText: "Read more",
          anchorUrl: "https://wanderlust.com/seattle",
          contentUrl: "https://city-guide.com/main",
        },
      ],
      outbound: [],
    },
    {
      id: "fa31e9c2-5520-4a8e-bc71-9876543210ab",
      type: "Exact Match",
      anchorText: "SEO tools",
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
          anchorText: "SEO tools",
          anchorUrl: "https://api-docs.com/v1",
          contentUrl: "https://dev-resource.org/dev-portal",
        },
      ],
    },
    {
      id: "bc84127f-1984-4d1d-8e47-4940562e879b",
      type: "Branded",
      anchorText: "Shopify Store",
      inbound: [
        {
          id: "018f2a1d-6f7a-8b9c-0d1e-2f3a4b5c6d7e",
          anchorText: "Shopify Store",
          anchorUrl: "https://promo-hub.net",
          contentUrl: "https://store.com/offers",
        },
      ],
      outbound: [],
    },
    {
      id: "0d9c8e7f-6a5b-4c4d-3e2f-1a0b9c8d7e6f",
      type: "Naked URL",
      anchorText: "https://lifestyle.org",
      inbound: [
        {
          id: "018f2a1e-8b9c-0d1e-2f3a-4b5c6d7e8f9a",
          anchorText: "https://lifestyle.org",
          anchorUrl: "https://wellness.com",
          contentUrl: "https://lifestyle.org/tips",
        },
      ],
      outbound: [],
    },

    /* OUTBOUND ONLY */
    {
      id: "anchor-outbound-1",
      type: "Generic",
      anchorText: "Roastery Tour",
      inbound: [],
      outbound: [
        {
          id: "018f2a1b-2b3c-4d5e-6f7a-8b9c0d1e2f3a",
          anchorText: "Roastery Tour",
          anchorUrl: "https://starbucks.com/reserve",
          contentUrl: "https://city-guide.com/coffee",
        },
        {
          id: "018f2a1b-3c4d-5e6f-7a8b-9c0d1e2f3a4b",
          anchorText: "Roastery Tour",
          anchorUrl: "https://bluebottle.com/reserve",
          contentUrl: "https://city-guide.com/coffee",
        },
      ],
    },
    {
      id: "anchor-outbound-2",
      type: "Exact Match",
      anchorText: "GitHub Repo",
      inbound: [],
      outbound: [
        {
          id: "018f2a1f-4e5d-6a7b-8c9d-0f1a2b3c4d5e",
          anchorText: "GitHub Repo",
          anchorUrl: "https://github.com/python",
          contentUrl: "https://dev-resource.org/python-guide",
        },
        {
          id: "018f2a1f-5f6e-7a8b-9c0d-1e2f3a4b5c6f",
          anchorText: "GitHub Repo",
          anchorUrl: "https://github.com/javascript",
          contentUrl: "https://dev-resource.org/js-guide",
        },
        {
          id: "018f2a1f-6g7h-8i9j-0k1l-2m3n4o5p6q7r",
          anchorText: "GitHub Repo",
          anchorUrl: "https://github.com/react",
          contentUrl: "https://dev-resource.org/react-guide",
        },
      ],
    },

    /* MORE VARIATIONS FOR RANDOMNESS */
    {
      id: "anchor-mixed-1",
      type: "Partial Match",
      anchorText: "Digital Marketing Insights",
      inbound: [
        {
          id: "018f2a1g-1h2i-3j4k-5l6m",
          anchorText: "Digital Marketing Insights",
          anchorUrl: "https://marketinghub.io/blog",
          contentUrl: "https://digitalworld.com/articles",
        },
        {
          id: "018f2a1g-7h8i-9j0k-1l2m",
          anchorText: "Digital Marketing Insights",
          anchorUrl: "https://growthinsights.com/blog",
          contentUrl: "https://digitalworld.com/articles",
        },
      ],
      outbound: [],
    },
    {
      id: "anchor-mixed-2",
      type: "Generic",
      anchorText: "Analytics Tools",
      inbound: [],
      outbound: [
        {
          id: "018f2a1h-1h2i-3j4k-5l6m",
          anchorText: "Analytics Tools",
          anchorUrl: "https://analyticspro.io",
          contentUrl: "https://marketingtools.com/dashboard",
        },
        {
          id: "018f2a1h-7h8i-9j0k-1l2m",
          anchorText: "Analytics Tools",
          anchorUrl: "https://datainsight.io",
          contentUrl: "https://marketingtools.com/dashboard",
        },
      ],
    },

    /* Rare inbound+outbound */
    {
      id: "anchor-rare-1",
      type: "Branded",
      anchorText: "Marketing Automation",
      inbound: [
        {
          id: "018f2a1i-1h2i-3j4k-5l6m",
          anchorText: "Marketing Automation",
          anchorUrl: "https://automatehub.com/tools",
          contentUrl: "https://marketingpro.io/blog",
        },
      ],
      outbound: [
        {
          id: "018f2a1i-7h8i-9j0k-1l2m",
          anchorText: "Marketing Automation",
          anchorUrl: "https://automatehub.com/tools",
          contentUrl: "https://marketingpro.io/resources",
        },
      ],
    },

    /* Add more random entries to reach 20 anchors */
    {
      id: "anchor-random-1",
      type: "Exact Match",
      anchorText: "Link Building Guide",
      inbound: [],
      outbound: [
        {
          id: "018f2a1j-1h2i-3j4k",
          anchorText: "Link Building Guide",
          anchorUrl: "https://backlinkguru.com/guide",
          contentUrl: "https://seoportal.io/resources",
        },
      ],
    },
    {
      id: "anchor-random-2",
      type: "Partial Match",
      anchorText: "Content Strategy Tips",
      inbound: [
        {
          id: "018f2a1k-1h2i",
          anchorText: "Content Strategy Tips",
          anchorUrl: "https://contenthub.io/tips",
          contentUrl: "https://marketingworld.io/blog",
        },
      ],
      outbound: [],
    },
    {
      id: "anchor-random-3",
      type: "Generic",
      anchorText: "Brand Authority",
      inbound: [],
      outbound: [
        {
          id: "018f2a1l-1h2i",
          anchorText: "Brand Authority",
          anchorUrl: "https://brandboost.io/resources",
          contentUrl: "https://marketingtools.com/insights",
        },
      ],
    },
    {
      id: "anchor-random-4",
      type: "Naked URL",
      anchorText: "https://startupinsights.org",
      inbound: [
        {
          id: "018f2a1m-1h2i",
          anchorText: "https://startupinsights.org",
          anchorUrl: "https://techstartup.com",
          contentUrl: "https://startupinsights.org/guides",
        },
      ],
      outbound: [],
    },
    {
      id: "anchor-random-5",
      type: "Branded",
      anchorText: "Shop Tools",
      inbound: [],
      outbound: [
        {
          id: "018f2a1n-1h2i",
          anchorText: "Shop Tools",
          anchorUrl: "https://storetools.com/products",
          contentUrl: "https://storehub.com/catalog",
        },
      ],
    },
    {
      id: "anchor-random-6",
      type: "Partial Match",
      anchorText: "SEO Analysis",
      inbound: [
        {
          id: "018f2a1o-1h2i",
          anchorText: "SEO Analysis",
          anchorUrl: "https://seo-insight.io",
          contentUrl: "https://marketinghub.com/articles",
        },
      ],
      outbound: [],
    },
  ],

  diversityAnalysis: [
    {
      category: "Exact Match",
      current: 10,
      target: 7,
      status: "warning",
      recommendation: "Reduce exact match usage",
    },
    {
      category: "Branded",
      current: 35,
      target: 45,
      status: "bad",
      recommendation: "Significant increase in branded anchors needed",
    },
    {
      category: "Generic",
      current: 25,
      target: 25,
      status: "good",
      recommendation: "Stable",
    },
    {
      category: "Naked URL",
      current: 15,
      target: 15,
      status: "good",
      recommendation: "Stable",
    },
  ],

  competitorComparison: [
    {
      metric: "Backlink Count",
      yourValue: 5420,
      competitorAvg: 4800,
      status: "better",
    },
    {
      metric: "Domain Authority",
      yourValue: 42,
      competitorAvg: 45,
      status: "worse",
    },
    {
      metric: "Dofollow Ratio",
      yourValue: "78%",
      competitorAvg: "72%",
      status: "better",
    },
  ],

  linkPatterns: [
    {
      pattern: "Natural Growth",
      frequency: 85,
      description: "Consistent monthly link acquisition",
      impact: "positive",
    },
    {
      pattern: "PBN Risk",
      frequency: 2,
      description: "Potential low-quality network footprint",
      impact: "negative",
    },
  ],
};

export const mockInboundData: InboundData = {
  post: {
    id: "3f1f9c8e-6c5b-4c1a-9d2e-7a8b9c0d1e2f",
    title: "How to Build Scalable Microservices with Node.js",
    url: "https://example.com/blog/scalable-microservices-nodejs",
    language: "en",
    postType: "blog",
    // builder: "tech-writer-01",
    category: "[58]",
    projectId: "a7b2c3d4-e5f6-47a8-9b1c-2d3e4f5a6b7c",
  },
  suggestions: [
    {
      id: "9a2d7c4e-1b3f-4e5a-8c9d-0f1a2b3c4d5e",
      title: "Understanding Event-Driven Architecture",
      url: "https://example.com/blog/event-driven-architecture",
      language: "en",
      postType: "blog",
      category: "[58]",
      _postId: "f1e2d3c4-b5a6-4789-8c7d-6e5f4a3b2c1d",
      score: 95,
    },
    {
      id: "7c6b5a4d-3e2f-4a1b-9d8c-6f5e4d3c2b1a",
      title: "Scaling Applications with Kubernetes",
      url: "https://example.com/blog/scaling-with-kubernetes",
      language: "en",
      postType: "tutorial",
      category: "[58]",
      _postId: "1a2b3c4d-5e6f-4789-9a8b-7c6d5e4f3a2b",
      score: 91,
    },
    {
      id: "2d4c6b8a-1e3f-4a5b-9c7d-0e1f2a3b4c5d",
      title: "Best Practices for REST API Design",
      url: "https://example.com/blog/rest-api-best-practices",
      language: "en",
      postType: "guide",
      category: "[58]",
      _postId: "5f4e3d2c-1b6a-4987-8c9d-0a1b2c3d4e5f",
      score: 88,
    },
    {
      id: "8e7d6c5b-4a3f-4b1c-9d2e-6f5a4b3c2d1e",
      title: "Introduction to Distributed Systems",
      url: "https://example.com/blog/distributed-systems-intro",
      language: "en",
      postType: "article",
      category: "[58]",
      _postId: "6b5a4d3c-2e1f-4a8b-9c7d-5e4f3a2b1c0d",
      score: 85,
    },
    {
      id: "4c3b2a1d-6e5f-4a7b-9c8d-2e1f3a4b5c6d",
      title: "Monitoring and Logging in Microservices",
      url: "https://example.com/blog/monitoring-logging-microservices",
      language: "en",
      postType: "blog",
      category: "[58]",
      _postId: "9d8c7b6a-5e4f-4a3b-9c2d-1e0f2a3b4c5d",
      score: 83,
    },
    {
      id: "1b2c3d4e-5f6a-4b7c-9d8e-0f1a2b3c4d6e",
      title: "Container Orchestration Best Practices",
      url: "https://example.com/blog/container-orchestration-best-practices",
      language: "en",
      postType: "guide",
      category: "[58]",
      _postId: "3c4d5e6f-7a8b-4c9d-9e0f-1a2b3c4d5e6f",
      score: 80,
    },
  ],
};

export const mockSentenceSuggestions: Record<string, SentenceSuggestions> = {
  "9a2d7c4e-1b3f-4e5a-8c9d-0f1a2b3c4d5e": [
    {
      id: "7f0d1d0a-3c62-4b63-bc18-2a1f3f3a1b11",
      text: "We've outlined the most common reasons why your Bissell cleaner might be catching on your carpet.",
    },
    {
      id: "a5c7a1c6-3a7f-4c54-9e1a-2b2e8c9e5b12",
      text: "Let's start with the common machine-related reasons your Bissell carpet cleaner might catch.",
    },
    {
      id: "4e51a8f2-8f8a-4c3c-9a7a-6c3a2f8e0c13",
      text: "If your Bissell carpet cleaner keeps catching, it is likely due to the roller not being placed properly.",
    },
    {
      id: "c7e11a59-b3c4-4b62-91f0-0c7e62c34d14",
      text: "There are a few things you can do to prevent your Bissell carpet cleaner from catching on the carpet.",
    },
    {
      id: "f83b1b63-1e43-4c9b-a2b4-3d3c2e9a5e15",
      text: "If you're using ultra-plush carpets, that may be why your Bissell vacuum is failing to clean smoothly.",
    },
  ],

  "f1e2d3c4-b5a6-4789-8c7d-6e5f4a3b2c1d": [
    {
      id: "c63b6d73-cc91-4f3a-b8f1-29a61e24c216",
      text: "Regular maintenance of your ProHeat 2X extends its lifespan significantly.",
    },
    {
      id: "6c87cde6-d4f1-4d6a-9b89-0f3b61d7f217",
      text: "The brush roll is the most commonly clogged component and should be checked monthly.",
    },
    {
      id: "be25fdf1-5b2a-4e8c-b6f5-91c0d21b0218",
      text: "After every use, empty the dirty water tank to prevent odors and bacterial growth.",
    },
    {
      id: "a6d9c3a2-b03b-4a0f-9a3f-2f9f52f2d219",
      text: "Descaling the internal hoses every six months prevents mineral buildup in hard-water areas.",
    },
    {
      id: "a8e3e27a-0a74-4e22-b79e-b0b21e8f0c20",
      text: "Always rinse the clean water tank before refilling to avoid detergent residue accumulation.",
    },
  ],

  "363231db-dd6d-4707-b092-ac1f3fda3b33": [
    {
      id: "c1e55df7-7c32-41a0-8a2b-6dcd77e60221",
      text: "The CrossWave handles hard floors and area rugs while the Symphony focuses purely on steam cleaning.",
    },
    {
      id: "f2b3ad5e-8b10-4e9c-9f6c-43f3e51fa522",
      text: "If you have pets, the CrossWave's dual-action brush roll gives it a notable edge over competitors.",
    },
    {
      id: "3c70e2c4-4c6e-4e7c-93a7-8c9f7c2d7c23",
      text: "Both models are priced similarly, making the decision come down to your floor type.",
    },
    {
      id: "b7e2a8de-b09f-44df-9c67-3f1e3df1b824",
      text: "The Symphony requires no cleaning solution, making it a better choice for chemical-sensitive households.",
    },
    {
      id: "5f06a0e1-2f88-4cbb-8d1c-b0c9e1a1cc25",
      text: "CrossWave's self-cleaning cycle is a standout feature that keeps the brush roll odor-free.",
    },
  ],

  "a1b2c3d4-e5f6-7890-abcd-ef1234567890": [
    {
      id: "0d4a6c1b-ec0e-4e91-b4f0-1e3b9c21d026",
      text: "Residue is often caused by using too much cleaning solution in the water tank.",
    },
    {
      id: "5b9c12f1-14e3-4d9a-bbdf-6a5e8a6f3027",
      text: "Always dilute cleaning formulas according to the manufacturer's instructions.",
    },
    {
      id: "fa0f10b1-7d63-4c98-93c3-b1df7c5f2d28",
      text: "Running a clean water pass after cleaning helps remove any leftover soap residue.",
    },
    {
      id: "5b63a1c2-9980-4b7a-8bcb-7e6e1a9f1e29",
      text: "Hard water reacts with certain Bissell formulas and accelerates residue buildup on fibers.",
    },
    {
      id: "6f4f4e8c-1a93-4f45-91d4-bfa8cbb76c30",
      text: "Switching to Bissell's own cleaning formula reduces incompatibility residue by up to 40%.",
    },
  ],

  "b2c3d4e5-f6a7-8901-bcde-f12345678901": [
    {
      id: "9f8c9b1a-3a32-4b5c-9f34-7b3e7d6d9a31",
      text: "Loss of suction is most frequently caused by a full or improperly seated dirty water tank.",
    },
    {
      id: "8ad63a72-1c14-4e7b-b33a-7a2b7b8d3c32",
      text: "Check the nozzle and brush window for hair and fiber clogs before deeper disassembly.",
    },
    {
      id: "da02e82e-5b92-47e2-9e27-1c5b6a8e4c33",
      text: "A cracked or loose hose connection is a silent suction killer that is easy to miss visually.",
    },
    {
      id: "e03f2e61-4c4c-4c2c-b13a-93f3c7e62e34",
      text: "Filters should be rinsed monthly and replaced every three to six months under regular use.",
    },
    {
      id: "b9e67e4a-2d98-4d21-96df-3b1e3e92c635",
      text: "Never operate the unit without the clean water tank seated — it disrupts the internal airflow path.",
    },
  ],

  "c3d4e5f6-a7b8-9012-cdef-012345678902": [
    {
      id: "41f98e60-12e3-4a1a-a9c6-9c2bdf0a3e36",
      text: "Persistent odors are almost always sourced from a dirty water tank that wasn't emptied promptly.",
    },
    {
      id: "3e2a6d2c-2c1c-4a3e-92a7-b3e9d1b0a437",
      text: "Bissell's Deep Clean + Antibacterial formula neutralizes odor-causing bacteria at the fiber level.",
    },
    {
      id: "f6b7a3a5-8a8e-4f5a-b0c9-7b7c3e9a4438",
      text: "Soaking removable brush rolls in white vinegar for 20 minutes eliminates embedded mildew smell.",
    },
    {
      id: "d5b1b9a3-3a5c-4f0c-98a3-8e8c9a2f4939",
      text: "Running a 50/50 water and white vinegar cycle through the machine deodorizes internal components.",
    },
    {
      id: "4c4c6c2d-b92b-4e63-9f31-2e7b2a8b3c40",
      text: "If odor persists after cleaning, the foam filter may need replacement rather than rinsing.",
    },
  ],

  "d4e5f6a7-b8c9-0123-defa-123456789003": [
    {
      id: "ed3a1c2b-5a1f-4e9b-8a12-9f3a6e1d1141",
      text: "Streak marks on hard floors typically indicate either too much solution or a worn brush strip.",
    },
    {
      id: "af7b4e3c-cc31-4d52-8d2e-7b6d9e3c1242",
      text: "The edge brush strips on CrossWave models wear down after approximately 40 hours of use.",
    },
    {
      id: "8f9e6c1d-2b4e-4b4e-bb2e-6e7b3c8e7f43",
      text: "Using the hard floor setting while cleaning area rugs redistributes solution unevenly and causes streaking.",
    },
    {
      id: "2b4d6e8f-3c9a-4a8a-b6c7-9e2a4b5c5a44",
      text: "Always ensure the brush roll is spinning freely before each session to avoid drag marks.",
    },
    {
      id: "c9d1a7b4-0f4a-4f74-a6b3-1e7b3a6d3b45",
      text: "Buff out existing streaks with a dry microfiber cloth immediately after the cleaning pass.",
    },
  ],
};
