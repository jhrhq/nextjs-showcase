import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-4xl border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline:
          "border-border bg-input/30 hover:bg-input/50 hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
        // ghost normal
        "ghost-normal": "hover:bg-muted ",

        /** DESTRUCTIVE */

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
        default: "h-9 gap-1.5 px-3 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
        xs: "h-6 gap-1 px-2.5 text-xs has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1 px-3 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        lg: "h-10 gap-1.5 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        icon: "size-9",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
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
