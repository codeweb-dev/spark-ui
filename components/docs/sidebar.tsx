"use client";

import { DocMetadata } from "@/lib/docs";
import { getCategoryMeta } from "@/lib/categories";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  items: DocMetadata[];
}

export function Sidebar({ items }: SidebarProps) {
  const pathname = usePathname();

  const categories = items.reduce(
    (acc, item) => {
      const category = item.category || "General";
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
      return acc;
    },
    {} as Record<string, DocMetadata[]>,
  );

  const sortedEntries = Object.entries(categories).sort((a, b) => {
    return getCategoryMeta(a[0]).order - getCategoryMeta(b[0]).order;
  });

  return (
    <aside className="sticky top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:block">
      <div className="h-full overflow-y-auto py-6 pr-6 lg:py-8">
        {sortedEntries.map(([category, docs]) => {
          const { icon: Icon, title } = getCategoryMeta(category);
          return (
            <div key={category} className="pb-8">
              <div className="flex items-center gap-2 mb-2 px-2">
                <Icon size={14} className="text-zinc-400" />
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                  {title}
                </h4>
              </div>
              <div className="grid grid-flow-row auto-rows-max text-sm gap-1">
                {docs.map((doc) => (
                  <Link
                    key={doc.slug}
                    href={`/docs/${doc.slug}`}
                    className={cn(
                      "group flex w-full items-center rounded-r-md border-l-2 border-transparent px-3 py-1.5 transition-all text-sm",
                      pathname === `/docs/${doc.slug}`
                        ? "bg-primary/5 border-primary font-bold text-primary"
                        : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900",
                    )}
                  >
                    {doc.title}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
