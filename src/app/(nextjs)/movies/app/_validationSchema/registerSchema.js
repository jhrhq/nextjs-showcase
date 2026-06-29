import { z } from "zod";
const registerFormSchema = z
  .object({
    firstName: z
      .string({ message: "First name is required" })
      .min(2, {
        message: "First name must be at least 2 characters.",
      })
      .max(50, {
        message: "First name must not be longer than 255 characters.",
      }),
    lastName: z
      .string({ message: "Last name is required" })
      .min(2, {
        message: "Last name must be at least 2 characters.",
      })
      .max(50, {
        message: "Last name must not be longer than 255 characters.",
      }),

    email: z
      .string({ message: "Email is required" })
      .email("Please enter a valid email address."),
    password: z
      .string({ message: "Password is required" })
      .min(6, "Please choose a longer password")
      .max(64, "Consider using a short password"),
    confirmPassword: z
      .string({ message: "Confirm password is required" })
      .min(1, "Please confirm your password"),
    policyAgreement: z
      .boolean({ message: "Policy agreement is required" })
      .default(false),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password did not match",
  })
  .superRefine(({ policyAgreement }, ctx) => {
    if (!policyAgreement) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["policyAgreement"],
        message: "You must  agree to the Terms of Service and Privacy Policy.",
      });
    }
  });

export { registerFormSchema };
