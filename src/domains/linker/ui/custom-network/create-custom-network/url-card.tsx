"use client";

import { CheckCircle2, ExternalLink } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { SidebarUrl, UrlCategory } from "./sidebar-url";

const CATEGORY_STYLES: Record<UrlCategory, { badge: string; avatar: string }> = {
  Design: {
    badge: "bg-chart-5/10 text-chart-5 border-chart-5/20",
    avatar: "bg-chart-5/10 text-chart-5",
  },
  "Dev Tools": {
    badge: "bg-chart-1/10 text-chart-1 border-chart-1/20",
    avatar: "bg-chart-1/10 text-chart-1",
  },
  AI: {
    badge: "bg-chart-2/10 text-chart-2 border-chart-2/20",
    avatar: "bg-chart-2/10 text-chart-2",
  },
  Documentation: {
    badge: "bg-muted text-muted-foreground border-border",
    avatar: "bg-muted text-muted-foreground",
  },
  News: {
    badge: "bg-chart-3/10 text-chart-3 border-chart-3/20",
    avatar: "bg-chart-3/10 text-chart-3",
  },
  Cloud: {
    badge: "bg-chart-1/10 text-chart-1 border-chart-1/20",
    avatar: "bg-chart-1/10 text-chart-1",
  },
  Analytics: {
    badge: "bg-chart-4/10 text-chart-4 border-chart-4/20",
    avatar: "bg-chart-4/10 text-chart-4",
  },
};

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
        className={cn(
          "size-8 rounded-lg flex items-center justify-center text-sm font-semibold shrink-0 select-none shadow-2xs",
          avatar
        )}
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
      className="size-8 object-contain shrink-0 bg-muted p-1 rounded-lg shadow-2xs"
      onError={() => setFailed(true)}
    />
  );
}

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
      <button
        type="button"
        onClick={handleCardClick}
        disabled={isAdded}
        aria-label={isAdded ? `${item.title} already added to list` : `Add ${item.title} to URL list`}
        className={cn(
          "w-full text-left border border-border bg-card rounded-xl transition-all duration-150 outline-none shadow-2xs",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
          isAdded
            ? "opacity-60 cursor-default bg-muted/30"
            : "cursor-pointer hover:bg-accent hover:border-border/80 hover:shadow-sm active:scale-[0.99]"
        )}
      >
        <div className="p-3 flex items-start gap-3">
          <Favicon domain={item.domain} category={item.category} title={item.title} />

          <div className="min-w-0 flex-1 space-y-0.5">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-sm font-medium leading-tight truncate text-foreground">{item.title}</span>
              <Badge
                variant="outline"
                className={cn("text-[10px] px-1.5 py-0 h-4 font-medium shrink-0 shadow-2xs", badge)}
              >
                {item.category}
              </Badge>
            </div>

            <p className="text-[11px] text-muted-foreground truncate">{item.domain}</p>

            <p className="text-[11px] text-muted-foreground/85 line-clamp-1 leading-snug">{item.description}</p>
          </div>

          <div className="shrink-0 mt-0.5 size-7 flex items-center justify-center">
            {isAdded && <CheckCircle2 className="size-4 text-chart-2" aria-hidden="true" />}
          </div>
        </div>
      </button>
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleExternalLink}
              aria-label={`Open ${item.title} in new tab`}
              className={cn(
                "absolute top-2 right-2 z-10 size-6 rounded-lg",
                "opacity-0 group-hover:opacity-100 transition-opacity shadow-2xs",
                "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <ExternalLink className="size-3" aria-hidden="true" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">Open in new tab</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
