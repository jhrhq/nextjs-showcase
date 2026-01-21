// components/issue-list.tsx
"use client";

import { type GithubIssue, IssueCard } from "./github-issue-card";

type Props = {
  issues: GithubIssue[];
  pageSize?: number;
};

export function IssueList({ issues }: Props) {
  return (
    <div className="space-y-4">
      {issues.map((issue) => (
        <IssueCard key={issue.id} issue={issue} />
      ))}
    </div>
  );
}
