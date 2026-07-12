import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";
import { TactileHighlight } from "@/registry/spark-ui/tactile-highlight";
import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center gap-7 py-20 text-center md:min-h-[76vh] md:py-30">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:56px_56px] opacity-25 [mask-image:radial-gradient(ellipse_55%_55%_at_50%_42%,black,transparent)]" />
      <Link
        href="/docs/introduction"
        className="group inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/70 px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur hover:border-foreground/20 hover:text-foreground transition-colors"
      >
        Introducing {SITE_CONFIG.name}
        <ArrowRight
          size={12}
          className="transition-transform group-hover:translate-x-0.5"
          aria-hidden
        />
      </Link>

      <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.055em] text-foreground text-balance sm:text-6xl md:text-7xl lg:text-8xl">
        <span className="mr-3">Components that make your interface </span>
        <TactileHighlight direction="left">feel alive.</TactileHighlight>
      </h1>

      <p className="max-w-2xl text-base leading-relaxed text-muted-foreground text-balance md:text-lg">
        Beautiful, accessible React components designed to be copied,
        customized, and made entirely yours.
      </p>

      <div className="mt-1 flex flex-col items-center gap-3 sm:flex-row">
        <Button
          asChild
          size="lg"
          className="h-11 rounded-full px-6 shadow-lg shadow-foreground/10"
        >
          <Link href="/docs/components/accordion">
            Browse components <ArrowRight size={16} />
          </Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="h-11 rounded-full bg-background/60 px-6 backdrop-blur"
        >
          <Link href={SITE_CONFIG.github} target="_blank" rel="noreferrer">
            <Github size={16} /> View on GitHub
          </Link>
        </Button>
      </div>

      <div className="mt-6 flex items-center gap-6 text-xs text-muted-foreground sm:gap-10">
        <span>
          <strong className="text-foreground">30+</strong> components
        </span>
        <span className="h-4 w-px bg-border" />
        <span>
          <strong className="text-foreground">TypeScript</strong> ready
        </span>
      </div>
    </section>
  );
}
