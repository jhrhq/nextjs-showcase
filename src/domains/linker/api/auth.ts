import { AUTH_CONFIG } from "@/domains/linker/constants/auth.constants";
import type { AuthResponse, SignInRequest, SignUpRequest } from "@/domains/linker/types/auth.types";
import { linkerApi } from "./axios-instance";

export const authApi = {
  signIn: async (data: SignInRequest): Promise<AuthResponse> => {
    const response = await linkerApi.post(AUTH_CONFIG.API.SIGN_IN, data);
    return response.data;
  },

  signUp: async (data: SignUpRequest): Promise<AuthResponse> => {
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
