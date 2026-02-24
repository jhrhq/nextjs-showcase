// @ts-nocheck
import { useMutation } from "@tanstack/react-query";
import React from "react";
import type { InboundLinkResult } from "@/domains/linker/types/inbound.types";
import { InboundSidebar } from "@/domains/linker/ui/inbound/inbound-target/inbound-sidebar";
import InboundSuggestionTabs from "@/domains/linker/ui/inbound/inbound-target/inbound-suggestion-tabs";
import {
  InboundTargetForm,
  type TargetUrlFormHandle,
} from "@/domains/linker/ui/inbound/inbound-target/inbound-target-form";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function fetchLinkResults(): Promise<InboundLinkResult[]> {
  await sleep(1200);

  return [
    {
      id: "1",
      title: "Why Does My Bissell Carpet Cleaner Keep Catching On Carpet",
      slug: "/why-does-my-bissell-carpet-cleaner-keep-catching-on-carpet/",
      score: 76,
      clicks: 0,
      impressions: 271,
      position: 4.0,
    },
    {
      id: "2",
      title: "How to Deep Clean Your Bissell ProHeat 2X",
      slug: "/how-to-deep-clean-bissell-proheat-2x/",
      score: 68,
      clicks: 12,
      impressions: 540,
      position: 6.2,
    },
    {
      id: "3",
      title: "Bissell CrossWave vs Symphony: Full Comparison",
      slug: "/bissell-crosswave-vs-symphony/",
      score: 59,
      clicks: 34,
      impressions: 820,
      position: 8.1,
    },
    {
      id: "4",
      title: "Why Is My Carpet Cleaner Leaving Residue?",
      slug: "/why-is-my-carpet-cleaner-leaving-residue/",
      score: 51,
      clicks: 5,
      impressions: 312,
      position: 11.4,
    },
  ];
}
export function useFetchLinkResults() {
  return useMutation({
    mutationFn: fetchLinkResults,
  });
}
export default function InboundTarget() {
  const [submittedUrl, setSubmittedUrl] = React.useState<string | null>(null);
  const formRef = React.useRef<TargetUrlFormHandle>(null);

  const { mutate, data, isPending } = useFetchLinkResults();

  const handleFormSubmit = (url: string) => {
    mutate({ url }, { onSuccess: () => setSubmittedUrl(url) });
  };

  const handleSidebarPostSelect = React.useCallback(async (url: string) => {
    const submitted = await formRef.current?.submitWithUrl(url);

    if (!submitted) {
      alert(`Sidebar URL failed validation: ${url}`);
    }
  }, []);

  return (
    <div className="grid grid-cols-[minmax(900px,1fr)_400px]">
      {/* ── Main area ── */}
      <div className="p-6 space-y-6">
        {/* Page heading */}
        <div>
          <h1 className="text-xl font-bold tracking-tight">Internal Link Builder</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Enter a URL or click a post from the sidebar to find linking opportunities.
          </p>
        </div>

        {/* ── URL Form ── */}
        <InboundTargetForm ref={formRef} onSubmit={handleFormSubmit} isLoading={isPending} />

        {/* ── Results (shown after submit) ── */}
        <InboundSuggestionTabs url={submittedUrl} isLoading={isPending} data={data} />
      </div>

      {/* ── Sidebar ── */}
      <InboundSidebar onSelectUrl={handleSidebarPostSelect} />
    </div>
  );
}
