import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { capabilities } from "./site-content";
import { capabilityDiagrams } from "./CapabilityDiagrams";
import { Stagger, StaggerItem } from "./Reveal";

/**
 * Eight capabilities as hairline-divided columns, each with its own line
 * diagram and a FIG index.
 *
 * This replaced a grid of bordered cards with icons in rounded squares. Cards
 * made eight equal boxes shout equally and said nothing about the mechanism;
 * the drawing does the explaining and the hairlines carry the structure, so
 * the page gets quieter and more specific at the same time.
 */
export function CapabilityGrid() {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="scroll-mt-20 border-b border-line bg-canvas"
    >
      <div className="shell rhythm">
        <div className="max-w-4xl">
          <p className="label">What is inside</p>
          <h2 id="capabilities-heading" className="display-lg mt-6">
            Everything a program needs, and{" "}
            <span className="accent-serif">nothing it does not.</span>
          </h2>
          {/* Two-tone paragraph: the claim at full contrast, the qualifier
              stepped back. Carries an editorial voice without a second face. */}
          <p className="mt-6 max-w-2xl text-lg leading-[1.6] tracking-[-0.01em]">
            <span className="text-ink">
              Pathment is not a course platform with mentoring bolted on.
            </span>{" "}
            <span className="text-muted">
              Each piece below exists because a real program breaks without it,
              and every one of them writes to the same record.
            </span>
          </p>
          <Link
            href="/demo"
            className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent"
          >
            Walk through all 68 screens
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <Stagger
          className="mt-16 grid border-t border-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-4"
          stagger={0.04}
        >
          {capabilities.map((capability, index) => {
            const Diagram = capabilityDiagrams[capability.icon];
            return (
              <StaggerItem
                key={capability.title}
                /* Dividers come from the grid itself so there is one hairline
                   between neighbours rather than two stacked borders. */
                className="border-b border-line px-0 py-8 sm:odd:border-r sm:odd:pr-7 sm:even:pl-7 lg:border-r lg:px-7 lg:odd:pr-7 lg:even:pl-7 lg:last:border-r-0 lg:[&:nth-child(4)]:border-r-0 lg:[&:nth-child(1)]:pl-0 lg:[&:nth-child(5)]:pl-0"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted/70">
                  Fig {String(index + 1).padStart(2, "0")}
                </p>
                {Diagram ? (
                  <div className="mt-5 h-24 text-ink/70">
                    <Diagram />
                  </div>
                ) : null}
                <h3 className="mt-6 font-display text-lg font-semibold tracking-tight text-ink">
                  {capability.title}
                </h3>
                <p className="mt-2.5 text-[14px] leading-6 text-muted">
                  {capability.body}
                </p>
              </StaggerItem>
            );
          })}
        </Stagger>

        <p className="mt-10 max-w-3xl text-sm leading-6 text-muted">
          AI is bring-your-own-key and works with any OpenAI-compatible provider
          such as OpenAI, Anthropic, Groq or OpenRouter. It drafts roadmaps and
          assists evaluation; a mentor still makes every approval.
        </p>
      </div>
    </section>
  );
}
