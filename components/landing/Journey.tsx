"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Building2, Check, GraduationCap, HeartHandshake, Users } from "lucide-react";
import {
  AdmissionsArt,
  InsightsArt,
  RecognitionArt,
  ReviewQueueArt,
  RoadblockArt,
  RoadmapArt,
} from "./JourneyArt";

/** One applicant's AI review, as the intake screen shows it. Illustrative. */
function IntakeReviewArt() {
  const checks = ["Assessment: level 2, 18 of 20", "Video answers: proctored, no flags", "GitHub: projects match the answers"];
  return (
    <div className="rounded-xl border border-black/5 bg-white p-3 shadow-[0_10px_24px_-18px_rgba(7,42,32,0.5)] dark:border-white/10 dark:bg-[#111413]">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold text-ink">AI review · Maya Patel</p>
        <span className="rounded-full bg-[var(--lp-tint)] px-2 py-0.5 text-[10px] font-semibold text-[var(--lp-green)]">
          Suggests accept
        </span>
      </div>
      <ul className="mt-2 space-y-1.5">
        {checks.map((check) => (
          <li key={check} className="flex items-center gap-2 text-[11px] text-ink/85">
            <Check className="h-3 w-3 shrink-0 text-[var(--lp-green)]" strokeWidth={3} />
            {check}
          </li>
        ))}
      </ul>
      <p className="mt-2 text-[10px] text-muted">An admin makes the decision.</p>
    </div>
  );
}

