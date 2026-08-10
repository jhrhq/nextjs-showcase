"use client";

import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { SiteReport } from "@/domains/linker/types/site-report.types";
import { SecurityAuditTable } from "@/domains/linker/ui/site-report/links-report-tab-section/security-audit.columns/security-audit.table";
import { cn } from "@/lib/utils";

export function SecurityTab({ report }: { report: SiteReport }) {
  const hasCriticalIssues = report.security.some((item) => item.status === "fail");

  return (
    <div className="space-y-4 pt-2">
      <SecurityAuditTable data={report.security} />

      {hasCriticalIssues && (
        <Alert variant="destructive" className="border-destructive/30 bg-destructive/10 text-destructive">
          <AlertCircle className="size-4 text-destructive" />
          <AlertTitle className="text-sm font-semibold">Security Issues Detected</AlertTitle>
          <AlertDescription className="text-xs text-destructive/90">
            Critical vulnerabilities require immediate attention.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SecurityCard label="SSL Certificate" value="Valid" icon="success" />
        <SecurityCard label="HTTPS" value="Enabled" icon="success" />
        <SecurityCard label="Mixed Content" value="3 Issues" icon="warning" />
      </div>
    </div>
  );
}

function SecurityCard({ label, value, icon }: { label: string; value: string; icon: "success" | "warning" }) {
  const isSuccess = icon === "success";
  const Icon = isSuccess ? CheckCircle2 : AlertCircle;

  return (
    <Card className="border border-border bg-card shadow-2xs">
      <CardHeader className="p-4 pb-1">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
      </CardHeader>
      <CardContent className="p-4 pt-1 flex items-center gap-2">
        <Icon
          className={cn(
            "size-5 shrink-0",
            isSuccess ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"
          )}
        />
        <span className="text-lg font-semibold tracking-tight text-foreground">{value}</span>
      </CardContent>
    </Card>
  );
}
