export function getScoreVariant(score: number): "default" | "secondary" | "destructive" {
  if (score >= 90) return "default";
  if (score >= 70) return "secondary";
  return "destructive";
}

export function getScoreColor(score: number) {
  if (score >= 90) return "text-green-600";
  if (score >= 70) return "text-yellow-600";
  return "text-red-600";
}
