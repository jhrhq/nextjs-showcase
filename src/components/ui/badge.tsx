import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary: "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        outline: "border-border bg-input/30 text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost: "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",

        "default-lighter": "bg-primary-lighter text-primary",
        "default-lighter-rounded": "bg-primary-lightest text-primary py-1 px-3 rounded-full",

        //Destructive
        "destructive-lighter": "bg-destructive-lighter text-destructive-light",
        "destructive-lighter-rounded": "bg-destructive-lighter text-destructive-light py-1 px-3 rounded-full",

        inactive: "bg-muted text-muted-foreground border border-border",
        "inactive-rounded": "bg-muted text-muted-foreground border border-border py-1 px-3 rounded-full",

        pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/40 dark:text-yellow-400",
        "pending-rounded":
          "bg-yellow-light text-yellow-dark py-1 px-3 rounded-full dark:bg-yellow-950/50 dark:text-yellow-400 dark:border dark:border-yellow-900/30", // TEAL
        "teal-lighter": "bg-teal-lighter text-teal-light",
        "teal-lighter-rounded": "bg-teal-lighter text-teal-light py-1 px-3 rounded-full",

        // PURPLE
        "purple-lighter": "bg-purple-lighter text-purple-light",
        "purple-lighter-rounded": "bg-purple-lighter text-purple-light py-1 px-3 rounded-full",

        // ORANGE
        "orange-lighter": "bg-orange-light text-orange-dark",
        "orange-lighter-rounded": "bg-orange-light text-orange-dark py-1 px-3 rounded-full",

        // GREEN
        "green-lighter": "bg-green-light text-green-dark",
        "green-lighter-rounded": "bg-green-light text-green-dark py-1 px-3 rounded-full",

        // YELLOW
        "yellow-lighter": "bg-yellow-light text-yellow-dark",
        "yellow-lighter-rounded": "bg-yellow-light text-yellow-dark py-1 px-3 rounded-full",
        new: "bg-teal-100 text-teal-800 dark:bg-teal-950/40 dark:text-teal-400",
        "new-rounded":
          "bg-teal-100 text-teal-800 py-1 px-3 rounded-full dark:bg-teal-950/50 dark:text-teal-400 dark:border dark:border-teal-900/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp data-slot="badge" data-variant={variant} className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
