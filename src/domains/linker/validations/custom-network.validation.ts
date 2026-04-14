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

export const createCustomNetworkPayloadSchema = createCustomNetworkFormSchema.extend({
  projectId: z.uuid(),
});

export const StatusEnum = z.enum(["ACTIVE", "STALE", "UNLINKED"]);
export const StateEnum = z.enum(["In Progress", "Fully Linked", "Unlinked"]);

export const STATUS_OPTIONS = StatusEnum.options;
export const STATE_OPTIONS = StateEnum.options;

export const NestedLinkResponseSchema = z.object({
  id: z.uuid(), // Zod v4 top-level UUID validation
  title: z.string(),
  url: z.url(), // Zod v4 top-level URL validation
  anchor: z.string(),
  status: StatusEnum,
});

// 2. Parent Row Schema
export const RegistryRowResponseSchema = z.object({
  id: z.uuid(),
  url: z.url(),
  targetLinks: z.string(), // e.g., "2/4"
  state: StateEnum,
  nestedData: z.array(NestedLinkResponseSchema),
});

// 3. Final Network Response Schema
export const CreateCustomNetworkResponseSchema = z.object({
  projectId: z.uuid(),
  collectionName: z.string(),
  data: z.array(RegistryRowResponseSchema).min(1),
});

export type createCustomNetworkPayload = z.infer<typeof createCustomNetworkPayloadSchema>;

export type CreateCustomNetworkFormValues = z.infer<typeof createCustomNetworkFormSchema>;

export type CreateCustomNetworkResponseSchemaValues = z.infer<typeof CreateCustomNetworkResponseSchema>;
