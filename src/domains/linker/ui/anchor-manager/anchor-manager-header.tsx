"use client";
export default function AnchorManagerHeader({ projectName }: { projectName: string }) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-200">Anchor Manager</h1>
      <p className="text-zinc-600 dark:text-zinc-500 mt-1">
        {projectName}
        Analyze anchor text distribution, identify over-optimization risks, and take action directly from your anchor
        inventory.
      </p>
    </div>
  );
}
