import { Mail } from "lucide-react";
import Link from "next/link";
import { CopyToClipboardWithCustom } from "@/ui/shared/copy-to-clipboard";
import { GithubIcon, LinkedinIcon } from "@/ui/shared/icons";
import { PORTFO_CONFIG } from "../constants/constants";
// TODO: add copy button for mail icon to copy email
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
          <Link
            href={PORTFO_CONFIG.SOCIAL.GITHUB}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <GithubIcon />
          </Link>

          <Link
            href={PORTFO_CONFIG.SOCIAL.LINKEDIN}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <LinkedinIcon />
          </Link>

          <span className="text-muted-foreground transition-colors hover:text-foreground">
            <CopyToClipboardWithCustom
              value={PORTFO_CONFIG.SOCIAL.GMAIL}
              label="Copy email address"
              copiedLabel="Email copied!"
              icon={<Mail className="size-7 stroke-2" />}
            />{" "}
          </span>
        </div>

        {/* Copyright */}
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Jhr. All rights reserved.</p>
      </div>
    </footer>
  );
}
