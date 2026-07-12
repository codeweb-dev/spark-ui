import { cn } from "@/lib/utils";
import { registry } from "@/registry/components";
import fs from "fs";
import path from "path";
import React from "react";
import { CodeBlock } from "./code-block";
import { ComponentPreview } from "./component-preview";
import { InstallBlock } from "./install-block";
import { Prop } from "./Prop";
import { PropsTable } from "./PropsTable";

type ComponentProps = React.HTMLAttributes<HTMLElement>;

interface PreProps extends React.HTMLAttributes<HTMLPreElement> {
  children?: React.ReactElement<{
    children: string;
    className?: string;
  }>;
}

interface ComponentPreviewWrapperProps {
  name: string;
  children?: React.ReactNode;
}

function getDemoSourceCode(name: string): string | null {
  try {
    const demoPath = path.join(process.cwd(), "registry", "demos", `${name}-demo.tsx`);
    return fs.readFileSync(demoPath, "utf-8");
  } catch {
    return null;
  }
}

async function DemoCodeBlock({ sourceCode }: { sourceCode: string }) {
  return <CodeBlock code={sourceCode} language="tsx" />;
}

export const mdxComponents = {
  // Define documentation components with explicit prop passing
  ComponentPreview: async ({ name, children }: ComponentPreviewWrapperProps) => {
    const sourceCode = getDemoSourceCode(name);
    const demoCode = sourceCode ? <DemoCodeBlock sourceCode={sourceCode} /> : null;
    return <ComponentPreview name={name} usageCode={children || demoCode} />;
  },
  InstallBlock: (props: { command: string }) => <InstallBlock {...props} />,
  PropsTable,
  Prop,

  // Spread registry components (dynamic imports from @/registry/components)
  ...registry,

  h1: ({ className, ...props }: ComponentProps) => (
    <h1
      className={cn(
        "mt-2 scroll-m-20 text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50",
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: ComponentProps) => (
    <h2
      className={cn(
        "mt-12 scroll-m-20 border-b border-zinc-200 dark:border-zinc-800 pb-2 text-2xl font-semibold tracking-wide text-zinc-900 dark:text-zinc-50 first:mt-0",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: ComponentProps) => (
    <h3
      className={cn(
        "mt-8 scroll-m-20 text-xl font-semibold tracking-wide text-zinc-900 dark:text-zinc-50",
        className,
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: ComponentProps) => (
    <p
      className={cn(
        "leading-7 not-first:mt-6 text-zinc-600 dark:text-zinc-400",
        className,
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className={cn(
        "my-6 ml-6 list-disc [&>li]:mt-2 text-zinc-600 dark:text-zinc-400",
        className,
      )}
      {...props}
    />
  ),
  // Premium Table Styling (Generic Markdown tables)
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
      <table
        className={cn("w-full border-collapse text-sm", className)}
        {...props}
      />
    </div>
  ),
  thead: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead
      className={cn(
        "bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800",
        className,
      )}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        "px-4 py-3 text-left font-black uppercase tracking-widest text-[10px] text-zinc-500 dark:text-zinc-400",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        "px-4 py-3 text-zinc-600 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-800/50",
        className,
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }: ComponentProps) => (
    <code
      className={cn(
        "relative rounded bg-zinc-100 dark:bg-zinc-800 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-300",
        className,
      )}
      {...props}
    />
  ),
  // Standard Markdown code blocks
  pre: ({ children, ...props }: PreProps) => {
    const code = children?.props?.children || "";
    const language =
      children?.props?.className?.replace("language-", "") || "tsx";
    return <CodeBlock code={code} language={language} {...props} />;
  },
  Step: ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
      className={cn(
        "mb-8 ml-4 border-l-2 border-zinc-200 dark:border-zinc-800 pl-8 relative",
        className,
      )}
    >
      <div className="absolute -left-2.25 top-0 w-4 h-4 rounded-full bg-zinc-900 dark:bg-zinc-50 shadow-lg" />
      {props.children}
    </div>
  ),
  Steps: ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("mt-8 mb-12", className)} {...props} />
  ),
};
