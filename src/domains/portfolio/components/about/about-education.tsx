import { GraduationCap } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { SectionLabel } from "./section-label";

export function AboutEducation() {
  return (
    <section id="education" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[180px_1fr]">
          <SectionLabel number="05" label="Education" />

          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl"> Academic background</h2>

            <Card className="mt-8">
              <CardContent className="flex items-center gap-4 p-6 sm:p-7">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/30">
                  <GraduationCap className="size-5 text-muted-foreground" />
                </div>

                <div>
                  <h3 className="text-base font-medium">Bachelor of Arts in English</h3>

                  <p className="mt-1 text-sm text-muted-foreground">Narayanganj College University</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
