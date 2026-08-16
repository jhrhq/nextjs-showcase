import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SectionLabel } from "./section-label";

const ownership = [
  "Frontend architecture",
  "UI / UX development",
  "API integration",
  "State management",
  "Complex forms",
  "Data-heavy interfaces",
  "Authentication",
  "Performance",
];

export function AboutExperience() {
  return (
    <section id="experience" className="border-b border-border">
      <div className=" py-20 sm:py-24 ">
        <div className="grid gap-10 lg:grid-cols-[180px_1fr]">
          <SectionLabel number="02" label="Experience" />

          <div>
            <div className="mb-8">
              <p className="text-xs font-medium text-muted-foreground">Dec 2022 — Jul 2025</p>

              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Frontend Developer</h2>

              <p className="mt-2 text-sm text-muted-foreground">ZVENTURES LLC</p>
            </div>

            <Card className="overflow-hidden">
              <CardHeader className="border-b border-border bg-muted/20 p-6 sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                      Primary Project
                    </p>

                    <h3 className="mt-2 text-xl font-semibold">Linkboss SaaS Platform</h3>
                  </div>

                  <Badge variant="outline">Sole Frontend Developer</Badge>
                </div>
              </CardHeader>

              <CardContent className="p-6 sm:p-8">
                <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                  Built and evolved the primary customer-facing SaaS application from the ground up, taking ownership of
                  its frontend architecture and translating product requirements into production-ready workflows and
                  interfaces.
                </p>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                  As the product grew, I continued to make architectural and technical decisions around increasingly
                  complex workflows, data-heavy interfaces, state management, forms, API integration, and user
                  experience.
                </p>

                <div className="mt-8 grid gap-x-8 gap-y-3 border-t border-border pt-8 sm:grid-cols-2">
                  {ownership.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm">
                      <Check className="size-3.5 text-muted-foreground" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-8 border-t border-border pt-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Button asChild>
                      <Link href="/linkboss">
                        View Recreation
                        <ArrowUpRight className="size-4" />
                      </Link>
                    </Button>

                    <Button asChild variant="outline">
                      <Link href="/linkboss-architecture">
                        Engineering Case Study
                        <ArrowUpRight className="size-4" />
                      </Link>
                    </Button>
                  </div>

                  <p className="mt-3 max-w-2xl text-xs leading-5 text-muted-foreground">
                    A deeper look at the architecture, technical decisions, and challenges behind three years of
                    development.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardContent className="p-6 sm:p-8">
                <div className="grid gap-6 sm:grid-cols-[220px_1fr]">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                      Additional Experience
                    </p>

                    <h3 className="mt-3 text-lg font-semibold">Internal Admin Dashboard</h3>

                    <p className="mt-1 text-sm text-muted-foreground">Collaborator</p>
                  </div>

                  <p className="text-sm leading-7 text-muted-foreground">
                    Collaborated on an internal management platform used by company administrators, working within an
                    established engineering environment involving existing component systems, centralized state
                    management, version-control workflows, peer reviews, complex forms, and schema-driven validation.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
