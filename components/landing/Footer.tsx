import Link from "next/link";
import { Brand } from "./Brand";
export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-[2fr_1fr_1fr]">
          <div>
            <Brand />
            <p className="mt-4 max-w-xs text-sm leading-6 text-muted">
              Good people. Shared knowledge.
              <br />A clearer path forward.
            </p>
          </div>
          <div>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">
              Explore
            </h2>
            <ul className="space-y-3 text-sm text-muted">
              <li>
                <Link href="/#solutions" className="hover:text-accent">
                  The platform
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-accent">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-accent">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-accent">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">
              Let’s connect
            </h2>
            <ul className="space-y-3 text-sm text-muted">
              <li>
                <Link href="/#request-access" className="hover:text-accent">
                  Set up a workspace
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:hello@pathment.me"
                  className="hover:text-accent"
                >
                  Contact support
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap justify-between gap-3 border-t border-line pt-6 text-xs text-muted">
          <p>© {new Date().getFullYear()} Pathment. All rights reserved.</p>
          <p>Built around people. Designed for progress.</p>
        </div>
      </div>
    </footer>
  );
}
