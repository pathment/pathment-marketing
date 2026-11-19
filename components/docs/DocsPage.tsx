import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { getDocGroup, getDocPage, getPrevNext } from "../../lib/docs/nav";
import { TableOfContents } from "./TableOfContents";

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/**
 * The frame of every docs page: breadcrumb, title, lead, content, last
 * updated, previous/next and the "On this page" column. Title, lead and
 * headings come from lib/docs/nav.ts so they stay in step with the sidebar
 * and search.
 *
 * `layout="reference"` widens the column for two-column API sections and
 * moves the table of contents to very wide screens only.
 */
export function DocsPage({
  href,
  children,
  layout = "guide",
  lead,
}: {
  href: string;
  children: ReactNode;
  layout?: "guide" | "reference";
  /** Overrides the page description as the lead paragraph. */
  lead?: ReactNode;
}) {
  const page = getDocPage(href);
  const group = getDocGroup(href);
  const { prev, next } = getPrevNext(href);
  const reference = layout === "reference";

  return (
    <div className="flex min-w-0">
      <main id="main-content" className="min-w-0 flex-1 px-5 pt-8 pb-20 sm:px-8 lg:px-12 lg:pt-12">
        <div className={`mx-auto ${reference ? "max-w-[76rem]" : "max-w-[46rem]"}`}>
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-1.5 text-[0.8rem] text-muted">
              <li>
                <Link href="/docs" className="hover:text-ink">
                  Docs
                </Link>
              </li>
              {group && href !== "/docs" ? (
                <>
                  <li aria-hidden>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </li>
                  <li>{group.title}</li>
                  <li aria-hidden>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </li>
                  <li aria-current="page" className="font-medium text-ink">
                    {page.navTitle ?? page.title}
                  </li>
                </>
              ) : null}
            </ol>
          </nav>

          <header className="max-w-[46rem]">
            <h1 className="font-display text-[2rem] leading-[1.15] font-semibold tracking-[-0.035em] text-[var(--docs-heading)] sm:text-[2.5rem]">
              {page.title}
            </h1>
            <p className="mt-4 text-[1.075rem] leading-8 text-muted sm:text-[1.15rem]">{lead ?? page.description}</p>
          </header>

          <article className="docs-prose mt-10">{children}</article>

          <footer className="mt-16 border-t border-line pt-6">
            <p className="text-[0.8rem] text-muted">
              Last updated <time dateTime={page.updated}>{formatDate(page.updated)}</time>
            </p>
            {prev || next ? (
              <nav aria-label="Previous and next pages" className="mt-8 grid gap-4 sm:grid-cols-2">
                {prev ? (
                  <Link
                    href={prev.href}
                    className="group rounded-xl border border-line bg-surface p-4 transition-colors hover:border-brand-400/60"
                  >
                    <span className="flex items-center gap-1.5 text-xs text-muted">
                      <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden />
                      Previous
                    </span>
                    <span className="mt-1 block font-semibold text-ink">{prev.title}</span>
                  </Link>
                ) : (
                  <span className="hidden sm:block" />
                )}
                {next ? (
                  <Link
                    href={next.href}
                    className="group rounded-xl border border-line bg-surface p-4 text-right transition-colors hover:border-brand-400/60"
                  >
                    <span className="flex items-center justify-end gap-1.5 text-xs text-muted">
                      Next
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                    <span className="mt-1 block font-semibold text-ink">{next.title}</span>
                  </Link>
                ) : null}
              </nav>
            ) : null}
          </footer>
        </div>
      </main>

      <aside
        className={`w-60 shrink-0 ${reference ? "hidden 2xl:block" : "hidden xl:block"}`}
        aria-label="Table of contents"
      >
        <div className="docs-scroll sticky top-[var(--docs-topbar)] max-h-[calc(100vh-var(--docs-topbar))] overflow-y-auto py-12 pr-6">
          <TableOfContents items={page.toc} />
        </div>
      </aside>
    </div>
  );
}
