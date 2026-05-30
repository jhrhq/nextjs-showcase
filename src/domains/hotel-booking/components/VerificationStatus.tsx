"use client";

import { useFormState } from "react-dom";

import SubmitButton from "./SubmitButton";
import { generateVerificationLink } from "@/app/(nextjs)/hotel-booking/actions/signupAction";

interface Props {
  visible: boolean | null;
}

const VerificationStatus = ({ visible }: Props) => {
  const [state, action] = useFormState(generateVerificationLink, {});
  if (!visible) return null;

  if (state.status) {
    return (
      <div className="text-center p-2">
        <p>Please check your inbox.</p>
      </div>
    );
  }

  return (
    <form
      action={action}
      className="text-center p-2 md:text-left md:flex md:items-center md:justify-between md:gap-4 bg-amber-200 text-amber-900"
    >
      <span>Please check your inbox to verify your email.</span>
      <div className="text-center md:text-left">
        {"Didn't get link? "}
        <SubmitButton className="w-auto p-0 py-0 px-2 h-7">
          Click Here
        </SubmitButton>
      </div>
    </form>
  );
};

export default VerificationStatus;
