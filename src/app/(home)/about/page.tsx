import {
  ArrowDownToLine,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  Code2,
  GraduationCap,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const technicalSkills = {
  Languages: ["JavaScript", "TypeScript", "HTML5", "CSS3"],
  "Frameworks & UI": ["React", "Next.js", "Tailwind CSS", "shadcn/ui"],
  "Data & State": ["TanStack Query", "TanStack Table", "Zustand", "Axios"],
  "Forms & Validation": ["React Hook Form", "Zod", "Schema-driven Validation"],
  "Architecture & Security": ["REST API Integration", "JWT", "Access / Refresh Tokens", "Token Rotation"],
  "Tooling & Workflow": ["Git", "GitHub", "Modern Build Tools", "Package Managers"],
};

const capabilities = [
  {
    title: "Frontend Architecture",
    description:
      "Designing maintainable frontend systems from product requirements, choosing appropriate state, data-fetching, component, and routing strategies.",
  },
  {
    title: "UI / UX Engineering",
    description:
      "Turning business requirements into clear interfaces and iterating on interaction patterns to improve usability and consistency.",
  },
  {
    title: "Data-Heavy Interfaces",
    description:
      "Building complex tables, dashboards, filters, pagination, and interactive data workflows while keeping the interface responsive.",
  },
  {
    title: "API-Driven Applications",
    description:
      "Working closely with backend APIs and designing frontend data flows around asynchronous server state, caching, mutations, and error states.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* ------------------------------------------------------------------ */}
      {/* Hero                                                               */}
      {/* ------------------------------------------------------------------ */}

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[1fr_300px] lg:items-end">
            <div className="max-w-4xl">
              <div className="mb-6 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <span className="size-1.5 rounded-full bg-primary" />
                About Me
              </div>

              <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
                Frontend developer focused on building things that hold up.
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
                I&apos;m Johir Haque, a frontend developer with hands-on experience building production-grade SaaS
                applications from the ground up. I specialize in React, TypeScript, and modern frontend architecture,
                with a strong foundation in JavaScript.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                <Badge variant="outline">Frontend Developer</Badge>
                <Badge variant="outline">React</Badge>
                <Badge variant="outline">TypeScript</Badge>
                <Badge variant="outline">Next.js</Badge>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-background">
                  <MapPin className="size-4 text-muted-foreground" />
                </div>

                <div>
                  <p className="text-sm font-medium">Dhaka, Bangladesh</p>

                  <p className="mt-0.5 text-xs text-muted-foreground">Open to frontend opportunities</p>
                </div>
              </div>

              <Separator className="my-5" />

              <div className="space-y-3">
                <ContactRow label="Email" value="jhr.haq@gmail.com" href="mailto:jhr.haq@gmail.com" />

                <ContactRow label="LinkedIn" value="LinkedIn" href="#" />

                <ContactRow label="GitHub" value="GitHub" href="#" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        {/* ---------------------------------------------------------------- */}
        {/* Summary                                                          */}
        {/* ---------------------------------------------------------------- */}

        <section className="border-b border-border py-20 sm:py-24">
          <SectionHeading
            number="01"
            eyebrow="Profile"
            title="A frontend engineer who likes understanding the whole system."
          />

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="max-w-3xl space-y-5">
              <p className="text-base leading-8 text-muted-foreground">
                My strongest experience comes from owning the frontend of a growing SaaS product for three years. I was
                responsible for turning product ideas and business requirements into a complete customer-facing
                application, from architecture and UI decisions through implementation and deployment.
              </p>

              <p className="text-base leading-8 text-muted-foreground">
                Working as the primary frontend developer meant that I had to make decisions across the entire frontend
                stack rather than focusing on a single layer. I worked with API integration, server state, client state,
                complex forms, authentication, data-heavy interfaces, routing, performance, and UI systems.
              </p>

              <p className="text-base leading-8 text-muted-foreground">
                I&apos;m particularly interested in the engineering behind interfaces: how data flows through an
                application, how state should be separated, how components scale, and how a simple product can evolve
                without becoming difficult to maintain.
              </p>
            </div>

            <Card className="h-fit bg-muted/30">
              <CardHeader>
                <Sparkles className="size-5 text-muted-foreground" />

                <CardTitle className="pt-2">What I care about</CardTitle>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Clear architecture",
                    "Thoughtful UI/UX",
                    "Maintainable components",
                    "Reliable data flows",
                    "Performance",
                    "Continuous learning",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="size-3.5 text-foreground" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Experience                                                       */}
        {/* ---------------------------------------------------------------- */}

        <section className="border-b border-border py-20 sm:py-24">
          <SectionHeading
            number="02"
            eyebrow="Experience"
            title="Three years building a production SaaS frontend."
            description="My most significant professional experience was at ZVENTURES LLC, where I owned the frontend of the Linkboss SaaS platform."
          />

          <div className="mt-12">
            <Card className="overflow-hidden">
              <CardHeader className="border-b border-border bg-muted/20 p-6 sm:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                      <span className="size-1.5 rounded-full bg-primary" />
                      Dec 2022 — Jul 2025
                    </div>

                    <CardTitle className="mt-3 text-2xl sm:text-3xl">Frontend Developer</CardTitle>

                    <p className="mt-1 text-sm text-muted-foreground">ZVENTURES LLC</p>
                  </div>

                  <Badge variant="outline">Sole Frontend Developer</Badge>
                </div>
              </CardHeader>

              <CardContent className="p-6 sm:p-8 lg:p-10">
                <div className="grid gap-12 lg:grid-cols-[1fr_260px]">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <BriefcaseBusiness className="size-4 text-muted-foreground" />
                      Linkboss Core SaaS Platform
                    </div>

                    <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
                      Built the primary customer-facing application from the ground up, taking ownership of frontend
                      architecture, interface design, data workflows, and the technical foundation required to support a
                      growing SaaS product.
                    </p>

                    <div className="mt-8 space-y-7">
                      <ExperienceItem
                        title="End-to-End Frontend Ownership"
                        text="Owned the frontend architecture from concept through production, translating product requirements into scalable React interfaces and application workflows."
                      />

                      <ExperienceItem
                        title="UI / UX Architecture"
                        text="Independently translated business logic into intuitive interfaces and evolved the UI through multiple iterations to establish a more consistent and maintainable design system."
                      />

                      <ExperienceItem
                        title="Complex Form Architecture"
                        text="Built a high volume of complex data-entry workflows using React Hook Form and Zod, establishing schema-driven validation and predictable form behavior."
                      />

                      <ExperienceItem
                        title="Advanced Data Interfaces"
                        text="Built data-heavy dashboards and interactive tables using TanStack Table, including filtering, sorting, pagination, expandable content, and performance-focused data handling."
                      />

                      <ExperienceItem
                        title="State & Server Data"
                        text="Used Zustand for global client state and TanStack Query for server-state management, caching, synchronization, mutations, and responsive data-driven experiences."
                      />

                      <ExperienceItem
                        title="Authentication & API Integration"
                        text="Implemented client-side authentication flows and integrated API communication using Axios, including access and refresh token handling through network interceptors."
                      />
                    </div>
                  </div>

                  <div className="lg:border-l lg:border-border lg:pl-8">
                    <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                      Core Ownership
                    </p>

                    <div className="mt-5 space-y-3">
                      {[
                        "Frontend Architecture",
                        "UI / UX",
                        "React Application",
                        "API Integration",
                        "State Management",
                        "Forms & Validation",
                        "Data Tables",
                        "Authentication",
                        "Performance",
                      ].map((item) => (
                        <div key={item} className="flex items-center gap-2 text-sm">
                          <Check className="size-3.5 text-muted-foreground" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Internal dashboard */}

          <Card className="mt-6">
            <CardContent className="p-6 sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
                <div>
                  <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    Additional Experience
                  </p>

                  <h3 className="mt-3 text-lg font-semibold">Internal Admin Dashboard</h3>

                  <p className="mt-1 text-sm text-muted-foreground">Collaborator</p>
                </div>

                <div>
                  <p className="text-sm leading-7 text-muted-foreground">
                    Collaborated on an internal management platform used by company administrators. Worked within an
                    established engineering environment involving existing component systems, centralized state
                    management, version-control workflows, peer reviews, complex forms, and schema-driven validation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Capabilities                                                     */}
        {/* ---------------------------------------------------------------- */}

        <section className="border-b border-border py-20 sm:py-24">
          <SectionHeading number="03" eyebrow="Capabilities" title="Where I bring the most value." />

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {capabilities.map((capability, index) => (
              <Card key={capability.title}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-muted/30">
                      <span className="font-mono text-xs text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <Code2 className="size-4 text-muted-foreground" />
                  </div>

                  <CardTitle className="pt-3">{capability.title}</CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-sm leading-7 text-muted-foreground">{capability.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Technical Skills                                                 */}
        {/* ---------------------------------------------------------------- */}

        <section className="border-b border-border py-20 sm:py-24">
          <SectionHeading
            number="04"
            eyebrow="Technical Skills"
            title="Tools I use to build modern frontend applications."
            description="My experience is centered around the React ecosystem, but I care more about understanding the underlying engineering problems than being tied to a particular library."
          />

          <div className="mt-12 space-y-4">
            {Object.entries(technicalSkills).map(([category, skills]) => (
              <Card key={category}>
                <CardContent className="grid gap-5 p-5 sm:grid-cols-[220px_1fr] sm:p-6">
                  <div>
                    <p className="text-sm font-medium">{category}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="bg-background font-normal">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Education                                                        */}
        {/* ---------------------------------------------------------------- */}

        <section className="border-b border-border py-20 sm:py-24">
          <SectionHeading
            number="05"
            eyebrow="Education"
            title="Continuous learning has always been part of the journey."
          />

          <div className="mt-12 space-y-3">
            <EducationItem title="Complete Web Development Course" organization="Programming Hero" />

            <EducationItem title="Reactive Accelerator" organization="Learn with Sumit" />

            <EducationItem title="Bachelor of Arts in English" organization="Narayanganj College University" />
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* CTA                                                              */}
        {/* ---------------------------------------------------------------- */}

        <section className="py-20 sm:py-28">
          <Card className="overflow-hidden">
            <CardContent className="p-7 sm:p-10 lg:p-12">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <span className="size-1.5 rounded-full bg-primary" />
                    Let&apos;s work together
                  </div>

                  <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
                    Looking for a frontend developer who cares about the details?
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                    I&apos;m interested in working on products where frontend engineering, thoughtful interfaces, and
                    solving real problems matter.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button asChild>
                    <a href="mailto:jhr.haq@gmail.com">
                      <Mail className="size-4" />
                      Get in touch
                    </a>
                  </Button>

                  <Button asChild variant="outline">
                    <a href="/resume/johir-haque-resume.pdf" download>
                      <ArrowDownToLine className="size-4" />
                      Resume
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center pt-12">
            <Link
              href="/"
              className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Back to home
              <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Components                                                                 */
/* -------------------------------------------------------------------------- */

function SectionHeading({
  number,
  eyebrow,
  title,
  description,
}: {
  number: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="grid gap-5 lg:grid-cols-[120px_1fr]">
      <div className="flex items-start gap-3">
        <span className="font-mono text-xs text-muted-foreground">{number}</span>

        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{eyebrow}</span>
      </div>

      <div className="max-w-3xl">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>

        {description && <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">{description}</p>}
      </div>
    </div>
  );
}

function ExperienceItem({ title, text }: { title: string; text: string }) {
  return (
    <div className="border-l border-border pl-5">
      <h4 className="text-sm font-medium">{title}</h4>

      <p className="mt-2 text-sm leading-7 text-muted-foreground">{text}</p>
    </div>
  );
}

function EducationItem({ title, organization }: { title: string; organization: string }) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-5 sm:p-6">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/30">
          <GraduationCap className="size-4 text-muted-foreground" />
        </div>

        <div>
          <h3 className="text-sm font-medium">{title}</h3>

          <p className="mt-1 text-xs text-muted-foreground">{organization}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function ContactRow({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <a href={href} className="group flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>

      <span className="flex items-center gap-1 text-foreground transition-colors group-hover:text-primary">
        {value}
        <ArrowUpRight className="size-3.5" />
      </span>
    </a>
  );
}
