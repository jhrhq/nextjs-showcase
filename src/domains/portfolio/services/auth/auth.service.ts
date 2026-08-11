import type { AppUser } from "@/domains/linker/types/auth.types";
import { AuthError } from "@/domains/portfolio/errors/auth.error";

/**
 * Authentication Service
 *
 * Handles user authentication logic
 *
 * PRODUCTION: Replace with your actual authentication provider
 * - Database queries (Prisma, Drizzle)
 * - Password hashing (bcrypt, argon2)
 * - Third-party auth (NextAuth, Clerk, Supabase)
 */
class AuthService {
  /**
   * Authenticate user with email and password
   *
   * @throws {AuthError} If credentials are invalid or account has issues
   */
  async authenticate(email: string, password: string): Promise<AppUser> {
    // MOCK: Replace with actual database query
    const user = await this.findUserByEmail(email);

    if (!user) {
      throw AuthError.invalidCredentials();
    }

    // MOCK: Replace with bcrypt.compare(password, user.hashedPassword)
    const isPasswordValid = await this.verifyPassword(password, user.id);

    if (!isPasswordValid) {
      throw AuthError.invalidCredentials();
    }

    // Check account status
    this.validateAccountStatus(user);

    return user;
  }

  /**
   * Validate account is in good standing
   * @throws {AuthError} If account is locked, disabled, or email not verified
   */
  private validateAccountStatus(user: AppUser): void {
    if (user.status === "locked") {
      throw AuthError.accountLocked();
    }

    if (user.status === "disabled") {
      throw AuthError.accountDisabled();
    }

    if (!user.emailVerified) {
      throw AuthError.emailNotVerified();
    }
  }

  /**
   * MOCK: Find user by email
   * PRODUCTION: Replace with database query
   */
  private async findUserByEmail(email: string): Promise<AppUser | null> {
    // Simulate database latency
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Mock user data
    if (email === "test@example.com") {
      return {
        id: "1",
        email: "test@example.com",
        name: "Test User",
        status: "active",
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }

    return null;
  }

  /**
   * MOCK: Verify password
   * PRODUCTION: Use bcrypt.compare(password, hashedPassword)
   */
  private async verifyPassword(password: string, _userId: string): Promise<boolean> {
    // Mock password verification
    // In production: const isValid = await bcrypt.compare(password, user.hashedPassword);
    return password === "password123";
  }
}

export const authService = new AuthService();
