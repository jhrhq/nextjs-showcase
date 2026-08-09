import Link from "next/link";
import { ModeToggle } from "@/ui/shared/theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80"
        >
          &lt;Jhr /&gt;
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
          <Link href="#projects" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Projects
          </Link>

          <Link href="#stack" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Stack
          </Link>

          <Link href="#archive" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Archive
          </Link>

          <Link href="#contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Contact
          </Link>
        </nav>

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
    </header>
  );
}
