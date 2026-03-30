"use client";

import * as React from "react";
import CreateCustomNetworkForm from "./create-custom-network-form";
import { UrlSidebar } from "./url-sidebar";

/**
 * Root page
 *
 * Layout
 * ┌─────────────────────────────────┬──────────────┐
 * │          UrlForm (flex-1)       │  UrlSidebar  │
 * │                                 │  (sticky,    │
 * │  • Collection details           │  w-80,       │
 * │  • Quick import                 │  h-screen)   │
 * │  • URL list                     │              │
 * └─────────────────────────────────┴──────────────┘
 *
 * Communication pattern:
 *   Sidebar click → pendingUrls queue → UrlForm consumes & appends
 *   UrlForm watch → onUrlsChange → addedUrls Set → Sidebar marks cards
 */
export default function CreateCustomNetworPage() {
  /**
   * Queue of URLs the user clicked in the sidebar.
   * UrlForm empties this queue via onPendingConsumed after appending them.
   */
  const [pendingUrls, setPendingUrls] = React.useState<string[]>([]);

  /**
   * Mirror of the raw URL strings currently inside the form.
   * Kept as a Set for O(1) "is this already added?" lookups in the sidebar.
   */
  const [formUrls, setFormUrls] = React.useState<string[]>([]);
  const addedUrlsSet = React.useMemo(() => new Set(formUrls), [formUrls]);

  const handleAddUrl = React.useCallback((url: string) => {
    setPendingUrls((prev) => [...prev, url]);
  }, []);

  const handlePendingConsumed = React.useCallback(() => {
    setPendingUrls([]);
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <main className="flex-1 min-w-0 px-6 py-10">
        <div className="mx-auto max-w-2xl">
          <CreateCustomNetworkForm
            pendingUrls={pendingUrls}
            onPendingConsumed={handlePendingConsumed}
            onUrlsChange={setFormUrls}
          />
        </div>
      </main>

      {/* ── Sticky sidebar ── */}
      <aside className="w-80 shrink-0" aria-label="URL browser">
        <UrlSidebar addedUrls={addedUrlsSet} onAddUrl={handleAddUrl} />
      </aside>
    </div>
  );
}
