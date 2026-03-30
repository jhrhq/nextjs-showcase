"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Globe, Plus, Sparkles } from "lucide-react";
import type * as React from "react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { type Control, type SubmitHandler, useFieldArray, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError } from "@/components/ui/field";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
// 🎯 IMPORT EXTRACTED UTILITIES
import {
  extractUrls,
  filterNewUrls,
  findDuplicateIndices,
  getFieldMeta,
  isValidUrlFast,
  type UrlFieldMeta,
  urlItemSchema,
} from "@/lib/url-utils";
import { cn } from "@/lib/utils";
import FormError from "@/ui/shared/auth-errro-alert";
import { FormFieldWrapper } from "@/ui/shared/form-field-wrapper";
import { DuplicateWarning } from "./duplicate-warning"; // Optional
// 🎯 IMPORT EXTRACTED SUBCOMPONENTS
import { UrlRow } from "./url-row";
import { UrlStatsBadges } from "./url-stats"; // Optional

// ─── Constants ────────────────────────────────────────────────────────────────
const FORM_DEFAULTS = {
  collectionName: "",
  urls: [{ url: "" }],
} as const;

const BULK_PLACEHOLDER =
  "Paste anything, for example:\n\nhttps://github.com  , https://vercel.com  \n" +
  '<a href="https://example.com  ">link</a>\n{"url":"https://api.example.com  "}';

// ─── Zod v4 schemas ───────────────────────────────────────────────────────────
const formSchema = z.object({
  collectionName: z.string().min(1, "Collection name is required").max(80, "Keep it under 80 characters"),
  urls: z
    .array(urlItemSchema)
    .min(1, "Add at least one URL")
    .superRefine((items, ctx) => {
      const dupes = findDuplicateIndices(items);
      dupes.forEach((i) => {
        ctx.addIssue({
          code: "custom",
          message: "This URL is already in the list",
          path: [i, "url"],
        });
      });
    }),
});

type FormValues = z.infer<typeof formSchema>;

// ─── Props ────────────────────────────────────────────────────────────────────
interface UrlFormProps {
  pendingUrls?: string[];
  onPendingConsumed?: () => void;
  onUrlsChange?: (urls: string[]) => void;
}

