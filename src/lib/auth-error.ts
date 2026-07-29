import mongoose from "mongoose";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { AUTH_CODE_MAP, STATUS_MAP } from "@/constants/auth.constants";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isNextRedirectError(error: unknown): boolean {
  if (isRedirectError(error)) return true;

  if (typeof error === "object" && error !== null) {
    if ("message" in error && error.message === "NEXT_REDIRECT") return true;
    if ("digest" in error && typeof error.digest === "string" && error.digest.startsWith("NEXT_REDIRECT")) {
      return true;
    }
  }

  return false;
}

export function parseServerError(error: unknown): string {
  if (error instanceof mongoose.Error.ValidationError) {
    const messages = Object.values(error.errors).map((e) => e.message);
    return messages.join(", ") || "Validation failed.";
  }

  if (error instanceof mongoose.Error.CastError) {
    return `Invalid format provided for '${error.path}'.`;
  }

  if (isRecord(error) && error.code === 11000) {
    return "A record with this information already exists.";
  }

  if (isRecord(error)) {
    if (typeof error.code === "string" && error.code in AUTH_CODE_MAP) {
      return AUTH_CODE_MAP[error.code as keyof typeof AUTH_CODE_MAP];
    }

    if (typeof error.status === "number" && error.status in STATUS_MAP) {
      return STATUS_MAP[error.status as keyof typeof STATUS_MAP];
    }

    if (typeof error.message === "string" && error.message.length > 0 && error.message.length < 120) {
      return error.message;
    }
  }

  if (isNextRedirectError(error)) {
    throw error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return AUTH_CODE_MAP.SERVER_ERROR;
}
