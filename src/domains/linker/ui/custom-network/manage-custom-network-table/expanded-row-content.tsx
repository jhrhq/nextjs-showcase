import type { Row, Table } from "@tanstack/react-table";
import React from "react";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { NestedStatusBadge } from "./columns";
import type { NestedLinkData, RegistryRowData } from "./data";

interface ExpandedRowContentProps {
  row: Row<RegistryRowData>;
  table: Table<RegistryRowData>;
}

export const ExpandedRowContent = ({ row, table }: ExpandedRowContentProps) => {
  const globalFilter = (table.getState().globalFilter as string) ?? "";
  const statusFilter = table.getColumn("nestedStatus")?.getFilterValue() as string[];

  // 1. Synchronized Filtering Logic
  const filteredChildren = React.useMemo(() => {
    return (row.original.nestedData ?? []).filter((child) => {
      const search = globalFilter.toLowerCase();

      const matchesStatus = !statusFilter?.length || statusFilter.includes(child.status);
      const matchesSearch =
        !search || [child.title, child.url, child.anchor].some((v) => v?.toLowerCase().includes(search));

      return matchesStatus && matchesSearch;
    });
  }, [row.original.nestedData, globalFilter, statusFilter]);

  // 2. Action Buttons Helper
  const renderActions = (child: NestedLinkData) => {
    return (
      <div className="flex items-center justify-end gap-1">
        {child.isUnlinked && (
          <Button variant="link" size="sm" className="h-7 hover:no-underline text-xs px-2.5 font-bold text-blue-600">
            Add Link
          </Button>
        )}
        {child.isStale && !child.isUnlinked && (
          <Button variant="secondary" size="sm" className="h-7 bg-transparent border-none text-xs px-2.5 font-bold">
            Refresh
          </Button>
        )}
        {!child.isUnlinked && !child.isStale && (
          <Button
            variant="link"
            size="sm"
            className="h-7 text-xs px-2.5 text-rose-400 hover:text-destructive hover:no-underline font-bold"
          >
            Remove
          </Button>
        )}
      </div>
    );
  };

  return (
    <TableRow className="bg-slate-50/30 border-none hover:bg-slate-50/30">
      <TableCell colSpan={row.getVisibleCells().length} className="p-4">
        <div className="border border-slate-200 bg-white shadow-sm overflow-hidden">
          {/* Sub-Header */}
          <div className="flex items-center justify-between border-b bg-slate-50/50 px-4 py-2">
            <div className="text-[10px] font-bold uppercase text-blue-600 flex items-center gap-2">
              <span className="text-xs">🔗</span> Target Links for {row.original.url}
            </div>
            <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-100 font-mono">
              Showing {filteredChildren.length} of {row.original.nestedData?.length ?? 0}
            </span>
          </div>

          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-[10px] uppercase text-slate-400 border-b">
              <tr>
                <th className="px-4 py-2 font-semibold">Page Title & URL</th>
                <th className="px-4 py-2 font-semibold">Anchor Text</th>
                <th className="px-4 py-2 font-semibold">Status</th>
                <th className="px-4 py-2 text-right font-semibold pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredChildren.length > 0 ? (
                filteredChildren.map((child) => (
                  <tr key={child.id} className="text-sm group/child hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-bold text-slate-800">{child.title}</div>
                      <div className="text-xs text-blue-500 truncate max-w-50">{child.url}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-500 italic text-xs">
                      {child.anchor ? `"${child.anchor}"` : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <NestedStatusBadge status={child.status} />
                    </td>
                    <td className="px-4 py-3 text-right pr-6">{renderActions(child)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-2xl opacity-50">🔍</span>
                      <p className="text-xs text-slate-400 font-medium">
                        No links in this row match your current filters.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </TableCell>
    </TableRow>
  );
};
