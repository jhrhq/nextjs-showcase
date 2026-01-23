import { create } from "zustand";
import type { User } from "@/domains/linker/types/auth.types";

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    email: "mail@mail.com",
    createdAt: "time",
    id: "1",
    name: "jo",
    plan: "enterprise",
    avatar: "jo",
  },
  isAuthenticated: true,
  setUser: (user: User | null) => set({ user, isAuthenticated: !!user }),
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
    set({ user: null, isAuthenticated: false });
  },
}));
