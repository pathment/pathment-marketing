import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { audiences } from "./site-content";
import { Stagger, StaggerItem } from "./Reveal";

/**
 * Audiences framed as the question each one actually arrives with.
 *
 * Four large tinted panels rather than flat colour blocks: each carries its
 * own gradient wash and a pill label, so the section reads as four distinct
 * places to land instead of one four-up swatch. The question is the hero of
 * each panel because that is what a visitor recognises themselves in.
 */
const tones: Record<
  string,
  { panel: string; wash: string; pill: string; question: string; body: string; ring: string }
> = {
  primary: {
    panel: "bg-accent text-white",
    wash: "bg-[radial-gradient(28rem_20rem_at_85%_-10%,rgba(255,255,255,0.22),transparent_70%)]",
    pill: "bg-white/15 text-white",
    question: "text-white",
    body: "text-white/75",
    ring: "border-white/25",
  },
  dark: {
    panel: "bg-band-deep text-band-ink",
    wash: "bg-[radial-gradient(28rem_20rem_at_85%_-10%,rgba(95,217,189,0.2),transparent_70%)]",
    pill: "bg-white/10 text-mint",
    question: "text-band-ink",
    body: "text-band-muted",
    ring: "border-white/20",
  },
  sand: {
    panel: "bg-sand text-ink",
    wash: "bg-[radial-gradient(28rem_20rem_at_85%_-10%,rgba(0,118,108,0.12),transparent_70%)]",
    pill: "bg-accent/10 text-accent",
    question: "text-ink",
    body: "text-muted",
    ring: "border-ink/15",
  },
  mint: {
    panel: "bg-mint text-[#04110f]",
    wash: "bg-[radial-gradient(28rem_20rem_at_85%_-10%,rgba(255,255,255,0.45),transparent_70%)]",
    pill: "bg-[#04110f]/10 text-[#04110f]",
    question: "text-[#04110f]",
    body: "text-[#04110f]/70",
    ring: "border-[#04110f]/20",
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
        <div className="max-w-4xl">
          <p className="label">Who runs on Pathment</p>
          <h2 id="audiences-heading" className="display-lg mt-6">
            Different programs. The same{" "}
            <span className="accent-serif">unanswered question.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-[1.6] tracking-[-0.01em]">
            <span className="text-ink">
              Every program lead arrives with a version of the same sentence.
            </span>{" "}
            <span className="text-muted">
              Find yours and we will show you how the workspace is set up for
              it.
            </span>
          </p>
        </div>

        <Stagger className="mt-12 grid gap-4 md:grid-cols-2 lg:mt-16">
          {audiences.map((audience) => {
            const tone = tones[audience.tone] ?? tones.sand;
            return (
              <StaggerItem key={audience.id} className="h-full">
                <Link
                  href="/contact"
                  className={`group relative flex h-full flex-col justify-between gap-12 overflow-hidden rounded-3xl p-8 transition-transform duration-300 hover:-translate-y-1 sm:p-10 ${tone.panel}`}
                >
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute inset-0 ${tone.wash}`}
                  />
                  <div className="relative">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] ${tone.pill}`}
                    >
                      {audience.title}
                    </span>
                    <p
                      className={`mt-7 max-w-md font-display text-[1.6rem] font-semibold leading-[1.15] tracking-[-0.03em] sm:text-[1.9rem] ${tone.question}`}
                    >
                      {audience.question}
                    </p>
                  </div>
                  <div className="relative flex items-end justify-between gap-6">
                    <p className={`max-w-sm text-sm leading-6 ${tone.body}`}>
                      {audience.body}
                    </p>
                    <span
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${tone.ring}`}
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
