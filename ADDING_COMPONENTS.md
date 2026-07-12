# Adding Components to Spark UI

A practical, self-contained guide for maintainers. All commands use **npm/npx**.

## 1. Prerequisites

- Node.js 20+ and npm
- Repo cloned and dependencies installed: `npm install`
- Dev server working: `npm run dev`
- Familiarity with React, TypeScript, Tailwind CSS, and the shadcn registry pattern

## 2. Naming conventions

- **Slug:** kebab-case, singular, descriptive: `glow-card`, not `GlowCards`
- **Component export:** PascalCase matching the slug: `GlowCard`
- **Files:** `registry/spark-ui/<slug>.tsx`, `registry/demos/<slug>-demo.tsx`, `content/docs/components/<slug>.mdx`
- Multi-file components get a folder: `registry/spark-ui/<slug>/` with an `index.ts`
- Extra demos are suffixed: `<slug>-variants-demo.tsx`, registered as `<slug>-variants`

## 3. Creating the component source

Create `registry/spark-ui/<slug>.tsx`:

- Strict TypeScript — no `any`
- Style with Tailwind using **semantic tokens** (`bg-primary`, `text-muted-foreground`, `border-border`) so the component themes correctly when installed
- `"use client"` only if the component needs interactivity
- Use `cn()` from `@/lib/utils` for class merging
- Respect `prefers-reduced-motion` for any animation (`motion-safe:` or `useReducedMotion`)

## 4. Creating a demo

Create `registry/demos/<slug>-demo.tsx` with a **default export**. Keep it small — it renders inside `<ComponentPreview />` on the docs page. Center the component and avoid fixed heights that cause layout shift.

## 5. Registering the demo in `registry/components.ts`

Add a dynamic import so the docs can lazy-load the preview:

```ts
"<slug>": dynamic(() => import("@/registry/demos/<slug>-demo")),
```

## 6. Adding the item to `registry.json`

Add an object to `items` (template in section “Templates” below). Every retained item needs a unique `name`, correct `type`, `title`, useful `description`, correct `files`, and its `category`.

## 7. Declaring npm dependencies

List every npm package your component imports (beyond React) in the item's `dependencies` array — e.g. `"framer-motion"`, `"lucide-react"`. The shadcn CLI installs these in the consumer's project. Don't list packages only the demo uses.

## 8. Declaring registry dependencies

If your component uses another Spark UI component, list its slug in `registryDependencies` so the CLI installs it too:

```json
"registryDependencies": ["button"]
```

## 9. Creating an MDX documentation page

Create `content/docs/components/<slug>.mdx` with frontmatter (`title`, `description`, `category`) and use the built-in MDX components: `<ComponentPreview />`, `<InstallBlock />`, `<PropsTable />` / `<Prop />`.

## 10. Adding navigation/category metadata

Navigation, search, and the sidebar are generated from MDX frontmatter. Set `category` to one defined in `lib/categories.ts` (Button, Form, Navigation, Layout, Typography, Media, Backgrounds). To introduce a new category, add it to `CATEGORIES` there with an icon and order.

## 11. Building the registry

```bash
npm run registry:build
```

This runs `shadcn build` and writes one JSON file per item to `public/r/`.

## 12. Verifying `public/r/<slug>.json`

- The file exists and is valid JSON
- `files[].content` contains your full source
- No absolute local paths (search for `/Users/` or `C:\\`)
- `dependencies` and `registryDependencies` match what the code imports

## 13. Testing installation in another project

In a scratch Next.js + Tailwind project:

```bash
npm run dev   # in the spark-ui repo, serves http://localhost:3000
npx shadcn@latest add http://localhost:3000/r/<slug>.json
```

Confirm the files land, dependencies install, and the component renders.

## 14. Accessibility checklist

- [ ] Fully keyboard operable (tab order, Enter/Space/Escape where relevant)
- [ ] Visible `focus-visible` ring in both themes
- [ ] Icon-only buttons have `aria-label`
- [ ] No interactive element nested inside another interactive element
- [ ] Sufficient text/control contrast in both themes
- [ ] No information conveyed by color alone

