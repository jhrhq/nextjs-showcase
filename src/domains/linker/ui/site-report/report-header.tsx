"use client";

export default function ReportHeader({ projectName, generatedDate }: { projectName: string; generatedDate: string }) {
  return (
    <div className="space-y-1.5">
      <div className="flex flex-wrap items-center gap-2.5">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Site Report</h1>
        {projectName && (
          <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
            {projectName}
          </span>
        )}
      </div>

      <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
        Comprehensive SEO analysis for {projectName}
      </p>

      <p className="text-xs text-muted-foreground/80">Generated {new Date(generatedDate).toLocaleString()}</p>
    </div>
  );
}
