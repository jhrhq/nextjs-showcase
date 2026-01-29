import { AUTH_CONFIG } from "@/domains/linker/constants/auth.constants";
import { AuthError } from "@/domains/linker/errors/auth.error";
import type { RateLimitEntry } from "@/domains/linker/types/auth.types";

/**
 * In-memory rate limiter
 *
 * PRODUCTION: Replace with Redis for distributed rate limiting
 *
 * Example Redis implementation:
 * ```typescript
 * import { Redis } from '@upstash/redis';
 * const redis = new Redis({ ... });
 *
 * async function checkRateLimit(key: string) {
 *   const count = await redis.incr(key);
 *   if (count === 1) {
 *     await redis.expire(key, WINDOW_MS / 1000);
 *   }
 *   if (count > MAX_ATTEMPTS) {
 *     throw AuthError.rateLimitExceeded();
 *   }
 * }
 * ```
 */
class RateLimitService {
  private attempts = new Map<string, RateLimitEntry>();

  /**
   * Check if request exceeds rate limit
   * @throws {AuthError} If rate limit exceeded
   */
  check(identifier: string): void {
    const now = Date.now();
    const entry = this.attempts.get(identifier);

    if (entry) {
      // Check if window has expired
      if (now >= entry.resetAt) {
        this.reset(identifier);
        this.incrementAttempt(identifier, now);
        return;
      }

      // Check if limit exceeded
      if (entry.count >= AUTH_CONFIG.RATE_LIMIT.MAX_ATTEMPTS) {
        throw AuthError.rateLimitExceeded();
      }

      // Increment attempt
      entry.count++;
    } else {
      // First attempt
      this.incrementAttempt(identifier, now);
    }
  }

  /**
   * Reset rate limit for identifier (call on successful login)
   */
  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }

  /**
   * Get remaining attempts
   */
  getRemaining(identifier: string): number {
    const entry = this.attempts.get(identifier);
    if (!entry) return AUTH_CONFIG.RATE_LIMIT.MAX_ATTEMPTS;

    const now = Date.now();
    if (now >= entry.resetAt) return AUTH_CONFIG.RATE_LIMIT.MAX_ATTEMPTS;

    return Math.max(0, AUTH_CONFIG.RATE_LIMIT.MAX_ATTEMPTS - entry.count);
  }

  private incrementAttempt(identifier: string, now: number): void {
    this.attempts.set(identifier, {
      count: 1,
      resetAt: now + AUTH_CONFIG.RATE_LIMIT.WINDOW_MS,
    });
  }

  /**
   * Cleanup expired entries (run periodically)
   */
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.attempts.entries()) {
      if (now >= entry.resetAt) {
        this.attempts.delete(key);
      }
    }
  }
}

// Singleton instance
export const rateLimitService = new RateLimitService();

// Cleanup expired entries every 5 minutes
if (typeof window === "undefined") {
  setInterval(() => rateLimitService.cleanup(), 5 * 60 * 1000);
}
