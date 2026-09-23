import type { Metadata } from "next";
import { PublicPlans } from "../../components/landing/PublicPlans";
import { Navbar } from "../../components/landing/Navbar";
import { Footer } from "../../components/landing/Footer";
import { Check, Mail, ArrowRight } from "lucide-react";

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
        <PublicPlans setupHref="#getting-started" />
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
              <Mail size={24} className="mb-5 text-accent" />
              <h3 className="text-xl font-semibold">New to Pathment?</h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                Contact our team to set up your first workspace. Member
                registration requires an invitation or a clan joining link;
                first-admin self-registration is not available yet.
              </p>
              <a
                href={`mailto:enterprise@pathment.com?subject=${encodeURIComponent(selectedPlan ? `Pathment ${selectedPlan} workspace setup` : "Pathment workspace setup")}`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent"
              >
                Talk about your workspace <ArrowRight size={16} />
              </a>
              <p className="mt-2 text-xs text-muted">Opens your email app.</p>
            </article>
            <article className="rounded-2xl border border-line bg-surface p-7 sm:p-9">
              <ArrowRight size={24} className="mb-5 text-accent" />
              <h3 className="text-xl font-semibold">
                Already part of a workspace?
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                Use Sign In above to open your workspace. Owners and admins can
                request a plan change in Settings → Plans. Your existing plan
                stays active until our team confirms the change.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted">
                Additional workspace creation depends on availability for your
                account. Contact the team if you need another workspace.
              </p>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
