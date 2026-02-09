export type LinkDetail = {
  id: string;
  anchorText: string;
  anchorUrl: string;
  contentUrl: string;
};

export type Anchor = {
  id: string;
  type: "exact" | "partial" | "branded" | "generic" | "naked";
  inbound: LinkDetail[];
  outbound: LinkDetail[];
};

export type TypeDistributionItem = { name: string; count: number };
export type KeywordItem = { keyword: string; count: number };
export type QualityMetrics = { naturalAnchors: number; overOptimization: number; brandedRatio: number };

export type DiversityAnalysisItem = {
  category: string;
  current: number;
  target: number;
  status: "good" | "warning" | "bad";
  recommendation: string;
};

export type CompetitorComparisonItem = {
  metric: string;
  yourValue: string | number;
  competitorAvg: string | number;
  status: "better" | "worse" | "similar";
};

export type LinkPatternItem = {
  pattern: string;
  frequency: number;
  description: string;
  impact: "positive" | "negative" | "neutral";
};

export type AnchorManagerApi = {
  totalAnchors: number;
  uniqueAnchors: number;
  externalAnchors: number;
  optimizationScore: number;
  typeDistribution: TypeDistributionItem[];
  topKeywords: KeywordItem[];
  qualityMetrics: QualityMetrics;
  recommendations: string[];
  anchors: Anchor[];
  diversityAnalysis: DiversityAnalysisItem[];
  competitorComparison: CompetitorComparisonItem[];
  linkPatterns: LinkPatternItem[];
};
