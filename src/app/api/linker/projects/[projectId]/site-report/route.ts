import { type NextRequest, NextResponse } from "next/server";
import { mockSiteReports } from "@/domains/linker/db/mock";
import { verifyAccessToken } from "@/domains/linker/services/auth/jwt.service";

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
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: error instanceof Error ? error.message : "Internal Server Error",
        },
      },
      { status: 500 }
    );
  }
}
