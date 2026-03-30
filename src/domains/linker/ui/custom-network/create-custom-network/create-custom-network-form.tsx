"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Globe, Link2, Plus, Sparkles, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import type * as React from "react";
import { useCallback, useEffect, useRef } from "react";
import { Controller, type SubmitHandler, useFieldArray, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea } from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import FormError from "@/ui/shared/auth-errro-alert";
import { FormFieldWrapper } from "@/ui/shared/form-field-wrapper";

const urlItemSchema = z.object({
  url: z.url("Enter a valid URL starting with https://"),
});

const formSchema = z.object({
  collectionName: z.string().min(1, "Collection name is required").max(80, "Keep it under 80 characters"),
  urls: z
    .array(urlItemSchema)
    .min(1, "Add at least one URL")
    .superRefine((items, ctx) => {
      const seen = new Map<string, number>();

      items.forEach((item, index) => {
        const url = item.url;

        if (seen.has(url)) {
          ctx.addIssue({
            code: "custom", // ✅ v4: string codes, no z.ZodIssueCode enum
            message: "This URL is already added",
            path: [index, "url"],
          });
        } else {
          seen.set(url, index);
        }
      });
    }),
});

type FormValues = z.infer<typeof formSchema>;

type UrlFieldStatus = "empty" | "valid" | "invalid" | "duplicate";

interface UrlFieldMeta {
  status: UrlFieldStatus;
  isDuplicate: boolean;
  isValid: boolean;
  isInvalid: boolean;
}

interface UrlFormProps {
  /**
   * URLs pushed in from outside (e.g. sidebar clicks).
   * The form appends each one and deduplicates.
   * After consuming, call onPendingConsumed to clear the queue.
   */
  pendingUrls?: string[];
  onPendingConsumed?: () => void;
  /**
   * Fires whenever the list of raw URL strings inside the form changes,
   * so the parent can track which URLs are already added.
   */
  onUrlsChange?: (urls: string[]) => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function extractUrls(text: string): string[] {
  const urlRegex = /https?:\/\/[^\s,;\n"'<>]+/gi;
  return [...new Set((text.match(urlRegex) ?? []).map((u) => u.trim()))];
}

function getDuplicateIndices(values: Array<{ url: string }>): Set<number> {
  const seen = new Map<string, number[]>();
  values.forEach(({ url }, i) => {
    if (!url.trim()) return;
    const key = url.toLowerCase().trim();
    seen.set(key, [...(seen.get(key) ?? []), i]);
  });
  const dupes = new Set<number>();
  seen.forEach((indices) => {
    if (indices.length > 1) {
      indices.forEach((i) => {
        dupes.add(i);
      });
    }
  });
  return dupes;
}

function parseUrlSafe(url: string): boolean {
  try {
    urlItemSchema.shape.url.parse(url);
    return true;
  } catch {
    return false;
  }
}

function getFieldMeta(
  url: string,
  index: number,
  duplicateIndices: Set<number>,
  fieldError?: { message?: string }
): UrlFieldMeta {
  const isEmpty = url.trim() === "";
  const isDuplicate = duplicateIndices.has(index);
  const isInvalid = !isEmpty && (!!fieldError || isDuplicate);
  const isValid = !isEmpty && !fieldError && !isDuplicate;

  const status: UrlFieldStatus = isDuplicate ? "duplicate" : isValid ? "valid" : isInvalid ? "invalid" : "empty";

  return { status, isDuplicate, isValid, isInvalid };
}

// ─── Subcomponents ────────────────────────────────────────────────────────────

interface UrlStatsBadgesProps {
  total: number;
  valid: number;
  duplicates: number;
}

function UrlStatsBadges({ total, valid, duplicates }: UrlStatsBadgesProps) {
  return (
    <div className="flex items-center gap-1.5 shrink-0">
      <Badge variant="secondary" className="font-mono text-xs tabular-nums">
        {total} total
      </Badge>
      {valid > 0 && (
        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 font-mono text-xs tabular-nums">
          {valid} valid
        </Badge>
      )}
      {duplicates > 0 && (
        <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 font-mono text-xs tabular-nums">
          {duplicates} dup
        </Badge>
      )}
    </div>
  );
}

function DuplicateWarning({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <>
      <Separator />
      <div className="px-6 py-3 bg-amber-50 flex items-start gap-2.5 ">
        <span className="text-amber-500 text-sm mt-0.5" aria-hidden="true">
          ⚠
        </span>
        <p className="text-xs text-amber-700 leading-relaxed">
          <strong>
            {count} duplicate URL{count > 1 ? "s" : ""}
          </strong>{" "}
          detected. Remove all duplicates before saving.
        </p>
      </div>
    </>
  );
}

// ── UrlRow ─────────────────────────────────────────────────────────────────

type UrlFormControl = import("react-hook-form").Control<FormValues>;

interface UrlRowProps {
  fieldId: string;
  index: number;
  total: number;
  meta: UrlFieldMeta;
  errorMessage: string | undefined;
  control: UrlFormControl;
  onRemove: (index: number) => void;
  onPaste: (e: React.ClipboardEvent<HTMLInputElement>, index: number) => void;
}

function UrlRow({ fieldId, index, meta, total, errorMessage, control, onRemove, onPaste }: UrlRowProps) {
  const inputId = `url-field-${fieldId}`;

  const iconColor = {
    duplicate: "text-amber-500",
    valid: "text-blue-500",
    invalid: "text-destructive",
    empty: "text-muted-foreground/40",
  }[meta.status];

  const rowBorder = {
    duplicate: "ring-1 ring-amber-400 border-amber-400 bg-amber-50/50",
    valid: "border-blue-400 bg-blue-50/30",
    invalid: "border-destructive/60 bg-destructive/5",
    empty: "border-input",
  }[meta.status];

  return (
    <Field data-invalid={meta.isInvalid ? true : undefined} className="gap-0">
      <FieldLabel htmlFor={inputId} className="sr-only">
        URL {index + 1}
      </FieldLabel>

      <InputGroup className={cn("transition-colors border", rowBorder)}>
        <InputGroupAddon align="inline-start" className="flex items-center gap-2 pl-3 pr-1">
          <span
            className="text-[11px] font-mono text-muted-foreground/50 w-5 text-right select-none tabular-nums"
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <Link2 className={cn("size-4 shrink-0 transition-colors", iconColor)} aria-hidden="true" />
        </InputGroupAddon>

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

        <InputGroupAddon align="inline-end" className="flex items-center gap-1.5 pr-2">
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

      {meta.isInvalid && !meta.isDuplicate && (
        <FieldError className="mt-1 ml-1">
          <FormError error={errorMessage} />
        </FieldError>
      )}
    </Field>
  );
}

export default function CreateCustomNetworkForm({ pendingUrls = [], onPendingConsumed, onUrlsChange }: UrlFormProps) {
  const bulkRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
    trigger,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { collectionName: "", urls: [{ url: "" }] },
    mode: "onChange",
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "urls",
  });

