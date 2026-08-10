"use client";

import { Link2 } from "lucide-react";

export function TeamSwitcher() {
  return (
    <div className="flex items-center gap-2.5 group">
      <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
        <Link2 className="size-5 stroke-[2.5]" />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-lg tracking-tight text-foreground">Linker</span>
      </div>
    </div>
  );
}
