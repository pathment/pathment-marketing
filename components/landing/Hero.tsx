import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Play } from "lucide-react";
import { APP_LOGIN_URL, APP_REGISTER_URL } from "../../lib/links";
import { TrackedLink } from "./TrackedLink";

export function Hero() {
  return (
    <section className="hero-section overflow-hidden border-b border-line">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:py-24">
        <div>
          <p className="eyebrow"><span className="h-1.5 w-1.5 rounded-full bg-brand-500" />Mentorship operations, in one place</p>
          <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.7rem,5vw,4.7rem)] leading-[1.04] font-semibold tracking-[-0.055em] text-ink">
            Run mentorship programs without losing track of <span className="text-accent">people, progress, or decisions.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            Pathment helps organizations run fellowships, bootcamps, internships, and employee-development programs—with clear workflows for admins, mentors, and mentees.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <TrackedLink href="/demo" eventName="demo_started" eventProperties={{ source: "hero" }} className="primary-button"><Play size={16} /> Experience Pathment</TrackedLink>
            <TrackedLink href={APP_REGISTER_URL} eventName="organization_signup_clicked" eventProperties={{ source: "hero" }} className="secondary-button">Create your organization <ArrowRight size={16} /></TrackedLink>
          </div>
          <Link href={APP_LOGIN_URL} className="mt-5 inline-block text-sm font-semibold text-ink underline decoration-line underline-offset-4 hover:text-accent">Already use Pathment? Sign in</Link>
          <ul className="mt-8 grid gap-3 text-sm text-muted sm:grid-cols-2">
            {["Explore without an account", "Role-based workspaces", "Evidence-backed reviews", "Program-wide visibility"].map((item) => <li key={item} className="flex items-center gap-2"><CheckCircle2 size={16} className="text-accent" />{item}</li>)}
          </ul>
        </div>
        <div className="relative">
          <div className="absolute -inset-8 -z-10 rounded-full bg-brand-200/30 blur-3xl" />
          <figure className="overflow-hidden rounded-3xl border border-line bg-surface shadow-[0_24px_80px_-35px_#003c3655]">
            <div className="flex items-center justify-between border-b border-line px-5 py-3 text-xs text-muted"><span className="font-semibold text-ink">Pathment program overview</span><span>Fictional demo data</span></div>
            <Image src="/product/admin-dashboard.webp" alt="Pathment admin overview showing program progress, clans needing support, pending approvals, and roadblocks." width={1424} height={900} priority sizes="(max-width: 1024px) 100vw, 55vw" className="h-auto w-full" />
          </figure>
          <div className="absolute -bottom-5 left-5 rounded-2xl border border-brand-200 bg-surface px-4 py-3 shadow-lg-soft sm:left-auto sm:right-5">
            <p className="text-xs font-semibold text-accent">Support signal</p><p className="mt-1 text-sm font-semibold text-ink">2 clans need attention</p>
          </div>
        </div>
      </div>
    </section>
  );
}
