"use client";

import React from "react";
import { useProjects } from "@/domains/linker/hooks/use-projects";
import type { ProjectStatus } from "@/domains/linker/types/project.types";
import { DeleteProjectDialog } from "@/domains/linker/ui/dashboard/delete-project-dialog";
import { ProjectGrid } from "@/domains/linker/ui/dashboard/project-grid";
import { ProjectsHeader } from "@/domains/linker/ui/dashboard/project-header";

// import GihubPagination from "@/app/(spa)/linker/_components/github-issue-pagination";
export type SortOrder = "none" | "asc" | "desc";

export default function DashboardPage() {
  const { data, isPending, isError, error } = useProjects();

  const [deleteId, setDeleteId] = React.useState<string | null>(null);
  const [tab, setTab] = React.useState<"all" | ProjectStatus>("all");
  const [sort, setSort] = React.useState<SortOrder>("none");

  const visibleProjects = React.useMemo(() => {
    let tabData = tab === "all" ? data : data?.filter((p) => p.status === tab);

    if (sort !== "none") {
      tabData = tabData?.slice().sort((a, b) => {
        return sort === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      });
    }

    return tabData;
  }, [data, sort, tab]);

  function handleDelete(id: string) {
    setDeleteId(id);
  }

  if (isPending) return "Loading...";

  if (isError) {
    return <div className="text-red-600">{(error as Error).message || "Something went wrong"}</div>;
  }

  if (!data?.length) {
    return <div className="text-muted-foreground">No projects found</div>;
  }

  return (
    <div>
      <main className="flex-1 space-y-6 mt-6">
        <div>
          <h1 className="text-2xl font-semibold">Projects List</h1>
          <p className="text-sm text-muted-foreground">Here is a list of projects that you have created</p>
        </div>
        <ProjectsHeader projects={data} tab={tab} sort={sort} onTabChange={setTab} onSortChange={setSort} />
        {visibleProjects && <ProjectGrid projects={visibleProjects} onEdit={() => {}} onDelete={handleDelete} />}
      </main>
      {/* <GihubPagination /> */}
      <DeleteProjectDialog
        open={!!deleteId}
        onCancel={() => setDeleteId(null)}
        onConfirm={() => {
          if (!deleteId) return;
          alert(`delete project ${deleteId}`);
          setDeleteId(null);
        }}
      />
    </div>
  );
}
