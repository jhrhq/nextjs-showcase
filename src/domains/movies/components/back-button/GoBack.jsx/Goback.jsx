"use client";

import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const Goback = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="flex items-center justify-center w-full sm:w-auto px-4 py-2 text-sm font-medium text-foreground bg-card border border-border rounded-lg gap-x-2 hover:bg-accent hover:text-accent-foreground transition-colors shadow-sm cursor-pointer"
    >
      <MoveLeft className="w-4 h-4 rtl:rotate-180" />
      <span>Go back</span>
    </button>
  );
};

export default Goback;
