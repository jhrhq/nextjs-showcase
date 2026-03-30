/**
 * schema.ts
 *
 * Zod v4 validation schemas for the URL form.
 * Imports only from url-utils — no React dependency.
 */

import { z } from "zod";
import { findDuplicateIndices } from "./url-utils";

// ─── Per-field schema ─────────────────────────────────────────────────────────

/**
 * Validates a single URL row object.
 * Exported so `isValidUrl` in field-meta.ts can reuse the shape.
 */
export const urlItemSchema = z.object({
  url: z.string().min(1, "URL is required").url("Enter a valid URL starting with https://"),
});

// ─── Full form schema ─────────────────────────────────────────────────────────

export const formSchema = z.object({
  collectionName: z.string().min(1, "Collection name is required").max(80, "Keep it under 80 characters"),

  urls: z
    .array(urlItemSchema)
    .min(1, "Add at least one URL")
    /**
     * Zod v4 custom cross-field validation.
     * Runs after all per-field checks pass.
     * Adds a "custom" issue to every field index involved in a duplicate pair.
     */
    .superRefine((items, ctx) => {
      const dupes = findDuplicateIndices(items);

      dupes.forEach((i) => {
        ctx.addIssue({
          code: "custom",
          message: "This URL is already in the list",
          path: [i, "url"],
        });
      });
    }),
});

// ─── Inferred TypeScript type ─────────────────────────────────────────────────

/** Full form value shape, inferred directly from the Zod schema. */
export type FormValues = z.infer<typeof formSchema>;
