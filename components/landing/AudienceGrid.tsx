import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { audiences } from "./site-content";
import { Stagger, StaggerItem } from "./Reveal";

/**
 * Audiences framed as the question each one actually arrives with, rather than
 * as a list of segments. Four colour-blocked tiles so the section reads at a
 * glance on the scroll-through.
 */
const tones: Record<string, { tile: string; question: string; body: string; label: string }> = {
  primary: {
    tile: "bg-accent text-white",
    question: "text-white",
    body: "text-white/75",
    label: "text-white/60",
  },
  dark: {
    tile: "bg-band-deep text-band-ink",
    question: "text-band-ink",
    body: "text-band-muted",
    label: "text-mint",
  },
  sand: {
    tile: "bg-sand text-ink",
    question: "text-ink",
    body: "text-muted",
    label: "text-accent",
  },
  mint: {
    tile: "bg-mint text-[#04110f]",
    question: "text-[#04110f]",
    body: "text-[#04110f]/70",
    label: "text-[#04110f]/55",
  },
};

export function AudienceGrid() {
  return (
    <section
      id="audiences"
      aria-labelledby="audiences-heading"
      className="scroll-mt-20 border-b border-line bg-surface"
    >
      <div className="shell rhythm">
        <div className="max-w-3xl">
          <p className="label">Who runs on Pathment</p>
          <h2 id="audiences-heading" className="display-lg mt-6">
            Different programs. The same{" "}
            <span className="accent-serif">unanswered question.</span>
          </h2>
        </div>

        <Stagger className="mt-12 grid gap-4 md:grid-cols-2 lg:mt-16">
          {audiences.map((audience) => {
            const tone = tones[audience.tone] ?? tones.sand;
            return (
              <StaggerItem key={audience.id}>
                <Link
                  href="/contact"
                  className={`group flex h-full flex-col justify-between gap-10 rounded-2xl p-7 transition-transform duration-300 hover:-translate-y-1 sm:p-9 ${tone.tile}`}
                >
                  <div>
                    <p
                      className={`font-mono text-[10px] uppercase tracking-[0.18em] ${tone.label}`}
                    >
                      {audience.title}
                    </p>
                    <p
                      className={`mt-5 font-display text-2xl font-semibold leading-[1.18] tracking-tight sm:text-[1.7rem] ${tone.question}`}
                    >
                      {audience.question}
                    </p>
                  </div>
                  <div className="flex items-end justify-between gap-6">
                    <p className={`max-w-sm text-sm leading-6 ${tone.body}`}>
                      {audience.body}
                    </p>
                    <span
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-current/25 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
