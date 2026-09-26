"use client";

import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search by name or tag…",
}: SearchInputProps) {
  return (
    <div className="relative w-full sm:w-64">
      <Search
        size={14}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-fl-muted"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-fl-border bg-fl-surface py-1.5 pl-8 pr-3 text-xs font-medium text-fl-text placeholder:text-fl-muted focus:border-fl-accent focus:outline-none"
      />
    </div>
  );
}
