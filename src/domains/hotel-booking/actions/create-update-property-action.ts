"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import z from "zod";
import { actionCreator } from "@/lib/actions/action-creator";
import { auth } from "@/lib/auth";
import { verifySession } from "@/lib/dal";
import { connectToDatabase } from "../config/database";
import { AUTH_CONFIG } from "../constants/auth.constants";
import { PROPERTY_MESSAGES } from "../constants/property.constants";
import { Property } from "../models";
import { propertySchema } from "../validationSchema/property.schema";

const updatePropertySchema = propertySchema.extend({
  propertyId: z.string().min(1, "Property ID is required."),
});

export const createPropertyAction = actionCreator(propertySchema, async (data) => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    throw new Error(PROPERTY_MESSAGES.UNAUTHORIZED_CREATE);
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
    ...data,
    host: hostSnapshot,
    ratingAvg: 0,
    reviewCount: 0,
  });

  revalidatePath(AUTH_CONFIG.ROUTES.HOME);
  revalidatePath(AUTH_CONFIG.ROUTES.HOSTING_CREATE);

  return { message: `${newProperty.title} - ${PROPERTY_MESSAGES.CREATE_SUCCESS}` };
});

export const updatePropertyAction = actionCreator(updatePropertySchema, async ({ propertyId, ...propertyData }) => {
  const { userId } = await verifySession();

  await connectToDatabase();

  const updatedProperty = await Property.findOneAndUpdate(
    {
      _id: propertyId,
      "host.userId": userId,
    },
    {
      $set: propertyData,
    },
    { new: true }
  );

  if (!updatedProperty) {
    throw new Error(PROPERTY_MESSAGES.NOT_FOUND_OR_UNAUTHORIZED);
  }

  revalidatePath(AUTH_CONFIG.ROUTES.HOME);
  revalidatePath(AUTH_CONFIG.ROUTES.HOSTING_LISTING);
  revalidatePath(AUTH_CONFIG.ROUTES.HOSTING_LISTING_EDIT(propertyId));

  return { message: PROPERTY_MESSAGES.UPDATE_SUCCESS };
});
