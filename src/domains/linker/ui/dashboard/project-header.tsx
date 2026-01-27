"use client";

import { Bell, ChevronDown, Moon, Plus, SlidersHorizontal } from "lucide-react";
import type { SortOrder } from "@/app/(spa)/linker/dashboard/page";
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
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ProjectStatus } from "@/domains/linker/types/project.types";
import type { ProjectDTO } from "@/domains/linker/validations/projects.validations";
import { cn } from "@/lib/utils";

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
type ProjectsHeaderProps = {
  projects: ProjectDTO[];
  tab: "all" | ProjectStatus;
  sort: SortOrder;
  onTabChange: (v: "all" | ProjectStatus) => void;
  onSortChange: (v: SortOrder) => void;
};

export function ProjectsHeader({ projects, tab, sort, onTabChange, onSortChange }: ProjectsHeaderProps) {
  const counts = {
    all: projects.length,
    active: projects.filter((p) => p.status === "active").length,
    pending: projects.filter((p) => p.status === "pending").length,
    inactive: projects.filter((p) => p.status === "inactive").length,
  };
  return (
    <div className="flex items-center justify-between px-6 h-16 bg-white">
      <ProjectsTabs value={tab} counts={counts} onChange={onTabChange} />
      <div className="flex gap-2">
        <ProjectsFilterSort sort={sort} onSortChange={onSortChange} />
        <Button className="rounded-none font-medium">
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
    </div>
  );
}

type ProjectTabProps = {
  value: ProjectStatus | "all";
  counts: Record<ProjectStatus | "all", number>;
  onChange: (v: ProjectStatus | "all") => void;
};

export function ProjectsTabs({ value, counts, onChange }: ProjectTabProps) {
  const items: (ProjectStatus | "all")[] = ["all", "active", "pending", "inactive"];

  return (
    <Tabs value={value} onValueChange={(v) => onChange(v as ProjectStatus | "all")}>
      <TabsList className="rounded-none h-auto bg-transparent p-0 gap-6">
        {items.map((k) => (
          <TabsTrigger
            key={k}
            value={k}
            className={cn(
              "rounded-none p-0 data-[state=active]:text-primary data-[state=active]:border-b-primary data-[state=active]:border-b-2 font-medium text-base h-16"
            )}
          >
            {k.charAt(0).toUpperCase() + k.slice(1)}
            <Badge variant={value === k ? "default" : "secondary"} className="ml-2 font-medium">
              {counts[k]}
            </Badge>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
export function ProjectsFilterSort({ sort, onSortChange }: { sort: SortOrder; onSortChange: (v: SortOrder) => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-none">
          <SlidersHorizontal className="mr-2 size-4 font-medium text-base text-slate-600" />
          Filter & Sort
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-52 font-medium text-base">
        <DropdownMenuLabel>Sort by name</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={sort} onValueChange={(v) => onSortChange(v as SortOrder)}>
          <DropdownMenuRadioItem value="none">No sorting</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="asc">Ascending</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="desc">Descending</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
