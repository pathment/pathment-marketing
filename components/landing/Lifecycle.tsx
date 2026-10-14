import { ArrowRight, Check } from "lucide-react";
import { lifecycle } from "./site-content";
import { Reveal, Stagger, StaggerItem } from "./Reveal";
import { TrackedLink } from "./TrackedLink";

/**
 * The four moves of a program, on the deep green band. Numbered rather than
 * iconed: the point is that these happen in order, and that each one hands
 * something to the next.
 */
export function Lifecycle() {
  return (
    <section
      id="lifecycle"
      aria-labelledby="lifecycle-heading"
      className="on-band scroll-mt-20 overflow-hidden"
    >
      <div className="shell rhythm">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end lg:gap-16">
          <div>
            <p className="label">How it works</p>
            <h2 id="lifecycle-heading" className="display-lg mt-6">
              Set the path once. Keep every handoff{" "}
              <span className="accent-serif">visible.</span>
            </h2>
          </div>
          <p className="lede">
            Four moves from an empty workspace to a defensible outcome. Nothing
            in between relies on someone remembering to send an update.
          </p>
        </div>

        <Stagger className="relative mt-14 grid gap-12 lg:mt-20 lg:grid-cols-4 lg:gap-8">
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-[5.6rem] hidden h-px bg-mint/25 lg:block"
          />
          {lifecycle.map((step) => (
            <StaggerItem key={step.number} className="relative flex h-full flex-col">
              <span className="numeric block font-display text-6xl font-semibold leading-none tracking-[-0.05em] text-mint/35">
                {step.number}
              </span>
              <span
                aria-hidden
                className="relative z-10 mt-6 hidden h-3 w-3 rounded-full bg-mint ring-4 ring-[var(--band)] lg:block"
              />
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-mint lg:mt-7">
                {step.phase}
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-band-ink">
                {step.title}
              </h3>
              <p className="mt-3 text-[15px] leading-7 text-band-muted lg:mb-5">
                {step.body}
              </p>
              <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-band-line px-3 py-1.5 text-xs font-semibold text-band-ink lg:mt-auto lg:pt-0">
                <Check className="h-3.5 w-3.5 text-mint" />
                {step.outcome}
              </span>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-16 lg:mt-20">
          <div className="grid gap-7 border-t border-band-line pt-10 sm:grid-cols-3">
            {[
              [
                "Workspace separation",
                "Each organization keeps its own people, programs and data.",
              ],
              [
                "Role-aware access",
                "People only see the tools and decisions that belong to them.",
              ],
              [
                "Traceable history",
                "Every review and award keeps the evidence it was based on.",
              ],
            ].map(([title, body]) => (
              <div key={title}>
                <h3 className="text-sm font-semibold text-band-ink">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-band-muted">{body}</p>
              </div>
            ))}
          </div>

          <TrackedLink
            href="/demo"
            eventName="demo_started"
            eventProperties={{ source: "lifecycle" }}
            className="btn btn-light mt-10"
          >
            See the whole flow in the demo
            <ArrowRight className="h-4 w-4" />
          </TrackedLink>
        </Reveal>
      </div>
    </section>
  );
}
