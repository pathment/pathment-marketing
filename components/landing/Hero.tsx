import { ArrowRight, Play, Check } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="hero-section overflow-hidden pb-10 sm:pb-14">
      <div className="mx-auto max-w-7xl px-5 pt-14 sm:px-8 sm:pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="eyebrow justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" /> A little
            direction. A lot of possibility.
          </p>
          <h1 className="mt-6 font-display text-[clamp(2.65rem,5.7vw,5rem)] leading-[1.06] font-semibold tracking-[-0.055em] text-ink">
            Help people grow.
            <br />
            <span className="text-accent">Give mentorship a home.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
            Turn a shared ambition into a clear learning journey. Bring your
            mentors, roadmaps, reviews, and community together in one place.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a className="primary-button" href="#request-access">
              Build your mentorship program <ArrowRight size={17} />
            </a>
            <a className="secondary-button" href="#product-tour">
              <Play size={15} /> Take a closer look
            </a>
          </div>
          <p className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted">
            <span className="flex items-center gap-1.5">
              <Check size={14} /> Free Starter plan
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={14} /> Personal setup support
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={14} /> Built for real programs
            </span>
          </p>
        </div>
        <figure className="product-hero-frame mx-auto mt-12 max-w-6xl sm:mt-16">
          <div className="flex items-center justify-between gap-3 border-b border-line bg-surface px-4 py-3 text-[11px] text-muted sm:px-6">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand-500" /> Inside
              Pathment
            </span>
            <span>Mentor workspace</span>
          </div>
          <a
            href="#product-tour"
            aria-label="Explore the real Pathment product screens"
            className="block"
          >
            <Image
              unoptimized
              src="/product/mentor-dashboard.webp"
              alt="The real Pathment mentor dashboard showing review queues, roadblocks, cohort progress, and mentee check-ins."
              width={1424}
              height={900}
              priority
              sizes="(max-width: 768px) 100vw, 1152px"
              className="block h-auto w-full"
            />
          </a>
          <figcaption className="border-t border-line bg-surface px-4 py-3 text-center text-[11px] text-muted">
            Captured from the Pathment app with demo workspace data.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
