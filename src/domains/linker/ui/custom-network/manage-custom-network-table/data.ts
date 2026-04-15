import type {
  AllCustomNetworkDataType,
  CreateCustomNetworkResponseSchemaValues,
  CustomNetworkCollectionValues,
  CustomNetworkNestedLinkValues,
} from "@/domains/linker/validations/custom-network.validation";

export const CUSTOM_NETWORK_DATA: CreateCustomNetworkResponseSchemaValues = {
  projectId: "f509859c-94e3-4712-a63a-b4fba9139fa6",
  id: "f0973e0e-d4d1-42f0-9e62-f43ea1bac031",
  collectionName: "Test Collection",
  collections: [
    {
      id: "a1b2c3d4-e5f6-4a1b-9c2d-3e4f5a6b7c8d",
      url: "/products/enterprise-security",
      targetLinks: "2/3",
      state: "In Progress",
      nestedData: [
        {
          id: "1a2b3c4d-5e6f-41a2-9b3c-4d5e6f7a8b9c",
          title: "Financial Services",
          url: "/solutions/financial-services",
          anchor: "enterprise security solutions",
          status: "ACTIVE",
        },
        {
          id: "2b3c4d5e-6f7a-42b3-9c4d-5e6f7a8b9c0d",
          title: "Technical Whitepaper",
          url: "/resources/technical-whitepaper-v4",
          anchor: "security infrastructure docs",
          status: "STALE",
        },
        {
          id: "3c4d5e6f-7a8b-43c4-9d5e-6f7a8b9c0d1e",
          title: "API Reference",
          url: "/docs/api-reference-v3",
          anchor: "",
          status: "UNLINKED",
        },
      ],
    },
    {
      id: "b2c3d4e5-f6a7-4b2c-9d3e-4f5a6b7c8d9e",
      url: "/solutions/financial-services",
      targetLinks: "2/3",
      state: "In Progress",
      nestedData: [
        {
          id: "4d5e6f7a-8b9c-44d5-9e6f-7a8b9c0d1e2f",
          title: "Enterprise Security",
          url: "/products/enterprise-security",
          anchor: "robust fintech security",
          status: "ACTIVE",
        },
        {
          id: "5e6f7a8b-9c0d-45e6-9f7a-8b9c0d1e2f3a",
          title: "Technical Whitepaper",
          url: "/resources/technical-whitepaper-v4",
          anchor: "banking infrastructure docs",
          status: "STALE",
        },
        {
          id: "6f7a8b9c-0d1e-46f7-9a8b-9c0d1e2f3a4b",
          title: "Future Blog",
          url: "/blog/future-of-automated-links",
          anchor: "",
          status: "UNLINKED",
        },
      ],
    },
    {
      id: "c3d4e5f6-a7b8-4c3d-9e4f-5a6b7c8d9e0f",
      url: "/resources/technical-whitepaper-v4",
      targetLinks: "3/3",
      state: "Fully Linked",
      nestedData: [
        {
          id: "7a8b9c0d-1e2f-47a8-9b9c-0d1e2f3a4b5c",
          title: "Enterprise Security",
          url: "/products/enterprise-security",
          anchor: "whitepaper security guide",
          status: "ACTIVE",
        },
        {
          id: "8b9c0d1e-2f3a-48b9-9c0d-1e2f3a4b5c6d",
          title: "Financial Services",
          url: "/solutions/financial-services",
          anchor: "technical banking paper",
          status: "ACTIVE",
        },
        {
          id: "9c0d1e2f-3a4b-49c0-9d1e-2f3a4b5c6d7e",
          title: "Future Blog",
          url: "/blog/future-of-automated-links",
          anchor: "automated link research",
          status: "ACTIVE",
        },
      ],
    },
    {
      id: "d4e5f6a7-b8c9-4d4e-9f5a-6b7c8d9e0f1a",
      url: "/blog/future-of-automated-links",
      targetLinks: "0/3",
      state: "Not Started",
      nestedData: [
        {
          id: "0d1e2f3a-4b5c-40d1-9e2f-3a4b5c6d7e8f",
          title: "Enterprise Security",
          url: "/products/enterprise-security",
          anchor: "",
          status: "UNLINKED",
        },
        {
          id: "1e2f3a4b-5c6d-41e2-9f3a-4b5c6d7e8f9a",
          title: "Financial Services",
          url: "/solutions/financial-services",
          anchor: "",
          status: "UNLINKED",
        },
        {
          id: "2f3a4b5c-6d7e-42f3-9a4b-5c6d7e8f9a0b",
          title: "Technical Whitepaper",
          url: "/resources/technical-whitepaper-v4",
          anchor: "",
          status: "UNLINKED",
        },
      ],
    },
    {
      id: "e5f6a7b8-c9d0-4e5f-9a6b-7c8d9e0f1a2b",
      url: "/docs/api-reference-v3",
      targetLinks: "1/3",
      state: "In Progress",
      nestedData: [
        {
          id: "3a4b5c6d-7e8f-43a4-9b5c-6d7e8f9a0b1c",
          title: "Enterprise Security",
          url: "/products/enterprise-security",
          anchor: "api security reference",
          status: "ACTIVE",
        },
        {
          id: "4b5c6d7e-8f9a-44b5-9c6d-7e8f9a0b1c2d",
          title: "Technical Whitepaper",
          url: "/resources/technical-whitepaper-v4",
          anchor: "",
          status: "UNLINKED",
        },
        {
          id: "5c6d7e8f-9a0b-45c6-9d7e-8f9a0b1c2d3e",
          title: "Financial Services",
          url: "/solutions/financial-services",
          anchor: "api fintech docs",
          status: "STALE",
        },
      ],
    },
    {
      id: "f6a7b8c9-d0e1-4f6a-9b7c-8d9e0f1a2b3c",
      url: "/about/company-overview",
      targetLinks: "3/3",
      state: "Fully Linked",
      nestedData: [
        {
          id: "6d7e8f9a-0b1c-46d7-9e8f-9a0b1c2d3e4f",
          title: "Enterprise Security",
          url: "/products/enterprise-security",
          anchor: "our security products",
          status: "ACTIVE",
        },
        {
          id: "7e8f9a0b-1c2d-47e8-9f9a-0b1c2d3e4f5a",
          title: "Financial Services",
          url: "/solutions/financial-services",
          anchor: "financial solutions overview",
          status: "ACTIVE",
        },
        {
          id: "8f9a0b1c-2d3e-48f9-9a0b-1c2d3e4f5a6b",
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
  id: "cf200c6e-89a7-4eb7-8bee-4ed94d2be819",
  collectionName: "Fully Connected",
  collections: [
    {
      id: "c3d4e5f6-a7b8-4c3d-9e4f-5a6b7c8d9e0f",
      url: "/resources/technical-whitepaper-v4",
      targetLinks: "4/4",
      state: "Fully Linked",
      nestedData: [
        {
          id: "7a8b9c0d-1e2f-47a8-9b9c-0d1e2f3a4b5c",
          title: "Enterprise Security",
          url: "/products/enterprise-security",
          anchor: "whitepaper security guide",
          status: "ACTIVE",
        },
        {
          id: "8b9c0d1e-2f3a-48b9-9c0d-1e2f3a4b5c6d",
          title: "Financial Services",
          url: "/solutions/financial-services",
          anchor: "technical banking paper",
          status: "ACTIVE",
        },
        {
          id: "9c0d1e2f-3a4b-49c0-9d1e-2f3a4b5c6d7e",
          title: "Future Blog",
          url: "/blog/future-of-automated-links",
          anchor: "automated link research",
          status: "ACTIVE",
        },
        {
          id: "a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
          title: "Developer Portal",
          url: "/developers",
          anchor: "integration guides",
          status: "ACTIVE",
        },
      ],
    },
    {
      id: "f6a7b8c9-d0e1-4f6a-9b7c-8d9e0f1a2b3c",
      url: "/about/company-overview",
      targetLinks: "4/4",
      state: "Fully Linked",
      nestedData: [
        {
          id: "6d7e8f9a-0b1c-46d7-9e8f-9a0b1c2d3e4f",
          title: "Enterprise Security",
          url: "/products/enterprise-security",
          anchor: "our security products",
          status: "ACTIVE",
        },
        {
          id: "7e8f9a0b-1c2d-47e8-9f9a-0b1c2d3e4f5a",
          title: "Financial Services",
          url: "/solutions/financial-services",
          anchor: "financial solutions overview",
          status: "ACTIVE",
        },
        {
          id: "8f9a0b1c-2d3e-48f9-9a0b-1c2d3e4f5a6b",
          title: "API Reference",
          url: "/docs/api-reference-v3",
          anchor: "developer resources",
          status: "ACTIVE",
        },
        {
          id: "b2c3d4e5-6f7a-8b9c-0d1e-2f3a4b5c6d7e",
          title: "Case Studies",
          url: "/resources/case-studies",
          anchor: "success stories",
          status: "ACTIVE",
        },
      ],
    },
    {
      id: "g7h8i9j0-k1l2-4m3n-9o4p-5q6r7s8t9u0v",
      url: "/products/cloud-platform",
      targetLinks: "4/4",
      state: "Fully Linked",
      nestedData: [
        {
          id: "c3d4e5f6-7a8b-4c3d-9e4f-5a6b7c8d9e0f",
          title: "Security Compliance",
          url: "/compliance",
          anchor: "cloud security standards",
          status: "ACTIVE",
        },
        {
          id: "d4e5f6a7-8b9c-4d4e-9f5a-6b7c8d9e0f1a",
          title: "Pricing Guide",
          url: "/pricing/cloud",
          anchor: "transparent pricing",
          status: "ACTIVE",
        },
        {
          id: "e5f6a7b8-9c0d-4e5f-9a6b-7c8d9e0f1a2b",
          title: "Migration Docs",
          url: "/docs/migration",
          anchor: "seamless migration",
          status: "ACTIVE",
        },
        {
          id: "f6a7b8c9-0d1e-4f6a-9b7c-8d9e0f1a2b3c",
          title: "Support Portal",
          url: "/support",
          anchor: "24/7 assistance",
          status: "ACTIVE",
        },
      ],
    },
    {
      id: "h8i9j0k1-l2m3-4n5o-9p6q-7r8s9t0u1v2w",
      url: "/solutions/healthcare",
      targetLinks: "4/4",
      state: "Fully Linked",
      nestedData: [
        {
          id: "g7h8i9j0-1k2l-4m3n-9o4p-5q6r7s8t9u0v",
          title: "HIPAA Compliance",
          url: "/compliance/hipaa",
          anchor: "healthcare security",
          status: "ACTIVE",
        },
        {
          id: "h8i9j0k1-2l3m-4n5o-9p6q-7r8s9t0u1v2w",
          title: "Patient Data API",
          url: "/docs/patient-api",
          anchor: "secure data access",
          status: "ACTIVE",
        },
        {
          id: "i9j0k1l2-3m4n-4o5p-9q6r-8s9t0u1v2w3x",
          title: "Integration Guides",
          url: "/docs/healthcare-integrations",
          anchor: "EHR connectivity",
          status: "ACTIVE",
        },
        {
          id: "j0k1l2m3-4n5o-4p6q-9r7s-9t0u1v2w3x4y",
          title: "Case Study: MedTech",
          url: "/resources/medtech-case-study",
          anchor: "real world results",
          status: "ACTIVE",
        },
      ],
    },
    {
      id: "i9j0k1l2-m3n4-4o5p-9q6r-8s9t0u1v2w3x",
      url: "/partners/technology-alliance",
      targetLinks: "4/4",
      state: "Fully Linked",
      nestedData: [
        {
          id: "k1l2m3n4-5o6p-4q7r-9s8t-0u1v2w3x4y5z",
          title: "Partner Portal",
          url: "/partners/portal",
          anchor: "collaboration hub",
          status: "ACTIVE",
        },
        {
          id: "l2m3n4o5-6p7q-4r8s-9t9u-1v2w3x4y5z6a",
          title: "Co-Marketing Kit",
          url: "/partners/marketing",
          anchor: "joint campaigns",
          status: "ACTIVE",
        },
        {
          id: "m3n4o5p6-7q8r-4s9t-9u0v-2w3x4y5z6a7b",
          title: "Technical Certification",
          url: "/partners/certification",
          anchor: "validated integrations",
          status: "ACTIVE",
        },
        {
          id: "n4o5p6q7-8r9s-4t0u-9v1w-3x4y5z6a7b8c",
          title: "Revenue Share Program",
          url: "/partners/revenue",
          anchor: "growth incentives",
          status: "ACTIVE",
        },
      ],
    },
    {
      id: "j0k1l2m3-n4o5-4p6q-9r7s-9t0u1v2w3x4y",
      url: "/resources/developer-hub",
      targetLinks: "4/4",
      state: "Fully Linked",
      nestedData: [
        {
          id: "o5p6q7r8-9s0t-4u1v-9w2x-4y5z6a7b8c9d",
          title: "SDK Downloads",
          url: "/developers/sdks",
          anchor: "quick start kits",
          status: "ACTIVE",
        },
        {
          id: "p6q7r8s9-0t1u-4v2w-9x3y-5z6a7b8c9d0e",
          title: "API Changelog",
          url: "/developers/changelog",
          anchor: "version history",
          status: "ACTIVE",
        },
        {
          id: "q7r8s9t0-1u2v-4w3x-9y4z-6a7b8c9d0e1f",
          title: "Community Forum",
          url: "/community",
          anchor: "peer support",
          status: "ACTIVE",
        },
        {
          id: "r8s9t0u1-2v3w-4x4y-9z5a-7b8c9d0e1f2g",
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
  id: "ab036545-3e24-4f9b-99dc-10478aff73fe",
  collectionName: "Not Started",
  collections: [
    {
      id: "d4e5f6a7-b8c9-4d4e-9f5a-6b7c8d9e0f1a",
      url: "/blog/future-of-automated-links",
      targetLinks: "0/4",
      state: "Not Started",
      nestedData: [
        {
          id: "0d1e2f3a-4b5c-40d1-9e2f-3a4b5c6d7e8f",
          title: "Enterprise Security",
          url: "/products/enterprise-security",
          anchor: "",
          status: "UNLINKED",
        },
        {
          id: "1e2f3a4b-5c6d-41e2-9f3a-4b5c6d7e8f9a",
          title: "Financial Services",
          url: "/solutions/financial-services",
          anchor: "",
          status: "UNLINKED",
        },
        {
          id: "2f3a4b5c-6d7e-42f3-9a4b-5c6d7e8f9a0b",
          title: "Technical Whitepaper",
          url: "/resources/technical-whitepaper-v4",
          anchor: "",
          status: "UNLINKED",
        },
        {
          id: "s9t0u1v2-3w4x-4y5z-9a6b-8c9d0e1f2g3h",
          title: "Product Roadmap",
          url: "/roadmap",
          anchor: "",
          status: "UNLINKED",
        },
      ],
    },
    {
      id: "k1l2m3n4-o5p6-4q7r-9s8t-0u1v2w3x4y5z",
      url: "/blog/ai-automation-trends",
      targetLinks: "0/4",
      state: "Not Started",
      nestedData: [
        {
          id: "t0u1v2w3-4x5y-4z6a-9b7c-9d0e1f2g3h4i",
          title: "Enterprise Security",
          url: "/products/enterprise-security",
          anchor: "",
          status: "UNLINKED",
        },
        {
          id: "u1v2w3x4-5y6z-4a7b-9c8d-0e1f2g3h4i5j",
          title: "Financial Services",
          url: "/solutions/financial-services",
          anchor: "",
          status: "UNLINKED",
        },
        {
          id: "v2w3x4y5-6z7a-4b8c-9d9e-1f2g3h4i5j6k",
          title: "API Reference",
          url: "/docs/api-reference-v3",
          anchor: "",
          status: "UNLINKED",
        },
        {
          id: "w3x4y5z6-7a8b-4c9d-9e0f-2g3h4i5j6k7l",
          title: "Developer Portal",
          url: "/developers",
          anchor: "",
          status: "UNLINKED",
        },
      ],
    },
    {
      id: "l2m3n4o5-p6q7-4r8s-9t9u-1v2w3x4y5z6a",
      url: "/blog/customer-success-stories",
      targetLinks: "0/4",
      state: "Not Started",
      nestedData: [
        {
          id: "x4y5z6a7-8b9c-4d0e-9f1g-3h4i5j6k7l8m",
          title: "Enterprise Security",
          url: "/products/enterprise-security",
          anchor: "",
          status: "UNLINKED",
        },
        {
          id: "y5z6a7b8-9c0d-4e1f-9g2h-4i5j6k7l8m9n",
          title: "Financial Services",
          url: "/solutions/financial-services",
          anchor: "",
          status: "UNLINKED",
        },
        {
          id: "z6a7b8c9-0d1e-4f2g-9h3i-5j6k7l8m9n0o",
          title: "Technical Whitepaper",
          url: "/resources/technical-whitepaper-v4",
          anchor: "",
          status: "UNLINKED",
        },
        {
          id: "a7b8c9d0-1e2f-4g3h-9i4j-6k7l8m9n0o1p",
          title: "Case Studies",
          url: "/resources/case-studies",
          anchor: "",
          status: "UNLINKED",
        },
      ],
    },
    {
      id: "m3n4o5p6-q7r8-4s9t-9u0v-2w3x4y5z6a7b",
      url: "/events/webinar-series-2026",
      targetLinks: "0/4",
      state: "Not Started",
      nestedData: [
        {
          id: "b8c9d0e1-2f3g-4h4i-9j5k-7l8m9n0o1p2q",
          title: "Enterprise Security",
          url: "/products/enterprise-security",
          anchor: "",
          status: "UNLINKED",
        },
        {
          id: "c9d0e1f2-3g4h-4i5j-9k6l-8m9n0o1p2q3r",
          title: "Financial Services",
          url: "/solutions/financial-services",
          anchor: "",
          status: "UNLINKED",
        },
        {
          id: "d0e1f2g3-4h5i-4j6k-9l7m-9n0o1p2q3r4s",
          title: "API Reference",
          url: "/docs/api-reference-v3",
          anchor: "",
          status: "UNLINKED",
        },
        {
          id: "e1f2g3h4-5i6j-4k7l-9m8n-0o1p2q3r4s5t",
          title: "Partner Portal",
          url: "/partners/portal",
          anchor: "",
          status: "UNLINKED",
        },
      ],
    },
    {
      id: "n4o5p6q7-r8s9-4t0u-9v1w-3x4y5z6a7b8c",
      url: "/careers/engineering-roles",
      targetLinks: "0/4",
      state: "Not Started",
      nestedData: [
        {
          id: "f2g3h4i5-6j7k-4l8m-9n9o-1p2q3r4s5t6u",
          title: "Enterprise Security",
          url: "/products/enterprise-security",
          anchor: "",
          status: "UNLINKED",
        },
        {
          id: "g3h4i5j6-7k8l-4m9n-9o0p-2q3r4s5t6u7v",
          title: "Financial Services",
          url: "/solutions/financial-services",
          anchor: "",
          status: "UNLINKED",
        },
        {
          id: "h4i5j6k7-8l9m-4n0o-9p1q-3r4s5t6u7v8w",
          title: "Technical Whitepaper",
          url: "/resources/technical-whitepaper-v4",
          anchor: "",
          status: "UNLINKED",
        },
        {
          id: "i5j6k7l8-9m0n-4o1p-9q2r-4s5t6u7v8w9x",
          title: "Developer Hub",
          url: "/resources/developer-hub",
          anchor: "",
          status: "UNLINKED",
        },
      ],
    },
    {
      id: "o5p6q7r8-s9t0-4u1v-9w2x-4y5z6a7b8c9d",
      url: "/press/media-kit-2026",
      targetLinks: "0/4",
      state: "Not Started",
      nestedData: [
        {
          id: "j6k7l8m9-0n1o-4p2q-9r3s-5t6u7v8w9x0y",
          title: "Enterprise Security",
          url: "/products/enterprise-security",
          anchor: "",
          status: "UNLINKED",
        },
        {
          id: "k7l8m9n0-1o2p-4q3r-9s4t-6u7v8w9x0y1z",
          title: "Financial Services",
          url: "/solutions/financial-services",
          anchor: "",
          status: "UNLINKED",
        },
        {
          id: "l8m9n0o1-2p3q-4r4s-9t5u-7v8w9x0y1z2a",
          title: "API Reference",
          url: "/docs/api-reference-v3",
          anchor: "",
          status: "UNLINKED",
        },
        {
          id: "m9n0o1p2-3q4r-4s5t-9u6v-8w9x0y1z2a3b",
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
  "f0973e0e-d4d1-42f0-9e62-f43ea1bac031": CUSTOM_NETWORK_DATA,
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
