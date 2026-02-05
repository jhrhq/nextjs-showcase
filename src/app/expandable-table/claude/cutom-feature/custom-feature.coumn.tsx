/** biome-ignore-all lint/a11y/useKeyWithClickEvents: false flag */
/** biome-ignore-all lint/a11y/useButtonType: false flag */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: false flag */
import type { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

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

// Column definitions with expandable cells
export const customFeatureColumns: ColumnDef<Employee>[] = [
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
              <span className={`font-medium ${row.original.status === "active" ? "text-green-600" : "text-red-600"}`}>
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
          <div className="mt-2 p-2 bg-white border border-slate-200">
            <div className="text-xs text-slate-600">
              <strong>Responsibilities:</strong> Leading projects, mentoring team members, and contributing to strategic
              decisions.
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
              The <strong>{getValue() as string}</strong> department is responsible for various key functions within the
              organization.
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
            <div className="mt-2 p-2 bg-white border border-slate-200">
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
            <div className={`p-2 ${status === "active" ? "bg-green-50" : "bg-red-50"}`}>
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
];

function ExpandableCell({
  value,
  isExpanded,
  onToggle,
}: {
  value: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="flex items-center justify-between cursor-pointer group hover:bg-slate-50 p-2 -m-2 transition-colors"
      onClick={onToggle}
    >
      <div className="flex-1 truncate">{value}</div>
      <Button variant="link" className="text-slate-600" aria-label={isExpanded ? "Collapse cell" : "Expand cell"}>
        {isExpanded ? <ChevronUp /> : <ChevronDown />}
      </Button>
    </div>
  );
}

export const customFeatureData: Employee[] = [
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
