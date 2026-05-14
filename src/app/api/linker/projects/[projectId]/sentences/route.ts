import "server-only";
import { NextResponse } from "next/server";
import z from "zod";
import { mockSentenceSuggestions } from "@/domains/linker/db/mock";
import { verifyAccessToken } from "@/domains/linker/services/auth/jwt.service";
import {
  SentenceSubmissionPayloadSchema,
  SentenceSuggestionPayloadSchema,
  SuggestedSentenceSchema,
} from "@/domains/linker/validations/inbound.validation";

// Inbound suggestion sentences
/**
 *
 * accepts
 * projectId,
 * postId(from suggestions post's, selected post's item.id)
 * targetId(from suggestions post's, selected post's item._postId ),
 * @returns senteces
 */

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");
  const accessToken = authHeader?.replace("Bearer ", "");

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = verifyAccessToken(accessToken);

  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const validationResult = SentenceSuggestionPayloadSchema.safeParse(body);
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

  // const { postId } = validationResult.data;
  const raw = mockSentenceSuggestions[Math.floor(Math.random() * mockSentenceSuggestions.length)] ?? [];

  const dataValidation = SuggestedSentenceSchema.safeParse(raw);

  if (!dataValidation.success) {
    return NextResponse.json(
      {
        success: false,
        error: "Data validation failed",
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

// Inbound suggestion sentences
/**
 *
 * accepts
 * projectId,
 * postId(from suggestions post's, selected post's item.id)
 * targetId(from suggestions post's, selected post's item._postId ),
 * {
 * id: senecneId
 * text: sentence
 * }
 * @returns same payload
 */
export async function PUT(request: Request) {
  const authHeader = request.headers.get("authorization");
  const accessToken = authHeader?.replace("Bearer ", "");

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = verifyAccessToken(accessToken);

  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const validationResult = SentenceSubmissionPayloadSchema.safeParse(body);

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

  return NextResponse.json(
    {
      success: true,
      data: validationResult.data,
    },
    { status: 201 }
  );
}
