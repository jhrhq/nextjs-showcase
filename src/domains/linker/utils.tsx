import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";

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

export function getStatusIcon(status: "pass" | "warning" | "fail") {
  if (status === "pass") return <CheckCircle2 className="size-4 text-green-600" />;
  if (status === "warning") return <AlertCircle className="size-4 text-yellow-600" />;
  return <XCircle className="size-4 text-red-600" />;
}

export function getSeoScoreStatus(score: number) {
  if (score >= 90) return "Excellent";
  if (score >= 70) return "Good";
  return "Poor";
}
