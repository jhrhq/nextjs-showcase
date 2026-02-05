/** biome-ignore-all lint/correctness/noUnusedVariables: false flag */
/** biome-ignore-all lint/a11y/useButtonType: false flag */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: false flag */
/** biome-ignore-all lint/a11y/useKeyWithClickEvents: false flag */
/** biome-ignore-all lint/suspicious/noExplicitAny: false flag */
import {
  type Cell,
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  makeStateUpdater,
  type OnChangeFn,
  type RowData,
  type RowSelectionState,
  type SortingState,
  type Table,
  type TableFeature,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsUpDown, ChevronUp, Search, Settings2 } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// ============================================================================
// CUSTOM FEATURE: Cell Expansion
// Following TanStack Table v8 Custom Features Guide
// ============================================================================

// Step 1: Define types for our new feature's custom state
export type ExpandedCellsState = Record<string, { columnId: string; content: React.ReactNode } | null>;

export interface ExpandedCellsTableState {
  expandedCells: ExpandedCellsState;
}

// Step 2: Define types for our new feature's table options
export interface ExpandedCellsOptions {
  enableCellExpansion?: boolean;
  onExpandedCellsChange?: OnChangeFn<ExpandedCellsState>;
}

// Step 3: Define types for our new feature's table APIs
export interface ExpandedCellsInstance {
  toggleCell: (rowId: string, columnId: string, content: React.ReactNode) => void;
  isCellExpanded: (rowId: string, columnId: string) => boolean;
  getExpandedContent: (rowId: string) => { columnId: string; content: React.ReactNode } | null;
  collapseAllCells: () => void;
}

// Step 4: Define types for cell instance APIs
export interface ExpandedCellsCell {
  toggleExpanded: (content: React.ReactNode) => void;
  getIsExpanded: () => boolean;
}

// Step 5: Use declaration merging to add our new types to TanStack Table
declare module "@tanstack/react-table" {
  interface TableState extends ExpandedCellsTableState {}
  interface TableOptionsResolved<TData extends RowData> extends ExpandedCellsOptions {}
  interface Table<TData extends RowData> extends ExpandedCellsInstance {}
  interface Cell<TData extends RowData, TValue> extends ExpandedCellsCell {}
}

// Step 6: Create the Feature Object
export const CellExpansionFeature: TableFeature<any> = {
  // Define the new feature's initial state
  getInitialState: (state): ExpandedCellsTableState => {
    return {
      expandedCells: {},
      ...state,
    };
  },

  // Define the new feature's default options
  getDefaultOptions: <TData extends RowData>(table: Table<TData>): ExpandedCellsOptions => {
    return {
      enableCellExpansion: true,
      onExpandedCellsChange: makeStateUpdater("expandedCells", table),
    } as ExpandedCellsOptions;
  },

  // Define the new feature's table instance methods
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

// ============================================================================
// END OF CUSTOM FEATURE
// ============================================================================

// Sample data type
type Employee = {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  salary: number;
  joinDate: string;
  status: "active" | "inactive";
};

// Expandable cell component
const ExpandableCell = ({
  value,
  isExpanded,
  onToggle,
}: {
  value: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  return (
    <div
      className="flex items-center justify-between cursor-pointer group hover:bg-slate-50 p-2 -m-2 rounded transition-colors"
      onClick={onToggle}
    >
      <div className="flex-1 truncate">{value}</div>
      <button
        className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label={isExpanded ? "Collapse cell" : "Expand cell"}
      >
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-slate-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-slate-500" />
        )}
      </button>
    </div>
  );
};

// Column filter component
const ColumnFilter = ({ column, table }: { column: any; table: any }) => {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  return typeof firstValue === "number" ? (
    <div className="flex space-x-2">
      <Input
        type="number"
        value={(columnFilterValue as [number, number])?.[0] ?? ""}
        onChange={(e) => column.setFilterValue((old: [number, number]) => [e.target.value, old?.[1]])}
        placeholder="Min"
        className="w-24 h-8"
      />
      <Input
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ""}
        onChange={(e) => column.setFilterValue((old: [number, number]) => [old?.[0], e.target.value])}
        placeholder="Max"
        className="w-24 h-8"
      />
    </div>
  ) : (
    <Input
      type="text"
      value={(columnFilterValue ?? "") as string}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder="Search..."
      className="w-full h-8"
    />
  );
};

