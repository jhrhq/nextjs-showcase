"use client";

import type React from "react";
import { Card, CardContent } from "@/components/ui/card";

export function TableToolbar({ children }: { children: React.ReactNode }) {
  return (
    <Card>
      <CardContent className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-4">
        {children}
      </CardContent>
    </Card>
  );
}
TableToolbar.Left = function ToolbarLeft({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-1 gap-2 items-center w-full sm:w-auto">{children}</div>;
};

TableToolbar.Right = function ToolbarRight({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-2 items-center">{children}</div>;
};
