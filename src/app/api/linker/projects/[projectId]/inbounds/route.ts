import "server-only";
import { NextResponse } from "next/server";
import z from "zod";
import { mockInboundData } from "@/domains/linker/db/mock";
import { InboundDataSchema, targetUrlSchema } from "@/domains/linker/validations/inbound.validation";

export async function POST(request: Request) {
  const body = await request.json();

  const validationResult = targetUrlSchema.safeParse(body);

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

  const dataValidation = InboundDataSchema.safeParse(mockInboundData);

  if (!dataValidation.success) {
    return NextResponse.json(
      {
        success: false,
        error: "Unexpected data format returned for the provided URL",
        code: "DATA_PARSE_ERROR",
      },
      { status: 422 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      data: dataValidation.data,
    },
    { status: 200 }
  );
}
