// lib/auth-service.ts

// Use feature-specific prefixes to prevent cross-app data corruption
const ACCESS_KEY = "hb_access_token";
const REFRESH_KEY = "hb_refresh_token";

export function setTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem(ACCESS_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
}

export async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = localStorage.getItem(REFRESH_KEY);
  if (!refreshToken) return null;

  try {
    const response = await fetch("/api/auth/hotel-bookin/token", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (!response.ok) throw new Error("Token rotation cycle rejected.");

    const data = await response.json();
    localStorage.setItem(ACCESS_KEY, data.token);
    return data.token;
  } catch (error) {
    clearTokens();
    return null;
  }
}

export async function authenticatedFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  let token = localStorage.getItem(ACCESS_KEY);

  if (!token && localStorage.getItem(REFRESH_KEY)) {
    token = await refreshAccessToken();
  }

  const headers = new Headers(init?.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let response = await fetch(input, { ...init, headers });

  if (response.status === 401 && localStorage.getItem(REFRESH_KEY)) {
    const renewedToken = await refreshAccessToken();
    if (renewedToken) {
      headers.set("Authorization", `Bearer ${renewedToken}`);
      response = await fetch(input, { ...init, headers });
    }
  }

  return response;
}
