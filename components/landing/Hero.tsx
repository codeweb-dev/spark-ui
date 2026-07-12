import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="flex flex-col items-center text-center gap-6 pt-16 pb-12 md:pt-24 md:pb-16">
      <Link
        href="/docs/introduction"
        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground hover:bg-accent transition-colors"
      >
        Introducing {SITE_CONFIG.name}
        <ArrowRight size={12} aria-hidden />
      </Link>

      <h1 className="max-w-4xl text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tighter text-foreground text-balance">
        Components that make interfaces feel alive
      </h1>

      <p className="max-w-2xl text-muted-foreground text-base md:text-lg leading-relaxed text-balance">
        A set of polished React components you can customize, extend, and build
        on. Start here then make it your own. Open Source. Open Code.
      </p>

      <Button asChild className="mt-2">
        <Link href="/docs/components/accordion">
          Browse Components <ArrowRight size={16} />
        </Link>
      </Button>
    </section>
  );
}
