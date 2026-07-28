"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "@/domains/linker/api/auth";
import { AUTH_CONFIG } from "@/domains/linker/constants/auth.constants";
import type { SignInInput, SignUpInput } from "@/lib/validations/auth.schema";
import { useAuthStore } from "@/store/linker/auth-store";

export function useSignIn() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const setTokens = useAuthStore((state) => state.setTokens);

  return useMutation({
    mutationFn: (data: SignInInput) => authApi.signIn(data),
    onSuccess: (response) => {
      setUser(response.user);
      setTokens(response.accessToken, response.refreshToken);
      router.push(AUTH_CONFIG.ROUTES.DASHBOARD);
    },
  });
}

export function useSignUp() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (data: SignUpInput) => authApi.signUp(data),
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
