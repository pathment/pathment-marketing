import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { PublicPlans } from "./PublicPlans";

const assurances = [
  "No card, no automatic charge",
  "A human confirms the plan fits before anything changes",
  "Onboarding guidance is included on every plan",
] as const;

/**
 * Live plans on the homepage. Prices come from the published catalogue via
 * /api/plans. Nothing here is hardcoded, so the page cannot drift from what
 * the product actually sells.
 */
export function PricingPreview() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="scroll-mt-20 border-b border-line bg-surface"
    >
      <div className="shell rhythm">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end lg:gap-16">
          <div>
            <p className="label">Pricing</p>
            <h2 id="pricing-heading" className="display-lg mt-6">
              Priced per workspace, not{" "}
              <span className="accent-serif">per anxious headcount.</span>
            </h2>
          </div>
          <ul className="space-y-2.5">
            {assurances.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-muted">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 lg:mt-16">
          <PublicPlans setupHref="/contact" />
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-line bg-canvas px-6 py-5 sm:flex-row sm:items-center">
          <p className="text-sm leading-6 text-muted">
            <strong className="text-ink">Not sure which plan fits?</strong>{" "}
            Share your participant count and launch date, and we will recommend the
            smallest plan that works.
          </p>
          <Link href="/pricing" className="btn btn-outline shrink-0">
            Compare plans in detail
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
