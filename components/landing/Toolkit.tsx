import Image from "next/image";
import type { ReactNode } from "react";
import {
  ArrowRight,
  Building2,
  Check,
  Flag,
  GraduationCap,
  HeartHandshake,
  Sparkles,
  Users,
} from "lucide-react";
import { Reveal } from "./Reveal";

/*
 * A bento of the product's moving parts. Every tile carries a small slice of
 * the real interface, drawn in code so it stays crisp in both themes. People
 * shown are the demo workspace's fictional personas; numbers are illustrative.
 */

function Tile({
  title,
  body,
  children,
  className = "",
  delay = 0,
}: {
  title: string;
  body: string;
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className={`h-full ${className}`}>
      <article className="lp-card group flex h-full flex-col overflow-hidden transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[var(--lp-green)]/30 hover:shadow-[0_30px_60px_-34px_rgba(7,42,32,0.55)]">
        <div className="relative flex-1 overflow-hidden bg-[var(--lp-tint)] p-5">{children}</div>
        <div className="border-t border-line p-5">
          <h3 className="text-[15px] font-semibold text-ink">{title}</h3>
          <p className="mt-1.5 text-[13.5px] leading-[1.55] text-muted">{body}</p>
        </div>
      </article>
    </Reveal>
  );
}

/** A small white surface inside a tile, like a card in the app. */
function Pane({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-xl border border-black/5 bg-white p-3 shadow-[0_10px_24px_-18px_rgba(7,42,32,0.5)] dark:border-white/10 dark:bg-[#111413] ${className}`}
    >
      {children}
    </div>
  );
}

const avatar = (name: string) => `/demo/people/${name}.png`;

function Avatar({ name, size = 22 }: { name: string; size?: number }) {
  return (
    <Image
      src={avatar(name)}
      alt=""
      width={size}
      height={size}
      className="shrink-0 rounded-full object-cover ring-2 ring-white dark:ring-[#111413]"
      style={{ width: size, height: size }}
    />
  );
}

/* --- Vignettes ----------------------------------------------------------- */

function AdmissionsArt() {
  const columns = [
    { label: "Applied", count: 42, people: ["elif-demir", "priya-sharma", "maya-patel"] },
    { label: "Assessed", count: 18, people: ["priya-sharma", "maya-patel"] },
    { label: "Accepted", count: 12, people: ["maya-patel"] },
  ];
  return (
    <div className="grid h-full grid-cols-3 gap-2.5">
      {columns.map((column, index) => (
        <Pane key={column.label} className="flex flex-col">
          <p className="flex items-center justify-between text-[11px] font-semibold text-ink">
            {column.label}
            <span className="numeric rounded-full bg-[var(--lp-tint)] px-1.5 text-[10px] text-[var(--lp-green)]">
              {column.count}
            </span>
          </p>
          <div className="mt-2.5 space-y-1.5">
            {column.people.map((person) => (
              <div key={person} className="flex items-center gap-1.5 rounded-md bg-soft px-1.5 py-1">
                <Avatar name={person} size={16} />
                <span className="h-1.5 flex-1 rounded bg-line" />
                {index === 2 ? <Check className="h-3 w-3 text-[var(--lp-green)]" strokeWidth={3} /> : null}
              </div>
            ))}
          </div>
        </Pane>
      ))}
    </div>
  );
}

function ReviewQueueArt() {
  const queue = [
    { name: "priya-sharma", who: "Priya Sharma", task: "Node module system", wait: "42h", urgent: true },
    { name: "elif-demir", who: "Elif Demir", task: "REST API skeleton", wait: "1d", urgent: true },
    { name: "maya-patel", who: "Maya Patel", task: "Rate limiting", wait: "6h", urgent: false },
    { name: null, who: "Sara Ali", task: "React data fetching", wait: "2h", urgent: false },
  ];
  return (
    <Pane className="h-full">
      <p className="flex items-center justify-between text-[11px] font-semibold text-ink">
        Waiting on you
        <span className="text-[10px] font-medium text-muted">Oldest first</span>
      </p>
      <ul className="mt-3 space-y-2">
        {queue.map((item, index) => (
          <li
            key={item.who}
            className={`rounded-lg border p-2 ${index === 0 ? "border-[var(--lp-green)]/30 bg-[var(--lp-tint)]" : "border-line"}`}
          >
            <div className="flex items-center gap-2">
              {item.name ? (
                <Avatar name={item.name} size={24} />
              ) : (
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--lp-tint)] text-[9px] font-bold text-[var(--lp-green)]">
                  SA
                </span>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11.5px] font-semibold text-ink">{item.who}</p>
                <p className="truncate text-[10.5px] text-muted">{item.task}</p>
              </div>
              <span
                className={`numeric rounded-full px-1.5 py-px text-[10px] font-semibold ${
                  item.urgent ? "bg-[#fdefdc] text-[#a25d0b]" : "bg-soft text-muted"
                }`}
              >
                {item.wait}
              </span>
            </div>
            {index === 0 ? (
              <div className="mt-2 flex gap-1.5">
                <span className="rounded-md bg-[var(--forest)] px-2 py-1 text-[10px] font-semibold text-white">
                  Approve
                </span>
                <span className="rounded-md border border-line px-2 py-1 text-[10px] font-semibold text-ink">
                  Request changes
                </span>
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </Pane>
  );
}

function RoadmapArt() {
  const steps = [
    { label: "Setup", state: "done" },
    { label: "Build", state: "done" },
    { label: "Review", state: "now" },
    { label: "Ship", state: "next" },
  ] as const;
  return (
    <Pane>
      <p className="flex items-center justify-between text-[11px] font-semibold text-ink">
        MERN roadmap
        <span className="numeric text-[10px] text-[var(--lp-green)]">21 of 23</span>
      </p>
      <ol className="relative mt-4 flex justify-between">
        <span aria-hidden className="absolute left-2 right-2 top-[7px] h-0.5 bg-line" />
        <span aria-hidden className="absolute left-2 top-[7px] h-0.5 w-[58%] bg-[var(--lp-green)]" />
        {steps.map((step) => (
          <li key={step.label} className="relative flex flex-col items-center gap-1.5">
            <span
              className={`grid h-4 w-4 place-items-center rounded-full border-2 ${
                step.state === "done"
                  ? "border-[var(--lp-green)] bg-[var(--lp-green)] text-white"
                  : step.state === "now"
                    ? "lp-pulse-ring border-[var(--lp-green)] bg-white dark:bg-[#111413]"
                    : "border-line bg-white dark:bg-[#111413]"
              }`}
            >
              {step.state === "done" ? <Check className="h-2.5 w-2.5" strokeWidth={4} /> : null}
            </span>
            <span className="text-[10px] font-medium text-muted">{step.label}</span>
          </li>
        ))}
      </ol>
    </Pane>
  );
}

function RoadblockArt() {
  return (
    <div className="space-y-2">
      <Pane className="flex items-start gap-2">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-[#fde3e1] text-[#c2410c]">
          <Flag className="h-3.5 w-3.5" />
        </span>
        <div className="min-w-0">
          <p className="text-[11.5px] font-semibold text-ink">Stuck on module resolution</p>
          <p className="text-[10.5px] text-muted">Priya raised a roadblock · 2d</p>
        </div>
      </Pane>
      <div className="flex items-center gap-1.5 pl-1 text-[10.5px] font-medium text-muted">
        <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 dark:bg-[#111413]">
          <Avatar name="aisha-khan" size={14} /> Mentor
        </span>
        <ArrowRight className="h-3 w-3" />
        <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 dark:bg-[#111413]">
          <Avatar name="dana-reyes" size={14} /> Program lead
        </span>
      </div>
    </div>
  );
}

function RecognitionArt() {
  return (
    <div className="flex h-full items-center gap-3">
      <Pane className="flex-1">
        <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--lp-green)]">
          Certificate
        </p>
        <p className="mt-1 [font-family:var(--font-fraunces)] text-[13px] font-semibold text-ink">
          MERN Stack Fellowship
        </p>
        <p className="text-[10.5px] text-muted">Awarded to Maya Patel · 23 tasks approved</p>
      </Pane>
      <div className="flex -space-x-2">
        {["badge-gold", "badge-silver", "badge-bronze"].map((badge) => (
          <Image
            key={badge}
            src={`/demo/brand/${badge}.png`}
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 drop-shadow-md"
          />
        ))}
      </div>
    </div>
  );
}

function InsightsArt() {
  const bars = [
    { label: "0–19%", value: 18 },
    { label: "20–39%", value: 60 },
    { label: "40–59%", value: 100 },
    { label: "60–79%", value: 38 },
    { label: "80–100%", value: 22 },
  ];
  return (
    <Pane>
      <p className="text-[11px] font-semibold text-ink">Completion distribution</p>
      <ul className="mt-2.5 space-y-1.5">
        {bars.map((bar) => (
          <li key={bar.label} className="flex items-center gap-2">
            <span className="numeric w-11 text-[9.5px] text-muted">{bar.label}</span>
            <span className="h-2 flex-1 rounded-full bg-soft">
              <span
                className="lp-bar block h-full rounded-full bg-[var(--lp-green)]"
                style={{ width: `${bar.value}%` }}
              />
            </span>
          </li>
        ))}
      </ul>
    </Pane>
  );
}

function AiArt() {
  const providers = ["OpenAI", "Anthropic", "Groq", "OpenRouter"];
  return (
    <div className="space-y-2">
      <Pane className="flex items-center gap-2">
        <span className="grid h-6 w-6 place-items-center rounded-md bg-[var(--lp-tint)] text-[var(--lp-green)]">
          <Sparkles className="h-3.5 w-3.5" />
        </span>
        <span className="text-[11px] text-ink">
          Draft a roadmap for <strong>backend fundamentals</strong>
        </span>
      </Pane>
      <div className="flex flex-wrap gap-1.5">
        {providers.map((provider) => (
          <span
            key={provider}
            className="rounded-full border border-black/5 bg-white px-2 py-0.5 text-[10px] font-medium text-ink dark:border-white/10 dark:bg-[#111413]"
          >
            {provider}
          </span>
        ))}
      </div>
    </div>
  );
}

const audiences = [
  { icon: GraduationCap, label: "Fellowships & bootcamps" },
  { icon: Building2, label: "Internal L&D" },
  { icon: Users, label: "Universities & career services" },
  { icon: HeartHandshake, label: "Communities & nonprofits" },
] as const;

export function Toolkit() {
  return (
    <section id="capabilities" aria-labelledby="capabilities-heading" className="lp-bg scroll-mt-20">
      <div className="shell py-16 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="lp-label">Everything you need</p>
          <h2
            id="capabilities-heading"
            className="lp-heading mt-3 text-[clamp(1.8rem,3.2vw,2.6rem)]"
          >
            Every step of the program, on one record.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-7 text-muted">
            From the first application to the last certificate, each piece
            already knows about the others. No exports, no copy-paste, no
            chasing.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[auto_auto_auto]">
          <Tile
            className="lg:col-span-2"
            title="Admissions without a spreadsheet"
            body="Shareable apply links and your own assessments. Review applicants side by side, then accept and place them in one step."
          >
            <AdmissionsArt />
          </Tile>
          <Tile
            className="lg:row-span-2"
            delay={0.05}
            title="A review queue ranked by who's waiting"
            body="Mentors open to the person who needs them first. Approve or request changes right on the submitted work."
          >
            <ReviewQueueArt />
          </Tile>
          <Tile
            delay={0.08}
            title="Roadmaps with one obvious next step"
            body="Goals break into milestones and tasks, and the roadmap moves forward when work is approved."
          >
            <RoadmapArt />
          </Tile>
          <Tile
            delay={0.1}
            title="Roadblocks reach the right person"
            body="When someone is stuck they say so, and it travels from mentor to program lead before it becomes a dropout."
          >
            <RoadblockArt />
          </Tile>
          <Tile
            delay={0.05}
            title="Recognition earned from real work"
            body="Points, badges and certificates generated from the approvals that earned them."
          >
            <RecognitionArt />
          </Tile>
          <Tile
            delay={0.08}
            title="Insights for the program lead"
            body="Completion distribution and at-risk signals, so you know where to spend this week."
          >
            <InsightsArt />
          </Tile>
          <Tile
            delay={0.1}
            title="AI with your own key"
            body="Bring any OpenAI-compatible provider. AI drafts roadmaps and evaluations; mentors still make every decision."
          >
            <AiArt />
          </Tile>
        </div>

        {/* Who it is for. Anchored so the Solutions menu has a destination. */}
        <div
          id="audiences"
          className="mt-12 flex scroll-mt-24 flex-col items-center gap-4 border-t border-line pt-8 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8"
        >
          <span className="lp-label !text-[10px]">Built for</span>
          {audiences.map((audience) => (
            <span key={audience.label} className="inline-flex items-center gap-2 text-sm font-medium text-ink/80">
              <audience.icon className="h-4 w-4 text-[var(--lp-green)]" />
              {audience.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
