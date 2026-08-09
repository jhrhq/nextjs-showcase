import { Mail } from "lucide-react";
import Link from "next/link";
import { GithubIcon, LinkedinIcon } from "@/ui/shared/icons";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        {/* Brand */}
        <div>
          <Link
            href="/"
            className="font-mono text-sm font-semibold text-foreground transition-opacity hover:opacity-80"
          >
            &lt;Jhr /&gt;
          </Link>

          <p className="mt-2 text-sm text-muted-foreground">Building useful things for the web.</p>
        </div>

        {/* Social */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <GithubIcon />
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <LinkedinIcon />
          </a>

          <a
            href="mailto:hello@example.com"
            aria-label="Email"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Mail className="size-4" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Tafhim. All rights reserved.</p>
      </div>
    </footer>
  );
}
