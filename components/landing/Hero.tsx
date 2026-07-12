import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";
import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { LogoIcon } from "./logo-icon";

export function Hero() {
  return (
    <section className="relative flex flex-col items-center text-center space-y-8 pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
      {/* Decorative warm glow + spark grid; pure CSS, no motion for reduced-motion users */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-24 h-105 opacity-60 dark:opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, var(--primary), transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(var(--border) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 20%, black, transparent)",
        }}
      />

      <div className="relative inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        <LogoIcon className="size-3 text-primary" />
        Open-source shadcn registry
      </div>

      <div className="relative space-y-6 max-w-4xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-foreground">
          {SITE_CONFIG.name}
          <br />
          <span className="bg-linear-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
            Components that make
            <br className="hidden sm:block" /> interfaces feel alive.
          </span>
        </h1>

        <p className="mx-auto max-w-2xl text-muted-foreground text-base md:text-lg leading-relaxed px-4">
          Polished React components with thoughtful motion, accessible
          behavior, and source code you fully own.
        </p>
      </div>

      <div className="relative flex flex-wrap items-center justify-center gap-4 pt-4">
        <Button asChild variant="spark" size="lg" className="rounded-full px-8">
          <Link href="/docs/components/accordion">
            Browse components <ArrowRight size={16} />
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="rounded-full px-8">
          <Link href="/docs/introduction">
            <BookOpen size={16} /> Read the docs
          </Link>
        </Button>
      </div>
    </section>
  );
}
