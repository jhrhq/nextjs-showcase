// ============================================================================
// FILE: src/lib/types/action.types.ts
// LOCATION: src/lib/types/action.types.ts
// PURPOSE: Generic server action result types
// ============================================================================

/**
 * Standard server action result type
 * Ensures consistent error handling across all server actions
 */
export type ActionResult<TData = void> = ActionSuccess<TData> | ActionError;

export interface ActionSuccess<TData = void> {
  success: true;
  data: TData;
  message?: string;
}

export interface ActionError {
  success: false;
  error: string;
  code?: string;
  fieldErrors?: FieldErrors;
}

export type FieldErrors = Record<string, string[]>;
