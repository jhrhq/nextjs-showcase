import { compare } from "bcryptjs";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { AUTH_CONFIG } from "@/domains/linker/constants/auth.constants";
import { type MockUser, mockUsers } from "@/domains/linker/db/mock";
import { env } from "@/infra/env";

type RefreshTokenRecord = {
  userId: string;
  token: string;
};

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return compare(plain, hash);
}

interface MyJwtPayload extends JwtPayload {
  type: string;
}

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

export function verifyAccessToken(token?: string) {
  if (!token) return { valid: false };

  try {
    const payload = jwt.verify(token, env.ACCESS_TOKEN_SECRET) as MyJwtPayload;
    if (payload.type !== "access") return { valid: false };
    return { valid: true, userId: payload.sub };
  } catch {
    return { valid: false };
  }
}

export function verifyRefreshToken(token?: string) {
  if (!token) return { valid: false };

  try {
    return jwt.verify(token, env.REFRESH_TOKEN_SECRET) as MyJwtPayload;
  } catch {
    return null;
  }
}

let refreshTokens: RefreshTokenRecord[] = [];

export async function findUserByEmail(email: string): Promise<MockUser | null> {
  return mockUsers.find((u) => u.email === email) ?? null;
}

export async function findUserById(id: string): Promise<MockUser | null> {
  return mockUsers.find((u) => u.id === id) ?? null;
}

export async function saveRefreshToken(userId: string, token: string) {
  refreshTokens = refreshTokens.filter((rt) => rt.userId !== userId);
  refreshTokens.push({ userId, token });
}

export async function findRefreshToken(token: string) {
  return refreshTokens.find((rt) => rt.token === token) ?? null;
}

export async function revokeRefreshToken(token: string) {
  refreshTokens = refreshTokens.filter((rt) => rt.token !== token);
}

export async function rotateRefreshToken(oldToken: string, newToken: string) {
  const index = refreshTokens.findIndex((rt) => rt.token === oldToken);

  if (index === -1) return;

  refreshTokens[index].token = newToken;
}

type RefreshPayload = {
  sub: string;
  type: "refresh";
  jti: string;
};

export async function rotateTokenIfNeeded(refreshToken: string) {
  try {
    const payload = jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET) as RefreshPayload;

    if (payload.type !== "refresh") return null;

    const record = await findRefreshToken(refreshToken);
    if (!record) return null;

    if (record.userId !== payload.sub) return null;

    const user = await findUserById(record.userId);
    if (!user) return null;

    const accessToken = createAccessToken({
      id: user.id,
      email: user.email,
    });

    const newRefreshToken = jwt.sign(
      {
        sub: user.id,
        type: "refresh",
        jti: crypto.randomUUID(),
      },
      env.REFRESH_TOKEN_SECRET,
      { expiresIn: AUTH_CONFIG.TOKENS.REFRESH_TOKEN_TTL }
    );

    await rotateRefreshToken(refreshToken, newRefreshToken);

    return {
      userId: user.id,
      accessToken,
      refreshToken: newRefreshToken,
    };
  } catch {
    return null;
  }
}
