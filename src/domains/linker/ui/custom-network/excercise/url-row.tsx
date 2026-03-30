"use client";

import { Link, Trash2 } from "lucide-react";
import * as React from "react";
import type { Control, FieldError } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { FormFieldWrapper } from "@/ui/shared/form-field-wrapper";
import type { FormValues } from "./url-form-schema";

export interface UrlRowMeta {
  isValid: boolean;
  isDuplicate: boolean;
  isEmpty: boolean;
  fieldError?: FieldError;
}

interface UrlRowProps {
  fieldId: string;
  index: number;
  total: number;
  meta: UrlRowMeta;
  errorMessage?: string;
  control: Control<FormValues>;
  onRemove: (index: number) => void;
  onPaste: (e: React.ClipboardEvent<HTMLInputElement>, index: number) => void;
}

/**
 * Memoized URL row - prevents re-render when other rows change
 * Only re-renders when its own props change
 */
export const UrlRow = React.memo(function UrlRow({
  fieldId,
  index,
  total,
  meta,
  errorMessage,
  control,
  onRemove,
  onPaste,
}: UrlRowProps) {
  const handleRemove = React.useCallback(() => {
    onRemove(index);
  }, [onRemove, index]);

  const handlePaste = React.useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      onPaste(e, index);
    },
    [onPaste, index]
  );

  return (
    <div
      className={cn(
        "group flex items-start gap-2 p-2 rounded-lg transition-colors",
        "hover:bg-muted/50 focus-within:bg-muted/50",
        meta.isDuplicate && "ring-1 ring-destructive/50 bg-destructive/5",
        meta.isEmpty && !meta.isDuplicate && "opacity-70"
      )}
    >
      {/* Index badge */}
      <div
        className={cn(
          "size-6 shrink-0 flex items-center justify-center rounded text-xs font-medium",
          meta.isDuplicate ? "bg-destructive text-destructive-foreground" : "bg-muted text-muted-foreground"
        )}
        aria-hidden="true"
      >
        {index + 1}
      </div>

      {/* URL input field */}
      <div className="flex-1 min-w-0">
        <FormFieldWrapper<FormValues>
          control={control}
          name={`urls.${index}.url`}
          label={index === 0 ? "URL" : undefined}
          className="sr-only" // Visually hidden label, accessible via aria
          render={({ field }) => (
            <InputGroup>
              <InputGroupInput
                {...field}
                id={fieldId}
                placeholder="https://example.com"
                className={cn(
                  "font-mono text-sm",
                  meta.isDuplicate && "border-destructive focus-visible:ring-destructive",
                  !meta.isValid && !meta.isDuplicate && "border-yellow-500"
                )}
                onPaste={handlePaste}
                aria-invalid={!!errorMessage}
                aria-describedby={errorMessage ? `${fieldId}-error` : undefined}
              />
              <div
                className="absolute right-2 top-1/2 -translate-y-1/2
                                text-[10px] text-muted-foreground
                                opacity-0 group-focus-within:opacity-100
                                transition-opacity pointer-events-none"
              >
                Paste multiple URLs
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Link
                  className={cn(
                    "size-3.5 transition-colors",
                    meta.isValid ? "text-green-600" : "text-muted-foreground/50"
                  )}
                  aria-hidden="true"
                />
              </div>
            </InputGroup>
          )}
        />

        {/* Error message */}
        {errorMessage && (
          <span id={`${fieldId}-error`} className="mt-1 block text-xs text-destructive" role="alert">
            {errorMessage}
          </span>
        )}
      </div>

      {/* Remove button */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={handleRemove}
        className={cn(
          "size-7 shrink-0 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity",
          "text-muted-foreground hover:text-destructive"
        )}
        aria-label={`Remove URL ${index + 1}`}
        disabled={total <= 1}
      >
        <Trash2 className="size-3.5" aria-hidden="true" />
      </Button>
    </div>
  );
});

// Display name for React DevTools
UrlRow.displayName = "UrlRow";
