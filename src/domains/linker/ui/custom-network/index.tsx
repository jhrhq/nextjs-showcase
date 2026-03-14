/** biome-ignore-all lint/a11y/useSemanticElements: false flag for group */
"use client";

import { Link } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AUTH_CONFIG } from "../../constants/auth.constants";
import CreateNetworkItemCard from "./create-custom-network-card";
import CustomNetworks from "./custom-networks";

// ─── Domain types ─────────────────────────────────────────────────────────────

interface Page {
  id: string;
  slug: string;
  label: string;
  url: string;
}

interface NetworkItem {
  id: string;
  name: string;
  date: string;
  seedCount: number;
  pages: Page[];
}

type ViewMode = "empty" | "filled";

const NETWORKS: NetworkItem[] = [
  {
    id: "net-1",
    name: "Main Site",
    date: "2024-11-03",
    seedCount: 0,
    pages: [
      { id: "1", slug: "/home", label: "Home", url: "https://acme.com/" },
      {
        id: "2",
        slug: "/about",
        label: "About",
        url: "https://acme.com/about",
      },
      {
        id: "3",
        slug: "/services",
        label: "Services",
        url: "https://acme.com/services",
      },
      { id: "4", slug: "/blog", label: "Blog", url: "https://acme.com/blog" },
      {
        id: "5",
        slug: "/contact",
        label: "Contact",
        url: "https://acme.com/contact",
      },
      {
        id: "6",
        slug: "/pricing",
        label: "Pricing",
        url: "https://acme.com/pricing",
      },
    ],
  },
  {
    id: "net-2",
    name: "Blog Cluster",
    date: "2024-12-14",
    seedCount: 6,
    pages: [
      {
        id: "1",
        slug: "/blog/seo",
        label: "SEO Guide",
        url: "https://acme.com/blog/seo",
      },
      {
        id: "2",
        slug: "/blog/links",
        label: "Int. Linking",
        url: "https://acme.com/blog/links",
      },
      {
        id: "3",
        slug: "/blog/content",
        label: "Content",
        url: "https://acme.com/blog/content",
      },
      {
        id: "4",
        slug: "/blog/analytics",
        label: "Analytics",
        url: "https://acme.com/blog/analytics",
      },
    ],
  },
  {
    id: "net-3",
    name: "Product Pages",
    date: "2025-01-22",
    seedCount: 999,
    pages: [
      {
        id: "1",
        slug: "/products/starter",
        label: "Starter",
        url: "https://acme.com/products/starter",
      },
      {
        id: "2",
        slug: "/products/pro",
        label: "Pro",
        url: "https://acme.com/products/pro",
      },
      {
        id: "3",
        slug: "/products/agency",
        label: "Agency",
        url: "https://acme.com/products/agency",
      },
    ],
  },
];

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
      <div className=" flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-xl bg-primary flex items-center justify-center">
            <Link className="size-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-[17px] tracking-tight">NetworkItemLink</span>
          <span className="text-muted-foreground text-sm hidden sm:inline">/&ensp;Workspace</span>
        </div>

        {/* Demo toggle */}
        <div role="group" aria-label="Toggle demo state" className="flex items-center gap-1  border p-1">
          {(["empty", "filled"] as const).map((mode) => (
            <Button
              key={mode}
              variant={viewMode === mode ? "default-lighter" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange(mode)}
              aria-pressed={viewMode === mode}
              className="h-7  px-3 text-xs font-medium capitalize"
            >
              {mode === "empty" ? "Empty State" : "With NetworkItems"}
            </Button>
          ))}
        </div>
      </div>
    </header>
  );
}

export default function NetworkItemPage() {
  const router = useRouter();
  const params = useParams();

  const [networks, setNetworkItems] = useState<NetworkItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<ViewMode>("empty");

  const createNetworkItemPath = `${AUTH_CONFIG.ROUTES.DASHBOARD}/${params.projectId}${AUTH_CONFIG.ROUTES.CUSTOM_NETWORK}${AUTH_CONFIG.ROUTES.CREATE_CUSTOM_NETWORK}`;

  useEffect(() => {
    setLoading(true);

    const timer = window.setTimeout(() => {
      setNetworkItems(viewMode === "filled" ? NETWORKS : []);
      setLoading(false);
    }, 900);

    return () => window.clearTimeout(timer);
  }, [viewMode]);

  // const handleNetworkItemClick = useCallback((network: NetworkItem) => {
  //   console.info("[NetworkItemPage] selected:", network.id);
  // }, []);

  const handleCreateNetworkItem = () => router.push(createNetworkItemPath);

  const isEmpty = !loading && networks.length === 0;
  const hasNetworkItems = !loading && networks.length > 0;
  return (
    <>
      <PageHeader viewMode={viewMode} onViewModeChange={setViewMode} />
      {/* Page title */}
      <div className="mb-8">
        <h1 className="text-[28px] font-bold tracking-tight">
          Your NetworkItems
          {hasNetworkItems && (
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

      {/* Loading skeletons */}
      {loading && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <NetworkItemSkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {isEmpty && (
        <div className="flex flex-col items-center pt-4">
          <EmptyIllustration />
          <div className="w-full max-w-sm">
            <CreateNetworkItemCard onClick={handleCreateNetworkItem} isEmpty={isEmpty} />
          </div>
          <p className="mt-5 max-w-xs text-center text-xs text-muted-foreground/60">
            Start by creating your first network — define a hub URL and connect all related pages to build a strong
            internal linking structure.
          </p>
        </div>
      )}

      {/* Filled state */}
      {hasNetworkItems && <CustomNetworks networks={networks} />}
    </>
  );
}