  const watchedUrls = useWatch({ control, name: "urls" }) ?? [];
  const duplicateIndices = getDuplicateIndices(watchedUrls);
  const validCount = watchedUrls.filter((item) => parseUrlSafe(item.url)).length;

  // ── Report current URLs upward so parent can track "already added" ─────────

  const onUrlsChangeRef = useRef(onUrlsChange);
  onUrlsChangeRef.current = onUrlsChange;

  useEffect(() => {
    const rawUrls = watchedUrls.map((u) => u.url).filter(Boolean);
    onUrlsChangeRef.current?.(rawUrls);
  }, [watchedUrls]);

  // ── Consume pending URLs pushed in from the sidebar ───────────────────────

  const onPendingConsumedRef = useRef(onPendingConsumed);
  onPendingConsumedRef.current = onPendingConsumed;

  useEffect(() => {
    if (!pendingUrls.length) return;

    const current = watchedUrls.map((u) => u.url.toLowerCase().trim());
    const existingSet = new Set(current);
    const newUrls = pendingUrls.filter((u) => !existingSet.has(u.toLowerCase().trim()));

    // Replace the single empty placeholder field if it's the only entry
    const isOnlyEmpty = watchedUrls.length === 1 && watchedUrls[0]?.url.trim() === "";

    if (isOnlyEmpty && newUrls.length > 0) {
      replace(newUrls.map((url) => ({ url })));
    } else {
      newUrls.forEach((url) => {
        append({ url });
      });
    }

    void trigger("urls");
    onPendingConsumedRef.current?.();
    // We intentionally only re-run when pendingUrls reference changes (parent push)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingUrls, append, trigger, replace, watchedUrls.length, watchedUrls.map, watchedUrls[0]]);

  const handleBulkImport = useCallback(() => {
    const text = bulkRef.current?.value ?? "";
    const extracted = extractUrls(text);
    if (!extracted.length) return;

    const nonEmpty = watchedUrls.filter((f) => f.url.trim());
    const existingSet = new Set(nonEmpty.map((f) => f.url.toLowerCase().trim()));
    const newUrls = extracted.filter((u) => !existingSet.has(u.toLowerCase().trim()));

    if (nonEmpty.length === 0) {
      replace(newUrls.length > 0 ? newUrls.map((url) => ({ url })) : [{ url: "" }]);
    } else {
      newUrls.forEach((url) => {
        append({ url });
      });
    }

    if (bulkRef.current) bulkRef.current.value = "";
    void trigger("urls");
  }, [watchedUrls, append, replace, trigger]);

  const onInputPaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>, idx: number) => {
      const text = e.clipboardData.getData("text");
      const urls = extractUrls(text);
      if (urls.length <= 1) return;
      e.preventDefault();

      const others = watchedUrls.filter((_, i) => i !== idx && _.url.trim());
      const existingSet = new Set(others.map((f) => f.url.toLowerCase().trim()));
      const newUrls = urls.filter((u) => !existingSet.has(u.toLowerCase().trim()));

      const merged = [
        ...watchedUrls.filter((_, i) => i !== idx).filter((f) => f.url.trim()),
        ...newUrls.map((url) => ({ url })),
      ];
      replace(merged.length > 0 ? merged : [{ url: "" }]);
      void trigger("urls");
    },
    [watchedUrls, replace, trigger]
  );

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
          {/* ── Card 1: Collection details ─────────────────────────────── */}
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

