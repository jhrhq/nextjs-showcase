"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Globe, Plus } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import { type SubmitHandler, useFieldArray, useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldError } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CREATE_CUSTOM_NETWORK_FORM_DEFAULTS } from "@/domains/linker/constants/custom-network.constants";
import { useSumbitCustomNetowrkUrls } from "@/domains/linker/hooks/use-projects";
import {
  type CreateCustomNetworkFormValues,
  createCustomNetworkFormSchema,
} from "@/domains/linker/validations/custom-network.validation";
import { useDeboucedValue } from "@/hooks/shared/use-debounced-hook";
import FormError from "@/ui/shared/auth-errro-alert";
import { FormFieldWrapper } from "@/ui/shared/form-field-wrapper";
import BulkImportInput from "./bulk-import-input.tsx";
import { DuplicateWarning } from "./duplicate-warning";
import { UrlRow } from "./url-row";
import { UrlStatsBadges } from "./url-stats-badges";
import {
  extractUrls,
  filterNewUrls,
  findDuplicateIndices,
  getFieldMeta,
  isValidUrl,
  mergePastedUrls,
} from "./url-utils";

interface UrlFormProps {
  pendingUrls?: string[];
  onPendingConsumed?: () => void;
  onUrlsChange?: (urls: string[]) => void;
}

export default function CreateCustomNetworkForm({ pendingUrls = [], onPendingConsumed, onUrlsChange }: UrlFormProps) {
  const submitUrls = useSumbitCustomNetowrkUrls();

  const { projectId } = useParams<{ projectId: string }>();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
    trigger,
  } = useForm<CreateCustomNetworkFormValues>({
    resolver: zodResolver(createCustomNetworkFormSchema),
    defaultValues: CREATE_CUSTOM_NETWORK_FORM_DEFAULTS,
    mode: "onChange",
  });

  const { fields, append, remove, replace } = useFieldArray({ control, name: "urls" });

  const watchedUrls = useWatch({ control, name: "urls", exact: true }) ?? ([] as CreateCustomNetworkFormValues["urls"]);

  const debouncedWatchedUrls = useDeboucedValue(watchedUrls, 100);

  const duplicateIndices = React.useMemo(() => findDuplicateIndices(debouncedWatchedUrls), [debouncedWatchedUrls]);

  const validCount = React.useMemo(
    () => debouncedWatchedUrls.filter((item) => isValidUrl(item.url)).length,
    [debouncedWatchedUrls]
  );

  // ── Mirror URLs to parent (debounced) ──

  React.useEffect(() => {
    const raw = watchedUrls.map((u) => u.url).filter((i) => Boolean(i));
    onUrlsChange?.(raw);
  }, [watchedUrls, onUrlsChange]);

  // ── Consume sidebar pendingUrls ──
  React.useEffect(() => {
    if (!pendingUrls.length) return;

    const newUrls = filterNewUrls(pendingUrls, watchedUrls);
    const isOnlyEmpty = watchedUrls.length === 1 && !watchedUrls[0]?.url.trim();

    if (isOnlyEmpty && newUrls.length > 0) {
      replace(newUrls.map((url) => ({ url })));
    } else {
      newUrls.forEach((url) => {
        append({ url });
      });
    }

    void trigger("urls");
    onPendingConsumed?.();
  }, [pendingUrls, watchedUrls, append, replace, trigger, onPendingConsumed]);

  const handleBulkImport = (urls: readonly string[]) => {
    const hasNonEmpty = watchedUrls.some((f) => f.url.trim());
    if (!hasNonEmpty) {
      replace(urls.length > 0 ? urls.map((url) => ({ url })) : [{ url: "" }]);
    } else {
      urls.forEach((url) => {
        append({ url });
      });
    }
    void trigger("urls");
  };

  const handleRemove = React.useCallback(
    (index: number) => {
      remove(index);
      // Revalidate the urls array to clear stale errors
      void trigger("urls");
    },
    [remove, trigger]
  );

  // ── Single-field multi-URL paste ──
  const onInputPaste = React.useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>, idx: number) => {
      const text = e.clipboardData.getData("text");
      const urls = extractUrls(text);
      if (urls.length < 1) return;

      e.preventDefault();

      // const newUrls = filterNewUrls(urls, watchedUrls, idx);
      const merged = mergePastedUrls(watchedUrls, idx, urls);
      replace(merged);
      void trigger("urls");
    },
    [watchedUrls, replace, trigger]
  );

  const onSubmit: SubmitHandler<CreateCustomNetworkFormValues> = async (data) => {
    submitUrls.mutate({ ...data, projectId });
  };

  const canSubmit =
    !isSubmitting &&
    // !isSubmitSuccessful &&
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

        {/* Accessibility: Live region for screen readers */}
        {/*<div className="sr-only" aria-live="polite" aria-atomic="true">
        {fields.length} URLs total, {validCount} valid, {duplicateIndices.size} duplicates detected
      </div>*/}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/*  Collection details */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Collection details</CardTitle>
              <CardDescription>Give this group of URLs a name so you can identify it later.</CardDescription>
              <CardContent className="p-0">
                <FormFieldWrapper<CreateCustomNetworkFormValues>
                  control={control}
                  name="collectionName"
                  label="CollectionName"
                  required={true}
                  placeholder="e.g. Design resources, Q3 reports…"
                  autoComplete="off"
                />
              </CardContent>
            </CardHeader>
          </Card>

          {/* Card 2: Quick import */}
          <BulkImportInput onImport={handleBulkImport} disabled={isSubmitting} />
          {/* URL list */}
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
            <CardContent className="pt-4 space-y-4">
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
                      status={meta.status}
                      isDuplicate={meta.isDuplicate}
                      isInvalid={meta.isInvalid}
                      errorMessage={fieldError?.message}
                      control={control}
                      onRemove={handleRemove}
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
                variant="default-lighter"
                size="sm"
                onClick={() => reset(CREATE_CUSTOM_NETWORK_FORM_DEFAULTS)}
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
                  "Saved"
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
