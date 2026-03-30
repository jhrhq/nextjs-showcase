export interface UrlItem {
  id: string;
  url: string;
  title?: string;
  domain?: string;
  category?: string;
}

export interface FormValues {
  collectionName: string;
  urls: Array<{ url: string }>;
}

export type NormalizedUrl = string; // Lowercase, Trimmed URL

export interface UseUrlSyncPattern {
  // For form
  pendingUrls: string[];
  onPendingConsumed: () => void;
  onUrlsChange: (urls: Array<{ url: string }>) => void;

  // for sidebar
  addedUrlsSet: Set<NormalizedUrl>;
  onAddurl: (url: string) => void;

  // for UI state

  formUrlCount: number;
  isUrlAdded: (url: string) => boolean;
}
