import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import type { SiteReport } from "@/domains/linker/types/site-report.types";
import { SecurityAuditTable } from "@/domains/linker/ui/site-report/links-report-tab-section/security-audit.columns/security-audit.table";

export function SecurityTab({ report }: { report: SiteReport }) {
  const hasCriticalIssues = report.security.some((item) => item.status === "fail");

  return (
    <div className="space-y-4 p-6">
      <SecurityAuditTable data={report.security} />

      {hasCriticalIssues && (
        <Alert variant="destructive">
          <AlertCircle />
          <AlertTitle>Security Issues Detected</AlertTitle>
          <AlertDescription>Critical vulnerabilities require immediate attention.</AlertDescription>
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
  const Icon = icon === "success" ? CheckCircle2 : AlertCircle;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardDescription>{label}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-2">
        <Icon className="size-6" />
        <span className="font-semibold">{value}</span>
      </CardContent>
    </Card>
  );
}
