"use client";

import { cn } from "@/lib/utils";
import { AlignLeft, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface TocHeading {
  id: string;
  text: string;
  level: number;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function Toc({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<TocHeading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLHeadingElement>(
        "article.typeset h2, article.typeset h3",
      ),
    ).filter((el) => !el.closest(".not-typeset"));

    const seen = new Map<string, number>();
    const items = elements.map((el) => {
      const text = el.textContent || "";
      let id = slugify(text);
      const count = seen.get(id) || 0;
      seen.set(id, count + 1);
      if (count > 0) id = `${id}-${count}`;
      el.id = id;
      el.style.scrollMarginTop = "5rem";
      return { id, text, level: el.tagName === "H2" ? 2 : 3 };
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect -- TOC is derived from the rendered DOM, only available post-render
    setHeadings(items);
    setActiveId(items[0]?.id ?? "");

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  if (headings.length === 0) return null;

  const scrollTo = (id: string) => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  const list = (
    <ul className="border-l border-border">
      {headings.map((h) => (
        <li key={h.id}>
          <a
            href={`#${h.id}`}
            onClick={(e) => {
              e.preventDefault();
              scrollTo(h.id);
              detailsRef.current?.removeAttribute("open");
            }}
            className={cn(
              "block -ml-px border-l-2 py-1 pl-4 transition-colors duration-200",
              h.level === 3 && "pl-8",
              activeId === h.id
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  );

  if (mobile) {
    return (
      <details
        ref={detailsRef}
        className="group xl:hidden sticky top-18 z-40 mb-6 rounded-lg border border-border bg-background text-sm"
      >
        <summary className="flex cursor-pointer select-none items-center gap-2 px-4 py-3 text-muted-foreground list-none [&::-webkit-details-marker]:hidden">
          <AlignLeft size={14} aria-hidden />
          On this page
          <ChevronDown
            size={14}
            aria-hidden
            className="ml-auto transition-transform duration-200 group-open:rotate-180"
          />
        </summary>
        <div className="max-h-[50vh] overflow-y-auto px-4 pb-3">{list}</div>
      </details>
    );
  }

  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="flex items-center gap-2 mb-3 text-muted-foreground">
        <AlignLeft size={14} aria-hidden />
        On this page
      </p>
      {list}
    </nav>
  );
}
