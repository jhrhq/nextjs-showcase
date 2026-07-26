"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { connectToDatabase } from "../config/database";
import { AUTH_CONFIG } from "../constants/auth.constants";
import { Property } from "../models";
import { type PropertyFormValues, propertySchema } from "../validationSchema/property-schema";

export type ActionResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: string;
};

export async function createPropertyAction(
  rawInput: PropertyFormValues
): Promise<ActionResponse<{ propertyId: string }>> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user) {
      return { success: false, error: "Unauthorized: You must be logged in to create a listing." };
    }

    const validationResult = propertySchema.safeParse(rawInput);
    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0]?.message || "Invalid payload submitted.";
      return { success: false, error: firstError };
    }

    await connectToDatabase();

    const hostSnapshot = {
      userId: session.user.id,
      name: session.user.name,
      avatar: session.user.image || "",
      isSuperhost: false,
      joinedYear: session.user.createdAt ? new Date(session.user.createdAt).getFullYear() : new Date().getFullYear(),
    };

    const newProperty = await Property.create({
      ...validationResult.data,
      host: hostSnapshot,
      ratingAvg: 0,
      reviewCount: 0,
    });

    revalidatePath(AUTH_CONFIG.ROUTES.HOME);
    revalidatePath(AUTH_CONFIG.ROUTES.HOSTING_CREATE);

    return {
      success: true,
      data: { propertyId: newProperty._id.toString() },
    };
  } catch (error: unknown) {
    console.error("[CREATE_PROPERTY_ACTION_ERROR]", error);

    const errorMessage = error instanceof Error ? error.message : "Failed to create property listing.";

    return { success: false, error: errorMessage };
  }
}
