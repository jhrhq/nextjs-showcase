"use client";

import { AudioWaveform, Command, GalleryVerticalEnd, Projector, Settings2 } from "lucide-react";
import type * as React from "react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { AUTH_CONFIG } from "@/domains/linker/constants/auth.constants";
import { NavMain } from "@/ui/shared/nav-main";
import { NavUser } from "@/ui/shared/nav-user";
import { NavProjects } from "./nav-projects";
import { TeamSwitcher } from "./team-switcher";

// This is sample data.
const data = {
  user: {
    name: "mock user",
    email: "m@example.com",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: `${AUTH_CONFIG.ROUTES.DASHBOARD}${AUTH_CONFIG.ROUTES.SETTINGS}`,
        },
      ],
    },
  ],
  projects: [
    {
      name: "Projects",
      url: `${AUTH_CONFIG.ROUTES.DASHBOARD}`,
      icon: Projector,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
