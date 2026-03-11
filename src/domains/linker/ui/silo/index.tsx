/** biome-ignore-all lint/a11y/useSemanticElements: false flag for group */
"use client";

import { ChevronRight, Link } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { type KeyboardEvent, useCallback, useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AUTH_CONFIG } from "../../constants/auth.constants";
import CreateSiloCard from "./create-silo-card";

// ─── Domain types ─────────────────────────────────────────────────────────────

type SiloStatus = "active" | "draft";

interface Silo {
  id: number;
  name: string;
  mainUrl: string;
  status: SiloStatus;
  linkedCount: number;
  lastUpdated: string;
  urls: string[];
}

type ViewMode = "empty" | "filled";

const MOCK_SILOS: Silo[] = [
  {
    id: 1,
    name: "SEO Blog Hub",
    mainUrl: "https://example.com/blog",
    status: "active",
    linkedCount: 8,
    lastUpdated: "2 hours ago",
    urls: [
      "https://example.com/blog/seo-tips",
      "https://example.com/blog/keyword-research",
      "https://example.com/blog/on-page-seo",
      "https://example.com/blog/backlinks",
      "https://example.com/blog/technical-seo",
      "https://example.com/blog/seo-audit",
      "https://example.com/blog/link-building",
      "https://example.com/blog/seo-tools",
    ],
  },
  {
    id: 2,
    name: "Product Documentation",
    mainUrl: "https://docs.example.com",
    status: "active",
    linkedCount: 5,
    lastUpdated: "1 day ago",
    urls: [
      "https://docs.example.com/getting-started",
      "https://docs.example.com/installation",
      "https://docs.example.com/configuration",
      "https://docs.example.com/api-reference",
      "https://docs.example.com/troubleshooting",
    ],
  },
  {
    id: 3,
    name: "E-commerce Shoes",
    mainUrl: "https://shop.example.com/shoes",
    status: "draft",
    linkedCount: 3,
    lastUpdated: "3 days ago",
    urls: [
      "https://shop.example.com/shoes/running",
      "https://shop.example.com/shoes/casual",
      "https://shop.example.com/shoes/formal",
    ],
  },
];

// ─── Network visualiser ───────────────────────────────────────────────────────

interface NetworkVisualizerProps {
  count: number;
}

function NetworkVisualizer({ count }: NetworkVisualizerProps) {
  type Point = { x: number; y: number };

  const slots = Math.min(count, 8);

  const points: Point[] = useMemo(
    () =>
      Array.from({ length: slots }, (_, i) => {
        const angle = (i / slots) * 2 * Math.PI - Math.PI / 2;
        return { x: 50 + 33 * Math.cos(angle), y: 50 + 33 * Math.sin(angle) };
      }),
    [slots]
  );

  return (
    <svg viewBox="0 0 100 100" className="size-[68px] shrink-0" aria-hidden="true">
      {points.map((p, i) => (
        <line
          key={`l${i}`}
          x1="50"
          y1="50"
          x2={p.x}
          y2={p.y}
          stroke="currentColor"
          className="text-border"
          strokeWidth="1.5"
          strokeDasharray="2.5 3"
        />
      ))}
      {points.map((p, i) => (
        <circle
          key={`n${i}`}
          cx={p.x}
          cy={p.y}
          r="5"
          fill="hsl(var(--card))"
          stroke="hsl(var(--primary))"
          strokeWidth="1.2"
        />
      ))}
      <circle cx="50" cy="50" r="11" fill="hsl(var(--primary))" stroke="hsl(var(--primary) / 0.5)" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="5" fill="hsl(var(--primary-foreground))" />
    </svg>
  );
}

// ─── Status badge ─────────────────────────────────────────────────────────────

function SiloStatusBadge({ status }: { status: SiloStatus }) {
  return (
    <Badge
      variant={status === "active" ? "default" : "secondary"}
      className="text-[10px] tracking-widest uppercase px-2"
    >
      {status}
    </Badge>
  );
}

// ─── Silo card ────────────────────────────────────────────────────────────────

interface SiloCardProps {
  silo: Silo;
  onClick: (silo: Silo) => void;
}

