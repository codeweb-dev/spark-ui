import { Hero } from "@/components/landing/Hero";
import { LogoIcon } from "@/components/landing/logo-icon";
import { Navbar } from "@/components/landing/Navbar";
import { Showcase } from "@/components/landing/Showcase";
import { SITE_CONFIG } from "@/lib/constants";
import {
  Accessibility,
  Blocks,
  Code2,
  Palette,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const PRINCIPLES = [
  {
    icon: Code2,
    title: "Open code",
    body: "Components install as source into your project. No black boxes, no lock-in — edit anything.",
  },
  {
    icon: Palette,
    title: "Theme ready",
    body: "Everything is built on semantic design tokens, so light, dark, and your brand all come free.",
  },
  {
    icon: Accessibility,
    title: "Accessible by default",
    body: "Keyboard navigation, focus rings, and sensible ARIA are part of the component, not an afterthought.",
  },
  {
    icon: Sparkles,
    title: "Motion with purpose",
    body: "Animation supports feedback and hierarchy, and steps aside when users prefer reduced motion.",
  },
  {
    icon: Blocks,
    title: "Built for composition",
    body: "Small, focused primitives that combine cleanly instead of monolithic widgets.",
  },
];

export const metadata = {
  title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
  description: SITE_CONFIG.description,
};

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground transition-colors duration-500">
      <Navbar />

      <main className="max-w-350 mx-auto px-6 md:px-10 lg:px-12">
        <Hero />
        <Showcase />

        {/* Design principles */}
        <section aria-label="Design principles" className="pt-28">
          <div className="text-center space-y-3 pb-12">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              What Spark UI cares about
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {PRINCIPLES.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl border border-border bg-card/50 p-6 space-y-3"
              >
                <div className="size-9 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
                  <Icon size={18} aria-hidden />
                </div>
                <h3 className="text-sm font-semibold">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Installation */}
        <section aria-label="Installation" className="pt-28 pb-8">
          <div className="rounded-3xl border border-border bg-card/50 p-8 md:p-12 text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Install a component in seconds
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
              Spark UI is a shadcn-compatible registry. Point the CLI at any
              component and its source lands in your codebase.
            </p>
            <pre className="mx-auto max-w-2xl overflow-x-auto rounded-xl border border-border bg-background p-4 text-left font-mono text-sm text-foreground">
              <code>{`npx shadcn@latest add ${SITE_CONFIG.url}/r/accordion.json`}</code>
            </pre>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-24 border-t border-border/40 pt-16 pb-12 bg-background w-full">
        <div className="max-w-350 mx-auto px-6 md:px-10 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
            <div className="col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <LogoIcon className="size-6 text-primary" label="Spark UI logo" />
                <span className="text-xl font-bold text-foreground tracking-tight leading-none">
                  {SITE_CONFIG.name}
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                {SITE_CONFIG.tagline}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground">Product</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link href="/docs/introduction" className="hover:text-foreground transition-colors">
                    Docs
                  </Link>
                </li>
                <li>
                  <Link href="/docs/components/accordion" className="hover:text-foreground transition-colors">
                    Components
                  </Link>
                </li>
                <li>
                  <Link href={SITE_CONFIG.github} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
                    GitHub
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground">Legal</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link href={`${SITE_CONFIG.github}/blob/main/LICENSE`} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
                    MIT License
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border/40 text-xs text-muted-foreground space-y-1">
            <p>
              © {new Date().getFullYear()} {SITE_CONFIG.name}. Released under
              the MIT License.
            </p>
            <p>
              Site architecture adapted from the open-source Klarden UI project
              (MIT License).
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
