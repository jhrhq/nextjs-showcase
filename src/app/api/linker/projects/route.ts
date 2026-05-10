import { type NextRequest, NextResponse } from "next/server";
import z from "zod";
import { getProjects, mockProjects } from "@/domains/linker/db/mock";
import { verifyAccessToken } from "@/domains/linker/services/auth/jwt.service";
import { createProjectSchema, updateProjectApiSchema } from "@/domains/linker/validations/projects.validations";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const accessToken = authHeader?.replace("Bearer ", "");

  const access = verifyAccessToken(accessToken);

  if (!access.valid || !access.userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const projects = getProjects(access.userId);
  return NextResponse.json({ projects }, { status: 200 });
}

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");
  const accessToken = authHeader?.replace("Bearer ", "");

  const access = verifyAccessToken(accessToken);

  if (!access.valid || !access.userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();

  const validationResult = createProjectSchema.safeParse(body);

  if (!validationResult.success) {
    const validationErrors = z.flattenError(validationResult.error);
    return NextResponse.json(
      {
        success: false,
        error: "Please check your input and try again",
        code: "VALIDATION_ERROR",
        errors: validationErrors.fieldErrors as Record<string, string[]>,
      },
      { status: 400 }
    );
  }

  const newProject = {
    id: crypto.randomUUID(),
    name: validationResult.data.name,
    domain: validationResult.data.domain,
    description: validationResult.data.description,
    status: "pending" as const,
    totalLinks: 0,
    totalCustomNetworks: 0,
    lastCrawled: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockProjects.push(newProject);

  return NextResponse.json(
    {
      success: true,
      message: "Project created successfully",
      data: newProject,
    },
    { status: 201 }
  );
}
export async function PUT(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const accessToken = authHeader?.replace("Bearer ", "");

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = verifyAccessToken(accessToken);

  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const validationResult = updateProjectApiSchema.safeParse(body);

  if (!validationResult.success) {
    const validationErrors = z.flattenError(validationResult.error);
    return NextResponse.json(
      {
        success: false,
        error: "Please check your input and try again",
        code: "VALIDATION_ERROR",
        errors: validationErrors.fieldErrors as Record<string, string[]>,
      },
      { status: 400 }
    );
  }
  const index = mockProjects.findIndex((p) => p.id === validationResult.data.projectId);

  if (index === -1) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  mockProjects[index] = {
    ...mockProjects[index],
    ...validationResult.data,
    updatedAt: new Date().toISOString(),
  };
  return NextResponse.json(
    {
      success: true,
      data: mockProjects[index],
    },
    { status: 200 }
  );
}
export async function DELETE(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const accessToken = authHeader?.replace("Bearer ", "");

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = verifyAccessToken(accessToken);

  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const validationResult = updateProjectApiSchema.shape.projectId.safeParse(body);

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
/*

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const authHeader = req.headers.get("authorization");
  const accessToken = authHeader?.replace("Bearer ", "");

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = verifyAccessToken(accessToken);

  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const index = mockProjects.findIndex((p) => p.id === params.id);

    if (index === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    mockProjects.splice(index, 1);

    return NextResponse.json({ message: "Project deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
 */
