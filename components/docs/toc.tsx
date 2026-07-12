"use client";

import { cn } from "@/lib/utils";
import { AlignLeft, ChevronDown, Dot } from "lucide-react";
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
  const [activeIds, setActiveIds] = useState<string[]>([]);
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [indicator, setIndicator] = useState({ top: 0, height: 0 });

  // The indicator bar spans from the first to the last visible section's link.
  useEffect(() => {
    const links = activeIds
      .map((id) =>
        listRef.current?.querySelector<HTMLElement>(
          `a[href="#${CSS.escape(id)}"]`,
        ),
      )
      .filter((el): el is HTMLElement => Boolean(el));
    const first = links[0];
    const last = links[links.length - 1];
    setIndicator(
      first && last
        ? {
            top: first.offsetTop,
            height: last.offsetTop + last.offsetHeight - first.offsetTop,
          }
        : { top: 0, height: 0 },
    );
  }, [activeIds, headings]);

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

    if (elements.length === 0) {
      setActiveIds([]);
      return;
    }

    // Highlight every section currently visible in the viewport: a section
    // runs from its heading to the next one (the last runs to document end).
    const onScroll = () => {
      const viewTop = 80; // below the sticky navbar
      const viewBottom = window.innerHeight;
      const tops = elements.map((el) => el.getBoundingClientRect().top);
      const visible = elements
        .filter((_, i) => {
          const start = tops[i];
          const end = i < tops.length - 1 ? tops[i + 1] : Infinity;
          return end > viewTop && start < viewBottom;
        })
        .map((el) => el.id);
      // Above the first heading (page intro), keep the first section lit.
      setActiveIds(visible.length > 0 ? visible : [elements[0].id]);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
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
    <ul ref={listRef} className="relative border-l border-border">
      <span
        aria-hidden
        className="absolute -left-px w-0.5 rounded-full bg-foreground transition-all duration-300 ease-out"
        style={{ top: indicator.top, height: indicator.height }}
      />
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
              "block py-1 pl-4 transition-colors duration-200",
              h.level === 3 && "pl-8",
              activeIds.includes(h.id)
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  );

  const currentSection = headings.find((h) => h.id === activeIds[0]);

  if (mobile) {
    return (
      <details
        ref={detailsRef}
        className="group xl:hidden sticky top-18 z-40 mb-6 rounded-lg border border-border bg-background text-sm"
      >
        <summary className="flex cursor-pointer select-none items-center gap-2 px-4 py-3 list-none [&::-webkit-details-marker]:hidden">
          <AlignLeft size={14} aria-hidden className="text-muted-foreground" />
          <div className="flex flex-row gap-1">
            <div className="text-muted-foreground">On this page</div>
            {currentSection && (
              <div className="truncate text-foreground group-open:hidden">
                <Dot className="inline" /> {currentSection.text}
              </div>
            )}
          </div>
          <ChevronDown
            size={14}
            aria-hidden
            className="ml-auto shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
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
