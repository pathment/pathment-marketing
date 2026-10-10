import { ArrowRight, Building2, MessageSquareText } from "lucide-react";
import { APP_REGISTER_URL } from "../../lib/links";
import { BuyerInterestForm } from "./BuyerInterestForm";
import { TrackedLink } from "./TrackedLink";

export function FinalCta() {
  return (
    <section id="contact" className="bg-brand-950 px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[.75fr_1.25fr] md:items-start">
        <div className="text-white md:sticky md:top-28">
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-brand-200">Take the next step</p>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Start your Pathment organization, or talk through the fit.</h2>
          <p className="mt-4 max-w-lg text-sm leading-7 text-brand-100/75">Create an organization now, or send three details for pricing and onboarding guidance.</p>
          <TrackedLink href={APP_REGISTER_URL} eventName="organization_signup_clicked" eventProperties={{ source: "final_cta" }} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-100 px-5 py-3 text-sm font-semibold text-brand-950 hover:bg-white"><Building2 size={17} />Create your organization <ArrowRight size={16} /></TrackedLink>
          <div className="mt-6 flex gap-3 border-t border-white/15 pt-5 text-sm leading-6 text-brand-100/75"><MessageSquareText className="mt-1 shrink-0 text-brand-300" size={20} /><p>A team member replies to your work email.</p></div>
        </div>
        <div className="rounded-3xl bg-surface p-6 shadow-xl sm:p-8"><h3 className="text-xl font-semibold text-ink">Talk to the Pathment team</h3><p className="mb-6 mt-2 text-sm leading-6 text-muted">Three required fields. No sales maze.</p><BuyerInterestForm compact /></div>
      </div>
    </section>
  );
}
