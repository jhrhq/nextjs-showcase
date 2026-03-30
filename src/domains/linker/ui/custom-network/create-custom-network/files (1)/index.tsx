/**
 * index.tsx — UrlForm
 *
 * The main form component. Owns all React state and event handlers.
 * All pure logic, types, constants, and sub-components are imported
 * from sibling files so this file stays focused on orchestration.
 *
 * Dependency graph (read top-to-bottom):
 *   lib/url-utils       ← pure string functions
 *   schema              ← Zod schemas, FormValues
 *   types               ← TS interfaces
 *   constants           ← FORM_DEFAULTS, style maps
 *   field-meta          ← isValidUrl, getFieldMeta
 *   url-stats-badges    ← React.memo component
 *   duplicate-warning   ← React.memo component
 *   url-row             ← React.memo component
 *   index.tsx           ← you are here
 */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Globe, Plus, Sparkles } from "lucide-react";
import type * as React from "react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { type SubmitHandler, useFieldArray, useForm, useWatch } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { extractUrls, filterNewUrls } from "@/lib/url-utils";
import { cn } from "@/lib/utils";
import FormError from "@/ui/shared/auth-errro-alert";
import { FormFieldWrapper } from "@/ui/shared/form-field-wrapper";
import { BULK_PLACEHOLDER, FORM_DEFAULTS } from "./constants";
import { DuplicateWarning } from "./duplicate-warning";
import { getFieldMeta, isValidUrl } from "./field-meta";
import { type FormValues, formSchema } from "./schema";
import type { UrlFormProps } from "./types";
import { UrlRow } from "./url-row";
import { UrlStatsBadges } from "./url-stats-badges";
import { findDuplicateIndices } from "./url-utils";

// ─── UrlForm ──────────────────────────────────────────────────────────────────

