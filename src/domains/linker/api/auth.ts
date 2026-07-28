import { AUTH_CONFIG } from "@/domains/linker/constants/auth.constants";
import type { AuthResponse } from "@/domains/linker/types/auth.types";
import type { SignInInput, SignUpInput } from "@/lib/validations/auth.schema";
import { linkerApi } from "./axios-instance";

export const authApi = {
  signIn: async (data: SignInInput): Promise<AuthResponse> => {
    const response = await linkerApi.post(AUTH_CONFIG.API.SIGN_IN, data);
    return response.data;
  },

  signUp: async (data: SignUpInput): Promise<AuthResponse> => {
    const response = await linkerApi.post(AUTH_CONFIG.API.SIGN_UP, data);
    return response.data;
  },

  refresh: async (refreshToken: string): Promise<{ accessToken: string }> => {
    const response = await linkerApi.post(AUTH_CONFIG.API.REFRESH, { refreshToken });
    return response.data;
  },

  logout: async (): Promise<void> => {
    await linkerApi.post(AUTH_CONFIG.API.LOGOUT);
  },
};
