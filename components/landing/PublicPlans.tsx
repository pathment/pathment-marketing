"use client";

import { useEffect, useState } from "react";
import { Check, ArrowRight, Users, Layers, Network } from "lucide-react";
import Link from "next/link";
import { APP_REGISTER_URL } from "../../lib/links";
import { track } from "../../lib/analytics";

export interface Plan {
  id: string;
  key?: string;
  name: string;
  description: string | null;
  currency: string;
  monthlyPriceCents: number;
  annualPriceCents?: number;
  limits: Record<string, number>;
  features: Record<string, boolean>;
}
const labels: Record<string, string> = {
  aiEvaluation: "AI evaluation",
  customBranding: "Custom branding",
  customDomain: "Custom domain",
  advancedAnalytics: "Advanced analytics",
  sso: "Single sign-on",
  certificates: "Certificates",
};
/** Plans are billed on participants (mentees); mentors and admins are free. */
const limitLabels: Record<string, string> = { members: "participants" };
export const limitLabel = (key: string) =>
  limitLabels[key] ?? key.replace(/([A-Z])/g, " $1").toLowerCase();

export const isFreePlan = (plan: Plan) =>
  !plan.monthlyPriceCents && !Number(plan.annualPriceCents || 0);

/** The plan most programs should start on; highlighted in every list. */
export const isFeaturedPlan = (plan: Plan) =>
  plan.key ? plan.key === "program" : plan.name.toLowerCase() === "program";

/** Sold on an annual contract, so it gets "Talk to us" instead of a cart. */
export const isContractPlan = (plan: Plan) => plan.key === "institution";

export const label = (key: string) =>
  labels[key] ||
  key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
const endpoint = "/api/plans";

function isPlan(value: unknown): value is Plan {
  if (!value || typeof value !== "object") return false;
  const p = value as Plan;
  return (
    typeof p.id === "string" &&
    typeof p.name === "string" &&
    (p.description === null || typeof p.description === "string") &&
    typeof p.currency === "string" &&
    /^[A-Za-z]{3}$/.test(p.currency) &&
    Number.isInteger(p.monthlyPriceCents) &&
    p.monthlyPriceCents >= 0 &&
    !!p.limits &&
    typeof p.limits === "object" &&
    !Array.isArray(p.limits) &&
    Object.values(p.limits).every(Number.isFinite) &&
    !!p.features &&
    typeof p.features === "object" &&
    !Array.isArray(p.features) &&
    Object.values(p.features).every((v) => typeof v === "boolean")
  );
}

/** Loads the published catalogue from /api/plans, with a retry handle. */
export function usePublishedPlans(initialPlans?: Plan[] | null) {
  const [plans, setPlans] = useState<Plan[]>(initialPlans ?? []);
  // Server-rendered plans skip the first client fetch; a retry always fetches.
  const [hadInitialPlans] = useState(Boolean(initialPlans?.length));
  const [state, setState] = useState<"loading" | "ready" | "error">(
    initialPlans?.length ? "ready" : "loading",
  );
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    if (attempt === 0 && hadInitialPlans) return;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    let current = true;
    async function load() {
      try {
        const response = await fetch(endpoint, {
          signal: controller.signal,
          credentials: "omit",
          cache: "no-store",
        });
        if (!response.ok) throw new Error("Plans unavailable");
        const body = await response.json();
        if (!Array.isArray(body?.data?.plans) || !body.data.plans.every(isPlan))
          throw new Error("Invalid plans");
        if (current) {
          setPlans(body.data.plans);
          setState("ready");
        }
      } catch {
        if (current) setState("error");
      } finally {
        clearTimeout(timeout);
      }
    }
    void load();
    return () => {
      current = false;
      clearTimeout(timeout);
      controller.abort();
    };
  }, [attempt, hadInitialPlans]);
  const retry = () => {
    setState("loading");
    setAttempt((n) => n + 1);
  };
  return { plans, state, retry };
}

/** Where a plan's call to action goes: signup for free, a conversation otherwise. */
export function planHref(plan: Plan, setupHref: string) {
  const [base, hash] = setupHref.split("#");
  return isFreePlan(plan)
    ? APP_REGISTER_URL
    : `${base || "/contact"}?plan=${encodeURIComponent(plan.name)}${hash ? `#${hash}` : ""}`;
}

