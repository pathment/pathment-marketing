import {
  ArrowRight,
  Brain,
  Check,
  ClipboardList,
  FolderOpen,
  MessagesSquare,
  Sheet,
} from "lucide-react";
import { Reveal } from "./Reveal";

/** What a program usually runs on today, each doing one job badly. */
const before = [
  { icon: Sheet, tool: "A spreadsheet", job: "for the roster", tilt: "-rotate-2" },
  { icon: ClipboardList, tool: "An intake form", job: "for applications", tilt: "rotate-1" },
  { icon: MessagesSquare, tool: "A group chat", job: "for support", tilt: "-rotate-1" },
  { icon: FolderOpen, tool: "A shared folder", job: "for submissions", tilt: "rotate-2" },
  { icon: Brain, tool: "Someone's memory", job: "for who approved what", tilt: "-rotate-1" },
] as const;

/** The same five jobs, as parts of one record. */
const after = [
  "Members, cohorts and mentor-led clans",
  "Applications, assessments and placement",
  "Messages, check-ins and community feeds",
  "Submissions, reviews and roadblocks",
  "Every decision, with who made it and when",
] as const;

export function ReplaceStack() {
  return (
    <section id="why" aria-labelledby="why-heading" className="lp-bg scroll-mt-20 border-b border-line">
      <div className="shell py-16 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="lp-label">What it replaces</p>
          <h2 id="why-heading" className="lp-heading mt-3 text-[clamp(1.8rem,3.2vw,2.6rem)]">
            Five tools and a memory, replaced by one record.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-7 text-muted">
            Mentorship rarely fails in the session. It fails between them, in
            the follow-up nobody owns and the progress nobody can prove.
          </p>
        </div>

        <div className="mt-12 grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-8">
          <Reveal>
            <div className="rounded-2xl border border-dashed border-line p-6 sm:p-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                Today
              </p>
              <ul className="mt-5 flex flex-wrap gap-3">
                {before.map((item) => (
                  <li
                    key={item.tool}
                    className={`flex items-center gap-2.5 rounded-xl border border-line bg-surface px-3.5 py-2.5 shadow-[0_8px_20px_-16px_rgba(0,0,0,0.5)] ${item.tilt}`}
                  >
                    <item.icon className="h-4 w-4 text-muted" />
                    <span className="text-[13px] leading-tight">
                      <span className="font-semibold text-ink/75">{item.tool}</span>{" "}
                      <span className="text-muted">{item.job}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[13px] leading-6 text-muted">
                The program lead finds out someone was stuck for a month at the
                retro, when it is already too late to help.
              </p>
            </div>
          </Reveal>

          <div aria-hidden className="mx-auto grid h-12 w-12 rotate-90 place-items-center rounded-full bg-[var(--forest)] text-[var(--leaf)] shadow-[0_14px_30px_-14px_rgba(7,42,32,0.9)] lg:rotate-0">
            <ArrowRight className="h-5 w-5" />
          </div>

          <Reveal delay={0.1}>
            <div className="lp-panel rounded-2xl p-6 sm:p-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--leaf)]">
                With Pathment
              </p>
              <ul className="mt-5 space-y-3">
                {after.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[14.5px] text-white/90">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--leaf)] text-[var(--leaf-ink)]">
                      <Check className="h-3 w-3" strokeWidth={3.5} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[13px] leading-6 text-white/65">
                The roadmap, the submission, the review and the roadblock live
                on one record, visible to the person who needs it, when they
                need it.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
