"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { SiteReport } from "@/domains/linker/types/site-report.types";
import { cn } from "@/lib/utils";

export function ContentTab({ report }: { report: SiteReport }) {
  return (
    <div className="space-y-4 pt-2">
      <Card className="border border-border bg-card shadow-2xs">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold tracking-tight text-foreground">
            Content Quality Metrics
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">On-page content analysis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {report.contentMetrics.map((metric) => {
            const isGood = metric.score >= 80;
            const isAverage = metric.score >= 60 && metric.score < 80;

            return (
              <div key={metric.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{metric.name}</span>
                  <Badge
                    variant="outline"
                    className={cn(
                      "font-semibold shadow-2xs text-xs px-2 py-0.5 border",
                      isGood
                        ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                        : isAverage
                          ? "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400"
                          : "border-destructive/20 bg-destructive/10 text-destructive"
                    )}
                  >
                    {metric.score}%
                  </Badge>
                </div>
                <Progress value={metric.score} className="h-2 bg-muted" />
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
