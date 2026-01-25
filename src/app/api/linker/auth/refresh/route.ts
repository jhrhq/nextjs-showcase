import { NextResponse } from "next/server";
import { rotateTokenIfNeeded } from "@/domains/linker/services/auth/jwt.service";

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization");
  const refreshToken = authHeader?.replace("Bearer ", "");

  if (!refreshToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rotated = await rotateTokenIfNeeded(refreshToken);

  if (!rotated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(
    {
      accessToken: rotated.accessToken,
      refreshToken: rotated.refreshToken,
    },
    { status: 200 }
  );
}
