"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideEye, LucideEyeOff, LucideKeyRound } from "lucide-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import {
  CustomInputPopover,
  CustomInputPopoverArrow,
  CustomInputPopoverContent,
  CustomInputPopoverTrigger,
} from "@/app/password-meter/components/custom-input-popover";
import PasswordPopoverContent from "@/app/password-meter/components/password-popover-content";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

const formSchema = z.object({
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(64, "Password must be at least 6 characters."),
});

type ProfileFormValues = z.infer<typeof formSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  password: "",
};

export default function Page() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });
  const [isPasswordMeter, setIsPasswordMeter] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  // password toggle handle
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  function handleRegister(data: ProfileFormValues) {
    alert(JSON.stringify(data));
  }

  return (
    <div className="mx-auto flex min-h-screen flex-col items-center justify-center space-y-3 bg-[rgb(237,242,248)] p-6 dark:bg-gray-900">
      <Card className="w-full max-w-md space-y-3 border-0 shadow-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl">Register</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-8" id="form-rhf-demo">
            <FieldGroup>
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Password</FieldLabel>
                    <CustomInputPopover open={isPasswordMeter} onOpenChange={setIsPasswordMeter}>
                      <InputGroup>
                        <CustomInputPopoverTrigger asChild>
                          <InputGroupInput
                            {...field}
                            placeholder="password"
                            type={showPassword ? "text" : "password"}
                            className="h-full border-none  focus:ring-0"
                          />
                        </CustomInputPopoverTrigger>
                        <InputGroupAddon>
                          <LucideKeyRound strokeWidth="1" />
                        </InputGroupAddon>
                        <InputGroupAddon align="inline-end">
                          <Button className="m-0 p-0 size-auto" variant="ghost" type="button" onClick={togglePassword}>
                            {showPassword ? (
                              <LucideEye strokeWidth="1" className="text-gray-900" />
                            ) : (
                              <LucideEyeOff strokeWidth="1" />
                            )}
                          </Button>
                        </InputGroupAddon>
                      </InputGroup>
                      <CustomInputPopoverContent
                        onOpenAutoFocus={(e) => e.preventDefault()}
                        onEscapeKeyDown={(e) => e.preventDefault()}
                        sideOffset={40}
                        side="right"
                      >
                        <PasswordPopoverContent value={field.value} />
                        <CustomInputPopoverArrow className="fill-white dark:fill-blue-900" />
                      </CustomInputPopoverContent>
                    </CustomInputPopover>
                    {/* <div>
                      {!isPasswordMeter &&
                        evaluatePasswordStrength(field.value)}
                    </div> */}

                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>

            <CardFooter>
              <Button
                className="w-full"
                type="submit"
                // disabled={
                //   !form.formState.isValid
                // }
              >
                Create account
                {/* {registerMutation.isPending && (
                    <Icons.spinner className="mr-2 size-4 animate-spin" />
                  )} */}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
