"use client";

import { DocMetadata } from "@/lib/docs";
import { getCategoryMeta } from "@/lib/categories";
import {
  BETA_DOC_SLUGS,
  NEW_DOC_SLUGS,
  SITE_CONFIG,
  UPDATED_DOC_SLUGS,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { FlaskConical, Menu, RefreshCw, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { GitHubStarButton } from "../github-star-button";
import { LogoIcon } from "../landing/logo-icon";

interface MobileNavProps {
  items: DocMetadata[];
}

const MAIN_LINKS = [
  { title: "Home", href: "/" },
  { title: "Docs", href: "/docs/introduction" },
  { title: "Components", href: "/docs/components" },
  { title: "Blog", href: "/blog" },
  { title: "Showcase", href: "/showcase" },
  { title: "Templates", href: "/templates" },
  { title: "Keyboard Warrior", href: "/keyboard-warrior" },
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
        aria-label="Open navigation"
      >
        <Menu size={20} />
      </button>

      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-x-0 bottom-0 top-0 z-60 flex flex-col bg-background"
            >
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.05 }}
                className="flex-1 overflow-y-auto px-6 pb-16 pt-3"
              >
                <div className="space-y-10">
                  <div>
                    <div className="mb-6 flex flex-col gap-6 items-start">
                      <button
                        onClick={() => setOpen(!open)}
                        className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-primary transition-colors flex items-center justify-center relative z-101"
                        aria-label="Close navigation"
                      >
                        <X size={20} />
                      </button>

                      <Link href="/" className="flex items-center group">
                        <LogoIcon className="size-8 mr-2 text-foreground group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
                        <span className="text-xl md:text-xl font-bold text-foreground tracking-tighter leading-none -ml-2">
                          {SITE_CONFIG.name.split(" ")[0]}
                          <span className="text-muted-foreground font-medium ml-1">
                            {SITE_CONFIG.name.split(" ")[1]}
                          </span>
                        </span>
                      </Link>
                    </div>

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
                        <p className="text-sm text-muted-foreground">{title}</p>
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
                              {BETA_DOC_SLUGS.has(doc.slug) && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-primary-foreground">
                                  <FlaskConical
                                    className="size-2.5"
                                    aria-hidden
                                  />
                                  Beta
                                </span>
                              )}
                              {UPDATED_DOC_SLUGS.has(doc.slug) && (
                                <span className="inline-flex items-center gap-1 rounded-full border border-border bg-foreground px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-background">
                                  <RefreshCw className="size-2.5" aria-hidden />
                                  Updated
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
