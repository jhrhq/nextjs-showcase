"use client";

import { ToolGrid } from "@/domains/linker/ui/tools/tools-card";

const Tool = [
  {
    id: "inbound",
    name: "inbound",
    domain: "inbound",
    status: "active",
    totalLinks: 1,
    totalSilos: 1,
    createdAt: "inbound",
    updatedAt: "inbound",
    description: "this is a inbound tool",
    lastCrawled: "inbound",
  },
];

export type ToolsType = typeof Tool;

export default function ToolsPage() {
  return (
    <main className=" mt-6">
      <ToolGrid tools={Tool} />
    </main>
  );
}
