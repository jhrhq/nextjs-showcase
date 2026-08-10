import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/ui/shared/icons";

const LINKS = [
  { label: "GitHub", href: "https://github.com", Icon: GithubIcon },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: LinkedinIcon },
  { label: "Email", href: "mailto:jhr@example.com", Icon: Mail },
];

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand + tagline */}
          <div className="flex flex-col items-center sm:items-start gap-1">
            <span className="font-mono text-base font-bold text-foreground">
              &lt;<span className="text-accent">Jhr</span> /&gt;
            </span>
            <p className="text-xs text-muted-foreground">Frontend developer · 40+ shipped projects</p>
          </div>

          {/* Contact links */}
          <nav aria-label="Contact links" className="flex items-center gap-6">
            {LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={label}
                className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium group"
              >
                <Icon size={15} className="group-hover:text-accent transition-colors" />
                <span className="hidden sm:inline">{label}</span>
              </a>
            ))}
          </nav>
        </div>

        {/* Divider + copyright */}
        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Jahirul Hossain Rahman. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground font-mono">Built with Next.js 16 · Tailwind CSS v4</p>
        </div>
      </div>
    </footer>
  );
}
