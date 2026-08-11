import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Project } from "./types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Link
      href={project.live}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group
        block
        overflow-hidden
        rounded-2xl
        border
        border-border
        bg-card
        outline-none
        transition-all
        duration-300
        hover:border-foreground/30
        focus-visible:ring-2
        focus-visible:ring-foreground
        focus-visible:ring-offset-2
        focus-visible:ring-offset-background
      "
      aria-label={`View ${project.title} project`}
    >
      {/* Project image */}
      <div className="relative aspect-16/10 w-full overflow-hidden border-b border-border bg-muted">
        <Image
          src={project.img}
          alt={`${project.title} project preview`}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 640px"
          className="object-cover grayscale transition-all duration-500 ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
        />

        {/* Image overlay */}
        <div
          className="
            absolute
            inset-0
            bg-linear-to-t
            from-black/50
            via-black/5
            to-transparent
            opacity-70
            transition-opacity
            duration-300
            group-hover:opacity-50
          "
        />

        {/* Project number */}
        <div
          className="
            absolute
            left-4
            top-4
            rounded-full
            border
            border-white/20
            bg-black/60
            px-3
            py-1.5
            font-mono
            text-[10px]
            uppercase
            tracking-[0.15em]
            text-white
            backdrop-blur-md
          "
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Category */}
        <div
          className="
            absolute
            bottom-4
            left-4
            rounded-full
            border
            border-white/20
            bg-black/60
            px-3
            py-1.5
            font-mono
            text-[10px]
            uppercase
            tracking-[0.12em]
            text-white
            backdrop-blur-md
          "
        >
          {project.category}
        </div>

        {/* Arrow */}
        <div
          className="
            absolute
            bottom-4
            right-4
            flex
            size-10
            translate-y-2
            items-center
            justify-center
            rounded-full
            border
            border-white/20
            bg-black/60
            text-white
            opacity-0
            backdrop-blur-md
            transition-all
            duration-300
            group-hover:translate-y-0
            group-hover:opacity-100
          "
        >
          <ArrowUpRight className="size-4" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div
              className="
                mb-1.5
                font-mono
                text-[10px]
                uppercase
                tracking-[0.2em]
                text-muted-foreground
              "
            >
              Project {String(index + 1).padStart(2, "0")}
            </div>

            <h2
              className="
                text-xl
                font-medium
                tracking-tight
                text-foreground
                transition-colors
                group-hover:text-foreground/80
                sm:text-2xl
              "
            >
              {project.title}
            </h2>
          </div>

          <ArrowUpRight
            className="
              mt-1
              size-5
              shrink-0
              text-muted-foreground
              transition-all
              duration-300
              group-hover:-translate-y-0.5
              group-hover:translate-x-0.5
              group-hover:text-foreground
            "
          />
        </div>

        <p
          className="
            mt-4
            line-clamp-2
            text-sm
            leading-6
            text-muted-foreground
          "
        >
          {project.description}
        </p>

        {/* Technologies */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.technologies.map((technology) => (
            <Badge
              key={technology}
              variant="secondary"
              className="
                rounded-full
                bg-muted
                px-2.5
                py-1
                text-[10px]
                font-normal
                text-muted-foreground
              "
            >
              {technology}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}
