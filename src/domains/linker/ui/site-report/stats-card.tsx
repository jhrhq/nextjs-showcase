import type { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatsCardProps = {
  icon?: ReactNode;
  title: string;
  value: number | string;
  valueClassName?: string;
  footer?: ReactNode | string;
};

export function StatsCard({ icon, title, value, valueClassName = "text-slate-900", footer }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardDescription className="flex items-center gap-2">
          {icon}
          {title}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className={cn("text-3xl font-bold", valueClassName)}>
          {typeof value === "number" ? value.toLocaleString() : value}
        </div>

        {footer && <div className="text-xs text-slate-500 mt-1">{footer}</div>}
      </CardContent>
    </Card>
  );
}
