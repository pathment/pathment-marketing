import Image from "next/image";
import { ArrowRight, Lock, MonitorSmartphone, PlayCircle, Sprout, UserX } from "lucide-react";
import { APP_REGISTER_URL } from "../../lib/links";
import { HeroActivity } from "./HeroActivity";
import { proof } from "./site-content";
import { TrackedLink } from "./TrackedLink";

/**
 * The hero, built as a single argument:
 *  1. who already trusts it (a real customer, before any claim),
 *  2. the claim,
 *  3. the product, large and flat enough to read, with the Android app and
 *     the review loop in the same frame.
 * The product shot straddles the green band and the page below it, so the
 * hero flows into the proof band instead of ending in a box.
 */
const trust = [
  { icon: UserX, label: "Demo without signing up" },
  { icon: Sprout, label: "Free Community plan" },
  { icon: MonitorSmartphone, label: "Web and Android" },
  { icon: Lock, label: "We never sell your data" },
] as const;

export function Hero() {
  const members = proof.metrics[0];

  return (
    <section className="lp-bg relative isolate overflow-hidden">
      {/* Green field, stopping partway down the product shot. */}
      <div aria-hidden className="lp-forest absolute inset-x-0 top-0 -z-10 h-[calc(100%-9rem)] sm:h-[calc(100%-13rem)] lg:h-[calc(100%-17rem)]">
        <div className="lp-dots absolute inset-0" />
        <div className="lp-hero-beam absolute inset-0" />
      </div>

      <div className="shell pt-14 text-center sm:pt-16 lg:pt-20">
        <div className="hero-rise mx-auto max-w-5xl">
          <a
            href="#proof"
            className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] py-1 pl-1 pr-3.5 text-[13px] text-white/85 backdrop-blur transition-colors hover:border-white/30 hover:bg-white/10"
          >
            <Image
              src="/brand/dev-weekends.png"
              alt=""
              width={56}
              height={56}
              className="h-7 w-7 rounded-full ring-1 ring-white/40"
            />
            <span>
              <strong className="font-semibold text-white">Dev Weekends</strong>{" "}
              runs its fellowship on Pathment
              <span className="mx-2 text-white/30">·</span>
              <span className="numeric text-white">{members.value}</span> members
            </span>
            <ArrowRight className="h-3.5 w-3.5 text-[var(--leaf)] transition-transform group-hover:translate-x-0.5" />
          </a>

          <h1 className="mx-auto mt-7 max-w-[15ch] font-display text-[clamp(2.4rem,5.6vw,4.6rem)] font-bold leading-[1.02] tracking-[-0.045em] text-white sm:max-w-none">
            Run mentorship programs
            <br className="hidden sm:block" /> that{" "}
            <span className="font-serif text-[1.1em] font-normal italic tracking-[-0.02em] text-[var(--leaf)]">
              actually deliver.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-7 text-white/75 sm:text-lg">
            Applications, mentor matching, learning roadmaps, reviews and
            certificates, on one record for admins, mentors and mentees.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <TrackedLink
              href="/demo"
              eventName="demo_started"
              eventProperties={{ source: "hero" }}
              className="lp-btn-leaf w-full !px-6 !py-3.5 sm:w-auto"
            >
              <PlayCircle className="h-[1.15rem] w-[1.15rem]" />
              Explore live demo
            </TrackedLink>
            <TrackedLink
              href={APP_REGISTER_URL}
              eventName="organization_signup_clicked"
              eventProperties={{ source: "hero" }}
              className="lp-btn-ghost group w-full !px-6 !py-3.5 sm:w-auto"
            >
              Start free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </TrackedLink>
          </div>
          {/* Objections answered before the first scroll. */}
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] text-white/70">
            {trust.map((item) => (
              <li key={item.label} className="inline-flex items-center gap-1.5">
                <item.icon className="h-3.5 w-3.5 text-[var(--leaf)]" />
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        {/* The stage */}
        <div className="lp-stage-rise relative mx-auto mt-14 max-w-[68rem] pb-10 sm:mt-16 lg:pb-16">
          <figure className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#0d1512] p-1.5 shadow-[0_60px_120px_-50px_rgba(0,0,0,0.85)] ring-1 ring-black/5 sm:rounded-[1.4rem]">
            <div className="flex items-center gap-3 px-3 py-2 sm:py-2.5">
              <div className="flex gap-1.5" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              </div>
              <span className="mx-auto hidden truncate rounded-md bg-white/[0.07] px-3 py-1 font-mono text-[10.5px] text-white/50 sm:block">
                app.pathment.me/w/pathment-demo/overview
              </span>
              <span className="w-10" aria-hidden />
            </div>
            <div className="overflow-hidden rounded-xl bg-white">
              <Image
                src="/product/admin-dashboard-framed.webp"
                alt="Pathment admin overview: active mentees, clans needing support, pending approvals, open roadblocks and completion distribution."
                width={1408}
                height={989}
                priority
                unoptimized
                className="h-auto w-full"
              />
            </div>
          </figure>

          {/* The review loop, across all three roles. */}
          <div className="lp-float-slow absolute -left-10 top-[22%] z-20 hidden lg:block xl:-left-20">
            <HeroActivity />
          </div>

          {/* The same record on Android. */}
          <div className="lp-float absolute -bottom-2 -right-2 z-20 w-[24%] max-w-[13.5rem] sm:-right-6 lg:-right-12 lg:bottom-4">
            <div className="lp-phone">
              <Image
                src="/mobile/hero-mentor-home.webp"
                alt="The same program on the Pathment Android app: the mentor home showing who has waited longest for a review."
                width={600}
                height={1285}
                unoptimized
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
