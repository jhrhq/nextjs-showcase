export type ActionResponse<T = undefined> =
  | { success: true; message?: string; data?: T }
  | { success: false; message: string; errors?: Record<string, string[]> };
