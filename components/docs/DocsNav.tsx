"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsNav } from "../../lib/docs/nav";
import { MethodBadge } from "./Endpoint";

/** The grouped page list, used by the desktop sidebar and the mobile drawer. */
export function DocsNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Documentation" className="space-y-8">
      {docsNav.map((group) => (
        <div key={group.title}>
          <p className="mb-2 px-3 font-mono text-[10.5px] font-medium tracking-[0.16em] text-muted uppercase">
            {group.title}
          </p>
          <ul className="space-y-px">
            {group.pages.map((page) => {
              const active = pathname === page.href;
              return (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between gap-2 rounded-lg px-3 py-[0.4rem] text-[0.875rem] leading-6 transition-colors ${
                      active
                        ? "bg-brand-50 font-semibold text-brand-700 dark:bg-brand-400/10 dark:text-brand-300"
                        : "text-[var(--docs-body)] hover:bg-soft hover:text-ink"
                    }`}
                  >
                    <span className="min-w-0 truncate">{page.navTitle ?? page.title}</span>
                    {page.method && page.href !== "/docs/api" ? (
                      <MethodBadge method={page.method} size="sm" />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
