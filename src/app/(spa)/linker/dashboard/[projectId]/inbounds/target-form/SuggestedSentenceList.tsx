// biome-ignore-all lint: <explanation of why you are ignoring this file>
// @ts-nocheck
// biome-ignore-all lint: ignoring for testing purposes

"use client";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import { fetchSentences } from "@/app/(spa)/linker/dashboard/[projectId]/inbounds/target-form/api";
import { Skeleton } from "@/components/ui/skeleton";

interface SuggestedSentenceListProps {
  /** `LinkResult.id` — used as the query key and API parameter */
  postId: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Fetches and displays the list of sentences suggested for placing an
 * internal link to a specific post. Renders skeleton placeholders while loading.
 */
export function SuggestedSentenceList({ postId }: SuggestedSentenceListProps) {
  const { data: sentences, isLoading } = useQuery({
    queryKey: ["suggested-sentences", postId],
    queryFn: () => fetchSentences(postId),
    // Keep cached results alive for 5 minutes to avoid re-fetching on re-open
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="space-y-2 mt-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-10 w-full" />
        ))}
      </div>
    );
  }

  if (!sentences?.length) {
    return <p className="text-xs text-muted-foreground mt-2">No suggested sentences found for this post.</p>;
  }

  return (
    <ul className="space-y-2 mt-2">
      {sentences.map((sentence, index) => (
        <li
          key={index}
          className="flex items-start gap-2 rounded-md border bg-muted/40 px-3 py-2.5 text-sm leading-relaxed"
        >
          <ChevronRight className="w-4 h-4 mt-0.5 text-primary shrink-0" aria-hidden />
          <span>{sentence}</span>
        </li>
      ))}
    </ul>
  );
}
