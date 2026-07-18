"use client";

import { RemoveFavoriteButton } from "@/components/favorites/remove-favorite-button";
import { Masonry, type MasonryItem } from "@/registry/spark-ui/masonry";
import { Sparkles } from "lucide-react";

const HEIGHTS = [400, 320, 427, 320, 427, 480];

export interface FavoriteEntry {
  id: string;
  slug: string;
  title: string;
  description?: string;
  category?: string;
  savedAt: string;
}

type FavoriteItem = MasonryItem & { entry: FavoriteEntry };

export function FavoritesMasonry({ items }: { items: FavoriteEntry[] }) {
  const masonryItems: FavoriteItem[] = items.map((item, index) => ({
    id: item.id,
    img: "",
    url: `/docs/${item.slug}`,
    height: HEIGHTS[index % HEIGHTS.length],
    entry: item,
  }));

  return (
    <Masonry
      items={masonryItems}
      ease="power3.out"
      duration={0.6}
      stagger={0.05}
      animateFrom="bottom"
      scaleOnHover
      hoverScale={0.95}
      blurToFocus
      colorShiftOnHover={false}
      renderItem={({ entry: item }) => {
        return (
          <div className="relative flex size-full flex-col overflow-hidden border bg-card p-5 transition-colors hover:border-foreground/20">
            <Sparkles
              className="absolute -bottom-10 -right-10 size-44 text-foreground/5"
              strokeWidth={1}
              aria-hidden
            />

            <div className="flex items-start justify-between gap-3">
              <p className="text-lg font-semibold tracking-tight">
                {item.title}
              </p>
              <span className="inline-flex items-center rounded-full border border-white/20 bg-black/30 px-2 text-xs font-medium text-white/90 backdrop-blur">
                {item.category ?? "Component"}
              </span>
            </div>

            {item.description && (
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            )}

            <div className="relative z-10 mt-auto border-t pt-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground/70">
                  Saved {item.savedAt}
                </p>
                <span
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                >
                  <RemoveFavoriteButton id={item.id} title={item.title} />
                </span>
              </div>
            </div>
          </div>
        );
      }}
    />
  );
}
