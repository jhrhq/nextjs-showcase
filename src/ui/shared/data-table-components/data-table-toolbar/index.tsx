import type { Table } from "@tanstack/react-table";
import { DataTableCollapseAll } from "@/ui/shared/data-table-components/data-table-toolbar/data-table-collapse-all";
import { DataTableColumnToggle } from "@/ui/shared/data-table-components/data-table-toolbar/data-table-column-toggle";
import { DataTableSearch } from "@/ui/shared/data-table-components/data-table-toolbar/data-table-search";
import { TableToolbar } from "@/ui/shared/data-table-components/data-table-toolbar/data-table-toolbar-compound";

interface ExpansionControls {
  canCollapseAll: boolean;
  collapseAll: () => void;
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  expansion?: ExpansionControls;
  leftActions?: React.ReactNode;
  rightActions?: React.ReactNode;
}
export default function DataTableToolBar<TData>({
  table,
  globalFilter,
  setGlobalFilter,
  expansion,
  leftActions,
  rightActions,
}: DataTableToolbarProps<TData>) {
  return (
    <TableToolbar>
      <TableToolbar.Left>
        <DataTableSearch value={globalFilter} onChange={setGlobalFilter} placeholder="Search users..." />

        {/* custom left actions */}
        {leftActions}
      </TableToolbar.Left>

      <TableToolbar.Right>
        {expansion?.canCollapseAll && (
          <DataTableCollapseAll canCollapse={expansion?.canCollapseAll} onCollapse={expansion?.collapseAll} />
        )}
        {rightActions}
        <DataTableColumnToggle table={table} />
      </TableToolbar.Right>
    </TableToolbar>
  );
}
