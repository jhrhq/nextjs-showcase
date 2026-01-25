import jwt from "jsonwebtoken";
import { AUTH_CONFIG } from "@/domains/linker/constants/auth.constants";
import { env } from "@/infra/env";
import { saveRefreshToken } from "@/lib/db/mock";

export function createAccessToken(user: { id: string; email: string }) {
  return jwt.sign({ sub: user.id, email: user.email, type: "access" }, env.ACCESS_TOKEN_SECRET, {
    expiresIn: AUTH_CONFIG.TOKENS.ACCESS_TOKEN_TTL,
  });
}

export async function createRefreshToken(user: { id: string }) {
  const token = jwt.sign(
    {
      sub: user.id,
      type: "refresh",
      jti: crypto.randomUUID(),
    },
    env.REFRESH_TOKEN_SECRET,
    { expiresIn: AUTH_CONFIG.TOKENS.REFRESH_TOKEN_TTL }
  );

  await saveRefreshToken(user.id, token);
  return token;
}
