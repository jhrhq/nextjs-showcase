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
    <Card className="border border-border bg-card shadow-2xs overflow-hidden">
      <CardContent className="flex items-center justify-between p-4">
        <div>
          <p className="text-xs font-medium text-muted-foreground">Indexed Pages</p>
          <p className="text-2xl font-semibold tracking-tight text-foreground mt-0.5">{indexed.toLocaleString()}</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-medium text-muted-foreground">of {total.toLocaleString()}</p>
          <p className="text-lg font-semibold text-foreground">{percentage.toFixed(1)}%</p>
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
    <Card className="border border-border bg-card shadow-2xs rounded-lg">
      <CardContent className="p-3">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="text-xl font-semibold tracking-tight text-foreground mt-0.5">
          {typeof value === "number" ? value.toLocaleString() : value}
        </p>
      </CardContent>
    </Card>
  );
}