/** Two clans of the same fictional cohort the rest of the story follows. */
function ClansArt() {
  const clans = [
    { name: "MERN Fellows", lead: "Aisha Khan", count: 20 },
    { name: "Node Guild", lead: "Omar Farooq", count: 6 },
  ];
  return (
    <div className="rounded-xl border border-black/5 bg-white p-3 shadow-[0_10px_24px_-18px_rgba(7,42,32,0.5)] dark:border-white/10 dark:bg-[#111413]">
      <p className="text-[11px] font-semibold text-ink">Your clans</p>
      <ul className="mt-2 divide-y divide-line">
        {clans.map((clan) => (
          <li key={clan.name} className="flex items-center justify-between py-2">
            <span>
              <span className="block text-[12px] font-semibold text-ink">{clan.name}</span>
              <span className="block text-[10.5px] text-muted">
                {clan.lead} · {clan.count} mentees
              </span>
            </span>
            <span className="rounded-full bg-[var(--lp-tint)] px-2 py-0.5 text-[10px] font-semibold text-[var(--lp-green)]">
              Placed
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface Chapter {
  id: string;
  kicker: string;
  title: string;
  body: string;
  points: string[];
  art: ReactNode;
}

const chapters: Chapter[] = [
  {
    id: "apply",
    kicker: "Launch",
    title: "Applications in, honestly assessed.",
    body: "Share an apply link. Each applicant takes the assessment for their level, and AI review reads their GitHub before you do.",
    points: ["Apply links and assessments by level", "Proctored video and audio answers", "AI review you can always overrule"],
    art: (
      <div className="space-y-3">
        <AdmissionsArt />
        <IntakeReviewArt />
      </div>
    ),
  },
  {
    id: "place",
    kicker: "Place",
    title: "Cohorts out, in mentor-led clans.",
    body: "Accept the strongest applicants and place them in one step. Every mentee lands in a small clan with a roadmap and one obvious next task.",
    points: ["Accept, invite and place in one flow", "Small clans with a named mentor", "Roadmaps that move on approval"],
    art: (
      <div className="space-y-3">
        <ClansArt />
        <RoadmapArt />
      </div>
    ),
  },
  {
    id: "review",
    kicker: "Run",
    title: "Every submission gets a reviewer.",
    body: "Mentors open to whoever has waited longest and approve or ask for changes on the work itself. Roadblocks reach the program lead before they become dropouts.",
    points: ["A review queue ranked by waiting time", "Feedback attached to the work", "Roadblocks escalate on their own"],
    art: (
      <div className="space-y-3">
        <ReviewQueueArt />
        <RoadblockArt />
      </div>
    ),
  },
  {
    id: "prove",
    kicker: "Prove",
    title: "Outcomes with the evidence attached.",
    body: "Certificates and badges come from approved work. Completion and at-risk signals tell you where to spend next week, and give funders evidence, not anecdotes.",
    points: ["Certificates earned, not typed", "Completion and at-risk insights", "Reports from the decision history"],
    art: (
      <div className="space-y-3">
        <RecognitionArt />
        <InsightsArt />
      </div>
    ),
  },
];

const audiences = [
  { icon: GraduationCap, label: "Fellowships & bootcamps" },
  { icon: Building2, label: "Company trainee programs" },
  { icon: Users, label: "Universities & career services" },
  { icon: HeartHandshake, label: "Communities & nonprofits" },
] as const;

/** The stage behind each chapter's interface slice. */
function Stage({ index, children }: { index: number; children: ReactNode }) {
  return (
    <div className="rounded-3xl border border-line bg-[var(--lp-tint)] p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between text-[11px] font-medium text-muted">
        <span>Spring 2026 Cohort</span>
        <span className="numeric">
          Step {index + 1} of {chapters.length}
        </span>
      </div>
      {children}
    </div>
  );
}

/**
 * One cohort, followed from application to certificate. On wide screens the
 * chapters scroll past a sticky product view that changes with them; on
 * phones each chapter carries its own view inline.
 */
export function Journey() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = refs.current.indexOf(entry.target as HTMLElement);
          if (index >= 0) setActive(index);
        }
      },
      // A chapter is "current" while it crosses the middle of the screen.
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" aria-labelledby="how-it-works-heading" className="lp-bg scroll-mt-20">
      <div className="shell py-16 lg:py-24">
        <div className="max-w-2xl">
          <p className="lp-label">How it works</p>
          <h2 id="how-it-works-heading" className="lp-heading mt-3 text-[clamp(1.8rem,3.2vw,2.6rem)]">
            One cohort, from application to certificate.
          </h2>
          <p className="mt-4 text-[15px] leading-7 text-muted">
            Follow the Spring 2026 cohort through Pathment. Every step lands on
            the same record, so nothing is copied between tools.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          <ol className="relative">
            {/* The thread that ties the chapters together. */}
            <span aria-hidden className="absolute bottom-6 left-[15px] top-6 hidden w-px bg-line lg:block" />
            {chapters.map((chapter, index) => {
              const current = index === active;
              return (
                <li
                  key={chapter.id}
                  ref={(node) => {
                    refs.current[index] = node;
                  }}
                  className="relative pb-14 last:pb-0 lg:flex lg:min-h-[62vh] lg:items-center lg:pb-0 lg:pl-14"
                >
                  <span
                    aria-hidden
                    className={`absolute left-0 top-0 hidden h-8 w-8 place-items-center rounded-full border text-[12px] font-bold transition-colors duration-300 lg:top-1/2 lg:grid lg:-translate-y-1/2 ${
                      current
                        ? "border-[var(--forest)] bg-[var(--forest)] text-white"
                        : "border-line bg-[var(--canvas)] text-muted dark:bg-black"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <div className={`transition-opacity duration-300 lg:opacity-40 ${current ? "lg:!opacity-100" : ""}`}>
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--lp-green)]">
                      {String(index + 1).padStart(2, "0")} · {chapter.kicker}
                    </p>
                    <h3 className="mt-2 font-display text-[1.5rem] font-semibold leading-tight tracking-[-0.02em] text-ink">
                      {chapter.title}
                    </h3>
                    <p className="mt-3 max-w-md text-[15px] leading-7 text-muted">{chapter.body}</p>
                    <ul className="mt-4 space-y-2">
                      {chapter.points.map((point) => (
                        <li key={point} className="flex gap-2.5 text-[14px] text-ink/85">
                          <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-[var(--lp-green)]" strokeWidth={2.75} />
                          {point}
                        </li>
                      ))}
                    </ul>
                    {/* Phones: the view sits with its chapter. */}
                    <div className="mt-6 lg:hidden">
                      <Stage index={index}>{chapter.art}</Stage>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Wide screens: one sticky view that changes with the chapter. */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="relative">
                {chapters.map((chapter, index) => (
                  <div
                    key={chapter.id}
                    aria-hidden={index !== active}
                    className={`transition-all duration-500 ${
                      index === active
                        ? "relative translate-y-0 opacity-100"
                        : "pointer-events-none absolute inset-x-0 top-0 translate-y-3 opacity-0"
                    }`}
                  >
                    <Stage index={index}>{chapter.art}</Stage>
                  </div>
                ))}
              </div>
              <ol aria-hidden className="mt-4 flex justify-center gap-1.5">
                {chapters.map((chapter, index) => (
                  <li
                    key={chapter.id}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === active ? "w-6 bg-[var(--forest)]" : "w-1.5 bg-line"
                    }`}
                  />
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Who it is for. Anchored so the Solutions menu has a destination. */}
        <div
          id="audiences"
          className="mt-16 flex scroll-mt-24 flex-col items-center gap-4 border-t border-line pt-8 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8"
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
