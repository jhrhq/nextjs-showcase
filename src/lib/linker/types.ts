import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .email("Please add a valid email")
    .max(32, "Email must be at most 32 characters."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(100, "Password must be at most 100 characters."),
});

export type LoginFormData = z.infer<typeof loginSchema>;
// type LoginFormDataErrors = z.ZodFlattenedError<LoginFormData>["fieldErrors"];

export type SimplifiedZodError = {
  type?: z.core.$ZodIssue["code"];
  message?: z.core.$ZodIssue["message"];
};

export type SignInErrors = {
  _form?: string[];
  _errors?: Record<string, SimplifiedZodError>;
};

export type SignInActionState = {
  success: boolean;
  message: string;
  inputs: {
    email: FormDataEntryValue | null;
    password: FormDataEntryValue | null;
  };
  errors?: SignInErrors;
};
