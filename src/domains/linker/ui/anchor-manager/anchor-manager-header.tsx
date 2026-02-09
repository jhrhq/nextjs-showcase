export default function AnchorManagerHeader({ projectName }: { projectName: string }) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900">Anchor Manager</h1>
      <p className="text-slate-600 mt-1">
        {projectName}
        Analyze anchor text distribution, identify over-optimization risks, and take action directly from your anchor
        inventory.
      </p>
    </div>
  );
}