export default function UrlForm({ pendingUrls = [], onPendingConsumed, onUrlsChange }: UrlFormProps) {
  // ── Uncontrolled ref for the bulk-import textarea ──────────────────────────
  // We read it imperatively on button click, so we don't need state for it.
  const bulkRef = useRef<HTMLTextAreaElement>(null);

  // ── React Hook Form setup ──────────────────────────────────────────────────
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
    trigger,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: FORM_DEFAULTS,
    // Validate on every change so the UI gives instant feedback.
    mode: "onChange",
  });

  // ── Dynamic field array ────────────────────────────────────────────────────
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "urls",
  });

  // ── Live snapshot of all URL values ───────────────────────────────────────
  // useWatch subscribes to RHF's internal store — re-renders only when urls change.
  const watchedUrls = useWatch({ control, name: "urls" }) ?? [];

  // ── Derived values — memoised so they only recompute when urls change ──────

  /**
   * Set of row indices that share a URL with at least one other row.
   * Used by getFieldMeta and passed to UrlStatsBadges.
   */
  const duplicateIndices = useMemo(() => findDuplicateIndices(watchedUrls), [watchedUrls]);

  /**
   * Count of fields that pass per-field Zod validation.
   * Used by the submit button label and canSubmit guard.
   */
  const validCount = useMemo(() => watchedUrls.filter((item) => isValidUrl(item.url)).length, [watchedUrls]);

  // ── Stable callback refs ───────────────────────────────────────────────────
  // These prevent effects from re-subscribing every time the parent re-renders
  // (parent re-renders create new function references even for identical logic).
  const onUrlsChangeRef = useRef(onUrlsChange);
  const onPendingConsumedRef = useRef(onPendingConsumed);
  onUrlsChangeRef.current = onUrlsChange;
  onPendingConsumedRef.current = onPendingConsumed;

  // ── Mirror form URLs to parent (Sidebar "already added" state) ─────────────
  useEffect(() => {
    // Filter out empty strings so the parent only sees real URLs.
    const raw = watchedUrls.map((u) => u.url).filter(Boolean);
    onUrlsChangeRef.current?.(raw);
  }, [watchedUrls]);

  // ── Consume URLs pushed from the sidebar ───────────────────────────────────
  useEffect(() => {
    if (!pendingUrls.length) return;

    const newUrls = filterNewUrls(pendingUrls, watchedUrls);
    // True when the form is in its clean initial state (one empty placeholder row).
    const isOnlyEmpty = watchedUrls.length === 1 && watchedUrls[0]?.url.trim() === "";

    if (isOnlyEmpty && newUrls.length > 0) {
      // Replace the empty placeholder instead of appending onto it.
      replace(newUrls.map((url) => ({ url })));
    } else {
      newUrls.forEach((url) => append({ url }));
    }

    // Re-run validation so new fields are immediately evaluated.
    void trigger("urls");
    // Tell the parent the queue has been processed — it will clear pendingUrls.
    onPendingConsumedRef.current?.();

    // Intentionally omit watchedUrls — we only want this to run when pendingUrls
    // changes (i.e. when the parent pushes new sidebar clicks).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingUrls]);

  // ── Bulk textarea import ───────────────────────────────────────────────────
  const handleBulkImport = useCallback(() => {
    const text = bulkRef.current?.value ?? "";
    const extracted = extractUrls(text);
    if (!extracted.length) return;

    const hasNonEmpty = watchedUrls.some((f) => f.url.trim());
    const newUrls = filterNewUrls(extracted, watchedUrls);

    if (!hasNonEmpty) {
      // Form is empty — replace the placeholder row rather than append after it.
      replace(newUrls.length > 0 ? newUrls.map((url) => ({ url })) : [{ url: "" }]);
    } else {
      newUrls.forEach((url) => {
        append({ url });
      });
    }

    // Clear the textarea after extraction.
    if (bulkRef.current) bulkRef.current.value = "";
    void trigger("urls");
  }, [watchedUrls, append, replace, trigger]);

  // ── Single-field multi-URL paste ──────────────────────────────────────────
  const onInputPaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>, idx: number) => {
      const text = e.clipboardData.getData("text");
      const urls = extractUrls(text);

      // 0 or 1 URL — let the browser handle the paste normally.
      if (urls.length <= 1) return;

      // Multiple URLs detected — take control of the paste event.
      e.preventDefault();

      // Keep all other non-empty fields. Filter out the one being pasted into
      // (idx) since it's being replaced by the pasted URLs.
      const newUrls = filterNewUrls(urls, watchedUrls, idx);
      const base = watchedUrls.filter((_, i) => i !== idx).filter((f) => f.url.trim());

      const merged = [...base, ...newUrls.map((url) => ({ url }))];
      replace(merged.length > 0 ? merged : [{ url: "" }]);
      void trigger("urls");
    },
    [watchedUrls, replace, trigger]
  );

  // ── Submit handler ─────────────────────────────────────────────────────────
  // Only called if Zod validation passes (including superRefine duplicates).
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("Submitted:", data);
    await new Promise<void>((resolve) => setTimeout(resolve, 900));
  };

  // ── Submit button guard ────────────────────────────────────────────────────
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

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          {/* ── Card 1: Collection details ───────────────────────────── */}
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

          {/* ── Card 2: Quick import ── */}
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

          {/* ── Card 3: URL list ── */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-base">URL list</CardTitle>
                  <CardDescription className="mt-1">
                    Add, edit, or remove individual URLs. Click any card in the sidebar to add it instantly.
                  </CardDescription>
                </div>
                {/* Only re-renders when counts change */}
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
                  // The wrapping div carries the `group` class so the remove
                  // button inside UrlRow can respond to group-hover.
                  <div key={field.id} className="group">
                    <UrlRow
                      fieldId={field.id}
                      index={index}
                      total={fields.length}
                      // Primitive props — React.memo compares these correctly.
                      status={meta.status}
                      isDuplicate={meta.isDuplicate}
                      isInvalid={meta.isInvalid}
                      errorMessage={fieldError?.message}
                      control={control}
                      onRemove={remove}
                      onPaste={onInputPaste}
                    />
                  </div>
                );
              })}

              {/* Root-level array error e.g. "Add at least one URL" */}
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

            {/* Only re-renders when duplicateIndices.size changes */}
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
