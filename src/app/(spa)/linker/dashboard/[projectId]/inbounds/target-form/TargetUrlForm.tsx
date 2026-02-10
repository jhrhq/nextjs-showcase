"use client";
import { forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import type { TargetUrlFormValues } from "@/app/(spa)/linker/dashboard/[projectId]/inbounds/target-form/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import FormError from "@/ui/shared/auth-errro-alert";
import { FormFieldWrapper } from "@/ui/shared/form-field-wrapper";

// ─── Imperative handle ────────────────────────────────────────────────────────

export interface TargetUrlFormHandle {
  /**
   * Programmatically sets the URL field value and submits the form.
   * Used by the sidebar to inject a clicked post's URL.
   */
  submitWithUrl: (url: string) => void;
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface TargetUrlFormProps {
  /** Called with the validated URL after a successful form submission */
  onSubmit: (url: string) => void;
}

/**
 * Controlled form for submitting a target content URL.
 * Exposes `submitWithUrl` via `ref` so a parent can programmatically fill and
 * submit the form — used when the user clicks a post in the sidebar.
 */
export const TargetUrlForm = forwardRef<TargetUrlFormHandle, TargetUrlFormProps>(function TargetUrlForm(
  { onSubmit },
  ref
) {
  const form = useForm<TargetUrlFormValues>({
    defaultValues: { url: "" },
  });

  const handleValidSubmit = ({ url }: TargetUrlFormValues) => {
    onSubmit(url);
  };

  // Expose `submitWithUrl` to parent via ref
  useImperativeHandle(ref, () => ({
    submitWithUrl(url: string) {
      form.setValue("url", url, { shouldValidate: true });
      // Defer to next tick so the value is reflected before validation runs
      setTimeout(() => {
        form.handleSubmit(handleValidSubmit);
      }, 0);
    },
  }));

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Target Content URL</CardTitle>
      </CardHeader>

      <CardContent>
        <form id="signin" onSubmit={form.handleSubmit(handleValidSubmit)} className="space-y-4" noValidate>
          <FieldGroup>
            <FormFieldWrapper
              control={form.control}
              label="Target Content URL"
              type="text"
              name="url"
              placeholder="https://example.com/best-interlinking-tool"
              autoComplete="off"
              required={true}
            />
          </FieldGroup>
          {/* General Error Alert */}
          <FormError error={form.formState.errors.root?.message} />
          <Field orientation="horizontal">
            <Button form="signin" type="submit">
              {/* {loading ? (
                      <>
                        <Spinner />
                        Submitting...
                      </>
                    ) : (
                      "Submit"
                    )} */}
              submit
            </Button>{" "}
          </Field>
        </form>
      </CardContent>
    </Card>
  );
});
