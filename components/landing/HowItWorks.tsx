import Image from "next/image";
import { ArrowRight, Award, Check, PartyPopper } from "lucide-react";
import { Reveal } from "./Reveal";

/** The demo workspace's own seed personas, the same ones the product shows. */
const applicants = [
  { name: "Maya Patel", avatar: "/demo/people/maya-patel.png" },
  { name: "Priya Sharma", avatar: "/demo/people/priya-sharma.png" },
  { name: "Elif Demir", avatar: "/demo/people/elif-demir.png" },
] as const;

const weekTasks = [
  { label: "Attend mentor session", done: true },
  { label: "Submit your project", done: true },
  { label: "Get feedback & improve", done: false },
] as const;

function LaunchArt() {
  return (
    <div className="lp-card mx-auto w-full max-w-[15.5rem] p-4">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-semibold text-ink">Applications</span>
        <span className="rounded-full bg-[var(--lp-tint)] px-2 py-0.5 text-[10px] font-semibold text-[var(--lp-green)]">
          Open
        </span>
      </div>
      <ul className="mt-3 space-y-2">
        {applicants.map((person) => (
          <li key={person.name} className="flex items-center gap-2.5 text-[12px] text-ink">
            <Image
              src={person.avatar}
              alt=""
              width={22}
              height={22}
              className="h-[22px] w-[22px] rounded-full object-cover"
            />
            <span className="flex-1">{person.name}</span>
            <Check className="h-3.5 w-3.5 text-[var(--lp-green)]" strokeWidth={3} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function MovingArt() {
  return (
    <div className="lp-card mx-auto w-full max-w-[15.5rem] p-4">
      <p className="text-[13px] font-semibold text-ink">Week 4: Build &amp; Iterate</p>
      <div className="mt-2.5 h-1.5 rounded-full bg-line">
        <div className="h-full w-2/3 rounded-full bg-[var(--lp-green)]" />
      </div>
      <ul className="mt-3 space-y-2">
        {weekTasks.map((task) => (
          <li key={task.label} className="flex items-center gap-2 text-[12px] text-ink">
            {task.done ? (
              <span className="grid h-4 w-4 place-items-center rounded-full bg-[var(--lp-green)] text-white">
                <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
              </span>
            ) : (
              <span className="h-4 w-4 rounded-full border border-muted/50" />
            )}
            {task.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

function OutcomeArt() {
  return (
    <div className="lp-card mx-auto w-full max-w-[15.5rem] p-4">
      <p className="flex items-center justify-center gap-1.5 text-[13px] font-semibold text-ink">
        Program Complete
        <PartyPopper className="h-4 w-4 text-[#e0a526]" />
      </p>
      <div className="mt-3 flex items-center gap-3 rounded-lg border border-line px-3 py-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#fbeac0] text-[#c58a12]">
          <Award className="h-5 w-5" />
        </span>
        <span className="flex-1 space-y-1.5">
          <span className="block h-1.5 w-full rounded bg-line" />
          <span className="block h-1.5 w-4/5 rounded bg-line" />
          <span className="block h-1.5 w-3/5 rounded bg-line" />
        </span>
      </div>
      <svg viewBox="0 0 80 20" aria-hidden className="ml-auto mt-1.5 h-5 w-16 text-ink/60">
        <path
          d="M2 14 C 10 2, 14 18, 22 8 S 34 16, 40 6 S 52 18, 60 10 L 78 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

const steps = [
  {
    title: "Launch a cohort",
    body: "Take applications, set up the program and bring in your mentors and mentees.",
    tint: "bg-[#e3f5e9] dark:bg-[#08170f] dark:ring-1 dark:ring-[#8ee8ad]/10",
    Art: LaunchArt,
  },
  {
    title: "Keep everyone moving",
    body: "Match mentors, run learning roadmaps, review submissions and unblock progress.",
    tint: "bg-[#ece9fb] dark:bg-[#0f0d1a] dark:ring-1 dark:ring-[#a99cf5]/10",
    Art: MovingArt,
  },
  {
    title: "Prove the outcomes",
    body: "Award certificates, track engagement and measure real program impact.",
    tint: "bg-[#fdefdc] dark:bg-[#170f06] dark:ring-1 dark:ring-[#f3b862]/10",
    Art: OutcomeArt,
  },
] as const;

export function HowItWorks() {
  return (
    <section
      id="lifecycle"
      aria-labelledby="lifecycle-heading"
      className="lp-bg scroll-mt-20"
    >
      <div className="shell py-16 lg:py-20">
        <div className="text-center">
          <p className="lp-label">How it works</p>
          <h2
            id="lifecycle-heading"
            className="lp-heading mx-auto mt-3 max-w-4xl text-[clamp(1.7rem,3vw,2.3rem)]"
          >
            Run a high-impact mentorship program in three simple steps.
          </h2>
        </div>

        <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-12">
          {steps.map((step, index) => (
            <li key={step.title} className="relative">
              <Reveal delay={index * 0.08}>
                <div className={`grid h-48 place-items-center rounded-2xl px-6 ${step.tint}`}>
                  <step.Art />
                </div>
                {index < steps.length - 1 ? (
                  <ArrowRight
                    aria-hidden
                    className="absolute -right-9 top-[5.4rem] hidden h-5 w-5 text-muted md:block"
                  />
                ) : null}
                <div className="mt-5 flex gap-3.5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--forest)] text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-muted">{step.body}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
