"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { AUTH_CONFIG } from "@/domains/linker/constants/auth.constants";
import { useProjects } from "@/domains/linker/hooks/use-projects";
import { QueryErrorState } from "@/domains/linker/query-error-state";
import type { ProjectStatus } from "@/domains/linker/types/project.types";
import { DeleteProjectDialog } from "@/domains/linker/ui/dashboard/delete-project-dialog";
import { ProjectsEmpty } from "@/domains/linker/ui/dashboard/project-empty";
import { ProjectGrid } from "@/domains/linker/ui/dashboard/project-grid";
import { ProjectsHeader } from "@/domains/linker/ui/dashboard/project-header";
import { ProjectsListSkeleton } from "@/domains/linker/ui/dashboard/project-list-skeleton";

export type SortOrder = "none" | "asc" | "desc";

export default function DashboardPage() {
  const query = useProjects();
  const router = useRouter();

  const [deleteId, setDeleteId] = React.useState<string | null>(null);
  const [tab, setTab] = React.useState<"all" | ProjectStatus>("all");
  const [sort, setSort] = React.useState<SortOrder>("none");

  const visibleProjects = React.useMemo(() => {
    let tabData = tab === "all" ? query.data : query.data?.filter((p) => p.status === tab);

    if (sort !== "none") {
      tabData = tabData?.slice().sort((a, b) => {
        return sort === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      });
    }

    return tabData;
  }, [query.data, sort, tab]);

  function handleEdit(projectId: string) {
    router.push(`${AUTH_CONFIG.ROUTES.DASHBOARD}/${projectId}/${AUTH_CONFIG.ROUTES.SETTINGS}`);
  }

  function handleDelete(id: string) {
    setDeleteId(id);
  }

  if (query.isLoading) {
    return <ProjectsListSkeleton />;
  }
  if (query.isError) {
    return <QueryErrorState query={query} />;
  }

  if (!query.data || query.data.length === 0) {
    return <ProjectsEmpty />;
  }

  return (
    <>
      <main className="flex-1 space-y-6 mt-6">
        <div>
          <h1 className="text-2xl font-semibold">Projects List</h1>
          <p className="text-sm text-muted-foreground">Here is a list of projects that you have created</p>
        </div>
        <ProjectsHeader projects={query.data} tab={tab} sort={sort} onTabChange={setTab} onSortChange={setSort} />
        {visibleProjects && <ProjectGrid projects={visibleProjects} onEdit={handleEdit} onDelete={handleDelete} />}
      </main>
      {/* <GihubPagination /> */}
      <DeleteProjectDialog
        open={!!deleteId}
        onCancel={() => setDeleteId(null)}
        onConfirm={() => {
          if (!deleteId) return;
          // alert(`delete project ${deleteId}`);
          // setDeleteId(null);
        }}
        projectId={deleteId}
      />
    </>
  );
}
