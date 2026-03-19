"use client";

import { CheckCircle2, ExternalLink } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { SidebarUrl, UrlCategory } from "./sidebar-url";

// ── Category colour map ────────────────────────────────────────────────────

const CATEGORY_STYLES: Record<UrlCategory, { badge: string; avatar: string }> = {
  Design: {
    badge: "bg-violet-100 text-violet-700 border-violet-200",
    avatar: "bg-violet-100 text-violet-700",
  },
  "Dev Tools": {
    badge: "bg-blue-100 text-blue-700 border-blue-200",
    avatar: "bg-blue-100 text-blue-700",
  },
  AI: {
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    avatar: "bg-emerald-100 text-emerald-700",
  },
  Documentation: {
    badge: "bg-slate-100 text-slate-700 border-slate-200",
    avatar: "bg-slate-100 text-slate-700",
  },
  News: {
    badge: "bg-orange-100 text-orange-700 border-orange-200",
    avatar: "bg-orange-100 text-orange-700",
  },
  Cloud: {
    badge: "bg-cyan-100 text-cyan-700 border-cyan-200",
    avatar: "bg-cyan-100 text-cyan-700",
  },
  Analytics: {
    badge: "bg-rose-100 text-rose-700 border-rose-200",
    avatar: "bg-rose-100 text-rose-700",
  },
};

// ── Favicon with letter-avatar fallback ────────────────────────────────────

interface FaviconProps {
  domain: string;
  category: UrlCategory;
  title: string;
}

function Favicon({ domain, category, title }: FaviconProps) {
  const [failed, setFailed] = React.useState(false);
  const { avatar } = CATEGORY_STYLES[category];

  if (failed) {
    return (
      <span
        className={cn("size-8 flex items-center justify-center text-sm font-semibold shrink-0 select-none", avatar)}
        aria-hidden="true"
      >
        {title.charAt(0).toUpperCase()}
      </span>
    );
  }

  return (
    <Image
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`}
      alt=""
      aria-hidden="true"
      width={32}
      height={32}
      className="size-8 object-contain shrink-0 bg-muted p-1"
      onError={() => setFailed(true)}
    />
  );
}

// ── UrlCard ────────────────────────────────────────────────────────────────

interface UrlCardProps {
  item: SidebarUrl;
  isAdded: boolean;
  onAdd: (url: string) => void;
}

export function UrlCard({ item, isAdded, onAdd }: UrlCardProps) {
  const { badge } = CATEGORY_STYLES[item.category];

  const handleCardClick = () => {
    if (!isAdded) onAdd(item.url);
  };

  const handleExternalLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(item.url, "_blank", "noopener noreferrer");
  };

  return (
    <div className="group relative">
      {/* Full-card clickable button */}
      <button
        type="button"
        onClick={handleCardClick}
        disabled={isAdded}
        aria-label={isAdded ? `${item.title} already added to list` : `Add ${item.title} to URL list`}
        className={cn(
          "w-full text-left border bg-card transition-all duration-150 outline-none",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
          isAdded
            ? "opacity-60 cursor-default"
            : "cursor-pointer hover:bg-muted/50 hover:border-border/80 hover:shadow-sm active:scale-[0.99]"
        )}
      >
        <div className="p-3 flex items-start gap-3">
          <Favicon domain={item.domain} category={item.category} title={item.title} />

          <div className="min-w-0 flex-1 space-y-0.5">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-sm font-medium leading-tight truncate">{item.title}</span>
              <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0 h-4 font-medium shrink-0", badge)}>
                {item.category}
              </Badge>
            </div>

            <p className="text-[11px] text-muted-foreground truncate">{item.domain}</p>

            <p className="text-[11px] text-muted-foreground/80 line-clamp-1 leading-snug">{item.description}</p>
          </div>

          {/* Reserved slot — shows checkmark when added */}
          <div className="shrink-0 mt-0.5 size-7 flex items-center justify-center">
            {isAdded && <CheckCircle2 className="size-4 text-emerald-500" aria-hidden="true" />}
          </div>
        </div>
      </button>

      {/* External-link button — floats above the card, stops propagation */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleExternalLink}
            aria-label={`Open ${item.title} in new tab`}
            className={cn(
              "absolute top-2 right-2 z-10 size-6",
              "opacity-0 group-hover:opacity-100 transition-opacity",
              "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            <ExternalLink className="size-3" aria-hidden="true" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">Open in new tab</TooltipContent>
      </Tooltip>
    </div>
  );
}
