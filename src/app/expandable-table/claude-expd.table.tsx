/** biome-ignore-all lint/a11y/useKeyWithClickEvents: false flag */
/** biome-ignore-all lint/a11y/useButtonType: false flag */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: false flag */
"use client";
import {
  type ColumnDef,
  type ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type RowSelectionState,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Search, Settings2 } from "lucide-react";
import React from "react";
import TableComponent from "@/app/expandable-table/table-component";
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
const ExpandableCell = ({ value, expandedContent }: { value: React.ReactNode; expandedContent: React.ReactNode }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className="relative">
      <div
        className="flex items-center justify-between cursor-pointer group hover:bg-slate-50 p-2 -m-2 rounded transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex-1 truncate">{value}</div>
        <button
          className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label={isExpanded ? "Collapse cell" : "Expand cell"}
        >
          {isExpanded ? <ChevronUp className=" text-slate-500" /> : <ChevronDown className=" text-slate-500" />}
        </button>
      </div>
      {isExpanded && (
        <div className="mt-2 p-3 bg-slate-50 rounded-md border border-slate-200 text-sm">{expandedContent}</div>
      )}
    </div>
  );
};

const data: Employee[] = [
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
];
// Column definitions with expandable cells
const columns: ColumnDef<Employee>[] = [
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
    cell: ({ getValue, row }) => (
      <ExpandableCell
        value={getValue() as string}
        expandedContent={
          <div className="space-y-2">
            <div className="font-semibold text-slate-700">Full Details</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-500">ID:</span> <span className="font-medium">{row.original.id}</span>
              </div>
              <div>
                <span className="text-slate-500">Status:</span>{" "}
                <span className={`font-medium ${row.original.status === "active" ? "text-green-600" : "text-red-600"}`}>
                  {row.original.status}
                </span>
              </div>
            </div>
            <p className="text-slate-600">
              This employee can be contacted at {row.original.email} or through their department.
            </p>
          </div>
        }
      />
    ),
    filterFn: "includesString",
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ getValue, row }) => (
      <ExpandableCell
        value={<span className="text-blue-600 hover:underline">{getValue() as string}</span>}
        expandedContent={
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
        }
      />
    ),
    filterFn: "includesString",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ getValue, row }) => (
      <ExpandableCell
        value={
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {getValue() as string}
          </span>
        }
        expandedContent={
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
        }
      />
    ),
    filterFn: "includesString",
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ getValue }) => (
      <ExpandableCell
        value={getValue() as string}
        expandedContent={
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
        }
      />
    ),
    filterFn: "includesString",
  },
  {
    accessorKey: "salary",
    header: "Salary",
    cell: ({ getValue }) => (
      <ExpandableCell
        value={<span className="font-mono text-green-700">${(getValue() as number).toLocaleString()}</span>}
        expandedContent={
          <div className="space-y-2">
            <div className="font-semibold text-slate-700">Compensation Details</div>
            <div className="text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Base Salary:</span>
                <span className="font-medium">${(getValue() as number).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Annual Bonus:</span>
                <span className="font-medium">${((getValue() as number) * 0.1).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Stock Options:</span>
                <span className="font-medium">Available</span>
              </div>
              <div className="border-t border-slate-200 pt-1 mt-2 flex justify-between font-semibold">
                <span>Total Compensation:</span>
                <span className="text-green-700">${((getValue() as number) * 1.1).toLocaleString()}</span>
              </div>
            </div>
          </div>
        }
      />
    ),
    filterFn: "inNumberRange",
  },
  {
    accessorKey: "joinDate",
    header: "Join Date",
    cell: ({ getValue }) => (
      <ExpandableCell
        value={new Date(getValue() as string).toLocaleDateString()}
        expandedContent={
          <div className="space-y-2">
            <div className="font-semibold text-slate-700">Employment Timeline</div>
            <div className="text-xs space-y-1">
              <div>
                <span className="text-slate-500">Start Date:</span>{" "}
                <span className="font-medium">
                  {new Date(getValue() as string).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div>
                <span className="text-slate-500">Tenure:</span>{" "}
                <span className="font-medium">
                  {Math.floor((Date.now() - new Date(getValue() as string).getTime()) / (1000 * 60 * 60 * 24 * 365))}{" "}
                  years
                </span>
              </div>
              <div className="mt-2 p-2 bg-white rounded border border-slate-200">
                <div className="text-xs text-slate-600">
                  <strong>Milestones:</strong> Probation completed, First promotion, Team lead certification
                </div>
              </div>
            </div>
          </div>
        }
      />
    ),
    filterFn: "includesString",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue() as string;
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
          expandedContent={
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
          }
        />
      );
    },
    filterFn: "equals",
  },
];
export default function ClaudesDataTableDemo() {
  // Table state
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
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
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
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
        <h1 className="text-3xl font-bold text-slate-900">Employee Data Table from Claude</h1>
        <p className="text-slate-600">
          Click on any cell to expand and view detailed information. Includes sorting, filtering, pagination, and more.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-1 gap-2 items-center w-full sm:w-auto">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5  text-slate-500" />
            <Input
              placeholder="Search all columns..."
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <Settings2 className="mr-2 " />
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
          <TableComponent table={table} />{" "}
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
              <ChevronLeft />
              Previous
            </Button>
            <div className="text-sm text-slate-600">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </div>
            <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              Next
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
