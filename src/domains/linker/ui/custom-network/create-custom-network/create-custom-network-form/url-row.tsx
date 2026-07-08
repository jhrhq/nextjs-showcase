/**
 * url-row.tsx
 *
 * A single URL input row inside the form's field array.
 *
 * IMPORTANT — primitive props, not object props:
 *   React.memo does a shallow reference comparison on props.
 *   If we passed `meta: UrlFieldMeta` (an object), getFieldMeta would return
 *   a new object reference on every render of the parent — even when the
 *   values inside are identical — and React.memo would never bail out.
 *
 *   By passing the individual booleans (isDuplicate, isInvalid) and the
 *   status string as separate primitives, React.memo can compare them
 *   correctly and skip re-renders for rows that didn't change.
 *
 *   Typing in row 3 → only row 3 re-renders. Rows 1, 2, 4, 5 are skipped.
 */
"use client";

import { Link2, Trash2 } from "lucide-react";
import * as React from "react";
import { Controller, type FieldError as FielErrorType } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  ICON_COLOR_MAP_CREATE_CUSTOM_NETWORK,
  ROW_BORDER_MAP_CUSTOM_NETWORK,
} from "@/domains/linker/constants/custom-network.constants";
import type { UrlFieldStatus, UrlFormControl } from "@/domains/linker/types/custom-network.types";
import { cn } from "@/lib/utils";

// ─── Props ───

interface UrlRowProps {
  fieldId: string;
  index: number;
  total: number;
  /** Primitive — not an object — so React.memo comparison works correctly. */
  status: UrlFieldStatus;
  isDuplicate: boolean;
  isInvalid: boolean;
  errorMessage?: FielErrorType;
  control: UrlFormControl;
  onRemove: (index: number) => void;
  onPaste: (e: React.ClipboardEvent<HTMLInputElement>, index: number) => void;
}

// ─── Component ────

export const UrlRow = React.memo(function UrlRow({
  fieldId,
  index,
  total,
  status,
  isDuplicate,
  isInvalid,
  errorMessage,
  control,
  onRemove,
  onPaste,
}: UrlRowProps) {
  const inputId = `url-field-${fieldId}`;

  return (
    <Field data-invalid={isInvalid ? true : undefined} className="gap-0">
      <FieldLabel htmlFor={inputId} className="sr-only">
        URL {index + 1}
      </FieldLabel>

      <InputGroup className={cn("transition-colors border", ROW_BORDER_MAP_CUSTOM_NETWORK[status])}>
        {/* ── Left addon: row number + link icon ── */}
        <InputGroupAddon align="inline-start" className="flex items-center gap-2 pl-3 pr-1">
          <span
            className="text-[11px] font-mono text-muted-foreground/50 w-5 text-right select-none tabular-nums"
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <Link2
            className={cn("size-4 shrink-0 transition-colors", ICON_COLOR_MAP_CREATE_CUSTOM_NETWORK[status])}
            aria-hidden="true"
          />
        </InputGroupAddon>

        {/* ── URL input ── */}
        <Controller
          control={control}
          name={`urls.${index}.url`}
          render={({ field }) => (
            <InputGroupInput
              {...field}
              id={inputId}
              type="url"
              placeholder="https://example.com"
              aria-invalid={isInvalid}
              autoComplete="off"
              onPaste={(e) => onPaste(e, index)}
              className="border-0 shadow-none bg-transparent focus-visible:ring-0 h-11 text-sm"
            />
          )}
        />

        {/* ── Right addon: status badge + remove button ── */}
        <InputGroupAddon align="inline-end" className="flex items-center gap-1.5 pr-2">
          {isDuplicate && (
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

          {/*{isInvalid && !isDuplicate && errorMessage && (
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
          )}*/}

          {total > 1 && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemove(index)}
                  className="size-7 group-hover:opacity-100 text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0"
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

      {/* Inline field-level error — shown for both invalid and duplicate cases */}
      {isInvalid && errorMessage && (
          <FieldError className="mt-1 ml-1" errors={[errorMessage]} />
      )}
    </Field>
  );
});

UrlRow.displayName = "UrlRow";
