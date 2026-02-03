import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import type { TopLinkingPage } from "@/domains/linker/types/site-report.types";

export const topLinkingPagesColumns: ColumnDef<TopLinkingPage>[] = [
  {
    accessorKey: "url",
    header: "Page URL",
    cell: ({ row }) => <div className="font-medium max-w-md truncate">{row.getValue("url")}</div>,
  },
  {
    accessorKey: "internalLinks",
    header: "Internal Links",
    cell: ({ row }) => <Badge variant="default">{row.getValue("internalLinks")}</Badge>,
  },
  {
    accessorKey: "externalLinks",
    header: "External Links",
    cell: ({ row }) => <Badge variant="secondary">{row.getValue("externalLinks")}</Badge>,
  },
  {
    accessorKey: "totalLinks",
    header: "Total",
    cell: ({ row }) => <span className="font-semibold">{row.getValue("totalLinks")}</span>,
  },
];
