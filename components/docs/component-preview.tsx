"use client";

import { cn } from "@/lib/utils";
import { registry } from "@/registry/components";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, RotateCcw } from "lucide-react";
import React, { useState } from "react";

interface ComponentPreviewProps {
  name: string;
  usageCode?: React.ReactNode;
}

export function ComponentPreview({ name, usageCode }: ComponentPreviewProps) {
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);
  const [key, setKey] = useState(0);
  const codeRef = React.useRef<HTMLDivElement>(null);

  const Component = registry[name];
  const isFullBleed =
    name.startsWith("animated-gradient") ||
    name.startsWith("ghost-ether") ||
    name.startsWith("image-trail");

  const copyToClipboard = async () => {
    const text = codeRef.current?.textContent;
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefresh = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <div className="not-typeset relative my-8 group/preview">
      {/* Always-mounted hidden copy source; the visible code tab may be unmounted */}
      <div ref={codeRef} className="hidden" aria-hidden>
        {usageCode}
      </div>
      {/* Tabs Header - Smaller & Unified */}
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-3">
          <div className="flex p-0.5 bg-zinc-100 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <button
              onClick={() => setTab("preview")}
              className={cn(
                "flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md transition-all",
                tab === "preview"
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-xs"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300",
              )}
            >
              Preview
            </button>
            <button
              onClick={() => setTab("code")}
              className={cn(
                "flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md transition-all",
                tab === "code"
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-xs"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300",
              )}
            >
              Code
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Action Buttons - Compact */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleRefresh}
              aria-label="Refresh preview"
              className="p-1.5 h-7 w-7 flex items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all active:rotate-180"
              title="Refresh"
            >
              <RotateCcw size={12} />
            </button>

            <button
              onClick={copyToClipboard}
              aria-label="Copy usage code"
              className="p-1.5 h-7 w-7 flex items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all active:scale-95"
            >
              {copied ? (
                <Check size={12} className="text-emerald-500" />
              ) : (
                <Copy size={12} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Content Area - Dynamic Height Animation */}
      <motion.div
        animate={{ height: "auto" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="mt-1 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/50 overflow-hidden shadow-xl shadow-zinc-200/10 dark:shadow-none relative"
      >
        <AnimatePresence mode="wait" initial={false}>
          {tab === "preview" ? (
            <motion.div
              key={`preview-${key}`}
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "w-full flex items-center justify-center min-h-75",
                isFullBleed ? "p-0" : "p-6 sm:p-12"
              )}
            >
              {Component ? (
                <div className={cn(
                  "origin-center transition-transform",
                  isFullBleed ? "w-full h-full" : "scale-90 sm:scale-100"
                )}>
                  <Component />
                </div>
              ) : (
                <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                  Module Not Found: {name}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="code"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2 }}
              className="w-full bg-background"
            >
              <div className="p-0 [&>div]:my-0 [&>div]:rounded-none [&>div]:border-none [&>div]:text-[13px] [&>div]:bg-transparent">
                {usageCode || (
                  <div className="p-8 text-center text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                    No usage snippet provided
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
