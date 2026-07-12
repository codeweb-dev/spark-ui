"use client";

import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface InstallBlockProps {
  command: string;
}

export function InstallBlock({ command }: InstallBlockProps) {
  const [activeTab, setActiveTab] = useState<"npm" | "pnpm" | "yarn" | "bun">(
    "npm",
  );
  const [copied, setCopied] = useState(false);

  const fullCommand = command.startsWith("shadcn")
    ? command
    : `shadcn@latest add ${SITE_CONFIG.url}/r/${command}.json`;

  const managers = {
    npm: `npx ${fullCommand}`,
    pnpm: `pnpm dlx ${fullCommand}`,
    yarn: `yarn dlx ${fullCommand}`,
    bun: `bun x ${fullCommand}`,
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(managers[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="not-typeset my-6 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-lg">
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 px-4 py-2.5">
        <div className="flex gap-4">
          {(["npm", "pnpm", "yarn", "bun"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setActiveTab(m)}
              className={cn(
                "text-sm transition-colors",
                activeTab === m
                  ? "text-zinc-900 dark:text-zinc-50"
                  : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300",
              )}
            >
              {m}
            </button>
          ))}
        </div>
        <button
          onClick={copyToClipboard}
          className="p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          {copied ? (
            <Check size={14} className="text-emerald-500" />
          ) : (
            <Copy size={14} />
          )}
        </button>
      </div>
      <div className="p-4 font-mono text-sm text-zinc-700 dark:text-zinc-300 overflow-x-auto whitespace-nowrap">
        <span className="text-zinc-400 select-none">$ </span>
        {managers[activeTab]}
      </div>
    </div>
  );
}
