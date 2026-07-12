import React from "react";

interface PropsTableProps {
  children?: React.ReactNode;
}

/**
 * PropsTable component for displaying component properties.
 * Accepts multiple <Prop /> components as children.
 */
export function PropsTable({ children }: PropsTableProps) {
  if (!children) {
    return (
      <div className="my-6 rounded-xl border-2 border-dashed border-zinc-200 p-8 text-center dark:border-zinc-800">
        <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
          No property data found
        </p>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
          Pass <code className="text-zinc-800 dark:text-zinc-200">&lt;Prop /&gt;</code> components as children.
        </p>
      </div>
    );
  }

  return (
    <div className="my-8 w-full overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-[13px] leading-relaxed">
          <thead className="bg-zinc-50/50 dark:bg-zinc-900/50">
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <th className="px-4 py-3.5 font-black uppercase tracking-widest text-[10px] text-zinc-500 dark:text-zinc-400">
                Prop
              </th>
              <th className="px-4 py-3.5 font-black uppercase tracking-widest text-[10px] text-zinc-500 dark:text-zinc-400">
                Type
              </th>
              <th className="px-4 py-3.5 font-black uppercase tracking-widest text-[10px] text-zinc-500 dark:text-zinc-400">
                Default
              </th>
              <th className="px-4 py-3.5 font-black uppercase tracking-widest text-[10px] text-zinc-500 dark:text-zinc-400 w-[40%]">
                Description
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );
}
