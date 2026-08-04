"use client";

import { Plus } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CreateCustomNetworkCardProps {
  onClick: () => void;
  isEmpty: boolean;
}

const HINTS = [
  { dot: "bg-emerald-500", text: "Add a collection name" },
  { dot: "bg-blue-500", text: "Add related pages" },
  { dot: "bg-violet-500", text: "Auto-link your content" },
] as const;

export default function CreateCustomNetworkCard({ onClick, isEmpty }: CreateCustomNetworkCardProps) {
  return (
    <Card
      role="button"
      tabIndex={0}
      aria-label="Create new custom network"
      onClick={onClick}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => e.key === "Enter" && onClick()}
      className={cn(
        "group cursor-pointer border-2 border-dashed",
        "flex flex-col items-center justify-center text-center",
        "transition-all duration-300 outline-none",
        "hover:-translate-y-1 hover:shadow-xl hover:border-primary/50",
        "focus-visible:ring-2 focus-visible:ring-ring",
        isEmpty ? "min-h-85 p-10" : "min-h-65 p-8"
      )}
    >
      <div className="size-14 flex items-center justify-center mb-4 bg-primary/15 transition-all duration-300 group-hover:bg-primary group-hover:scale-110 group-hover:shadow-lg group-hover:text-white text-primary dark:text-white rounded-lg">
        <Plus className="size-7" />
      </div>

      <p className="text-[15px] font-semibold mb-1.5 transition-colors group-hover:text-primary">
        Create New Custom Network
      </p>

      <p className="text-sm text-muted-foreground leading-relaxed max-w-47.5">
        {isEmpty
          ? "Connect your URLs into a powerful internal linking structure"
          : "Add another URL cluster to your workspace"}
      </p>

      {isEmpty && (
        <ul className="mt-6 space-y-2.5" aria-label="Steps to create a custom network">
          {HINTS.map(({ dot, text }) => (
            <li key={text} className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className={`size-1.5 rounded-full ${dot} shrink-0`} />
              {text}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
