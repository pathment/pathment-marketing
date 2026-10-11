import Link from "next/link";
import { ArrowRight, ArrowUpRight, MessageCircle } from "lucide-react";
import { Brand } from "./Brand";
import { ANDROID_APP_URL, APP_LOGIN_URL, APP_REGISTER_URL } from "../../lib/links";
import { TrackedLink } from "./TrackedLink";

const explore = [
  ["/#platform", "Platform"],
  ["/demo", "Interactive demo"],
  ["/#how-it-works", "How it works"],
  ["/pricing", "Pricing"],
] as const;

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#061d1a] text-white">
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-brand-500/12 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-10 border-b border-white/12 pb-12 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-brand-300">A clearer way to run the program</p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight sm:text-5xl">People do the growing. Pathment keeps the work, support, and decisions connected.</h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <TrackedLink href="/demo" eventName="demo_started" eventProperties={{ source: "footer" }} className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-300 px-5 py-3.5 text-sm font-semibold text-brand-950 hover:bg-brand-200">Explore Pathment <ArrowRight size={16} /></TrackedLink>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/18 px-5 py-3.5 text-sm font-semibold text-white hover:bg-white/8"><MessageCircle size={16} />Talk to the team</Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-10 lg:grid-cols-[1.4fr_.8fr_.8fr_.8fr]">
          <div className="col-span-2 lg:col-span-1">
            <Brand inverse />
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/58">Mentorship and learning program operations from admission to evidence-backed outcomes.</p>
            <a href={ANDROID_APP_URL} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-300">Get the Android app <ArrowUpRight size={14} /></a>
          </div>
          <nav aria-label="Footer explore">
            <h2 className="mb-4 text-[10px] font-semibold uppercase tracking-[.16em] text-white/40">Explore</h2>
            <ul className="space-y-3 text-sm text-white/68">{explore.map(([href, label]) => <li key={href}><Link href={href} className="hover:text-brand-300">{label}</Link></li>)}</ul>
          </nav>
          <div>
            <h2 className="mb-4 text-[10px] font-semibold uppercase tracking-[.16em] text-white/40">Get started</h2>
            <ul className="space-y-3 text-sm text-white/68">
              <li><TrackedLink href={APP_REGISTER_URL} eventName="organization_signup_clicked" eventProperties={{ source: "footer" }} className="hover:text-brand-300">Create an organization</TrackedLink></li>
              <li><TrackedLink href={APP_LOGIN_URL} eventName="login_clicked" eventProperties={{ source: "footer" }} className="hover:text-brand-300">Sign in</TrackedLink></li>
              <li><Link href="/contact" className="hover:text-brand-300">Pricing guidance</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-[10px] font-semibold uppercase tracking-[.16em] text-white/40">Trust</h2>
            <ul className="space-y-3 text-sm text-white/68"><li><Link href="/privacy" className="hover:text-brand-300">Privacy policy</Link></li><li><Link href="/account-deletion" className="hover:text-brand-300">Delete an account</Link></li><li>Role-based experiences</li><li>Workspace separation</li></ul>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-3 border-t border-white/12 pt-6 text-xs text-white/40 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Pathment. All rights reserved.</p>
          <p>Built around people. Designed for progress.</p>
        </div>
      </div>
    </footer>
  );
}
