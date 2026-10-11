import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Database,
  KeyRound,
  Mail,
  ShieldCheck,
  Trash2,
  UserRoundCheck,
} from "lucide-react";

import { Footer } from "../../components/landing/Footer";
import { Navbar } from "../../components/landing/Navbar";

const deletionEmail =
  "mailto:hello@pathment.me?subject=Pathment%20account%20deletion%20request";

export const metadata: Metadata = {
  title: "Delete your Pathment account",
  description:
    "Request deletion of your Pathment account and associated personal data, or ask us to remove specific data without closing your account.",
  alternates: { canonical: "/account-deletion" },
  openGraph: {
    title: "Delete your Pathment account",
    description:
      "Clear instructions for requesting deletion of a Pathment account and associated data.",
    url: "https://pathment.me/account-deletion",
  },
};

const steps = [
  {
    icon: Mail,
    title: "Send your request",
    body: (
      <>
        Email us from the address connected to your Pathment account. Use the
        subject <strong className="text-ink">Account deletion request</strong>
        {" "}and include your workspace name if you know it.
      </>
    ),
  },
  {
    icon: UserRoundCheck,
    title: "Confirm account ownership",
    body: "We may ask you to confirm your request from your registered email address. We will never ask for your password, one-time code, or recovery code.",
  },
  {
    icon: Trash2,
    title: "We process the deletion",
    body: "We normally complete verified requests within 30 days and confirm when the active account has been deleted or de-identified.",
  },
] as const;

function DataCard({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Trash2;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-line bg-surface p-6 sm:p-7">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-soft text-accent">
        <Icon size={21} aria-hidden="true" />
      </div>
      <h2 className="mt-5 font-display text-xl font-semibold text-ink">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-sm leading-7 text-muted sm:text-[15px]">
        {children}
      </div>
    </article>
  );
}

export default function AccountDeletionPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-canvas">
        <header className="relative overflow-hidden border-b border-line bg-surface">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-60 [background-image:radial-gradient(var(--line)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]"
          />
          <div className="relative mx-auto max-w-5xl px-5 py-16 text-center sm:px-8 sm:py-24 lg:py-28">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-line bg-soft px-3 py-1.5 text-xs font-semibold text-accent">
              <ShieldCheck size={15} aria-hidden="true" />
              Account and data controls
            </div>
            <h1 className="mx-auto mt-6 max-w-4xl font-display text-4xl leading-[1.08] font-semibold tracking-[-0.045em] text-ink sm:text-6xl">
              Delete your Pathment account
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
              You can request deletion of your account and associated personal
              data at any time. You can also ask us to remove specific personal
              data without closing your account.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={deletionEmail}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 sm:w-auto"
              >
                Email a deletion request
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <Link
                href="/privacy#retention"
                className="inline-flex w-full items-center justify-center rounded-xl border border-line bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-soft sm:w-auto"
              >
                Read our retention policy
              </Link>
            </div>
          </div>
        </header>

        <section
          aria-labelledby="deletion-steps"
          className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20"
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              How it works
            </p>
            <h2
              id="deletion-steps"
              className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
            >
              A clear, secure request process
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              You do not need access to the Pathment app to submit a request.
            </p>
          </div>

          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {steps.map(({ icon: Icon, title, body }, index) => (
              <li
                key={title}
                className="relative rounded-2xl border border-line bg-surface p-6 sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-soft text-accent">
                    <Icon size={21} aria-hidden="true" />
                  </div>
                  <span className="font-mono text-xs text-muted/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">{body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-6 rounded-2xl border border-brand-200 bg-brand-50 p-5 text-sm leading-7 text-brand-950 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-100 sm:p-6">
            <div className="flex gap-3">
              <KeyRound className="mt-1 shrink-0" size={19} aria-hidden="true" />
              <p>
                <strong>Protect your account.</strong> Include only your account
                email and workspace name. Never send your password, two-factor
                authentication code, recovery code, or identity documents in
                the first email.
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-line bg-soft">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
            <div className="grid gap-5 lg:grid-cols-2">
              <DataCard icon={Trash2} title="Data deleted or de-identified">
                <p>Once your request is verified, this generally includes:</p>
                <ul className="space-y-2">
                  {[
                    "Your Pathment profile and account credentials",
                    "Active sessions, device tokens, and notification preferences",
                    "Workspace memberships and role assignments",
                    "Personal profile information and content that is not required to preserve an organisation's legitimate programme record",
                  ].map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <CheckCircle2
                        className="mt-1 shrink-0 text-accent"
                        size={16}
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </DataCard>

              <DataCard icon={Database} title="Data that may be retained">
                <p>
                  Some information may need to remain in a restricted form for
                  security, fraud prevention, dispute resolution, contractual,
                  financial, or legal obligations.
                </p>
                <p>
                  Deleted information may remain in encrypted backups for up to
                  90 days before being overwritten. Records that must be kept by
                  law are retained only for the applicable legal period. We may
                  retain de-identified or aggregated data that can no longer be
                  linked to you.
                </p>
              </DataCard>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="grid gap-8 rounded-3xl border border-line bg-surface p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex items-center gap-2 text-accent">
                <Clock3 size={19} aria-hidden="true" />
                <p className="text-xs font-semibold uppercase tracking-[0.16em]">
                  Keep your account instead
                </p>
              </div>
              <h2 className="mt-4 font-display text-2xl font-semibold text-ink sm:text-3xl">
                Request deletion of specific data
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted sm:text-base">
                If you only want particular personal data, a file, post, or
                other content removed, say exactly what you want deleted in your
                email. We will review the request without closing your account.
              </p>
            </div>
            <a
              href="mailto:hello@pathment.me?subject=Pathment%20personal%20data%20deletion%20request"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-soft px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-brand-300 hover:bg-brand-50"
            >
              Request data deletion
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>

          <p className="mt-8 text-center text-sm leading-7 text-muted">
            Questions? Email{" "}
            <a
              href="mailto:hello@pathment.me"
              className="font-semibold text-accent hover:underline"
            >
              hello@pathment.me
            </a>
            . For more detail, read our{" "}
            <Link href="/privacy" className="font-semibold text-accent hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
