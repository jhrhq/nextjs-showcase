import { type NextRequest, NextResponse } from "next/server";
import z from "zod";
import { verifyAccessToken } from "@/domains/linker/services/auth/jwt.service";
import { updateProjectApiSchema } from "@/domains/linker/validations/projects.validations";
import { mockProjects } from "@/lib/db/mock";

export async function DELETE(req: NextRequest, { params }: { params: { projectId: string } }) {
  const authHeader = req.headers.get("authorization");
  const accessToken = authHeader?.replace("Bearer ", "");

  const { projectId } = await params;

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = verifyAccessToken(accessToken);

  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const validationResult = updateProjectApiSchema.shape.projectId.safeParse(projectId);

  if (!validationResult.success) {
    const validationErrors = z.flattenError(validationResult.error);
    return NextResponse.json(
      {
        success: false,
        error: "Please check your input and try again",
        code: "VALIDATION_ERROR",
        errors: validationErrors.fieldErrors,
      },
      { status: 400 }
    );
  }
  const restProjects = mockProjects.filter((p) => p.id !== validationResult.data);
  console.log("rest projects", restProjects);
  // if (index === -1) {
  //   return NextResponse.json({ error: "Project not found" }, { status: 404 });
  // }

  return NextResponse.json(
    {
      success: true,
      data: {
        ...restProjects,
        updatedAt: new Date().toISOString(),
      },
    },
    { status: 200 }
  );
}
