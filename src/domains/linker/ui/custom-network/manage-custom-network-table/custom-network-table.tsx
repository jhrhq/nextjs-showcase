import { CUSTOM_NETWORK_DATA } from "./data";
import { RegistryDataTable } from "./data-table";

const STATS = [
  { label: "Total Nodes", value: CUSTOM_NETWORK_DATA.collections.length, accent: "#1a56db" },
  {
    label: "Fully Linked",
    value: CUSTOM_NETWORK_DATA.collections.filter((r) => r.state === "Fully Linked").length,
    accent: "#10b981",
  },
  {
    label: "In Progress",
    value: CUSTOM_NETWORK_DATA.collections.filter((r) => r.state === "In Progress").length,
    accent: "#f59e0b",
  },
  {
    label: "Not Started",
    value: CUSTOM_NETWORK_DATA.collections.filter((r) => r.state === "Not Started").length,
    accent: "#e11d48",
  },
];

export default function InternalLinkManagement() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-400 tracking-tight mb-2">Internal Link Management</h1>
        <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
          Audit and optimize connectivity between your registry assets.{" "}
          <span className="text-blue-400 font-medium">Deep Search</span> traces any URL across all nested links.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {STATS.map(({ label, value, accent }) => (
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

      {/* Data table */}
      <RegistryDataTable data={CUSTOM_NETWORK_DATA.collections} />
    </div>
  );
}
