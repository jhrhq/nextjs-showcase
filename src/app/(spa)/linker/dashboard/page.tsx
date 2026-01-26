"use client";

import React from "react";
import { useProjects } from "@/domains/linker/hooks/use-projects";
import { DeleteProjectDialog } from "@/domains/linker/ui/dashboard/delete-project-dialog";
import { Header, ProjectsTabs } from "@/domains/linker/ui/dashboard/other";
import { ProjectGrid } from "@/domains/linker/ui/dashboard/project-grid";

// import GihubPagination from "@/app/(spa)/linker/_components/github-issue-pagination";

export default function DashboardPage() {
  const { data, isPending, isError, error } = useProjects();

  const [deleteId, setDeleteId] = React.useState<string | null>(null);

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
    <div className="container mx-auto p-8">
      {/* <h1 className="text-3xl font-bold"> Dashboard</h1> */}
      <main className="flex-1 space-y-6">
        <Header />
        <ProjectsTabs projects={data}></ProjectsTabs>
        <ProjectGrid projects={data} onEdit={() => {}} onDelete={handleDelete} />
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
