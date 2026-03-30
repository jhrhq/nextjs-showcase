"use client";

import { Separator } from "@/components/ui/separator";

export interface DuplicateWarningProps {
  count: number;
}

export function DuplicateWarning({ count }: DuplicateWarningProps) {
  if (count === 0) return null;

  return (
    <>
      <Separator />
      <div className="px-6 py-3 bg-amber-50 flex items-start gap-2.5">
        <span className="text-amber-500 text-sm mt-0.5" aria-hidden="true">
          ⚠
        </span>
        <p className="text-xs text-amber-700 leading-relaxed">
          <strong>
            {count} duplicate URL{count > 1 ? "s" : ""}
          </strong>{" "}
          detected. Remove all duplicates before saving.
        </p>
      </div>
    </>
  );
}