## 15. Theme checklist

- [ ] Uses semantic tokens, no hardcoded brand colors
- [ ] Looks complete in light **and** dark mode
- [ ] Works inside docs previews and in a consumer app after install

## 16. Responsive checklist

- [ ] Usable at 320px wide and on desktop
- [ ] Demo doesn't overflow the preview card
- [ ] Touch targets are reasonably sized

## 17. Reduced-motion checklist

- [ ] Decorative animation is disabled or reduced under `prefers-reduced-motion`
- [ ] Component remains fully functional with animations off

## 18. Lint and production build

```bash
npm run lint
npm run registry:build
npm run build
```

Or all three: `npm run check`. All must pass before a PR.

## 19. Common errors

| Symptom | Likely cause |
| --- | --- |
| `Module Not Found: <slug>` in preview | Demo not registered in `registry/components.ts`, or key ≠ `name` used in the MDX |
| `shadcn build` fails on an item | `files[].path` doesn't exist or `registry.json` is invalid JSON |
| Component installs but won't compile | Missing entry in `dependencies` / `registryDependencies` |
| Docs page missing from sidebar/search | MDX frontmatter missing `title` or `category` |
| Styles look wrong after install | Hardcoded colors instead of semantic tokens |

## 20. Removal procedure for deprecated components

1. Delete `registry/spark-ui/<slug>*`, `registry/demos/<slug>*`, `content/docs/**/<slug>.mdx`
2. Remove the entry from `registry/components.ts` and the item from `registry.json`
3. Remove demo usages on the homepage (`components/landing/Showcase.tsx`) and any internal links
4. Delete assets used only by that component (`public/…`) and API routes only it used
5. Remove npm dependencies no other component uses (verify with a repo-wide grep first)
6. Run `npm run registry:build` and confirm `public/r/<slug>.json` is gone
7. Grep the repo for the slug and its naming variants; run `npm run check`

---

## Templates

### Component file — `registry/spark-ui/glow-card.tsx`

```tsx
"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: number;
}

export function GlowCard({
  className,
  intensity = 1,
  children,
  ...props
}: GlowCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card text-card-foreground p-6",
        "shadow-sm transition-shadow motion-safe:hover:shadow-md",
        className,
      )}
      style={{ ["--glow" as string]: intensity }}
      {...props}
    >
      {children}
    </div>
  );
}
```

### Demo file — `registry/demos/glow-card-demo.tsx`

```tsx
import { GlowCard } from "@/registry/spark-ui/glow-card";

export default function GlowCardDemo() {
  return (
    <div className="flex items-center justify-center p-6">
      <GlowCard className="max-w-sm">Hello from Spark UI.</GlowCard>
    </div>
  );
}
```

### `registry/components.ts` entry

```ts
"glow-card": dynamic(() => import("@/registry/demos/glow-card-demo")),
```

### `registry.json` item

```json
{
  "name": "glow-card",
  "type": "registry:component",
  "title": "Glow Card",
  "description": "A card with a soft, theme-aware glow on hover.",
  "files": [
    {
      "path": "registry/spark-ui/glow-card.tsx",
      "type": "registry:component"
    }
  ],
  "dependencies": [],
  "registryDependencies": [],
  "category": "layout"
}
```

### MDX documentation page — `content/docs/components/glow-card.mdx`

```mdx
---
title: Glow Card
description: A card with a soft, theme-aware glow on hover.
category: Layout
---

The Glow Card wraps content in a themed surface with a restrained hover glow.

## Preview

<ComponentPreview name="glow-card" />

## Usage

### Installation

<InstallBlock command="glow-card" />

### Basic Example

\```tsx
import { GlowCard } from "@/components/glow-card";

export default function App() {
  return <GlowCard>Content</GlowCard>;
}
\```

## Properties

<PropsTable>
  <Prop
    name="intensity"
    type="number"
    default="1"
    description="Relative strength of the hover glow."
  />
  <Prop
    name="className"
    type="string"
    default="—"
    description="Additional CSS classes."
  />
</PropsTable>
```

> Note: remove the backslashes before the triple backticks in the MDX template — they only escape the fences in this document.
