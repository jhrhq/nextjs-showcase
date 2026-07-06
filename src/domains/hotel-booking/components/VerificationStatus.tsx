"use client";

import type { FC } from "react";
import { useFormState } from "react-dom";

import { generateVerificationLink } from "@/domains/hotel-booking/actions/verification-action";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface Props {
  visible?: boolean;
}

const VerificationStatus: FC<Props> = ({ visible }) => {
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
        <Button
          type="submit"
          // disabled={pending}
          className={cn(
            "w-auto p-0 py-0 px-2 h-7 text-base bg-primary text-white rounded-full  hover:bg-primary transition"
          )}
        >
          Click Here
        </Button>
      </div>
    </form>
  );
};

export default VerificationStatus;
