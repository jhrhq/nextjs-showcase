import { type NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "@/domains/linker/services/auth/jwt.service";
import { ALL_CUSTOM_NETWORK_DATA } from "@/domains/linker/ui/custom-network/manage-custom-network-table/data";

type RouteParams = {
  projectId: string;
  customNetworkId: string;
};

export async function GET(request: NextRequest, { params }: { params: Promise<RouteParams> }) {
  const authHeader = request.headers.get("authorization");
  const accessToken = authHeader?.replace("Bearer ", "");

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = verifyAccessToken(accessToken);

  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { customNetworkId } = await params;
    const currentNetworkData = ALL_CUSTOM_NETWORK_DATA[customNetworkId];

    return NextResponse.json(
      {
        success: true,
        data: currentNetworkData,
      },
      { status: 200 }
    );
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
