/** biome-ignore-all lint/suspicious/noExplicitAny: false flag */
import {
  type Cell,
  makeStateUpdater,
  type OnChangeFn,
  type RowData,
  type Table,
  type TableFeature,
} from "@tanstack/react-table";

export type ExpandedCellsState = Record<string, { columnId: string; content: React.ReactNode } | null>;

export interface ExpandedCellsTableState {
  expandedCells: ExpandedCellsState;
}

export interface ExpandedCellsOptions {
  enableCellExpansion?: boolean;
  onExpandedCellsChange?: OnChangeFn<ExpandedCellsState>;
}

export interface ExpandedCellsInstance {
  toggleCell: (rowId: string, columnId: string, content: React.ReactNode) => void;
  isCellExpanded: (rowId: string, columnId: string) => boolean;
  getExpandedContent: (rowId: string) => { columnId: string; content: React.ReactNode } | null;
  collapseAllCells: () => void;
}

export interface ExpandedCellsCell {
  toggleExpanded: (content: React.ReactNode) => void;
  getIsExpanded: () => boolean;
}

declare module "@tanstack/react-table" {
  interface TableState extends ExpandedCellsTableState {}
  interface TableOptionsResolved<TData extends RowData> extends ExpandedCellsOptions {}
  interface Table<TData extends RowData> extends ExpandedCellsInstance {}
  interface Cell<TData extends RowData, TValue> extends ExpandedCellsCell {}
}

export const CellExpansionFeature: TableFeature<any> = {
  getInitialState: (state): ExpandedCellsTableState => {
    return {
      expandedCells: {},
      ...state,
    };
  },

  getDefaultOptions: <TData extends RowData>(table: Table<TData>): ExpandedCellsOptions => {
    return {
      enableCellExpansion: true,
      onExpandedCellsChange: makeStateUpdater("expandedCells", table),
    } as ExpandedCellsOptions;
  },

  createTable: <TData extends RowData>(table: Table<TData>): void => {
    table.toggleCell = (rowId, columnId, content) => {
      table.options.onExpandedCellsChange?.((old) => {
        const currentExpanded = old[rowId];
        // If clicking the same cell that's expanded, collapse it
        if (currentExpanded && currentExpanded.columnId === columnId) {
          return { ...old, [rowId]: null };
        }
        // Otherwise, expand this cell (and collapse any other in this row)
        return { ...old, [rowId]: { columnId, content } };
      });
    };

    table.isCellExpanded = (rowId, columnId) => {
      const expanded = table.getState().expandedCells[rowId];
      return expanded?.columnId === columnId;
    };

    table.getExpandedContent = (rowId) => {
      return table.getState().expandedCells[rowId] || null;
    };

    table.collapseAllCells = () => {
      table.options.onExpandedCellsChange?.({});
    };
  },

  // Define cell instance APIs
  createCell: <TData extends RowData>(cell: Cell<TData, unknown>, column: any, row: any, table: Table<TData>): void => {
    cell.toggleExpanded = (content: React.ReactNode) => {
      table.toggleCell(row.id, column.id, content);
    };

    cell.getIsExpanded = () => {
      return table.isCellExpanded(row.id, column.id);
    };
  },
};
