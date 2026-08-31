"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/ui/shared/theme-toggle";
import type { NavbarItem } from "../../types/project.types";

interface NavbarProps {
  items: NavbarItem[];
  brand?: string;
  description?: string;
  availability?: boolean;
  contactHref?: string;
  contactLabel?: string;
  className?: string;
}

function AvailabilityBadge({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5", className)}>
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
        <span className="relative inline-flex size-2 rounded-full bg-primary" />
      </span>

      <span className="text-xs font-medium text-muted-foreground">Available for Hire</span>
    </div>
  );
}

function NavbarLink({ item, pathname, mobile = false }: { item: NavbarItem; pathname: string; mobile?: boolean }) {
  const isActive = item.type === "page" ? pathname === item.href : item.href === "/" ? pathname === "/" : false;

  return (
    <Link
      href={item.href}
      className={cn(
        mobile
          ? "rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          : "inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground",
        isActive && !mobile && "font-semibold text-primary"
      )}
    >
      {item.label}
    </Link>
  );
}

export function Navbar({
  items,
  brand = "<Jhr />",
  description = "Frontend Developer",
  availability = true,
  contactHref = "#contact",
  contactLabel = "Get in Touch",
  className,
}: NavbarProps) {
  const pathname = usePathname();

  return (
    <header className={cn("sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl", className)}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80"
        >
          {brand}
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
          {items.map((item) => (
            <NavbarLink key={`${item.label}-${item.href}`} item={item} pathname={pathname} />
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {availability && <AvailabilityBadge className="hidden sm:flex" />}

          <ModeToggle />

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open navigation menu" className="md:hidden">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[min(85vw,380px)] border-l border-border bg-background p-0">
              <SheetHeader className="border-b border-border px-6 py-5 text-left">
                <SheetTitle className="text-base font-semibold">{brand}</SheetTitle>

                <SheetDescription className="text-xs text-muted-foreground">{description}</SheetDescription>
              </SheetHeader>

              <div className="flex flex-1 flex-col px-4 py-6">
                {/* Mobile Availability */}
                {availability && <AvailabilityBadge className="mb-6 rounded-lg px-4 py-3 sm:hidden" />}

                {/* Mobile Navigation */}
                <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
                  {items.map((item) => (
                    <NavbarLink key={`${item.label}-${item.href}`} item={item} pathname={pathname} mobile />
                  ))}
                </nav>

                {/* Contact */}
                {contactHref && (
                  <div className="mt-auto border-t border-border pt-6">
                    <Link
                      href={contactHref}
                      className="flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                    >
                      {contactLabel}
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
