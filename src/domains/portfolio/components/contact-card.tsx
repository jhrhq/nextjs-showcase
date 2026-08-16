import { ArrowUpRight, Mail } from "lucide-react";
import { PORTFO_CONFIG } from "../constants/constants";

export function ContactCard() {
  return (
    <section className="border-t border-border">
      <div className="py-12 lg:py-16">
        <div className=" flex flex-col gap-6 rounded-2xl border border-border bg-muted/30 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10 ">
          {/* Content */}
          <div className="flex items-start gap-4">
            <div className=" flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-background ">
              <Mail className="size-4" />
            </div>
            <div>
              <p className=" font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground "> Get in touch </p>
              <h2 className=" mt-1.5 text-xl font-medium tracking-tight sm:text-2xl "> Have a project in mind? </h2>
              <p className=" mt-2 max-w-lg text-sm leading-6 text-muted-foreground ">
                Feel free to reach out if you'd like to discuss a project, collaboration, or just want to say hello.
              </p>
            </div>
          </div>
          {/* Email */}
          <a
            href="mailto:your-email@example.com"
            className=" group inline-flex w-fit items-center gap-2 rounded-full border border-foreground bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-all duration-200 hover:bg-background hover:text-foreground "
          >
            {PORTFO_CONFIG.SOCIAL.GMAIL}
            <ArrowUpRight className=" size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 " />
          </a>
        </div>
      </div>
    </section>
  );
}
