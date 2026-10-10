import Link from "next/link";
import { Brand } from "./Brand";
import { ANDROID_CLOSED_TEST_URL, APP_LOGIN_URL, APP_REGISTER_URL } from "../../lib/links";
import { TrackedLink } from "./TrackedLink";
export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <Brand />
            <p className="mt-4 max-w-xs text-sm leading-6 text-muted">
              Mentorship program operations for organizations that need a clear path from learning to outcomes.
            </p>
          </div>
          <div>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">
              Explore
            </h2>
            <ul className="space-y-3 text-sm text-muted">
              <li>
                <Link href="/#outcomes" className="hover:text-accent">
                  Outcomes
                </Link>
              </li>
              <li>
                <Link href="/#roles" className="hover:text-accent">
                  Role experiences
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-accent">
                  How it works
                </Link>
              </li>
              <li>
                <a href={ANDROID_CLOSED_TEST_URL} target="_blank" rel="noreferrer" className="hover:text-accent">
                  Android closed test
                </a>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-accent">
                  Pricing
                </Link>
              </li>
              <li><Link href="/demo" className="hover:text-accent">Interactive demo</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">
              Legal
            </h2>
            <ul className="space-y-3 text-sm text-muted">
              <li>
                <Link href="/privacy" className="hover:text-accent">
                  Privacy policy
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
                <TrackedLink href={APP_REGISTER_URL} eventName="organization_signup_clicked" eventProperties={{ source: "footer" }} className="hover:text-accent">Create an organization</TrackedLink>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent">Talk to the team</Link>
              </li>
              <li><TrackedLink href={APP_LOGIN_URL} eventName="login_clicked" eventProperties={{ source: "footer" }} className="hover:text-accent">Sign in</TrackedLink></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap justify-between gap-3 border-t border-line pt-6 text-xs text-muted">
          <p>© {new Date().getFullYear()} Pathment. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/privacy" className="hover:text-accent">
              Privacy
            </Link>
            <p>Built around people. Designed for progress.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
