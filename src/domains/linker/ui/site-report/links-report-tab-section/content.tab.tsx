import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { SiteReport } from "@/domains/linker/types/site-report.types";

export function ContentTab({ report }: { report: SiteReport }) {
  return (
    <div className="space-y-4 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Content Quality Metrics</CardTitle>
          <CardDescription>On-page content analysis</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {report.contentMetrics.map((metric) => (
            <div key={metric.name} className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">{metric.name}</span>
                <Badge variant={metric.score >= 80 ? "default" : metric.score >= 60 ? "secondary" : "destructive"}>
                  {metric.score}%
                </Badge>
              </div>

              <Progress value={metric.score} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
