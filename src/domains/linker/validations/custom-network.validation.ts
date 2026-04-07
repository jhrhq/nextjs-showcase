import z from "zod";
import { findDuplicateIndices } from "../ui/custom-network/create-custom-network/create-custom-network-form/url-utils";

export const urlItemSchema = z.object({
  url: z.url("Enter a valid URL starting with https://"),
});

export const createCustomNetworkFormSchema = z.object({
  collectionName: z.string().min(1, "Collection name is required").max(80, "Keep it under 80 characters"),

  urls: z
    .array(urlItemSchema)
    .min(1, "Add at least one URL")
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

// ─── Inferred TypeScript type ────

export type CreateCustomNetworkFormValues = z.infer<typeof createCustomNetworkFormSchema>;
