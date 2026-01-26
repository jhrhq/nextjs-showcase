/** biome-ignore-all lint/suspicious/useIterableCallbackReturn: false flag */
import axios from "axios";
import { useAuthStore } from "@/store/linker/auth-store";

export const linkerApi = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for auth token
/* linkerApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}); */

// Add response interceptor for token refresh
/* linkerApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post("/linker/auth/refresh", {
          refreshToken,
        });
        const { accessToken } = response.data;

        localStorage.setItem("accessToken", accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return linkerApi(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/linker/sign-in";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
); */

/* export const primaryClient = axios.create({
  baseURL: "/api",
}); */

let isRefreshing = false;
let queue: ((token: string) => void)[] = [];

linkerApi.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

linkerApi.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    const store = useAuthStore.getState();

    if (error.response?.status === 401 && !original._retry && store.refreshToken) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          queue.push((token) => {
            original.headers.Authorization = `Bearer ${token}`;
            resolve(linkerApi(original));
          });
        });
      }

      original._retry = true;
      isRefreshing = true;

      try {
        const refreshRes = await axios.post(
          "/api/linker/auth/refresh",
          {},
          {
            headers: {
              Authorization: `Bearer ${store.refreshToken}`,
            },
          }
        );

        const { accessToken, refreshToken } = refreshRes.data;

        store.setTokens(accessToken, refreshToken);

        queue.forEach((cb) => cb(accessToken));
        queue = [];

        original.headers.Authorization = `Bearer ${accessToken}`;
        return linkerApi(original);
      } catch {
        store.logout();
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
