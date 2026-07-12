import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/landing/Navbar";
import { ArrowRight, Construction } from "lucide-react";
import Link from "next/link";

export function ComingSoonPage({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl flex-col items-center justify-center px-6 py-20 text-center">
        <div className="mb-6 flex size-14 items-center justify-center rounded-2xl border bg-muted shadow-sm">
          <Construction className="size-6" aria-hidden />
        </div>
        <div className="mb-4 rounded-full border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
          {eyebrow} · In development
        </div>
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground text-balance sm:text-lg">
          {description}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/docs/roadmap">
              View roadmap <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/docs/introduction">Browse components</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
