import type { AuthResponse, SignInRequest, SignUpRequest } from "@/domains/linker/types/auth.types";
import { linkerApi } from "./axios-instance";

export const authApi = {
  signIn: async (data: SignInRequest): Promise<AuthResponse> => {
    const response = await linkerApi.post("/linker/auth/sign-in", data);
    return response.data;
  },

  signUp: async (data: SignUpRequest): Promise<AuthResponse> => {
    const response = await linkerApi.post("/linker/auth/sign-up", data);
    return response.data;
  },

  refresh: async (refreshToken: string): Promise<{ accessToken: string }> => {
    const response = await linkerApi.post("/linker/auth/refresh", { refreshToken });
    return response.data;
  },

  logout: async (): Promise<void> => {
    await linkerApi.post("/linker/auth/logout");
  },
};
