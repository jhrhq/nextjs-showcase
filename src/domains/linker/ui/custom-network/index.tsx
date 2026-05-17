/** biome-ignore-all lint/a11y/useSemanticElements: false flag for group */

"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { AUTH_CONFIG } from "../../constants/auth.constants";
import { useCustomNetworkStructures } from "../../hooks/use-projects";

import { QueryErrorState } from "../../query-error-state";

import CreateNetworkItemCard from "./create-custom-network-card";
import CustomNetworkSkeletonPage from "./custom-network-skeleton-page";
import CustomNetworks from "./custom-networks";

type ViewMode = "empty" | "filled";

function EmptyIllustration() {
  const spokes: [number, number][] = [
    [68, 38],
    [232, 38],
    [46, 106],
    [254, 106],
    [96, 135],
    [204, 135],
  ];

  return (
    <figure aria-hidden="true" className="relative mb-8">
      <svg viewBox="0 0 300 160" className="mx-auto h-auto w-64 opacity-40">
        <title>empty illustration</title>

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

function EmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="flex flex-col items-center pt-4">
      <EmptyIllustration />

      <div className="w-full max-w-sm">
        <CreateNetworkItemCard onClick={onCreate} isEmpty={true} />
      </div>

      <p className="mt-5 max-w-xs text-center text-xs text-muted-foreground/60">
        Start by creating your first network — define a hub URL and connect all related pages to build a strong internal
        linking structure.
      </p>
    </div>
  );
}

interface PageHeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

function PageHeader({ viewMode, onViewModeChange }: PageHeaderProps) {
  return (
    <header className="sticky top-12 z-40 border-b py-4 backdrop-blur-md">
      <div className="flex flex-col items-center justify-between gap-4">
        <ToggleGroup
          type="single"
          value={viewMode}
          onValueChange={(value) => {
            if (value) {
              onViewModeChange(value as ViewMode);
            }
          }}
          className="flex self-end gap-1 border p-1"
        >
          <ToggleGroupItem
            value="empty"
            aria-label="Toggle empty state"
            className="h-7 px-3 text-xs font-medium data-[state=off]:bg-transparent data-[state=off]:hover:bg-muted/50 data-[state=on]:bg-primary/10 data-[state=on]:text-primary data-[state=on]:shadow-sm"
          >
            Create
          </ToggleGroupItem>

          <ToggleGroupItem
            value="filled"
            aria-label="Toggle network items"
            className="h-7 px-3 text-xs font-medium data-[state=off]:bg-transparent data-[state=off]:hover:bg-muted/50 data-[state=on]:bg-primary/10 data-[state=on]:text-primary data-[state=on]:shadow-sm"
          >
            Networks
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </header>
  );
}

export default function NetworkItemPage() {
  const router = useRouter();

  const { projectId } = useParams<{
    projectId: string;
  }>();

  const query = useCustomNetworkStructures(projectId);

  const [viewMode, setViewMode] = useState<ViewMode>("filled");

  const createNetworkItemPath = `${AUTH_CONFIG.ROUTES.DASHBOARD}/${projectId}${AUTH_CONFIG.ROUTES.CUSTOM_NETWORK}${AUTH_CONFIG.ROUTES.CREATE_CUSTOM_NETWORK}`;

  const networks = query.data?.customNetworks ?? [];

  const hasNetworks = networks.length > 0;

  const handleCreateNetworkItem = () => {
    router.push(createNetworkItemPath);
  };

  const handleNavigateNetwork = (customNetworkId: string) => {
    router.push(`${AUTH_CONFIG.ROUTES.DASHBOARD}/${projectId}/${AUTH_CONFIG.ROUTES.CUSTOM_NETWORK}/${customNetworkId}`);
  };

  return (
    <>
      <PageHeader viewMode={viewMode} onViewModeChange={setViewMode} />

      {viewMode === "empty" ? (
        <EmptyState onCreate={handleCreateNetworkItem} />
      ) : (
        <>
          <div className="mb-8">
            <h1 className="text-[28px] font-bold tracking-tight">
              Your Network Items
              {hasNetworks && (
                <span className="ms-3 text-base font-normal text-muted-foreground">
                  {networks.length} cluster
                  {networks.length !== 1 ? "s" : ""}
                </span>
              )}
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Organize URLs into networked clusters for powerful internal linking.
            </p>
          </div>

          {query.isFetching && <CustomNetworkSkeletonPage />}

          {query.isError && <QueryErrorState query={query} />}

          {!query.isFetching && !query.isError && !hasNetworks && <EmptyState onCreate={handleCreateNetworkItem} />}

          {hasNetworks && <CustomNetworks networks={networks} onNavigateCustomNetwork={handleNavigateNetwork} />}
        </>
      )}
    </>
  );
}
