import type {
  AllCustomNetworkDataType,
  CreateCustomNetworkResponseSchemaValues,
  CustomNetworkCollectionValues,
  CustomNetworkNestedLinkValues,
} from "@/domains/linker/validations/custom-network.validation";

export const CUSTOM_NETWORK_DATA: CreateCustomNetworkResponseSchemaValues = {
  projectId: "f509859c-94e3-4712-a63a-b4fba9139fa6",
  id: "6e28848d-718e-49b0-9b62-1777264870f4",
  collectionName: "Test Collection",
  collections: [
    {
      id: "9c3b8606-2580-4554-9964-63303d86506a", // Validated
      url: "/products/enterprise-security",
      targetLinks: "2/3",
      state: "In Progress",
      nestedData: [
        {
          id: "38927907-7443-426b-8060-f38f45a8e32c",
          title: "Financial Services",
          url: "/solutions/financial-services",
          anchor: "enterprise security solutions",
          status: "ACTIVE",
        },
        {
          id: "54278484-8395-4680-a614-38605c486847",
          title: "Technical Whitepaper",
          url: "/resources/technical-whitepaper-v4",
          anchor: "security infrastructure docs",
          status: "STALE",
        },
        {
          id: "96901804-0678-4509-9061-689308006a88",
          title: "API Reference",
          url: "/docs/api-reference-v3",
          anchor: "",
          status: "UNLINKED",
        },
      ],
    },
    {
      id: "46617068-0703-4903-8406-3c2242171114",
      url: "/solutions/financial-services",
      targetLinks: "2/3",
      state: "In Progress",
      nestedData: [
        {
          id: "1c296726-1741-4775-9988-518293922e92",
          title: "Enterprise Security",
          url: "/products/enterprise-security",
          anchor: "robust fintech security",
          status: "ACTIVE",
        },
        {
          id: "46564619-7988-4673-8993-94672605720a",
          title: "Technical Whitepaper",
          url: "/resources/technical-whitepaper-v4",
          anchor: "banking infrastructure docs",
          status: "STALE",
        },
        {
          id: "47761048-8424-4286-9040-2c7003006497",
          title: "Future Blog",
          url: "/blog/future-of-automated-links",
          anchor: "",
          status: "UNLINKED",
        },
      ],
    },
    {
      id: "97223793-6140-4100-8451-401188339178",
      url: "/resources/technical-whitepaper-v4",
      targetLinks: "3/3",
      state: "Fully Linked",
      nestedData: [
        {
          id: "89839446-5991-4171-8815-373678077583",
          title: "Enterprise Security",
          url: "/products/enterprise-security",
          anchor: "whitepaper security guide",
          status: "ACTIVE",
        },
        {
          id: "36005828-5694-4361-9031-297491741369",
          title: "Financial Services",
          url: "/solutions/financial-services",
          anchor: "technical banking paper",
          status: "ACTIVE",
        },
        {
          id: "17202359-5431-4186-8178-548480315729",
          title: "Future Blog",
          url: "/blog/future-of-automated-links",
          anchor: "automated link research",
          status: "ACTIVE",
        },
      ],
    },
    {
      id: "71391916-2483-4927-9964-184512918889",
      url: "/blog/future-of-automated-links",
      targetLinks: "0/3",
      state: "Not Started",
      nestedData: [
        {
          id: "31398284-4113-4475-8173-956624231644",
          title: "Enterprise Security",
          url: "/products/enterprise-security",
          anchor: "",
          status: "UNLINKED",
        },
        {
          id: "19313411-4777-4952-9538-423455986968",
          title: "Financial Services",
          url: "/solutions/financial-services",
          anchor: "",
          status: "UNLINKED",
        },
        {
          id: "44445851-6923-4554-9721-396593922894",
          title: "Technical Whitepaper",
          url: "/resources/technical-whitepaper-v4",
          anchor: "",
          status: "UNLINKED",
        },
      ],
    },
    {
      id: "27878891-9535-4340-9679-a52033092237", // Fixed variant (9->a)
      url: "/docs/api-reference-v3",
      targetLinks: "1/3",
      state: "In Progress",
      nestedData: [
        {
          id: "24823126-5915-4122-8349-432174351057",
          title: "Enterprise Security",
          url: "/products/enterprise-security",
          anchor: "api security reference",
          status: "ACTIVE",
        },
        {
          id: "25046200-2053-4375-a010-388219463935",
          title: "Technical Whitepaper",
          url: "/resources/technical-whitepaper-v4",
          anchor: "",
          status: "UNLINKED",
        },
        {
          id: "97120760-4966-4190-8806-302325372338",
          title: "Financial Services",
          url: "/solutions/financial-services",
          anchor: "api fintech docs",
          status: "STALE",
        },
      ],
    },
    {
      id: "23554471-8594-4638-9565-385038596645",
      url: "/about/company-overview",
      targetLinks: "3/3",
      state: "Fully Linked",
      nestedData: [
        {
          id: "24467006-2586-4251-8973-196123431688",
          title: "Enterprise Security",
          url: "/products/enterprise-security",
          anchor: "our security products",
          status: "ACTIVE",
        },
        {
          id: "87071192-3112-4523-9524-118465715783",
          title: "Financial Services",
          url: "/solutions/financial-services",
          anchor: "financial solutions overview",
          status: "ACTIVE",
        },
        {
          id: "44723049-7607-4286-a077-841804797072",
          title: "API Reference",
          url: "/docs/api-reference-v3",
          anchor: "developer resources",
          status: "ACTIVE",
        },
      ],
    },
  ],
};
export const CUSTOM_NETWORK_DATA2: CreateCustomNetworkResponseSchemaValues = {
  projectId: "f509859c-94e3-4712-a63a-b4fba9139fa6",
  id: "7b2e1a4d-8c5f-4d92-a1b6-3f8e5d0c7b4a",
  collectionName: "Fully Connected",
  collections: [
    {
      id: "a1c9b2d4-3e5f-47a8-b9c0-d1e2f3a4b5c6",
      url: "/resources/technical-whitepaper-v4",
      targetLinks: "4/4",
      state: "Fully Linked",
      nestedData: [
        {
          id: "f8e7d6c5-b4a3-4210-9876-543210fedcba", // Valid
          title: "Enterprise Security",
          url: "/products/enterprise-security",
          anchor: "whitepaper security guide",
          status: "ACTIVE",
        },
        {
          id: "d9c8b7a6-0e1f-42a3-b4c5-d6e7f8a9b0c1", // Valid
          title: "Financial Services",
          url: "/solutions/financial-services",
          anchor: "technical banking paper",
          status: "ACTIVE",
        },
        {
          id: "3a4b5c6d-7e8f-41a2-b3c4-d5e6f7a8b9c0", // Valid
          title: "Future Blog",
          url: "/blog/future-of-automated-links",
          anchor: "automated link research",
          status: "ACTIVE",
        },
        {
          id: "c2d3e4f5-a6b7-48f9-90a1-b2c3d4e5f6a7", // Fixed variant (9)
          title: "Developer Portal",
          url: "/developers",
          anchor: "integration guides",
          status: "ACTIVE",
        },
      ],
    },
    {
      id: "e5f6a7b8-c9d0-4e1f-a2b3-c4d5e6f7a8b9", // Fixed variant (a)
      url: "/about/company-overview",
      targetLinks: "4/4",
      state: "Fully Linked",
      nestedData: [
        {
          id: "b1a2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d", // Fixed variant (8)
          title: "Enterprise Security",
          url: "/products/enterprise-security",
          anchor: "our security products",
          status: "ACTIVE",
        },
        {
          id: "7e8f9a0b-1c2d-43e4-b5a6-b7c8d9e0f1a2", // Fixed version (4) + variant (b)
          title: "Financial Services",
          url: "/solutions/financial-services",
          anchor: "financial solutions overview",
          status: "ACTIVE",
        },
        {
          id: "9c8d7e6f-5a4b-4321-b0a1-c2d3e4f5a6b7", // Valid
          title: "API Reference",
          url: "/docs/api-reference-v3",
          anchor: "developer resources",
          status: "ACTIVE",
        },
        {
          id: "4d5e6f7a-8b9c-40d1-a2f3-a4b5c6d7e8f9", // Fixed variant (a)
          title: "Case Studies",
          url: "/resources/case-studies",
          anchor: "success stories",
          status: "ACTIVE",
        },
      ],
    },
    {
      id: "a0b1c2d3-e4f5-46a7-b8c9-d0e1f2a3b4c5", // Fixed variant (b)
      url: "/products/cloud-platform",
      targetLinks: "4/4",
      state: "Fully Linked",
      nestedData: [
        {
          id: "1a2b3c4d-5e6f-40a1-b2c3-d4e5f6a7b8c9", // Fixed variant (b)
          title: "Security Compliance",
          url: "/compliance",
          anchor: "cloud security standards",
          status: "ACTIVE",
        },
        {
          id: "f6e5d4c3-b2a1-4098-b7a6-c5d4e3f2b1a0", // Fixed variant (b)
          title: "Pricing Guide",
          url: "/pricing/cloud",
          anchor: "transparent pricing",
          status: "ACTIVE",
        },
        {
          id: "d1c2b3a4-e5f6-47a8-b9c0-d1e2f3a4b5c6", // Fixed variant (b)
          title: "Migration Docs",
          url: "/docs/migration",
          anchor: "seamless migration",
          status: "ACTIVE",
        },
        {
          id: "0d1e2f3a-4b5c-46d7-8e9f-0a1b2c3d4e5f", // Fixed variant (8)
          title: "Support Portal",
          url: "/support",
          anchor: "24/7 assistance",
          status: "ACTIVE",
        },
      ],
    },
    {
      id: "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e", // Fixed variant (9)
      url: "/solutions/healthcare",
      targetLinks: "4/4",
      state: "Fully Linked",
      nestedData: [
        {
          id: "9e8d7c6b-5a43-4210-b9a8-7d6c5b4a3e2f", // Fixed variant (b)
          title: "HIPAA Compliance",
          url: "/compliance/hipaa",
          anchor: "healthcare security",
          status: "ACTIVE",
        },
        {
          id: "3d2c1b0a-4e5f-4a7b-8c9d-0e1f2a3b4c5d", // Fixed version (4) + variant (8)
          title: "Patient Data API",
          url: "/docs/patient-api",
          anchor: "secure data access",
          status: "ACTIVE",
        },
        {
          id: "a7b8c9d0-e1f2-43b4-a5d6-e7f8a9b0c1d2", // Fixed variant (a)
          title: "Integration Guides",
          url: "/docs/healthcare-integrations",
          anchor: "EHR connectivity",
          status: "ACTIVE",
        },
        {
          id: "5f4e3d2c-1b0a-49f8-87d6-c5b4a3210fed", // Fixed variant (8)
          title: "Case Study: MedTech",
          url: "/resources/medtech-case-study",
          anchor: "real world results",
          status: "ACTIVE",
        },
      ],
    },
    {
      id: "6d7e8f9a-0b1c-42d3-a4f5-a6b7c8d9e0f1", // Fixed variant (a)
      url: "/partners/technology-alliance",
      targetLinks: "4/4",
      state: "Fully Linked",
      nestedData: [
        {
          id: "c1b2a3d4-e5f6-47a8-b9c0-d1e2f3a4b5c6", // Fixed variant (b)
          title: "Partner Portal",
          url: "/partners/portal",
          anchor: "collaboration hub",
          status: "ACTIVE",
        },
        {
          id: "f5e4d3c2-b1a0-4f9e-8d7c-6b5a49382716", // Fixed variant (8)
          title: "Co-Marketing Kit",
          url: "/partners/marketing",
          anchor: "joint campaigns",
          status: "ACTIVE",
        },
        {
          id: "b7a6c5d4-e3f2-4109-b8d7-c6a5b4e3f2d1", // Fixed variant (b)
          title: "Technical Certification",
          url: "/partners/certification",
          anchor: "validated integrations",
          status: "ACTIVE",
        },
        {
          id: "4e5f6a7b-8c9d-40e1-b2a3-b4c5d6e7f8a9", // Fixed variant (b)
          title: "Revenue Share Program",
          url: "/partners/revenue",
          anchor: "growth incentives",
          status: "ACTIVE",
        },
      ],
    },
    {
      id: "7f6e5d4c-3b2a-4109-8765-43210fedcba9", // Fixed variant (8)
      url: "/resources/developer-hub",
      targetLinks: "4/4",
      state: "Fully Linked",
      nestedData: [
        {
          id: "9a8b7c6d-5e4f-4321-a0b1-c2d3e4f5a6b7", // Fixed variant (a)
          title: "SDK Downloads",
          url: "/developers/sdks",
          anchor: "quick start kits",
          status: "ACTIVE",
        },
        {
          id: "5c4d3e2f-1a0b-49e8-87c6-b5a43210fedc", // Fixed variant (8)
          title: "API Changelog",
          url: "/developers/changelog",
          anchor: "version history",
          status: "ACTIVE",
        },
        {
          id: "d8e9f0a1-b2c3-4d4e-8f6a-7b8c9d0e1f2a", // Fixed variant (8)
          title: "Community Forum",
          url: "/community",
          anchor: "peer support",
          status: "ACTIVE",
        },
        {
          id: "1c2d3e4f-5a6b-47c8-89e0-f1a2b3c4d5e6", // Fixed variant (8)
          title: "Office Hours",
          url: "/developers/office-hours",
          anchor: "live Q&A",
          status: "ACTIVE",
        },
      ],
    },
  ],
};
export const CUSTOM_NETWORK_DATA3: CreateCustomNetworkResponseSchemaValues = {
  projectId: "f509859c-94e3-4712-a63a-b4fba9139fa6",
  id: "4d7c2a1b-9e8f-4d32-a1b6-3f8e5d0c7b4a",
  collectionName: "Not Started",
  collections: [
    {
      id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
      url: "/blog/future-of-automated-links",
      targetLinks: "0/4",
      state: "Not Started",
      nestedData: [
        {
          id: "3e4f5a6b-7c8d-4e9f-a0b1-c2d3e4f5a6b7", // Fixed variant (a)
          title: "Enterprise Security",
          url: "/products/enterprise-security",
          anchor: "",
          status: "UNLINKED",
        },
        {
          id: "1a2b3c4d-5e6f-40a1-b2c3-d4e5f6a7b8c9", // Fixed variant (b)
          title: "Financial Services",
          url: "/solutions/financial-services",
          anchor: "",
          status: "UNLINKED",
        },
        {
          id: "d9e8f7a6-b5c4-4d3e-af1a-0b9c8d7e6f5a", // Fixed version (4) + variant (a)
          title: "Technical Whitepaper",
          url: "/resources/technical-whitepaper-v4",
          anchor: "",
          status: "UNLINKED",
        },
        {
          id: "7c8d9e0f-1a2b-4c3d-be5f-6a7b8c9d0e1f", // Fixed version (4) + variant (b)
          title: "Product Roadmap",
          url: "/roadmap",
          anchor: "",
          status: "UNLINKED",
        },
      ],
    },
    {
      id: "f1e2d3c4-b5a6-47b8-9c0d-1e2f3a4b5c6d",
      url: "/blog/ai-automation-trends",
      targetLinks: "0/4",
      state: "Not Started",
      nestedData: [
        {
          id: "5a6b7c8d-9e0f-41a2-b3c4-d5e6f7a8b9c0", // Fixed variant (b)
          title: "Enterprise Security",
          url: "/products/enterprise-security",
          anchor: "",
          status: "UNLINKED",
        },
        {
          id: "2f3a4b5c-6d7e-48f9-a0b1-c2d3e4f5a6b7", // Fixed variant (a)
          title: "Financial Services",
          url: "/solutions/financial-services",
          anchor: "",
          status: "UNLINKED",
        },
        {
          id: "a1b2c3d4-e5f6-47a8-b9c0-d1e2f3a4b5c6", // Fixed variant (b)
          title: "API Reference",
          url: "/docs/api-reference-v3",
          anchor: "",
          status: "UNLINKED",
        },
        {
          id: "e9d8c7b6-a543-4210-9876-543210fedcba", // Fixed variant (9)
          title: "Developer Portal",
          url: "/developers",
          anchor: "",
          status: "UNLINKED",
        },
      ],
    },
    {
      id: "8c7b6a5d-4e3f-4210-b9a8-7d6c5b4a3e2f", // Fixed variant (b)
      url: "/blog/customer-success-stories",
      targetLinks: "0/4",
      state: "Not Started",
      nestedData: [
        {
          id: "3d2c1b0a-4e5f-4a7b-8c9d-0e1f2a3b4c5d", // Fixed version (4) + variant (8)
          title: "Enterprise Security",
          url: "/products/enterprise-security",
          anchor: "",
          status: "UNLINKED",
        },
        {
          id: "f5e4d3c2-b1a0-4f9e-8d7c-6b5a49382716", // Fixed variant (8)
          title: "Financial Services",
          url: "/solutions/financial-services",
          anchor: "",
          status: "UNLINKED",
        },
        {
          id: "b7a6c5d4-e3f2-4109-b8d7-c6a5b4e3f2d1", // Fixed variant (b)
          title: "Technical Whitepaper",
          url: "/resources/technical-whitepaper-v4",
          anchor: "",
          status: "UNLINKED",
        },
        {
          id: "4e5f6a7b-8c9d-40e1-b2c3-b4c5d6e7f8a9", // Fixed variant (b)
          title: "Case Studies",
          url: "/resources/case-studies",
          anchor: "",
          status: "UNLINKED",
        },
      ],
    },
    {
      id: "d1c2b3a4-e5f6-47a8-b9c0-d1e2f3a4b5c6", // Fixed variant (b)
      url: "/events/webinar-series-2026",
      targetLinks: "0/4",
      state: "Not Started",
      nestedData: [
        {
          id: "a0b1c2d3-e4f5-46a7-b8c9-d0e1f2a3b4c5", // Fixed variant (b)
          title: "Enterprise Security",
          url: "/products/enterprise-security",
          anchor: "",
          status: "UNLINKED",
        },
        {
          id: "7f6e5d4c-3b2a-4109-8765-43210fedcba9", // Fixed variant (8)
          title: "Financial Services",
          url: "/solutions/financial-services",
          anchor: "",
          status: "UNLINKED",
        },
        {
          id: "9a8b7c6d-5e4f-4321-a0b1-c2d3e4f5a6b7", // Fixed variant (a)
          title: "API Reference",
          url: "/docs/api-reference-v3",
          anchor: "",
          status: "UNLINKED",
        },
        {
          id: "e1d2c3b4-a5b6-4c7d-8e9f-0a1b2c3d4e5f", // Fixed variant (8)
          title: "Partner Portal",
          url: "/partners/portal",
          anchor: "",
          status: "UNLINKED",
        },
      ],
    },
    {
      id: "5c4d3e2f-1a0b-49e8-87c6-b5a43210fedc", // Fixed variant (8)
      url: "/careers/engineering-roles",
      targetLinks: "0/4",
      state: "Not Started",
      nestedData: [
        {
          id: "d8e9f0a1-b2c3-4d4e-8f6a-7b8c9d0e1f2a", // Fixed variant (8)
          title: "Enterprise Security",
          url: "/products/enterprise-security",
          anchor: "",
          status: "UNLINKED",
        },
        {
          id: "1c2d3e4f-5a6b-47c8-89e0-f1a2b3c4d5e6", // Fixed variant (8)
          title: "Financial Services",
          url: "/solutions/financial-services",
          anchor: "",
          status: "UNLINKED",
        },
        {
          id: "2b3a4c5d-6e7f-48a9-b0c1-d2e3f4a5b6c7", // Fixed variant (b)
          title: "Technical Whitepaper",
          url: "/resources/technical-whitepaper-v4",
          anchor: "",
          status: "UNLINKED",
        },
        {
          id: "87071192-3112-4523-9524-118465715783",
          title: "Developer Hub",
          url: "/resources/developer-hub",
          anchor: "",
          status: "UNLINKED",
        },
      ],
    },
    {
      id: "44723049-7607-4286-a077-841804797072", // Fixed variant (a)
      url: "/press/media-kit-2026",
      targetLinks: "0/4",
      state: "Not Started",
      nestedData: [
        {
          id: "24467006-2586-4251-8973-196123431688", // Fixed variant (8)
          title: "Enterprise Security",
          url: "/products/enterprise-security",
          anchor: "",
          status: "UNLINKED",
        },
        {
          id: "d3e4f5a6-b7c8-49e0-a1b2-c3d4e5f6a7b8", // Fixed variant (a)
          title: "Financial Services",
          url: "/solutions/financial-services",
          anchor: "",
          status: "UNLINKED",
        },
        {
          id: "c2d3e4f5-b6a7-48b9-9c0d-e1f2a3b4c5d6", // Fixed variant (9)
          title: "API Reference",
          url: "/docs/api-reference-v3",
          anchor: "",
          status: "UNLINKED",
        },
        {
          id: "b1c2d3e4-f5a6-47b8-9c0d-e1f2a3b4c5d6", // Fixed variant (9)
          title: "Company Overview",
          url: "/about/company-overview",
          anchor: "",
          status: "UNLINKED",
        },
      ],
    },
  ],
};
export const ALL_CUSTOM_NETWORK_DATA: AllCustomNetworkDataType = {
  "f0973e0e-d4d1-42f0-a43e-a1bac031c031": CUSTOM_NETWORK_DATA,
  "cf200c6e-89a7-4eb7-8bee-4ed94d2be819": CUSTOM_NETWORK_DATA2,
  "ab036545-3e24-4f9b-99dc-10478aff73fe": CUSTOM_NETWORK_DATA3,
};
export const ALL_CUSTOM_NETWORK_DATA_ARRAY: CreateCustomNetworkResponseSchemaValues[] = [
  CUSTOM_NETWORK_DATA,
  CUSTOM_NETWORK_DATA2,
  CUSTOM_NETWORK_DATA3,
];

export type UrlOccurrence = { parentRow: CustomNetworkCollectionValues; link: CustomNetworkNestedLinkValues };

export function buildUrlFrequencyMap(): Map<string, UrlOccurrence[]> {
  const map = new Map<string, UrlOccurrence[]>();
  for (const row of CUSTOM_NETWORK_DATA.collections) {
    for (const link of row.nestedData ?? []) {
      const existing = map.get(link.url) ?? [];
      existing.push({ parentRow: row, link });
      map.set(link.url, existing);
    }
  }
  return map;
}
