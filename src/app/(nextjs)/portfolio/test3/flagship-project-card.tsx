import { ArrowUpRight, Code2, Globe, Layers, Layers3, Zap } from "lucide-react";
import { GithubIcon, NextjsIcon, ReactIcon, TypescriptIcon } from "@/ui/shared/icons";

const projectTechnologies = [
  { name: "Next.js", icon: NextjsIcon },
  { name: "React", icon: ReactIcon },
  { name: "TypeScript", icon: TypescriptIcon },
  { name: "API Integration", icon: Layers },
  { name: "State Management", icon: Layers },
  { name: "Performance", icon: Zap },
];

export function FlagshipProjectCard() {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border bg-card text-card-foreground transition-all duration-500 hover:-translate-y-1 hover:shadow-xl sm:col-span-full lg:col-span-2">
      {/* Preview */}
      <div className="relative min-h-80 overflow-hidden border-b border-border bg-muted p-5 sm:p-8">
        {/* Decorative interface */}
        <div className="absolute inset-8 rounded-xl border border-border bg-background shadow-sm transition-transform duration-500 group-hover:scale-[1.015]">
          <div className="flex h-10 items-center justify-between border-b border-border px-4">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-muted-foreground/40" />
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

        {/* Product label */}
        <div className="absolute left-8 top-8 rounded-full border border-border bg-background px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          Commercial SaaS Product · Previous Role
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <span className="size-1.5 rounded-full bg-primary" />
              Flagship Work
            </div>

            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Production-grade SaaS frontend.</h2>

            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
              Independently designed and built the complete frontend architecture from the ground up, translating a
              complex commercial SaaS product into a streamlined client-side Next.js experience.
            </p>

            <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
              The work involved managing complex application state, optimizing rendering and frontend performance, and
              building seamless integrations with backend APIs while keeping the experience responsive and maintainable.
            </p>
          </div>

          <div className="flex shrink-0 items-start gap-2">
            <a
              href="#"
              className="inline-flex size-10 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              aria-label="View live project"
            >
              <Globe className="size-4" />
            </a>

            <a
              href="#"
              className="inline-flex size-10 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              aria-label="View project repository"
            >
              <GithubIcon />
            </a>

            <a
              href="#"
              className="inline-flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground transition-opacity hover:opacity-90"
              aria-label="Explore project"
            >
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>

        {/* Technical highlights */}
        <div className="mt-8 grid gap-3 border-t border-border pt-6 sm:grid-cols-3">
          <div className="flex items-start gap-3">
            <Code2 className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

            <div>
              <p className="text-xs font-medium">Frontend Architecture</p>

              <p className="mt-1 text-xs leading-5 text-muted-foreground">Designed and implemented independently.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Layers3 className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

            <div>
              <p className="text-xs font-medium">Complex State</p>

              <p className="mt-1 text-xs leading-5 text-muted-foreground">Structured state and UI interactions.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Zap className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

            <div>
              <p className="text-xs font-medium">Performance</p>

              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Optimized rendering and API-driven experiences.
              </p>
            </div>
          </div>
        </div>

        {/* Stack */}
        <TechBadgeList technologies={projectTechnologies} />
      </div>
    </article>
  );
}

export interface TechItem {
  name: string;
  icon?: React.ElementType;
}

interface TechBadgeListProps {
  technologies: TechItem[];
  iconSize?: number;
  className?: string;
}

export const TechBadgeList: React.FC<TechBadgeListProps> = ({
  technologies,
  iconSize = 14,
  className = "mt-6 flex flex-wrap gap-2",
}) => {
  return (
    <div className={className}>
      {technologies.map((tech) => {
        const IconComponent = tech.icon;
        return (
          <span
            key={tech.name}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1.5 text-[10px] font-medium text-muted-foreground"
          >
            {IconComponent && <IconComponent size={iconSize} />}
            {tech.name}
          </span>
        );
      })}
    </div>
  );
};
