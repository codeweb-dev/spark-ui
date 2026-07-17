"use client";

import { Masonry, type MasonryItem } from "@/registry/spark-ui/masonry";
import type { TemplateEntry } from "@/lib/templates";
import { Sparkle } from "lucide-react";
import Image from "next/image";

const HEIGHTS = [400, 320, 427, 320, 427, 480];

type TemplateItem = MasonryItem & { entry: TemplateEntry };

export function TemplatesGrid({ items }: { items: TemplateEntry[] }) {
  const masonryItems: TemplateItem[] = items.map((item, index) => ({
    id: item.slug,
    img: item.image,
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
      renderItem={({ entry: item }) => (
        <div className="group relative size-full">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover opacity-50 blur-[2px] grayscale transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-black/50" />

          <span className="absolute left-4 top-4 w-fit rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-medium text-zinc-900 backdrop-blur">
            {item.category}
          </span>

          <span className="absolute right-4 top-4 inline-flex w-fit items-center gap-1 rounded-full border border-white/20 bg-black/40 px-2 py-0.5 text-[11px] font-medium text-white/90 backdrop-blur">
            <Sparkle size={11} fill="currentColor" aria-hidden />
            Coming soon
          </span>

          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5">
            <p className="text-sm font-semibold text-white">{item.title}</p>
            <p className="text-xs leading-relaxed text-white/70">
              {item.description}
            </p>
          </div>
        </div>
      )}
    />
  );
}
