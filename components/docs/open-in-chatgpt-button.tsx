"use client";

import React from "react";
import BrandOpenaiIcon from "@/components/ui/brand-openai-icon";

interface OpenInChatGPTButtonProps {
  title: string;
  description?: string;
  url: string;
}

export function OpenInChatGPTButton({
  title,
  description,
  url,
}: OpenInChatGPTButtonProps) {
  const handleOpen = () => {
    const prompt = `I am reading the documentation for the component "${title}" on ${url}.

    ${description ? `Description: ${description}` : ""}

    Could you please explain this component in detail, what it is all about, and provide a comprehensive guide on how to integrate and use it in my Next.js React project? Please include styling tips, prop usage examples, and best practices.`;

    const chatgptUrl = `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;
    window.open(chatgptUrl, "_blank");
  };

  return (
    <button
      onClick={handleOpen}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[10px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 hover:text-primary transition-all whitespace-nowrap active:scale-95 shadow-xs cursor-pointer"
    >
      <BrandOpenaiIcon
        size={14}
        color="currentColor"
        className="h-3.5 w-3.5 shrink-0"
      />
      <span>Open in ChatGPT</span>
    </button>
  );
}
