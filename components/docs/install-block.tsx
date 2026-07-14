"use client";

import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface InstallBlockProps {
  command: string;
}

export function InstallBlock({ command }: InstallBlockProps) {
  const [mode, setMode] = useState<"command" | "manual">("command");
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
    <div className="not-typeset my-6">
      <div className="mb-4 flex gap-6 border-b border-border">
        {(["command", "manual"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setMode(tab)}
            className={cn(
              "border-b-2 px-0.5 pb-2 text-sm capitalize transition-colors",
              mode === tab
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {mode === "command" ? (
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50/50 px-4 py-2.5 dark:border-zinc-800 dark:bg-zinc-900/50">
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
              aria-label="Copy install command"
              className="p-1.5 text-zinc-400 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              {copied ? (
                <Check size={14} className="text-emerald-500" />
              ) : (
                <Copy size={14} />
              )}
            </button>
          </div>
          <div className="overflow-x-auto whitespace-nowrap p-4 font-mono text-sm text-zinc-700 dark:text-zinc-300">
            <span className="select-none text-zinc-400">$ </span>
            {managers[activeTab]}
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-muted/30 p-5 text-sm leading-relaxed text-muted-foreground">
          Open <code>{`${SITE_CONFIG.url}/r/${command}.json`}</code>, copy its
          files into your configured components directory, then install the
          dependencies listed in the registry item.
        </div>
      )}
    </div>
  );
}
