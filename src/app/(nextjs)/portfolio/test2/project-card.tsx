import { ArrowUpRight, Globe } from "lucide-react";
import { GithubIcon } from "@/ui/shared/icons";
import type { Project } from "./portfolio-data";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className = "" }: ProjectCardProps) {
  return (
    <article
      className={`group relative flex min-h-[360px] flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${className}`}
    >
      {/* Preview */}
      <div className="relative h-52 overflow-hidden border-b border-border bg-muted">
        {/* Decorative browser */}
        <div className="absolute inset-5 overflow-hidden rounded-lg border border-border bg-background shadow-sm transition-transform duration-500 group-hover:scale-[1.02]">
          {/* Browser header */}
          <div className="flex h-8 items-center gap-1.5 border-b border-border px-3">
            <span className="size-1.5 rounded-full bg-muted-foreground/40" />
            <span className="size-1.5 rounded-full bg-muted-foreground/40" />
            <span className="size-1.5 rounded-full bg-muted-foreground/40" />
          </div>

          {/* Browser content */}
          <div className="space-y-3 p-4">
            <div className="h-2 w-2/3 rounded-full bg-muted" />
            <div className="h-2 w-1/2 rounded-full bg-muted" />

            <div className="grid grid-cols-3 gap-2 pt-3">
              <div className="h-12 rounded-md border border-border bg-muted/50" />
              <div className="h-12 rounded-md border border-border bg-muted/50" />
              <div className="h-12 rounded-md border border-border bg-muted/50" />
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

          <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground" />
        </div>

        {/* Bottom */}
        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          {/* Technologies */}
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((technology) => {
              const Icon = technology.icon;

              return (
                <span
                  key={technology.name}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1 text-[10px] text-muted-foreground"
                >
                  <Icon className="size-3" />
                  {technology.name}
                </span>
              );
            })}
          </div>

          {/* Links */}
          <div className="flex shrink-0 items-center gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} GitHub`}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <GithubIcon />
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
