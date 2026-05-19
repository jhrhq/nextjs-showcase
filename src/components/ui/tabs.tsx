"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { Tabs as TabsPrimitive } from "radix-ui";
import type * as React from "react";

import { cn } from "@/lib/utils";

function Tabs({ className, orientation = "horizontal", ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn("gap-2 group/tabs flex data-[orientation=horizontal]:flex-col", className)}
      {...props}
    />
  );
}

const tabsListVariants = cva(
  "overflow-hidden p-[3px] group-data-horizontal/tabs:h-9 data-[variant=line]:rounded-none group/tabs-list inline-flex w-fit items-center justify-center group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-1 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function TabsList({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        // Base Layout & Sizing
        "relative flex-none inline-flex items-center justify-center h-[calc(100%-1px)] py-4 px-6 gap-1.5 text-sm font-medium whitespace-nowrap cursor-pointer transition-all rounded-none outline-none border-0 border-b-2 border-transparent disabled:pointer-events-none disabled:opacity-50 group",

        // Orientation handling
        "group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start",

        // SVGs inside tabs
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",

        // Focus states
        "focus-visible:outline-1 focus-visible:outline-ring focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",

        // Active Underline Line Indicator (the "after:" pseudo element)
        "after:absolute after:opacity-0 after:transition-opacity after:bg-foreground",
        "group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:-bottom-1.25 group-data-[orientation=horizontal]/tabs:after:h-0.5",
        "group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5",
        "group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100",

        // Light Mode Colors & Interactions
        "text-zinc-600 hover:text-foreground",
        "data-[state=active]:text-primary data-[state=active]:border-primary data-[state=active]:bg-background data-[state=active]:shadow-none",
        "group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent",

        // Dark Mode Colors & Interactions (Zinc Palette)
        "dark:text-zinc-400 dark:hover:text-zinc-50",
        "dark:data-[state=active]:text-zinc-50 dark:data-[state=active]:bg-zinc-900/40 dark:data-[state=active]:border-zinc-700",
        "dark:group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:border-transparent",
        "dark:after:bg-zinc-50",

        className
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("text-xs/relaxed flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger, tabsListVariants };
