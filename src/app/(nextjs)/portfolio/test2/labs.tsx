"use client";

import { ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";
import { type ProjectCategory, projects } from "./portfolio-data";

type Filter = "All" | ProjectCategory;

const filters: Filter[] = ["All", "Next.js", "React/Vite", "HTML/CSS Labs"];

export function Labs() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return projects;
    }

    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="labs" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              02 / Labs & Experiments
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Everything else.</h2>

            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Smaller applications, experiments, and projects that helped shape my frontend and full-stack development
              journey.
            </p>
          </div>

          {/* Filters */}
          <div className="w-full overflow-x-auto lg:w-auto">
            <div
              role="tablist"
              aria-label="Project filters"
              className="flex w-max rounded-lg border border-border bg-card p-1"
            >
              {filters.map((filter) => {
                const active = filter === activeFilter;

                return (
                  <button
                    key={filter}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveFilter(filter)}
                    className={`whitespace-nowrap rounded-md px-3 py-2 text-xs font-medium transition-colors ${
                      active
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Project list */}
        <div className="mt-12 divide-y divide-border border-y border-border">
          {filteredProjects.map((project, index) => (
            <article
              key={project.id}
              className="group flex flex-col gap-4 py-6 transition-colors hover:bg-card sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-5">
                {/* Number */}
                <div className="hidden size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background sm:flex">
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Information */}
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-medium text-foreground">{project.title}</h3>

                    <span className="rounded-full border border-border bg-background px-2 py-0.5 text-[10px] text-muted-foreground">
                      {project.category}
                    </span>
                  </div>

                  <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">{project.description}</p>
                </div>
              </div>

              <ArrowUpRight className="hidden size-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground sm:block" />
            </article>
          ))}

          {filteredProjects.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-sm text-muted-foreground">No projects found.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
