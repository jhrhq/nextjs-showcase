"use client";

import CreateCustomNetworkForm from "./create-custom-network-form";
import { useUrlSyncOptions } from "./create-custom-network-form/hook";
import { UrlSidebar } from "./url-sidebar";

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
    sidebarDebounceMs: 150,
    parentDebounceMs: 200,
  });

  return (
    <div className="flex min-h-screen bg-background">
      <main id="main-content" className="flex-1 min-w-0 px-4 md:px-6 py-8 md:py-10" tabIndex={-1}>
        <CreateCustomNetworkForm
          pendingUrls={pendingUrls}
          onPendingConsumed={onPendingConsumed}
          onUrlsChange={onUrlsChange}
        />
      </main>

      {/* Sticky sidebar with mobile drawer behavior */}
      <UrlSidebar addedUrls={addedUrlsSet} onAddUrl={onAddUrl} />
    </div>
  );
}
