"use client";
import { Button } from "@/domains/hotel-booking/components/ui/button";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { useFormContext } from "react-hook-form";

const SubmitButton = ({ className, children }: { className?: string; children: ReactNode }) => {
  const { pending } = useFormStatus();
  const form = useFormContext();
  return (
    <Button
      type="submit"
      disabled={pending || form?.formState?.isSubmitting}
      className={cn(
        "w-full text-base h-12 bg-primary text-white rounded-full py-3 hover:bg-primary transition",
        className
      )}
    >
      {pending || form?.formState?.isSubmitting ? <span className="submitLoader"></span> : children}
    </Button>
  );
};

export default SubmitButton;
