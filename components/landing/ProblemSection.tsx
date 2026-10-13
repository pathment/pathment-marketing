import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { problem } from "./site-content";
import { Reveal, Stagger, StaggerItem } from "./Reveal";

/**
 * The turn. A deliberately dark, quiet section between the proof band and the
 * product, framing the decay of an unmanaged program as a timeline rather than
 * a bullet list, because the failure is sequential and so the layout is too.
 */
export function ProblemSection() {
  return (
    <section
      id="problem"
      aria-labelledby="problem-heading"
      className="on-band-deep scroll-mt-20 overflow-hidden"
    >
      <div className="shell rhythm">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16">
          <Reveal>
            <p className="label">{problem.label}</p>
            <h2 id="problem-heading" className="display-lg mt-6">
              {problem.title}{" "}
              <span className="accent-serif">{problem.titleAccent}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="lede">{problem.lede}</p>
          </Reveal>
        </div>

        <Stagger className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-8 lg:mt-20">
          {/* The thread that runs through all three failures. */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-[0.4rem] hidden h-px bg-gradient-to-r from-mint/50 via-mint/25 to-transparent md:block"
          />
          {problem.failures.map((failure) => (
            <StaggerItem key={failure.stat} className="relative">
              <span
                aria-hidden
                className="absolute -top-[0.15rem] left-0 hidden h-2 w-2 rounded-full bg-mint md:block"
              />
              <div className="md:pt-10">
                <p className="numeric font-mono text-xs uppercase tracking-[0.18em] text-mint">
                  {failure.stat}
                </p>
                <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-band-ink">
                  {failure.title}
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-band-muted">
                  {failure.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Growthspace's compressed resolve: name the problem, then claim it. */}
        <Reveal className="mt-16 lg:mt-20">
          <div className="grid items-center gap-7 rounded-2xl border border-band-line bg-white/[0.04] p-7 sm:p-9 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
            <p className="font-display text-2xl font-semibold leading-tight tracking-tight text-band-ink sm:text-3xl">
              {problem.resolution.kicker}
            </p>
            <div>
              <p className="text-[15px] leading-7 text-band-muted">
                {problem.resolution.body}
              </p>
              <Link
                href="#workspaces"
                className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-mint-bright"
              >
                See it by role
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
