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

export const CustomNetworkNestedStatusEnum = z.enum(["ACTIVE", "STALE", "UNLINKED"]);
export const CustomNetworkStateEnum = z.enum(["In Progress", "Fully Linked", "Not Started"]);

export type CustomNetworkNestedStatus = z.infer<typeof CustomNetworkNestedStatusEnum>;
export type CustomNetworkCollectionState = z.infer<typeof CustomNetworkStateEnum>;

export const STATUS_OPTIONS = CustomNetworkNestedStatusEnum.options;
export const STATE_OPTIONS = CustomNetworkStateEnum.options;
export const CustomNetworkNestedLinkSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  url: z.url(),
  anchor: z.string(),
  status: CustomNetworkNestedStatusEnum,
});

// 2. Parent Row Schema
export const CustomNetworkCollectionSchema = z.object({
  id: z.uuid(),
  url: z.url(),
  targetLinks: z.string(),
  state: CustomNetworkStateEnum,
  nestedData: z.array(CustomNetworkNestedLinkSchema),
});

// 3. Final Network Response Schema
export const CreateCustomNetworkResponseSchema = z.object({
  id: z.uuid(),
  projectId: z.uuid(),
  collectionName: z.string(),
  collections: z.array(CustomNetworkCollectionSchema).min(1),
});

export const CustomNetworkPayloadSchema = z.object({
  projectId: z.uuid(),
  customNetworkId: z.uuid(),
});
export const CustomNetworkCollectionPayloadSchema = CustomNetworkPayloadSchema.extend({ collectionId: z.uuid() });
export const CustomNetworkCollectionNestedPayloadSchema = CustomNetworkCollectionPayloadSchema.extend({
  nestedId: z.uuid(),
});

export const CustomNetworkNestedLinkStatusPayloadSchema = CustomNetworkCollectionNestedPayloadSchema.extend({
  status: CustomNetworkNestedStatusEnum,
});

export const CustomNetworkNestedLinkPayloadSchema = CustomNetworkNestedLinkStatusPayloadSchema.extend({
  anchor: z.string(),
});

export type CreateCustomNetworkResponseSchemaValues = z.infer<typeof CreateCustomNetworkResponseSchema>;

export type createCustomNetworkPayload = z.infer<typeof createCustomNetworkPayloadSchema>;

export type CreateCustomNetworkFormValues = z.infer<typeof createCustomNetworkFormSchema>;
export type CustomNetworkCollectionValues = z.infer<typeof CustomNetworkCollectionSchema>;
export type CustomNetworkNestedLinkValues = z.infer<typeof CustomNetworkNestedLinkSchema>;
// remove payloads
export type CustomNetworkPayloadValues = z.infer<typeof CustomNetworkPayloadSchema>;
export type CustomNetworkCollectionPayloadValues = z.infer<typeof CustomNetworkCollectionPayloadSchema>;
export type CustomNetworkCollectionNestedPayloadValues = z.infer<typeof CustomNetworkCollectionNestedPayloadSchema>;
export type CustomNetworkNestedLinkStatusPayloadValues = z.infer<typeof CustomNetworkNestedLinkStatusPayloadSchema>;
export type CustomNetworkNestedLinkPayloadValues = z.infer<typeof CustomNetworkNestedLinkPayloadSchema>;

export type AllCustomNetworkDataType = Record<string, CreateCustomNetworkResponseSchemaValues>;
