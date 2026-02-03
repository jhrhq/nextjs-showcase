import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { SecurityCheck } from "@/domains/linker/types/site-report.types";
import { DataTable } from "@/ui/shared/data-table";
import { securityAuditColumns } from "./security-audit.columns";

type SecurityAuditTableProps = {
  data: SecurityCheck[];
};

export function SecurityAuditTable({ data }: SecurityAuditTableProps) {
  const table = useReactTable({
    data,
    columns: securityAuditColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Audit</CardTitle>
        <CardDescription>Security headers and SSL configuration</CardDescription>
      </CardHeader>

      <CardContent>
        <DataTable table={table} emptyMessage="No security audit data found" />
      </CardContent>
    </Card>
  );
}
