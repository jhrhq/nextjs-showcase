"use client";

import { useParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";

import { useSubmitInboundUrl } from "@/domains/linker/hooks/use-projects";
import { InboundSidebar } from "@/domains/linker/ui/inbound/inbound-target/inbound-sidebar";
import {
  InboundTargetForm,
  type TargetUrlFormHandle,
} from "@/domains/linker/ui/inbound/inbound-target/inbound-target-form";

import { InboundResultsAccordion } from "./Inbound-results-accordion";

export default function InboundTarget() {
  const { projectId } = useParams<{ projectId: string }>();

  const [submittedUrl, setSubmittedUrl] = React.useState<string | null>(null);
  const formRef = React.useRef<TargetUrlFormHandle>(null);

  const { mutate, data, isPending } = useSubmitInboundUrl();

  const handleFormSubmit = (url: string) => {
    mutate(
      { projectId, url },
      {
        onSuccess: (responseData) => {
          setSubmittedUrl(responseData.post.url);
        },
        onError: (error) => {
          console.error("Failed to submit inbound URL:", error);
          toast.error("Failed to fetch linking opportunities.");
        },
      }
    );
  };

  const handleSidebarPostSelect = React.useCallback(async (url: string) => {
    const submitted = formRef.current?.submitWithUrl(url);

    if (!submitted) {
      toast.error(`Sidebar URL failed validation: ${url}`);
    }
  }, []);

  return (
    <div className="flex flex-1 w-full">
      <div className="flex-1 min-w-0 py-8 pr-6">
        <div className="mb-2">
          <h1 className="text-xl font-bold tracking-tight">Internal Link Builder</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Enter a URL or click a post from the sidebar to find linking opportunities.
          </p>
        </div>

        <InboundTargetForm ref={formRef} onSubmit={handleFormSubmit} isLoading={isPending} />

        <InboundResultsAccordion url={submittedUrl} isLoading={isPending} data={data?.suggestions} />
      </div>

      <aside
        className="bg-background flex flex-col overflow-hidden sticky top-14 h-[calc(100vh-3.5rem)] border-l"
        style={{ width: "33.333%" }}
      >
        <InboundSidebar onSelectUrl={handleSidebarPostSelect} />
      </aside>
    </div>
  );
}
