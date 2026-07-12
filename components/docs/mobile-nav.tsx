"use client";

import { LogoIcon } from "@/components/landing/logo-icon";
import { DocMetadata } from "@/lib/docs";
import { getCategoryMeta } from "@/lib/categories";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface MobileNavProps {
  items: DocMetadata[];
}

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
        onClick={() => setOpen(true)}
        className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-primary transition-colors flex items-center justify-center relative z-101"
        aria-label="Open navigation"
      >
        <Menu size={20} />
      </button>

      {createPortal(
        <AnimatePresence>
          {open && (
            <div className="fixed inset-0 z-99999 isolation-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
                className="absolute inset-0 bg-zinc-950/60 backdrop-blur-md"
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 200,
                  mass: 1,
                }}
                className="absolute inset-y-0 left-0 w-75 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden flex flex-col"
              >
                <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl">
                  <div className="flex items-center -ml-2">
                    <LogoIcon className="size-8 mr-2 text-zinc-900 dark:text-zinc-50" />
                    <span className="text-xl font-bold tracking-tighter leading-none text-zinc-900 dark:text-zinc-50 -ml-2">
                      Spark{" "}
                      <span className="text-zinc-500 font-medium ml-1">UI</span>
                    </span>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500 transition-colors"
                    aria-label="Close navigation"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 bg-zinc-50/50 dark:bg-zinc-950/50">
                  <div className="space-y-8 pb-10">
                    {sortedEntries.map(([category, docs]) => {
                      const { title } = getCategoryMeta(category);
                      return (
                        <div key={category}>
                          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-4 px-2">
                            {title}
                          </h4>
                          <div className="flex flex-col gap-1">
                            {docs.map((doc) => (
                              <Link
                                key={doc.slug}
                                href={`/docs/${doc.slug}`}
                                className={cn(
                                  "group flex w-full items-center rounded-lg px-3 py-2.5 transition-all text-sm",
                                  pathname === `/docs/${doc.slug}`
                                    ? "bg-primary text-primary-foreground font-bold shadow-md shadow-primary/20"
                                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800",
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
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  );
}
