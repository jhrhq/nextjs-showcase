import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

interface FormErrorProps {
  error?: string;
  className?: string;
}

function FormError({ error, className }: FormErrorProps) {
  if (!error) return null;
  return (
    <Alert variant="destructive" className={cn("border-0 px-0 py-1", className)}>
      <AlertCircle />
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
}

export default FormError;
