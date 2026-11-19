"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "../../lib/docs/nav";

/** "On this page", with the section currently being read highlighted. */
export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!headings.length) return;

    // The active section is the last heading that has scrolled past a line a
    // little below the top bar. Recomputed on scroll, which is cheap for the
    // dozen headings a page has.
    let frame = 0;
    function update() {
      frame = 0;
      const line = 120;
      let current = headings[0].id;
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top - line <= 0) current = heading.id;
        else break;
      }
      // At the very bottom, the last heading may never reach the line.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = headings[headings.length - 1].id;
      }
      setActiveId(current);
    }
    function onScroll() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  if (!items.length) return null;

  return (
    <nav aria-label="On this page">
      <p className="mb-3 font-mono text-[10.5px] font-medium tracking-[0.16em] text-muted uppercase">
        On this page
      </p>
      <ul className="space-y-px border-l border-line">
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active ? "location" : undefined}
                className={`-ml-px block border-l py-1 text-[0.8rem] leading-5 transition-colors ${
                  item.level === 3 ? "pl-6" : "pl-3.5"
                } ${
                  active
                    ? "border-accent font-medium text-accent"
                    : "border-transparent text-muted hover:border-line hover:text-ink"
                }`}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
