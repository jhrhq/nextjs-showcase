import { ArrowUpRight, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/domains/portfolio/components/portfolio-data";
import { GithubIcon } from "@/ui/shared/icons";
import type { ProjectScreenshots } from "../types/project.types";

export function ProjectScreenshotPreview({ screenshots }: { screenshots: ProjectScreenshots }) {
  return (
    <div className="absolute inset-8 overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-transform duration-500 group-hover:scale-[1.015]">
      <Image
        src={screenshots.light}
        alt={screenshots.alt}
        className="h-full w-full object-cover object-top block dark:hidden"
        height={500}
        width={500}
      />

      <Image
        src={screenshots.dark}
        alt={screenshots.alt}
        className="h-full w-full object-cover object-top hidden dark:block"
        height={500}
        width={500}
      />
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-48 overflow-hidden border-b border-border bg-muted">
        <ProjectScreenshotPreview screenshots={project.screenshots} />
        <span className="absolute right-4 top-4 rounded-full border border-border bg-background px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold tracking-tight">{project.title}</h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">{project.description}</p>
          </div>

          <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground" />
        </div>

        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((technology) => {
              const Icon = technology.icon;

              return (
                <Badge
                  key={technology.name}
                  variant="secondary"
                  className="gap-1.5 h-6 text-[10px] bg-background text-muted-foreground"
                >
                  <Icon className="size-3" /> {technology.name}
                </Badge>
              );
            })}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {project.github && (
              <Link
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} GitHub`}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <GithubIcon />{" "}
              </Link>
            )}

            {project.demo && (
              <Link
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} live demo`}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Globe className="size-7 stroke-[1.3]" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
