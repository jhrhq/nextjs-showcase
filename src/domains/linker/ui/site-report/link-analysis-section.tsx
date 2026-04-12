import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { SiteReport } from "@/domains/linker/types/site-report.types";
import { TechnicalSeoTable } from "@/domains/linker/ui/site-report/linking-page.table/linking-page.table";

export function LinkAnalysisSection({ report }: { report: SiteReport }) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Top Linking Pages</CardTitle>
          <CardDescription>Pages with the most outbound links</CardDescription>
        </CardHeader>
        <CardContent>
          <TechnicalSeoTable data={report.topLinkingPages} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Link Health</CardTitle>
            <CardDescription>Status of all links on your site</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              <LinkHealthItem
                icon={<CheckCircle2 className="size-5 text-green-600" />}
                label="Active Links"
                value={report.linkMetrics.activeLinks}
                bgClass="bg-green-50"
                textClass="text-green-900"
              />

              <LinkHealthItem
                icon={<XCircle className="size-5 text-red-600" />}
                label="Broken Links"
                value={report.linkMetrics.brokenLinks}
                bgClass="bg-red-50"
                textClass="text-red-900"
                badgeVariant="destructive"
              />

              <LinkHealthItem
                icon={<AlertCircle className="size-5 text-yellow-600" />}
                label="Redirects"
                value={report.linkMetrics.redirects}
                bgClass="bg-yellow-50"
                textClass="text-yellow-900"
                badgeVariant="secondary"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>External Domain Authority</CardTitle>
            <CardDescription>Top external domains you're linking to</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-3">
              {report.topExternalDomains.map((domain) => (
                <ExternalDomainRow key={domain.domain} domain={domain} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

type LinkHealthItemProps = {
  icon: React.ReactNode;
  label: string;
  value: number;
  bgClass: string;
  textClass: string;
  badgeVariant?: "default" | "secondary" | "destructive";
};

export function LinkHealthItem({
  icon,
  label,
  value,
  bgClass,
  textClass,
  badgeVariant = "default",
}: LinkHealthItemProps) {
  return (
    <div className={`flex items-center justify-between p-3 ${bgClass}`}>
      <div className="flex items-center gap-2">
        {icon}
        <span className={`font-medium ${textClass}`}>{label}</span>
      </div>

      <Badge variant={badgeVariant}>{value}</Badge>
    </div>
  );
}

type ExternalDomain = {
  domain: string;
  links: number;
};

export function ExternalDomainRow({ domain }: { domain: ExternalDomain }) {
  return (
    <div className="flex items-center justify-between p-3 border">
      <span className="text-sm font-medium truncate">{domain.domain}</span>

      <Badge variant="outline">{domain.links} links</Badge>
    </div>
  );
}
