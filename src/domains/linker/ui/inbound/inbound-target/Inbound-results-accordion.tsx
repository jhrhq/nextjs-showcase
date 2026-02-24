import { Link2 } from "lucide-react";
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import type { InboundLinkResult } from "@/domains/linker/types/inbound.types";
import { SentenceList } from "@/domains/linker/ui/inbound/inbound-target/inbound-sentences";

type InboundResultsAccordionProps = {
  url: string | null;
  isLoading: boolean;
  data?: InboundLinkResult[];
};

export function InboundResultsAccordion({ url, isLoading, data }: InboundResultsAccordionProps) {
  const [openItem, setOpenItem] = React.useState<string | undefined>(undefined);

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
            <Link2 className="w-4 h-4" />
            Link Suggestions
          </CardTitle>
          <Badge variant="secondary">{data.length} found</Badge>
        </div>
        <p className="text-xs text-muted-foreground">Recommended links are ranked by relevance and internal signals.</p>
      </CardHeader>

      <Separator />

      <CardContent className="p-4 space-y-6">
        {/* Recommended */}
        <section>
          <h3 className="text-sm font-semibold mb-2">⭐ Recommended opportunities</h3>

          <div className="space-y-2">
            {recommended.map((item) => (
              <Card key={item.id} className="border-primary/40 bg-primary/5">
                <CardContent className="p-4 space-y-3">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full border bg-background text-sm font-bold">
                      {item.score}
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground break-all">{item.slug}</p>
                    </div>
                  </div>

                  <SentenceList postId={item.id} />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Others */}
        {others.length > 0 && (
          <Accordion type="single" collapsible>
            <AccordionItem value="more">
              <AccordionTrigger>More opportunities ({others.length})</AccordionTrigger>
              <AccordionContent>
                <Accordion type="single" collapsible value={openItem} onValueChange={setOpenItem}>
                  {others.map((item) => (
                    <AccordionItem key={item.id} value={item.id}>
                      <AccordionTrigger className="py-3">
                        <div className="flex gap-3 text-left">
                          <div className="w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold">
                            {item.score}
                          </div>
                          <span className="text-sm font-medium line-clamp-1">{item.title}</span>
                        </div>
                      </AccordionTrigger>

                      <AccordionContent>
                        <div className="pl-11 space-y-2">
                          <p className="text-xs text-muted-foreground break-all">{item.slug}</p>
                          <SentenceList postId={item.id} />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
}
