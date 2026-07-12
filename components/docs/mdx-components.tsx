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
    const demoPath = path.join(
      process.cwd(),
      "registry",
      "demos",
      `${name}-demo.tsx`,
    );
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
  ComponentPreview: async ({
    name,
    children,
  }: ComponentPreviewWrapperProps) => {
    const sourceCode = getDemoSourceCode(name);
    const demoCode = sourceCode ? (
      <DemoCodeBlock sourceCode={sourceCode} />
    ) : null;
    return <ComponentPreview name={name} usageCode={children || demoCode} />;
  },
  InstallBlock: (props: { command: string }) => <InstallBlock {...props} />,
  PropsTable,
  Prop,

  // Spread registry components (dynamic imports from @/registry/components)
  ...registry,

  // Typography (headings, paragraphs, lists, tables, inline code) is styled
  // by the typeset container on the docs article — no overrides needed here.
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
