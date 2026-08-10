import { Activity, ArrowUpRight, Code2, Globe, Layers, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PORTFO_CONFIG } from "@/domains/portfolio/constants/constants";
import type {
  ProjectData,
  ProjectHighlight,
  ProjectLinks,
  ProjectScreenshots,
  TechItem,
} from "@/domains/portfolio/types/project.types";
import {
  AxiosIcon,
  GithubIcon,
  ReactIcon,
  ShadcnIcon,
  TailwindIcon,
  TanstackQueryIcon,
  TipTapEditorIcon,
  TypescriptIcon,
  ViteIcon,
} from "@/ui/shared/icons";

const FLAGSHIP_PROJECT_DATA: ProjectData = {
  title: "Linkboss SaaS Frontend",
  badgeLabel: "Commercial SaaS Product · Previous Role",
  roleMeta: "Previous Role · 3 Years · Sole Frontend Developer",
  links: {
    website: PORTFO_CONFIG.PROFESSIONAL_PROJECTS.LINKBOSS,
    github: PORTFO_CONFIG.PROJECTS_GITHUB.LINKER,
    demo: PORTFO_CONFIG.PROJECTS.LINKER,
  },
  screenshots: {
    light: "/portfolio/linker-light.png",
    dark: "/portfolio/linker-dark.png",
    alt: "Linkboss SaaS application interface preview",
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
      title: "SPA Architecture",
      description: "Production single-page application.",
      icon: Layers,
    },
    {
      title: "Production Scale",
      description: "Optimized rendering and seamless API integrations.",
      icon: Zap,
    },
  ],
  technologies: [
    { name: "React", icon: ReactIcon },
    { name: "TypeScript", icon: TypescriptIcon },
    { name: "Tailwind CSS", icon: TailwindIcon },
    { name: "Axios", icon: AxiosIcon },
    { name: "Tanstack Query", icon: TanstackQueryIcon },
    { name: "Zustand", icon: Activity },
    { name: "Shadcn", icon: ShadcnIcon },
    { name: "TipTapEditor", icon: TipTapEditorIcon },
    { name: "Vite", icon: ViteIcon },
  ],
};

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
            className="gap-1.5 h-6 text-[10px] bg-background text-muted-foreground"
          >
            {IconComponent && <IconComponent size={iconSize} />}
            {tech.name}
          </Badge>
        );
      })}
    </div>
  );
};

export function FlagshipProjectCard() {
  return (
    <Card className="group relative overflow-hidden rounded-2xl border-border transition-all duration-500 hover:-translate-y-1 hover:shadow-xl sm:col-span-full lg:col-span-2">
      {/* Visual Preview Banner */}
      <div className="relative min-h-80 overflow-hidden border-b border-border bg-muted p-5 sm:p-8">
        {FLAGSHIP_PROJECT_DATA.screenshots ? (
          <ProjectScreenshotPreview screenshots={FLAGSHIP_PROJECT_DATA.screenshots} />
        ) : (
          FLAGSHIP_PROJECT_DATA.previewContent
        )}

        <Badge
          variant="outline"
          className="absolute left-2 top-1 h-8 rounded-full font-mono text-[10px] uppercase tracking-wider bg-background/80 backdrop-blur-sm"
        >
          <span className="mr-1.5 size-2 rounded-full bg-muted-foreground/40" />
          {FLAGSHIP_PROJECT_DATA.badgeLabel}
        </Badge>
      </div>

      {/* Main Content */}
      <CardContent className="p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row">
          <div className="max-w-2xl">
            <div className="flex items-center justify-between">
              <div className="mb-3 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <span className="size-1.5 rounded-full bg-primary" />
                {FLAGSHIP_PROJECT_DATA.roleMeta}
              </div>

              <ProjectActionLinks links={FLAGSHIP_PROJECT_DATA.links} />
            </div>

            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{FLAGSHIP_PROJECT_DATA.title}</h2>

            <div className="mt-4 space-y-3">
              {FLAGSHIP_PROJECT_DATA.description.map((paragraph, idx) => (
                <div key={idx} className="text-sm leading-7 text-muted-foreground sm:text-base">
                  {paragraph}
                </div>
              ))}
            </div>

            {FLAGSHIP_PROJECT_DATA.callout && (
              <div className="mt-5 rounded-lg border border-border bg-muted/30 px-4 py-3">
                <div className="text-xs leading-5 text-muted-foreground">{FLAGSHIP_PROJECT_DATA.callout}</div>
              </div>
            )}
          </div>
        </div>

        <ProjectHighlights highlights={FLAGSHIP_PROJECT_DATA.highlights} />
        <TechBadgeList technologies={FLAGSHIP_PROJECT_DATA.technologies} />
      </CardContent>
    </Card>
  );
}
