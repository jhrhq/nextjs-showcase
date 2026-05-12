/** biome-ignore-all lint/a11y/useSemanticElements: false flag for group */
"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AUTH_CONFIG } from "../../constants/auth.constants";
import { useCustomNetworkStructures } from "../../hooks/use-projects";
import CreateNetworkItemCard from "./create-custom-network-card";
import CustomNetworks from "./custom-networks";

type ViewMode = "empty" | "filled";

function NetworkItemSkeletonCard() {
  return (
    <Card className="p-5 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-20 rounded-full" />
          <Skeleton className="h-5 w-40 rounded-md" />
        </div>
        <Skeleton className="size-17 rounded-full shrink-0" />
      </div>
      <Skeleton className="h-9 w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-28 rounded-full" />
        <Skeleton className="h-3 w-36 rounded-full" />
        <Skeleton className="h-3 w-32 rounded-full" />
      </div>
    </Card>
  );
}

function EmptyIllustration() {
  type Spoke = [number, number];
  const spokes: Spoke[] = [
    [68, 38],
    [232, 38],
    [46, 106],
    [254, 106],
    [96, 135],
    [204, 135],
  ];

  return (
    <figure aria-hidden="true" className="relative mb-8">
      <svg viewBox="0 0 300 160" className="w-64 h-auto opacity-40 mx-auto">
        <title id="empty illustration">empty illustration</title>
        {Array.from({ length: 6 }, (_, row) =>
          Array.from({ length: 10 }, (_, col) => (
            <circle
              key={`d${row}${col}`}
              cx={col * 30 + 15}
              cy={row * 27 + 5}
              r="1.5"
              fill="currentColor"
              className="text-muted-foreground"
            />
          ))
        )}
        {spokes.map(([x, y], i) => (
          <g key={`s${i}`}>
            <line
              x1="150"
              y1="80"
              x2={x}
              y2={y}
              stroke="currentColor"
              className="text-border"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
            <circle
              cx={x}
              cy={y}
              r="7"
              fill="hsl(var(--card))"
              stroke="currentColor"
              className="text-border"
              strokeWidth="1.5"
              strokeDasharray="3 2"
            />
            <circle cx={x} cy={y} r="3" fill="hsl(var(--muted))" />
          </g>
        ))}
        <circle cx="150" cy="80" r="18" fill="hsl(var(--primary))" stroke="hsl(var(--primary) / 0.6)" strokeWidth="2" />
        <circle cx="150" cy="80" r="8" fill="hsl(var(--primary-foreground))" />
      </svg>
      <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />
    </figure>
  );
}

interface PageHeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

function PageHeader({ viewMode, onViewModeChange }: PageHeaderProps) {
  return (
    <header className="sticky top-12 z-40 border-b backdrop-blur-md py-4">
      <div className=" flex flex-col items-center justify-between gap-4">
        <ToggleGroup
          type="single"
          value={viewMode}
          onValueChange={(val) => val && onViewModeChange(val as "empty" | "filled")}
          className="flex self-end items-center gap-1 border p-1"
        >
          {(["empty", "filled"] as const).map((mode) => (
            <ToggleGroupItem
              key={mode}
              value={mode}
              className="h-7 px-3 text-xs font-medium capitalize
                data-[state=on]:bg-primary/10 data-[state=on]:text-primary data-[state=on]:shadow-sm
                data-[state=off]:bg-transparent data-[state=off]:hover:bg-muted/50"
              aria-label={`Toggle ${mode === "empty" ? "empty state" : "network items"}`}
            >
              {mode === "empty" ? "Create" : "Networks"}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </header>
  );
}

export default function NetworkItemPage() {
  const router = useRouter();
  const params = useParams<{ projectId: string }>();
  const { data, isFetching } = useCustomNetworkStructures(params.projectId);
  const [viewMode, setViewMode] = useState<ViewMode>("filled");

  const createNetworkItemPath = `${AUTH_CONFIG.ROUTES.DASHBOARD}/${params.projectId}${AUTH_CONFIG.ROUTES.CUSTOM_NETWORK}${AUTH_CONFIG.ROUTES.CREATE_CUSTOM_NETWORK}`;
  const navigateNetworkItemPath = (customNetowrkId: string) =>
    router.push(
      `${AUTH_CONFIG.ROUTES.DASHBOARD}/${params.projectId}/${AUTH_CONFIG.ROUTES.CUSTOM_NETWORK}/${customNetowrkId}`
    );

  const handleCreateNetworkItem = () => router.push(createNetworkItemPath);
  return (
    <>
      <PageHeader viewMode={viewMode} onViewModeChange={setViewMode} />

      {viewMode === "empty" ? (
        <div className="flex flex-col items-center pt-4">
          <EmptyIllustration />
          <div className="w-full max-w-sm">
            <CreateNetworkItemCard onClick={handleCreateNetworkItem} isEmpty={true} />
          </div>
          <p className="mt-5 max-w-xs text-center text-xs text-muted-foreground/60">
            Start by creating your first network — define a hub URL and connect all related pages to build a strong
            internal linking structure.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <h1 className="text-[28px] font-bold tracking-tight">
              Your NetworkItems
              {data && data.customNetworks.length > 0 && (
                <span className="ms-3 text-base font-normal text-muted-foreground">
                  {data.customNetworks.length} cluster
                  {data.customNetworks.length !== 1 ? "s" : ""}
                </span>
              )}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Organize URLs into networked clusters for powerful internal linking.
            </p>
          </div>
          {isFetching && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <NetworkItemSkeletonCard key={i} />
              ))}
            </div>
          )}

          {(!data || data.customNetworks.length) === 0 && (
            <div className="flex flex-col items-center pt-4">
              <EmptyIllustration />
              <div className="w-full max-w-sm">
                <CreateNetworkItemCard onClick={handleCreateNetworkItem} isEmpty={true} />
              </div>
              <p className="mt-5 max-w-xs text-center text-xs text-muted-foreground/60">
                Start by creating your first network — define a hub URL and connect all related pages to build a strong
                internal linking structure.
              </p>
            </div>
          )}

          {data && <CustomNetworks networks={data.customNetworks} onNavigateCustomNetwork={navigateNetworkItemPath} />}
        </>
      )}
    </>
  );
}
