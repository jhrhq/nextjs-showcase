"use client";

import { Sparkles } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import { BULK_PLACEHOLDER_CREATE_CUSTOM_NETWORK } from "@/domains/linker/constants/custom-network.constants";
import { cn } from "@/lib/utils";
import { extractUrls } from "./url-utils";

export interface BulkImportInputProps {
  /**
   * Called with the raw extracted URLs — dedup / merging is the parent's job.
   */
  onImport: (urls: readonly string[]) => void;
  disabled?: boolean;
  className?: string;
}

export default function BulkImportInput({ onImport, disabled = false, className }: BulkImportInputProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleExtract = React.useCallback(() => {
    const text = textareaRef.current?.value ?? "";

    const extracted = extractUrls(text);
    if (extracted.length === 0) return;
    onImport(extracted);

    if (textareaRef.current) textareaRef.current.value = "";
  }, [onImport]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleExtract();
      }
    },
    [handleExtract]
  );
  return (
    <Card className={cn(className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-muted-foreground" aria-hidden="true" />
          <CardTitle className="text-base">Quick import</CardTitle>
        </div>
        <CardDescription>
          Drop any block of text — paragraphs, JSON, HTML, logs, CSV rows. We'll extract every{" "}
          <code className="text-xs bg-muted px-1 py-0.5">https://</code> URL and create fields automatically.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <Field>
          <FieldLabel htmlFor="bulk-import-textarea">Paste text containing URLs</FieldLabel>
          <InputGroup>
            <InputGroupTextarea
              id="bulk-import-textarea"
              ref={textareaRef}
              rows={4}
              defaultValue={BULK_PLACEHOLDER_CREATE_CUSTOM_NETWORK}
              placeholder={BULK_PLACEHOLDER_CREATE_CUSTOM_NETWORK}
              className="font-mono text-sm resize-none"
              autoComplete="off"
              disabled={disabled}
              onKeyDown={handleKeyDown}
            />
          </InputGroup>
        </Field>

        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={handleExtract}
          disabled={disabled}
          className="gap-2"
        >
          <Sparkles className="size-3.5" aria-hidden="true" />
          Extract &amp; add URLs
        </Button>
      </CardContent>
    </Card>
  );
}
