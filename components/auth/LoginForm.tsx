"use client";

import { loginFormAction } from "@/app/actions";
// import loginHandlerAction from "@/app/actions/loginAction";
import { FieldError } from "@/components/field-error";
import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { useFormReset } from "@/hooks/use-form-reset";
import { EMPTY_FORM_STATE } from "@/utils/form-error-state";
import { useFormState, useFormStatus } from "react-dom";

const LoginForm = () => {
  const [formState, action] = useFormState(loginFormAction, EMPTY_FORM_STATE);
  const { pending } = useFormStatus();

  const formRef = useFormReset(formState);

  return (
    <form noValidate action={action} ref={formRef} className="space-y-4">
      <div>
        <Input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full  h-auto border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 "
        />
        <FieldError formState={formState} name="email" className="ml-4" />
      </div>
      <div>
        <Input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full  h-auto border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 "
        />
        <FieldError formState={formState} name="password" className="ml-4" />
      </div>
      <SubmitButton>Continue</SubmitButton>
    </form>
  );
};

export default LoginForm;
