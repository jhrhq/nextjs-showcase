import mongoose from "mongoose";

export interface ParsedMongooseError {
  message: string;
}

function isObject(val: unknown): val is Record<string, unknown> {
  return typeof val === "object" && val !== null;
}

function isMongoDuplicateKeyError(error: unknown): error is { code: number; keyValue?: Record<string, unknown> } {
  return isObject(error) && "code" in error && error.code === 11000;
}

export function handleMongooseError(error: unknown): ParsedMongooseError {
  if (error instanceof mongoose.Error.ValidationError) {
    const messages = Object.values(error.errors).map((err) => err.message);
    return {
      message: messages.length > 0 ? messages.join(", ") : "Database schema validation failed.",
    };
  }

  if (error instanceof mongoose.Error.CastError) {
    return {
      message: `Invalid format provided for ${error.path}.`,
    };
  }

  if (isMongoDuplicateKeyError(error)) {
    if (error.keyValue && isObject(error.keyValue)) {
      const keys = Object.keys(error.keyValue).join(", ");
      return {
        message: `A record with this ${keys} already exists.`,
      };
    }
    return {
      message: "A record with duplicate unique constraints already exists.",
    };
  }

  if (error instanceof mongoose.Error.DocumentNotFoundError) {
    return {
      message: "The requested record was not found in the database.",
    };
  }

  if (error instanceof mongoose.Error.VersionError) {
    return {
      message: "Document was updated by another request. Please reload and try again.",
    };
  }

  if (error instanceof mongoose.Error.ParallelSaveError) {
    return {
      message: "Concurrent save operations detected on this record.",
    };
  }

  if (error instanceof mongoose.Error) {
    return {
      message: error.message,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }

  return {
    message: "An unexpected database error occurred.",
  };
}
