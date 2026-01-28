"use client";

import type { Tool } from "@/domains/linker/types/tools.types";
import { ToolsGrid } from "@/domains/linker/ui/tools/tools-card";

const TOOLS: Tool[] = [
  {
    id: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
    name: "INBOUNDS",
    displayName: "Inbounds",
    description: "Analyze and manage inbound links for your project.",
  },
  {
    id: "b2c3d4e5-f6g7-8h9i-0j1k-l2m3n4o5p6q7",
    name: "SILO",
    displayName: "Silo",
    description: "Create and manage content silos for better site structure.",
  },
  {
    id: "c3d4e5f6-g7h8-9i0j-1k2l-m3n4o5p6q7r8",
    name: "LINKS_REPORT",
    displayName: "Links Report",
    status: "new",
    description: "Generate detailed reports on internal and external links.",
  },
  {
    id: "d4e5f6g7-h8i9-0j1k-2l3m-n4o5p6q7r8s9",
    name: "SITE_REPORT",
    displayName: "Site Report",
    description: "Run comprehensive audits on your site performance.",
  },
];

export default function ToolsPage() {
  return (
    <main className="mt-6 h-svw">
      <ToolsGrid tools={TOOLS} />
    </main>
  );
}
