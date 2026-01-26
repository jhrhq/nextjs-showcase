"use client";
import { Bell, ChevronDown, Download, Moon, Plus, SlidersHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ProjectDTO } from "@/domains/linker/validations/projects.validations";

/* ================= TOPBAR ================= */

export function Topbar() {
  return (
    <header className="flex items-center justify-between border-b bg-background px-6 py-3">
      <div className="flex items-center gap-2 px-3">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Data Fetching</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-4">
        <Button size="icon" variant="ghost">
          <Moon className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost">
          <Bell className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage />
              <AvatarFallback>C</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">Columbus</span>
            <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

/* ================= HEADER ================= */

export function Header() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold">Projects List 📌</h1>
        <p className="text-sm text-muted-foreground">Here is a list of projects that you have created</p>
      </div>

      <div className="flex items-center gap-2">
        <AvatarGroup />
        <Button variant="outline" className="rounded-none">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>
    </div>
  );
}

/* ================= AVATAR GROUP ================= */

export function AvatarGroup({ small }: { small?: boolean }) {
  return (
    <div className="flex -space-x-2">
      {[1, 2, 3].map((i) => (
        <Avatar key={i} className={small ? "h-6 w-6" : "h-8 w-8"}>
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}
type ProjectTabProps = {
  projects: ProjectDTO[];
  // children: React.ReactNode;
};
export function ProjectsTabs({ projects }: ProjectTabProps) {
  const totlaProjects = projects.length;
  const activeProjects = projects.filter((project) => project.status === "active").length;
  const pendingProjects = projects.filter((project) => project.status === "pending").length;
  return (
    <div className="flex items-center justify-between border-b p-3 bg-white">
      <Tabs defaultValue="todo">
        <TabsList className="bg-transparent p-0">
          <TabsTrigger
            value="todo"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            All
            <Badge variant="secondary" className="ml-2">
              {totlaProjects}
            </Badge>
          </TabsTrigger>

          <TabsTrigger
            value="in-progress"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Active
            <Badge variant="secondary" className="ml-2">
              {activeProjects}
            </Badge>
          </TabsTrigger>

          <TabsTrigger
            value="completed"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Pending
            <Badge variant="secondary" className="ml-2">
              {pendingProjects}
            </Badge>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex gap-2">
        <Button variant="outline" className="rounded-none">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filter & Sort
        </Button>
        <Button className="rounded-none">
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
    </div>
  );
}
