import { SectionLabel } from "./section-label";

export function AboutProfile() {
  return (
    <section id="profile" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[180px_1fr]">
          <SectionLabel number="01" label="Profile" />

          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              I like understanding how the pieces fit together.
            </h2>

            <div className="mt-7 space-y-5">
              <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                My strongest professional experience came from spending three years as the sole frontend developer for a
                growing SaaS platform. I was responsible for turning product ideas and business requirements into a
                complete customer-facing application.
              </p>

              <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                That meant more than building individual screens. I made decisions around frontend architecture, UI
                systems, state management, data fetching, forms, authentication, API integration, and performance as the
                product continued to grow.
              </p>

              <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                Working in that environment taught me to think beyond the immediate interface and consider how
                individual decisions affect the larger application.
              </p>

              <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                Today, I&apos;m taking that experience further by learning more about the backend systems behind the
                interfaces I build. My current focus is Node.js, Express, SQL, and MongoDB, with the goal of becoming
                more capable across the entire application stack.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
