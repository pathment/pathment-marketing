"use client";

import Link from "next/link";
import { BarChart3, Check, Layers, Sprout } from "lucide-react";
import { track } from "../../lib/analytics";
import { formatPrice, label, planHref, usePublishedPlans, type Plan } from "./PublicPlans";

const planIcons = [Sprout, BarChart3, Layers] as const;

const count = (value: number) => (value < 0 ? "Unlimited" : value.toLocaleString("en"));

/** Three short lines per plan, all derived from the published limits and features. */
function highlights(plan: Plan) {
  const { members, programs, clans } = plan.limits;
  const lines: string[] = [];
  if (members !== undefined)
    lines.push(members < 0 ? "Unlimited members" : `Up to ${count(members)} members`);
  if (programs !== undefined && clans !== undefined)
    lines.push(
      programs < 0 && clans < 0
        ? "Unlimited programs & clans"
        : `${count(programs)} programs, ${count(clans)} clans`,
    );
  const features = Object.entries(plan.features)
    .filter(([, enabled]) => enabled)
    .map(([key]) => label(key));
  const pick = features.includes("Advanced analytics")
    ? "Advanced analytics"
    : features.slice(0, 2).join(" & ");
  if (pick) lines.push(pick);
  return lines.slice(0, 3);
}

/**
 * Live plans on the homepage. Prices come from the published catalogue via
 * /api/plans, so the page cannot drift from what the product actually sells.
 */
export function PricingPreview() {
  const { plans, state, retry } = usePublishedPlans();

  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="scroll-mt-20 bg-surface">
      <div className="shell grid gap-8 py-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2.6fr)] lg:items-center lg:gap-10 lg:py-16">
        <div>
          <p className="lp-label">Pricing</p>
          <h2
            id="pricing-heading"
            className="mt-3 font-display text-[clamp(1.6rem,2.6vw,2rem)] font-semibold leading-[1.15] tracking-[-0.025em] text-ink"
          >
            Simple, transparent pricing for programs of any size.
          </h2>
          <p className="mt-4 text-sm leading-6 text-muted">
            Get started for free, and scale as your program grows.
          </p>
          <Link
            href="/pricing"
            className="mt-5 inline-block text-sm font-semibold text-[var(--lp-green)] underline-offset-4 hover:underline"
          >
            Compare plans in detail
          </Link>
        </div>

        {state === "loading" ? (
          <div role="status" aria-busy="true" className="grid gap-4 md:grid-cols-3">
            <span className="sr-only">Loading published plans…</span>
            {[0, 1, 2].map((i) => (
              <div key={i} aria-hidden className="lp-card h-64 animate-pulse bg-soft" />
            ))}
          </div>
        ) : state === "error" || plans.length === 0 ? (
          <div role="status" className="lp-card p-6">
            <p className="font-semibold text-ink">Plans are temporarily unavailable</p>
            <p className="mt-2 text-sm text-muted">
              Try again, or ask the team for pricing guidance.
            </p>
            <div className="mt-4 flex gap-4 text-sm font-semibold">
              <button type="button" onClick={retry} className="text-[var(--lp-green)]">
                Try again
              </button>
              <Link href="/contact" className="text-[var(--lp-green)] underline">
                Contact the team
              </Link>
            </div>
          </div>
        ) : (
          <ul className="grid gap-4 md:grid-cols-3">
            {plans.map((plan, index) => {
              const featured = plan.name.toLowerCase() === "growth";
              const free = plan.monthlyPriceCents === 0;
              const Icon = planIcons[index % planIcons.length];
              return (
                <li
                  key={plan.id}
                  className={`relative flex flex-col rounded-2xl border p-5 ${
                    featured
                      ? "border-[var(--leaf)] bg-[var(--lp-tint)] shadow-[0_24px_50px_-30px_rgba(23,120,75,0.6)]"
                      : "border-line bg-surface"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="flex items-center gap-2 text-[15px] font-semibold text-ink">
                      <Icon className="h-[1.05rem] w-[1.05rem] text-[var(--lp-green)]" />
                      {plan.name}
                    </h3>
                    {featured ? (
                      <span className="rounded-full bg-[var(--leaf)]/60 px-2.5 py-0.5 text-[11px] font-semibold text-[var(--leaf-ink)]">
                        Most popular
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-3 flex items-baseline gap-1.5">
                    <span className="font-display text-[1.75rem] font-bold tracking-tight text-ink">
                      {formatPrice(plan)}
                    </span>
                    {free ? null : (
                      <span className="text-xs text-muted">/ workspace / month</span>
                    )}
                  </p>
                  <p className="mt-1 min-h-10 text-[13px] leading-5 text-muted">
                    {plan.description}
                  </p>

                  <ul className="mt-3 flex-1 space-y-2">
                    {highlights(plan).map((line) => (
                      <li key={line} className="flex gap-2 text-[13px] text-ink/85">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--lp-green)]" strokeWidth={2.75} />
                        {line}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={planHref(plan, "/contact")}
                    onClick={() => {
                      if (free) track("organization_signup_clicked", { source: "pricing_plan" });
                    }}
                    className={`mt-5 inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                      featured
                        ? "bg-[var(--forest)] text-white hover:bg-[var(--forest-2)]"
                        : "border border-ink/25 text-ink hover:border-[var(--lp-green)] hover:text-[var(--lp-green)]"
                    }`}
                  >
                    {free ? "Start for free" : `Get ${plan.name}`}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
