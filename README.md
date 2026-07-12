# Spark UI

**Components that make interfaces feel alive.**

Spark UI is a collection of polished React components, thoughtful interactions, and open-source building blocks for modern products. It is a **shadcn-compatible source registry**: instead of installing a runtime package, you use the shadcn CLI to copy component source code directly into your project, where it is fully yours.

## Key features

- **Open code** — components install as readable TypeScript source, not compiled bundles
- **Theme ready** — all styling flows through semantic CSS variables (light + dark out of the box)
- **Accessible by default** — keyboard navigation, visible focus, sensible ARIA
- **Motion with purpose** — animations give feedback and respect `prefers-reduced-motion`
- **Docs site included** — MDX documentation with live previews, search, and copyable install commands

## Tech stack

- **Framework:** Next.js (App Router) + React + TypeScript (strict)
- **Styling:** Tailwind CSS 4 with OKLCH semantic tokens
- **Animation:** Framer Motion
- **Content:** MDX (`next-mdx-remote`)
- **Syntax highlighting:** Shiki (dual theme)
- **Registry:** shadcn registry (`shadcn build`)

## Local setup

```bash
cd ~/Downloads/spark-ui-master
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

This project uses **npm** exclusively. Please do not introduce other package-manager lockfiles.

## npm commands

| Command                  | Purpose                                  |
| ------------------------ | ---------------------------------------- |
| `npm run dev`            | Start the development server             |
| `npm run lint`           | Run ESLint                               |
| `npm run registry:build` | Generate registry JSON into `public/r/`  |
| `npm run build`          | Production build                         |
| `npm run check`          | Lint + registry build + production build |

## How the registry works

Component source lives in `registry/spark-ui/`, demos in `registry/demos/`, and each installable item is declared in `registry.json`. Running:

```bash
npm run registry:build
```

generates one JSON file per component under `public/r/`. Those static files are what the shadcn CLI consumes.

## Installing a component into your app

```bash
npx shadcn@latest add https://spark-ui.example.com/r/accordion.json
```

> `https://spark-ui.example.com` is a placeholder. The real domain is configured in one place: `lib/constants.ts` (`SITE_CONFIG.url`, overridable via `NEXT_PUBLIC_APP_URL`).

## Adding a new component

See [ADDING_COMPONENTS.md](./ADDING_COMPONENTS.md) for the full maintainer guide — source file, demo, registry entries, MDX docs, checklists, and templates.

## Deployment notes

- Deploy as a standard Next.js app (Vercel or any Node host).
- Set `NEXT_PUBLIC_APP_URL` to the production URL so metadata, sitemap, and install commands use the real domain.
- Run `npm run check` before deploying; `registry:build` must run so `public/r/` is current.

## GitHub authentication setup

Private dashboard access uses Supabase Auth with the GitHub provider and cookie-based SSR sessions.

1. Create a GitHub OAuth App and set its authorization callback URL to `https://PROJECT_REF.supabase.co/auth/v1/callback`.
2. Add the GitHub Client ID and Client Secret to the GitHub provider settings in the Supabase dashboard.
3. Configure the Supabase Site URL and add your application callback URLs, including `http://localhost:3000/auth/callback` for local development.
4. Copy `.env.example` to `.env.local` and fill in `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` from the Supabase project settings.

The GitHub Client Secret and Supabase service-role key must never be committed or exposed to browser code.

## License

Released under the [MIT License](./LICENSE).

## Attribution

The site architecture and registry tooling patterns are adapted from the open-source [Klarden UI](https://github.com/dev-o-los/klarden-ui) project (MIT License). All Spark UI branding, visual design, and copy are original.
