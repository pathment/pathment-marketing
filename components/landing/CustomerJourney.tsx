import Link from "next/link";
import { ArrowRight, Award, BookOpenCheck, Check, CircleUserRound, ClipboardCheck, Flag, Sparkles, UsersRound } from "lucide-react";
import { TrackedLink } from "./TrackedLink";

const moments = [
  { role: "Mentee", person: "Maya Patel", time: "10:14", title: "Submits the next roadmap task", detail: "API validation and rate limiting", icon: BookOpenCheck, color: "bg-[#fff2df] text-[#8a4a06]" },
  { role: "Mentor", person: "Aisha Khan", time: "11:06", title: "Reviews the evidence in context", detail: "Clear feedback, points, and a next step", icon: ClipboardCheck, color: "bg-[#eef0ff] text-[#4b55a3]" },
  { role: "Admin", person: "Dana Okafor", time: "14:32", title: "Sees progress without chasing updates", detail: "Decision history is ready for recognition", icon: Award, color: "bg-[#dff5ee] text-[#006b62]" },
] as const;

const workflow = [
  { number: "01", title: "Shape the program", copy: "Set cohorts, roles, clans, permissions, and the learning roadmap.", output: "Program ready", icon: Flag },
  { number: "02", title: "Make the next step obvious", copy: "Every mentor and mentee opens to the work that needs attention now.", output: "Work in motion", icon: UsersRound },
  { number: "03", title: "Review real evidence", copy: "Feedback, roadblocks, approvals, and decisions stay attached to the work.", output: "Evidence reviewed", icon: ClipboardCheck },
  { number: "04", title: "Show the outcome", copy: "Recognition, certificates, and reporting come from the same history.", output: "Outcome recorded", icon: Award },
] as const;

export function CustomerJourney() {
  return (
    <>
      <section id="platform" className="bg-surface px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-7 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="eyebrow">One program, three perspectives</p>
              <h2 className="section-title mt-4 max-w-xl">One action. Everyone who needs it stays in the loop.</h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-muted lg:justify-self-end">Pathment connects the handoffs that usually disappear across spreadsheets, chat threads, and weekly follow-ups.</p>
          </div>

          <div className="mt-10 overflow-hidden rounded-[2rem] bg-brand-950 text-white shadow-[0_30px_90px_-55px_rgba(0,45,40,.9)]">
            <div className="grid lg:grid-cols-[.72fr_1.28fr]">
              <div className="relative overflow-hidden border-b border-white/10 p-7 sm:p-10 lg:border-b-0 lg:border-r">
                <div className="absolute -left-24 top-24 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl" />
                <div className="relative">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/7 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[.14em] text-brand-200"><Sparkles size={13} />A day inside Pathment</span>
                  <h3 className="mt-7 max-w-sm font-display text-3xl font-semibold leading-tight sm:text-4xl">The work moves forward without another status meeting.</h3>
                  <p className="mt-5 max-w-md text-sm leading-7 text-brand-100/70">Follow one learning task as it becomes mentor feedback, visible progress, and an auditable program decision.</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <TrackedLink href="/demo?role=mentee" eventName="demo_role_selected" eventProperties={{ role: "mentee", source: "homepage_story" }} className="inline-flex items-center gap-2 rounded-xl bg-brand-300 px-4 py-3 text-sm font-semibold text-brand-950 hover:bg-brand-200">Follow the story <ArrowRight size={15} /></TrackedLink>
                    <Link href="/demo" className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold text-white/85 hover:bg-white/10">Choose another role</Link>
                  </div>
                </div>
              </div>

              <div className="bg-[#f3f8f6] p-5 text-[#153e3a] sm:p-8 lg:p-10">
                <div className="flex items-center justify-between gap-4 border-b border-[#d9e7e2] pb-5">
                  <div><p className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#00766c]">MERN Fellowship</p><p className="mt-1 text-sm font-semibold">One connected activity trail</p></div>
                  <span className="rounded-full bg-white px-3 py-1.5 text-[11px] font-medium text-[#617773] shadow-sm">Tuesday · Week 10</span>
                </div>
                <div className="relative mt-6 space-y-4 before:absolute before:bottom-8 before:left-5 before:top-8 before:w-px before:bg-[#b7d9cf] sm:before:left-6">
                  {moments.map(({ role, person, time, title, detail, icon: Icon, color }, index) => (
                    <article key={role} className="relative grid grid-cols-[2.5rem_1fr] gap-4 sm:grid-cols-[3rem_1fr_auto] sm:items-center">
                      <span className={`relative z-10 grid h-10 w-10 place-items-center rounded-full border-4 border-[#f3f8f6] sm:h-12 sm:w-12 ${color}`}><Icon size={18} /></span>
                      <div className="rounded-2xl border border-[#d9e7e2] bg-white p-4 shadow-[0_12px_28px_-24px_rgba(7,61,59,.55)] sm:p-5">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1"><strong className="text-sm">{person}</strong><span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide ${color}`}>{role}</span></div>
                        <p className="mt-2 text-sm font-semibold">{title}</p>
                        <p className="mt-1 text-xs leading-5 text-[#617773]">{detail}</p>
                      </div>
                      <span className="hidden text-xs font-medium text-[#7a8e89] sm:block">{time}</span>
                      {index < moments.length - 1 ? <span className="sr-only">then</span> : null}
                    </article>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-3 rounded-2xl bg-[#dff5ee] px-4 py-3 text-xs text-[#075e57]"><Check className="h-4 w-4 shrink-0" /><strong>One record of the task, review, and decision.</strong></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="overflow-hidden px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div><p className="eyebrow">How Pathment works</p><h2 className="section-title mt-4 max-w-2xl">Set the path once. Keep every handoff visible.</h2></div>
            <Link href="/demo" className="group inline-flex w-fit items-center gap-3 rounded-full border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-accent shadow-sm"><CircleUserRound size={17} />Walk through the product <ArrowRight className="transition-transform group-hover:translate-x-1" size={15} /></Link>
          </div>

          <div className="relative mt-10 rounded-[2rem] border border-line bg-surface px-5 py-8 shadow-[0_25px_70px_-55px_rgba(7,61,59,.6)] sm:px-8 sm:py-10">
            <div className="pointer-events-none absolute left-[10%] right-[10%] top-[5.4rem] hidden h-px bg-gradient-to-r from-transparent via-brand-300 to-transparent lg:block" />
            <div className="grid gap-8 lg:grid-cols-4 lg:gap-5">
              {workflow.map(({ number, title, copy, output, icon: Icon }) => (
                <article key={number} className="relative grid grid-cols-[auto_1fr] gap-4 lg:block">
                  <span className="relative z-10 grid h-12 w-12 place-items-center rounded-2xl border border-brand-200 bg-brand-50 text-brand-700 shadow-[0_0_0_7px_var(--surface)]"><Icon size={20} /></span>
                  <div className="lg:mt-7"><span className="font-mono text-[10px] font-semibold tracking-[.14em] text-accent">MOVE {number}</span><h3 className="mt-2 text-lg font-semibold text-ink">{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{copy}</p><span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-ink"><Check size={13} className="text-accent" />{output}</span></div>
                </article>
              ))}
            </div>
            <div className="mt-9 grid gap-3 border-t border-line pt-6 text-xs text-muted sm:grid-cols-3">
              <span><strong className="text-ink">Workspace separation</strong><br />Each organization keeps its own people and programs.</span>
              <span><strong className="text-ink">Role-aware access</strong><br />People see the tools and decisions relevant to them.</span>
              <span><strong className="text-ink">Traceable history</strong><br />Reviews and recognition keep their supporting context.</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
