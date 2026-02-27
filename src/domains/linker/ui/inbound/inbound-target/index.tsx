import { useParams } from "next/navigation";
import React from "react";
import { useSubmitInboundUrl } from "@/domains/linker/hooks/use-projects";
import { InboundSidebar } from "@/domains/linker/ui/inbound/inbound-target/inbound-sidebar";
import InboundSuggestionTabs from "@/domains/linker/ui/inbound/inbound-target/inbound-suggestion-tabs";
import {
  InboundTargetForm,
  type TargetUrlFormHandle,
} from "@/domains/linker/ui/inbound/inbound-target/inbound-target-form";

export default function InboundTarget() {
  const params = useParams();
  const projectId = params.id as string;

  const [submittedUrl, setSubmittedUrl] = React.useState<string | null>(null);
  const formRef = React.useRef<TargetUrlFormHandle>(null);

  const { mutate, data, isPending } = useSubmitInboundUrl();

  const handleFormSubmit = (url: string) => {
    mutate({ projectId, url }, { onSuccess: (data) => setSubmittedUrl(data.data.post.url) });
  };

  const handleSidebarPostSelect = React.useCallback(async (url: string) => {
    const submitted = await formRef.current?.submitWithUrl(url);

    if (!submitted) {
      alert(`Sidebar URL failed validation: ${url}`);
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

        <InboundSuggestionTabs url={submittedUrl} isLoading={isPending} data={data?.data?.suggestions} />
      </div>

      <aside
        className=" bg-background flex flex-col overflow-hidden sticky top-14 h-[calc(100vh-3.5rem)] border-l"
        style={{ width: "33.333%" }}
      >
        <InboundSidebar onSelectUrl={handleSidebarPostSelect} />
      </aside>
    </div>
  );
}
