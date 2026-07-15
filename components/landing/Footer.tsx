import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn("py-8", className)}>
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
  );
}
