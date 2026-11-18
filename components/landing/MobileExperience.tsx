import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GooglePlayButton } from "./GooglePlayButton";
import { Reveal } from "./Reveal";

/** Real screens from the Google Play listing, one per role. */
const phones = [
  {
    src: "/mobile/play-mentee-home.webp",
    alt: "Pathment Android mentee home: the next move on the roadmap and points against pace.",
    className: "-rotate-[8deg] translate-y-4",
  },
  {
    src: "/mobile/play-mentor-review.webp",
    alt: "Pathment Android mentor review queue, ordered by who has waited longest.",
    className: "z-10 -translate-y-3 scale-[1.06]",
  },
  {
    src: "/mobile/play-admin-today.webp",
    alt: "Pathment Android admin today view with applications waiting on a decision.",
    className: "rotate-[8deg] translate-y-6",
  },
] as const;

export function MobileExperience() {
  return (
    <section id="mobile" aria-labelledby="mobile-heading" className="scroll-mt-20 bg-surface">
      <div className="shell py-6 lg:py-8">
        <div className="lp-panel relative overflow-hidden rounded-[1.75rem] px-6 py-10 sm:px-10 lg:px-14 lg:py-0">
          {/* Accent strokes, as in the store artwork. */}
          <svg
            viewBox="0 0 40 30"
            aria-hidden
            className="absolute left-8 top-6 hidden h-8 w-10 text-[var(--leaf)] lg:block"
          >
            <path d="M6 22 L2 8 M16 18 L16 2 M26 22 L34 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>

          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-12">
            <Reveal className="order-2 lg:order-1">
              <ul className="flex items-end justify-center gap-2 pt-4 sm:gap-4 lg:pb-0 lg:pt-10">
                {phones.map((phone) => (
                  <li key={phone.src} className={`w-[31%] max-w-[11rem] ${phone.className}`}>
                    <div className="lp-phone">
                      <Image
                        src={phone.src}
                        alt={phone.alt}
                        width={600}
                        height={1285}
                        unoptimized
                        className="h-auto w-full"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            <div className="order-1 lg:order-2 lg:py-14">
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
      </div>
    </section>
  );
}
