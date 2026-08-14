import {
  Activity,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  Database,
  FileText,
  GitBranch,
  Layers,
  Layers3,
  LayoutGrid,
  Network,
  RefreshCw,
  Server,
  Settings2,
  Table2,
  Workflow,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProjectImageProps {
  src: string;
  alt: string;
  className?: string;
}

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  AxiosIcon,
  NextjsIcon,
  ReactIcon,
  ReactRouterIcon,
  ShadcnIcon,
  TailwindIcon,
  TanstackQueryIcon,
  TipTapEditorIcon,
  TypescriptIcon,
  ViteIcon,
  ZodIcon,
} from "@/ui/shared/icons";
import { PORTFO_CONFIG } from "../constants/constants";
import { TechBadgeList } from "./flagship-project-card";

const technologies = [
  { name: "React", icon: ReactIcon },
  { name: "TypeScript", icon: TypescriptIcon },
  { name: "Tailwind CSS", icon: TailwindIcon },
  { name: "Axios", icon: AxiosIcon },
  { name: "Tanstack Query", icon: TanstackQueryIcon },
  { name: "Zustand", icon: Activity },
  { name: "React Router", icon: ReactRouterIcon },
  { name: "Zod", icon: ZodIcon },
  { name: "Shadcn/ui", icon: ShadcnIcon },
  { name: "TipTap Editor", icon: TipTapEditorIcon },
  { name: "Tanstack Table", icon: TanstackQueryIcon },
  { name: "Vite", icon: ViteIcon },
];

const architectureEvolution = [
  {
    number: "01",
    title: "DaisyUI",
    context: "The application was still small",
    description:
      "The product started with a handful of routes, so I chose DaisyUI on top of Tailwind CSS to build the initial interface quickly while keeping the implementation lightweight.",
  },
  {
    number: "02",
    title: "Headless UI",
    context: "Interaction requirements increased",
    description:
      "As the application became more interactive, I needed greater control over component behavior and presentation rather than relying heavily on pre-styled components.",
  },
  {
    number: "03",
    title: "shadcn/ui",
    context: "The product became a much larger system",
    description:
      "As the application grew into a 20–30 route product, I rebuilt the component layer around shadcn/ui to have a consistent, composable foundation while retaining full control over the styling.",
  },
];

const modules = [
  {
    title: "Inbound",
    description:
      "The original core workflow for discovering internal-linking opportunities and creating contextual links.",
    icon: Network,
  },
  {
    title: "Silo",
    description: "A structured linking workflow supporting one-to-many and many-to-one relationships between pages.",
    icon: GitBranch,
  },
  {
    title: "Bulk Linking",
    description:
      "Extended the linking model to many-to-many relationships for larger-scale internal-linking operations.",
    icon: Layers3,
  },
  {
    title: "Site Reports",
    description: "Reporting and analysis for understanding the state of a site's internal-linking structure.",
    icon: BarChart3,
  },
  {
    title: "Anchor Manager",
    description: "A data-intensive interface for inspecting, editing, updating, and removing anchor relationships.",
    icon: Table2,
  },
];

