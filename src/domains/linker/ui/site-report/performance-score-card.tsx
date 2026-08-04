"use client";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getScoreColor, getScoreVariant } from "@/domains/linker/utils";
import { cn } from "@/lib/utils";

type PerformanceScoreItemProps = {
  label: string;
  score: number;
};

export default function PerformanceScoreItem({ label, score }: PerformanceScoreItemProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-400">{label}</span>
          <Badge variant={getScoreVariant(score)}>{score}</Badge>
        </div>

        <span className={cn("text-sm font-semibold", getScoreColor(score))}>{score}%</span>
      </div>

      <Progress value={score} className="h-2" />
    </div>
  );
}
