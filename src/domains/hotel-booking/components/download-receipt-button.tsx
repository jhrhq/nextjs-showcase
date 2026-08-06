import { Download } from "lucide-react";
import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AUTH_CONFIG } from "../constants/auth.constants";

export interface DownloadReceiptButtonProps extends Omit<ComponentProps<typeof Button>, "asChild"> {
  bookingId: string;
  label?: string;
  iconClassName?: string;
}
export function DownloadReceiptButton({
  bookingId,
  label = "Download Receipt",
  variant = "outline",
  size = "default",
  className,
  iconClassName,
  ...props
}: DownloadReceiptButtonProps) {
  const receiptUrl = AUTH_CONFIG.API.DOWNLOAD_RECEIPT(bookingId);

  return (
    <Button type="button" variant={variant} size={size} className={cn("gap-2", className)} asChild {...props}>
      <a href={receiptUrl} target="_blank" rel="noopener noreferrer">
        <Download className={cn("size-4 shrink-0", iconClassName)} />
        {label && <span>{label}</span>}
      </a>
    </Button>
  );
}
