import type { Metadata } from "next";
import Link from "next/link";
import { PublicPlans } from "../../components/landing/PublicPlans";
import { Navbar } from "../../components/landing/Navbar";
import { Footer } from "../../components/landing/Footer";
import { Check, Building2, ArrowRight, BadgeCheck, Compass, LogIn, MessageCircle } from "lucide-react";
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
      <main id="main-content" className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <header className="mb-14 grid gap-9 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
          <div>
            <p className="eyebrow">Straightforward workspace pricing</p>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-[-.045em] text-ink sm:text-6xl">Start with the program you run today.</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted">Pilot with one community or support a larger operation. The Admin, Mentor, and Mentee experience stays connected on every plan.</p>
          </div>
          <div className="rounded-[1.5rem] border border-line bg-surface p-6 shadow-sm-soft">
            <p className="text-xs font-semibold uppercase tracking-[.14em] text-accent">Before anything changes</p>
            <div className="mt-5 space-y-3 text-sm text-muted">
              {["No automatic charge", "A human confirms plan fit", "Onboarding guidance is included"].map((text) => <span key={text} className="flex items-center gap-3"><span className="grid h-7 w-7 place-items-center rounded-full bg-brand-50 text-brand-700"><Check size={14} /></span>{text}</span>)}
            </div>
          </div>
        </header>
        <PublicPlans setupHref="/contact" />
        <aside className="mt-7 flex flex-col justify-between gap-5 rounded-2xl border border-brand-200 bg-brand-50 px-5 py-5 text-sm sm:flex-row sm:items-center sm:px-7">
          <div className="flex items-start gap-3"><Compass className="mt-0.5 shrink-0 text-brand-700" size={19} /><div><strong className="text-brand-950">Not sure which plan fits?</strong><p className="mt-1 text-brand-800/75">Share your participant count and launch timing. We will recommend the smallest plan that works.</p></div></div>
          <TrackedLink href="/contact" eventName="buyer_form_started" eventProperties={{ source: "pricing_guide" }} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-700 px-4 py-3 font-semibold text-white">Get a recommendation <ArrowRight size={15} /></TrackedLink>
        </aside>
        <section id="getting-started" className="mt-20 overflow-hidden rounded-[2rem] bg-brand-950 text-white">
          {selectedPlan ? (
            <p role="status" className="border-b border-white/12 bg-brand-800 px-6 py-4 text-sm text-brand-100 sm:px-10">You are exploring <strong className="text-white">{selectedPlan}</strong>. We will confirm the right fit before anything changes.</p>
          ) : null}
          <div className="grid lg:grid-cols-[.7fr_1.3fr]">
            <div className="relative overflow-hidden border-b border-white/12 p-7 sm:p-10 lg:border-b-0 lg:border-r">
              <div className="absolute -left-20 top-10 h-56 w-56 rounded-full bg-brand-500/20 blur-3xl" />
              <div className="relative"><p className="text-xs font-semibold uppercase tracking-[.16em] text-brand-300">Your next step</p><h2 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl">Starting something new, or joining something already running?</h2><p className="mt-5 text-sm leading-7 text-brand-100/68">Choose the path that matches your situation. Public registration creates a new organization. Invitations add people to an existing workspace.</p></div>
            </div>
            <div className="grid sm:grid-cols-2">
              <article className="group bg-brand-100 p-7 text-brand-950 sm:p-9">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-brand-700 shadow-sm"><Building2 size={21} /></span>
                <p className="mt-7 text-[10px] font-semibold uppercase tracking-[.14em] text-brand-700">I run the program</p>
                <h3 className="mt-2 text-2xl font-semibold">Create a new organization</h3>
                <p className="mt-3 text-sm leading-6 text-brand-900/72">Set up a fresh Pathment workspace for your mentorship or learning program.</p>
              <TrackedLink
                href={APP_REGISTER_URL}
                eventName="organization_signup_clicked"
                eventProperties={{ source: "pricing" }}
                  className="mt-7 inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-3 text-sm font-semibold text-white"
              >
                  Create an organization <ArrowRight size={16} />
              </TrackedLink>
            </article>
              <article className="border-t border-white/12 p-7 sm:border-l sm:border-t-0 sm:p-9">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/8 text-brand-300"><LogIn size={21} /></span>
                <p className="mt-7 text-[10px] font-semibold uppercase tracking-[.14em] text-brand-300">My organization uses Pathment</p>
                <h3 className="mt-2 text-2xl font-semibold">Sign in or use your invitation</h3>
                <p className="mt-3 text-sm leading-6 text-brand-100/68">Sign in globally. If you are new, open the secure invitation your administrator sent.</p>
                <TrackedLink href={APP_LOGIN_URL} eventName="login_clicked" eventProperties={{ source: "pricing" }} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-200">Sign in to Pathment <ArrowRight size={16} /></TrackedLink>
            </article>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 border-t border-white/12 px-7 py-5 text-xs text-brand-100/60 sm:flex-row sm:items-center sm:px-10"><span className="inline-flex items-center gap-2"><BadgeCheck size={15} className="text-brand-300" />Invitation links are only for joining an existing organization.</span><Link href="/contact" className="inline-flex items-center gap-2 font-semibold text-brand-200"><MessageCircle size={14} />Ask a setup question</Link></div>
        </section>
      </main>
      <Footer />
    </>
  );
}
