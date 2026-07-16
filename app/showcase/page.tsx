import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";
import { ShowcaseGrid } from "@/components/showcase/showcase-grid";
import { SparkUIBadge } from "@/components/showcase/spark-ui-badge";
import { SITE_CONFIG } from "@/lib/constants";
import { SHOWCASE_PROJECTS } from "@/lib/showcase";
import { Medal, Sparkle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Showcase",
  description: "Projects and products built with Spark UI.",
};

export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-6">
        <div className="relative isolate overflow-hidden rounded-3xl border border-border px-8 py-10 sm:px-10">
          <Image
            src="/light-background.png"
            alt=""
            fill
            sizes="(min-width: 1400px) 72rem, 100vw"
            className="pointer-events-none -z-20 object-cover opacity-40 dark:hidden"
          />
          <Image
            src="/background.png"
            alt=""
            fill
            sizes="(min-width: 1400px) 72rem, 100vw"
            className="pointer-events-none -z-20 hidden object-cover opacity-40 dark:block"
          />
          <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-background/40 via-background/70 to-background/90" />
          <div className="relative flex flex-col items-center gap-8 text-center sm:flex-row sm:justify-between sm:text-left">
            <div className="max-w-md">
              <div className="inline-flex items-center rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur gap-1">
                <Medal size={11} /> Badge program
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                Get featured
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Submit your project to the showcase and we&apos;ll send you an
                embed code for this badge to add to your own site.
              </p>
              <Link
                href={SITE_CONFIG.github}
                target="_blank"
                rel="noreferrer"
                className="group mt-5 inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground px-4 py-2 text-sm font-medium text-background shadow-sm transition-opacity hover:opacity-85"
              >
                Share your project (Not yet working everything is placeholder)
                <Sparkle
                  size={15}
                  fill="currentColor"
                  className="transition-transform group-hover:scale-110 group-hover:rotate-12"
                  aria-hidden
                />
              </Link>
            </div>
            <SparkUIBadge />
          </div>
        </div>

        <div className="mt-14 max-w-2xl">
          <p className="text-sm font-medium text-muted-foreground">Spark UI</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
            Showcase
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            See how developers around the world are using Spark UI in their own
            products.
          </p>
        </div>

        <div className="mt-16">
          <ShowcaseGrid items={SHOWCASE_PROJECTS} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
