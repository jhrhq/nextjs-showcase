"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GuestStepperProps {
  value: number;
  maxGuests: number;
  minGuests?: number;
  onChange: (newValue: number) => void;
  disabled?: boolean;
}

export function GuestStepper({ value, maxGuests, minGuests = 1, onChange, disabled = false }: GuestStepperProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-zinc-800">Guests</span>
        <span className="text-xs text-zinc-400 font-medium mt-0.5">Max {maxGuests} allowed</span>
      </div>
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full border-zinc-200 bg-background hover:bg-zinc-50 active:scale-95 transition-all shrink-0"
          disabled={disabled || value <= minGuests}
          onClick={() => onChange(value - 1)}
        >
          <Minus className="size-4 text-zinc-600" />
        </Button>

        <span className="w-6 text-center font-semibold text-zinc-800 tabular-nums select-none">{value}</span>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full border-zinc-200 bg-background hover:bg-zinc-50 active:scale-95 transition-all shrink-0"
          disabled={disabled || value >= maxGuests}
          onClick={() => onChange(value + 1)}
        >
          <Plus className="size-4 text-zinc-600" />
        </Button>
      </div>
    </div>
  );
}
