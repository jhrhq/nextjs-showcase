export function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="font-mono text-xs text-muted-foreground">{number}</span>

      <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{label}</span>
    </div>
  );
}
