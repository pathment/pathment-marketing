import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "./Brand";
import { ANDROID_APP_URL, APP_LOGIN_URL, APP_REGISTER_URL } from "../../lib/links";
import { TrackedLink } from "./TrackedLink";

const columns = [
  {
    heading: "Product",
    links: [
      { href: "/#workspaces", label: "Role workspaces" },
      { href: "/#capabilities", label: "Capabilities" },
      { href: "/#lifecycle", label: "How it works" },
      { href: "/#mobile", label: "Android app" },
      { href: "/demo", label: "Interactive demo" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { href: "/#audiences", label: "Fellowships & bootcamps" },
      { href: "/#audiences", label: "Internal L&D" },
      { href: "/#audiences", label: "Universities" },
      { href: "/#audiences", label: "Communities & nonprofits" },
    ],
  },
  {
    heading: "Get started",
    links: [
      { href: "/pricing", label: "Pricing" },
      { href: APP_REGISTER_URL, label: "Create an organization" },
      { href: APP_LOGIN_URL, label: "Sign in" },
      { href: "/contact", label: "Talk to the team" },
    ],
  },
  {
    heading: "Trust",
    links: [
      { href: "/privacy", label: "Privacy policy" },
      { href: "/account-deletion", label: "Delete an account" },
      { href: "/contact", label: "Security questions" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="on-band-deep">
      <div className="shell py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,2fr)] lg:gap-16">
          <div>
            <Brand inverse />
            <p className="mt-5 max-w-xs text-sm leading-6 text-band-muted">
              Mentorship and learning program operations, from the application
              form to the evidence behind the certificate.
            </p>
            <a
              href={ANDROID_APP_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-mint-bright"
            >
              Get the Android app
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {columns.map((column) => (
              <nav key={column.heading} aria-label={column.heading}>
                <h2 className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-mint">
                  {column.heading}
                </h2>
                <ul className="space-y-2.5">
                  {column.links.map((link) => {
                    const external = link.href.startsWith("http");
                    return (
                      <li key={`${column.heading}-${link.label}`}>
                        {external ? (
                          <TrackedLink
                            href={link.href}
                            eventName={
                              link.href === APP_LOGIN_URL
                                ? "login_clicked"
                                : "organization_signup_clicked"
                            }
                            eventProperties={{ source: "footer" }}
                            className="text-sm text-band-muted transition-colors hover:text-band-ink"
                          >
                            {link.label}
                          </TrackedLink>
                        ) : (
                          <Link
                            href={link.href}
                            className="text-sm text-band-muted transition-colors hover:text-band-ink"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-band-line pt-7 text-xs text-band-muted sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Pathment. All rights reserved.</p>
          <p>Built around people. Designed for progress.</p>
        </div>
      </div>
    </footer>
  );
}
