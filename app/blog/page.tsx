import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";
import { BLOG_POSTS } from "@/lib/blog";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Blog | Spark UI",
  description: "Product updates and release notes from Spark UI.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <header className="mx-auto max-w-2xl lg:ml-72">
          <p className="text-sm font-medium text-muted-foreground">Spark UI</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
            Blog
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Product updates, release notes, and the thinking behind Spark UI.
          </p>
        </header>

        <div className="mt-16 divide-y divide-border">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="grid gap-6 py-12 first:pt-0 lg:grid-cols-[16rem_40rem_1fr]"
            >
              <time className="text-sm leading-8 text-muted-foreground">
                {post.date}
              </time>
              <div className="space-y-6">
                <div>
                  <Link href={`/blog/${post.slug}`} className="group inline-block">
                    <h2 className="text-2xl font-semibold tracking-tight transition-colors group-hover:text-muted-foreground">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {post.version}
                  </p>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="group relative flex aspect-[16/8] overflow-hidden rounded-2xl border bg-muted"
                >
                  <Image
                    src="/background.png"
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 40rem, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="relative flex w-full items-end justify-between p-7 sm:p-10">
                    <span className="max-w-sm text-2xl font-semibold tracking-tight text-white sm:text-4xl">
                      {post.title}
                    </span>
                    <span className="text-5xl font-semibold tracking-tighter text-white/50 sm:text-7xl">
                      {post.version.replace("Version ", "v")}
                    </span>
                  </div>
                </Link>

                <p className="text-base leading-relaxed text-muted-foreground">
                  {post.description}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-medium hover:text-muted-foreground"
                >
                  Read update <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
