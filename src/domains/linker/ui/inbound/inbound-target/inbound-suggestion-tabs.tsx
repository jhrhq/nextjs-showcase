"use client";
import { ArrowDownToLine, ArrowUpFromLine, ExternalLink, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InboundResultsAccordion } from "@/domains/linker/ui/inbound/inbound-target/Inbound-results-accordion";
import type { InboundSuggestions } from "@/domains/linker/validations/inbound.validation";

type InboundSuggestionTabsProps = {
  url: string | null;
  isLoading: boolean;
  data?: InboundSuggestions[];
};

export default function InboundSuggestionTabs({ url, isLoading, data }: InboundSuggestionTabsProps) {
  return (
    <Tabs defaultValue="outbound">
      <TabsList className="w-full">
        <TabsTrigger value="inbound" className="flex-1 p-0">
          <span className="inline-flex gap-1.5 text-slate-800 pt-1">
            <ArrowDownToLine className="w-3.5 h-3.5" />
            Inbound Links (0)
          </span>
        </TabsTrigger>
        <TabsTrigger value="outbound" className="flex-1 p-0">
          <span className="inline-flex items-center gap-1.5 text-slate-800 pt-1">
            <ArrowUpFromLine className="w-3.5 h-3.5" />
            Outbound Links ({data?.length || 0})
          </span>
        </TabsTrigger>
        <TabsTrigger value="external" className="flex-1 p-0">
          <span className="inline-flex gap-1.5 text-slate-800 pt-1">
            <ExternalLink className="w-3.5 h-3.5" />
            External Links (0)
          </span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="inbound">
        <Card>
          <CardContent className="py-12 text-center text-sm text-muted-foreground">
            <FileText className="size-8 mx-auto mb-2 opacity-30" />
            No Inbound Links Found
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="outbound">
        <InboundResultsAccordion url={url} isLoading={isLoading} data={data} />
      </TabsContent>

      <TabsContent value="external">
        <Card>
          <CardContent className="py-12 text-center text-sm text-muted-foreground">
            <FileText className="size-8 mx-auto mb-2 opacity-30" />
            No External Links Found
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
