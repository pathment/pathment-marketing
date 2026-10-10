import type { Metadata } from "next";
import { PublicPlans } from "../../components/landing/PublicPlans";
import { Navbar } from "../../components/landing/Navbar";
import { Footer } from "../../components/landing/Footer";
import { Check, Building2, ArrowRight } from "lucide-react";
import { APP_LOGIN_URL, APP_REGISTER_URL } from "../../lib/links";
import { TrackedLink } from "../../components/landing/TrackedLink";

export const metadata: Metadata = {
  title: "Pricing | Pathment",
  description:
    "Compare published Pathment workspace prices, member limits, and features. Start with a plan that fits your mentorship community.",
};

export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const { plan } = await searchParams;
  const selectedPlan = plan && /^[a-zA-Z0-9 -]{1,50}$/.test(plan) ? plan : null;
  return (
    <>
      <Navbar />
      <main
        id="main-content"
        className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20"
      >
        <header className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            A plan for your next chapter
          </p>
          <h1 className="mt-5 font-display text-4xl leading-tight font-semibold tracking-tight text-ink sm:text-5xl">
            Start small.
            <br />
            Grow together.
          </h1>
          <p className="mt-5 text-base leading-7 text-muted">
            From your first mentor-led group to a thriving community. Find the
            right amount of room for your people and programs.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-muted">
            {[
              "Per workspace pricing",
              "Published currency",
              "Team-assisted setup",
            ].map((text) => (
              <span key={text} className="flex items-center gap-1.5">
                <Check size={14} className="text-accent" />
                {text}
              </span>
            ))}
          </div>
        </header>
        <PublicPlans setupHref="/contact" />
        <aside className="mt-6 rounded-xl border border-line bg-soft px-5 py-4 text-sm leading-6 text-ink">
          <strong>Simple, manual billing.</strong> Paid plans are invoiced by
          the Pathment team. A plan request does not charge you or change your
          limits. Your plan changes after operator confirmation and activation.
          Online checkout is not available.
        </aside>
        <section id="getting-started" className="mt-20">
          {selectedPlan ? (
            <p
              role="status"
              className="mb-8 rounded-xl border border-line bg-soft p-5 text-sm text-ink"
            >
              You’re exploring <strong>{selectedPlan}</strong>. Let’s talk about
              your workspace and confirm the right fit before making any
              changes.
            </p>
          ) : null}
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Let’s get you started
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">
              A little help with your first step.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-line bg-surface p-7 sm:p-9">
              <Building2 size={24} className="mb-5 text-accent" />
              <h3 className="text-xl font-semibold">Create a new organization</h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                Organization owners can start through public registration. Existing-organization members join separately through a secure invitation link from their administrator.
              </p>
              <TrackedLink
                href={APP_REGISTER_URL}
                eventName="organization_signup_clicked"
                eventProperties={{ source: "pricing" }}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent"
              >
                Create your organization <ArrowRight size={16} />
              </TrackedLink>
            </article>
            <article className="rounded-2xl border border-line bg-surface p-7 sm:p-9">
              <ArrowRight size={24} className="mb-5 text-accent" />
              <h3 className="text-xl font-semibold">
                Already part of a workspace?
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                Use the global sign-in page to access your account. If your organization invited you, use the secure invitation link they sent so you join the correct workspace and role.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted">
                Owners and admins can manage plan requests from their workspace after signing in.
              </p>
              <TrackedLink href={APP_LOGIN_URL} eventName="login_clicked" eventProperties={{ source: "pricing" }} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">Sign in to Pathment <ArrowRight size={16} /></TrackedLink>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
