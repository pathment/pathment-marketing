import { ArrowRight, Building2, MessageSquareText, Play } from "lucide-react";
import { APP_REGISTER_URL } from "../../lib/links";
import { BuyerInterestForm } from "./BuyerInterestForm";
import { TrackedLink } from "./TrackedLink";

export function FinalCta() {
  return (
    <section
      id="contact"
      aria-labelledby="final-cta-heading"
      className="on-band scroll-mt-20 overflow-hidden"
    >
      <div className="shell rhythm">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="label">Next step</p>
            <h2 id="final-cta-heading" className="display-lg mt-6">
              What will your next cohort be able to{" "}
              <span className="accent-serif">prove?</span>
            </h2>
            <p className="lede mt-5 max-w-lg">
              Open the demo and walk the whole thing yourself, create a
              workspace in a couple of minutes, or tell us about your program
              and we will tell you honestly whether Pathment fits it.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href="/demo"
                eventName="demo_started"
                eventProperties={{ source: "final_cta" }}
                className="btn btn-lg btn-light"
              >
                <Play className="h-4 w-4" />
                Explore the demo
              </TrackedLink>
              <TrackedLink
                href={APP_REGISTER_URL}
                eventName="organization_signup_clicked"
                eventProperties={{ source: "final_cta" }}
                className="btn btn-lg btn-ghost-light"
              >
                <Building2 className="h-4 w-4" />
                Create an organization
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </div>

            <div className="mt-9 flex gap-3 border-t border-band-line pt-7 text-sm leading-6 text-band-muted">
              <MessageSquareText className="mt-0.5 h-5 w-5 shrink-0 text-mint" />
              <p>
                No sales sequence. A member of the team replies to your work
                email, once.
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-surface p-6 shadow-[0_40px_100px_-50px_rgba(0,0,0,0.6)] sm:p-8">
            <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
              Tell us about your program
            </h3>
            <p className="mb-6 mt-2 text-sm leading-6 text-muted">
              Three required fields. No sales maze.
            </p>
            <BuyerInterestForm compact />
          </div>
        </div>
      </div>
    </section>
  );
}
