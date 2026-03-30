/**
 * types.ts
 *
 * All TypeScript interfaces and union types for the url-form feature.
 * No runtime code — this file emits nothing to JavaScript.
 */

import type { Control } from "react-hook-form";
import type { FormValues } from "./schema";

// ─── Field status ─────────────────────────────────────────────────────────────

/**
 * The four mutually-exclusive visual states a URL row can be in.
 * Used as the key into ICON_COLOR_MAP and ROW_BORDER_MAP.
 */
export type UrlFieldStatus = "empty" | "valid" | "invalid" | "duplicate";

// ─── Per-field derived metadata ───────────────────────────────────────────────

/**
 * All derived booleans for a single URL row, computed once by `getFieldMeta`
 * and consumed by UrlRow and the JSX rendering loop.
 */
export interface UrlFieldMeta {
  status:      UrlFieldStatus;
  isDuplicate: boolean;
  isValid:     boolean;
  isInvalid:   boolean;
}

// ─── UrlForm public props ─────────────────────────────────────────────────────

/**
 * Props accepted by the main UrlForm component.
 *
 * The parent (Page.tsx) uses these three to coordinate the two-way
 * communication channel between the sidebar and the form.
 */
export interface UrlFormProps {
  /**
   * URLs pushed in from the sidebar when the user clicks a card.
   * UrlForm consumes each item, appends it to the field array,
   * then signals completion via `onPendingConsumed`.
   */
  pendingUrls?: string[];

  /** Called by UrlForm after it has processed the pendingUrls queue. */
  onPendingConsumed?: () => void;

  /**
   * Called on every change to the form's URL list so the parent can
   * track which URLs are already added (used to mark sidebar cards).
   */
  onUrlsChange?: (urls: string[]) => void;
}

// ─── RHF Control alias ────────────────────────────────────────────────────────

/**
 * Typed alias for React Hook Form's Control bound to FormValues.
 * Avoids repeating the generic parameter at every usage site.
 */
export type UrlFormControl = Control<FormValues>;
