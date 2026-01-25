import "server-only";

import type { SignInInput } from "@/domains/linker/validations/auth.validation";
import { findUserByEmail, verifyPassword } from "@/lib/db/mock";

export async function authenticateUser(input: SignInInput) {
  const user = await findUserByEmail(input.email);
  if (!user) return null;
  const valid = await verifyPassword(input.password, user.passwordHash);
  if (!valid) return null;

  return user;
}
