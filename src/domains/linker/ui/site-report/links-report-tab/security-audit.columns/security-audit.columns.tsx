import type { ColumnDef } from "@tanstack/react-table";
import type { SecurityCheck } from "@/domains/linker/types/site-report.types";
import { getStatusIcon } from "@/domains/linker/utils";

export const securityAuditColumns: ColumnDef<SecurityCheck>[] = [
  {
    accessorKey: "feature",
    header: "Security Feature",
    cell: ({ row }) => <span className="font-medium">{row.getValue("feature")}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => getStatusIcon(row.getValue("status")),
  },
  {
    accessorKey: "details",
    header: "Details",
    cell: ({ row }) => <span className="text-sm text-gray-600">{row.getValue("details")}</span>,
  },
];
