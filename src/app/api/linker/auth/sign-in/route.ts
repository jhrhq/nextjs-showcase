import { NextResponse } from "next/server";
import z from "zod";
import { signInSchema } from "@/domains/linker/validations/auth.validation";

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
}
