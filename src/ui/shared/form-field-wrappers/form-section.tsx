import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface FormSectionProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function FormSection({ icon: Icon, title, description, children }: FormSectionProps) {
  return (
    <Card className="border-border/60 shadow-none">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="h-4 w-4 text-primary" />
          </div>
          <div>
            <CardTitle className="text-base font-semibold">{title}</CardTitle>
            {description && <CardDescription className="mt-0.5 text-xs">{description}</CardDescription>}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
}
