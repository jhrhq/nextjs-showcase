import { BookOpen, Code2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { SectionLabel } from "./section-label";

const learning = [
  {
    icon: Code2,
    title: "Complete Web Development Course",
    organization: "Programming Hero",
  },
  {
    icon: BookOpen,
    title: "Reactive Accelerator",
    organization: "Learn with Sumit",
  },
];

export function AboutLearning() {
  return (
    <section id="learning" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[180px_1fr]">
          <SectionLabel number="06" label="Learning" />

          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">I learn by building.</h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              My development journey has been largely self-directed. Courses gave me the foundation, but most of my
              growth has come from building real applications, reading documentation, solving problems, and working
              through increasingly complex requirements.
            </p>

            <div className="mt-8 space-y-3">
              {learning.map((item) => {
                const Icon = item.icon;

                return (
                  <Card key={item.title}>
                    <CardContent className="flex items-center gap-4 p-5 sm:p-6">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/30">
                        <Icon className="size-4 text-muted-foreground" />
                      </div>

                      <div>
                        <h3 className="text-sm font-medium">{item.title}</h3>

                        <p className="mt-1 text-xs text-muted-foreground">{item.organization}</p>
                      </div>
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
