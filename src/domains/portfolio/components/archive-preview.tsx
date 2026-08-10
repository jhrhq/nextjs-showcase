import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { CssIcon, JavascriptIcon, ReactIcon } from "@/ui/shared/icons";
import { archiveStats, totalArchiveProjects } from "./portfolio-data";

const icons = {
  "React / Vite Apps": ReactIcon,
  "JavaScript Projects": JavascriptIcon,
  "HTML / CSS / SCSS Builds": CssIcon,
};

export function ArchivePreview() {
  return (
    <section id="archive" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="grid lg:grid-cols-[1.2fr_1fr]">
            {/* Intro */}
            <div className="p-6 sm:p-10 lg:p-12">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">02 / Archive & Labs</p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                40+ projects built while learning, experimenting, and shipping.
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                Before focusing on larger applications, I spent years building smaller interfaces, frontend experiments,
                JavaScript projects, and React applications. This archive preserves that progression.
              </p>

              <div className="mt-8">
                <Link
                  href="/projects"
                  className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Explore Full Archive
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>

            {/* Statistics */}
            <div className="border-t border-border lg:border-l lg:border-t-0">
              {archiveStats.map((stat) => {
                const Icon = icons[stat.label as keyof typeof icons];

                return (
                  <div
                    key={stat.label}
                    className="flex items-center justify-between border-b border-border p-6 last:border-b-0 sm:p-8"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex size-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground">
                        <Icon className="size-4" />
                      </div>

                      <div>
                        <p className="text-sm font-medium">{stat.label}</p>

                        <p className="mt-1 text-xs text-muted-foreground">Archived projects</p>
                      </div>
                    </div>

                    <span className="font-mono text-2xl font-semibold tracking-tight">{stat.count}</span>
                  </div>
                );
              })}

              <div className="flex items-center justify-between bg-background p-6 sm:p-8">
                <span className="text-sm font-medium">Total archive</span>

                <span className="font-mono text-sm text-muted-foreground">{totalArchiveProjects}+ projects</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
