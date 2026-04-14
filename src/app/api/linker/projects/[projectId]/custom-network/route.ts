import { type NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "@/domains/linker/services/auth/jwt.service";
import {
  createCustomNetworkPayloadSchema,
  STATUS_OPTIONS,
} from "@/domains/linker/validations/custom-network.validation";

const calculateState = (nested: { status: string }[]) => {
  const allUnlinked = nested.every((n) => n.status === "UNLINKED");
  if (allUnlinked) return "Unlinked";

  const allStale = nested.every((n) => n.status === "STALE");
  if (allStale) return "Fully Linked";

  const hasUnlinked = nested.some((n) => n.status === "UNLINKED");
  if (hasUnlinked) return "In Progress";

  return "Fully Linked";
};

export async function POST(request: NextRequest) {
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
    const data = await request.json();
    const parsedData = createCustomNetworkPayloadSchema.parse(data);

    if (!Array.isArray(parsedData.urls)) {
      return NextResponse.json({ error: "Expected URL array" }, { status: 400 });
    }

    const allSubmittedUrls = parsedData.urls.map((u) => u.url);

    const rows = parsedData.urls.map((parentItem) => {
      const otherUrls = allSubmittedUrls.filter((u) => u !== parentItem.url);
      const nestedData = otherUrls.map((otherUrl) => ({
        id: crypto.randomUUID(),
        title: "Internal Cross-Link",
        url: otherUrl,
        anchor: "related content",
        status: STATUS_OPTIONS[Math.floor(Math.random() * STATUS_OPTIONS.length)],
      }));
      return {
        id: crypto.randomUUID(),
        url: parentItem.url,
        targetLinks: `${nestedData.filter((n) => n.status === "ACTIVE").length}/${nestedData.length}`,
        state: calculateState(nestedData),
        nestedData,
      };
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          id: crypto.randomUUID(),
          projectId: parsedData.projectId,
          collectionName: parsedData.collectionName,
          data: rows,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
}
