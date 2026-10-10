import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, BarChart3, BookOpenCheck, CheckCircle2, Eye, GraduationCap, ShieldCheck, Users, UserRoundCog } from "lucide-react";
import { TrackedLink } from "./TrackedLink";

const outcomes = [
  [Users, "Run structured programs", "Keep cohorts, clans, mentors, and mentees organized from admission to completion."],
  [BookOpenCheck, "Keep everyone aligned", "Turn program goals into roadmaps, tasks, reviews, and clear next steps."],
  [Eye, "See who needs support", "Surface stalled work, roadblocks, and participation signals before people disengage."],
  [Award, "Recognize progress", "Connect badges and certificates to reviewed evidence—not just attendance."],
  [BarChart3, "Understand performance", "Give program teams a shared view of progress and decision history."],
] as const;

const roles = [
  { role: "admin", icon: UserRoundCog, title: "Explore as Admin", description: "Enter Dana’s workspace to review the fellowship, compare clans, understand a participant signal, and audit a recognition decision.", items: ["Live program overview", "Clan and participant context", "Decision history"] },
  { role: "mentor", icon: Users, title: "Explore as Mentor", description: "Enter Aisha’s workspace to triage her cohort, open Priya’s profile, and complete a simulated evidence review.", items: ["Real mentor cockpit", "Submission queue", "Feedback workflow"] },
  { role: "mentee", icon: GraduationCap, title: "Explore as Mentee", description: "Enter Maya’s workspace to open the next task, understand roadmap progress, and see evidence-backed recognition.", items: ["Weekly dashboard", "Task workspace", "Points & badges"] },
] as const;

export function CustomerJourney() {
  return (
    <>
      <section id="outcomes" className="bg-surface px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl"><p className="eyebrow">Operational clarity</p><h2 className="section-title mt-4">A program people can follow—and operators can understand.</h2><p className="mt-5 text-base leading-7 text-muted">Replace scattered spreadsheets, messages, and manual follow-ups with one visible path from learning activity to program outcomes.</p></div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {outcomes.map(([Icon, title, copy]) => <article key={title} className="rounded-2xl border border-line bg-canvas p-5"><Icon className="text-accent" size={22} /><h3 className="mt-5 font-semibold text-ink">{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section id="roles" className="px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div className="max-w-2xl"><p className="eyebrow">Experience Pathment</p><h2 className="section-title mt-4">Choose a workspace. Follow the real product flow.</h2><p className="mt-5 text-base leading-7 text-muted">A focused, read-only preview modeled on Pathment’s actual Admin, Mentor, and Mentee experiences. No account or connection to a live workspace.</p></div><span className="w-fit rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-xs font-semibold text-brand-800">About 3–5 minutes</span></div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {roles.map(({ role, icon: Icon, title, description, items }) => <article key={role} className="group flex flex-col rounded-3xl border border-line bg-surface p-7 shadow-sm-soft transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg-soft"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-100 text-brand-800"><Icon size={22} /></div><h3 className="mt-6 text-xl font-semibold text-ink">{title}</h3><p className="mt-3 flex-1 text-sm leading-7 text-muted">{description}</p><ul className="mt-5 space-y-2 text-sm text-ink">{items.map((item) => <li key={item} className="flex items-center gap-2"><CheckCircle2 size={15} className="text-accent" />{item}</li>)}</ul><TrackedLink href={`/demo?role=${role}`} eventName="demo_role_selected" eventProperties={{ role, source: "homepage" }} className="mt-7 inline-flex items-center gap-2 font-semibold text-accent">Enter the {role} workspace <ArrowRight size={16} /></TrackedLink></article>)}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-brand-950 px-5 py-20 text-white sm:px-8 sm:py-24">
        <div className="mx-auto max-w-7xl"><p className="text-xs font-semibold uppercase tracking-[.16em] text-brand-200">How Pathment works</p><h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">One operating rhythm from setup to outcomes.</h2><div className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-white/15 md:grid-cols-4">{[
          ["01", "Set up the program", "Define roles, structure cohorts and clans, invite people, and publish the learning path."],
          ["02", "Guide the work", "Give mentors a focused queue and mentees a clear view of what to do next."],
          ["03", "Review evidence", "Capture submissions, feedback, roadblocks, and human approval in context."],
          ["04", "Recognize & report", "Issue evidence-backed recognition and understand progress across the program."],
        ].map(([number, title, copy]) => <article key={number} className="bg-brand-950 p-7"><span className="font-mono text-xs text-brand-300">{number}</span><h3 className="mt-8 text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-brand-100/75">{copy}</p></article>)}</div></div>
      </section>

      <section className="bg-surface px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div><p className="eyebrow">Evidence, not promises</p><h2 className="section-title mt-4">See the work behind every progress signal.</h2><p className="mt-5 text-base leading-7 text-muted">Open roadmap activity, submission evidence, mentor feedback, roadblocks, and recognition history from the same product workflow.</p><ul className="mt-7 space-y-4">{["Admins see program health without reading every conversation.", "Mentors keep reviews and follow-ups in one queue.", "Mentees always know the next task and why it matters."].map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-ink"><CheckCircle2 className="mt-0.5 shrink-0 text-accent" size={18} />{item}</li>)}</ul><Link href="/demo" className="mt-8 inline-flex items-center gap-2 font-semibold text-accent">Explore the workflow <ArrowRight size={16} /></Link></div>
          <figure className="overflow-hidden rounded-3xl border border-line bg-canvas p-3 shadow-lg-soft"><Image src="/product/mentee-learning.webp" alt="Pathment learning roadmap showing tasks, progress, and review state." width={1424} height={900} sizes="(max-width: 1024px) 100vw, 50vw" className="rounded-2xl border border-line" /></figure>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-7xl rounded-3xl border border-line bg-surface p-7 sm:p-10"><div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]"><div><ShieldCheck size={28} className="text-accent" /><h2 className="mt-5 font-display text-3xl font-semibold text-ink">Clear boundaries. Traceable decisions.</h2><p className="mt-4 text-sm leading-7 text-muted">Pathment is structured around organization workspaces and role-based experiences. We describe only the controls visible in the product—not unsupported certifications.</p></div><div className="grid gap-4 sm:grid-cols-2">{[["Workspace separation", "Programs, people, and activity are organized within an organization workspace."],["Role-based experience", "Admins, mentors, and mentees see workflows designed for their responsibilities."],["Progress history", "Task status, evidence, and feedback stay connected to the learning journey."],["Review records", "Recognition and certificate decisions retain their human review context."]].map(([title, copy]) => <article key={title} className="rounded-2xl bg-canvas p-5"><h3 className="font-semibold text-ink">{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{copy}</p></article>)}</div></div></div>
      </section>
    </>
  );
}
