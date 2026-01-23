"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "@/domains/linker/api/auth";
import { AUTH_CONFIG } from "@/domains/linker/constants/auth.constants";
import type { SignInRequest, SignUpRequest } from "@/domains/linker/types/auth.types";
import { useAuthStore } from "@/store/linker/auth-store";

export function useSignIn() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (data: SignInRequest) => authApi.signIn(data),
    onSuccess: (response) => {
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      setUser(response.user);
      router.push(AUTH_CONFIG.ROUTES.DASHBOARD);
    },
  });
}

export function useSignUp() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (data: SignUpRequest) => authApi.signUp(data),
    onSuccess: (response) => {
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      setUser(response.user);
      router.push("/linker/dashboard");
    },
  });
}

export function useLogout() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      logout();
      router.push("/linker/sign-in");
    },
  });
}
