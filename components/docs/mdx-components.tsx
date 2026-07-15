import { NEW_DOC_SLUGS, UPDATED_DOC_SLUGS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import registryIndex from "@/registry.json";
import fs from "fs";
import { Accessibility, Boxes, Code2, Palette, Sparkles } from "lucide-react";
import path from "path";
import React from "react";
import { CodeBlock } from "./code-block";
import { ComponentPreview } from "./component-preview";
import { ComponentsGallery } from "./components-gallery";
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

const buttonDemoSnippets: Record<string, string> = {
  "button-default": `import { Button } from "@/components/button";

export default function Example() {
  return <Button>Button</Button>;
}`,
  "button-outline": `import { Button } from "@/components/button";

export default function Example() {
  return <Button variant="outline">Outline</Button>;
}`,
  "button-secondary": `import { Button } from "@/components/button";

export default function Example() {
  return <Button variant="secondary">Secondary</Button>;
}`,
  "button-ghost": `import { Button } from "@/components/button";

export default function Example() {
  return <Button variant="ghost">Ghost</Button>;
}`,
  "button-destructive": `import { Button } from "@/components/button";

export default function Example() {
  return <Button variant="destructive">Destructive</Button>;
}`,
  "button-link": `import { Button } from "@/components/button";

export default function Example() {
  return <Button variant="link">Link</Button>;
}`,
  "button-spark": `import { Button } from "@/components/button";

export default function Example() {
  return <Button variant="spark">Spark</Button>;
}`,
  "button-size": `import { Button } from "@/components/button";

export default function Example() {
  return <>
    <Button size="sm">Small</Button>
    <Button>Default</Button>
    <Button size="lg">Large</Button>
  </>;
}`,
  "button-icon": `import { CircleArrowUp } from "lucide-react";
import { Button } from "@/components/button";

export default function Example() {
  return <Button size="icon" aria-label="Move up"><CircleArrowUp /></Button>;
}`,
  "button-with-icon": `import { ArrowRight } from "lucide-react";
import { Button } from "@/components/button";

export default function Example() {
  return <Button>Continue <ArrowRight /></Button>;
}`,
  "button-rounded": `import { ArrowRight } from "lucide-react";
import { Button } from "@/components/button";

export default function Example() {
  return <Button className="rounded-full">Get Started <ArrowRight /></Button>;
}`,
  "button-as-link": `import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/button";

export default function Example() {
  return <Button asChild><Link href="/docs/installation">Installation <ExternalLink /></Link></Button>;
}`,
};

const featureIcons = {
  code: Code2,
  palette: Palette,
  accessibility: Accessibility,
  sparkles: Sparkles,
  boxes: Boxes,
};

function FeatureCard({
  icon,
  title,
  children,
}: {
  icon: keyof typeof featureIcons;
  title: string;
  children: React.ReactNode;
}) {
  const Icon = featureIcons[icon];

  return (
    <div className="not-typeset rounded-2xl border border-border bg-muted/50 p-6 transition-colors hover:bg-muted">
      <Icon className="mb-8 size-6 text-foreground" aria-hidden />
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <div className="mt-2 text-sm leading-relaxed text-muted-foreground [&>p]:m-0">
        {children}
      </div>
    </div>
  );
}

function getGalleryItems() {
  return registryIndex.items
    .map((item) => {
      const section = ["components", "backgrounds"].find((section) =>
        fs.existsSync(
          path.join(process.cwd(), "content/docs", section, `${item.name}.mdx`),
        ),
      );

      return section
        ? { ...item, href: `/docs/${section}/${item.name}` }
        : null;
    })
    .filter((item) => item !== null)
    .sort((a, b) => a.title.localeCompare(b.title));
}

function NewComponents() {
  return (
    <ComponentsGallery
      items={getGalleryItems().filter((item) =>
        NEW_DOC_SLUGS.has(item.href.replace("/docs/", "")),
      )}
    />
  );
}

function UpdatedComponents() {
  return (
    <ComponentsGallery
      items={getGalleryItems().filter((item) =>
        UPDATED_DOC_SLUGS.has(item.href.replace("/docs/", "")),
      )}
    />
  );
}

function AllComponents() {
  return <ComponentsGallery items={getGalleryItems()} />;
}

function getDemoSourceCode(name: string): string | null {
  if (buttonDemoSnippets[name]) return buttonDemoSnippets[name];
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

async function UsageCode({ name }: { name: string }) {
  const source = getDemoSourceCode(name)?.replaceAll(
    "@/registry/spark-ui/",
    "@/components/",
  );
  if (!source) return null;

  const imports = source.match(/^import[\s\S]*?;$/gm) || [];
  const example = imports.reduce((code, statement) => code.replace(statement, ""), source).trim();
  const usageImports = imports.filter(
    (statement) =>
      statement !== 'import React from "react";' || example.includes("React."),
  );

  return (
    <div className="not-typeset my-6 space-y-4">
      <CodeBlock code={usageImports.join("\n")} language="tsx" />
      <CodeBlock code={example} language="tsx" />
    </div>
  );
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
  UsageCode,
  PropsTable,
  Prop,
  FeatureCard,
  FeatureGrid: ({ children }: { children: React.ReactNode }) => (
    <div className="not-typeset my-6 grid gap-4 sm:grid-cols-2">
      {children}
    </div>
  ),

  NewComponents,
  UpdatedComponents,
  AllComponents,

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
