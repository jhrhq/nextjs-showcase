"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  visible?: boolean;
}

const VerificationStatus = ({ visible }: Props) => {
  if (!visible) return null;

  return (
    <form className="text-center p-2 md:text-left md:flex md:items-center md:justify-between md:gap-4 bg-amber-200 text-amber-900">
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
