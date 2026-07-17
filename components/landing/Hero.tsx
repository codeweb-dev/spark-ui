import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";
import { formatVersion, LATEST_RELEASE } from "@/lib/blog";
import { TactileHighlight } from "@/registry/spark-ui/tactile-highlight";
import { ArrowRight, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SitePet } from "../site-pet";
import { TypeTest } from "./type-test";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center gap-7 overflow-hidden px-5 py-24 text-center md:px-10 md:py-30">
      <Image
        src="/light-background.png"
        alt=""
        fill
        priority
        sizes="(min-width: 1400px) 87.5rem, 100vw"
        className="pointer-events-none -z-20 object-cover dark:hidden opacity-35"
      />
      <Image
        src="/background.png"
        alt=""
        fill
        priority
        sizes="(min-width: 1400px) 87.5rem, 100vw"
        className="pointer-events-none -z-20 hidden object-cover opacity-35 dark:block"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-background/35 via-transparent to-background/75 dark:from-background/35 dark:via-background/75 dark:to-background" />

      <div className="flex flex-wrap items-center justify-center gap-2">
        <Link
          href="/docs/components/interactive-pets"
          className="group inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/70 px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur transition-colors hover:text-foreground"
        >
          Introducing Interactive Pets
          <ArrowRight
            size={12}
            className="transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
        <Link
          href={`/blog/${LATEST_RELEASE.slug}`}
          className="group inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground px-3.5 py-1.5 text-xs font-medium text-background shadow-sm transition-opacity hover:opacity-85"
        >
          {formatVersion(LATEST_RELEASE.version)} · Read the release notes
          <ArrowRight
            size={12}
            className="transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
      </div>
      <p className="-mt-5 text-xs text-muted-foreground">
        Drag the pet anywhere and click the bone to feed it.
      </p>

      <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.055em] text-foreground text-balance sm:text-6xl md:text-7xl lg:text-8xl">
        <span className="mr-3">Components that make your interface </span>
        <TactileHighlight direction="left">feel alive.</TactileHighlight>
      </h1>

      <p className="max-w-2xl text-base leading-relaxed text-muted-foreground text-balance md:text-lg">
        Signature React components with expressive motion, distinctive visuals,
        and source code made entirely yours.
      </p>

      <div className="mt-1 flex flex-col items-center gap-3 sm:flex-row">
        <Button
          asChild
          size="lg"
          className="h-11 rounded-full px-6 shadow-lg shadow-foreground/10"
        >
          <Link href="/docs/components">
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
        <TypeTest />
      </div>

      <div className="mt-6 flex items-center gap-6 text-xs text-muted-foreground sm:gap-10">
        <span>
          <strong className="text-foreground">16</strong> components
        </span>
        <span className="h-4 w-px bg-border" />
        <span>
          <strong className="text-foreground">TypeScript</strong> ready
        </span>
      </div>

      <SitePet />
    </section>
  );
}
