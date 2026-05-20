"use client";

import type { CreateCustomNetworkResponseSchemaValues } from "@/domains/linker/validations/custom-network.validation";
import { RegistryDataTable } from "./data-table";

export default function InternalLinkManagement({ data }: { data: CreateCustomNetworkResponseSchemaValues }) {
  const stats = [
    { label: "Total Nodes", value: data.collections.length, accent: "#1a56db" },
    {
      label: "Fully Linked",
      value: data.collections.filter((r) => r.state === "Fully Linked").length,
      accent: "#10b981",
    },
    {
      label: "In Progress",
      value: data.collections.filter((r) => r.state === "In Progress").length,
      accent: "#f59e0b",
    },
    {
      label: "Not Started",
      value: data.collections.filter((r) => r.state === "Not Started").length,
      accent: "#e11d48",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">{data.collectionName}</h1>
        <p className="text-sm text-zinc-700 dark:text-zinc-300 max-w-xl leading-relaxed">
          Manage interconnected page relationships to strengthen site structure, and improve SEO performance.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, accent }) => (
          <div
            key={label}
            className="bg-card p-5 shadow-sm border border-border/30"
            style={{ borderLeft: `3px solid ${accent}` }}
          >
            <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2">{label}</p>
            <p className="text-4xl font-bold text-foreground tracking-tight leading-none">{value}</p>
          </div>
        ))}
      </div>

      <RegistryDataTable data={data.collections} />
    </div>
  );
}
