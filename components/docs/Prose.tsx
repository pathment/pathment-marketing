import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

/** H2 with an id and a hover "#" link. The id must match the page's toc in lib/docs/nav.ts. */
export function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id}>
      {children}
      <a href={`#${id}`} className="docs-anchor docs-plain" aria-label="Link to this section">
        #
      </a>
    </h2>
  );
}

export function H3({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h3 id={id}>
      {children}
      <a href={`#${id}`} className="docs-anchor docs-plain" aria-label="Link to this section">
        #
      </a>
    </h3>
  );
}

/** A simple table for short reference data (codes, statuses). Scrolls on its own on small screens. */
export function Table({ head, rows }: { head?: string[]; rows: ReactNode[][] }) {
  return (
    <div className="docs-table-wrap">
      <table className="docs-table">
        {head ? (
          <thead>
            <tr>
              {head.map((cell, index) => (
                <th key={index} scope="col">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
        ) : null}
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) =>
                !head && cellIndex === 0 ? (
                  <th key={cellIndex} scope="row" className="w-36">
                    {cell}
                  </th>
                ) : (
                  <td key={cellIndex}>{cell}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Steps({ children }: { children: ReactNode }) {
  return <ol className="docs-steps">{children}</ol>;
}

export function Step({ title, id, children }: { title: string; id?: string; children: ReactNode }) {
  return (
    <li className="docs-step">
      <h3 id={id} className="!mt-0 pt-0.5">
        {title}
        {id ? (
          <a href={`#${id}`} className="docs-anchor docs-plain" aria-label="Link to this step">
            #
          </a>
        ) : null}
      </h3>
      {children}
    </li>
  );
}

export function CardGrid({ children, columns = 3 }: { children: ReactNode; columns?: 2 | 3 }) {
  return (
    <div className={`grid gap-4 sm:grid-cols-2 ${columns === 3 ? "lg:grid-cols-3" : ""}`}>{children}</div>
  );
}

export function Card({
  href,
  title,
  icon: Icon,
  children,
}: {
  href: string;
  title: string;
  icon?: LucideIcon;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="docs-plain group flex flex-col rounded-xl border border-line bg-surface p-5 no-underline transition-colors hover:border-brand-400/60 hover:bg-soft"
    >
      {Icon ? (
        <span className="mb-4 grid h-9 w-9 place-items-center rounded-lg border border-line bg-canvas text-accent">
          <Icon className="h-[1.1rem] w-[1.1rem]" aria-hidden />
        </span>
      ) : null}
      <span className="flex items-center gap-1.5 font-semibold text-[var(--docs-heading)]">
        {title}
        <ArrowRight
          className="h-3.5 w-3.5 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
          aria-hidden
        />
      </span>
      <span className="mt-1.5 text-[0.9rem] leading-6 text-muted">{children}</span>
    </Link>
  );
}

/**
 * Stripe-style reference section: explanation and parameters on the left,
 * request and response examples sticky on the right. One column below xl.
 */
export function RefSplit({ children, aside }: { children: ReactNode; aside: ReactNode }) {
  return (
    <section className="grid gap-8 border-t border-line pt-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:gap-12">
      <div className="docs-prose min-w-0">{children}</div>
      <div className="min-w-0 xl:pt-[3.75rem]">
        <div className="docs-scroll space-y-4 xl:sticky xl:top-[calc(var(--docs-topbar)+1.5rem)] xl:max-h-[calc(100vh-var(--docs-topbar)-3rem)] xl:overflow-y-auto">
          {aside}
        </div>
      </div>
    </section>
  );
}
