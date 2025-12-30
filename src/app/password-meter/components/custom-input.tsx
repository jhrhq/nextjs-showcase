import * as React from "react";

import { InputGroupInput } from "@/components/ui/input-group";
import { cn } from "@/lib/utils";

const CustomInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => {
  return (
    <InputGroupInput
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md bg-background text-base  placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
CustomInput.displayName = "Input";

export { CustomInput };
