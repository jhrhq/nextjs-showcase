// ============================================================================
// FILE: src/lib/types/auth.types.ts
// LOCATION: src/lib/types/auth.types.ts
// PURPOSE: Authentication domain types
// ============================================================================

import type { AUTH_ERROR_CODES } from "@/lib/linker/constants/auth.constants";

export type AuthErrorCode =
  (typeof AUTH_ERROR_CODES)[keyof typeof AUTH_ERROR_CODES];

export interface User {
  id: string;
  email: string;
  name: string | null;
  status: "active" | "locked" | "disabled";
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
}

export interface RateLimitEntry {
  count: number;
  resetAt: number;
}
