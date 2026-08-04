"use client";

import { Check, Copy, Loader2 } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useClipboard } from "@/hooks/shared/use-clipbboart";

interface CopyProps {
  value: unknown;
  timeout?: number;
  children: (props: { copied: boolean; copy: () => void; reset: () => void; error: Error | null }) => React.ReactNode;
}

export function CopyClipboard({ value, timeout, children }: CopyProps) {
  const { copied, copy, reset, error } = useClipboard({ timeout });

  const handleCopy = React.useCallback(async () => {
    await copy(value);
  }, [copy, value]);

  return <>{children({ copied, copy: handleCopy, reset, error })}</>;
}

export function CopyClipboardWithText({ value }: { value: unknown }) {
  return (
    <CopyClipboard value={value} timeout={2000}>
      {({ copied, copy }) => (
        <Button variant={copied ? "secondary" : "default"} onClick={copy}>
          {copied ? (
            <>
              <Check className="mr-2 text-green-500" />
              Copied URL
            </>
          ) : (
            <>
              <Copy className="mr-2" />
              Copy URL
            </>
          )}
        </Button>
      )}
    </CopyClipboard>
  );
}

export function CopyToClipboardWithToolTipIcon({ value }: { value: unknown }) {
  return (
    <CopyClipboard value={value} timeout={2000}>
      {({ copied, copy }) => (
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="ghost" onClick={copy}>
                {copied ? <Check className="text-green-500" /> : <Copy />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{copied ? "Copied" : "Copy"}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </CopyClipboard>
  );
}

interface CopyButtonProps {
  value: unknown;
  timeout?: number;
  className?: string;
}

export function CopyButton({
  value,
  timeout,
  className = "h-auto w-auto p-1 border-0 bg-transparent hover:bg-transparent focus-visible:ring-0",
}: CopyButtonProps) {
  const { copy, copied, error } = useClipboard({ timeout });
  const [loading, setLoading] = React.useState(false);

  const handleCopy = async () => {
    setLoading(true);
    await copy(value);
    setLoading(false);
  };

  const icon = loading ? (
    <Loader2 className="animate-spin" />
  ) : copied ? (
    <Check className="text-green-500" />
  ) : (
    <Copy />
  );

  const tooltipText = error ? "Failed to copy" : copied ? "Copied!" : "Copy to clipboard";

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopy}
            disabled={copied || loading}
            className={className}
            aria-label="Copy to clipboard"
          >
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{tooltipText}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
