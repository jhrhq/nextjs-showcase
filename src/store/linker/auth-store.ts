import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/domains/linker/types/auth.types";

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  setUser: (user: User | null) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

/* const user: User = {
  email: "mail@mail.com",
  createdAt: "time",
  id: "1",
  name: "jo",
  plan: "enterprise",
  avatar: "jo",
}; */

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      hasHydrated: false,
      setUser: (user: User | null) => set({ user, isAuthenticated: !!user }),
      setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
      logout: () => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        }
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "linker",
      onRehydrateStorage: () => (state) => {
        if (state?.user) {
          state.isAuthenticated = true;
        }
        state!.hasHydrated = true;
      },
    }
  )
);
