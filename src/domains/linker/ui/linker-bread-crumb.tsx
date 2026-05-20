"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useCustomNetworks, useProjects } from "../hooks/use-projects";
import LinkerSBreadcrumbsSkeleton from "./linker-breadk-crumb-skeleton";

export default function LinkerSBreadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((item) => item !== "");

  const { data: projects, isLoading: isProjectsLoading } = useProjects();

  const dashboardIndex = segments.findIndex((s) => s.toLowerCase() === "dashboard");
  const projectId = dashboardIndex !== -1 ? segments[dashboardIndex + 1] : "";

  const { data: networks, isLoading: isNetworksLoading } = useCustomNetworks(projectId);

  const getProjectName = (id: string) => {
    return projects?.find((p) => p.id === id)?.name;
  };

  const getNetworkName = (id: string) => {
    return networks?.customNetworks?.find((n) => n.id === id)?.collectionName;
  };

  if (isProjectsLoading || isNetworksLoading) {
    return <LinkerSBreadcrumbsSkeleton />;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/linker">Linker</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {segments.map((segment, index) => {
          if (segment.toLowerCase() === "linker") return null;

          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;

          const matchedProjectName = getProjectName(segment);
          const matchedNetworkName = getNetworkName(segment);

          let label = "";

          if (matchedProjectName) {
            label = matchedProjectName;
          } else if (matchedNetworkName) {
            label = matchedNetworkName;
          } else {
            label = segment.replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
          }

          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="max-w-37.5 truncate sm:max-w-none font-medium text-foreground">
                    {label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
