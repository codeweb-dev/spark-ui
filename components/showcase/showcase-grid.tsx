"use client";

import type { ShowcaseEntry } from "@/lib/showcase";
import { BadgeCheck, Check } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const ASPECTS = [
  "aspect-4/5",
  "aspect-4/5",
  "aspect-4/5",
  "aspect-square",
  "aspect-3/4",
  "aspect-4/6",
];

export function ShowcaseGrid({ items }: { items: ShowcaseEntry[] }) {
  return (
    <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
      {items.map((item, index) => (
        <motion.div
          key={item.slug}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.6,
            delay: (index % 3) * 0.1,
            ease: "easeOut",
          }}
          className={`group relative mb-6 inline-block w-full break-inside-avoid overflow-hidden rounded-2xl border border-border ${
            ASPECTS[index % ASPECTS.length]
          }`}
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-black/40" />

          <span className="absolute left-4 top-4 w-fit rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-medium text-zinc-900 backdrop-blur">
            {item.category}
          </span>

          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-5">
            <div className="flex items-center gap-3">
              <Image
                src="/icon.png"
                width={36}
                height={36}
                alt="Spark UI logo"
                className="shrink-0 rounded-full bg-muted"
              />

              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <p className="truncate text-sm font-semibold text-white">
                    {item.author}
                  </p>

                  {item.verified && (
                    <span
                      className="relative inline-flex size-4 shrink-0 items-center justify-center"
                      aria-label="Verified"
                    >
                      <BadgeCheck
                        className="absolute size-4 fill-blue-500"
                        strokeWidth={0}
                        aria-hidden="true"
                      />

                      <Check
                        className="relative size-2 text-white"
                        strokeWidth={3}
                        aria-hidden="true"
                      />
                    </span>
                  )}

                  <div className="inline-flex items-center rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur">
                    #1548
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur">
                    <Image
                      src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/duolingo.svg"
                      width={12}
                      height={12}
                      alt="Duolingo logo"
                    />
                    Duolingo
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-white/70">
              {item.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
