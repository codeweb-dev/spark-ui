import React from "react";

interface PropProps {
  name: string;
  type: string;
  default?: string;
  description?: string;
}

/**
 * Prop component to be used inside PropsTable.
 * Renders a single row in the properties table.
 */
export function Prop({ name, type, default: defaultValue = "—", description = "—" }: PropProps) {
  return (
    <tr className="group hover:bg-zinc-50/30 dark:hover:bg-zinc-900/10 transition-colors border-b border-zinc-100 dark:border-zinc-800/50 last:border-0">
      <td className="px-4 py-4 whitespace-nowrap">
        <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-[0.4rem] py-[0.15rem] font-mono text-xs font-bold text-zinc-900 dark:text-zinc-200">
          {name}
        </code>
      </td>
      <td className="px-4 py-4 font-mono text-[11px] text-blue-600 dark:text-blue-400/90">
        <code className="bg-transparent p-0">{type}</code>
      </td>
      <td className="px-4 py-4 font-mono text-[11px] text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
        <code className="bg-transparent p-0">{defaultValue}</code>
      </td>
      <td className="px-4 py-4 text-zinc-600 dark:text-zinc-400 min-w-[200px] leading-relaxed text-[13px]">
        {description}
      </td>
    </tr>
  );
}
