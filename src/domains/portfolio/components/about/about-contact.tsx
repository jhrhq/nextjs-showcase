import { ArrowUpRight, Mail } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PORTFO_CONFIG } from "../../constants/constants";

export function AboutContact() {
  return (
    <section>
      <div className="py-20 sm:py-28">
        <Card className="overflow-hidden">
          <CardContent className="p-7 sm:p-10 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-primary" />
                  Get in touch
                </div>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Building something interesting?
                </h2>

                <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                  I&apos;m interested in frontend engineering roles, full-stack opportunities, and projects where
                  thoughtful engineering and good product experiences matter.
                </p>
              </div>

              <Button asChild>
                <Link href={`mailto:${PORTFO_CONFIG.SOCIAL.GMAIL}`}>
                  <Mail className="size-4" />
                  Get in touch
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
