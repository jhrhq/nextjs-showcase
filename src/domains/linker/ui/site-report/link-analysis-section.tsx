"use client";

import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import type * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { SiteReport } from "@/domains/linker/types/site-report.types";
import { TechnicalSeoTable } from "@/domains/linker/ui/site-report/linking-page.table/linking-page.table";
import { cn } from "@/lib/utils";

export function LinkAnalysisSection({ report }: { report: SiteReport }) {
  return (
    <div className="space-y-4">
      <Card className="border border-border bg-card shadow-2xs">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold tracking-tight text-foreground">Top Linking Pages</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Pages with the most outbound links
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TechnicalSeoTable data={report.topLinkingPages} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border border-border bg-card shadow-2xs">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold tracking-tight text-foreground">Link Health</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Status of all links on your site
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <LinkHealthItem
                icon={<CheckCircle2 className="size-4.5 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                label="Active Links"
                value={report.linkMetrics.activeLinks}
                bgClass="bg-emerald-500/10 border border-emerald-500/20 text-emerald-950 dark:text-emerald-200"
                textClass="text-foreground"
              />
              <LinkHealthItem
                icon={<XCircle className="size-4.5 text-destructive shrink-0" />}
                label="Broken Links"
                value={report.linkMetrics.brokenLinks}
                bgClass="bg-destructive/10 border border-destructive/20 text-destructive"
                textClass="text-foreground"
                badgeVariant="destructive"
              />
              <LinkHealthItem
                icon={<AlertCircle className="size-4.5 text-amber-600 dark:text-amber-400 shrink-0" />}
                label="Redirects"
                value={report.linkMetrics.redirects}
                bgClass="bg-amber-500/10 border border-amber-500/20 text-amber-950 dark:text-amber-200"
                textClass="text-foreground"
                badgeVariant="secondary"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card shadow-2xs">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold tracking-tight text-foreground">
              External Domain Authority
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Top external domains you&apos;re linking to
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2.5">
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
  badgeClassName?: string;
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
  badgeClassName,
}: LinkHealthItemProps) {
  return (
    <div className={cn("flex items-center justify-between p-3 rounded-lg transition-colors", bgClass)}>
      <div className="flex items-center gap-2.5">
        {icon}
        <span className={cn("text-sm font-medium leading-none", textClass)}>{label}</span>
      </div>
      <Badge variant={badgeVariant} className={cn("font-semibold shadow-2xs", badgeClassName)}>
        {value}
      </Badge>
    </div>
  );
}

type ExternalDomain = {
  domain: string;
  links: number;
};

export function ExternalDomainRow({ domain }: { domain: ExternalDomain }) {
  return (
    <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-card shadow-2xs transition-all hover:border-primary/30">
      <span className="text-sm font-medium text-foreground truncate pr-2">{domain.domain}</span>
      <Badge variant="outline" className="font-semibold text-muted-foreground border-border shadow-2xs shrink-0">
        {domain.links} {domain.links === 1 ? "link" : "links"}
      </Badge>
    </div>
  );
}
