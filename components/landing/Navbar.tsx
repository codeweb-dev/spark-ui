import { MobileNav } from "@/components/docs/mobile-nav";
import { SearchWrapper } from "@/components/landing/search-wrapper";
import { GitHubStarButton } from "@/components/github-star-button";
import { ModeToggle } from "@/components/mode-toggle";
import { UserMenu } from "@/components/auth/user-menu";
import { SITE_CONFIG } from "@/lib/constants";
import { getAllDocs } from "@/lib/docs";
import Link from "next/link";
import { Suspense } from "react";
import { LogoIcon } from "./logo-icon";

export function Navbar({ overlay = false }: { overlay?: boolean }) {
  const docs = getAllDocs();

  return (
    <nav
      className={`${overlay ? "absolute bg-transparent" : "sticky bg-background/80 backdrop-blur-xl"} top-0 z-40 w-full transition-colors`}
    >
      <div className="max-w-350 mx-auto flex h-16 items-center justify-between px-6 md:px-10 lg:px-12">
        <div className="flex items-center gap-4 md:gap-8">
          <MobileNav items={docs} />
          <Link href="/" className="hidden md:flex items-center group -ml-2">
            <LogoIcon className="size-8 mr-2 text-foreground group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
            <span className="text-xl md:text-xl font-bold text-foreground tracking-tighter leading-none -ml-2">
              {SITE_CONFIG.name.split(" ")[0]}
              <span className="text-muted-foreground font-medium ml-1">
                {SITE_CONFIG.name.split(" ")[1]}
              </span>
            </span>
          </Link>
          <div className="hidden md:flex gap-6 text-sm text-muted-foreground">
            <Link
              href="/docs/introduction"
              className="hover:text-primary transition-colors"
            >
              Docs
            </Link>
            <Link
              href="/docs/components"
              className="hover:text-primary transition-colors"
            >
              Components
            </Link>
            <Link href="/blog" className="hover:text-primary transition-colors">
              Blog
            </Link>
            <Link
              href="/showcase"
              className="hover:text-primary transition-colors"
            >
              Showcase
            </Link>
            <Link
              href="/templates"
              className="hover:text-primary transition-colors"
            >
              Templates
            </Link>
            <Link
              href="/keyboard-warrior"
              className="hover:text-primary transition-colors"
            >
              Keyboard Warrior
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <SearchWrapper items={docs} />
          <GitHubStarButton />
          <ModeToggle />
          <Suspense fallback={null}>
            <UserMenu />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
