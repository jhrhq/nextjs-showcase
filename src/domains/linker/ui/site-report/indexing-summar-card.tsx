"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";

type IndexingSummaryProps = {
  indexed: number;
  total: number;
};

export function IndexingSummary({ indexed, total }: IndexingSummaryProps) {
  const percentage = React.useMemo(() => {
    if (!total) return 0;
    return (indexed / total) * 100;
  }, [indexed, total]);

  return (
    <Card className="overflow-hidden bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200/80 dark:border-zinc-800/80">
      <CardContent className="flex items-center justify-between p-4">
        <div>
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Indexed Pages</p>
          <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
            {indexed.toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-500">of {total.toLocaleString()}</p>
          <p className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">{percentage.toFixed(1)}%</p>
        </div>
      </CardContent>
    </Card>
  );
}

type IndexingStatBoxProps = {
  label: string;
  value: string | number;
};

export function IndexingStatBox({ label, value }: IndexingStatBoxProps) {
  return (
    <Card className="bg-transparent border border-zinc-200 dark:border-zinc-800 shadow-none rounded-md">
      <CardContent className="p-3">
        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{label}</p>
        <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight mt-0.5">
          {typeof value === "number" ? value.toLocaleString() : value}
        </p>
      </CardContent>
    </Card>
  );
}
