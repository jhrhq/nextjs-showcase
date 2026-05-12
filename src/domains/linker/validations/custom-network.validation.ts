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
export const StateEnum = z.enum(["In Progress", "Fully Linked", "Not Started"]);

export const STATUS_OPTIONS = StatusEnum.options;
export const STATE_OPTIONS = StateEnum.options;

export const CustomNetworkNestedLinkSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  url: z.url(),
  anchor: z.string(),
  status: StatusEnum,
});

// 2. Parent Row Schema
export const CustomNetworkCollectionSchema = z.object({
  id: z.uuid(),
  url: z.url(),
  targetLinks: z.string(),
  state: StateEnum,
  nestedData: z.array(CustomNetworkNestedLinkSchema),
});

// 3. Final Network Response Schema
export const CreateCustomNetworkResponseSchema = z.object({
  id: z.uuid(),
  projectId: z.uuid(),
  collectionName: z.string(),
  collections: z.array(CustomNetworkCollectionSchema).min(1),
});

export const DeleteCustomNetworkRowSchema = z.object({
  projectId: z.uuid(),
  customNetworkId: z.uuid(),
  collectionId: z.uuid(),
});
export const DeleteCustomNetworkNestedSchema = DeleteCustomNetworkRowSchema.extend({ nestedId: z.uuid() });

export const UpdateCustomNetworkStatusSchema = DeleteCustomNetworkNestedSchema.extend({ status: StatusEnum });

export const UpdateCustomNetworkAddLinkSchema = UpdateCustomNetworkStatusSchema.extend({
  anchor: z.string(),
});

export type createCustomNetworkPayload = z.infer<typeof createCustomNetworkPayloadSchema>;

export type CreateCustomNetworkFormValues = z.infer<typeof createCustomNetworkFormSchema>;
export type CustomNetworkCollectionValues = z.infer<typeof CustomNetworkCollectionSchema>;
export type CustomNetworkNestedLinkValues = z.infer<typeof CustomNetworkNestedLinkSchema>;
export type DeleteCustomNetworkRow = z.infer<typeof DeleteCustomNetworkRowSchema>;
export type DeleteCustomNetworkNested = z.infer<typeof DeleteCustomNetworkNestedSchema>;
export type UpdateCustomNetworkStatus = z.infer<typeof UpdateCustomNetworkStatusSchema>;
export type UpdateCustomNetworkAddLink = z.infer<typeof UpdateCustomNetworkAddLinkSchema>;

export type CreateCustomNetworkResponseSchemaValues = z.infer<typeof CreateCustomNetworkResponseSchema>;

export type AllCustomNetworkDataType = Record<string, CreateCustomNetworkResponseSchemaValues>;
