"use client";

import { useUrlSyncOptions } from "./hook";
import UrlForm from "./url-form";
import { UrlSidebar } from "./url-sidebar";

/**
 * Root page: Coordinates communication between form and sidebar
 *
 * Layout:
 * ┌─────────────────────────────────┬──────────────┐
 * │ UrlForm (flex-1)                │ UrlSidebar   │
 * │                                 │ (sticky)     │
 * │ • Collection details            │              │
 * │ • Quick import                  │              │
 * │ • URL list                      │              │
 * └─────────────────────────────────┴──────────────┘
 *
 * Communication:
 * Sidebar click → pendingUrls queue → Form consumes → Sidebar updates
 */
export default function CreateCustomNetworkExcercise() {
  const {
    // Form props
    pendingUrls,
    onPendingConsumed,
    onUrlsChange,

    // Sidebar props
    addedUrlsSet,
    onAddUrl,
  } = useUrlSyncOptions({
    sidebarDebounceMs: 150, // Prevent sidebar re-render thrashing
    parentDebounceMs: 200, // Debounce backend sync if added later
  });

  return (
    <div className="flex min-h-screen bg-background">
      <main id="main-content" className="flex-1 min-w-0 px-4 md:px-6 py-8 md:py-10" role="main" tabIndex={-1}>
        <div className="mx-auto max-w-2xl">
          <UrlForm pendingUrls={pendingUrls} onPendingConsumed={onPendingConsumed} onUrlsChange={onUrlsChange} />
        </div>
      </main>

      {/* Sticky sidebar with mobile drawer behavior */}
      <UrlSidebar addedUrls={addedUrlsSet} onAddUrl={onAddUrl} />
    </div>
  );
}
