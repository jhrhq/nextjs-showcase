// lib/db/mock.ts
import { compare, hash } from "bcryptjs";

export type User = {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
};

type RefreshTokenRecord = {
  userId: string;
  token: string;
};

const users: User[] = [
  {
    id: "1",
    email: "user@example.com",
    name: "Mock User",
    passwordHash: await hash("password123", 10),
  },
];

let refreshTokens: RefreshTokenRecord[] = [];

export async function findUserByEmail(email: string): Promise<User | null> {
  return users.find((u) => u.email === email) ?? null;
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

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return compare(plain, hash);
}
