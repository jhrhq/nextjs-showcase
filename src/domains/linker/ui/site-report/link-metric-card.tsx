"use client";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

type LinkMetricItemProps = {
  label: string;
  value: number;
  total: number;
  badgeVariant: "default" | "secondary" | "destructive";
  footerText: string;
};

export default function LinkMetricItem({ label, value, total, badgeVariant, footerText }: LinkMetricItemProps) {
  const percentage = (value / total) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <Badge variant={badgeVariant}>{value.toLocaleString()}</Badge>
      </div>

      <Progress value={percentage} className="h-2" />

      <p className="text-xs text-gray-500">
        {percentage.toFixed(1)}% {footerText}
      </p>
    </div>
  );
}
