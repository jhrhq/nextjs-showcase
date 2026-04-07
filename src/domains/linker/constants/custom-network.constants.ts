/**
 * constants.ts
 *
 * Module-level constants for the url-form feature.
 * Defined here (not inside components) so JavaScript allocates each object
 * exactly once — never on every render.
 */

import type { UrlFieldStatus } from "../types/custom-network.types";
import type { CreateCustomNetworkFormValues } from "../validations/custom-network.validation";

/**
 * Starting state of the form.
 * Passed to `useForm({ defaultValues })` and `reset()`.
 *
 * Defined outside the component so the object reference is stable —
 * a new object on every render can confuse RHF into thinking values changed.
 */
export const CREATE_CUSTOM_NETWORK_FORM_DEFAULTS: CreateCustomNetworkFormValues = {
  collectionName: "",
  urls: [{ url: "" }],
};

// ─── Placeholder text ────

/**
 * Multi-line placeholder for the bulk import textarea.
 * Kept as a constant to avoid constructing the string on every render.
 */
export const BULK_PLACEHOLDER_CREATE_CUSTOM_NETWORK =
  "Paste anything, for example:\n\n" +
  "https://github.com, https://vercel.com\n" +
  '<a href="https://example.com">link</a>\n' +
  '{"url":"https://api.example.com"}';

// ─── Style maps ───────────────────────────────────────────────────────────────

/**
 * Tailwind class for the Link2 icon inside each URL row, keyed by field status.
 * "valid" deliberately uses blue (not emerald) per design spec.
 */
export const ICON_COLOR_MAP_CREATE_CUSTOM_NETWORK: Readonly<Record<UrlFieldStatus, string>> = {
  duplicate: "text-amber-500",
  valid: "text-blue-500",
  invalid: "text-destructive",
  empty: "text-muted-foreground/40",
};

/**
 * Tailwind classes for the URL row container border and background,
 * keyed by field status.
 */
export const ROW_BORDER_MAP_CUSTOM_NETWORK: Readonly<Record<UrlFieldStatus, string>> = {
  duplicate: "ring-1 ring-amber-400 border-amber-400 bg-amber-50/50",
  valid: "border-blue-400 bg-blue-50/30",
  invalid: "border-destructive/60 bg-destructive/5",
  empty: "border-input",
};
