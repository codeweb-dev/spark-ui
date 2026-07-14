"use client";

import { DocMetadata } from "@/lib/docs";
import { getCategoryMeta } from "@/lib/categories";
import {
  BETA_DOC_SLUGS,
  NEW_DOC_SLUGS,
  UPDATED_DOC_SLUGS,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FlaskConical, RefreshCw, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

interface SidebarProps {
  items: DocMetadata[];
}

export function Sidebar({ items }: SidebarProps) {
  const pathname = usePathname();
  const activeItemRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    activeItemRef.current?.scrollIntoView({ block: "center" });
  }, [pathname]);

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
          const { title } = getCategoryMeta(category);
          return (
            <div key={category} className="pb-8">
              <h4 className="text-xs text-muted-foreground mb-2 px-3">
                {title}
              </h4>
              <div className="flex flex-col gap-0.5 text-sm">
                {docs.map((doc) => (
                  <Link
                    key={doc.slug}
                    href={`/docs/${doc.slug}`}
                    ref={
                      pathname === `/docs/${doc.slug}`
                        ? activeItemRef
                        : undefined
                    }
                    className={cn(
                      "w-fit ml-3 rounded-lg px-3 py-1.5 text-sm transition-colors",
                      pathname === `/docs/${doc.slug}`
                        ? "bg-accent text-accent-foreground"
                        : "text-foreground/80 hover:bg-accent/50 hover:text-foreground",
                    )}
                  >
                    <span className="flex items-center gap-2">
                      {doc.title}
                      {NEW_DOC_SLUGS.has(doc.slug) && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-primary-foreground">
                          <Sparkles className="size-2.5" aria-hidden />
                          New
                        </span>
                      )}
                      {BETA_DOC_SLUGS.has(doc.slug) && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-primary-foreground">
                          <FlaskConical className="size-2.5" aria-hidden />
                          Beta
                        </span>
                      )}
                      {UPDATED_DOC_SLUGS.has(doc.slug) && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-border bg-foreground px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-background">
                          <RefreshCw className="size-2.5" aria-hidden />
                          Updated
                        </span>
                      )}
                    </span>
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
