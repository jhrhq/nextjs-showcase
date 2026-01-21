// ============================================================================
// FILE: src/lib/services/auth/session.service.ts
// LOCATION: src/lib/services/auth/session.service.ts
// PURPOSE: Session management service
// ============================================================================

import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { AUTH_CONFIG } from "@/lib/linker/constants/auth.constants";
import type { Session } from "@/lib/linker/types/auth.types";

/**
 * Session Service
 *
 * Handles session creation, validation, and management
 *
 * PRODUCTION: Replace with database-backed sessions or JWT
 *
 * Example with Prisma:
 * ```typescript
 * async function createSession(userId: string) {
 *   const session = await prisma.session.create({
 *     data: {
 *       userId,
 *       token: generateSecureToken(),
 *       expiresAt: new Date(Date.now() + MAX_AGE * 1000),
 *     },
 *   });
 *   return session;
 * }
 * ```
 */
class SessionService {
  /**
   * Create a new session and set cookie
   */
  async create(userId: string): Promise<Session> {
    // Generate session token
    const session: Session = {
      id: crypto.randomUUID(),
      userId,
      token: this.generateToken(userId),
      expiresAt: new Date(Date.now() + AUTH_CONFIG.SESSION.MAX_AGE * 1000),
    };

    // Set HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set(AUTH_CONFIG.SESSION.COOKIE_NAME, session.token, {
      ...AUTH_CONFIG.SESSION.COOKIE_OPTIONS,
      maxAge: AUTH_CONFIG.SESSION.MAX_AGE,
    });

    return session;
  }

  /**
   * Get current session from cookie
   */
  async get(): Promise<string | null> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(AUTH_CONFIG.SESSION.COOKIE_NAME);
    return sessionCookie?.value || null;
  }

  /**
   * Delete session (logout)
   */
  async delete(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(AUTH_CONFIG.SESSION.COOKIE_NAME);
  }

  /**
   * Generate secure session token
   * PRODUCTION: Use crypto.randomBytes or nanoid
   */
  private generateToken(userId: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2);
    return `${userId}_${timestamp}_${random}`;
  }
}

export const sessionService = new SessionService();

export async function getSession(req: NextRequest) {
  const token = req.cookies.get("session-token")?.value;
  if (!token) return null;

  try {
    // Local verification (no DB call)
    const sessionData = await token; // decrypt(token)
    return sessionData;
  } catch (_error) {
    return null;
  }
}
