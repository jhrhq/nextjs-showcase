"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import type { TargetUrlFormValues } from "@/domains/linker/validations/inbound.validation";
import FormError from "@/ui/shared/auth-errro-alert";
import { FormFieldWrapper } from "@/ui/shared/form-field-wrapper";

export interface TargetUrlFormHandle {
  submitWithUrl: (url: string) => void;
}

export interface TargetUrlFormProps {
  onSubmit: (url: string) => void;
  isLoading?: boolean;
}

export const InboundTargetForm = React.forwardRef<TargetUrlFormHandle, TargetUrlFormProps>(function TargetUrlForm(
  { onSubmit, isLoading },
  ref
) {
  const form = useForm<TargetUrlFormValues>({
    defaultValues: { url: "" },
  });

  const handleValidSubmit = ({ url }: TargetUrlFormValues) => {
    onSubmit(url);
  };

  React.useImperativeHandle(ref, () => ({
    async submitWithUrl(url: string) {
      form.setValue("url", url);

      const isValid = await form.trigger("url");

      if (!isValid) return false;

      handleValidSubmit({ url });
      return true;
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
              {isLoading ? (
                <>
                  <Spinner />
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </Button>{" "}
          </Field>
        </form>
      </CardContent>
    </Card>
  );
});
