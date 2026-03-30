// components/url-form/url-row.tsx
"use client";

import { Link2, Trash2 } from "lucide-react";
import React from "react";
import { type Control, Controller } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
// Import types and helpers from extracted utilities
import type { UrlFieldMeta, UrlFieldStatus } from "@/lib/url-utils";
import { cn } from "@/lib/utils";
import FormError from "@/ui/shared/auth-errro-alert";

// ─── Module-level style maps (shared with parent, defined here for independence) ──
const ICON_COLOR_MAP: Record<UrlFieldStatus, string> = {
  duplicate: "text-amber-500",
  valid: "text-blue-500",
  invalid: "text-destructive",
  empty: "text-muted-foreground/40",
};

const ROW_BORDER_MAP: Record<UrlFieldStatus, string> = {
  duplicate: "ring-1 ring-amber-400 border-amber-400 bg-amber-50/50",
  valid: "border-blue-400 bg-blue-50/30",
  invalid: "border-destructive/60 bg-destructive/5",
  empty: "border-input",
};

// ─── Props ────────────────────────────────────────────────────────────────────
export interface UrlRowProps {
  fieldId: string;
  index: number;
  total: number;
  meta: UrlFieldMeta;
  errorMessage: string | undefined;
  control: Control<any>; // Generic to avoid circular dependency with FormValues
  onRemove: (index: number) => void;
  onPaste: (e: React.ClipboardEvent<HTMLInputElement>, index: number) => void;
}

// ─── UrlRow Component (Memoized for list performance) ─────────────────────────
export const UrlRow = React.memo(
  ({ fieldId, index, total, meta, errorMessage, control, onRemove, onPaste }: UrlRowProps) => {
    const inputId = `url-field-${fieldId}`;

    return (
      <Field data-invalid={meta.isInvalid ? true : undefined} className="gap-0">
        <FieldLabel htmlFor={inputId} className="sr-only">
          URL {index + 1}
        </FieldLabel>

        <InputGroup className={cn("transition-colors border", ROW_BORDER_MAP[meta.status])}>
          {/* Index + Icon */}
          <InputGroupAddon align="inline-start" className="flex items-center gap-2 pl-3 pr-1">
            <span
              className="text-[11px] font-mono text-muted-foreground/50 w-5 text-right select-none tabular-nums"
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <Link2
              className={cn("size-4 shrink-0 transition-colors", ICON_COLOR_MAP[meta.status])}
              aria-hidden="true"
            />
          </InputGroupAddon>

          {/* Input Field */}
          <Controller
            control={control}
            name={`urls.${index}.url`}
            render={({ field }) => (
              <InputGroupInput
                {...field}
                id={inputId}
                type="url"
                placeholder="https://example.com"
                aria-invalid={meta.isInvalid}
                autoComplete="off"
                onPaste={(e) => onPaste(e, index)}
                className="border-0 shadow-none bg-transparent focus-visible:ring-0 h-11 text-sm"
              />
            )}
          />

          {/* Actions: Badges + Remove */}
          <InputGroupAddon align="inline-end" className="flex items-center gap-1.5 pr-2">
            {/* Duplicate Badge */}
            {meta.isDuplicate && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge
                    variant="outline"
                    className="text-amber-600 border-amber-300 bg-amber-50 text-[10px] cursor-default select-none px-1.5 shrink-0"
                  >
                    DUPLICATE
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>This URL appears more than once</TooltipContent>
              </Tooltip>
            )}

            {/* Validation Error Badge */}
            {meta.isInvalid && !meta.isDuplicate && errorMessage && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge
                    variant="destructive"
                    className="text-[10px] cursor-default select-none px-1.5 max-w-36 truncate shrink-0"
                  >
                    {errorMessage}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>{errorMessage}</TooltipContent>
              </Tooltip>
            )}

            {/* Remove Button */}
            {total > 1 && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemove(index)}
                    className="size-7 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0"
                    aria-label={`Remove URL ${index + 1}`}
                  >
                    <Trash2 className="size-3.5" aria-hidden="true" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Remove this URL</TooltipContent>
              </Tooltip>
            )}
          </InputGroupAddon>
        </InputGroup>

        {/* Error Message Display */}
        {meta.isInvalid && errorMessage && (
          <FieldError className="mt-1 ml-1">
            <FormError error={errorMessage} />
          </FieldError>
        )}
      </Field>
    );
  },
  // ✅ Custom comparison: only re-render when meaningful props change
  (prevProps, nextProps) => {
    return (
      prevProps.fieldId === nextProps.fieldId &&
      prevProps.index === nextProps.index &&
      prevProps.total === nextProps.total &&
      prevProps.errorMessage === nextProps.errorMessage &&
      prevProps.meta.status === nextProps.meta.status &&
      prevProps.meta.isDuplicate === nextProps.meta.isDuplicate &&
      prevProps.meta.isValid === nextProps.meta.isValid &&
      prevProps.meta.isInvalid === nextProps.meta.isInvalid
      // control, onRemove, onPaste are stable via useCallback/useForm
    );
  }
);

// Display name for React DevTools
UrlRow.displayName = "UrlRow";
