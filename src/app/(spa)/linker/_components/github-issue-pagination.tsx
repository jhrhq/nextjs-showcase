import { useSuspenseQuery } from "@tanstack/react-query";
import * as React from "react";
import type { GithubIssue } from "@/app/(spa)/linker/_components/github-issue-card";
import { IssueList } from "@/app/(spa)/linker/_components/issue-list";
import { GithubPagination } from "@/app/(spa)/linker/_components/pagination";

function GithubIssuePagination() {
  const [page, setPage] = React.useState(2);
  const [data] = useGithubIssues({ page });

  return (
    <div className="container mx-auto">
      <IssueList issues={data} />
      <GithubPagination page={page} onPageChange={setPage} />
    </div>
  );
}

function useGithubIssues(props: { page: number }) {
  const query = useSuspenseQuery({
    queryKey: ["paginationTest", props.page],
    queryFn: async () => {
      // const path = `/api/wait?wait=${props.wait}`
      const url = `https://api.github.com/repositories/1300192/issues?per_page=${props.page}&page=${props.page}`;

      const res = await (
        await fetch(url, {
          cache: "no-store",
        })
      ).json();
      return res;
    },
  });

  return [query.data as GithubIssue[], query] as const;
}

export default function GihubPagination() {
  return (
    <React.Suspense fallback={<div>waiting 100....</div>}>
      <GithubIssuePagination />
    </React.Suspense>
  );
}
