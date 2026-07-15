import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";
import { BLOG_POSTS, getBlogPost } from "@/lib/blog";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const post = getBlogPost((await params).slug);
  return post
    ? { title: `${post.title} | Spark UI`, description: post.description }
    : {};
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = getBlogPost((await params).slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto w-full max-w-3xl px-6 py-16 lg:py-24">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden /> Back to Blog
        </Link>

        <article className="mt-12">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <time>{post.date}</time>
            <span aria-hidden>·</span>
            <span>{post.version}</span>
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-xl leading-relaxed text-muted-foreground">
            {post.description}
          </p>

          <div className="relative mt-12 flex aspect-[16/8] overflow-hidden rounded-2xl border bg-muted">
            <Image
              src="/background.png"
              alt=""
              fill
              sizes="48rem"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/30" />
            <span className="relative m-auto text-7xl font-semibold tracking-tighter text-white/60 sm:text-9xl">
              {post.version.replace("Version ", "v")}
            </span>
          </div>

          <div className="mt-12 space-y-7 text-lg leading-8 text-foreground/85">
            {post.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
