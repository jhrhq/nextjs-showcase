import { NextResponse } from "next/server";
import { verifyAccessToken } from "@/domains/linker/services/auth/jwt.service";
import { getProjects } from "@/lib/db/mock";

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  const accessToken = authHeader?.replace("Bearer ", "");

  const access = verifyAccessToken(accessToken);

  if (!access.valid || !access.userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const projects = getProjects(access.userId);
  return NextResponse.json({ projects }, { status: 200 });
}
