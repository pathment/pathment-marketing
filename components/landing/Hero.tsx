import Link from "next/link";
import { ArrowRight, Building2, Play, ShieldCheck } from "lucide-react";
import { APP_LOGIN_URL, APP_REGISTER_URL } from "../../lib/links";
import { TrackedLink } from "./TrackedLink";
import { HeroProductPreview } from "./HeroProductPreview";

export function Hero() {
  return (
    <section className="hero-section overflow-hidden border-b border-line">
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-12 sm:px-8 sm:pb-16 sm:pt-16 lg:pb-20">
        <div className="grid gap-10 xl:grid-cols-[.68fr_1.32fr] xl:items-center">
          <div>
            <p className="eyebrow"><span className="h-1.5 w-1.5 rounded-full bg-brand-500" />Mentorship and learning operations</p>
            <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.75rem,4.7vw,4.5rem)] font-semibold leading-[1.01] tracking-[-0.055em] text-ink">
              Run mentorship programs <span className="text-accent">without losing track.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg">
              Pathment connects admissions, learning, mentor reviews, recognition, and reporting in one workspace.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <TrackedLink href="/demo" eventName="demo_started" eventProperties={{ source: "hero" }} className="primary-button"><Play className="h-4 w-4" />Explore the product</TrackedLink>
              <TrackedLink href={APP_REGISTER_URL} eventName="organization_signup_clicked" eventProperties={{ source: "hero" }} className="secondary-button"><Building2 className="h-4 w-4" />Create an organization</TrackedLink>
            </div>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <Link href="/pricing" className="inline-flex items-center gap-1.5 font-semibold text-muted hover:text-accent">See plans <ArrowRight className="h-4 w-4" /></Link>
              <TrackedLink href={APP_LOGIN_URL} eventName="login_clicked" eventProperties={{ source: "hero_text" }} className="font-semibold text-muted underline decoration-line underline-offset-4 hover:text-accent">Already use Pathment? Sign in</TrackedLink>
            </div>
            <div className="mt-7 flex items-start gap-3 border-t border-line pt-5 text-xs leading-5 text-muted"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" /><p>The demo uses fictional data and never connects to a live organization.</p></div>
          </div>
          <HeroProductPreview />
        </div>

      </div>
    </section>
  );
}
