import { z } from "zod";
import { isNextRedirectError, parseServerError } from "@/lib/auth-error";
import type { ActionState } from "@/types/shared/action.types";

export function actionCreator<TSchema extends z.ZodSchema, TOutput>(
  schema: TSchema,
  handler: (data: z.infer<TSchema>) => Promise<TOutput>
) {
  return async (input: z.infer<TSchema>): Promise<ActionState<TOutput>> => {
    const parsed = schema.safeParse(input);
    if (!parsed.success) {
      const { formErrors, fieldErrors } = z.flattenError(parsed.error);
      return { success: false, formErrors, fieldErrors };
    }

    try {
      const data = await handler(parsed.data);
      return { success: true, data };
    } catch (error) {
      if (isNextRedirectError(error)) {
        throw error;
      }
      return { success: false, message: parseServerError(error) };
    }
  };
}
