import {
  BarChart3,
  CalendarClock,
  ClipboardCheck,
  ClipboardList,
  Flag,
  MessageSquare,
  Route,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { capabilities } from "./site-content";
import { Stagger, StaggerItem } from "./Reveal";

const icons: Record<string, LucideIcon> = {
  "clipboard-list": ClipboardList,
  route: Route,
  "clipboard-check": ClipboardCheck,
  flag: Flag,
  trophy: Trophy,
  calendar: CalendarClock,
  "message-square": MessageSquare,
  "bar-chart-3": BarChart3,
};

/**
 * Eight capabilities on a six-column grid: two half-width cards lead, six
 * third-width cards follow. Even by design: a ragged bento here would read as
 * a layout bug rather than as deliberate rhythm.
 */
export function CapabilityGrid() {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="scroll-mt-20 border-b border-line bg-canvas"
    >
      <div className="shell rhythm">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end lg:gap-16">
          <div>
            <p className="label">What is inside</p>
            <h2 id="capabilities-heading" className="display-lg mt-6">
              Everything a program needs, and{" "}
              <span className="accent-serif">nothing it does not.</span>
            </h2>
          </div>
          <div>
            <p className="lede">
              Pathment is not a course platform with mentoring bolted on. Each
              piece exists because a real program breaks without it.
            </p>
            <Link
              href="/demo"
              className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent"
            >
              Walk through all 68 screens
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <Stagger
          className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line lg:mt-16 lg:grid-cols-6"
          stagger={0.05}
        >
          {capabilities.map((capability) => {
            const Icon = icons[capability.icon] ?? ClipboardCheck;
            const lead = "span" in capability && Boolean(capability.span);
            return (
              <StaggerItem
                key={capability.title}
                className={`bg-surface p-6 sm:p-7 ${lead ? "lg:col-span-3" : "lg:col-span-2"}`}
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-canvas text-accent">
                  <Icon className="h-5 w-5" />
                </span>
                <h3
                  className={`mt-5 font-display font-semibold tracking-tight text-ink ${
                    lead ? "text-xl" : "text-lg"
                  }`}
                >
                  {capability.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-7 text-muted">
                  {capability.body}
                </p>
              </StaggerItem>
            );
          })}
        </Stagger>

        <p className="mt-8 text-sm text-muted">
          AI is bring-your-own-key and works with any OpenAI-compatible provider
          such as OpenAI, Anthropic, Groq or OpenRouter. It drafts roadmaps and
          assists evaluation; a mentor still makes every approval.
        </p>
      </div>
    </section>
  );
}
