"use client";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface SearchButtonProps {
  className?: string;
  onOpen?: () => void;
}

export function SearchButton({ className, onOpen }: SearchButtonProps) {
  return (
    <button
      onClick={() => onOpen?.()}
      className={cn(
        "hidden sm:inline-flex items-center gap-2 h-9 w-64 px-4 rounded-md border border-input bg-background text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer justify-between",
        className,
      )}
    >
      <Search size={14} />
      <span className="flex-1 text-left">Search docs...</span>
      <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
        <span className="text-xs">⌘</span>K
      </kbd>
    </button>
  );
}
