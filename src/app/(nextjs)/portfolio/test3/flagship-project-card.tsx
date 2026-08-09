import { ArrowUpRight, Code2, Globe, Layers, Zap } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PORTFO_CONFIG } from "@/domains/portfolio/constants/constants";
import type { ProjectData, ProjectHighlight, ProjectLinks, TechItem } from "@/domains/portfolio/types/project.types";
import { GithubIcon, NextjsIcon, ReactIcon, TypescriptIcon } from "@/ui/shared/icons";

/* -------------------------------------------------------------------------- */
/*                                1. Action Links                             */
/* -------------------------------------------------------------------------- */
export function ProjectActionLinks({ links }: { links: ProjectLinks }) {
  return (
    <div className="flex shrink-0 items-start gap-2">
      {links.website && (
        <Button variant="outline" size="icon" className="size-10" asChild>
          <Link href={links.website} target="_blank" rel="noreferrer" aria-label="Visit project website">
            <Globe className="size-4" />
          </Link>
        </Button>
      )}

      {links.github && (
        <Button variant="outline" size="icon" className="size-10" asChild>
          <Link href={links.github} target="_blank" aria-label="Explore GitHub repository">
            <GithubIcon className="size-4" />
          </Link>
        </Button>
      )}

      {links.demo && (
        <Button size="icon" className="size-10" asChild>
          <Link href={links.demo} target="_blank" aria-label="Explore project live demo">
            <ArrowUpRight className="size-4" />
          </Link>
        </Button>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                2. Mockup Preview                           */
/* -------------------------------------------------------------------------- */
export function DefaultProjectMockup() {
  return (
    <div className="absolute inset-8 rounded-xl border border-border bg-background shadow-sm transition-transform duration-500 group-hover:scale-[1.015]">
      <div className="flex h-10 items-center justify-between border-b border-border px-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-20 rounded-full bg-muted" />
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <span className="h-2 w-8 rounded-full bg-muted" />
          <span className="h-2 w-8 rounded-full bg-muted" />
          <span className="h-2 w-8 rounded-full bg-muted" />
        </div>
      </div>

      <div className="grid h-[calc(100%-2.5rem)] grid-cols-4">
        <div className="hidden border-r border-border p-4 sm:block">
          <div className="space-y-3">
            <div className="h-2 w-16 rounded-full bg-muted" />
            <div className="h-2 w-20 rounded-full bg-muted" />
            <div className="h-2 w-14 rounded-full bg-muted" />
            <div className="h-2 w-16 rounded-full bg-muted" />
          </div>
        </div>

        <div className="col-span-4 p-5 sm:col-span-3">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="h-20 rounded-lg border border-border bg-card" />
            <div className="h-20 rounded-lg border border-border bg-card" />
            <div className="h-20 rounded-lg border border-border bg-card" />
          </div>
          <div className="mt-4 h-28 rounded-lg border border-border bg-card" />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                            3. Technical Highlights                         */
/* -------------------------------------------------------------------------- */
export function ProjectHighlights({ highlights }: { highlights: ProjectHighlight[] }) {
  if (!highlights.length) return null;

  return (
    <>
      <Separator className="my-6" />
      <div className="grid gap-3 sm:grid-cols-3">
        {highlights.map((item) => {
          const IconComponent = item.icon;
          return (
            <div key={item.title} className="flex items-start gap-3">
              <IconComponent className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-xs font-medium">{item.title}</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                                4. Tech Badge List                          */
/* -------------------------------------------------------------------------- */
export const TechBadgeList = ({
  technologies,
  iconSize = 14,
  className = "mt-6 flex flex-wrap gap-2",
}: {
  technologies: TechItem[];
  iconSize?: number;
  className?: string;
}) => {
  return (
    <div className={className}>
      {technologies.map((tech) => {
        const IconComponent = tech.icon;
        return (
          <Badge
            key={tech.name}
            variant="secondary"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-medium"
          >
            {IconComponent && <IconComponent size={iconSize} />}
            {tech.name}
          </Badge>
        );
      })}
    </div>
  );
};

export function ProjectCard({ project }: { project: ProjectData }) {
  return (
    <Card className="group relative overflow-hidden rounded-2xl border-border transition-all duration-500 hover:-translate-y-1 hover:shadow-xl sm:col-span-full lg:col-span-2">
      {/* Visual Preview Banner */}
      <div className="relative min-h-80 overflow-hidden border-b border-border bg-muted p-5 sm:p-8">
        {project.previewContent || <DefaultProjectMockup />}

        <Badge
          variant="outline"
          className="absolute left-8 top-8 h-8 rounded-full font-mono text-[10px] uppercase tracking-wider"
        >
          <span className="mr-1.5 size-2 rounded-full bg-muted-foreground/40" />
          {project.badgeLabel}
        </Badge>
      </div>

      {/* Main Content */}
      <CardContent className="p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row">
          <div className="max-w-2xl">
            <div className="flex items-center justify-between">
              <div className="mb-3 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <span className="size-1.5 rounded-full bg-primary" />
                {project.roleMeta}
              </div>

              <ProjectActionLinks links={project.links} />
            </div>

            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{project.title}</h2>

            <div className="mt-4 space-y-3">
              {project.description.map((paragraph, idx) => (
                <div key={idx} className="text-sm leading-7 text-muted-foreground sm:text-base">
                  {paragraph}
                </div>
              ))}
            </div>

            {project.callout && (
              <div className="mt-5 rounded-lg border border-border bg-muted/30 px-4 py-3">
                <div className="text-xs leading-5 text-muted-foreground">{project.callout}</div>
              </div>
            )}
          </div>
        </div>

        <ProjectHighlights highlights={project.highlights} />
        <TechBadgeList technologies={project.technologies} />
      </CardContent>
    </Card>
  );
}

const FLAGSHIP_PROJECT_DATA: ProjectData = {
  title: "Linkboss SaaS Frontend",
  badgeLabel: "Commercial SaaS Product · Previous Role",
  roleMeta: "Previous Role · 3 Years · Sole Frontend Developer",
  links: {
    website: PORTFO_CONFIG.PROFESSIONAL_PROJECTS.LINKBOSS,
    github: PORTFO_CONFIG.PROJECTS_GITHUB.LINKER,
    demo: PORTFO_CONFIG.PROJECTS.LINKER,
  },
  description: [
    <p key="1">
      Sole frontend developer for{" "}
      <Link
        href={PORTFO_CONFIG.PROFESSIONAL_PROJECTS.LINKBOSS}
        target="_blank"
        rel="noreferrer"
        className="text-foreground underline underline-offset-4 transition-colors hover:text-primary"
      >
        Linkboss
      </Link>
      , a production SaaS platform, for <strong className="text-foreground">3</strong> years. I translated product ideas
      into the complete frontend application, owning the architecture, technical decisions, API integrations, and
      ongoing development from the ground up.
    </p>,
    <p key="2">
      As the sole frontend developer, I designed and maintained the application's core data flows and complex
      interfaces, while continuously refining the product through three major UI/UX iterations as its requirements
      evolved.
    </p>,
  ],
  callout: (
    <p>
      <span className="font-medium text-foreground">Portfolio Recreation:</span> The original product, reimagined as a
      streamlined client-side <span className="font-medium text-foreground">Next.js</span> experience.
    </p>
  ),
  highlights: [
    {
      title: "3 Years Ownership",
      description: "Built and scaled the entire frontend from scratch.",
      icon: Code2,
    },
    {
      title: "Full-Stack Integration",
      description: "API-driven single-page application built on React and Next.js.",
      icon: Layers,
    },
    {
      title: "Production Scale",
      description: "Optimized rendering and seamless API integrations.",
      icon: Zap,
    },
  ],
  technologies: [
    { name: "Next.js", icon: NextjsIcon },
    { name: "React", icon: ReactIcon },
    { name: "TypeScript", icon: TypescriptIcon },
    { name: "API Integration", icon: Layers },
    { name: "State Management", icon: Layers },
    { name: "Performance", icon: Zap },
  ],
};

export function FlagshipProjectCard() {
  return <ProjectCard project={FLAGSHIP_PROJECT_DATA} />;
}
