"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { docsSections } from "../../lib/docs/nav";
import { APP_LOGIN_URL } from "../../lib/links";
import { ThemeToggle } from "../landing/ThemeToggle";
import { DocsNav } from "./DocsNav";
import { DocsSearch } from "./DocsSearch";

export function DocsTopBar() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!drawerOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setDrawerOpen(false);
        toggleRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [drawerOpen]);

  return (
    <header className="sticky top-0 z-50 h-[var(--docs-topbar)] border-b border-line bg-surface/90 backdrop-blur-xl">
      <div className="mx-auto flex h-full max-w-[1600px] items-center gap-3 px-4 sm:px-6 lg:gap-6">
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setDrawerOpen((value) => !value)}
          aria-expanded={drawerOpen}
          aria-controls="docs-drawer"
          aria-label={drawerOpen ? "Close navigation" : "Open navigation"}
          className="-ml-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-ink hover:bg-soft lg:hidden"
        >
          {drawerOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
        </button>

        <div className="flex shrink-0 items-center gap-2.5">
          <Link
            href="/"
            aria-label="Pathment home"
            className="inline-flex items-center gap-2 font-display text-[1.1rem] font-semibold tracking-tight text-ink"
          >
            <Image src="/logo-mark.svg" alt="" width={28} height={28} priority />
            <span className="hidden min-[400px]:inline">Pathment</span>
          </Link>
          <span className="h-5 w-px bg-line" aria-hidden />
          <Link href="/docs" className="text-[0.95rem] font-medium text-muted hover:text-ink">
            Docs
          </Link>
        </div>

        <nav aria-label="Docs sections" className="ml-2 hidden items-center gap-1 lg:flex">
          {docsSections.map((section) => {
            const active = pathname.startsWith(section.match);
            return (
              <Link
                key={section.href}
                href={section.href}
                aria-current={active ? "true" : undefined}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {section.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex flex-1 items-center justify-end gap-2 sm:gap-3">
          <DocsSearch />
          <ThemeToggle />
          <a
            href={APP_LOGIN_URL}
            className="hidden h-9 items-center gap-1 rounded-lg bg-brand-600 px-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 sm:inline-flex dark:bg-brand-500 dark:hover:bg-brand-400 dark:hover:text-[#04110f]"
          >
            Sign in
          </a>
        </div>
      </div>

      {drawerOpen ? (
        <div className="fixed inset-0 top-[var(--docs-topbar)] z-40 lg:hidden">
          <div className="absolute inset-0 bg-[#04110f]/40 dark:bg-black/70" onClick={() => setDrawerOpen(false)} aria-hidden />
          <div
            id="docs-drawer"
            className="docs-scroll absolute inset-y-0 left-0 w-[min(20rem,86vw)] overflow-y-auto border-r border-line bg-surface px-3 py-6"
          >
            <ul className="mb-8 space-y-px">
              {docsSections.map((section) => (
                <li key={section.href}>
                  <Link
                    href={section.href}
                    onClick={() => setDrawerOpen(false)}
                    className="block rounded-lg px-3 py-2 text-[0.95rem] font-semibold text-ink hover:bg-soft"
                  >
                    {section.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={APP_LOGIN_URL}
                  className="flex items-center gap-1 rounded-lg px-3 py-2 text-[0.95rem] font-semibold text-accent hover:bg-soft"
                >
                  Sign in <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>
              </li>
            </ul>
            <DocsNav onNavigate={() => setDrawerOpen(false)} />
          </div>
        </div>
      ) : null}
    </header>
  );
}
