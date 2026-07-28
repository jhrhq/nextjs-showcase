import "server-only";

import { NextResponse } from "next/server";
import z from "zod";
import { AUTH_ERROR_MESSAGES } from "@/domains/linker/constants/auth.constants";
import { authenticateUser } from "@/domains/linker/services/auth/auth.service";
import { createAccessToken, createRefreshToken } from "@/domains/linker/services/auth/jwt.service";
import { signInSchema } from "@/lib/validations/auth.schema";

export async function POST(request: Request) {
  const body = await request.json();
  const validationResult = signInSchema.safeParse(body);

  if (!validationResult.success) {
    const validationErrors = z.flattenError(validationResult.error);
    return NextResponse.json(
      {
        success: false,
        error: "Please check your input and try again",
        code: "VALIDATION_ERROR",
        errors: validationErrors.fieldErrors as Record<string, string[]>,
      },
      { status: 400 }
    );
  }

  const user = await authenticateUser(validationResult.data);

  if (!user) {
    return NextResponse.json(
      {
        error: AUTH_ERROR_MESSAGES.INVALID_CREDENTIALS,
      },
      {
        status: 401,
      }
    );
  }

  const accessToken = createAccessToken(user);
  const refreshToken = await createRefreshToken(user);

  return NextResponse.json(
    {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      accessToken,
      refreshToken,
    },
    { status: 200 }
  );
}
