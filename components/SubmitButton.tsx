"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

const SubmitButton = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className={cn(
        "w-full text-base h-12 bg-primary text-white rounded-full py-3 hover:bg-primary transition",
        className
      )}
    >
      {pending ? <span className="submitLoader"></span> : children}
    </Button>
  );
};

export default SubmitButton;
