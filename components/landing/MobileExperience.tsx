import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Monitor, Smartphone } from "lucide-react";
import { ANDROID_APP_URL } from "../../lib/links";
import { mobileScreens } from "./site-content";
import { Reveal } from "./Reveal";

export function MobileExperience() {
  return (
    <section
      id="mobile"
      aria-labelledby="mobile-heading"
      className="on-band-deep scroll-mt-20 overflow-hidden"
    >
      <div className="shell rhythm">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-14">
          <Reveal>
            <p className="label">On the phone, too</p>
            <h2 id="mobile-heading" className="display-lg mt-6">
              Mentors review from the train.{" "}
              <span className="accent-serif">Not from their inbox.</span>
            </h2>
            <p className="lede mt-5">
              A native Android app with the full five-tab experience for all
              three roles: approvals, submissions, messages, schedule and
              recognition. The same record as the web workspace, not a
              read-only companion.
            </p>

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              <article className="rounded-2xl border border-band-line bg-white/[0.04] p-5">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-mint">
                  <Monitor className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-band-ink">
                  Web workspace
                </h3>
                <p className="mt-2 text-sm leading-6 text-band-muted">
                  The complete Admin, Mentor or Mentee workspace in the browser.
                </p>
                <Link
                  href="/demo?device=web"
                  className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-mint-bright"
                >
                  Open the web demo
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </article>

              <article className="rounded-2xl bg-mint p-5 text-[#04110f]">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/70">
                  <Smartphone className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold">
                  Android app
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#04110f]/70">
                  Native navigation for every role, with the full screen
                  directory.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <Link
                    href="/demo?device=mobile"
                    className="inline-flex items-center gap-2 text-sm font-semibold"
                  >
                    Mobile demo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href={ANDROID_APP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold"
                  >
                    Google Play
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </article>
            </div>
          </Reveal>

          {/* Three real captures, fanned so the middle one leads. */}
          <Reveal delay={0.1}>
            <ul className="flex items-center justify-center gap-3 sm:gap-4">
              {mobileScreens.map((screen, index) => (
                <li
                  key={screen.src}
                  className={`min-w-0 flex-1 ${
                    index === 1 ? "lg:-translate-y-5" : ""
                  }`}
                >
                  <figure>
                    <div className="overflow-hidden rounded-[1.25rem] border border-white/12 bg-black/20 shadow-[0_40px_90px_-45px_rgba(0,0,0,0.9)]">
                      <Image
                        src={screen.src}
                        alt={screen.alt}
                        width={540}
                        height={1050}
                        className="h-auto w-full"
                        unoptimized
                      />
                    </div>
                    <figcaption className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-band-muted">
                      {screen.caption}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
