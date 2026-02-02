import { type NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "@/domains/linker/services/auth/jwt.service";
import { mockSiteReports } from "@/lib/db/mock";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const accessToken = authHeader?.replace("Bearer ", "");

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const access = verifyAccessToken(accessToken);

  if (!access.valid || !access.userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const report = mockSiteReports;

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    return NextResponse.json(report, { status: 200 });
  } catch (_rror) {
    return NextResponse.json({ error: "Failed to fetch site report" }, { status: 500 });
  }
}
