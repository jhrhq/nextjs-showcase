"use client";

import { ChevronDown, ChevronUp, Link2 } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSuggestedSentences } from "@/domains/linker/hooks/use-projects";
import { SentenceList } from "@/domains/linker/ui/inbound/inbound-target/inbound-sentences";
import type { InboundSuggestions } from "@/domains/linker/validations/inbound.validation";

type InboundResultsAccordionProps = {
  url: string | null;
  isLoading: boolean;
  data?: InboundSuggestions[];
};

export function InboundResultsAccordion({ url, isLoading, data }: InboundResultsAccordionProps) {
  const [openRecommended, setOpenRecommended] = React.useState<string[]>([]);
  const [openItems, setOpenItems] = React.useState<string[]>([]);
  const [showAll, setShowAll] = React.useState(false);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (!url) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-sm text-muted-foreground">
          Enter a URL or click a post from the sidebar to find linking opportunities.
        </CardContent>
      </Card>
    );
  }

  if (!data?.length) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-sm text-muted-foreground">
          No link opportunities found.
        </CardContent>
      </Card>
    );
  }

  const recommended = data.slice(0, 3);
  const others = data.slice(3);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <Link2 className="w-4 h-4" /> Link Suggestions
          </CardTitle>
          <Badge variant="secondary">{data.length} found</Badge>
        </div>
        <p className="text-xs text-muted-foreground">Recommended links are ranked by relevance and internal signals.</p>
      </CardHeader>

      <Separator />

      <CardContent className="p-4 space-y-4">
        {/* ── Recommended Section ── */}
        <section className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold">⭐ Recommended</h3>
            <Badge variant="secondary" className="text-xs rounded-full px-1.5">
              {recommended.length}
            </Badge>
          </div>
          <Accordion type="multiple" value={openRecommended} onValueChange={setOpenRecommended} className="space-y-2">
            {recommended.map((item) => (
              <LinkAccordionItem key={item.id} item={item} />
            ))}
          </Accordion>
        </section>

        {/* ── Others Section ── */}
        {others.length > 0 && (
          <>
            <Separator />
            <section className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-muted-foreground">Other opportunities</h3>
                  <Badge variant="outline" className="text-xs">
                    {others.length}
                  </Badge>
                </div>
                <Button
                  variant={showAll ? "ghost" : "outline"}
                  size="sm"
                  onClick={() => setShowAll((prev) => !prev)}
                  className="gap-2"
                >
                  {showAll ? (
                    <>
                      Show less <ChevronUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Show {others.length} more {others.length === 1 ? "opportunity" : "opportunities"}{" "}
                      <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>

              {showAll && (
                <Accordion type="multiple" value={openItems} onValueChange={setOpenItems} className="space-y-2">
                  {others.map((item) => (
                    <LinkAccordionItem key={item.id} item={item} />
                  ))}
                </Accordion>
              )}
            </section>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function LinkAccordionItem({ item }: { item: InboundSuggestions }) {
  const params = useParams<{ projectId: string }>();
  const projectId = params.projectId;

  const payload = React.useMemo(
    () => ({
      projectId,
      postId: item.id,
      targetId: item._postId,
    }),
    [projectId, item.id, item._postId]
  );

  const { prefetch } = useGetSuggestedSentences(payload, { enabled: false });

  return (
    <AccordionItem value={item.id} className="border-0 animate-in fade-in duration-200">
      <AccordionTrigger
        onMouseEnter={prefetch}
        onFocus={prefetch}
        className="px-4 py-3 hover:no-underline hover:bg-muted/40 [&>svg]:shrink-0"
      >
        <div className="flex gap-4 text-left flex-1 min-w-0">
          <div className="w-10 h-10 flex items-center justify-center rounded-full border bg-background text-sm font-bold shrink-0">
            {item.score}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">{item.title}</p>
            <p className="text-xs text-muted-foreground break-all wrap-anywhere whitespace-normal">{item.url}</p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="data-[state=open]:overflow-visible overflow-visible h-auto space-y-2 ">
        <SentenceList item={item} payload={payload} />
      </AccordionContent>
    </AccordionItem>
  );
}
