import * as React from "react";
import * as CustomPopoverPrimitive from "@/app/password-meter/components//custom-input-popover-primitive";

import { cn } from "@/lib/utils";

const CustomInputPopover = CustomPopoverPrimitive.Root;

const CustomInputPopoverTrigger = CustomPopoverPrimitive.Trigger;

const CustomInputPopoverContent = React.forwardRef<
  React.ComponentRef<typeof CustomPopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof CustomPopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <CustomPopoverPrimitive.Portal>
    <CustomPopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </CustomPopoverPrimitive.Portal>
));
CustomInputPopoverContent.displayName = CustomPopoverPrimitive.Content.displayName;

const CustomInputPopoverArrow = CustomPopoverPrimitive.Arrow;

export { CustomInputPopover, CustomInputPopoverArrow, CustomInputPopoverContent, CustomInputPopoverTrigger };
