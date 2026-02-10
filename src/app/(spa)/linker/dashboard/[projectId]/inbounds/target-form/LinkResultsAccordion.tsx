"use client";
import { useQuery } from "@tanstack/react-query";
import { Link2 } from "lucide-react";
import { useState } from "react";
import { fetchLinkResults } from "@/app/(spa)/linker/dashboard/[projectId]/inbounds/target-form/api";
import type { LinkResult } from "@/app/(spa)/linker/dashboard/[projectId]/inbounds/target-form/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { SuggestedSentenceList } from "./SuggestedSentenceList";

// ─── Sub-component: Score Badge ───────────────────────────────────────────────

interface ScoreBadgeProps {
  score: number;
}

function ScoreBadge({ score }: ScoreBadgeProps) {
  return (
    <Badge variant="default-lighter" aria-label={`Relevance score: ${score}`}>
      <span className="text-xs font-bold text-primary">{score}</span>
    </Badge>
  );
}

// ─── Sub-component: Stats Row ─────────────────────────────────────────────────

interface StatsRowProps {
  clicks: number;
  impressions: number;
  position: number;
}

function StatsRow({ clicks, impressions, position }: StatsRowProps) {
  return (
    <dl className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
      <div>
        <dt className="inline">Clicks: </dt>
        <dd className="inline font-semibold text-foreground">{clicks}</dd>
      </div>
      <div>
        <dt className="inline">Impressions: </dt>
        <dd className="inline font-semibold text-foreground">{impressions}</dd>
      </div>
      <div>
        <dt className="inline">Position: </dt>
        <dd className="inline font-semibold text-foreground">{position}</dd>
      </div>
    </dl>
  );
}

// ─── Sub-component: Single Accordion Row ─────────────────────────────────────

interface LinkResultRowProps {
  result: LinkResult;
  isOpen: boolean;
}

function LinkResultRow({ result, isOpen }: LinkResultRowProps) {
  return (
    <AccordionItem value={result.id}>
      <AccordionTrigger className="hover:no-underline py-3 [&>svg]:hidden">
        <div className="flex items-center gap-3 text-left w-full">
          <ScoreBadge score={result.score} />

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium leading-snug line-clamp-1">{result.title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{result.slug}</p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 mr-2">
            <Badge variant="outline" className="text-[10px] h-5 hidden md:flex">
              {result.clicks} clicks
            </Badge>
            <Badge variant="outline" className="text-[10px] h-5 hidden md:flex">
              pos {result.position}
            </Badge>
          </div>
        </div>
      </AccordionTrigger>

      <AccordionContent>
        <div className="pl-12 pb-2">
          <StatsRow clicks={result.clicks} impressions={result.impressions} position={result.position} />
          <p className="text-xs font-medium text-muted-foreground mb-1">
            Suggested sentences for placing this internal link:
          </p>
          {/* Only mount SuggestedSentenceList when this row is open to
              avoid firing the API request for every row on page load */}
          {isOpen && <SuggestedSentenceList postId={result.id} />}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface LinkResultsAccordionProps {
  /** Fully-qualified target URL submitted via the form */
  targetUrl: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Fetches link suggestions for `targetUrl` and renders them as a collapsible
 * accordion. Expanding a row fetches and displays suggested anchor sentences.
 */
export function LinkResultsAccordion({ targetUrl }: LinkResultsAccordionProps) {
  const [openItemId, setOpenItemId] = useState<string | null>(null);

  const { data: results, isLoading } = useQuery({
    queryKey: ["link-results", targetUrl],
    queryFn: () => fetchLinkResults(targetUrl),
    enabled: Boolean(targetUrl),
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-16 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Link2 className="w-4 h-4" aria-hidden />
            Link Suggestions
          </CardTitle>
          <Badge variant="default-lighter">{results?.length ?? 0} found</Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          Click a result to view suggested sentences for placing that link.
        </p>
      </CardHeader>

      <Separator />

      <CardContent className="p-4">
        <Accordion
          type="single"
          collapsible
          value={openItemId ?? undefined}
          onValueChange={(value) => setOpenItemId(value ?? null)}
        >
          {results?.map((result) => (
            <LinkResultRow key={result.id} result={result} isOpen={openItemId === result.id} />
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
