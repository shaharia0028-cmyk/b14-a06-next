"use client";

import { ChevronDown } from "lucide-react";
import { SortKey } from "@/lib/types";

const options: { value: SortKey; label: string }[] = [
  { value: "duration", label: "Duration" },
  { value: "calories", label: "Calories" },
  { value: "rating", label: "Rating" },
];

interface SortDropdownProps {
  value: SortKey;
  onChange: (value: SortKey) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <label className="flex items-center gap-2 text-xs text-fl-muted">
      Sort By
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortKey)}
          className="appearance-none rounded-lg border border-fl-border bg-fl-surface py-1.5 pl-3 pr-8 text-xs font-medium text-fl-text focus:border-fl-accent focus:outline-none"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={14}
          className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-fl-muted"
        />
      </div>
    </label>
  );
}