          {/* ── Card 2: Quick import ──────────────────────────────────── */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-muted-foreground" aria-hidden="true" />
                <CardTitle className="text-base">Quick import</CardTitle>
              </div>
              <CardDescription>
                Drop any block of text here — paragraphs, JSON, HTML, logs, CSV rows. We&apos;ll extract every{" "}
                <code className="text-xs bg-muted px-1 py-0.5 ">https://</code> URL and create fields automatically.
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
                    placeholder={
                      'Paste anything, for example:\n\nhttps://github.com, https://vercel.com\n<a href="https://example.com">link</a>\n{"url":"https://api.example.com"}'
                    }
                    defaultValue={`https://example.com/battle/observe.html
                    \nhttps://example.com/cemetery
                    \nhttps://observe.example.net/billowy.aspx#bless
                    \nhttps://example.com/sophisticated
                    \nhttps://overflow.example.com/disturbed/name
                    \nhttps://example.com/
                    \nhttps://example.edu/bite#person
                    \nhttps://pizzas.example.com/hurried/authority.html
                    \nhttps://www.example.com/?tree=noise&harmonious=baby
                    \nhttps://www.example.com/act
                    \nhttps://example.com/
                    \nhttps://uninterested.example.com/`}
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

          {/* ── Card 3: URL list ──────────────────────────────────────── */}
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

            <CardContent className="py-4 space-y-2">
              {fields.map((field, index) => {
                const currentUrl = watchedUrls[index]?.url ?? "";
                const fieldError = errors.urls?.[index]?.url;
                const meta = getFieldMeta(currentUrl, index, duplicateIndices, fieldError);

                return (
                  <div key={field.id} className="group">
                    <UrlRow
                      fieldId={field.id}
                      index={index}
                      total={fields.length}
                      meta={meta}
                      errorMessage={fieldError?.message}
                      control={control}
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

            <DuplicateWarning count={duplicateIndices.size} />

            <CardFooter className="justify-between">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => reset({ collectionName: "", urls: [{ url: "" }] })}
                className="text-muted-foreground"
              >
                Reset form
              </Button>

              <Button
                type="submit"
                onClick={() =>
                  router.push(
                    "/linker/dashboard/0150de33-fc87-4015-bb37-1b34a8cc1710/custom-network/create-custom-network-table"
                  )
                }
                disabled={!canSubmit}
                className="gap-2 min-w-32"
              >
                {isSubmitting ? (
                  <>
                    <span
                      className="size-4 border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin"
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
