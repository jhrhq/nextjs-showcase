import { ArrowUpRight } from "lucide-react";
import { projects } from "./portfolio-data";
import { ProjectCard } from "./project-card";

const featuredProjects = projects.filter((project) => project.featured);

export function FeaturedProjects() {
  return (
    <section id="projects" className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
      {/* Heading */}
      <div className="mb-12 max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">01 / Selected Work</p>

        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Projects built with purpose.
        </h2>

        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          A selection of applications and interfaces where product thinking meets engineering.
        </p>
      </div>

      {/* Bento */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {featuredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            className={index === 0 ? "min-h-[520px] lg:col-span-2" : "min-h-[520px]"}
          />
        ))}

        {/* Archive */}
        <div className="group hidden min-h-[280px] overflow-hidden rounded-xl border border-border bg-card p-6 text-card-foreground lg:block">
          <div className="flex h-full flex-col justify-between">
            <span className="font-mono text-xs text-muted-foreground">MORE PROJECTS</span>

            <div>
              <h3 className="text-2xl font-semibold tracking-tight">Explore the archive</h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                Browse React, Vite, HTML, and CSS experiments from years of building and learning.
              </p>

              <a
                href="#labs"
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-muted-foreground"
              >
                View labs
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
