import { ArrowUpRight, Globe } from "lucide-react";
import { GithubIcon } from "@/ui/shared/icons";
import type { Project } from "../lib/portfolio-data2";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className = "" }: ProjectCardProps) {
  return (
    <article
      className={`group relative flex min-h-82.5 flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/30 ${className}`}
    >
      {/* Project preview */}
      <div className="relative h-48 overflow-hidden border-b border-border bg-background">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(120,120,120,0.12),transparent_45%)]"
        />

        {/* Browser mockup */}
        <div className="absolute inset-5 rounded-xl border border-border bg-card p-3 shadow-sm transition-transform duration-500 group-hover:scale-[1.02]">
          <div className="flex gap-1.5">
            <span className="size-2 rounded-full bg-red-400/50" />
            <span className="size-2 rounded-full bg-yellow-400/50" />
            <span className="size-2 rounded-full bg-green-400/50" />
          </div>

          <div className="mt-5 space-y-2">
            <div className="h-2 w-2/3 rounded bg-muted" />
            <div className="h-2 w-1/2 rounded bg-muted" />

            <div className="mt-5 grid grid-cols-3 gap-2">
              <div className="h-12 rounded border border-border bg-muted/30" />
              <div className="h-12 rounded border border-border bg-muted/30" />
              <div className="h-12 rounded border border-border bg-muted/30" />
            </div>
          </div>
        </div>

        {/* Category */}
        <span className="absolute right-4 top-4 rounded-full border border-border bg-background/80 px-2.5 py-1 text-[10px] font-medium text-muted-foreground backdrop-blur">
          {project.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold tracking-tight text-card-foreground">{project.title}</h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">{project.description}</p>
          </div>

          <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground" />
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((technology) => {
              const Icon = technology.icon;

              return (
                <span
                  key={technology.name}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border px-2 py-1 text-[10px] text-muted-foreground"
                >
                  <Icon className="size-3" />
                  {technology.name}
                </span>
              );
            })}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} GitHub repository`}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <GithubIcon />{" "}
              </a>
            )}

            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} live demo`}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Globe className="size-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
