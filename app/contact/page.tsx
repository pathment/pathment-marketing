import type { Metadata } from "next";
import { BuyerInterestForm } from "../../components/landing/BuyerInterestForm";
import { Footer } from "../../components/landing/Footer";
import { Navbar } from "../../components/landing/Navbar";

export const metadata: Metadata = { title: "Talk to the Pathment team", description: "Request Pathment pricing and onboarding guidance for your mentorship or learning program." };

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ plan?: string }> }) {
  const { plan } = await searchParams;
  const selectedPlan = plan && /^[a-zA-Z0-9 &+-]{1,50}$/.test(plan) ? plan : undefined;
  return <><Navbar /><main id="main-content" className="px-5 py-16 sm:px-8 sm:py-20"><div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.8fr_1.2fr]"><header><p className="eyebrow">Pricing and implementation</p><h1 className="display-lg mt-6">Tell us what you want to launch.</h1><p className="lede mt-6">Share the essentials about your mentorship or learning program. A Pathment team member will contact you about pricing, onboarding, and the most practical next step.</p><div className="mt-8 rounded-2xl border border-line bg-soft p-5"><h2 className="font-semibold text-ink">What happens next?</h2><ol className="mt-4 space-y-3 text-sm leading-6 text-muted"><li><strong className="text-ink">1.</strong> We receive your selected plan and program details.</li><li><strong className="text-ink">2.</strong> A team member replies to your work email.</li><li><strong className="text-ink">3.</strong> We confirm pricing, onboarding, and launch timing. Nothing is charged or activated automatically.</li></ol></div></header><section aria-labelledby="form-title" className="rounded-3xl border border-line bg-surface p-6 shadow-lg-soft sm:p-9"><h2 id="form-title" className="text-2xl font-semibold text-ink">Request pricing guidance</h2><p className="mb-7 mt-2 text-sm text-muted">Three required fields. Your selected plan is included automatically.</p><BuyerInterestForm selectedPlan={selectedPlan} /></section></div></main><Footer /></>;
}
