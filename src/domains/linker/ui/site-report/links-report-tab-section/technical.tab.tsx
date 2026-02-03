import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import type { SiteReport } from "@/domains/linker/types/site-report.types";
import { TechnicalSeoTable } from "@/domains/linker/ui/site-report/links-report-tab-section/technical-seo.table/technical-seo.table";

interface Props {
  report: SiteReport;
}

export function TechnicalTab({ report }: Props) {
  return (
    <div className="p-6 space-y-4">
      <TechnicalSeoTable data={report.technicalSeo} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard label="Largest Contentful Paint" value="1.2s" status="good" />
        <MetricCard label="First Input Delay" value="85ms" status="good" />
        <MetricCard label="Cumulative Layout Shift" value="0.15" status="warning" />
      </div>
    </div>
  );
}

function MetricCard({ label, value, status }: { label: string; value: string; status: "good" | "warning" }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardDescription>{label}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <Badge variant={status === "good" ? "default" : "secondary"} className="mt-2">
          {status === "good" ? "Good" : "Needs Improvement"}
        </Badge>
      </CardContent>
    </Card>
  );
}
