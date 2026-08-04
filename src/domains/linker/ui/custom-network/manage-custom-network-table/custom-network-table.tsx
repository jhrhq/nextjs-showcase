"use client";

import { AlertCircle, CheckCircle2, Clock, Link2 } from "lucide-react";
import type { CreateCustomNetworkResponseSchemaValues } from "@/domains/linker/validations/custom-network.validation";
import { cn } from "@/lib/utils";
import { RegistryDataTable } from "./data-table";

export default function InternalLinkManagement({ data }: { data: CreateCustomNetworkResponseSchemaValues }) {
  const fullyLinkedCount = data.collections.filter((r) => r.state === "Fully Linked").length;
  const inProgressCount = data.collections.filter((r) => r.state === "In Progress").length;
  const notStartedCount = data.collections.filter((r) => r.state === "Not Started").length;

  const stats = [
    {
      label: "Total Nodes",
      value: data.collections.length,
      icon: Link2,
      color: "text-chart-1",
      bgColor: "bg-chart-1/10",
      borderColor: "border-chart-1/20",
    },
    {
      label: "Fully Linked",
      value: fullyLinkedCount,
      icon: CheckCircle2,
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
      borderColor: "border-chart-2/20",
    },
    {
      label: "In Progress",
      value: inProgressCount,
      icon: Clock,
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
      borderColor: "border-chart-3/20",
    },
    {
      label: "Not Started",
      value: notStartedCount,
      icon: AlertCircle,
      color: "text-chart-4",
      bgColor: "bg-chart-4/10",
      borderColor: "border-chart-4/20",
    },
  ];

  return (
    <div className="min-h-screen text-foreground bg-background">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-foreground">{data.collectionName}</h1>
        <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
          Manage interconnected page relationships to strengthen site structure, and improve SEO performance.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color, bgColor, borderColor }) => (
          <div
            key={label}
            className="bg-card p-5 shadow-sm border border-border rounded-2xl relative overflow-hidden flex items-center justify-between group hover:border-border/80 transition-all"
          >
            <div className="space-y-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
              <p className="text-3xl font-black text-foreground tracking-tight">{value}</p>
            </div>
            <div
              className={cn(
                "p-3 rounded-xl border shadow-2xs flex items-center justify-center transition-transform group-hover:scale-110",
                bgColor,
                borderColor
              )}
            >
              <Icon className={cn("size-5", color)} />
            </div>
          </div>
        ))}
      </div>

      <RegistryDataTable data={data.collections} />
    </div>
  );
}
