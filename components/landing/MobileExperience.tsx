import Link from "next/link";
import { ArrowRight, CheckCircle2, Monitor, Smartphone } from "lucide-react";
import { ANDROID_APP_URL } from "../../lib/links";

export function MobileExperience() {
  return (
    <section id="mobile-app" className="scroll-mt-[4.5rem] bg-brand-950 px-5 py-16 text-white sm:px-8 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-brand-300">Choose how to explore</p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Web workspace or Android app.</h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-brand-100/75">Start with the format your team will use. Switch roles inside the demo without creating an account.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-2xl border border-white/15 bg-white/7 p-5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-brand-200"><Monitor size={20} /></span>
              <h3 className="mt-5 text-lg font-semibold">Web workspace</h3>
              <p className="mt-2 text-sm leading-6 text-brand-100/70">Explore the complete Admin, Mentor, or Mentee workspace.</p>
              <Link href="/demo?device=web" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-200">Open Web demo <ArrowRight size={15} /></Link>
            </article>
            <article className="rounded-2xl bg-brand-100 p-5 text-brand-950">
              <div className="flex items-center justify-between gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-brand-700"><Smartphone size={20} /></span><span className="text-[10px] font-semibold uppercase tracking-[.14em] text-brand-700">Admin · Mentor · Mentee</span></div>
              <h3 className="mt-5 text-lg font-semibold">Android app</h3>
              <p className="mt-2 text-sm leading-6 text-brand-900/75">Use the native five-tab experience and open every role screen.</p>
              <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2"><Link href="/demo?device=mobile" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-800">Open mobile demo <ArrowRight size={15} /></Link><a href={ANDROID_APP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-800"><CheckCircle2 size={14} />Google Play</a></div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
