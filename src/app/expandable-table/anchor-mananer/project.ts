export interface AnchorManagerData {
  totalAnchors: number;
  uniqueAnchors: number;
  externalAnchors: number;
  optimizationScore: number;
  typeDistribution: AnchorTypeDistribution[];
  topKeywords: TopKeyword[];
  qualityMetrics: AnchorQualityMetrics;
  recommendations: string[];
  anchors: Anchor[];
  diversityAnalysis: DiversityAnalysis[];
  competitorComparison: CompetitorComparison[];
  linkPatterns: LinkPattern[];
}

export interface AnchorTypeDistribution {
  name: string;
  count: number;
}

export interface TopKeyword {
  keyword: string;
  count: number;
}

export interface AnchorQualityMetrics {
  naturalAnchors: number;
  overOptimization: number;
  brandedRatio: number;
}

export interface Anchor {
  text: string;
  type: "exact" | "partial" | "branded" | "generic" | "naked";
  targetUrl: string;
  usage: number;
  doFollow: boolean;
  status: "active" | "broken" | "redirect";
}

export interface DiversityAnalysis {
  category: string;
  current: number;
  target: number;
  status: "good" | "warning" | "critical";
  recommendation: string;
}

export interface CompetitorComparison {
  metric: string;
  yourValue: string;
  competitorAvg: string;
  status: "better" | "similar" | "worse";
}

export interface LinkPattern {
  pattern: string;
  frequency: number;
  description: string;
  impact: "positive" | "neutral" | "negative";
}
