// biome-ignore-all lint/a11y/useKeyWithClickEvents: button rules
// biome-ignore-all lint/a11y/noStaticElementInteractions: button rules
"use client";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Key,
  Mail,
  Search,
  SlidersHorizontal,
  Target,
} from "lucide-react";
import type React from "react";
import { type SVGProps, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ProjectItem {
  icon: React.ReactNode;
  name: string;
  desc: string;
  tech: string;
}

interface SkillItem {
  name: string;
  note: string;
}

// Exhaustive status definition for child row nodes
type LinkStatus = "Active" | "Stale" | "Delete";

interface ChildRow {
  title: string;
  path: string;
  anchor: string;
  status: LinkStatus;
}

interface ParentRow {
  parentUrl: string;
  linksCount: string;
  badgeType: string;
  healthScore: number;
  stateLabel: string;
  children: ChildRow[];
}

const STACK: string[] = [
  "React",
  "TypeScript",
  "shadcn/ui",
  "Zustand",
  "TanStack Query",
  "TanStack Table",
  "Tailwind CSS",
];

const PROJECTS: ProjectItem[] = [
  {
    icon: <BarChart3 className="size-5 text-[#00d4a8]" />,
    name: "DataBoard",
    desc: "Real-time analytics dashboard with virtual-scrolled tables, custom chart components, and multi-format CSV/JSON export.",
    tech: "React · TanStack Table · Recharts",
  },
  {
    icon: <Target className="size-5 text-[#00d4a8]" />,
    name: "Taskr",
    desc: "Kanban-style project tool with optimistic drag-and-drop, label filtering, and real-time multi-user state sync.",
    tech: "Next.js · Zustand · dnd-kit",
  },
  {
    icon: <Key className="size-5 text-[#00d4a8]" />,
    name: "AuthKit UI",
    desc: "Headless auth component library — 12 composable components, full a11y, dark/light theme tokens, and TypeScript generics.",
    tech: "React · TypeScript · Radix UI",
  },
];

const SKILLS: SkillItem[] = [
  { name: "React & Next.js", note: "App Router, SSR, RSC" },
  { name: "TypeScript", note: "strict mode, generics" },
  { name: "State Management", note: "Zustand, TanStack Query" },
  { name: "UI Systems", note: "shadcn/ui, Tailwind, Radix" },
  { name: "Data Tables", note: "TanStack Table, virtualizer" },
  { name: "Animations", note: "Framer Motion, CSS" },
];
const LINKBOSS_APP = {
  liveApp: {
    title: "Live App",
    url: "https://app.linkboss.io",
  },
  demo: {
    title: "Architecture Demo",
    url: "/linker",
  },
};

export default function PortfolioPage() {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("opacity-100", "translate-y-0");
          }
        }
      },
      { threshold: 0.12 }
    );

    const elements = document.querySelectorAll(".rv");
    for (const el of elements) {
      io.observe(el);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const scrollTo = (id: string): void => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#080809] text-[#f0f0f2] font-sans antialiased selection:bg-[#00d4a8]/30 selection:text-white">
      <nav
        className={cn(
          "fixed top-0 inset-x-0 z-50 h-15 flex items-center border-b border-white/5 transition-all duration-700",
          scrolled ? "bg-[#080809]/92 backdrop-blur-xl" : "bg-[#080809]/75 backdrop-blur-xl"
        )}
      >
        <div className="max-w-5xl mx-auto w-full px-8 flex items-center justify-between">
          <button
            type="button"
            className="font-display font-extrabold text-[1.05rem] tracking-tight cursor-pointer bg-transparent border-none p-0 text-left text-inherit"
            onClick={() => scrollTo("hero")}
          >
            dev<span className="text-[#00d4a8]">.</span>
          </button>
          <div className="flex items-center gap-9">
            <button
              type="button"
              className="text-sm text-[#888892] hover:text-[#f0f0f2] transition-all duration-700 cursor-pointer bg-transparent border-none p-0"
              onClick={() => scrollTo("work")}
            >
              Work
            </button>
            <button
              type="button"
              className="text-sm text-[#888892] hover:text-[#f0f0f2] transition-all duration-700 cursor-pointer bg-transparent border-none p-0"
              onClick={() => scrollTo("projects")}
            >
              Projects
            </button>
            <button
              type="button"
              className="text-sm text-[#888892] hover:text-[#f0f0f2] transition-all duration-700 cursor-pointer bg-transparent border-none p-0"
              onClick={() => scrollTo("about")}
            >
              About
            </button>
            <Button
              size="sm"
              className="bg-[#00d4a8] text-[#05100e] hover:bg-[#00d4a8]/85 font-semibold text-sm rounded-[7px] cursor-pointer shadow-none"
              onClick={() => scrollTo("contact")}
            >
              Contact
            </Button>
          </div>
        </div>
      </nav>

      <section id="hero" className="min-h-screen flex flex-col justify-center pt-15 relative overflow-hidden">
        <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-170 h-110 pointer-events-none bg-[radial-gradient(ellipse,rgba(0,212,168,0.07)_0%,transparent_68%)]" />
        <div className="max-w-5xl mx-auto w-full px-8 relative z-10">
          <Badge className="inline-flex items-center gap-2 font-mono text-[0.72rem] text-[#00d4a8] bg-[#00d4a8]/5 border-[#00d4a8]/20 hover:bg-[#00d4a8]/10 px-3 py-1 rounded-full mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <span className="size-1.5 rounded-full bg-[#00d4a8] animate-pulse" />
            Available for work
          </Badge>
          <h1 className="font-display text-5xl md:text-7xl lg:text-[5.8rem] font-extrabold leading-[1.03] tracking-tighter mb-6 animate-in fade-in slide-in-from-bottom-4 delay-75 duration-500">
            I build <br />
            <span className="text-[#44444e]">production-grade</span>
            <br /> <span className="text-[#00d4a8]">web apps.</span>
          </h1>
          <p className="text-[1.08rem] text-[#888892] max-w-125 leading-relaxed mb-10 animate-in fade-in slide-in-from-bottom-4 delay-150 duration-500">
            I build high-performance products from scratch. Over the past 3 years, I single-handedly managed the full
            frontend lifecycle, API integrations, and performance of a live commercial SaaS platform.
          </p>
          <div className="flex gap-3.5 flex-wrap mb-16 animate-in fade-in slide-in-from-bottom-4 delay-200 duration-500">
            <Button
              className="bg-[#00d4a8] text-[#05100e] hover:bg-[#00d4a8] hover:scale-[1.01] hover:shadow-[0_10px_28px_rgba(0,212,168,0.25)] transition-all font-semibold px-5 py-6 rounded-lg text-sm cursor-pointer shadow-none"
              onClick={() => scrollTo("work")}
            >
              View Projects <ArrowRight className="size-4 ml-1.5" />
            </Button>
          </div>
          <div className="flex gap-14 border-t border-white/5 pt-8 animate-in fade-in slide-in-from-bottom-4 delay-300 duration-500">
            <div>
              <div className="font-display text-3xl font-extrabold tracking-tight text-[#f0f0f2]">3</div>
              <div className="text-[0.78rem] text-[#44444e] mt-1 font-mono">Years building products</div>
            </div>
            <div>
              <div className="font-display text-3xl font-extrabold tracking-tight text-[#f0f0f2]">1</div>
              <div className="text-[0.78rem] text-[#44444e] mt-1 font-mono">Production SaaS shipped</div>
            </div>
            <div>
              <div className="font-display text-3xl font-extrabold tracking-tight text-[#f0f0f2]">Solo</div>
              <div className="text-[0.78rem] text-[#44444e] mt-1 font-mono">Frontend architect</div>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="py-26">
        <div className="max-w-5xl mx-auto px-8">
          <div className="rv opacity-0 translate-y-6 transition-all duration-700 ease-out">
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-[#f0f0f2] mb-3.5">
              Commercial Work
            </h2>
            <p className="text-[0.95rem] text-[#888892] max-w-120 leading-relaxed">
              A production SaaS application I single-handedly architected and built during my 3 years at Zventures.
            </p>
          </div>
          <Card className="rv mt-12 bg-white/3 border-white/5 rounded-[18px] p-11 grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-14 items-center relative overflow-hidden group hover:border-[#00d4a8]/20 opacity-0 translate-y-6 transition-all duration-700 ease-out delay-75 shadow-none">
            <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-[#00d4a8]/50 to-transparent" />
            <div>
              <div className="inline-block font-mono text-[0.69rem] text-[#00d4a8] bg-[#00d4a8]/5 border border-[#00d4a8]/20 px-2.5 py-1 rounded mb-4">
                Full Frontend Lifecycle · Solo Execution
              </div>
              <h3 className="font-display text-5xl font-extrabold tracking-tighter text-[#f0f0f2] mb-1.5">LinkBoss</h3>
              <div className="font-mono text-[0.8rem] text-[#00d4a8] mb-5">
                <a href="https://linkboss.io" target="_blank" rel="noreferrer" className="hover:underline">
                  linkboss.io
                </a>
              </div>
              <p className="text-[0.92rem] text-[#888892] leading-relaxed mb-6">
                An AI-powered SEO internal linking SaaS built for massive site audits and link automation. As the sole
                frontend developer, I spent 3 years architecting and maintaining the entire application interface. I
                engineered high-performance asynchronous data views, multi-site dashboards, and bulk execution modules
                capable of handling thousands of link variations without UI bottlenecks.
              </p>
              <div className="flex gap-2 flex-wrap mb-7">
                {STACK.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[0.7rem] text-[#888892] bg-white/4 border border-white/5 px-2 py-1 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 flex-wrap">
                <Button
                  size="sm"
                  variant="outline"
                  asChild
                  className="text-[#00d4a8] bg-[#00d4a8]/5 border-[#00d4a8]/25 hover:bg-[#00d4a8]/15 px-4 rounded-[7px] shadow-none cursor-pointer"
                >
                  <a href={LINKBOSS_APP.liveApp.url} target="_blank" rel="noreferrer">
                    {LINKBOSS_APP.liveApp.title} <ArrowUpRight className="size-3.5 ml-1" />
                  </a>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  asChild
                  className="text-[#f0f0f2] bg-white/2 border-white/5 hover:border-white/15 hover:bg-white/6 px-4 rounded-[7px] shadow-none cursor-pointer"
                >
                  <a href={LINKBOSS_APP.demo.url} target="_blank" rel="noreferrer">
                    {LINKBOSS_APP.demo.title} <ExternalLink className="size-3.5 ml-1.5" />
                  </a>
                </Button>
              </div>
            </div>
            <FeaturedNetworkMatrix />
          </Card>
        </div>
      </section>

      <section id="projects" className="py-4">
        <div className="max-w-5xl mx-auto px-8">
          <div className="rv opacity-0 translate-y-6 transition-all duration-700 ease-out">
            <h2 className="font-display text-3xl font-bold tracking-tight text-[#f0f0f2]">Other Projects</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
            {PROJECTS.map((p) => (
              <Card
                key={p.name}
                className="bg-white/3 border-white/5 rounded-[14px] p-7 cursor-pointer group hover:border-white/20 hover:bg-white/6 hover:-translate-y-1 flex flex-col rv opacity-0 translate-y-6 transition-all duration-700 ease-out shadow-none"
              >
                <div className="size-10.5 rounded-lg text-lg bg-[#00d4a8]/5 border border-[#00d4a8]/20 flex items-center justify-center mb-4">
                  {p.icon}
                </div>
                <h3 className="font-display text-lg font-bold tracking-tight text-[#f0f0f2] mb-1.5">{p.name}</h3>
                <p className="text-[0.84rem] text-[#888892] leading-relaxed flex-1 mb-4">{p.desc}</p>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-mono text-[0.68rem] text-[#44444e]">{p.tech}</span>
                  <ArrowUpRight className="size-4 text-[#44444e] transition-transform duration-200 group-hover:text-[#00d4a8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-26">
        <div className="max-w-5xl mx-auto px-8">
          <div className="rv opacity-0 translate-y-6 transition-all duration-700 ease-out">
            <h2 className="font-display text-3xl font-bold tracking-tight text-[#f0f0f2]">Who I Am</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-18 mt-12 items-start">
            <div className="rv opacity-0 translate-y-6 transition-all duration-700 ease-out delay-75 space-y-5">
              <p className="text-[0.93rem] text-[#888892] leading-relaxed">
                I'm a frontend engineer who cares deeply about what gets shipped. I've built production SaaS
                applications from zero to launch — not just feature work, but full architecture decisions, design system
                creation, and performance optimization.
              </p>
              <p className="text-[0.93rem] text-[#888892] leading-relaxed">
                Working solo on LinkBoss taught me how to think at a system level: how to structure state for complex
                data flows, how to keep large tables fast, and how to build UI that handles real-world edge cases, not
                just the happy path.
              </p>
              <p className="text-[0.93rem] text-[#888892] leading-relaxed">
                I default to React and TypeScript, reach for the right abstraction for each problem, and care about
                performance, accessibility, and developer experience in equal measure.
              </p>
            </div>
            <div className="flex flex-col gap-2.5 rv opacity-0 translate-y-6 transition-all duration-700 ease-out delay-150">
              {SKILLS.map((s) => (
                <div
                  key={s.name}
                  className="flex justify-between items-center px-4 py-3 bg-white/3 border border-white/5 rounded-lg text-sm hover:border-white/15 transition-all duration-700 group"
                >
                  <div className="flex items-center gap-2.5 text-[#888892] group-hover:text-[#f0f0f2] transition-all duration-700">
                    <span className="size-1.5 rounded-full bg-[#00d4a8]" />
                    <span>{s.name}</span>
                  </div>
                  <span className="font-mono text-[0.69rem] text-[#44444e]">{s.note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-26">
        <div className="max-w-5xl mx-auto px-8">
          <div className="relative overflow-hidden bg-white/3 border border-white/5 rounded-[22px] py-18 px-8 text-center rv opacity-0 translate-y-6 transition-all duration-700 ease-out">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-85 h-px bg-linear-to-r from-transparent via-[#00d4a8] to-transparent opacity-70" />
            <div className="absolute -top-15 left-1/2 -translate-x-1/2 w-100 h-50 bg-[radial-gradient(ellipse,rgba(0,212,168,0.07),transparent_70%)] pointer-events-none" />
            <div className="relative z-10">
              <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tighter text-[#f0f0f2] mb-4">
                Let's build something.
              </h2>
              <p className="text-[#888892] max-w-95 mx-auto text-[0.95rem] leading-relaxed mb-9">
                Open to frontend roles, contract projects, and interesting product challenges.
              </p>
              <div className="flex gap-3.5 justify-center flex-wrap">
                <Button
                  className="bg-[#00d4a8] text-[#05100e] hover:bg-[#00d4a8]/85 font-semibold px-5 rounded-lg cursor-pointer shadow-none"
                  asChild
                >
                  <a href="mailto:hello@example.com">
                    <Mail className="size-4 mr-2" />
                    jhr.haq@gmail.com <ArrowRight className="size-3.5 ml-1.5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-7">
        <div className="max-w-5xl mx-auto px-8 flex justify-between items-center">
          <div className="font-mono text-[0.72rem] text-[#44444e]">© 2026 — Built with Next.js & Tailwind CSS</div>
          <div className="flex gap-6">
            <button
              type="button"
              className="text-[0.78rem] text-[#44444e] hover:text-[#888892] transition-all duration-700 cursor-pointer bg-transparent border-none p-0"
              onClick={() => scrollTo("work")}
            >
              Work
            </button>
            <button
              type="button"
              className="text-[0.78rem] text-[#44444e] hover:text-[#888892] transition-all duration-700 cursor-pointer bg-transparent border-none p-0"
              onClick={() => scrollTo("projects")}
            >
              Projects
            </button>
            <button
              type="button"
              className="text-[0.78rem] text-[#44444e] hover:text-[#888892] transition-all duration-700 cursor-pointer bg-transparent border-none p-0"
              onClick={() => scrollTo("contact")}
            >
              Contact
            </button>
          </div>
          <div className="flex gap-8 items-center">
            <LinkedInIcon />
            <GitHubIcon />
          </div>
        </div>
      </footer>
    </div>
  );
}

interface LinkedInIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  altTitle?: string;
}

const LinkedInIcon = ({ size = 16, altTitle = "LinkedIn Profile", className = "", ...props }: LinkedInIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role="img"
      aria-label={altTitle}
      className={cn("fill-current text-muted-foreground hover:text-foreground transition-all duration-700", className)}
      {...props}
    >
      <title>{altTitle}</title>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
};

interface GitHubIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  altTitle?: string;
}

const GitHubIcon = ({ size = 16, altTitle = "GitHub Profile", className = "", ...props }: GitHubIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role="img"
      aria-label={altTitle}
      className={cn("fill-current text-muted-foreground hover:text-foreground transition-all duration-700", className)}
      {...props}
    >
      <title>{altTitle}</title>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
};

export function FeaturedNetworkMatrix() {
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({ 0: true });

  interface KpiItem {
    title: string;
    count: string;
    border: string;
    bg: string;
  }

  const kpis: KpiItem[] = [
    { title: "TOTAL NODES", count: "6", border: "border-t-blue-500", bg: "bg-blue-500/5" },
    { title: "FULLY LINKED", count: "6", border: "border-t-emerald-500", bg: "bg-emerald-500/5" },
    { title: "IN PROGRESS", count: "0", border: "border-t-amber-500", bg: "bg-amber-500/5" },
    { title: "NOT STARTED", count: "0", border: "border-t-rose-500", bg: "bg-rose-500/5" },
  ];

  const structuralData: ParentRow[] = [
    {
      parentUrl: "/about/company-overview",
      linksCount: "3 Links",
      badgeType: "3A",
      healthScore: 65,
      stateLabel: "Review Needed",
      children: [
        {
          title: "Enterprise Security",
          path: "/products/enterprise-security",
          anchor: "our security products",
          status: "Active",
        },
        {
          title: "Financial Services",
          path: "/solutions/financial-services",
          anchor: "financial solutions overview",
          status: "Stale",
        },
        {
          title: "API Reference",
          path: "/docs/api-reference-v3",
          anchor: "developer resources",
          status: "Delete",
        },
      ],
    },
  ];

  const toggleRow = (index: number): void => {
    setExpandedRows((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const getStatusStyles = (status: LinkStatus): string => {
    switch (status) {
      case "Active":
        return "bg-emerald-500/5 border-emerald-500/10 text-emerald-400";
      case "Stale":
        return "bg-amber-500/5 border-amber-500/10 text-amber-400";
      case "Delete":
        return "bg-rose-500/5 border-rose-500/10 text-rose-400";
      default:
        return "bg-white/5 border-white/10 text-[#888892]";
    }
  };

  const getProgressBarColor = (score: number): string => {
    if (score === 100) return "bg-emerald-500";
    if (score >= 50) return "bg-amber-500";
    return "bg-rose-500";
  };

  return (
    <div className="w-full bg-[#090a0d] border border-white/5 rounded-xl overflow-hidden shadow-2xl font-sans text-[0.76rem] text-[#888892] select-none animate-in fade-in duration-500">
      <div className="flex items-center justify-between px-5 py-3 bg-white/1 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="size-2 rounded-full bg-white/5" />
            <span className="size-2 rounded-full bg-white/5" />
          </div>
          <span className="font-mono text-[0.66rem] text-[#44444e] ml-2">Linker / Dashboard / Custom Network</span>
        </div>
      </div>

      <div className="p-6 space-y-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {kpis.map((kpi, idx) => (
            <div
              key={idx}
              className={cn("p-2 bg-white/1 border border-white/5 border-t-2 rounded-md", kpi.border, kpi.bg)}
            >
              <div className="text-[0.5rem] text-[#44444e] tracking-wider font-bold">{kpi.title}</div>
              <div className="font-extrabold text-[#f0f0f2] tracking-tight text-xs mt-1">{kpi.count}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 items-center justify-between bg-white/0.5 border border-white/5 px-2 py-1 rounded">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2 size-2 text-[#44444e]" />
            <input
              disabled
              placeholder="Filter pages..."
              className="w-full h-4 bg-[#0d0e12] border border-white/5 rounded pl-8 pr-3 py-1 text-[0.7rem] text-[#44444e] focus:outline-hidden"
            />
          </div>
          <div className="flex gap-1.5 w-full sm:w-auto justify-end font-mono text-[0.64rem]">
            <Button className="flex h-4 items-center gap-1 bg-white/2 border border-white/5 px-2 py-1 rounded text-[#44444e] text-[.5rem]">
              <SlidersHorizontal className="size-1.5" />
              State
            </Button>
            <Button className="bg-white/2 h-4 border border-white/5 px-2 py-1 rounded text-[#44444e] text-[.5rem]">
              Collapse All
            </Button>
          </div>
        </div>

        <div className="border border-white/5 rounded-lg overflow-hidden bg-[#0d0e12]/40">
          <div
            className={cn(
              "grid grid-cols-[40px_1fr_120px_110px] items-center px-4 py-2.5 bg-white/1 border-b border-white/5 text-[0.65rem] font-bold uppercase tracking-wider text-[#44444e]"
            )}
          >
            <div />
            <div>Page URL</div>
            <div>Link Composition</div>
            <div className="text-right">State</div>
          </div>
          <div className="divide-y divide-white/3">
            {structuralData.map((row, idx) => {
              const isExpanded = !!expandedRows[idx];
              return (
                <div
                  key={idx}
                  className="bg-white/0.2 cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-[#00d4a8]"
                  onClick={() => toggleRow(idx)}
                >
                  <div className="grid grid-cols-[40px_1fr_120px_110px] items-center px-4 py-3.5 hover:bg-white/1 transition-all duration-700">
                    {isExpanded ? <ChevronUp className="size-3 text-[#00d4a8]" /> : <ChevronDown className="size-3" />}
                    <div className="flex items-center gap-1 text-blue-400 font-mono text-[0.72rem] truncate pr-4">
                      {row.parentUrl}
                      <ArrowUpRight className="size-3 text-[#44444e] shrink-0" />
                    </div>
                    <div className="pr-4">
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className={cn("h-full rounded-full", getProgressBarColor(row.healthScore))}
                          style={{ width: `${row.healthScore}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[0.58rem] text-[#44444e] mt-1 font-mono">
                        <span>{row.linksCount}</span>
                        <span className={cn(row.healthScore === 100 ? "text-[#00d4a8]" : "text-amber-400")}>
                          {row.badgeType}
                        </span>
                      </div>
                    </div>
                    <div
                      className={cn(
                        "flex items-center gap-1.5 justify-end font-medium text-[0.72rem]",
                        row.healthScore === 100 ? "text-[#00d4a8]" : "text-amber-400"
                      )}
                    >
                      <span
                        className={cn("size-1 rounded-full", row.healthScore === 100 ? "bg-[#00d4a8]" : "bg-amber-400")}
                      />
                      {row.stateLabel}
                    </div>
                  </div>
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 bg-black/10 border-t border-white/2 animate-in fade-in slide-in-from-top-1 duration-200">
                      <div className="bg-[#111319] border border-white/5 rounded-t-md px-3.5 py-2 text-[0.64rem] font-mono tracking-wider font-semibold text-blue-400/90 uppercase flex items-center gap-1.5">
                        <BarChart3 className="size-3 text-[#00d4a8]" />
                        Target links for {row.parentUrl}
                      </div>
                      <div className="border-x border-b border-white/5 bg-[#08090d]/60 rounded-b-md overflow-hidden">
                        <div className="grid grid-cols-[1.2fr_1fr_100px] px-4 py-2 text-[0.62rem] uppercase tracking-wider text-[#44444e] font-bold border-b border-white/5 bg-white/0.5">
                          <div>Page Title & Path</div>
                          <div>Anchor Text</div>
                          <div className="text-right">Status</div>
                        </div>
                        <div className="divide-y divide-white/0.2">
                          {row.children.map((child, cIdx) => (
                            <div
                              key={cIdx}
                              className={cn(
                                "grid grid-cols-[1.2fr_1fr_100px] px-4 py-3 items-center hover:bg-white/0.5 transition-all duration-700"
                              )}
                            >
                              <div className="truncate pr-3">
                                <div className="text-[#f0f0f2] font-medium tracking-tight text-[0.72rem] mb-0.5">
                                  {child.title}
                                </div>
                                <div className="text-blue-400/70 font-mono text-[0.66rem] truncate">{child.path}</div>
                              </div>
                              <div className="text-[#888892] italic font-serif text-[0.74rem] truncate pr-2">
                                "{child.anchor}"
                              </div>
                              <div className="text-right">
                                <span
                                  className={cn(
                                    "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[0.62rem] font-medium border",
                                    getStatusStyles(child.status)
                                  )}
                                >
                                  {child.status}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="px-5 py-2.5 bg-white/0.2 border-t border-white/5 flex justify-between items-center text-[0.64rem] font-mono text-[#44444e]">
        <div>Rows mapped: 6 pages indexed</div>
        <div>DOM View: Virtual Grid Context Layer</div>
      </div>
    </div>
  );
}
