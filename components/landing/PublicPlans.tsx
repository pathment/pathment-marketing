'use client';

import { useEffect, useState } from 'react';

interface Plan {
  id: string; name: string; description: string | null; currency: string;
  monthlyPriceCents: number; limits: Record<string, number>; features: Record<string, boolean>;
}
const labels: Record<string, string> = { aiEvaluation: 'AI evaluation', customBranding: 'Custom branding', customDomain: 'Custom domain', advancedAnalytics: 'Advanced analytics', sso: 'Single sign-on', certificates: 'Certificates' };
const label = (key: string) => labels[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, c => c.toUpperCase());
const endpoint = `${(process.env.NEXT_PUBLIC_API_URL || 'https://api.pathment.me/api').replace(/\/$/, '')}/organizations/plans`;

function isPlan(value: unknown): value is Plan {
  if (!value || typeof value !== 'object') return false;
  const p = value as Plan;
  return typeof p.id === 'string' && typeof p.name === 'string' &&
    (p.description === null || typeof p.description === 'string') &&
    typeof p.currency === 'string' && /^[A-Za-z]{3}$/.test(p.currency) &&
    Number.isInteger(p.monthlyPriceCents) && p.monthlyPriceCents >= 0 &&
    !!p.limits && typeof p.limits === 'object' && !Array.isArray(p.limits) && Object.values(p.limits).every(Number.isFinite) &&
    !!p.features && typeof p.features === 'object' && !Array.isArray(p.features) && Object.values(p.features).every(v => typeof v === 'boolean');
}

export function PublicPlans() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    let current = true;
    async function load() {
      try {
        const response = await fetch(endpoint, { signal: controller.signal, credentials: 'omit', cache: 'no-store' });
        if (!response.ok) throw new Error('Plans unavailable');
        const body = await response.json();
        if (!Array.isArray(body?.data?.plans) || !body.data.plans.every(isPlan)) throw new Error('Invalid plans');
        if (current) { setPlans(body.data.plans); setState('ready'); }
      } catch { if (current) setState('error'); }
      finally { clearTimeout(timeout); }
    }
    void load();
    return () => { current = false; clearTimeout(timeout); controller.abort(); };
  }, [attempt]);
  if (state === 'loading') return <p role="status" className="rounded-xl border border-zinc-200 p-6">Loading published plans…</p>;
  if (state === 'error' || !plans.length) return <div role="status" className="rounded-xl border border-zinc-200 bg-white p-6"><h2 className="font-semibold">{state === 'error' ? 'Plans are temporarily unavailable' : 'No plans are published yet'}</h2><p className="mt-2 text-sm text-zinc-600">We cannot show current prices right now. Try again or use the workspace setup contact below.</p><button onClick={() => { setState('loading'); setAttempt(n => n + 1); }} className="mt-4 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-semibold">Try again</button></div>;
  return <section aria-label="Published plans" className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{plans.map(plan => <article key={plan.id} className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-6"><h2 className="text-xl font-semibold">{plan.name}</h2><p className="mt-2 text-sm text-zinc-600">{plan.description}</p><p className="mt-6 text-3xl font-semibold">{plan.monthlyPriceCents === 0 ? 'Free' : new Intl.NumberFormat('en', { style: 'currency', currency: plan.currency, currencyDisplay: 'code' }).format(plan.monthlyPriceCents / 100)}</p><p className="mt-1 text-sm text-zinc-500">{plan.monthlyPriceCents === 0 ? 'Per workspace' : 'Per workspace / month'}</p><ul className="my-6 space-y-3 text-sm">{Object.entries(plan.limits).map(([key, value]) => <li key={key}>{value < 0 ? 'Unlimited' : value.toLocaleString('en')} {label(key).toLowerCase()}</li>)}{Object.entries(plan.features).filter(([, enabled]) => enabled).map(([key]) => <li key={key}>✓ {label(key)}</li>)}</ul><a href="#getting-started" className="mt-auto rounded-xl border border-brand-200 px-4 py-3 text-center text-sm font-semibold text-brand-700">How to get started with {plan.name}</a></article>)}</section>;
}
