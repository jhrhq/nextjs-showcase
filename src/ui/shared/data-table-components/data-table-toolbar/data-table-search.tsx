import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface DataTableSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function DataTableSearch({ value, onChange, placeholder = "Search..." }: DataTableSearchProps) {
  return (
    <div className="relative flex-1 max-w-sm border-0">
      <Search className="absolute left-2 top-2.5 size-4 text-slate-500" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-8 border-0 shadow-none"
      />
    </div>
  );
}
