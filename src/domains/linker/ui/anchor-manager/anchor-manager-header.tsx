"use client";

export default function AnchorManagerHeader({ projectName }: { projectName: string }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2.5">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Anchor Manager</h1>
        {projectName && (
          <span className="inline-flex items-center rounded-full border border-border bg-accent/60 px-2.5 py-0.5 text-xs font-medium text-accent-foreground shadow-2xs">
            {projectName}
          </span>
        )}
      </div>
      <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
        Analyze anchor text distribution, identify over-optimization risks, and take action directly from your anchor
        inventory.
      </p>
    </div>
  );
}
