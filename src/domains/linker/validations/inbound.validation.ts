import { z } from "zod";

export const targetUrlSchema = z.object({
  url: z.url("Must be a valid URL"),
});

export type TargetUrlFormValues = z.infer<typeof targetUrlSchema>;