// ─── Main UrlForm ─────────────────────────────────────────────────────────────
export default function UrlForm({ pendingUrls = [], onPendingConsumed, onUrlsChange }: UrlFormProps) {
  const bulkRef = useRef<HTMLTextAreaElement>(null);
  const urlsChangeTimeoutRef = useRef<NodeJS.Timeout>();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
    trigger,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: FORM_DEFAULTS,
    mode: "onChange",
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "urls",
  });

  // ✅ Optimization #1: exact: true prevents nested field re-renders
  const watchedUrls =
    useWatch({
      control,
      name: "urls",
      exact: true,
    }) ?? [];

  const duplicateIndices = useMemo(() => findDuplicateIndices(watchedUrls), [watchedUrls]);

  // ✅ Optimization #2: Fast native URL check for UI badge
  const validCount = useMemo(() => {
    return watchedUrls.filter((item) => isValidUrlFast(item.url)).length;
  }, [watchedUrls]);

  // ── Mirror URLs to parent (debounced) ──────────────────────────────────────
  const onUrlsChangeRef = useRef(onUrlsChange);
  onUrlsChangeRef.current = onUrlsChange;

  useEffect(() => {
    if (urlsChangeTimeoutRef.current) {
      clearTimeout(urlsChangeTimeoutRef.current);
    }

    urlsChangeTimeoutRef.current = setTimeout(() => {
      const raw = watchedUrls.map((u) => u.url).filter(Boolean);
      onUrlsChangeRef.current?.(raw);
    }, 150);

    return () => {
      if (urlsChangeTimeoutRef.current) {
        clearTimeout(urlsChangeTimeoutRef.current);
      }
    };
  }, [watchedUrls]);

  // ── Consume sidebar pendingUrls ────────────────────────────────────────────
  const onPendingConsumedRef = useRef(onPendingConsumed);
  onPendingConsumedRef.current = onPendingConsumed;

  useEffect(() => {
    if (!pendingUrls.length) return;

    const newUrls = filterNewUrls(pendingUrls, watchedUrls);
    const isOnlyEmpty = watchedUrls.length === 1 && watchedUrls[0]?.url.trim() === "";

    if (isOnlyEmpty && newUrls.length > 0) {
      replace(newUrls.map((url) => ({ url })));
    } else {
      newUrls.forEach((url) => append({ url }));
    }

    void trigger("urls");
    onPendingConsumedRef.current?.();
  }, [pendingUrls]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Bulk textarea import ───────────────────────────────────────────────────
  const handleBulkImport = useCallback(() => {
    const text = bulkRef.current?.value ?? "";
    const extracted = extractUrls(text);
    if (!extracted.length) return;

    const hasNonEmpty = watchedUrls.some((f) => f.url.trim());
    const newUrls = filterNewUrls(extracted, watchedUrls);

    if (!hasNonEmpty) {
      replace(newUrls.length > 0 ? newUrls.map((url) => ({ url })) : [{ url: "" }]);
    } else {
      newUrls.forEach((url) => append({ url }));
    }

    if (bulkRef.current) bulkRef.current.value = "";
    void trigger("urls");
  }, [watchedUrls, append, replace, trigger]);

  // ── Single-field multi-URL paste ──────────────────────────────────────────
  const onInputPaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>, idx: number) => {
      const text = e.clipboardData.getData("text");
      const urls = extractUrls(text);

      if (urls.length <= 1) return;

      e.preventDefault();
      const newUrls = filterNewUrls(urls, watchedUrls, idx);
      const base = watchedUrls.filter((_, i) => i !== idx).filter((f) => f.url.trim());
      const merged = [...base, ...newUrls.map((url) => ({ url }))];

      replace(merged.length > 0 ? merged : [{ url: "" }]);
      void trigger("urls");
    },
    [watchedUrls, replace, trigger]
  );

  // ── Submit ─────────────────────────────────────────────────────────────────
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("Submitted:", data);
    await new Promise<void>((resolve) => setTimeout(resolve, 900));
  };

  const canSubmit =
    !isSubmitting &&
    !isSubmitSuccessful &&
    duplicateIndices.size === 0 &&
    validCount === fields.length &&
    fields.length > 0;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <TooltipProvider delayDuration={200}>
      <div className="space-y-4">
        {/* Page heading */}
        <div className="flex items-center gap-3 mb-6">
          <div className="size-9 bg-primary flex items-center justify-center" aria-hidden="true">
            <Globe className="size-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">URL Manager</h1>
            <p className="text-sm text-muted-foreground">Organise and validate multiple links in one place</p>
          </div>
        </div>

        {/* Accessibility: Live region */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {fields.length} URLs total, {validCount} valid, {duplicateIndices.size} duplicates detected
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          {/* Card 1: Collection details */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Collection details</CardTitle>
              <CardDescription>Give this group of URLs a name so you can identify it later.</CardDescription>
            </CardHeader>
            <CardContent>
              <FormFieldWrapper<FormValues>
                control={control}
                name="collectionName"
                label="Collection name"
                required
                placeholder="e.g. Design resources, Q3 reports…"
                autoComplete="off"
              />
            </CardContent>
          </Card>

          {/* Card 2: Quick import */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-muted-foreground" aria-hidden="true" />
                <CardTitle className="text-base">Quick import</CardTitle>
              </div>
              <CardDescription>
                Drop any block of text — paragraphs, JSON, HTML, logs, CSV rows. We&apos;ll extract every{" "}
                <code className="text-xs bg-muted px-1 py-0.5">https://</code> URL and create fields automatically.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Field>
                <FieldLabel htmlFor="bulk-textarea">Paste text containing URLs</FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    id="bulk-textarea"
                    ref={bulkRef}
                    rows={4}
                    placeholder={BULK_PLACEHOLDER}
                    className="font-mono text-sm resize-none"
                    autoComplete="off"
                  />
                </InputGroup>
              </Field>
              <Button type="button" variant="secondary" size="sm" onClick={handleBulkImport} className="gap-2">
                <Sparkles className="size-3.5" aria-hidden="true" />
                Extract &amp; add URLs
              </Button>
            </CardContent>
          </Card>

          {/* Card 3: URL list */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-base">URL list</CardTitle>
                  <CardDescription className="mt-1">
                    Add, edit, or remove individual URLs. Click any card in the sidebar to add it instantly.
                  </CardDescription>
                </div>
                {/* ✅ Using extracted UrlStatsBadges */}
                <UrlStatsBadges total={fields.length} valid={validCount} duplicates={duplicateIndices.size} />
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4 space-y-2">
              {fields.map((field, index) => {
                const currentUrl = watchedUrls[index]?.url ?? "";
                const fieldError = errors.urls?.[index]?.url;
                const meta = getFieldMeta(currentUrl, index, duplicateIndices, fieldError);

                return (
                  <div key={field.id} className="group">
                    {/* ✅ Using extracted, memoized UrlRow */}
                    <UrlRow
                      fieldId={field.id}
                      index={index}
                      total={fields.length}
                      meta={meta}
                      errorMessage={fieldError?.message}
                      control={control as Control<any>}
                      onRemove={remove}
                      onPaste={onInputPaste}
                    />
                  </div>
                );
              })}
              {errors.urls?.root?.message && (
                <FieldError>
                  <FormError error={errors.urls.root.message} />
                </FieldError>
              )}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ url: "" })}
                className="w-full mt-1 gap-2 border-dashed text-muted-foreground"
              >
                <Plus className="size-3.5" aria-hidden="true" />
                Add another URL
              </Button>
            </CardContent>

            {/* ✅ Using extracted DuplicateWarning */}
            <DuplicateWarning count={duplicateIndices.size} />

            <Separator />
            <CardFooter className="justify-between pt-4">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => reset(FORM_DEFAULTS)}
                className="text-muted-foreground"
              >
                Reset form
              </Button>
              <Button type="submit" disabled={!canSubmit} className="gap-2 min-w-32">
                {isSubmitting ? (
                  <>
                    <span
                      className="size-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin"
                      aria-hidden="true"
                    />
                    Saving…
                  </>
                ) : isSubmitSuccessful ? (
                  "✓ Saved"
                ) : (
                  `Save ${validCount > 0 ? validCount : ""} URL${validCount !== 1 ? "s" : ""}`
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </TooltipProvider>
  );
}
