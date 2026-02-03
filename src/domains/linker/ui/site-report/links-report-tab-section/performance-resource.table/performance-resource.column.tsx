import type { ColumnDef } from "@tanstack/react-table";
import { Progress } from "@/components/ui/progress";
import type { PerformanceResource } from "@/domains/linker/types/site-report.types";

export const performanceResourceColumns: ColumnDef<PerformanceResource>[] = [
  {
    accessorKey: "type",
    header: "Resource Type",
    cell: ({ row }) => <span className="font-medium">{row.getValue("type")}</span>,
  },
  {
    accessorKey: "count",
    header: "Count",
  },
  {
    accessorKey: "size",
    header: "Total Size",
  },
  {
    accessorKey: "percentage",
    header: "% of Total",
    cell: ({ row }) => {
      const value = row.getValue<number>("percentage");

      return (
        <div className="flex items-center gap-2">
          <Progress value={value} className="h-2 w-20" />
          <span className="text-sm">{value}%</span>
        </div>
      );
    },
  },
];
