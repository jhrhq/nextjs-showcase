import type { HydratedDocument } from "mongoose";

export interface IBetterAuthUser {
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type IAuthUserDocument = HydratedDocument<IBetterAuthUser>;
