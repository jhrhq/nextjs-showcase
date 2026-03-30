// components/UrlForm/formSchema.ts
import { z } from "zod";
import { findDuplicateIndices } from "./url-utils";

const urlItemSchema = z.object({
  url: z.string().min(1, "URL is required"),
});

export const formSchema = z.object({
  collectionName: z.string().min(1, "Collection name is required").max(80, "Keep it under 80 characters"),

  urls: z
    .array(urlItemSchema)
    .min(1, "Add at least one URL")
    .superRefine((items, ctx) => {
      // Use optimized duplicate detection
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

export type FormValues = z.infer<typeof formSchema>;
