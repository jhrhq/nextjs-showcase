import { CircleStar, ExternalLink, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  BetterAuthIcon,
  GithubIcon,
  MdxIcon,
  MongodbIcon,
  MongooseIcon,
  NextjsIcon,
  ReactIcon,
  StripeIcon,
  TailwindIcon,
  TanstackQueryIcon,
  TypescriptIcon,
  ViteIcon,
} from "@/ui/shared/icons";

/* ── Types ── */
interface Project {
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  demo?: string;
  repo?: string;
  tag: string;
  flagship?: boolean;
}

/* ── Tech Icon Mapping ── */
const techIconMap: Record<string, React.ElementType> = {
  "Next.js": NextjsIcon,
  "Next.js 15": NextjsIcon,
  TypeScript: TypescriptIcon,
  React: ReactIcon,
  "React 19": ReactIcon,
  "Tailwind CSS": TailwindIcon,
  Vite: ViteIcon,
  MDX: MdxIcon,
  Stripe: StripeIcon,
  Mongodb: MongodbIcon,
  Mongoose: MongooseIcon,
  BetterAuth: BetterAuthIcon,
  TanstackQuery: TanstackQueryIcon,
};

/* ── Data ── */
const PROJECTS: Project[] = [
  {
    flagship: true,
    title: "Flagship SaaS Platform",
    tagline: "Production-grade commercial SaaS — reimagined",
    tag: "SaaS · Commercial Frontend",
    description:
      "A full-scale enterprise SaaS frontend originally built for a commercial client with 40 000+ lines of production code across 3 geographic regions. Re-architected as a minified, fully client-side Next.js experience that demonstrates the same data-loading patterns, role-based UI, edge-caching strategy, and streaming Suspense boundaries — without any proprietary backend. Features advanced dashboard layouts, real-time chart components, multi-tenant routing, and a custom design system built on Tailwind CSS.",
    tech: ["Next.js 15", "TypeScript", "React 19", "Tailwind CSS", "Zustand", "TanStack Query", "Recharts"],
    demo: "#",
    repo: "#",
  },
  {
    title: "StayEase — Hotel Booking",
    tagline: "End-to-end reservation platform",
    tag: "Full-Stack · Next.js",
    description:
      "Real-time room availability, Stripe payments, a property-manager dashboard, and server-side dynamic pricing. Sub-second page loads via ISR + edge caching.",
    tech: ["Next.js", "TypeScript", "BetterAuth", "Mongoose", "TanstackQuery", "Mongodb", "Stripe", "Tailwind CSS"],
    demo: "#",
    repo: "#",
  },
  {
    title: "Momentum — Kanban Board",
    tagline: "Local-first task manager, Vite + React",
    tag: "React / Vite · App",
    description:
      "Drag-and-drop kanban with keyboard-accessible controls, optimistic updates, Supabase sync, and fluid Framer Motion transitions.",
    tech: ["React", "Vite", "Supabase", "Tailwind CSS"],
    demo: "#",
    repo: "#",
  },
  {
    title: "DevLog — MDX Blog Engine",
    tagline: "Lighthouse-perfect developer blog",
    tag: "Next.js · Content",
    description:
      "MDX with syntax highlighting, reading-time, tag filtering, RSS, and a perfect 100 Lighthouse score across all categories.",
    tech: ["Next.js", "TypeScript", "MDX", "Tailwind CSS"],
    demo: "#",
    repo: "#",
  },
];

/* ── Sub-components ── */
function TechBadge({ label }: { label: string }) {
  const IconComponent = techIconMap[label];

  return (
    <Badge variant="secondary" className="inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium">
      {IconComponent && <IconComponent size={12} />}
      {label}
    </Badge>
  );
}

function Links({ demo, repo }: { demo?: string; repo?: string }) {
  return (
    <div className="flex items-center gap-2">
      {demo && (
        <a
          href={demo}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-85 transition-opacity"
        >
          <ExternalLink size={11} />
          Live Demo
        </a>
      )}
      {repo && (
        <a
          href={repo}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-foreground text-xs font-semibold hover:bg-secondary transition-colors"
        >
          <GithubIcon size={11} />
          GitHub
        </a>
      )}
    </div>
  );
}

/* ── Main export ── */
export function Projects() {
  const [flagship, ...rest] = PROJECTS;

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-mono font-semibold text-accent tracking-widest uppercase mb-2">Featured Work</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Projects that ship</h2>
        </div>

        {/* ── BENTO GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Flagship — full width hero card */}
          <article className="glass-card flagship-card rounded-2xl p-7 lg:col-span-3 flex flex-col md:flex-row gap-8 group">
            <div className="flex-1 flex flex-col">
              {/* Label row */}
              <div className="flex items-center gap-2.5 mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
                  <Sparkles size={11} />
                  {flagship.tag}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground font-medium">
                  <CircleStar size={11} className="text-accent" />
                  Flagship
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-card-foreground mb-1 group-hover:text-accent transition-colors duration-200">
                {flagship.title}
              </h3>
              <p className="text-sm font-medium text-muted-foreground mb-4">{flagship.tagline}</p>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 max-w-2xl">{flagship.description}</p>
            </div>

            {/* Right panel */}
            <div className="flex flex-col justify-between gap-5 md:min-w-56">
              {/* Stack */}
              <div>
                <p className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {flagship.tech.map((t) => (
                    <TechBadge key={t} label={t} />
                  ))}
                </div>
              </div>
              {/* Links */}
              <div className="flex flex-col gap-2">
                <Links demo={flagship.demo} repo={flagship.repo} />
              </div>
            </div>
          </article>

          {/* ── Standard cards — col-span-1 each ── */}
          {rest.map((project) => (
            <article
              key={project.title}
              className="glass-card rounded-xl p-5 flex flex-col group hover:shadow-lg transition-all duration-200"
            >
              <span className="inline-flex text-xs font-medium text-muted-foreground mb-3">{project.tag}</span>
              <h3 className="text-base font-bold text-card-foreground mb-1 group-hover:text-accent transition-colors duration-200">
                {project.title}
              </h3>
              <p className="text-xs font-medium text-muted-foreground mb-3">{project.tagline}</p>
              <p className="text-xs text-muted-foreground leading-relaxed flex-1">{project.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-4 mb-4">
                {project.tech.map((t) => (
                  <TechBadge key={t} label={t} />
                ))}
              </div>
              <Links demo={project.demo} repo={project.repo} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
