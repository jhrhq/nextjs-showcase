"use client";

import { FileQuestion, Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function InternalLinkManagementEmpty() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      {/* Header Section */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-blue-500">Internal Link Management</h2>
        <p className="text-muted-foreground">
          Manage interconnected page relationships to strengthen site structure, and improve SEO performance.
        </p>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <span>Building Your Application</span>
        <span>/</span>
        <span>Data Fetching</span>
      </div>

      {/* Stats Cards - Empty State */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-muted-foreground">Total Nodes</div>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-muted-foreground">Fully Linked</div>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-muted-foreground">In Progress</div>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-muted-foreground">Not Started</div>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <Input placeholder="Filter pages..." className="h-10 w-[300px]" disabled />
          <Button variant="outline" size="sm" disabled>
            <Filter className="mr-2 h-4 w-4" />
            State
          </Button>
          <Button variant="outline" size="sm" disabled>
            <Filter className="mr-2 h-4 w-4" />
            Child Status
          </Button>
        </div>
        <Button variant="outline" size="sm" disabled>
          Expand All
        </Button>
      </div>

      {/* Empty Table State */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Page URL</TableHead>
              <TableHead>Appears In</TableHead>
              <TableHead>Link Composition</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={6} className="h-[400px]">
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                    <FileQuestion className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold">No pages found</h3>
                  <p className="mb-4 max-w-sm text-sm text-muted-foreground">
                    Get started by creating your first internal link or importing existing pages.
                  </p>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First Page
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Pagination - Empty State */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">0 of 0 rows</div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
