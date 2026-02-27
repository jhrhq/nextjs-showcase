import { z } from "zod";

export const targetUrlSchema = z.object({
  url: z.url("Must be a valid URL"),
});

export const PostSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1),
  url: z.url(),
  language: z.string().min(2),
  postType: z.string().min(1),
  // builder: z.string().min(1),
});

export type Post = z.infer<typeof PostSchema>;

export const InboundPostSchema = PostSchema.extend({
  category: z.string().min(1),
  projectId: z.uuid(),
});

export type InboundPost = z.infer<typeof InboundPostSchema>;

export const SuggestionSchema = InboundPostSchema.omit({
  projectId: true,
}).extend({
  _postId: z.uuid(),
  score: z.number().int().nonnegative(),
});

export type InboundSuggestions = z.infer<typeof SuggestionSchema>;

export const InboundDataSchema = z.object({
  post: InboundPostSchema,
  suggestions: z.array(SuggestionSchema).default([]),
});

export type InboundData = z.infer<typeof InboundDataSchema>;

export type TargetUrlFormValues = z.infer<typeof targetUrlSchema>;
