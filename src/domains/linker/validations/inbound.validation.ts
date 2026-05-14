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

export const SentenceSuggestionPayloadSchema = z.object({
  projectId: z.uuid(),
  postId: z.uuid(),
  targetId: z.uuid(),
});

export const SuggestedSentenceSchema = z.array(
  z.object({
    id: z.uuid(),
    text: z.string().min(1),
  })
);
export const SingleSentenceSchema = SuggestedSentenceSchema.element;

export const SentenceSubmissionPayloadSchema = SentenceSuggestionPayloadSchema.extend({
  sentence: SingleSentenceSchema,
});

export type InboundData = z.infer<typeof InboundDataSchema>;

export type TargetUrlFormValues = z.infer<typeof targetUrlSchema>;

export type SuggestedSentencesPayloadValues = z.infer<typeof SentenceSuggestionPayloadSchema>;
export type SuggestedSentences = z.infer<typeof SuggestedSentenceSchema>;
export type SingleSentenceSuggestion = z.infer<typeof SingleSentenceSchema>;
export type SentenceSelectionPayload = z.infer<typeof SentenceSubmissionPayloadSchema>;
