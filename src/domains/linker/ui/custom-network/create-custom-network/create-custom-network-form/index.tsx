"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Globe, Plus } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import { type SubmitHandler, useFieldArray, useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CREATE_CUSTOM_NETWORK_FORM_DEFAULTS } from "@/domains/linker/constants/custom-network.constants";
import { useSumbitCustomNetowrkUrls } from "@/domains/linker/hooks/use-projects";
import {
  type CreateCustomNetworkFormValues,
  createCustomNetworkFormSchema,
} from "@/domains/linker/validations/custom-network.validation";
import { useDeboucedValue } from "@/hooks/shared/use-debounced-hook";
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
      <div className="space-y-4 text-foreground bg-background">
        <div className="flex items-center gap-3 mb-6 bg-card p-4 rounded-xl border border-border shadow-2xs">
          <div
            className="size-9 bg-primary text-primary-foreground flex items-center justify-center rounded-lg shadow-2xs"
            aria-hidden="true"
          >
            <Globe className="size-4" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-foreground">URL Manager</h1>
            <p className="text-sm text-muted-foreground">Organise and validate multiple links in one place</p>
          </div>
        </div>

        {/*<div className="sr-only" aria-live="polite" aria-atomic="true">
            {fields.length} URLs total, {validCount} valid, {duplicateIndices.size} duplicates detected
          </div>*/}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Card className="bg-card border-border shadow-2xs rounded-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-foreground font-semibold">Collection details</CardTitle>
              <CardDescription className="text-muted-foreground">
                Give this group of URLs a name so you can identify it later.
              </CardDescription>
              <CardContent className="p-0 pt-3">
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

          <BulkImportInput onImport={handleBulkImport} disabled={isSubmitting} />

          <Card className="bg-card border-border shadow-2xs rounded-xl">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-base text-foreground font-semibold">URL list</CardTitle>
                  <CardDescription className="mt-1 text-muted-foreground">
                    Add, edit, or remove individual URLs. Click any card in the sidebar to add it instantly.
                  </CardDescription>
                </div>
                <UrlStatsBadges total={fields.length} valid={validCount} duplicates={duplicateIndices.size} />
              </div>
            </CardHeader>
            <Separator className="bg-border" />
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
                      errorMessage={fieldError}
                      control={control}
                      onRemove={handleRemove}
                      onPaste={onInputPaste}
                    />
                  </React.Fragment>
                );
              })}
              {/*
              {errors.urls?.root?.message && (
                    <FieldError>
                      <FormError error={errors.urls.root.message} />
                    </FieldError>
                  )}*/}

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ url: "" })}
                className="w-full mt-1 gap-2 border-dashed border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground shadow-2xs"
              >
                <Plus className="size-3.5" aria-hidden="true" />
                Add another URL
              </Button>
            </CardContent>

            <DuplicateWarning count={duplicateIndices.size} />
            <Separator className="bg-border" />

            <CardFooter className="justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => reset(CREATE_CUSTOM_NETWORK_FORM_DEFAULTS)}
                className="text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground shadow-2xs"
              >
                Reset form
              </Button>
              <Button
                type="submit"
                disabled={!canSubmit || submitUrls.isPending}
                className="gap-2 min-w-32 bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xs"
              >
                {isSubmitting || submitUrls.isPending ? (
                  <>
                    {/* <Spinner /> */}
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
