/**
 * lib/db/mongoose-errors.ts
 *
 * Typed utilities for classifying Mongoose / MongoDB driver errors.
 *
 * Used by Route Handlers to map low-level DB errors to HTTP status codes
 * without leaking internal error messages to API consumers.
 *
 * ┌─────────────────────────────────────────────────────────┐
 * │  Error type          │ MongoDB code │ HTTP status        │
 * ├─────────────────────────────────────────────────────────┤
 * │  Duplicate key       │ 11000        │ 409 Conflict       │
 * │  Validation error    │ —            │ 422 Unprocessable  │
 * │  Document not found  │ —            │ 404 Not Found      │
 * │  Unknown             │ —            │ 500 Internal       │
 * └─────────────────────────────────────────────────────────┘
 */

import mongoose from "mongoose";

// ---------------------------------------------------------------------------
// Duplicate key (Gate 2 — one-review-per-user-per-listing)
// ---------------------------------------------------------------------------

/**
 * Returns true when the error is a MongoDB duplicate key error (code 11000).
 *
 * Used by the review Route Handler to detect a violation of the unique
 * compound index { userId, listingId } and return HTTP 409 instead of 500.
 *
 * @example
 * ```ts
 * try {
 *   await ReviewModel.create(payload);
 * } catch (err: unknown) {
 *   if (isDuplicateKeyError(err)) {
 *     return NextResponse.json({ error: "Review already submitted" }, { status: 409 });
 *   }
 *   throw err;
 * }
 * ```
 */
export function isDuplicateKeyError(error: unknown): boolean {
  // MongoServerError from the native driver
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code: unknown }).code === 11000
  ) {
    return true;
  }
  return false;
}

// ---------------------------------------------------------------------------
// Mongoose validation error
// ---------------------------------------------------------------------------

/**
 * Returns true when the error is a Mongoose ValidationError.
 * These are caused by schema-level validators failing before a DB write.
 */
export function isValidationError(
  error: unknown
): error is mongoose.Error.ValidationError {
  return error instanceof mongoose.Error.ValidationError;
}

/**
 * Extracts a flat map of { fieldPath → errorMessage } from a
 * Mongoose ValidationError for safe inclusion in a 422 response body.
 *
 * Does NOT expose internal schema details — only the human-readable
 * message attached to each ValidatorError.
 */
export function extractValidationMessages(
  error: mongoose.Error.ValidationError
): Record<string, string> {
  const messages: Record<string, string> = {};

  for (const [field, validatorError] of Object.entries(error.errors)) {
    messages[field] = validatorError.message;
  }

  return messages;
}

// ---------------------------------------------------------------------------
// Cast error (malformed ObjectId, wrong field type, etc.)
// ---------------------------------------------------------------------------

/**
 * Returns true when the error is a Mongoose CastError.
 * The most common cause is passing a non-ObjectId string where an ObjectId
 * is expected (e.g., a malformed `listingId` URL parameter).
 */
export function isCastError(
  error: unknown
): error is mongoose.Error.CastError {
  return error instanceof mongoose.Error.CastError;
}

// ---------------------------------------------------------------------------
// Generic DB error classifier — used in catch blocks
// ---------------------------------------------------------------------------

export type DbErrorKind =
  | "duplicate_key"
  | "validation"
  | "cast"
  | "unknown";

/**
 * Classifies an unknown caught value into a DbErrorKind discriminant.
 *
 * Allows Route Handlers to use a single switch/case instead of a chain of
 * `if (isDuplicateKeyError) … else if (isValidationError) …` branches.
 *
 * @example
 * ```ts
 * const kind = classifyDbError(err);
 * switch (kind) {
 *   case "duplicate_key": return NextResponse.json(..., { status: 409 });
 *   case "validation":    return NextResponse.json(..., { status: 422 });
 *   case "cast":          return NextResponse.json(..., { status: 400 });
 *   default:              throw err;
 * }
 * ```
 */
export function classifyDbError(error: unknown): DbErrorKind {
  if (isDuplicateKeyError(error)) return "duplicate_key";
  if (isValidationError(error))   return "validation";
  if (isCastError(error))         return "cast";
  return "unknown";
}
