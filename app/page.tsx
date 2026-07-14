import { Hero } from "@/components/landing/Hero";
import { Navbar } from "@/components/landing/Navbar";
import { Showcase } from "@/components/landing/Showcase";
import { SITE_CONFIG } from "@/lib/constants";
import Link from "next/link";

export const metadata = {
  title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
  description: SITE_CONFIG.description,
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      <main className="relative z-10 max-w-350 mx-auto px-5 sm:px-6 md:px-10 lg:px-12">
        <Hero />
      </main>

      <footer className="py-8">
        <div className="max-w-300 mx-auto px-6 md:px-10 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            Built by {SITE_CONFIG.name}. The source code is available on{" "}
            <Link
              href={SITE_CONFIG.github}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 hover:text-foreground transition-colors"
            >
              GitHub
            </Link>
            .
          </p>
          <div className="flex gap-4">
            <Link
              href="/terms-of-service"
              className="hover:text-foreground transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/privacy-policy"
              className="hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
