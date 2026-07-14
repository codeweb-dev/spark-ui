import Link from "next/link";

interface GalleryItem {
  name: string;
  title: string;
  description: string;
  href: string;
}

export function ComponentsGallery({ items }: { items: GalleryItem[] }) {
  return (
    <div className="not-typeset my-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        return (
          <article
            key={item.name}
            className="group relative rounded-2xl border border-border bg-card p-5 transition-colors hover:bg-muted/50"
          >
            <h2 className="text-base font-semibold text-foreground">
              {item.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
            <Link
              href={item.href}
              aria-label={`View ${item.title}`}
              className="absolute inset-0 rounded-2xl ring-ring transition hover:bg-foreground/3 focus-visible:outline-none focus-visible:ring-2"
            />
          </article>
        );
      })}
    </div>
  );
}
