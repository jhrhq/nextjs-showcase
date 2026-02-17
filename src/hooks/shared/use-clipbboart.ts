import * as React from "react";

export interface UseClipbardOptions {
  /** Time in ms after which the copied state will reset, `2000` by default */
  timeout?: number;
}

export interface UseClipboardReturnValue {
  /** functin to copyvalue to clipboard */
  copy: (value: unknown) => Promise<boolean>;

  /** Function to reset copied state and error */
  reset: () => void;

  /** Error if copying failed */
  error: Error | null;

  /** Boolean indicating if the value was copied successfully */
  copied: boolean;
}

/**
 * A React hook for copying values to the system clipboard.
 *
 * Automatically resets the `copied` state after the specified timeout.
 *
 * @param options.timeout - Time in milliseconds before `copied` resets. Default is 200.
 *
 * @returns An object containing:
 * - `copy` - Async function to copy a value to clipboard.
 * - `copied` - Boolean indicating whether copy succeeded.
 * - `error` - Error object if copying failed.
 * - `reset` - Function to manually reset state.
 *
 * @example
 * Basic usage
 * ```tsx
 * const { copy, copied } = useClipboard()
 *
 * <Button onClick={() => copy("Hello world")}>
 *   {copied ? "Copied!" : "Copy"}
 * </Button>
 * ```
 *
 * @example
 * With icon swap (lucide + shadcn)
 * ```tsx
 * const { copy, copied } = useClipboard()
 *
 * <Button size="icon" onClick={() => copy("Hello")}>
 *   {copied ? <Check /> : <Copy />}
 * </Button>
 * ```
 *
 * @example
 * With render prop component
 * export function Demo1() {
 *  return (
 *   <CopyClipboard value="https://example.com" timeout={2000}>
 *     {({ copied, copy }) => (
 *       <Button variant={copied ? "secondary" : "default"} onClick={copy}>
 *         {copied ? (
 *           <>
 *             <Check className="mr-2 text-green-500" />
 *             Copied URL
 *           </>
 *         ) : (
 *           <>
 *             <Copy className="mr-2" />
 *             Copy URL
 *           </>
 *         )}
 *       </Button>
 *     )}
 *   </CopyClipboard>
 * );
 * }
 *
 * @example
 *
 * export function Demo2() {
 *return (
 *  <CopyClipboard value="https://example.com" timeout={2000}>
 *    {({ copied, copy }) => (
 *      <TooltipProvider>
 *        <Tooltip>
 *          <TooltipTrigger asChild>
 *            <Button size="icon" variant="ghost" onClick={copy}>
 *              {copied ? <Check className="text-green-500" /> : <Copy />}
 *            </Button>
 *          </TooltipTrigger>
 *          <TooltipContent>{copied ? "Copied" : "Copy"}</TooltipContent>
 *        </Tooltip>
 *      </TooltipProvider>
 *    )}
 *  </CopyClipboard>
 *  );
 *  }
 *
 * @example
 *
 * export function CopyButton({value,timeout}: CopyButtonProps) {
 * const { copy, copied, error } = useClipboard({ timeout });
 * const [loading, setLoading] = React.useState(false);
 *  const handleCopy = async () => {
 *  setLoading(true);
 *  await copy(value);
 *  setLoading(false);
 *};
 *  const icon = loading ? (
 *  <Loader2 className="animate-spin" />
 *) : copied ? (
 *  <Check className="text-green-500" />
 *) : (
 *  <Copy />
 *);
 *  const tooltipText = error ? "Failed to copy" : copied ? "Copied!" : "Copy  to clipboard";
 *
 * return (
 *  <TooltipProvider>
 *    <Tooltip>
 *      <TooltipTrigger asChild>
 *        <Button
 *          variant="outline"
 *          size="icon"
 *          onClick={handleCopy}
 *          disabled={copied || loading}
 *          className={className}
 *          aria-label="Copy to clipboard"
 *        >
 *          {icon}
 *        </Button>
 *      </TooltipTrigger>
 *      <TooltipContent>{tooltipText}</TooltipContent>
 *    </Tooltip>
 *  </TooltipProvider>
 *   );
 *  }
 *
 *
 */

export function useClipboard({ timeout = 2000 }: UseClipbardOptions = {}): UseClipboardReturnValue {
  const [error, setError] = React.useState<Error | null>(null);
  const [copied, setCopied] = React.useState(false);

  const timeoutRef = React.useRef<number | null>(null);

  const isSupported = typeof window !== "undefined" && typeof navigator !== "undefined" && !!navigator.clipboard;

  const clearTimer = React.useCallback(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const copy = React.useCallback(
    async (value: unknown): Promise<boolean> => {
      if (!isSupported) {
        const err = new Error("clipboard not supported");
        setError(err);
        return false;
      }

      try {
        const text = typeof value === "string" ? value : JSON.stringify(value, null, 2);

        await navigator.clipboard.writeText(text);

        clearTimer();
        setCopied(true);
        setError(null);

        timeoutRef.current = window.setTimeout(() => setCopied(false), timeout);

        return true;
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Failed to copy");
        setError(error);
        setCopied(false);
        return false;
      }
    },
    [timeout, isSupported, clearTimer]
  );

  const reset = React.useCallback(() => {
    clearTimer();
    setCopied(false);
    setError(null);
  }, [clearTimer]);

  React.useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  return { copy, reset, error, copied };
}
