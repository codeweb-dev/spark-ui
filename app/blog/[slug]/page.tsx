import { CodeBlock } from "@/components/docs/code-block";
import { ComponentPreview } from "@/components/docs/component-preview";
import { InstallBlock } from "@/components/docs/install-block";
import {
  getDemoSourceCode,
  getGalleryItems,
} from "@/components/docs/mdx-components";
import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";
import {
  BLOG_POSTS,
  formatReleaseDate,
  formatVersion,
  getBlogPost,
  type BlogComponent,
} from "@/lib/blog";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

function BlogComponents({
  components,
}: {
  components: readonly BlogComponent[];
}) {
  const items = getGalleryItems();

  return (
    <div className="mt-16 space-y-16">
      {components.map(({ name, preview = name }, index) => {
        const item = items.find((entry) => entry.name === name);
        const source = getDemoSourceCode(name)?.replaceAll(
          "@/registry/spark-ui/",
          "@/components/",
        );

        if (!item) return null;

        return (
          <section
            key={name}
            aria-labelledby={`component-${name}`}
            className={index > 0 ? "border-t pt-16" : undefined}
          >
            <p className="text-sm font-medium text-muted-foreground">
              Featured component
            </p>
            <h2
              id={`component-${name}`}
              className="mt-2 text-3xl font-semibold tracking-tight"
            >
              {item.title}
            </h2>
            <p className="mt-3 text-lg leading-8 text-muted-foreground">
              {item.description}
            </p>

            <ComponentPreview
              name={preview}
              usageCode={source ? <CodeBlock code={source} /> : undefined}
            />

            <h3 className="mt-10 text-xl font-semibold">
              Install {item.title}
            </h3>
            <InstallBlock command={name} />
            <Link
              href={item.href}
              className="inline-flex items-center gap-2 text-sm font-medium hover:text-muted-foreground"
            >
              Read the {item.title} docs <ArrowRight className="size-4" />
            </Link>
          </section>
        );
      })}
    </div>
  );
}

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
    ? {
        title: `${post.title} | Spark UI`,
        description: post.description,
        openGraph: {
          title: post.title,
          description: post.description,
          type: "article",
          publishedTime: post.releasedAt,
        },
      }
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
            <time dateTime={post.releasedAt}>
              {formatReleaseDate(post.releasedAt)}
            </time>
            <span aria-hidden>·</span>
            <span>{formatVersion(post.version)}</span>
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
              {formatVersion(post.version)}
            </span>
          </div>

          <div className="mt-12 space-y-7 text-lg leading-8 text-foreground/85">
            {post.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {post.components && <BlogComponents components={post.components} />}
        </article>
      </main>
      <Footer />
    </div>
  );
}
