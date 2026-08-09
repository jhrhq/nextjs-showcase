"use client";
import { Code2, ExternalLink, FlaskConical } from "lucide-react";
import { useState } from "react";

type Tab = "All" | "Next.js" | "React/Vite" | "HTML/CSS Labs";

interface Lab {
  title: string;
  description: string;
  tab: Exclude<Tab, "All">;
  repo?: string;
  demo?: string;
}

const LABS: Lab[] = [
  {
    title: "Next.js Auth Starter",
    description:
      "Server-side auth with Next.js middleware, protected routes, and session management using NextAuth.js.",
    tab: "Next.js",
    repo: "#",
    demo: "#",
  },
  {
    title: "ISR Blog Template",
    description: "Incremental Static Regeneration demo — markdown posts rebuild only on change, zero cold starts.",
    tab: "Next.js",
    repo: "#",
  },
  {
    title: "React Custom Hooks Library",
    description: "A collection of reusable hooks: useDebounce, useLocalStorage, useIntersection, useAsync.",
    tab: "React/Vite",
    repo: "#",
    demo: "#",
  },
  {
    title: "Vite Component Playground",
    description:
      "Sandboxed environment for rapid UI prototyping with HMR, built with Vite and Storybook-like structure.",
    tab: "React/Vite",
    repo: "#",
  },
  {
    title: "Vite PWA Starter",
    description: "Progressive Web App shell with offline-first caching, install prompt, and Workbox integration.",
    tab: "React/Vite",
    repo: "#",
    demo: "#",
  },
  {
    title: "CSS Grid Masonry Layout",
    description: "Pure CSS masonry implementation that works without JavaScript — just grid-auto-rows magic.",
    tab: "HTML/CSS Labs",
    demo: "#",
  },
  {
    title: "CSS Scroll-Driven Animations",
    description: "Experiments with the Scroll Timeline API: progress bars, parallax, and sticky reveals.",
    tab: "HTML/CSS Labs",
    demo: "#",
  },
  {
    title: "Glassmorphism UI Kit",
    description: "Cards, modals, and badges exploring frosted-glass effects across light and dark palettes.",
    tab: "HTML/CSS Labs",
    demo: "#",
  },
];

const TABS: Tab[] = ["All", "Next.js", "React/Vite", "HTML/CSS Labs"];

function LabCard({ lab }: { lab: Lab }) {
  return (
    <article className="glass-card rounded-xl p-5 flex flex-col hover:shadow-md transition-all duration-200 group">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-sm font-semibold text-card-foreground group-hover:text-accent transition-colors leading-snug">
          {lab.title}
        </h3>
        <span className="shrink-0 inline-flex px-2 py-0.5 rounded border border-border bg-secondary text-secondary-foreground text-xs font-medium">
          {lab.tab}
        </span>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed flex-1">{lab.description}</p>
      <div className="flex items-center gap-2 mt-4">
        {lab.demo && (
          <a
            href={lab.demo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs text-accent hover:underline underline-offset-2 font-medium"
          >
            <ExternalLink size={11} />
            Demo
          </a>
        )}
        {lab.repo && (
          <a
            href={lab.repo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            <Code2 size={11} />
            Code
          </a>
        )}
      </div>
    </article>
  );
}

export function Labs() {
  const [active, setActive] = useState<Tab>("All");

  const visible = active === "All" ? LABS : LABS.filter((l) => l.tab === active);

  return (
    <section className="py-20 px-4 bg-secondary">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-mono font-medium text-accent tracking-widest uppercase mb-3">
            Labs &amp; Experiments
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground flex items-center gap-3">
              <FlaskConical size={32} className="text-accent" />
              Experiments
            </h2>

            {/* Tab filter */}
            <div className="flex items-center gap-1 p-1 rounded-lg border border-border bg-card w-fit flex-wrap">
              {TABS.map((tab) => (
                <button
                  type="button"
                  key={tab}
                  onClick={() => setActive(tab)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-150 whitespace-nowrap
                    ${
                      active === tab
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((lab) => (
            <LabCard key={lab.title} lab={lab} />
          ))}
        </div>
      </div>
    </section>
  );
}
