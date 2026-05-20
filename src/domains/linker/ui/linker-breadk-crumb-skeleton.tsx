"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";

export default function LinkerSBreadcrumbsSkeleton() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((item) => item !== "");

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        {/* Static Base Dashboard Item */}
        <BreadcrumbItem>
          <span className="text-sm text-muted-foreground/60">Dashboard</span>
        </BreadcrumbItem>

        {segments.map((segment, index) => {
          const lowerSegment = segment.toLowerCase();

          if (lowerSegment === "linker" || lowerSegment === "dashboard") {
            return null;
          }

          return (
            <React.Fragment key={index}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {/* Renders a shimmering text block skeleton matching your font scale */}
                <Skeleton className="h-4 w-20 bg-muted/60" />
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
