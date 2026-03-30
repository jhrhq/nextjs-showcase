"use client";

import { Check, ExternalLink, Plus } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { UrlItem } from "@/types";

interface UrlCardProps {
  item: UrlItem;
  isAdded: boolean;
  onAdd: (url: string) => void;
}

/**
 * Memoized URL card - only re-renders when its own props change
 * Critical for performance with infinite scroll lists
 */
export const UrlCard = React.memo(function UrlCard({ item, isAdded, onAdd }: UrlCardProps) {
  const handleAdd = React.useCallback(() => {
    if (!isAdded) {
      onAdd(item.url);
    }
  }, [isAdded, onAdd, item.url]);

  const handleOpen = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      window.open(item.url, "_blank", "noopener,noreferrer");
    },
    [item.url]
  );

  return (
    <div
      className={cn(
        "group flex items-start gap-3 p-3 border rounded-lg bg-card",
        "hover:border-primary/50 hover:shadow-sm transition-all",
        isAdded && "opacity-60 bg-muted/30"
      )}
      role="listitem"
    >
      {/* Favicon placeholder */}
      <div
        className={cn(
          "size-8 shrink-0 rounded flex items-center justify-center text-xs font-medium",
          isAdded
            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
            : "bg-muted text-muted-foreground"
        )}
        aria-hidden="true"
      >
        {isAdded ? <Check className="size-4" /> : item.domain?.[0]?.toUpperCase() || "U"}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium truncate" title={item.title || item.url}>
            {item.title || item.domain || new URL(item.url).hostname}
          </h3>
          {item.category && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{item.category}</span>
          )}
        </div>

        <p className="text-xs text-muted-foreground truncate" title={item.url}>
          {item.url}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-7"
              onClick={handleOpen}
              aria-label={`Open ${item.title || item.url} in new tab`}
            >
              <ExternalLink className="size-3.5" aria-hidden="true" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Open in new tab</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant={isAdded ? "outline" : "default"}
              size="sm"
              className={cn("h-7 px-2 text-xs gap-1", isAdded && "border-green-500 text-green-700 hover:bg-green-50")}
              onClick={handleAdd}
              disabled={isAdded}
              aria-label={isAdded ? "Already added" : `Add ${item.title || item.url}`}
            >
              {isAdded ? (
                <>
                  <Check className="size-3" aria-hidden="true" />
                  Added
                </>
              ) : (
                <>
                  <Plus className="size-3" aria-hidden="true" />
                  Add
                </>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>{isAdded ? "This URL is already in your form" : "Add to form"}</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
});

UrlCard.displayName = "UrlCard";
