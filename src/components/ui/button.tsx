import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 border border-transparent bg-clip-padding text-xs font-medium focus-visible:ring-1 aria-invalid:ring-1 [&_svg:not([class*='size-'])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 outline-none group/button select-none cursor-pointer",
  {
    variants: {
      variant: {
        /** DEFAULTS */
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        ghost: "hover:bg-muted hover:text-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",

        /** DESTRUCTIVE */
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30",
        "destructive-lighter": "bg-destructive-lighter text-destructive-light hover:bg-destructive-lighter/80",
        "destructive-lighter-rounded":
          "bg-destructive-lighter text-destructive-light rounded-full hover:bg-destructive-lighter/80",
        inactive:
          "bg-muted text-muted-foreground border border-border hover:bg-muted cursor-not-allowed disabled:opacity-100",

        pending: "bg-yellow-light text-yellow-dark hover:bg-yellow-light/80 cursor-wait disabled:opacity-100",
        /** PRIMARY LIGHTER */
        "default-lighter": "bg-primary-lighter text-primary hover:bg-primary-lighter/80",
        "default-lighter-rounded": "bg-primary-lightest text-primary rounded-full hover:bg-primary-lightest/80",

        /** TEAL */
        "teal-lighter": "bg-teal-lighter text-teal-light hover:bg-teal-lighter/80",
        "teal-lighter-rounded": "bg-teal-lighter text-teal-light rounded-full hover:bg-teal-lighter/80",

        /** PURPLE */
        "purple-lighter": "bg-purple-lighter text-purple-light hover:bg-purple-lighter/80",
        "purple-lighter-rounded": "bg-purple-lighter text-purple-light rounded-full hover:bg-purple-lighter/80",

        /** ORANGE */
        "orange-lighter": "bg-orange-light text-orange-dark hover:bg-orange-light/80",
        "orange-lighter-rounded": "bg-orange-light text-orange-dark rounded-full hover:bg-orange-light/80",

        /** GREEN */
        "green-lighter": "bg-green-light text-green-dark hover:bg-green-light/80",
        "green-lighter-rounded": "bg-green-light text-green-dark rounded-full hover:bg-green-light/80",

        /** YELLOW */
        "yellow-lighter": "bg-yellow-light text-yellow-dark hover:bg-yellow-light/80",
        "yellow-lighter-rounded": "bg-yellow-light text-yellow-dark rounded-full hover:bg-yellow-light/80",
      },

      size: {
        default: "h-8 gap-1.5 px-2.5",
        xs: "h-6 px-2 text-xs",
        sm: "h-7 px-2.5",
        lg: "h-9 px-3",
        icon: "size-8",
        "icon-xs": "size-6",
        "icon-sm": "size-7",
        "icon-lg": "size-9",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
