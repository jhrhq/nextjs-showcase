// src/hooks/linker/use-projects.ts (add anchor hook)

/* export function useAnchorManager(projectId: string) {
  return useQuery({
    queryKey: ["linker-anchor-manager", projectId],
    queryFn: () => projectsApi.getAnchorManager(projectId),
    enabled: !!projectId,
  });
} */

// src/lib/linker/api/projects.ts (add anchor API)

/* export const projectsApi = {
  // ... existing methods
  getAnchorManager: async (projectId: string): Promise<AnchorManagerData> => {
    const response = await linkerApi.get(`/projects/${projectId}/anchor-manager`);
    return response.data;
  },
}; */

// src/lib/linker/db/mock-data.ts (add anchor data)

export const mockAnchorData = {
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
      text: "best SEO tools 2024",
      type: "exact",
      targetUrl: "https://example.com/seo-tools",
      usage: 45,
      doFollow: true,
      status: "active",
    },
    {
      text: "learn more about SEO",
      type: "partial",
      targetUrl: "https://example.com/seo-guide",
      usage: 78,
      doFollow: true,
      status: "active",
    },
    {
      text: "TechCorp",
      type: "branded",
      targetUrl: "https://example.com",
      usage: 156,
      doFollow: true,
      status: "active",
    },
    {
      text: "click here",
      type: "generic",
      targetUrl: "https://example.com/contact",
      usage: 32,
      doFollow: false,
      status: "active",
    },
    {
      text: "https://example.com/blog",
      type: "naked",
      targetUrl: "https://example.com/blog",
      usage: 23,
      doFollow: true,
      status: "active",
    },
  ],
  diversityAnalysis: [
    {
      category: "Exact Match Anchors",
      current: 10,
      target: 7,
      status: "warning",
      recommendation: "Reduce exact match usage to avoid over-optimization",
    },
    {
      category: "Branded Anchors",
      current: 35,
      target: 40,
      status: "good",
      recommendation: "Slightly increase branded anchors for better authority",
    },
    {
      category: "Generic Anchors",
      current: 25,
      target: 25,
      status: "good",
      recommendation: "Maintain current generic anchor ratio",
    },
    {
      category: "Partial Match Anchors",
      current: 30,
      target: 28,
      status: "good",
      recommendation: "Good balance of partial match anchors",
    },
  ],
  competitorComparison: [
    { metric: "Exact Match %", yourValue: "10%", competitorAvg: "7%", status: "worse" },
    { metric: "Branded %", yourValue: "35%", competitorAvg: "42%", status: "worse" },
    { metric: "Anchor Diversity", yourValue: "1850", competitorAvg: "1620", status: "better" },
    { metric: "DoFollow Ratio", yourValue: "78%", competitorAvg: "75%", status: "similar" },
  ],
  linkPatterns: [
    {
      pattern: "Homepage Concentration",
      frequency: 245,
      description: "45% of anchors point to homepage",
      impact: "neutral",
    },
    {
      pattern: "Deep Link Diversity",
      frequency: 180,
      description: "Good distribution across internal pages",
      impact: "positive",
    },
    {
      pattern: "Exact Match Clusters",
      frequency: 67,
      description: "Multiple exact match anchors to same page",
      impact: "negative",
    },
    {
      pattern: "Natural Variation",
      frequency: 892,
      description: "High anchor text variation for target pages",
      impact: "positive",
    },
  ],
};
