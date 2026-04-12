export type NestedLinkData = {
  id: string;
  title: string;
  url: string;
  anchor: string;
  status: "ACTIVE" | "STALE" | "UNLINKED";
  isStale?: boolean;
  isUnlinked?: boolean;
};

export type RegistryRowData = {
  id: string;
  url: string;
  targetLinks: string;
  state: "In Progress" | "Fully Linked" | "Unlinked";
  isExpanded?: boolean;
  nestedData?: NestedLinkData[];
};

export const REGISTRY_DATA: RegistryRowData[] = [
  {
    id: "1",
    url: "/products/enterprise-security",
    targetLinks: "2/3",
    state: "In Progress",
    nestedData: [
      {
        id: "n1a",
        title: "Financial Services",
        url: "/solutions/financial-services",
        anchor: "enterprise security solutions",
        status: "ACTIVE",
      },
      {
        id: "n1b",
        title: "Technical Whitepaper",
        url: "/resources/technical-whitepaper-v4",
        anchor: "security infrastructure docs",
        status: "STALE",
        isStale: true,
      },
      {
        id: "n1c",
        title: "API Reference",
        url: "/docs/api-reference-v3",
        anchor: "",
        status: "UNLINKED",
        isUnlinked: true,
      },
    ],
  },
  {
    id: "2",
    url: "/solutions/financial-services",
    targetLinks: "2/3",
    state: "In Progress",
    isExpanded: true,
    nestedData: [
      {
        id: "n2a",
        title: "Enterprise Security",
        url: "/products/enterprise-security",
        anchor: "robust fintech security",
        status: "ACTIVE",
      },
      {
        id: "n2b",
        title: "Technical Whitepaper",
        url: "/resources/technical-whitepaper-v4",
        anchor: "banking infrastructure docs",
        status: "STALE",
        isStale: true,
      },
      {
        id: "n2c",
        title: "Future Blog",
        url: "/blog/future-of-automated-links",
        anchor: "",
        status: "UNLINKED",
        isUnlinked: true,
      },
    ],
  },
  {
    id: "3",
    url: "/resources/technical-whitepaper-v4",
    targetLinks: "3/3",
    state: "Fully Linked",
    nestedData: [
      {
        id: "n3a",
        title: "Enterprise Security",
        url: "/products/enterprise-security",
        anchor: "whitepaper security guide",
        status: "ACTIVE",
      },
      {
        id: "n3b",
        title: "Financial Services",
        url: "/solutions/financial-services",
        anchor: "technical banking paper",
        status: "ACTIVE",
      },
      {
        id: "n3c",
        title: "Future Blog",
        url: "/blog/future-of-automated-links",
        anchor: "automated link research",
        status: "ACTIVE",
      },
    ],
  },
  {
    id: "4",
    url: "/blog/future-of-automated-links",
    targetLinks: "0/3",
    state: "Unlinked",
    nestedData: [
      {
        id: "n4a",
        title: "Enterprise Security",
        url: "/products/enterprise-security",
        anchor: "",
        status: "UNLINKED",
        isUnlinked: true,
      },
      {
        id: "n4b",
        title: "Financial Services",
        url: "/solutions/financial-services",
        anchor: "",
        status: "UNLINKED",
        isUnlinked: true,
      },
      {
        id: "n4c",
        title: "Technical Whitepaper",
        url: "/resources/technical-whitepaper-v4",
        anchor: "",
        status: "UNLINKED",
        isUnlinked: true,
      },
    ],
  },
  {
    id: "5",
    url: "/docs/api-reference-v3",
    targetLinks: "1/3",
    state: "In Progress",
    nestedData: [
      {
        id: "n5a",
        title: "Enterprise Security",
        url: "/products/enterprise-security",
        anchor: "api security reference",
        status: "ACTIVE",
      },
      {
        id: "n5b",
        title: "Technical Whitepaper",
        url: "/resources/technical-whitepaper-v4",
        anchor: "",
        status: "UNLINKED",
        isUnlinked: true,
      },
      {
        id: "n5c",
        title: "Financial Services",
        url: "/solutions/financial-services",
        anchor: "api fintech docs",
        status: "STALE",
        isStale: true,
      },
    ],
  },
  {
    id: "6",
    url: "/about/company-overview",
    targetLinks: "3/3",
    state: "Fully Linked",
    nestedData: [
      {
        id: "n6a",
        title: "Enterprise Security",
        url: "/products/enterprise-security",
        anchor: "our security products",
        status: "ACTIVE",
      },
      {
        id: "n6b",
        title: "Financial Services",
        url: "/solutions/financial-services",
        anchor: "financial solutions overview",
        status: "ACTIVE",
      },
      {
        id: "n6c",
        title: "API Reference",
        url: "/docs/api-reference-v3",
        anchor: "developer resources",
        status: "ACTIVE",
      },
    ],
  },
];

export type UrlOccurrence = { parentRow: RegistryRowData; link: NestedLinkData };

export function buildUrlFrequencyMap(): Map<string, UrlOccurrence[]> {
  const map = new Map<string, UrlOccurrence[]>();
  for (const row of REGISTRY_DATA) {
    for (const link of row.nestedData ?? []) {
      const existing = map.get(link.url) ?? [];
      existing.push({ parentRow: row, link });
      map.set(link.url, existing);
    }
  }
  return map;
}

export type NestedMatchField = "url" | "title" | "anchor";
export type NestedMatchInfo = { link: NestedLinkData; matchedFields: NestedMatchField[] };

export function deepSearch(
  row: RegistryRowData,
  query: string
): {
  rowUrlMatch: boolean;
  nestedMatches: NestedMatchInfo[];
} {
  const q = query.toLowerCase().trim();
  if (!q) return { rowUrlMatch: false, nestedMatches: [] };
  const rowUrlMatch = row.url.toLowerCase().includes(q);
  const nestedMatches: NestedMatchInfo[] = [];
  for (const link of row.nestedData ?? []) {
    const matchedFields: NestedMatchField[] = [];
    if (link.url.toLowerCase().includes(q)) matchedFields.push("url");
    if (link.title.toLowerCase().includes(q)) matchedFields.push("title");
    if (link.anchor.toLowerCase().includes(q)) matchedFields.push("anchor");
    if (matchedFields.length > 0) nestedMatches.push({ link, matchedFields });
  }
  return { rowUrlMatch, nestedMatches };
}
