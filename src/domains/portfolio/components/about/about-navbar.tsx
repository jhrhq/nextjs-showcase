import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/ui/shared/theme-toggle";

const NAVIGATIONS = [
  { label: "About me", href: "#About-me" },
  { label: "Profile", href: "#profile" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Technology", href: "#technology" },
  { label: "Education", href: "#education" },
  { label: "Learning", href: "#learning" },
] as const;

function AvailabilityBadge({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 ${className}`}>
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
        <span className="relative inline-flex size-2 rounded-full bg-primary" />
      </span>
      <span className="text-xs font-medium text-muted-foreground">Available for Hire</span>
    </div>
  );
}

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80"
        >
          &lt;Jhr /&gt;
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
          {NAVIGATIONS.map((nav) => (
            <Link
              key={nav.href}
              href={nav.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {nav.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <AvailabilityBadge className="hidden sm:flex" />

          <ModeToggle />

          {/* Mobile Navigation Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open navigation menu" className="md:hidden">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(85vw,380px)] border-l border-border bg-background p-0">
              <SheetHeader className="border-b border-border px-6 py-5 text-left">
                <SheetTitle className="text-base font-semibold">&lt;Jhr /&gt;</SheetTitle>
                <SheetDescription className="text-xs text-muted-foreground">Frontend Developer</SheetDescription>
              </SheetHeader>

              <div className="flex flex-1 flex-col px-4 py-6">
                {/* Mobile Availability Badge */}
                <div className="mb-6 flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-500 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-green-500" />
                  </span>
                  <span className="text-sm font-medium">Available for Hire</span>
                </div>

                {/* Mobile Navigation Links */}
                <nav className="flex flex-col gap-1">
                  {NAVIGATIONS.map((nav) => (
                    <Link
                      key={nav.href}
                      href={nav.href}
                      className="rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      {nav.label}
                    </Link>
                  ))}
                </nav>

                {/* Contact CTA */}
                <div className="mt-auto border-t border-border pt-6">
                  <Link
                    href="#contact"
                    className="flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
