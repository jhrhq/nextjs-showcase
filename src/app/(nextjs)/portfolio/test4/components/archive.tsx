import { Archive, ArrowRight } from "lucide-react";
import { HtmlIcon, JavascriptIcon, ReactIcon } from "@/ui/shared/icons";

const STATS = [
  {
    value: "22",
    label: "React / Vite apps",
    Icon: ReactIcon,
    detail: "Hooks, custom state, animation, Supabase sync",
  },
  {
    value: "8",
    label: "JavaScript projects",
    Icon: JavascriptIcon,
    detail: "Vanilla ES6+, DOM APIs, Canvas, WebSockets",
  },
  {
    value: "11",
    label: "HTML / CSS / SCSS builds",
    Icon: HtmlIcon,
    detail: "Layouts, animations, design systems, accessibility",
  },
];

const SAMPLE_PROJECTS = [
  { title: "React E-commerce UI", tech: "React / Vite" },
  { title: "Weather Dashboard", tech: "React / Vite" },
  { title: "Expense Tracker", tech: "React / Vite" },
  { title: "Quiz App Engine", tech: "JavaScript" },
  { title: "CSS Art Showcase", tech: "HTML / SCSS" },
  { title: "Portfolio v1", tech: "HTML / CSS" },
];

export function ArchiveSection() {
  return (
    <section id="archive" className="py-20 px-4 bg-secondary border-t border-border">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <p className="text-xs font-mono font-semibold text-accent tracking-widest uppercase mb-2">
              Archive &amp; Labs
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground flex items-center gap-3">
              <Archive size={30} className="text-accent shrink-0" />
              40+ more projects
            </h2>
            <p className="mt-3 text-muted-foreground text-base max-w-lg">
              Beyond the flagship work, there&apos;s a deep bench — foundational builds, experiments, and labs that
              trace the full learning arc from first div to production-grade architecture.
            </p>
          </div>

          <a
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity duration-200 whitespace-nowrap self-start sm:self-auto shrink-0"
          >
            Browse Full Archive
            <ArrowRight size={15} />
          </a>
        </div>

        {/* ── Stat counters ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {STATS.map(({ value, label, Icon, detail }) => (
            <div
              key={label}
              className="glass-card rounded-xl p-6 flex flex-col gap-3 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <span className="stat-number text-5xl font-bold text-foreground">{value}</span>
                <span className="w-10 h-10 rounded-lg bg-secondary border border-border flex items-center justify-center">
                  <Icon size={18} className="text-accent" />
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Sample project list ── */}
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">Sample from the archive</span>
            <span className="text-xs text-muted-foreground font-mono">showing 6 of 41</span>
          </div>
          <div className="divide-y divide-border">
            {SAMPLE_PROJECTS.map(({ title, tech }) => (
              <div
                key={title}
                className="flex items-center justify-between px-5 py-3.5 hover:bg-secondary transition-colors duration-150 group"
              >
                <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                  {title}
                </span>
                <span className="inline-flex px-2 py-0.5 rounded border border-border bg-secondary text-secondary-foreground text-xs font-medium shrink-0 ml-4">
                  {tech}
                </span>
              </div>
            ))}
          </div>
          <div className="px-5 py-4 border-t border-border">
            <a
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline underline-offset-4"
            >
              View all 41 projects with filters
              <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
