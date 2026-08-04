"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { TechnicalSeoMetric } from "@/domains/linker/types/site-report.types";
import { getStatusIcon } from "@/domains/linker/utils";

export const technicalSeoColumns: ColumnDef<TechnicalSeoMetric>[] = [
  {
    accessorKey: "metric",
    header: "Metric",
    cell: ({ row }) => <span className="font-medium">{row.getValue("metric")}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => getStatusIcon(row.getValue("status")),
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    accessorKey: "recommendation",
    header: "Recommendation",
    cell: ({ row }) => (
      <span className="text-sm text-gray-600 dark:text-gray-300">{row.getValue("recommendation")}</span>
    ),
  },
];
