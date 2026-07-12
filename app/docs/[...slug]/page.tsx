import { mdxComponents } from "@/components/docs/mdx-components";
import { getAdjacentDocs, getDocBySlug, getDocSlugs } from "@/lib/docs";
import { SITE_CONFIG } from "@/lib/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OpenInChatGPTButton } from "@/components/docs/open-in-chatgpt-button";

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDocBySlug(slug);

  if (!doc) {
    return {};
  }

  const url = `${SITE_CONFIG.url}/docs/${doc.slug}`;

  return {
    title: doc.title,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: "article",
      url,
      images: [
        {
          url: SITE_CONFIG.defaultOgImage,
          width: 1200,
          height: 630,
          alt: doc.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description: doc.description,
      images: [SITE_CONFIG.defaultOgImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

export async function generateStaticParams() {
  const slugs = getDocSlugs();
  return slugs.map((slug) => ({
    slug: slug.split("/"),
  }));
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params;
  const doc = getDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  const { prev, next } = getAdjacentDocs(doc.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: doc.title,
    description: doc.description,
    author: {
      "@type": "Person",
      name: SITE_CONFIG.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/favicon.ico`,
      },
    },
  };

  return (
    <div className="space-y-6 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumbs - Smaller & More Subtle */}
      <nav className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
        <Link
          href="/docs/introduction"
          className="hover:text-primary transition-colors"
        >
          Docs
        </Link>
        <ChevronRight size={10} className="opacity-40" />
        <span className="opacity-70">{doc.category}</span>
        <ChevronRight size={10} className="opacity-40" />
        <span className="text-zinc-900 dark:text-zinc-50">{doc.title}</span>
      </nav>

      {/* Page Header - Tighter layout */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <h1 className="text-3xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50">
            {doc.title}
          </h1>
          {doc.description && (
            <p className="text-base text-zinc-500 dark:text-zinc-400 font-medium tracking-tight max-w-xl leading-relaxed">
              {doc.description}
            </p>
          )}
        </div>

        {/* Page Actions - Compact & Single Line */}
        <div className="flex items-center gap-2 shrink-0">
          <OpenInChatGPTButton
            title={doc.title}
            description={doc.description}
            url={`${SITE_CONFIG.url}/docs/${doc.slug}`}
          />

          <div className="flex items-center gap-1">
            {prev ? (
              <Link
                href={`/docs/${prev.slug}`}
                className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-primary transition-all active:scale-90 shadow-xs"
                title={`Prev: ${prev.title}`}
              >
                <ChevronLeft size={14} />
              </Link>
            ) : (
              <div className="p-2 rounded-lg opacity-20 border border-zinc-200 dark:border-zinc-800 cursor-not-allowed">
                <ChevronLeft size={14} />
              </div>
            )}

            {next ? (
              <Link
                href={`/docs/${next.slug}`}
                className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-primary transition-all active:scale-90 shadow-xs"
                title={`Next: ${next.title}`}
              >
                <ChevronRight size={14} />
              </Link>
            ) : (
              <div className="p-2 rounded-lg opacity-20 border border-zinc-200 dark:border-zinc-800 cursor-not-allowed">
                <ChevronRight size={14} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-linear-to-r from-zinc-200 dark:from-zinc-800 to-transparent" />

      <article className="typeset typeset-docs max-w-none">
        <MDXRemote source={doc.content} components={mdxComponents} />
      </article>
    </div>
  );
}
