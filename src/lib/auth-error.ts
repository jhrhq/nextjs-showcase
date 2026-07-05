import { AuthError, CODE_MAP, STATUS_MAP } from "@/constants/auth.constants";

export function parseAuthError(error: AuthError): string {
  if (error.code && CODE_MAP[error.code]) return CODE_MAP[error.code];
  if (error.status && STATUS_MAP[error.status]) return STATUS_MAP[error.status];

  const msg = error.message?.trim();
  if (msg && msg.length < 120 && !/^[A-Z_]+$/.test(msg)) return msg;

  return "Something went wrong. Please try again.";
}
