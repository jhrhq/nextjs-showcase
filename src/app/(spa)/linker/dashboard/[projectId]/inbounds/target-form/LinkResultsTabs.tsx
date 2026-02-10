"use client";
import { ArrowDownToLine, ArrowUpFromLine, ExternalLink, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LinkResultsAccordion } from "./LinkResultsAccordion";

interface EmptyTabProps {
  label: string;
}

function EmptyTab({ label }: EmptyTabProps) {
  return (
    <Card>
      <CardContent className="py-12 text-center text-sm text-muted-foreground">
        <FileText className="w-8 h-8 mx-auto mb-2 opacity-30" aria-hidden />
        No {label} Found
      </CardContent>
    </Card>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface LinkResultsTabsProps {
  /** Fully-qualified target URL — passed down to the outbound results query */
  targetUrl: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Tabbed container that separates Inbound, Outbound, and External link results.
 * The Outbound tab renders `LinkResultsAccordion` with the live query.
 * Inbound and External tabs show empty states until those APIs are available.
 */
export function LinkResultsTabs({ targetUrl }: LinkResultsTabsProps) {
  return (
    <Tabs defaultValue="outbound">
      <TabsList>
        <TabsTrigger value="inbound" className="gap-1.5">
          <ArrowDownToLine className="w-3.5 h-3.5" aria-hidden />
          Inbound Links (0)
        </TabsTrigger>
        <TabsTrigger value="outbound" className="gap-1.5">
          <ArrowUpFromLine className="w-3.5 h-3.5" aria-hidden />
          Outbound Links (2)
        </TabsTrigger>
        <TabsTrigger value="external" className="gap-1.5">
          <ExternalLink className="w-3.5 h-3.5" aria-hidden />
          External Links (0)
        </TabsTrigger>
      </TabsList>

      <TabsContent value="inbound" className="mt-4">
        <EmptyTab label="Inbound Links" />
      </TabsContent>

      <TabsContent value="outbound" className="mt-4">
        <LinkResultsAccordion targetUrl={targetUrl} />
      </TabsContent>

      <TabsContent value="external" className="mt-4">
        <EmptyTab label="External Links" />
      </TabsContent>
    </Tabs>
  );
}
