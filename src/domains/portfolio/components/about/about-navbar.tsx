import Link from "next/link";
import { ModeToggle } from "@/ui/shared/theme-toggle";

const NAVIGATIONS = ["About me", "Profile", "Experience", "Work", "Technology", "Education", "Learning"];

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

        {/* Navigation */}
        <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
          {NAVIGATIONS.map((nav) => (
            <Link
              key={nav}
              href={`#${nav}`}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {nav}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 sm:flex">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>

            <span className="text-xs font-medium text-muted-foreground">Available for Hire</span>
          </div>

          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