const lessons = [
  {
    number: "01",
    title: "Architecture should respond to product complexity.",
    description:
      "The right architecture at three routes was not necessarily the right architecture at thirty. I learned to recognize when an abstraction stopped helping and make the migration instead of accumulating workarounds.",
  },
  {
    number: "02",
    title: "Component behavior and visual implementation should stay flexible.",
    description:
      "Moving from pre-styled components toward composable primitives gave me more control as the product developed its own interaction patterns and visual language.",
  },
  {
    number: "03",
    title: "Libraries provide primitives; the application still needs architecture.",
    description:
      "TanStack Table, TanStack Query, React Hook Form, and the other tools solved difficult parts of the problem, but the application-specific behavior still had to be designed and engineered.",
  },
  {
    number: "04",
    title: "Being the sole frontend developer changes how you think.",
    description:
      "Every architectural decision affected future features. I had to think beyond individual screens and continuously consider maintainability, consistency, performance, and how the next requirement would fit into the existing system.",
  },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link href="/" className="group inline-flex items-center gap-2 text-sm font-medium">
          <ArrowLeft className="size-4 text-muted-foreground transition-transform group-hover:-translate-x-1" />
          Home
        </Link>
        <Link href="/projects" className="group inline-flex items-center gap-2 text-sm font-medium">
          Projects
        </Link>

        <div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
          <span>Linkboss</span>
          <span>/</span>
          <span>Architecture</span>
          <Button asChild>
            <Link target="_blank" href={PORTFO_CONFIG.PROJECTS.LINKER}>
              View Recreation
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </div>

        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground sm:hidden">LINKBOSS</span>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px bg-border/30 lg:block" />

      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div className="max-w-4xl">
          <div className="mb-6 flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" />
            Engineering Case Study
          </div>

          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            From a small React tool to a growing SaaS platform.
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
            Linkboss started as a focused internal-linking application with only a handful of routes. Over three years,
            it evolved into a 20–30 route product with increasingly complex workflows, data interfaces, forms,
            reporting, and content management.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            <Badge variant="outline">3 Years</Badge>
            <Badge variant="outline">Sole Frontend Developer</Badge>
            <Badge variant="outline">20–30 Routes</Badge>
            <Badge variant="outline">React SPA</Badge>
          </div>
        </div>

        <div className="mt-16 grid overflow-hidden rounded-xl border border-border sm:grid-cols-3">
          <Metric value="01" label="Frontend Owner" />
          <Metric value="20–30" label="Routes at Peak" />
          <Metric value="03" label="Major UI Iterations" />
        </div>
      </div>
    </section>
  );
}

export function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-b border-border px-5 py-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
      <div className="font-mono text-xl tracking-tight">{value}</div>

      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

export function TechnologyEvolution() {
  return (
    <section className="border-b border-border py-10">
      <div className="grid gap-6 lg:grid-cols-[180px_1fr]">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Technology</p>

          <p className="mt-2 text-sm text-muted-foreground">The stack evolved with the product.</p>
        </div>

        <TechBadgeList technologies={technologies} badgeClassName="bg-card" />
      </div>
    </section>
  );
}

