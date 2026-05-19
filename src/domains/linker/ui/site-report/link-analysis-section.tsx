"use client";
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
                icon={<CheckCircle2 className="size-5 text-emerald-600 dark:text-emerald-400" />}
                label="Active Links"
                value={report.linkMetrics.activeLinks}
                bgClass="bg-emerald-500/10 dark:bg-emerald-500/10 border border-emerald-500/20 text-emerald-900 dark:text-emerald-300"
                textClass="text-zinc-900 dark:text-zinc-100"
              />

              <LinkHealthItem
                icon={<XCircle className="size-5 text-rose-600 dark:text-rose-400" />}
                label="Broken Links"
                value={report.linkMetrics.brokenLinks}
                bgClass="bg-rose-500/10 dark:bg-rose-500/5 border border-rose-500/20 text-rose-900 dark:text-rose-300"
                textClass="text-zinc-900 dark:text-zinc-100"
                badgeVariant="destructive"
              />

              <LinkHealthItem
                icon={<AlertCircle className="size-5 text-amber-600 dark:text-amber-400" />}
                label="Redirects"
                value={report.linkMetrics.redirects}
                bgClass="bg-amber-500/10 dark:bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-300"
                textClass="text-zinc-900 dark:text-zinc-100"
                badgeVariant="yellow-lighter"
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
  badgeVariant?:
    | "default"
    | "secondary"
    | "destructive"
    | "link"
    | "default-lighter"
    | "default-lighter-rounded"
    | "outline"
    | "ghost"
    | "destructive-lighter"
    | "destructive-lighter-rounded"
    | "inactive"
    | "inactive-rounded"
    | "pending"
    | "pending-rounded"
    | "teal-lighter"
    | "teal-lighter-rounded"
    | "purple-lighter"
    | "purple-lighter-rounded"
    | "orange-lighter"
    | "orange-lighter-rounded"
    | "green-lighter"
    | "green-lighter-rounded"
    | "yellow-lighter"
    | "yellow-lighter-rounded"
    | "new"
    | "new-rounded";
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