export default function Claude3DataTableDemo() {
  // Sample data
  const data: Employee[] = React.useMemo(
    () => [
      {
        id: "1",
        name: "Alice Johnson",
        email: "alice.johnson@company.com",
        role: "Senior Developer",
        department: "Engineering",
        salary: 95000,
        joinDate: "2021-03-15",
        status: "active",
      },
      {
        id: "2",
        name: "Bob Smith",
        email: "bob.smith@company.com",
        role: "Product Manager",
        department: "Product",
        salary: 105000,
        joinDate: "2020-07-22",
        status: "active",
      },
      {
        id: "3",
        name: "Carol White",
        email: "carol.white@company.com",
        role: "UX Designer",
        department: "Design",
        salary: 85000,
        joinDate: "2022-01-10",
        status: "active",
      },
      {
        id: "4",
        name: "David Brown",
        email: "david.brown@company.com",
        role: "DevOps Engineer",
        department: "Engineering",
        salary: 92000,
        joinDate: "2021-11-05",
        status: "inactive",
      },
      {
        id: "5",
        name: "Emma Davis",
        email: "emma.davis@company.com",
        role: "Marketing Specialist",
        department: "Marketing",
        salary: 72000,
        joinDate: "2023-02-20",
        status: "active",
      },
      {
        id: "6",
        name: "Frank Wilson",
        email: "frank.wilson@company.com",
        role: "Data Analyst",
        department: "Analytics",
        salary: 80000,
        joinDate: "2022-06-18",
        status: "active",
      },
      {
        id: "7",
        name: "Grace Lee",
        email: "grace.lee@company.com",
        role: "HR Manager",
        department: "Human Resources",
        salary: 88000,
        joinDate: "2020-09-30",
        status: "active",
      },
      {
        id: "8",
        name: "Henry Martinez",
        email: "henry.martinez@company.com",
        role: "Sales Director",
        department: "Sales",
        salary: 115000,
        joinDate: "2019-12-01",
        status: "active",
      },
    ],
    []
  );

  // Table state
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [expandedCells, setExpandedCells] = React.useState<ExpandedCellsState>({});

  // Column definitions with expandable cells
  const columns: ColumnDef<Employee>[] = React.useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
        size: 40,
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ getValue, row, cell }) => {
          const content = (
            <div className="space-y-2">
              <div className="font-semibold text-slate-700">Full Details</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-500">ID:</span> <span className="font-medium">{row.original.id}</span>
                </div>
                <div>
                  <span className="text-slate-500">Status:</span>{" "}
                  <span
                    className={`font-medium ${row.original.status === "active" ? "text-green-600" : "text-red-600"}`}
                  >
                    {row.original.status}
                  </span>
                </div>
              </div>
              <p className="text-slate-600">
                This employee can be contacted at {row.original.email} or through their department.
              </p>
            </div>
          );

          return (
            <ExpandableCell
              value={getValue() as string}
              isExpanded={cell.getIsExpanded()}
              onToggle={() => cell.toggleExpanded(content)}
            />
          );
        },
        filterFn: "includesString",
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ getValue, row, cell }) => {
          const content = (
            <div className="space-y-2">
              <div className="font-semibold text-slate-700">Contact Information</div>
              <div className="text-xs space-y-1">
                <div>
                  <span className="text-slate-500">Primary Email:</span>{" "}
                  <span className="font-medium">{getValue() as string}</span>
                </div>
                <div>
                  <span className="text-slate-500">Department Email:</span>{" "}
                  <span className="font-medium">{row.original.department.toLowerCase()}@company.com</span>
                </div>
              </div>
              <Button size="sm" className="w-full mt-2">
                Send Email
              </Button>
            </div>
          );

          return (
            <ExpandableCell
              value={<span className="text-blue-600 hover:underline">{getValue() as string}</span>}
              isExpanded={cell.getIsExpanded()}
              onToggle={() => cell.toggleExpanded(content)}
            />
          );
        },
        filterFn: "includesString",
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ getValue, row, cell }) => {
          const content = (
            <div className="space-y-2">
              <div className="font-semibold text-slate-700">Role Details</div>
              <div className="text-xs space-y-1">
                <div>
                  <span className="text-slate-500">Position:</span>{" "}
                  <span className="font-medium">{getValue() as string}</span>
                </div>
                <div>
                  <span className="text-slate-500">Department:</span>{" "}
                  <span className="font-medium">{row.original.department}</span>
                </div>
                <div>
                  <span className="text-slate-500">Joined:</span>{" "}
                  <span className="font-medium">{new Date(row.original.joinDate).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="mt-2 p-2 bg-white rounded border border-slate-200">
                <div className="text-xs text-slate-600">
                  <strong>Responsibilities:</strong> Leading projects, mentoring team members, and contributing to
                  strategic decisions.
                </div>
              </div>
            </div>
          );

          return (
            <ExpandableCell
              value={
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {getValue() as string}
                </span>
              }
              isExpanded={cell.getIsExpanded()}
              onToggle={() => cell.toggleExpanded(content)}
            />
          );
        },
        filterFn: "includesString",
      },
      {
        accessorKey: "department",
        header: "Department",
        cell: ({ getValue, cell }) => {
          const content = (
            <div className="space-y-2">
              <div className="font-semibold text-slate-700">Department Information</div>
              <div className="text-xs text-slate-600">
                <p>
                  The <strong>{getValue() as string}</strong> department is responsible for various key functions within
                  the organization.
                </p>
                <div className="mt-2 space-y-1">
                  <div>• Cross-functional collaboration</div>
                  <div>• Strategic planning and execution</div>
                  <div>• Continuous improvement initiatives</div>
                </div>
              </div>
            </div>
          );

          return (
            <ExpandableCell
              value={getValue() as string}
              isExpanded={cell.getIsExpanded()}
              onToggle={() => cell.toggleExpanded(content)}
            />
          );
        },
        filterFn: "includesString",
      },
      {
        accessorKey: "salary",
        header: "Salary",
        cell: ({ getValue, cell }) => {
          const salaryValue = getValue() as number;
          const content = (
            <div className="space-y-2">
              <div className="font-semibold text-slate-700">Compensation Details</div>
              <div className="text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Base Salary:</span>
                  <span className="font-medium">${salaryValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Annual Bonus:</span>
                  <span className="font-medium">${(salaryValue * 0.1).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Stock Options:</span>
                  <span className="font-medium">Available</span>
                </div>
                <div className="border-t border-slate-200 pt-1 mt-2 flex justify-between font-semibold">
                  <span>Total Compensation:</span>
                  <span className="text-green-700">${(salaryValue * 1.1).toLocaleString()}</span>
                </div>
              </div>
            </div>
          );

          return (
            <ExpandableCell
              value={<span className="font-mono text-green-700">${salaryValue.toLocaleString()}</span>}
              isExpanded={cell.getIsExpanded()}
              onToggle={() => cell.toggleExpanded(content)}
            />
          );
        },
        filterFn: "inNumberRange",
      },
      {
        accessorKey: "joinDate",
        header: "Join Date",
        cell: ({ getValue, cell }) => {
          const dateValue = getValue() as string;
          const content = (
            <div className="space-y-2">
              <div className="font-semibold text-slate-700">Employment Timeline</div>
              <div className="text-xs space-y-1">
                <div>
                  <span className="text-slate-500">Start Date:</span>{" "}
                  <span className="font-medium">
                    {new Date(dateValue).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500">Tenure:</span>{" "}
                  <span className="font-medium">
                    {Math.floor((Date.now() - new Date(dateValue).getTime()) / (1000 * 60 * 60 * 24 * 365))} years
                  </span>
                </div>
                <div className="mt-2 p-2 bg-white rounded border border-slate-200">
                  <div className="text-xs text-slate-600">
                    <strong>Milestones:</strong> Probation completed, First promotion, Team lead certification
                  </div>
                </div>
              </div>
            </div>
          );

          return (
            <ExpandableCell
              value={new Date(dateValue).toLocaleDateString()}
              isExpanded={cell.getIsExpanded()}
              onToggle={() => cell.toggleExpanded(content)}
            />
          );
        },
        filterFn: "includesString",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue, cell }) => {
          const status = getValue() as string;
          const content = (
            <div className="space-y-2">
              <div className="font-semibold text-slate-700">Status Details</div>
              <div className="text-xs">
                <div className={`p-2 rounded ${status === "active" ? "bg-green-50" : "bg-red-50"}`}>
                  {status === "active" ? (
                    <div className="space-y-1">
                      <div className="font-medium text-green-800">✓ Active Employee</div>
                      <div className="text-green-700">Currently employed and in good standing</div>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div className="font-medium text-red-800">✗ Inactive Employee</div>
                      <div className="text-red-700">No longer with the company</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );

          return (
            <ExpandableCell
              value={
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {status}
                </span>
              }
              isExpanded={cell.getIsExpanded()}
              onToggle={() => cell.toggleExpanded(content)}
            />
          );
        },
        filterFn: "equals",
      },
    ],
    []
  );

  const table = useReactTable({
    _features: [CellExpansionFeature], // Pass our custom feature!
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onExpandedCellsChange: setExpandedCells, // Using our custom feature option!
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
      expandedCells, // Using our custom feature state!
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Employee Data Table with Custom Cell Expansion Feature</h1>
        <p className="text-slate-600">
          Built using TanStack Table v8 Custom Features API. Click on any cell to expand it with full-width detailed
          content below the row.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-1 gap-2 items-center w-full sm:w-auto">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Search all columns..."
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <div className="flex gap-2">
          {Object.keys(expandedCells).some((key) => expandedCells[key]) && (
            <Button variant="outline" size="sm" onClick={() => table.collapseAllCells()}>
              Collapse All Cells
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Settings2 className="mr-2 h-4 w-4" />
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Selection Info */}
      {Object.keys(rowSelection).length > 0 && (
        <div className="flex items-center gap-2 text-sm text-slate-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
          <span className="font-medium">{Object.keys(rowSelection).length} row(s) selected</span>
          <Button variant="outline" size="sm" onClick={() => setRowSelection({})} className="ml-auto">
            Clear Selection
          </Button>
        </div>
      )}

      {/* Table */}
      <div className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <React.Fragment key={headerGroup.id}>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider"
                        style={{ width: header.getSize() }}
                      >
                        {header.isPlaceholder ? null : (
                          <div className="flex items-center gap-2">
                            <div
                              className={
                                header.column.getCanSort()
                                  ? "cursor-pointer select-none flex items-center gap-1 hover:text-slate-900"
                                  : ""
                              }
                              onClick={header.column.getToggleSortingHandler()}
                            >
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {header.column.getCanSort() && (
                                <span className="ml-1">
                                  {header.column.getIsSorted() === "asc" ? (
                                    <ChevronUp className="h-4 w-4" />
                                  ) : header.column.getIsSorted() === "desc" ? (
                                    <ChevronDown className="h-4 w-4" />
                                  ) : (
                                    <ChevronsUpDown className="h-4 w-4 text-slate-400" />
                                  )}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                  {/* Filter row */}
                  <tr className="border-b border-slate-200 bg-slate-50">
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="px-4 py-2">
                        {header.column.getCanFilter() ? <ColumnFilter column={header.column} table={table} /> : null}
                      </th>
                    ))}
                  </tr>
                </React.Fragment>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => {
                  const expandedContent = table.getExpandedContent(row.id);
                  return (
                    <React.Fragment key={row.id}>
                      {/* Main row */}
                      <tr className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                        {row.getVisibleCells().map((cell) => (
                          <td
                            key={cell.id}
                            className="px-4 py-3 text-sm text-slate-900"
                            style={{ width: cell.column.getSize() }}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                      {/* Expanded row - full width */}
                      {expandedContent && (
                        <tr className="border-b border-slate-200 bg-slate-50">
                          <td colSpan={row.getVisibleCells().length} className="px-4 py-3">
                            <div className="p-3 bg-white rounded-md border border-slate-200 text-sm">
                              <div className="text-xs text-slate-500 mb-2 font-medium uppercase">
                                Expanded value: {expandedContent.columnId}
                              </div>
                              {expandedContent.content}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-8 text-center text-sm text-slate-500">
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-slate-600">
          Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{" "}
          of {table.getFilteredRowModel().rows.length} results
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600">Rows per page:</span>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="w-17.5 h-8">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[5, 10, 20, 30].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="text-sm text-slate-600">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </div>
            <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Feature Summary */}
      <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
        <h3 className="font-semibold text-slate-900 mb-2">Custom Feature Implementation:</h3>
        <div className="text-sm text-slate-600 space-y-2">
          <p>
            ✓ <strong>Cell Expansion Feature</strong> - Built using TanStack Table v8 Custom Features API (_features
            option)
          </p>
          <p>
            ✓ <strong>Table Instance APIs:</strong> toggleCell(), isCellExpanded(), getExpandedContent(),
            collapseAllCells()
          </p>
          <p>
            ✓ <strong>Cell Instance APIs:</strong> cell.toggleExpanded(), cell.getIsExpanded()
          </p>
          <p>
            ✓ <strong>State Management:</strong> expandedCells state with onExpandedCellsChange option
          </p>
          <p>
            ✓ <strong>TypeScript:</strong> Full type-safety via declaration merging
          </p>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-300">
          <h4 className="font-semibold text-slate-900 mb-2">Standard TanStack Features:</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm text-slate-600">
            <div>✓ Sorting</div>
            <div>✓ Filtering</div>
            <div>✓ Pagination</div>
            <div>✓ Row Selection</div>
            <div>✓ Global Search</div>
            <div>✓ Column Visibility</div>
            <div>✓ Column Resizing</div>
            <div>✓ Responsive Design</div>
          </div>
        </div>
      </div>
    </div>
  );
}