export function StartingPoint() {
  return (
    <Section
      number="01"
      eyebrow="The Starting Point"
      title="The original idea was intentionally small."
      description="The first version was designed around a focused workflow rather than a large platform."
    >
      <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <IconBox icon={Workflow} />

            <CardTitle className="pt-3">The original workflow</CardTitle>

            <p className="text-sm text-muted-foreground">A focused internal-linking experience.</p>
          </CardHeader>

          <CardContent>
            <div className="space-y-2">
              {[
                "User logs into the application",
                "Connects a WordPress site using an API key",
                "Opens the Inbound tool",
                "Selects a link from the site's content",
                "Receives contextual internal-link suggestions",
                "Reviews and edits the generated result",
                "Goes deeper when more control is required",
              ].map((step, index) => (
                <div
                  key={step}
                  className="flex items-start gap-3 rounded-lg border border-border bg-background px-4 py-3"
                >
                  <span className="font-mono text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>

                  <span className="text-sm text-muted-foreground">{step}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/30">
          <CardHeader>
            <IconBox icon={Network} />

            <CardTitle className="pt-3">Inbound became the foundation.</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-sm leading-7 text-muted-foreground">
              The core interaction was deliberately simple: select a piece of content, understand its linking context,
              and create a useful internal connection without leaving the workflow.
            </p>

            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Users could edit the suggested result directly or move into a deeper workflow when more control was
              required.
            </p>

            <ProjectImage src="/portfolio/linker-dark.png" alt="Linkboss Inbound Tool" />
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}

export function ProductGrowth() {
  return (
    <Section
      number="02"
      eyebrow="Product Growth"
      title="The product kept asking for more."
      description="What began as a focused linking workflow gradually became a broader internal-linking platform."
    >
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((module, index) => {
          const Icon = module.icon;

          return (
            <div key={index}>
              <Card className="h-full transition-colors hover:bg-muted/40">
                <CardHeader>
                  <IconBox icon={Icon} />

                  <CardTitle className="pt-3">{module.title}</CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-sm leading-7 text-muted-foreground">{module.description}</p>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>

      <Card className="mt-8 bg-muted/30">
        <CardContent className="flex items-start gap-4 p-6 sm:p-8">
          <RefreshCw className="mt-0.5 size-5 shrink-0 text-muted-foreground" />

          <div>
            <h3 className="font-medium">The architecture had to evolve with the product.</h3>

            <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">
              New tools introduced new interaction models, larger datasets, more forms, more tables, more API states,
              and increasingly interconnected workflows. The frontend could no longer be treated as the small
              application it started as.
            </p>
          </div>
        </CardContent>
      </Card>
    </Section>
  );
}

export function ArchitectureEvolution() {
  return (
    <Section
      number="03"
      eyebrow="Architecture Evolution"
      title="I rebuilt the UI foundation as the product grew."
      description="The component architecture changed because the problem changed."
    >
      <div className="mt-12 space-y-3">
        {architectureEvolution.map((stage) => (
          <Card key={stage.title} className="grid gap-4 p-5 sm:grid-cols-[70px_180px_1fr] sm:p-6">
            <span className="font-mono text-xs text-muted-foreground">{stage.number}</span>

            <div>
              <h3 className="font-medium">{stage.title}</h3>

              <p className="mt-1 text-xs text-muted-foreground">{stage.context}</p>
            </div>

            <p className="m-0 text-sm leading-7 text-muted-foreground">{stage.description}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-10 bg-muted/30">
        <CardContent className="p-6 text-center sm:p-8">
          <Settings2 className="mx-auto size-6 text-muted-foreground" />

          <h3 className="mt-4 text-lg font-semibold">The lesson was bigger than the library choice.</h3>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
            I learned to treat UI architecture as an evolving engineering decision. The goal was not to commit
            permanently to one library, but to choose an abstraction that gave the growing product enough control
            without creating unnecessary complexity.
          </p>
        </CardContent>
      </Card>
    </Section>
  );
}

export function DataArchitecture() {
  return (
    <Section
      number="04"
      eyebrow="Data & State Architecture"
      title="The application became API-driven and data-heavy."
      description="As the number of workflows grew, predictable data fetching and clear state boundaries became increasingly important."
    >
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        <ArchitectureCard
          icon={Server}
          title="API communication"
          text="Axios became the foundation for communicating with the backend API, while TanStack Query handled asynchronous server state, caching, synchronization, and request lifecycle management."
        />

        <ArchitectureCard
          icon={Database}
          title="Client state"
          text="Zustand became the client-state layer for application state that did not belong in server-state management, including application-level UI state and active site context."
        />

        <ArchitectureCard
          icon={Zap}
          title="Lazy-loaded routes"
          text="Because the application remained a React SPA, route-level lazy loading prevented every page and its dependencies from being loaded up front."
        />

        <ArchitectureCard
          icon={RefreshCw}
          title="Incremental data loading"
          text="Large datasets required progressive fetching rather than loading entire collections at once, including scroll-driven loading in the Inbound sidebar and data tables."
        />
      </div>

      <Card className="mt-10 overflow-hidden">
        <div className="border-b border-border px-6 py-4">
          <span className="font-mono text-xs text-muted-foreground">FRONTEND DATA FLOW</span>
        </div>

        <div className="grid divide-y divide-border sm:grid-cols-4 sm:divide-x sm:divide-y-0">
          <FlowStep icon={LayoutGrid} title="React UI" />
          <FlowStep icon={Database} title="Zustand" />
          <FlowStep icon={RefreshCw} title="TanStack Query" />
          <FlowStep icon={Server} title="API" />
        </div>
      </Card>
    </Section>
  );
}

export function MultiSiteState() {
  return (
    <Section
      number="05"
      eyebrow="Multi-Site State"
      title="One application, multiple independent site contexts."
      description="Users could connect multiple WordPress sites, making site selection a core part of the application's state model."
    >
      <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader>
            <IconBox icon={Network} />

            <CardTitle className="pt-3">The selected site became part of the context.</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-sm leading-7 text-muted-foreground">
              A user could connect multiple WordPress sites and switch between them from the application. Each site had
              its own pages, links, reports, anchors, and tool context.
            </p>

            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Switching sites therefore had to update the active context without leaking data or UI state from another
              connected site.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-muted/30">
          <CardContent className="p-6 sm:p-8">
            <div className="space-y-2">
              {[
                "Selected WordPress site",
                "Site-specific content",
                "Tool context",
                "Fetched server data",
                "Filters and table state",
                "Pending operations",
              ].map((item, index) => (
                <div key={item} className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3">
                  <span className="font-mono text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>

                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>

            <Separator className="my-6" />

            <p className="text-xs leading-6 text-muted-foreground">
              <span className="font-medium text-foreground">Engineering concern:</span> preserve the correct site
              context while keeping shared application behavior reusable across every connected site.
            </p>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}

export function ComplexInterfaces() {
  return (
    <Section
      number="06"
      eyebrow="Complex Interfaces"
      title="Some interfaces required behavior the library did not provide."
      description="Anchor Manager became one of the most technically demanding areas of the application."
    >
      <Card className="mt-12 overflow-hidden">
        <div className="grid lg:grid-cols-2">
          <div className="p-6 sm:p-8 lg:p-10">
            <IconBox icon={Table2} />

            <h3 className="mt-6 text-2xl font-semibold">A table was no longer just a table.</h3>

            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Anchor Manager required a highly interactive data interface where individual cells could independently
              expand and collapse while the table continued to support filtering, sorting, pagination, visibility, and
              large datasets.
            </p>

            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              TanStack Table provided the unstyled primitives and table mechanics I needed, but the exact interaction
              model was not something I could simply take from its documentation.
            </p>

            <Card className="mt-6 bg-muted/30">
              <CardContent className="p-4">
                <p className="text-xs leading-6 text-muted-foreground">
                  <span className="font-medium text-foreground">Engineering decision:</span> use the library for table
                  mechanics while owning the application-specific interaction model.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="border-t border-border bg-muted/20 p-6 lg:border-l lg:border-t-0 sm:p-8">
            <ProjectImage src="/portfolio/linker-anchor-manager-dark.png" alt="Linkboss anchor manager Tool" />
          </div>
        </div>
      </Card>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <CapabilityCard title="Independent cell state" />
        <CapabilityCard title="Fetch-on-scroll data" />
        <CapabilityCard title="Custom table behavior" />
      </div>
    </Section>
  );
}

export function FormsAndContent() {
  return (
    <Section
      number="07"
      eyebrow="Forms & Content"
      title="Forms became part of almost every workflow."
      description="As the application expanded, form complexity grew with it."
    >
      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        <ArchitectureCard
          icon={FileText}
          title="React Hook Form"
          text="Used as the common form layer across the application to keep complex forms performant and manageable."
        />

        <ArchitectureCard
          icon={Check}
          title="Zod"
          text="Validation was centered around schemas so inputs could be validated consistently before API operations."
        />

        <ArchitectureCard
          icon={FileText}
          title="Tiptap"
          text="A flexible, unstyled editor provided the foundation for rich content editing while leaving presentation under application control."
        />
      </div>

      <Card className="mt-8 bg-muted/30">
        <CardContent className="p-6 sm:p-8">
          <h3 className="font-medium">One interaction pattern appeared repeatedly.</h3>

          <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">
            In Inbound, Silo, and Bulk workflows, users could select an item directly from a sidebar. That selection
            needed to populate the form, update the relevant state, automatically trigger the appropriate request, and
            return the result without unnecessary intermediate actions.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <FlowTag label="Select" />
            <ArrowRight className="size-3 text-muted-foreground" />
            <FlowTag label="Populate" />
            <ArrowRight className="size-3 text-muted-foreground" />
            <FlowTag label="Trigger" />
            <ArrowRight className="size-3 text-muted-foreground" />
            <FlowTag label="Request" />
            <ArrowRight className="size-3 text-muted-foreground" />
            <FlowTag label="Result" />
          </div>
        </CardContent>
      </Card>
    </Section>
  );
}

export function Visualization() {
  return (
    <Section
      number="08"
      eyebrow="Data Visualization"
      title="Reporting introduced another layer of frontend complexity."
      description="The reporting experience evolved alongside the rest of the application."
    >
      <Card className="mt-12">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="outline">Chart.js</Badge>

            <ArrowRight className="size-4 text-muted-foreground" />

            <Badge variant="outline">Recharts</Badge>
          </div>

          <h3 className="mt-6 text-xl font-semibold">Visualization evolved with the component architecture.</h3>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
            I initially used Chart.js for reporting and visualization. As the application's UI architecture matured and
            shadcn/ui became part of the system, I moved toward Recharts to better align the visualization layer with
            the composable approach used throughout the newer interface.
          </p>
        </CardContent>
      </Card>
    </Section>
  );
}

export function EngineeringLessons() {
  return (
    <Section
      number="09"
      eyebrow="Engineering Lessons"
      title="Three years of frontend ownership changed how I build."
      description="The most valuable outcome was not a particular library. It was learning how to evolve an application without losing control of its complexity."
    >
      <div className="mt-12 space-y-3">
        {lessons.map((lesson) => (
          <Card key={lesson.number} className="grid gap-5 p-6 sm:grid-cols-[60px_280px_1fr] sm:p-7">
            <span className="font-mono text-xs text-muted-foreground">{lesson.number}</span>

            <h3 className="font-medium leading-6">{lesson.title}</h3>

            <p className="m-0 text-sm leading-7 text-muted-foreground">{lesson.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

export function CurrentRecreation() {
  return (
    <section className="py-20 sm:py-28">
      <Card className="overflow-hidden">
        <CardContent className="p-6 sm:p-10 lg:p-12">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" />
            Current Portfolio Recreation
          </div>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                The original product, reimagined with Next.js.
              </h2>

              <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                The application showcased in this portfolio is a streamlined, fully client-side Next.js recreation
                inspired by the original commercial product. It focuses on demonstrating the workflows, interface
                patterns, and frontend engineering decisions behind the application.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <Badge variant="outline">
                  <NextjsIcon /> Next.js
                </Badge>
                <Badge variant="outline">
                  <TypescriptIcon /> TypeScript
                </Badge>
                <Badge variant="outline">
                  <TailwindIcon /> Tailwind CSS
                </Badge>
                <Badge variant="outline">
                  <Layers />
                  Client-side SPA
                </Badge>
              </div>
            </div>

            <Button asChild>
              <Link target="_blank" href={PORTFO_CONFIG.PROJECTS.LINKER}>
                View Recreation
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center py-12">
        <Button asChild variant="ghost">
          <Link href="/projects">
            <ArrowLeft className="size-4" />
            Back to projects
          </Link>
        </Button>
      </div>
    </section>
  );
}

export function Section({
  number,
  eyebrow,
  title,
  description,
  children,
}: {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-border py-20 sm:py-28">
      <div className="grid gap-5 lg:grid-cols-[120px_1fr]">
        <div className="flex items-start gap-3">
          <span className="font-mono text-xs text-muted-foreground">{number}</span>

          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{eyebrow}</span>
        </div>

        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>

          <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">{description}</p>
        </div>
      </div>

      {children}
    </section>
  );
}

export function ArchitectureCard({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  text: string;
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <IconBox icon={Icon} />

        <CardTitle className="pt-3">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm leading-7 text-muted-foreground">{text}</p>
      </CardContent>
    </Card>
  );
}

export function IconBox({ icon: Icon }: { icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-background">
      <Icon className="size-5 text-muted-foreground" />
    </div>
  );
}

export function FlowStep({ icon: Icon, title }: { icon: React.ComponentType<{ className?: string }>; title: string }) {
  return (
    <div className="flex items-center gap-3 p-5">
      <Icon className="size-4 text-muted-foreground" />

      <span className="text-sm">{title}</span>
    </div>
  );
}

export function CapabilityCard({ title }: { title: string }) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-4">
        <Check className="size-4 text-muted-foreground" />

        <span className="text-sm text-muted-foreground">{title}</span>
      </CardContent>
    </Card>
  );
}

export function FlowTag({ label }: { label: string }) {
  return (
    <Badge variant="outline" className="bg-card">
      {label}
    </Badge>
  );
}

export function ProjectImage({ src, alt, className }: ProjectImageProps) {
  return (
    <div
      className={cn(
        "mt-6 relative aspect-auto w-full overflow-hidden rounded-xl border border-border/60 bg-muted/40 shadow-sm transition-all hover:border-primary/50",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        height={500}
        width={500}
        className="object-cover object-top transition-transform duration-300 hover:scale-[1.02]"
        // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}
