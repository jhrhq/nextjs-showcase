import { Blocks, BrainCircuit, Layers3, MousePointer2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { SectionLabel } from "./section-label";

const principles = [
  {
    icon: BrainCircuit,
    title: "Understand the product",
    description:
      "I try to understand the workflow and the problem behind a feature before deciding how the interface should work.",
  },
  {
    icon: Layers3,
    title: "Design for complexity",
    description:
      "As applications grow, I separate UI state, server state, validation, and data flows so complexity remains manageable.",
  },
  {
    icon: Blocks,
    title: "Build for change",
    description:
      "Product requirements evolve. I prefer composable patterns that can adapt without creating unnecessary abstraction.",
  },
  {
    icon: MousePointer2,
    title: "Keep interfaces clear",
    description:
      "Complex systems do not have to feel complex. I care about making workflows understandable and predictable for users.",
  },
];

export function AboutApproach() {
  return (
    <section id="work" className="border-b border-border">
      <div className=" py-20 sm:px-6 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[180px_1fr]">
          <SectionLabel number="03" label="How I Work" />

          <div>
            <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              I think in systems, not just screens.
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              The tools change from project to project. The way I approach problems is more consistent.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {principles.map((principle, index) => {
                const Icon = principle.icon;

                return (
                  <Card key={principle.title}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex size-9 items-center justify-center rounded-lg border border-border bg-muted/30">
                          <span className="font-mono text-xs text-muted-foreground">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>

                        <Icon className="size-4 text-muted-foreground" />
                      </div>

                      <CardTitle className="pt-3 text-base">{principle.title}</CardTitle>
                    </CardHeader>

                    <CardContent>
                      <p className="text-sm leading-7 text-muted-foreground">{principle.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
