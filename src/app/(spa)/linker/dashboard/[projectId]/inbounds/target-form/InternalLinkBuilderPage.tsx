"use client";

import { useCallback, useRef, useState } from "react";
import { LinkResultsTabs } from "@/app/(spa)/linker/dashboard/[projectId]/inbounds/target-form/LinkResultsTabs";
import { OrphanPostSidebar } from "@/app/(spa)/linker/dashboard/[projectId]/inbounds/target-form/OrphanPostSidebar";
import {
  TargetUrlForm,
  type TargetUrlFormHandle,
} from "@/app/(spa)/linker/dashboard/[projectId]/inbounds/target-form/TargetUrlForm";

/**
 * Internal Link Builder page.
 *
 * Layout:
 *  - Left (main area): Target URL form → link results tabs → accordion
 *  - Right (sidebar):  Infinite-scroll list of orphan posts
 *
 * Data flow:
 *  1. User types a URL and submits the form  →  `submittedUrl` is set
 *  2. `LinkResultsTabs` uses `submittedUrl` to query outbound link suggestions
 *  3. Expanding an accordion row fetches suggested anchor sentences for that post
 *  4. Clicking a sidebar post card calls `formRef.submitWithUrl(url)`, which
 *     fills the form and triggers submission programmatically
 */
export default function InternalLinkBuilderPage() {
  const [submittedUrl, setSubmittedUrl] = useState<string | null>(null);

  // Ref to the form's imperative API — used by the sidebar to auto-submit
  const formRef = useRef<TargetUrlFormHandle>(null);

  const handleFormSubmit = useCallback((url: string) => {
    setSubmittedUrl(url);
  }, []);

  const handleSidebarPostSelect = useCallback((url: string) => {
    formRef.current?.submitWithUrl(url);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* ── Main Content Area ── */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto p-6 space-y-6">
          {/* Page heading */}
          <header>
            <h1 className="text-xl font-bold tracking-tight">Internal Link Builder</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Enter a target URL or click a post in the sidebar to discover internal linking opportunities.
            </p>
          </header>

          {/* Target URL form */}
          <TargetUrlForm ref={formRef} onSubmit={handleFormSubmit} />

          {/* Link results — only rendered after a URL has been submitted */}
          {submittedUrl && <LinkResultsTabs targetUrl={submittedUrl} />}
        </div>
      </main>

      {/* ── Sidebar ── */}
      <OrphanPostSidebar onSelectPost={handleSidebarPostSelect} />
    </div>
  );
}
