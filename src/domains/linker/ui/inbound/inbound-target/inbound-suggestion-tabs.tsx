import { ArrowDownToLine, ArrowUpFromLine, ExternalLink, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { InboundLinkResult } from "@/domains/linker/types/inbound.types";
import { InboundResultsAccordion } from "@/domains/linker/ui/inbound/inbound-target/Inbound-results-accordion";

type InboundSuggestionTabsProps = {
  url: string | null;
  isLoading: boolean;
  data?: InboundLinkResult[];
};

export default function InboundSuggestionTabs({ url, isLoading, data }: InboundSuggestionTabsProps) {
  return (
    <Tabs defaultValue="outbound">
      <TabsList>
        <TabsTrigger value="inbound" className="gap-1.5">
          <ArrowDownToLine className="w-3.5 h-3.5" />
          Inbound Links (0)
        </TabsTrigger>
        <TabsTrigger value="outbound" className="gap-1.5">
          <ArrowUpFromLine className="w-3.5 h-3.5" />
          Outbound Links (2)
        </TabsTrigger>
        <TabsTrigger value="external" className="gap-1.5">
          <ExternalLink className="w-3.5 h-3.5" />
          External Links (0)
        </TabsTrigger>
      </TabsList>

      <TabsContent value="inbound" className="mt-4">
        <Card>
          <CardContent className="py-12 text-center text-sm text-muted-foreground">
            <FileText className="w-8 h-8 mx-auto mb-2 opacity-30" />
            No Inbound Links Found
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="outbound" className="mt-4">
        <InboundResultsAccordion url={url} isLoading={isLoading} data={data} />
      </TabsContent>

      <TabsContent value="external" className="mt-4">
        <Card>
          <CardContent className="py-12 text-center text-sm text-muted-foreground">
            <FileText className="w-8 h-8 mx-auto mb-2 opacity-30" />
            No External Links Found
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
