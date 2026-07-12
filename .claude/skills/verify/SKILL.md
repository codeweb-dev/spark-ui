---
name: verify
description: Build, run, and drive the Spark UI docs site to verify changes end-to-end.
---

# Verifying Spark UI

## Build & launch

```bash
npm run check          # lint + registry:build + production build (all must pass)
PORT=3100 npm run start   # serve the production build
```

Dev alternative: `npm run dev` (port 3000).

## Flows worth driving

- `/` — hero, showcase cards (retained components render), principles, install section, footer
- `/docs/introduction` and `/docs/components/accordion` — sidebar, breadcrumbs, live `<ComponentPreview>`, npm-first `<InstallBlock>`
- Search: click the navbar search button (⌘K listener lives in the client SearchDialog; button click is more reliable under automation)
- Theme toggle button in navbar (`.dark` class on `<html>`)
- Mobile nav: viewport ≤ 768px, `[aria-label="Open navigation"]`
- Registry endpoints: `curl localhost:3100/r/accordion.json` → 200; excluded slugs (e.g. `/r/slider.json`) → 404
- CLI install from a scratch project with a minimal `components.json`:
  `npx shadcn@latest add http://localhost:3100/r/accordion.json --yes`

## Gotchas

- `npm run registry:build` regenerates `public/r/`; run it after touching `registry.json` or component sources.
- ESLint has 5 accepted warnings (logo-carousel `<img>`, number-ticker deps, ghost-ether unused `_args`); errors must stay at 0.
- The public URL comes from `SITE_CONFIG.url` in `lib/constants.ts` (`NEXT_PUBLIC_APP_URL` override).