function SiloCard({ silo, onClick }: SiloCardProps) {
  const preview = silo.urls.slice(0, 3);
  const overflow = silo.linkedCount - 3;

  return (
    <Card
      role="button"
      tabIndex={0}
      aria-label={`Open silo: ${silo.name}`}
      onClick={() => onClick(silo)}
      onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => e.key === "Enter" && onClick(silo)}
      className="group relative cursor-pointer transition-all duration-300 overflow-hidden outline-none hover:-translate-y-1 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-ring"
    >
      {/* Top shimmer accent — uses CSS var so it adapts to theme */}
      <span className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <SiloStatusBadge status={silo.status} />
              <time className="text-[11px] text-muted-foreground">{silo.lastUpdated}</time>
            </div>
            <h3 className="mt-2 text-[15px] font-semibold truncate leading-snug">{silo.name}</h3>
          </div>
          <NetworkVisualizer count={silo.linkedCount} />
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pb-4">
        {/* Hub URL */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">Hub URL</p>
          <div className="flex items-center gap-2 rounded-lg border px-3 py-2">
            <Link className="size-3 text-primary shrink-0" />
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-primary text-xs font-mono truncate cursor-default">{silo.mainUrl}</span>
                </TooltipTrigger>
                <TooltipContent side="top" className="text-xs font-mono">
                  {silo.mainUrl}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Linked pages */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            Linked Pages&ensp;
            <span className="text-primary normal-case tracking-normal font-semibold">{silo.linkedCount}</span>
          </p>
          <ul className="space-y-1.5">
            {preview.map((url, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="size-1 rounded-full bg-muted-foreground/40 shrink-0" />
                <span className="text-muted-foreground text-xs font-mono truncate">{url.replace("https://", "")}</span>
              </li>
            ))}
            {overflow > 0 && (
              <li className="flex items-center gap-2">
                <span className="size-1 rounded-full bg-muted-foreground/20 shrink-0" />
                <span className="text-muted-foreground/50 text-xs">+{overflow} more</span>
              </li>
            )}
          </ul>
        </div>
      </CardContent>

      <Separator />

      <CardFooter className="flex items-center justify-between py-3 px-5">
        <span className="text-xs text-muted-foreground">{silo.linkedCount} internal links</span>
        <Button
          variant="ghost"
          size="sm"
          className="h-auto py-0 px-0 text-xs text-primary hover:bg-transparent gap-1"
          aria-label={`Manage ${silo.name}`}
        >
          Manage <ChevronRight className="size-3.5" />
        </Button>
      </CardFooter>
    </Card>
  );
}

// ─── Skeleton cards ───────────────────────────────────────────────────────────

function SiloSkeletonCard() {
  return (
    <Card className="p-5 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-20 rounded-full" />
          <Skeleton className="h-5 w-40 rounded-md" />
        </div>
        <Skeleton className="size-[68px] rounded-full shrink-0" />
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

// ─── Empty state illustration ─────────────────────────────────────────────────

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

// ─── Create silo dialog ───────────────────────────────────────────────────────

// ─── Page header ──────────────────────────────────────────────────────────────

interface PageHeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

function PageHeader({ viewMode, onViewModeChange }: PageHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b backdrop-blur-md px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-xl bg-primary flex items-center justify-center">
            <Link className="size-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-[17px] tracking-tight">SiloLink</span>
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
              {mode === "empty" ? "Empty State" : "With Silos"}
            </Button>
          ))}
        </div>
      </div>
    </header>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SiloPage() {
  const router = useRouter();
  const params = useParams();

  const [silos, setSilos] = useState<Silo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<ViewMode>("empty");

  const createSiloPath = `${AUTH_CONFIG.ROUTES.DASHBOARD}/${params.projectId}${AUTH_CONFIG.ROUTES.SILO}${AUTH_CONFIG.ROUTES.CREATE_SILO}`;

  useEffect(() => {
    setLoading(true);
    const timer = window.setTimeout(() => {
      setSilos(viewMode === "filled" ? MOCK_SILOS : []);
      setLoading(false);
    }, 900);
    return () => window.clearTimeout(timer);
  }, [viewMode]);

  const handleCreateSilo = () => {
    router.push(createSiloPath);
  };

  const handleSiloClick = useCallback((silo: Silo) => {
    console.info("[SiloPage] selected:", silo.id);
  }, []);

  const isEmpty = !loading && silos.length === 0;
  const hasSilos = !loading && silos.length > 0;

  return (
    <TooltipProvider>
      <div className="min-h-screen" style={{ fontFamily: "'Instrument Sans', 'Segoe UI', sans-serif" }}>
        <PageHeader viewMode={viewMode} onViewModeChange={setViewMode} />

        <main className="relative max-w-6xl mx-auto px-6 py-10">
          {/* Page title */}
          <div className="mb-8">
            <h1 className="text-[28px] font-bold tracking-tight">
              Your Silos
              {hasSilos && (
                <span className="ms-3 text-base font-normal text-muted-foreground">
                  {silos.length} cluster{silos.length !== 1 ? "s" : ""}
                </span>
              )}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Organize URLs into siloed clusters for powerful internal linking.
            </p>
          </div>

          {/* Loading skeletons */}
          {loading && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <SiloSkeletonCard key={i} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {isEmpty && (
            <div className="flex flex-col items-center pt-4">
              <EmptyIllustration />
              <div className="w-full max-w-sm">
                <CreateSiloCard onClick={handleCreateSilo} isEmpty={isEmpty} />
              </div>
              <p className="mt-5 max-w-xs text-center text-xs text-muted-foreground/60">
                Start by creating your first silo — define a hub URL and connect all related pages to build a strong
                internal linking structure.
              </p>
            </div>
          )}

          {/* Filled state */}
          {hasSilos && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {silos.map((silo) => (
                <SiloCard key={silo.id} silo={silo} onClick={handleSiloClick} />
              ))}
              <CreateSiloCard onClick={handleCreateSilo} isEmpty={false} />
            </div>
          )}
        </main>
      </div>
    </TooltipProvider>
  );
}
