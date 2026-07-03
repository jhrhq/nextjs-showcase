import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn("disabled:cursor-not-allowed disabled:opacity-50 ", className)}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
