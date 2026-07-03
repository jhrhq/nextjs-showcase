import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import { cn } from "@/lib/utils";

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(" disabled:pointer-events-none disabled:opacity-50 ", className)} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button };
