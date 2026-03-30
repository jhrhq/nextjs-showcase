"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Globe, Plus, Sparkles } from "lucide-react";
import * as React from "react";
import { type Control, type SubmitHandler, useFieldArray, useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useDebounceEffect } from "@/hooks/shared/use-debounced-hook";
import FormError from "@/ui/shared/auth-errro-alert";
import { FormFieldWrapper } from "@/ui/shared/form-field-wrapper";
// import { extractUrls, filterNewUrls, findDuplicateIndices, isValidUrlFast } from ";
import { DuplicateWarning } from "../create-custom-network/create-custom-network-form/duplicate-warning";
import { UrlStatsBadges } from "../create-custom-network/create-custom-network-form/url-stats";
import { type FormValues, formSchema } from "./url-form-schema";
import { UrlRow, type UrlRowMeta } from "./url-row";
import { extractUrls, filterNewUrls, findDuplicateIndices, isValidUrl } from "./url-utils";

const FORM_DEFAULTS: FormValues = {
  collectionName: "",
  urls: [{ url: "" }],
} as const;

const BULK_PLACEHOLDER = `Paste anything, for example:

https://github.com , https://vercel.com
<a href="https://example.com">link</a>
{"url":"https://api.example.com"}`;

interface UrlFormProps {
  pendingUrls?: string[];
  onPendingConsumed?: () => void;
  onUrlsChange?: (urls: string[]) => void;
}

export default function UrlForm({ pendingUrls = [], onPendingConsumed, onUrlsChange }: UrlFormProps) {
  const bulkRef = React.useRef<HTMLTextAreaElement>(null);

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

  // Watch form values with exact: true to prevent nested re-renders
  const watchedUrls =
    useWatch({
      control,
      name: "urls",
      exact: true,
    }) ?? ([] as FormValues["urls"]);

  // ✅ Optimized: Debounced computations for UI (not validation)
  const debouncedUrls = React.useMemo(() => {
    // Simple debounce via ref - avoids extra hook dependency
    let timeout: NodeJS.Timeout;
    return (urls: FormValues["urls"]) => {
      clearTimeout(timeout);
      return new Promise<FormValues["urls"]>((resolve) => {
        timeout = setTimeout(() => resolve(urls), 100);
      });
    };
  }, []);

  const [debouncedWatchedUrls, setDebouncedWatchedUrls] = React.useState(watchedUrls);

  React.useEffect(() => {
    const id = setTimeout(() => setDebouncedWatchedUrls(watchedUrls), 100);
    return () => clearTimeout(id);
  }, [watchedUrls]);

  // ✅ Optimized: Single computation, reused for UI + validation
  const duplicateIndices = React.useMemo(() => findDuplicateIndices(debouncedWatchedUrls), [debouncedWatchedUrls]);

  const validCount = React.useMemo(
    () => debouncedWatchedUrls.filter((item) => isValidUrl(item.url)).length,
    [debouncedWatchedUrls]
  );

  // ── Mirror URLs to parent (debounced) ─────────────────────────────
  useDebounceEffect(
    () => {
      const raw = watchedUrls.map((u) => u.url).filter(Boolean);
      onUrlsChange?.(raw);
    },
    [watchedUrls, onUrlsChange],
    150
  );

  // ── Consume sidebar pendingUrls ──────────────────────────────────
  const onPendingConsumedRef = React.useRef(onPendingConsumed);
  onPendingConsumedRef.current = onPendingConsumed;

  React.useEffect(() => {
    if (!pendingUrls.length) return;

    const newUrls = filterNewUrls(pendingUrls, watchedUrls);
    const isOnlyEmpty = watchedUrls.length === 1 && !watchedUrls[0]?.url.trim();

    if (isOnlyEmpty && newUrls.length > 0) {
      replace(newUrls.map((url) => ({ url })));
    } else {
      newUrls.forEach((url) => append({ url }));
    }

    void trigger("urls");
    onPendingConsumedRef.current?.();
  }, [pendingUrls, watchedUrls, append, replace, trigger]);

  // ── Bulk textarea import ─────────────────────────────────────────
  const handleBulkImport = React.useCallback(() => {
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

  // ── Single-field multi-URL paste ─────────────────────────────────
  const onInputPaste = React.useCallback(
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

  // ── Submit handler ───────────────────────────────────────────────
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("Submitted:", data);
    await new Promise<void>((resolve) => setTimeout(resolve, 900));
  };

  // ── Submit button logic ──────────────────────────────────────────
  const canSubmit =
    !isSubmitting &&
    !isSubmitSuccessful &&
    duplicateIndices.size === 0 &&
    validCount === fields.length &&
    fields.length > 0;

  // ── Helper: Compute row metadata ─────────────────────────────────
  const getFieldMeta = React.useCallback(
    (currentUrl: string, index: number, dupes: Set<number>, fieldError?: FieldError): UrlRowMeta => {
      const isEmpty = !currentUrl.trim();
      const isValid = !isEmpty && isValidUrl(currentUrl);
      const isDuplicate = dupes.has(index);

      return { isValid, isDuplicate, isEmpty, fieldError };
    },
    []
  );

  // ── Render ───────────────────────────────────────────────────────
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

        {/* Accessibility: Live region for screen readers */}
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
                Drop any block of text — paragraphs, JSON, HTML, logs, CSV rows. We'll extract every{" "}
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
                  <React.Fragment key={field.id}>
                    <UrlRow
                      fieldId={field.id}
                      index={index}
                      total={fields.length}
                      meta={meta}
                      errorMessage={fieldError?.message}
                      control={control as Control<FormValues>}
                      onRemove={remove}
                      onPaste={onInputPaste}
                    />
                  </React.Fragment>
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
