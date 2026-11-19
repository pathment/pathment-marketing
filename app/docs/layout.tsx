import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { DocsNav } from "../../components/docs/DocsNav";
import { DocsTopBar } from "../../components/docs/DocsTopBar";
import "./docs.css";

export const metadata: Metadata = {
  title: {
    default: "Pathment Docs",
    template: "%s | Pathment Docs",
  },
  description:
    "Guides and API reference for bringing people into Pathment intakes from your own systems.",
};

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="docs-root min-h-screen">
      <DocsTopBar />
      <div className="mx-auto flex max-w-[1600px]">
        <aside className="hidden w-64 shrink-0 border-r border-line lg:block" aria-label="Documentation sidebar">
          <div className="docs-scroll sticky top-[var(--docs-topbar)] h-[calc(100vh-var(--docs-topbar))] overflow-y-auto px-4 pt-8 pb-12">
            <DocsNav />
          </div>
        </aside>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
      <footer className="border-t border-line bg-surface">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-5 py-8 text-[0.8rem] text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} Pathment. Questions about the API? We read every message.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/" className="hover:text-ink">
              pathment.me
            </Link>
            <Link href="/contact" className="hover:text-ink">
              Contact
            </Link>
            <Link href="/privacy" className="hover:text-ink">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
