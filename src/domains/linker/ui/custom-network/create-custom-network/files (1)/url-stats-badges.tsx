/**
 * url-stats-badges.tsx
 *
 * Displays three count badges: total / valid / duplicates.
 * Wrapped in React.memo so it only re-renders when the counts change —
 * not when unrelated parts of the form re-render.
 */

import * as React from "react";
import { Badge } from "@/components/ui/badge";

interface UrlStatsBadgesProps {
  total:      number;
  valid:      number;
  duplicates: number;
}

export const UrlStatsBadges = React.memo(function UrlStatsBadges({
  total,
  valid,
  duplicates,
}: UrlStatsBadgesProps) {
  return (
    <div className="flex items-center gap-1.5 shrink-0">
      <Badge variant="secondary" className="font-mono text-xs tabular-nums">
        {total} total
      </Badge>

      {valid > 0 && (
        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 font-mono text-xs tabular-nums">
          {valid} valid
        </Badge>
      )}

      {duplicates > 0 && (
        <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 font-mono text-xs tabular-nums">
          {duplicates} dup
        </Badge>
      )}
    </div>
  );
});

UrlStatsBadges.displayName = "UrlStatsBadges";
