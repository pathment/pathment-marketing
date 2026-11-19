import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  EyeOff,
  KeyRound,
  Lock,
  ShieldCheck,
  Sparkles,
  Trash2,
} from "lucide-react";
import { Reveal } from "./Reveal";

/*
 * Only claims the product and the privacy policy already make. Do not add
 * certifications, hosting regions or integrations here until they are true.
 */
const trust = [
  {
    icon: ShieldCheck,
    title: "Access by role",
    body: "Admins, mentors and mentees each see what their role needs, and nothing more.",
  },
  {
    icon: KeyRound,
    title: "Two-factor sign-in",
    body: "Protect admin and mentor accounts with a second factor.",
  },
  {
    icon: Lock,
    title: "Encrypted in transit",
    body: "Every connection to the workspace is encrypted.",
  },
  {
    icon: EyeOff,
    title: "Never sold",
    body: "We do not sell personal information or use it to build advertising profiles.",
  },
  {
    icon: Trash2,
    title: "Yours to export or delete",
    body: "Ask for a copy of your data, or have an account deleted, at any time.",
  },
  {
    icon: Sparkles,
    title: "Your AI key, your provider",
    body: "AI runs on the provider you choose. Mentors make every decision.",
  },
] as const;

/**
 * Real releases from the product changelog. Keep this to the latest four or
 * five and refresh it when something user-visible ships.
 */
const shipped = [
  { date: "Nov 18, 2026", title: "Audio answers and sections in assessments" },
  { date: "Nov 18, 2026", title: "Each applicant gets the assessment for their level" },
  { date: "Nov 17, 2026", title: "Video interviews with proctoring and screen sharing" },
  { date: "Nov 17, 2026", title: "Approve several submissions at once from clan review" },
  { date: "Nov 16, 2026", title: "AI intake review that reads an applicant's GitHub" },
] as const;

export function TrustAndShipped() {
  return (
    <section id="trust" aria-labelledby="trust-heading" className="lp-bg scroll-mt-20">
      <div className="shell grid gap-6 py-16 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:py-24">
        <Reveal>
          <div className="lp-card h-full p-6 sm:p-8">
            <p className="lp-label">Trust & privacy</p>
            <h2 id="trust-heading" className="lp-heading mt-3 text-[clamp(1.6rem,2.6vw,2.1rem)]">
              Your program&apos;s data stays yours.
            </h2>
            <ul className="mt-7 grid gap-x-6 gap-y-5 sm:grid-cols-2">
              {trust.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[var(--lp-tint)] text-[var(--lp-green)]">
                    <item.icon className="h-[1.05rem] w-[1.05rem]" />
                  </span>
                  <span>
                    <span className="block text-[14px] font-semibold text-ink">{item.title}</span>
                    <span className="mt-0.5 block text-[13px] leading-5 text-muted">{item.body}</span>
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href="/privacy"
              className="group mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--lp-green)]"
            >
              Read the privacy policy
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="lp-panel h-full rounded-2xl p-6 sm:p-8">
            <p className="lp-label !text-[#b9ecc9]">Recently shipped</p>
            <h3 className="mt-3 font-display text-[1.45rem] font-semibold leading-tight tracking-[-0.02em] text-white">
              Built every week, with the programs that use it.
            </h3>
            <ol className="relative mt-7 space-y-5 border-l border-white/15 pl-5">
              {shipped.map((item, index) => (
                <li key={item.title} className="relative">
                  <span
                    aria-hidden
                    className={`absolute -left-[1.6rem] top-1 grid h-3 w-3 place-items-center rounded-full ${
                      index === 0 ? "lp-pulse-ring bg-[var(--leaf)]" : "bg-white/30"
                    }`}
                  />
                  <p className="numeric text-[11px] font-medium uppercase tracking-[0.12em] text-white/50">
                    {item.date}
                  </p>
                  <p className="mt-1 flex items-start gap-2 text-[14px] leading-5 text-white/90">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--leaf)]" />
                    {item.title}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
