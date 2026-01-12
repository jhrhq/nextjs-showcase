"use server";

import { type SignInActionState, SignSchema } from "@/lib/linker/types";
import { zodIssueToActionErrors } from "@/lib/linker/utils";

// import { invalidCredentials } from "@/lib/linker/utils";

// import bcrypt from "bcryptjs"
// import { db } from "@/db"   // your database client

export async function signInAction(
  state: SignInActionState,
  formData: FormData,
): Promise<SignInActionState> {
  //Extract inputs
  const inputs = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  //Zod validation
  const parsed = SignSchema.safeParse({
    email: inputs.email,
    password: inputs.password,
  });

  if (!parsed.success) {
    return {
      ...state,
      success: false,
      message: "Validation failed",
      inputs,
      errors: {
        _errors: zodIssueToActionErrors(parsed.error.issues),
      },
    };
  }
  const user = false;
  if (!user) {
    return {
      ...state,
      errors: {
        _form: ["Wrong email or password. Try again or reset your password."],
      },
    };
  }
  /*   try {
    const user = await db.user.findUnique({ where: { email: parsed.data.email } })
    const passwordValid = user && (await bcrypt.compare(parsed.data.password, user.passwordHash))

     if (!user || !passwordValid) {
      return {
        ...state,
        errors: {
          _form: ["Wrong email or password. Try again or reset your password."],
        },
      }
    }
    if (!user) {
      return invalidCredentials(state, inputs)
    }

     if (!user.emailVerified) {
      return {
        ...state,
        errors: {
          _form: ["Please verify your email to continue."],
        },
      }
    }
    // 5️⃣ Account checks
    if (!user.emailVerified) {
      return {
        ...state,
        success: false,
        message: "Email not verified",
        inputs,
        errors: {
          _form: ["Please verify your email before signing in"],
        },
      }
    }

    if (user.disabled) {
      return {
        ...state,
        success: false,
        message: "Account disabled",
        inputs,
        errors: {
          _form: ["This account has been disabled"],
        },
      }
    }

    // 6️⃣ Password verification
    const passwordValid = await bcrypt.compare(
      parsed.data.password,
      user.passwordHash,
    )

    if (!passwordValid) {
      return invalidCredentials(state, inputs)
    }

    // 7️⃣ SUCCESS 🎉
    // 👉 create session / cookie / redirect here

    return {
      ...state,
      success: true,
      message: "Signed in successfully",
      inputs,
      errors: {},
    }
  } catch (error) {
    // 8️⃣ Catch-all (log internally)
    console.error("Sign-in error:", error)

    return {
      ...state,
      success: false,
      message: "Server error",
      inputs,
      errors: {
        _form: ["Service temporarily unavailable"],
      },
    }
  } */

  return {
    ...state,
    success: true,
    message: "Signed in successfully",
    inputs,
    errors: {},
  };
}
