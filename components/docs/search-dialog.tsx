"use client";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { getCategoryMeta } from "@/lib/categories";
import { DocMetadata } from "@/lib/docs";
import { FileText, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

interface SearchDialogProps {
  items: DocMetadata[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ items, open, onOpenChange }: SearchDialogProps) {
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const runCommand = useCallback(
    (command: () => void) => {
      onOpenChange(false);
      command();
    },
    [onOpenChange],
  );

  const categories = items.reduce(
    (acc, item) => {
      const category = item.category || "General";
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
      return acc;
    },
    {} as Record<string, DocMetadata[]>,
  );

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <Command className="rounded-lg">
        <CommandInput placeholder="Search documentation..." />
        <CommandList className="max-h-75">
          <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
            <div className="flex flex-col items-center gap-2">
              <Search size={24} className="opacity-20" />
              <p>No results found.</p>
            </div>
          </CommandEmpty>

          {Object.entries(categories)
            .sort(
              (a, b) =>
                getCategoryMeta(a[0]).order - getCategoryMeta(b[0]).order,
            )
            .map(([category, docs]) => {
              const { icon: Icon, title } = getCategoryMeta(category);
              return (
                <CommandGroup
                  key={category}
                  heading={
                    <div className="flex items-center gap-2 px-0.5">
                      <Icon size={14} />
                      <span className="text-xs font-black uppercase tracking-[0.2em]">
                        {title}
                      </span>
                    </div>
                  }
                >
                  {docs.map((doc) => (
                    <CommandItem
                      key={doc.slug}
                      value={`${doc.title} ${doc.description || ""}`}
                      onSelect={() =>
                        runCommand(() => router.push(`/docs/${doc.slug}`))
                      }
                      className="flex items-center gap-3 px-2 py-2.5"
                    >
                      <FileText
                        size={16}
                        className="text-muted-foreground shrink-0 opacity-60"
                      />
                      <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                        <span className="font-medium truncate">
                          {doc.title}
                        </span>
                        {doc.description && (
                          <span className="text-xs text-muted-foreground text-ellipsis line-clamp-1">
                            {doc.description}
                          </span>
                        )}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              );
            })}
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
