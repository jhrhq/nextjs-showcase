import { create } from "zustand";

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user: User | null) => set({ user, isAuthenticated: !!user }),
  logout: () => {
    if (typeof window !== "undefined") {
      // Make sure we're in the browser
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
    set({ user: null, isAuthenticated: false });
  },
}));
