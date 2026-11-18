import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";
import { APP_REGISTER_URL } from "../../lib/links";
import { TrackedLink } from "./TrackedLink";

export function FinalCta() {
  return (
    <section
      id="contact"
      aria-labelledby="final-cta-heading"
      className="lp-bg scroll-mt-20 pb-10 lg:pb-14"
    >
      <div className="shell pt-4">
        <div className="lp-panel rounded-[1.75rem] px-6 py-10 text-center sm:px-10 lg:py-12">
          <h2
            id="final-cta-heading"
            className="font-display text-[clamp(1.6rem,3.2vw,2.4rem)] font-semibold tracking-[-0.025em] text-white"
          >
            Your next cohort deserves a better way to run.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-6 text-white/80">
            Bring structure, momentum and measurable outcomes to your
            mentorship program with Pathment.
          </p>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <TrackedLink
              href="/demo"
              eventName="demo_started"
              eventProperties={{ source: "final_cta" }}
              className="lp-btn-leaf group sm:min-w-[11rem]"
            >
              <PlayCircle className="h-[1.1rem] w-[1.1rem]" />
              Explore live demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </TrackedLink>
            <TrackedLink
              href={APP_REGISTER_URL}
              eventName="organization_signup_clicked"
              eventProperties={{ source: "final_cta" }}
              className="lp-btn-ghost sm:min-w-[11rem]"
            >
              Start free workspace
            </TrackedLink>
          </div>

          <p className="mt-6 text-[13px] text-white/60">
            Prefer to talk it through first?{" "}
            <Link href="/contact" className="font-semibold text-white/85 underline-offset-4 hover:underline">
              Tell us about your program
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
