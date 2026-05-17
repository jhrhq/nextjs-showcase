"use client";

import type { UseQueryResult } from "@tanstack/react-query";
import { AlertTriangle, RefreshCw } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type QueryErrorStateProps<TData = unknown> = {
  query: Pick<UseQueryResult<TData>, "error" | "isError" | "refetch" | "failureCount">;

  title?: string;
  description?: string;
  retryLabel?: string;
  className?: string;

  /**
   * Optional custom content under the error card
   */
  children?: ReactNode;
};

export function QueryErrorState<TData>({
  query,
  title = "Failed to load data",
  description = "Something went wrong while fetching data. Please try again.",
  retryLabel = "Retry Request",
  className,
  children,
}: QueryErrorStateProps<TData>) {
  if (!query.isError) return null;

  const errorMessage = query.error instanceof Error ? query.error.message : "Unknown error occurred";

  return (
    <div className={className}>
      <Card className="border-destructive/20">
        <CardHeader className="place-content-center text-center">
          <div className="flex items-center justify-center">
            <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-7 w-7 text-destructive" />
            </div>
          </div>

          <CardTitle>{title}</CardTitle>

          <CardDescription className="max-w-md">{description}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Error Info */}
          <div className=" border bg-muted/40 p-4">
            <div className="space-y-3 text-sm">
              <div className="flex items-start justify-between gap-4">
                <span className="font-medium text-muted-foreground">Error</span>

                <span className="max-w-[70%] text-right font-mono text-destructive wrap-break-words">
                  {errorMessage}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-medium text-muted-foreground">Retry Attempts</span>

                <span className="font-mono">{query.failureCount}</span>
              </div>
            </div>
          </div>
          {/* Actions */}
          <div className="flex justify-center">
            <Button onClick={() => query.refetch()}>
              <RefreshCw className="mr-2 h-4 w-4" />
              {retryLabel}
            </Button>
          </div>
          {children}
        </CardContent>
      </Card>
    </div>
  );
}
