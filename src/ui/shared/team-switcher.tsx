"use client";

import { Projector } from "lucide-react";

export function TeamSwitcher() {
  return (
    <div className="bg-sidebar-accent text-sidebar-accent-foreground flex items-center gap-2">
      <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center ">
        {/*<activeTeam.logo className="size-4" />*/}
        <Projector className="size-4" />
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight bg-sidebar-accent text-sidebar-accent-foreground">
        <span className="truncate font-medium">Linker</span>
      </div>
    </div>
  );
}