const money = (plan: Plan, cents: number) =>
  new Intl.NumberFormat("en", {
    style: "currency",
    currency: plan.currency,
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);

/**
 * How a plan's price reads. A plan with an annual price is sold yearly, so the
 * headline is its monthly equivalent ("$249 / month, billed yearly") with the
 * month-to-month price as a note; a contract plan shows its yearly floor.
 */
export function priceParts(plan: Plan): { amount: string; unit: string; note: string } {
  const annual = Number(plan.annualPriceCents || 0);
  if (!plan.monthlyPriceCents && !annual) return { amount: "Free", unit: "forever", note: "" };
  if (isContractPlan(plan) && annual)
    return { amount: `From ${money(plan, annual)}`, unit: "/ year", note: "Annual contract" };
  if (annual)
    return {
      amount: money(plan, Math.round(annual / 12)),
      unit: "/ month, billed yearly",
      note: plan.monthlyPriceCents ? `or ${money(plan, plan.monthlyPriceCents)} month to month` : "",
    };
  return { amount: money(plan, plan.monthlyPriceCents), unit: "/ month", note: "" };
}

/** Kept for callers that want a single string. */
export function formatPrice(plan: Plan) {
  return priceParts(plan).amount;
}

export function PublicPlans({
  setupHref = "/pricing#getting-started",
}: {
  setupHref?: string;
}) {
  const { plans, state, retry } = usePublishedPlans();
  if (state === "loading")
    return (
      <div role="status" aria-busy="true">
        <span className="sr-only">Loading published plans…</span>
        <div aria-hidden="true" className="grid overflow-hidden rounded-[2rem] border border-line md:grid-cols-2 xl:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="min-h-[590px] border-line bg-surface p-8 md:border-l md:first:border-l-0"
            >
              <div className="h-3 w-2/3 rounded bg-soft" />
              <div className="mt-8 h-7 w-1/2 rounded bg-soft" />
              <div className="mt-5 h-16 rounded bg-soft" />
              <div className="mt-8 h-12 w-1/2 rounded bg-soft" />
              <div className="mt-8 h-11 rounded bg-soft" />
              <div className="mt-10 h-28 rounded bg-soft" />
            </div>
          ))}
        </div>
      </div>
    );
  if (state === "error" || !plans.length)
    return (
      <div
        role="status"
        className="rounded-xl border border-line bg-surface p-6"
      >
        <h2 className="font-semibold">
          {state === "error"
            ? "Plans are temporarily unavailable"
            : "No plans are published yet"}
        </h2>
        <p className="mt-2 min-h-12 text-sm leading-6 text-muted">
          We cannot show current prices right now. Try again or contact our team
          for pricing guidance.
        </p>
        <button
          onClick={retry}
          className="mt-4 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-semibold"
        >
          Try again
        </button>
        <Link
          href="/contact"
          className="ml-4 text-sm font-semibold text-accent underline"
        >
          Contact the team
        </Link>
      </div>
    );
  return (
    <section
      aria-label="Published plans"
      className="grid items-stretch overflow-hidden rounded-[2rem] border border-line bg-surface shadow-[0_32px_90px_-65px_rgba(7,61,59,.7)] md:grid-cols-2 xl:grid-cols-4"
    >
      {plans.map((plan, index) => {
        const featured = isFeaturedPlan(plan);
        const free = isFreePlan(plan);
        const contract = isContractPlan(plan);
        const price = priceParts(plan);
        const href = planHref(plan, setupHref);
        return (
          <article
            key={plan.id}
            className={`relative flex flex-col overflow-hidden p-6 lg:p-7 ${index ? "border-t border-line md:border-l xl:border-t-0" : ""} ${featured ? "bg-[linear-gradient(155deg,#0b514a_0%,#073d3b_60%,#062d29_100%)] text-white" : "bg-surface text-ink"}`}
          >
            {featured ? <div className="absolute right-5 top-5 rounded-full bg-[#8fe0ca] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[.14em] text-[#073d3b]">Most popular</div> : null}
            <p
              className={`mb-5 text-[10px] font-semibold uppercase tracking-[.15em] ${featured ? "text-[#b9deca]" : "text-accent"}`}
            >
              {free
                ? "Start a pilot"
                : featured
                  ? "For one program"
                  : contract
                    ? "For institutions"
                    : "For training providers"}
            </p>
            <div className="flex items-end justify-between gap-3"><h2 className="text-2xl font-semibold tracking-tight">{plan.name}</h2><span className={`font-mono text-[10px] ${featured ? "text-white/35" : "text-muted"}`}>0{index + 1}</span></div>
            <p
              className={`mt-3 min-h-16 md:min-h-24 lg:min-h-16 text-sm leading-6 ${featured ? "text-white/70" : "text-muted"}`}
            >
              {plan.description}
            </p>
            <div className="my-7">
              <p className={`font-display font-semibold tracking-tight ${contract ? "text-3xl" : "text-4xl lg:text-[2.6rem]"}`}>
                {price.amount}
              </p>
              <p
                className={`mt-2 text-xs ${featured ? "text-white/60" : "text-muted"}`}
              >
                {free ? "Per workspace" : `${plan.currency.toUpperCase()} ${price.unit}`}
                {price.note ? <span className="block">{price.note}</span> : null}
              </p>
            </div>
            <Link
              href={href}
              onClick={() => {
                if (free) track("organization_signup_clicked", { source: "pricing_plan" });
              }}
              className={`mb-7 inline-flex items-center justify-between gap-2 rounded-xl px-4 py-3.5 text-sm font-semibold ${featured ? "bg-[#d9edbd] text-[#183a37] hover:bg-[#e4f3d0]" : "border border-line bg-soft text-accent hover:border-brand-300"}`}
            >
              {free
                ? "Create an organization"
                : contract
                  ? "Talk to us"
                  : `Start with ${plan.name}`}
              <ArrowRight size={15} />
            </Link>
            <div className={`mb-6 space-y-3 border-y py-5 ${featured ? "border-white/12" : "border-line"}`}>
              {Object.entries(plan.limits).map(([key, value]) => {
                const Icon =
                  key === "members"
                    ? Users
                    : key === "programs"
                      ? Layers
                      : Network;
                return (
                  <div key={key} className="flex items-center gap-2.5 text-sm">
                    <Icon
                      size={16}
                      className={featured ? "text-[#b9deca]" : "text-accent"}
                    />
                    <span>
                      <strong className="font-semibold">
                        {value < 0 ? "Unlimited" : value.toLocaleString("en")}
                      </strong>{" "}
                      {limitLabel(key)}
                    </span>
                  </div>
                );
              })}
            </div>
            <ul
              className={`space-y-3 text-sm ${featured ? "text-white/80" : "text-muted"}`}
            >
              {Object.entries(plan.features)
                .filter(([, enabled]) => enabled)
                .map(([key]) => (
                  <li key={key} className="flex items-center gap-2">
                    <Check
                      size={15}
                      className={featured ? "text-[#d9edbd]" : "text-accent"}
                    />
                    {label(key)}
                  </li>
                ))}
            </ul>
          </article>
        );
      })}
    </section>
  );
}
