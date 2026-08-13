import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { SectionLabel } from "./section-label";

const coreTechnologies = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "TanStack Query",
  "TanStack Table",
  "Zustand",
  "React Hook Form",
  "Zod",
  "Axios",
  "React Router",
  "Vite",
  "shadcn/ui",
  "Tiptap",
  "Recharts",
];

const expandingTechnologies = ["Node.js", "Express", "SQL", "MongoDB"];

export function AboutTechnology() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[180px_1fr]">
          <SectionLabel number="04" label="Technology" />

          <div className="max-w-4xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              A strong frontend foundation, expanding toward full-stack.
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
              My professional experience is centered around the React ecosystem. I&apos;m now extending that foundation
              into backend development and learning how the systems behind modern web applications are designed and
              built.
            </p>

            <div className="mt-10">
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Professional Experience
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {coreTechnologies.map((technology) => (
                  <Badge key={technology} variant="outline" className="bg-card px-3 py-1.5 font-normal">
                    {technology}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mt-12 rounded-xl border border-border bg-muted/20 p-6 sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    Currently Expanding Into
                  </p>

                  <h3 className="mt-2 text-xl font-semibold">Full-stack development</h3>
                </div>

                <ArrowUpRight className="hidden size-4 text-muted-foreground sm:block" />
              </div>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                I&apos;m currently focusing on Node.js, Express, SQL, and MongoDB to strengthen my understanding of
                backend APIs, relational data modeling, persistence, and complete application architecture.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {expandingTechnologies.map((technology) => (
                  <Badge key={technology} className="px-3 py-1.5">
                    {technology}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
