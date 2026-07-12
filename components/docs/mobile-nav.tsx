"use client";

import { DocMetadata } from "@/lib/docs";
import { getCategoryMeta } from "@/lib/categories";
import { NEW_DOC_SLUGS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface MobileNavProps {
  items: DocMetadata[];
}

const MAIN_LINKS = [
  { title: "Home", href: "/" },
  { title: "Docs", href: "/docs/introduction" },
  { title: "Components", href: "/docs/components/button" },
  { title: "Roadmap", href: "/docs/roadmap" },
  { title: "Showcase", href: "/showcase" },
  { title: "Templates", href: "/templates" },
];

export function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  React.useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration gate
    setMounted(true);
  }, []);

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

  if (!mounted)
    return (
      <div className="md:hidden flex items-center">
        <button className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">
          <Menu size={20} />
        </button>
      </div>
    );

  return (
    <div className="md:hidden flex items-center">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-primary transition-colors flex items-center justify-center relative z-101"
        aria-label={open ? "Close navigation" : "Open navigation"}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-x-0 bottom-0 top-16 z-90 flex flex-col bg-background"
            >
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.05 }}
                className="flex-1 overflow-y-auto px-6 pb-16 pt-4"
              >
                <div className="space-y-10">
                  <div>
                    <p className="text-sm text-muted-foreground">Menu</p>
                    <div className="mt-3 flex flex-col gap-3">
                      {MAIN_LINKS.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={cn(
                            "w-fit text-2xl font-medium tracking-tight transition-colors",
                            pathname === link.href
                              ? "text-foreground"
                              : "text-foreground/70 hover:text-foreground",
                          )}
                        >
                          {link.title}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {sortedEntries.map(([category, docs]) => {
                    const { title } = getCategoryMeta(category);
                    return (
                      <div key={category}>
                        <p className="text-sm text-muted-foreground">
                          {title}
                        </p>
                        <div className="mt-3 flex flex-col gap-3">
                          {docs.map((doc) => (
                            <Link
                              key={doc.slug}
                              href={`/docs/${doc.slug}`}
                              className={cn(
                                "flex w-fit items-center gap-2 text-2xl font-medium tracking-tight transition-colors",
                                pathname === `/docs/${doc.slug}`
                                  ? "text-foreground"
                                  : "text-foreground/70 hover:text-foreground",
                              )}
                            >
                              {doc.title}
                              {NEW_DOC_SLUGS.has(doc.slug) && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-primary-foreground">
                                  <Sparkles className="size-2.5" aria-hidden />
                                  New
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  );
}
