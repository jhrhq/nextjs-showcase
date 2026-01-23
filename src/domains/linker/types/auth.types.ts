// ============================================================================
// FILE: src/lib/types/auth.types.ts
// LOCATION: src/lib/types/auth.types.ts
// PURPOSE: Authentication domain types
// ============================================================================

import type { AUTH_ERROR_CODES } from "@/domains/linker/constants/auth.constants";

export type AuthErrorCode = (typeof AUTH_ERROR_CODES)[keyof typeof AUTH_ERROR_CODES];

export interface AppUser {
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

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  plan: "free" | "pro" | "enterprise";
  createdAt: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  error: string | undefined;
  fieldErrors: {
    email?: string[] | undefined;
    password?: string[] | undefined;
  };
  user: User;
  accessToken: string;
  refreshToken: string;
}
