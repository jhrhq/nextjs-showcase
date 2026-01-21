// types/github.ts
export type GithubIssue = {
  id: number;
  number: number;
  title: string;
  state: "open" | "closed";
  html_url: string;
  created_at: string;
  user: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
};

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
// components/issue-card.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  issue: GithubIssue;
};

export function IssueCard({ issue }: Props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={issue.user.avatar_url} />
          <AvatarFallback>{issue.user.login.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <CardTitle className="text-base">
            <a href={issue.html_url} target="_blank" className="hover:underline">
              #{issue.number} {issue.title}
            </a>
          </CardTitle>

          <div className="text-sm text-muted-foreground">
            by{" "}
            <a href={issue.user.html_url} target="_blank" className="hover:underline">
              {issue.user.login}
            </a>
          </div>
        </div>

        <Badge variant={issue.state === "open" ? "default" : "secondary"}>{issue.state}</Badge>
      </CardHeader>

      <CardContent className="text-sm text-muted-foreground">
        Created {new Date(issue.created_at).toLocaleDateString()}
      </CardContent>
    </Card>
  );
}
