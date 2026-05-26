"use client";

import { Activity, ArrowRight, ArrowUpRight, BarChart3, Key, Layers, LogIn, Mail, Sliders, Target } from "lucide-react";
import { AnimatePresence, MotionConfig, motion, type Variants } from "motion/react";
import type React from "react";
import { type SVGProps, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface MockRow {
  url: string;
  status: string;
  cls: string;
  links: string;
  score: string;
}

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

const STACK: string[] = [
  "React",
  "TypeScript",
  "shadcn/ui",
  "Zustand",
  "TanStack Query",
  "TanStack Table",
  "Tailwind CSS",
];

const MOCK_ROWS: MockRow[] = [
  {
    url: "/blog/seo-guide",
    status: "Active",
    cls: "text-emerald-400 bg-emerald-500/5 border-emerald-500/20",
    links: "14",
    score: "94",
  },
  {
    url: "/features/analytics",
    status: "Active",
    cls: "text-emerald-400 bg-emerald-500/5 border-emerald-500/20",
    links: "9",
    score: "88",
  },
  {
    url: "/pricing",
    status: "Review",
    cls: "text-amber-400 bg-amber-500/5 border-amber-500/25",
    links: "3",
    score: "62",
  },
  {
    url: "/about",
    status: "Active",
    cls: "text-emerald-400 bg-emerald-500/5 border-emerald-500/20",
    links: "6",
    score: "79",
  },
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
        className={`fixed top-0 inset-x-0 z-50 h-15 flex items-center border-b border-white/5 transition-colors duration-300 ${scrolled ? "bg-[#080809]/92 backdrop-blur-xl" : "bg-[#080809]/75 backdrop-blur-xl"}`}
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
              className="text-sm text-[#888892] hover:text-[#f0f0f2] transition-colors cursor-pointer bg-transparent border-none p-0"
              onClick={() => scrollTo("work")}
            >
              Work
            </button>
            <button
              type="button"
              className="text-sm text-[#888892] hover:text-[#f0f0f2] transition-colors cursor-pointer bg-transparent border-none p-0"
              onClick={() => scrollTo("projects")}
            >
              Projects
            </button>
            <button
              type="button"
              className="text-sm text-[#888892] hover:text-[#f0f0f2] transition-colors cursor-pointer bg-transparent border-none p-0"
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
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_40%,transparent_100%)]" />
        <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[680px] h-[440px] pointer-events-none bg-[radial-gradient(ellipse,rgba(0,212,168,0.07)_0%,transparent_68%)]" />

        <div className="max-w-5xl mx-auto w-full px-8 relative z-10">
          <Badge className="inline-flex items-center gap-2 font-mono text-[0.72rem] text-[#00d4a8] bg-[#00d4a8]/5 border-[#00d4a8]/20 hover:bg-[#00d4a8]/10 px-3 py-1 rounded-full mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <span className="size-1.5 rounded-full bg-[#00d4a8] animate-pulse" />
            Available for work
          </Badge>

          <h1 className="font-display text-5xl md:text-7xl lg:text-[5.8rem] font-extrabold leading-[1.03] tracking-tighter mb-6 animate-in fade-in slide-in-from-bottom-4 delay-75 duration-500">
            Complete
            <br />
            <span className="text-[#44444e]">frontend execution for</span>
            <br />
            <span className="text-[#00d4a8]">the web.</span>
          </h1>

          <p className="text-[1.08rem] text-[#888892] max-w-[500px] leading-relaxed mb-10 animate-in fade-in slide-in-from-bottom-4 delay-150 duration-500">
            I build high-performance products from scratch. Over the past 3 years, I single-handedly managed the full
            frontend lifecycle, API integrations, and performance of a live commercial SaaS platform. From dashboards to
            e-commerce, I handle everything from setup to deployment.
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

      <section id="browserFeature" className="py-26">
        <div className="max-w-5xl mx-auto px-8">
          <div className="rv opacity-0 translate-y-6 transition-all duration-700 ease-out">
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-[#f0f0f2] mb-3.5">
              Featured Project
            </h2>
            <p className="text-[0.95rem] text-[#888892] max-w-[480px] leading-relaxed">
              A production SaaS application I architected and built from scratch as the sole frontend engineer.
            </p>
          </div>

          <Card className="mt-12 bg-white/[0.03] border-white/5 rounded-[18px] p-11 grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-14 items-center relative overflow-hidden group hover:border-[#00d4a8]/20 transition-colors duration-300 rv opacity-0 translate-y-6 transition-all duration-700 ease-out delay-75 shadow-none">
            <div className="absolute top-0 inset-x-0 h-[1px] bg-linear-to-r from-transparent via-[#00d4a8]/50 to-transparent" />

            <div>
              <div className="inline-block font-mono text-[0.69rem] text-[#00d4a8] bg-[#00d4a8]/5 border border-[#00d4a8]/20 px-2.5 py-1 rounded mb-4">
                Production SaaS · Solo Frontend Engineer
              </div>
              <h3 className="font-display text-5xl font-extrabold tracking-tighter text-[#f0f0f2] mb-1.5">LinkBoss</h3>
              <div className="font-mono text-[0.8rem] text-[#00d4a8] mb-5">app.linkboss.io</div>
              <p className="text-[0.92rem] text-[#888892] leading-relaxed mb-6">
                An internal linking automation platform built for SEO professionals. I designed and built the entire
                frontend from scratch — complex data tables, real-time workflows, multi-step onboarding flows, and a
                component system that scales across thousands of link operations per session. Shipped to production as a
                solo engineer.
              </p>

              <div className="flex gap-2 flex-wrap mb-7">
                {STACK.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[0.7rem] text-[#888892] bg-white/[0.04] border border-white/5 px-2 py-1 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <Button
                  size="sm"
                  variant="outline"
                  asChild
                  className="text-[#00d4a8] bg-[#00d4a8]/5 border-[#00d4a8]/25 hover:bg-[#00d4a8]/15 px-4 rounded-[7px] shadow-none"
                >
                  <a href="https://app.linkboss.io" target="_blank" rel="noreferrer">
                    Live App <ArrowUpRight className="size-3.5 ml-1" />
                  </a>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  asChild
                  className="text-[#f0f0f2] bg-transparent border-white/5 hover:border-white/15 hover:bg-white/[0.06] px-4 rounded-[7px] shadow-none"
                >
                  <a href="https://linkboss.io" target="_blank" rel="noreferrer">
                    Product Site
                  </a>
                </Button>
              </div>
            </div>

            <MockBrowserFeaturesTools />
          </Card>
        </div>
      </section>
      <section id="browserFeature" className="py-26">
        <div className="max-w-5xl mx-auto px-8">
          <div className="rv opacity-0 translate-y-6 transition-all duration-700 ease-out">
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-[#f0f0f2] mb-3.5">
              Featured Project
            </h2>
            <p className="text-[0.95rem] text-[#888892] max-w-[480px] leading-relaxed">
              A production SaaS application I architected and built from scratch as the sole frontend engineer.
            </p>
          </div>

          <Card className="mt-12 bg-white/[0.03] border-white/5 rounded-[18px] p-11 grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-14 items-center relative overflow-hidden group hover:border-[#00d4a8]/20 transition-colors duration-300 rv opacity-0 translate-y-6 transition-all duration-700 ease-out delay-75 shadow-none">
            <div className="absolute top-0 inset-x-0 h-[1px] bg-linear-to-r from-transparent via-[#00d4a8]/50 to-transparent" />

            <div>
              <div className="inline-block font-mono text-[0.69rem] text-[#00d4a8] bg-[#00d4a8]/5 border border-[#00d4a8]/20 px-2.5 py-1 rounded mb-4">
                Production SaaS · Solo Frontend Engineer
              </div>
              <h3 className="font-display text-5xl font-extrabold tracking-tighter text-[#f0f0f2] mb-1.5">LinkBoss</h3>
              <div className="font-mono text-[0.8rem] text-[#00d4a8] mb-5">app.linkboss.io</div>
              <p className="text-[0.92rem] text-[#888892] leading-relaxed mb-6">
                An internal linking automation platform built for SEO professionals. I designed and built the entire
                frontend from scratch — complex data tables, real-time workflows, multi-step onboarding flows, and a
                component system that scales across thousands of link operations per session. Shipped to production as a
                solo engineer.
              </p>

              <div className="flex gap-2 flex-wrap mb-7">
                {STACK.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[0.7rem] text-[#888892] bg-white/[0.04] border border-white/5 px-2 py-1 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <Button
                  size="sm"
                  variant="outline"
                  asChild
                  className="text-[#00d4a8] bg-[#00d4a8]/5 border-[#00d4a8]/25 hover:bg-[#00d4a8]/15 px-4 rounded-[7px] shadow-none"
                >
                  <a href="https://app.linkboss.io" target="_blank" rel="noreferrer">
                    Live App <ArrowUpRight className="size-3.5 ml-1" />
                  </a>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  asChild
                  className="text-[#f0f0f2] bg-transparent border-white/5 hover:border-white/15 hover:bg-white/[0.06] px-4 rounded-[7px] shadow-none"
                >
                  <a href="https://linkboss.io" target="_blank" rel="noreferrer">
                    Product Site
                  </a>
                </Button>
              </div>
            </div>

            <MockBrowserDashboard />
          </Card>
        </div>
      </section>
      <section id="work" className="py-26">
        <div className="max-w-5xl mx-auto px-8">
          <div className="rv opacity-0 translate-y-6 transition-all duration-700 ease-out">
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-[#f0f0f2] mb-3.5">
              Featured Project
            </h2>
            <p className="text-[0.95rem] text-[#888892] max-w-[480px] leading-relaxed">
              A production SaaS application I architected and built from scratch as the sole frontend engineer.
            </p>
          </div>

          <Card className="mt-12 bg-white/[0.03] border-white/5 rounded-[18px] p-11 grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-14 items-center relative overflow-hidden group hover:border-[#00d4a8]/20 transition-colors duration-300 rv opacity-0 translate-y-6 transition-all duration-700 ease-out delay-75 shadow-none">
            <div className="absolute top-0 inset-x-0 h-[1px] bg-linear-to-r from-transparent via-[#00d4a8]/50 to-transparent" />

            <div>
              <div className="inline-block font-mono text-[0.69rem] text-[#00d4a8] bg-[#00d4a8]/5 border border-[#00d4a8]/20 px-2.5 py-1 rounded mb-4">
                Production SaaS · Solo Frontend Engineer
              </div>
              <h3 className="font-display text-5xl font-extrabold tracking-tighter text-[#f0f0f2] mb-1.5">LinkBoss</h3>
              <div className="font-mono text-[0.8rem] text-[#00d4a8] mb-5">app.linkboss.io</div>
              <p className="text-[0.92rem] text-[#888892] leading-relaxed mb-6">
                An internal linking automation platform built for SEO professionals. I designed and built the entire
                frontend from scratch — complex data tables, real-time workflows, multi-step onboarding flows, and a
                component system that scales across thousands of link operations per session. Shipped to production as a
                solo engineer.
              </p>

              <div className="flex gap-2 flex-wrap mb-7">
                {STACK.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[0.7rem] text-[#888892] bg-white/[0.04] border border-white/5 px-2 py-1 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <Button
                  size="sm"
                  variant="outline"
                  asChild
                  className="text-[#00d4a8] bg-[#00d4a8]/5 border-[#00d4a8]/25 hover:bg-[#00d4a8]/15 px-4 rounded-[7px] shadow-none"
                >
                  <a href="https://app.linkboss.io" target="_blank" rel="noreferrer">
                    Live App <ArrowUpRight className="size-3.5 ml-1" />
                  </a>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  asChild
                  className="text-[#f0f0f2] bg-transparent border-white/5 hover:border-white/15 hover:bg-white/[0.06] px-4 rounded-[7px] shadow-none"
                >
                  <a href="https://linkboss.io" target="_blank" rel="noreferrer">
                    Product Site
                  </a>
                </Button>
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/5 rounded-[14px] overflow-hidden font-mono text-sm">
              <div className="bg-white/[0.04] border-b border-white/5 px-4 py-3 flex items-center gap-2">
                <div className="size-2 rounded-full bg-[#ff5f57]" />
                <div className="size-2 rounded-full bg-[#febc2e]" />
                <div className="size-2 rounded-full bg-[#28c840]" />
                <div className="flex-1 text-center text-[0.68rem] text-[#44444e]">app.linkboss.io / dashboard</div>
              </div>
              <CardContent className="p-4 pt-4">
                <div className="flex justify-between items-center mb-3.5">
                  <span className="font-display text-[0.82rem] font-bold text-[#f0f0f2]">Internal Links</span>
                  <span className="text-[0.68rem] text-[#00d4a8] bg-[#00d4a8]/5 border border-[#00d4a8]/20 px-2 py-1 rounded-[5px] cursor-default">
                    + Add Links
                  </span>
                </div>

                <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr] gap-2 mb-2">
                  {["Page URL", "Status", "Links", "Score"].map((h) => (
                    <div key={h} className="text-[0.62rem] text-[#44444e] px-2.5 py-1.5">
                      {h}
                    </div>
                  ))}
                </div>

                {MOCK_ROWS.map((r) => (
                  <div key={r.url} className="grid grid-cols-[1.6fr_1fr_1fr_1fr] gap-2 mb-2 items-center">
                    <div className="bg-white/[0.04] border border-white/5 rounded-[5px] px-2.5 py-1.5 text-[0.68rem] text-[#888892] truncate">
                      {r.url}
                    </div>
                    <div
                      className={`border rounded-[5px] px-2.5 py-1.5 text-[0.68rem] font-medium text-center ${r.cls}`}
                    >
                      {r.status}
                    </div>
                    <div className="bg-[#00d4a8]/5 border border-[#00d4a8]/20 text-[#00d4a8] rounded-[5px] px-2.5 py-1.5 text-[0.68rem] text-center">
                      {r.links} links
                    </div>
                    <div className="bg-white/[0.04] border border-white/5 rounded-[5px] px-2.5 py-1.5 text-[0.68rem] text-[#888892] text-center">
                      {r.score}
                    </div>
                  </div>
                ))}

                <div className="mt-3.5 bg-[#00d4a8]/5 border border-[#00d4a8]/15 rounded-lg p-3">
                  <div className="flex justify-between mb-1.5 text-[0.66rem]">
                    <span className="text-[#44444e]">Overall link health</span>
                    <span className="text-[#00d4a8] font-bold">82 / 100</span>
                  </div>
                  <Progress
                    value={82}
                    className="h-[3px] bg-white/[0.06] w-full relative overflow-hidden rounded-full"
                  />
                </div>
              </CardContent>
            </div>
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
                className="bg-white/[0.03] border-white/5 rounded-[14px] p-7 cursor-pointer transition-all duration-300 group hover:border-white/20 hover:bg-white/[0.06] hover:-translate-y-1 flex flex-col rv opacity-0 translate-y-6 transition-all duration-700 ease-out shadow-none"
              >
                <div className="size-[42px] rounded-lg text-lg bg-[#00d4a8]/5 border border-[#00d4a8]/20 flex items-center justify-center mb-4">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[4.5rem] mt-12 items-start">
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
                  className="flex justify-between items-center px-4 py-3 bg-white/[0.03] border border-white/5 rounded-lg text-sm hover:border-white/15 transition-colors duration-200 group"
                >
                  <div className="flex items-center gap-2.5 text-[#888892] group-hover:text-[#f0f0f2] transition-colors">
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
          <div className="relative overflow-hidden bg-white/[0.03] border border-white/5 rounded-[22px] py-18 px-8 text-center rv opacity-0 translate-y-6 transition-all duration-700 ease-out">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[340px] h-[1px] bg-linear-to-r from-transparent via-[#00d4a8] to-transparent opacity-70" />
            <div className="absolute -top-[60px] left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[radial-gradient(ellipse,rgba(0,212,168,0.07),transparent_70%)] pointer-events-none" />

            <div className="relative z-10">
              <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tighter text-[#f0f0f2] mb-4">
                Let's build something.
              </h2>
              <p className="text-[#888892] max-w-[380px] mx-auto text-[0.95rem] leading-relaxed mb-9">
                Open to frontend roles, contract projects, and interesting product challenges.
              </p>

              <div className="flex gap-3.5 justify-center flex-wrap">
                <Button
                  className="bg-[#00d4a8] text-[#05100e] hover:bg-[#00d4a8]/85 font-semibold px-5 rounded-lg cursor-pointer shadow-none"
                  asChild
                >
                  <a href="mailto:hello@example.com">
                    <Mail className="size-4 mr-2" /> hello@example.com <ArrowRight className="size-3.5 ml-1.5" />
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
              className="text-[0.78rem] text-[#44444e] hover:text-[#888892] transition-colors cursor-pointer bg-transparent border-none p-0"
              onClick={() => scrollTo("work")}
            >
              Work
            </button>
            <button
              type="button"
              className="text-[0.78rem] text-[#44444e] hover:text-[#888892] transition-colors cursor-pointer bg-transparent border-none p-0"
              onClick={() => scrollTo("projects")}
            >
              Projects
            </button>
            <button
              type="button"
              className="text-[0.78rem] text-[#44444e] hover:text-[#888892] transition-colors cursor-pointer bg-transparent border-none p-0"
              onClick={() => scrollTo("contact")}
            >
              Contact
            </button>
          </div>
          <LinkedInIcon /> <GitHubIcon />
        </div>
      </footer>
    </div>
  );
}

// Mock Data from your layout
const projects = [
  {
    id: "1",
    title: "TechCorp Website",
    description: "Main corporate website",
    url: "techcorp.com",
    status: "active",
    totalLinks: 1250,
    date: "20 May 26",
  },
  {
    id: "2",
    title: "Portfolio Site",
    description: "Personal portfolio website",
    url: "johndesigner.com",
    status: "pending",
    totalLinks: 45,
    date: "20 May 26",
  },
  {
    id: "3",
    title: "Blog Platform",
    description: "Content publishing site",
    url: "myblog.com",
    status: "inactive",
    totalLinks: 890,
    date: "20 May 26",
  },
];

function MockBrowserDashboard() {
  const [filter, setFilter] = useState("all");

  const filteredProjects = projects.filter((project) => filter === "all" || project.status === filter);

  const getStatusBadge = (status: string) => {
    const styles = {
      active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      inactive: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
    };
    return styles[status as keyof typeof styles] || "";
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-xl border border-zinc-800 bg-zinc-950/50 backdrop-blur-md overflow-hidden shadow-2xl">
      {/* Browser Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/40">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
        </div>
        <div className="text-xs font-mono text-zinc-500 select-none">app.linkboss.io / projects</div>
        <div className="w-12" /> {/* Visual spacer */}
      </div>

      {/* Browser Viewport Content */}
      <div className="p-6 space-y-6 min-h-[480px]">
        {/* Dashboard Header */}
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-100">Projects List</h2>
        </div>

        {/* Toolbar Controls */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center border-b border-zinc-900 pb-4">
          <Tabs defaultValue="all" onValueChange={setFilter} className="w-full sm:w-auto">
            <TabsList className="bg-zinc-900/60 border border-zinc-800/80 p-0.5 h-9">
              <TabsTrigger
                value="all"
                className="text-xs px-3 data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-100"
              >
                All{" "}
                <span className="ml-1.5 px-1.5 py-0.5 text-[10px] bg-zinc-800 text-zinc-400 rounded-md border border-zinc-700/50">
                  {projects.length}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="active"
                className="text-xs px-3 data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-100"
              >
                Active{" "}
                <span className="ml-1.5 px-1.5 py-0.5 text-[10px] bg-zinc-800 text-emerald-400 rounded-md border border-zinc-700/50">
                  {projects.filter((p) => p.status === "active").length}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="pending"
                className="text-xs px-3 data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-100"
              >
                Pending{" "}
                <span className="ml-1.5 px-1.5 py-0.5 text-[10px] bg-zinc-800 text-amber-400 rounded-md border border-zinc-700/50">
                  {projects.filter((p) => p.status === "pending").length}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="inactive"
                className="text-xs px-3 data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-100"
              >
                Inactive{" "}
                <span className="ml-1.5 px-1.5 py-0.5 text-[10px] bg-zinc-800 text-zinc-400 rounded-md border border-zinc-700/50">
                  {projects.filter((p) => p.status === "inactive").length}
                </span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <MotionConfig transition={{ duration: 1 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="border-zinc-800/80 bg-zinc-900/20 hover:bg-zinc-900/40 transition-colors duration-200 shadow-sm relative group overflow-hidden">
                    <CardHeader className="p-4 pb-2 space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge
                          variant="outline"
                          className={cn(
                            "capitalize font-mono text-[10px] px-2 py-0.5 tracking-wide rounded",
                            getStatusBadge(project.status)
                          )}
                        >
                          {project.status}
                        </Badge>
                        <span className="text-sm font-bold tracking-tight text-zinc-500 hover:text-zinc-300">•••</span>
                      </div>
                      <div className="space-y-1">
                        <CardTitle className="text-sm font-medium text-zinc-200">{project.title}</CardTitle>
                        <CardDescription className="text-[11px] text-zinc-400/90">
                          {project.description}
                        </CardDescription>
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </MotionConfig>
      </div>
    </div>
  );
}

// Feature list data extracted from your image
const features = [
  {
    id: "inbounds",
    title: "Inbounds",
    description: "Analyze and manage inbound links for your project.",
    icon: LogIn,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-500/10",
    isNew: false,
  },
  {
    id: "custom-network",
    title: "Custom Network",
    description: "Create and manage content custom networks for better site structure.",
    icon: Layers,
    iconColor: "text-green-500",
    iconBg: "bg-green-500/10",
    isNew: false,
  },
  {
    id: "anchor-manager",
    title: "Anchor Manager",
    description: "Generate detailed reports on internal and external links.",
    icon: Sliders,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/10",
    isNew: true,
  },
  {
    id: "site-report",
    title: "Site Report",
    description: "Run comprehensive audits on your site performance.",
    icon: Activity,
    iconColor: "text-purple-500",
    iconBg: "bg-purple-500/10",
    isNew: false,
  },
];

// Container animation variants for clean staggered rendering
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 20 } },
};

function MockBrowserFeaturesTools() {
  return (
    <div className="w-full max-w-4xl mx-auto rounded-xl border border-zinc-800 bg-zinc-950/50 backdrop-blur-md overflow-hidden shadow-2xl">
      {/* Browser Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/40">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
        </div>
        <div className="text-xs font-mono text-zinc-500 select-none">app.linkboss.io / tools</div>
        <div className="w-12" />
      </div>
      {/* Browser Viewport Content */}
      <div className="p-6 min-h-[400px] flex flex-col justify-center">
        <div className="space-y-1 mb-6">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-100">Tools</h2>
        </div>
        {/* Responsive feature grid layout */}

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2  gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {features.map((feature) => {
            const IconComponent = feature.icon;

            return (
              <motion.div
                key={feature.id}
                variants={cardVariants}
                whileHover={{ y: -4, transition: { duration: 0.15 } }}
                className="h-full"
              >
                <Card className="h-full border-zinc-800/80 bg-zinc-900/20 hover:bg-zinc-900/40 hover:border-zinc-700/60 transition-colors duration-200 shadow-sm relative group overflow-hidden cursor-pointer select-none">
                  <div className=" flex items-center gap-2 px-2">
                    {/* Top row containing Icon and Optional "New" Badge */}
                    <div className="flex items-center justify-between">
                      <div className={cn("p-1 rounded-lg border border-zinc-800/20", feature.iconBg)}>
                        <IconComponent className={cn("size-3", feature.iconColor)} />
                      </div>
                    </div>
                    {/* Text content elements */}
                    <CardTitle className="text-xs font-medium text-zinc-200 tracking-tight group-hover:text-zinc-100 transition-colors">
                      {feature.title}
                    </CardTitle>{" "}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
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
      className={`fill-current text-muted-foreground hover:text-foreground transition-colors ${className}`}
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
      className={`fill-current text-muted-foreground hover:text-foreground transition-colors ${className}`}
      {...props}
    >
      <title>{altTitle}</title>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
};
