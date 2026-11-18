import Image from "next/image";
import Link from "next/link";
import { ArrowRight, GraduationCap, UserCog, Users } from "lucide-react";
import { GooglePlayButton } from "./GooglePlayButton";
import { Reveal } from "./Reveal";

/** The Google Play listing artwork, in store order. */
const storeShots = [
  { src: "/mobile/store/mentor-support.webp", alt: "See who needs support first: the mentor home with the oldest waiting review." },
  { src: "/mobile/store/admin-programme.webp", alt: "Run each programme from one place: the admin Today view with applications waiting." },
  { src: "/mobile/store/sign-in.webp", alt: "Your next step starts here: the Pathment sign-in screen." },
  { src: "/mobile/store/mentee-today.webp", alt: "Know what needs you today: the mentee home with the next move." },
  { src: "/mobile/store/mentee-journey.webp", alt: "See the whole journey clearly: the mentee roadmap progress." },
  { src: "/mobile/store/clan-community.webp", alt: "Keep the clan conversation close: the clan community feed." },
] as const;

/** The three shots fanned in the band, one per role. */
const fan = [
  { shot: storeShots[3], className: "-rotate-[9deg] translate-x-6 translate-y-8", float: "lp-float-slow" },
  { shot: storeShots[0], className: "z-10 scale-[1.08]", float: "lp-float" },
  { shot: storeShots[1], className: "rotate-[9deg] -translate-x-6 translate-y-8", float: "lp-float-slow" },
] as const;

const roles = [
  { icon: UserCog, label: "Admins" },
  { icon: GraduationCap, label: "Mentors" },
  { icon: Users, label: "Mentees" },
] as const;

export function MobileExperience() {
  return (
    <section id="mobile" aria-labelledby="mobile-heading" className="lp-bg scroll-mt-20">
      <div className="shell py-6 lg:py-8">
        <div className="lp-panel relative overflow-hidden rounded-[1.75rem] px-6 py-10 sm:px-10 lg:px-14 lg:py-12">
          <div aria-hidden className="lp-dots pointer-events-none absolute inset-0" />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[var(--leaf)]/15 blur-3xl"
          />

          <div className="relative grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-12">
            <Reveal className="order-2 lg:order-1">
              <ul className="flex items-center justify-center">
                {fan.map(({ shot, className, float }) => (
                  <li key={shot.src} className={`w-[36%] max-w-[13rem] ${className}`}>
                    <div className={float}>
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        width={720}
                        height={1280}
                        unoptimized
                        className="h-auto w-full rounded-[1.25rem] shadow-[0_40px_70px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/15"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            <div className="order-1 lg:order-2">
              <p className="lp-label !text-[#b9ecc9]">On the go</p>
              <h2
                id="mobile-heading"
                className="mt-3 font-display text-[clamp(1.7rem,3vw,2.4rem)] font-semibold leading-[1.12] tracking-[-0.025em] text-white"
              >
                The Android app keeps the program moving.
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-6 text-white/80">
                Stay in the loop, review work, and track progress, anytime,
                anywhere. The same record as the web workspace, for every role.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {roles.map((role) => (
                  <li
                    key={role.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs font-medium text-white/85"
                  >
                    <role.icon className="h-3.5 w-3.5 text-[var(--leaf)]" />
                    {role.label}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
                <GooglePlayButton source="mobile_section" />
                <Link
                  href="/demo?device=mobile"
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--leaf)]"
                >
                  Try it in your browser
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* The full store gallery, drifting slowly; it pauses on hover and
            becomes a plain scroller for reduced motion. */}
        <div className="lp-marquee mt-6 overflow-hidden" aria-label="Pathment Android app screens">
          <ul className="lp-marquee-track flex w-max gap-4 py-2">
            {[...storeShots, ...storeShots].map((shot, index) => (
              <li
                key={`${shot.src}-${index}`}
                aria-hidden={index >= storeShots.length}
                className="w-[9.5rem] shrink-0 sm:w-[11rem]"
              >
                <Image
                  src={shot.src}
                  alt={index >= storeShots.length ? "" : shot.alt}
                  width={720}
                  height={1280}
                  unoptimized
                  className="h-auto w-full rounded-2xl border border-line shadow-[0_18px_40px_-28px_rgba(7,42,32,0.7)] transition-transform duration-300 hover:-translate-y-1.5"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
