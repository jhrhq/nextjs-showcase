import "server-only";

import { findUserByEmail, verifyPassword } from "@/domains/linker/services/auth/jwt.service";
import type { SignInInput } from "@/domains/linker/validations/auth.validation";

export async function authenticateUser(input: SignInInput) {
  const user = await findUserByEmail(input.email);
  if (!user) return null;
  const valid = await verifyPassword(input.password, user.passwordHash);
  if (!valid) return null;

  return user;
}
