"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Award,
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  FileText,
  Gift,
  Home,
  Inbox,
  LayoutGrid,
  Map,
  Menu,
  MessageCircle,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  User,
  UserRoundCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

export type MobileRole = "admin" | "mentor" | "mentee";

type ScreenDefinition = {
  id: string;
  label: string;
  summary: string;
  icon: LucideIcon;
  primary?: boolean;
};

const primaryScreens: Record<MobileRole, ScreenDefinition[]> = {
  admin: [
    { id: "home", label: "Home", summary: "Decisions that cannot wait", icon: Home, primary: true },
    { id: "intake", label: "Intake", summary: "Applications and cohorts", icon: Inbox, primary: true },
    { id: "people", label: "People", summary: "Mentors, mentees, and clans", icon: Users, primary: true },
    { id: "inbox", label: "Inbox", summary: "Program conversations", icon: MessageCircle, primary: true },
    { id: "more", label: "More", summary: "Every administration tool", icon: Menu, primary: true },
  ],
  mentor: [
    { id: "home", label: "Home", summary: "Who needs you first", icon: Home, primary: true },
    { id: "review", label: "Review", summary: "Submissions waiting on you", icon: ClipboardCheck, primary: true },
    { id: "clan", label: "Clan", summary: "People and momentum", icon: Users, primary: true },
    { id: "inbox", label: "Inbox", summary: "Mentee conversations", icon: MessageCircle, primary: true },
    { id: "more", label: "More", summary: "Mentor tools and reports", icon: Menu, primary: true },
  ],
  mentee: [
    { id: "home", label: "Home", summary: "What needs you today", icon: Home, primary: true },
    { id: "journey", label: "Journey", summary: "Your learning path", icon: Map, primary: true },
    { id: "clan", label: "Clan", summary: "Your mentor and peers", icon: Users, primary: true },
    { id: "inbox", label: "Inbox", summary: "Feedback and messages", icon: MessageCircle, primary: true },
    { id: "you", label: "You", summary: "Progress, points, and profile", icon: User, primary: true },
  ],
};

const secondaryScreens: Record<MobileRole, ScreenDefinition[]> = {
  admin: [
    ["cohorts", "Cohorts", "Capacity, dates, and admission status", Users],
    ["assessments", "Assessments", "Application questions and scoring", ClipboardCheck],
    ["invites", "Invites", "Sent, accepted, and expired invitations", Send],
    ["enrollments", "Enrollments", "Every learner and program state", UserRoundCheck],
    ["clans", "Clans", "Lead mentors, membership, and health", Users],
    ["matching", "Matching", "Suggested placements with reasoning", Sparkles],
    ["requests", "Requests", "Clan moves waiting for a decision", Inbox],
    ["programs", "Programs", "Program structure and status", LayoutGrid],
    ["roadmaps", "Roadmaps", "Learning paths mentors can assign", Map],
    ["schedules", "Schedules", "Reusable weekly rhythms", CalendarDays],
    ["certificates", "Certificates", "Evidence, approvals, and issued records", Award],
    ["rewards", "Rewards", "Catalog and redemption activity", Gift],
    ["badges", "Badges", "Criteria and manual awards", Star],
    ["insights", "Insights", "Progress, fairness, and retention", TrendingUp],
    ["follow-ups", "Mentee follow-ups", "Who needs support and why", AlertTriangle],
    ["records", "Review records", "Attendance and completion history", FileText],
    ["activity", "Activity", "A workspace-wide audit trail", Activity],
    ["operations", "Operations", "Email, moderation, and queues", Settings],
    ["access", "Roles and access", "Permissions by person and workspace", ShieldCheck],
    ["settings", "Settings", "Workspace identity and preferences", Settings],
  ].map(([id, label, summary, icon]) => ({ id: String(id), label: String(label), summary: String(summary), icon: icon as LucideIcon })),
  mentor: [
    ["mentees", "Mentees", "Everyone you mentor and who needs you", Users],
    ["attention", "Needs attention", "Risks, blockers, and missed work", AlertTriangle],
    ["clan-team", "Clan team", "Co-mentors and cover", UserRoundCheck],
    ["community", "Community", "Questions, standups, and updates", MessageCircle],
    ["promotions", "Promotions", "Mentees ready to help mentor", TrendingUp],
    ["top-performers", "Top performers", "Evidence-backed nominations", Award],
    ["clan-review", "Clan review", "A structured weekly review round", Users],
    ["one-to-ones", "One to ones", "Availability and booked sessions", CalendarDays],
    ["schedules", "Schedules", "Weekly rhythms for the clan", Clock3],
    ["roadmaps", "Roadmaps", "Assign and draft learning paths", Map],
    ["marking", "Marking", "Quizzes and interviews waiting", ClipboardCheck],
    ["kits", "Question kits", "Reusable quizzes and interviews", BookOpen],
    ["performance", "Performance", "How every mentee is doing", TrendingUp],
    ["points", "Points", "Clan leaderboard and score sources", Award],
    ["reports", "Reports", "Write up how the clan is going", FileText],
    ["certificates", "Certificates", "Review evidence before approval", Award],
    ["feedback", "Mentee feedback", "Anonymous completed-program feedback", MessageCircle],
    ["rewards", "Rewards", "What mentees can redeem", Gift],
    ["programs", "Programs", "Programs you help run", LayoutGrid],
    ["guide", "Mentor guide", "Principles and expectations", BookOpen],
    ["settings", "Settings", "Mentor profile and preferences", Settings],
  ].map(([id, label, summary, icon]) => ({ id: String(id), label: String(label), summary: String(summary), icon: icon as LucideIcon })),
  mentee: [
    ["roadmap", "Your roadmap", "The whole learning path", Map],
    ["progress", "Progress", "Pace, credited work, and milestones", TrendingUp],
    ["daily-log", "Daily log", "Record what you completed today", CalendarDays],
    ["rhythm", "Weekly rhythm", "The schedule your mentor planned", Clock3],
    ["blockers", "Blockers", "Ask for help and track a resolution", AlertTriangle],
    ["performance", "How you are doing", "Your score and what makes it up", Activity],
    ["points", "Points and rewards", "Balance, badges, and redemptions", Gift],
    ["certificates", "Certificates", "Earned credentials and evidence", Award],
    ["meetings", "Meetings", "One to ones and clan reviews", CalendarDays],
    ["library", "Library", "Guides, reading, and templates", BookOpen],
    ["announcements", "Announcements", "Program updates in one place", Bell],
    ["settings", "Settings", "Profile, appearance, and security", Settings],
  ].map(([id, label, summary, icon]) => ({ id: String(id), label: String(label), summary: String(summary), icon: icon as LucideIcon })),
};

const people = {
  dana: { name: "Dana Reyes", image: "/demo/people/dana-reyes.png" },
  aisha: { name: "Aisha Khan", image: "/demo/people/aisha-khan.png" },
  maya: { name: "Maya Patel", image: "/demo/people/maya-patel.png" },
  priya: { name: "Priya Sharma", image: "/demo/people/priya-sharma.png" },
  elif: { name: "Elif Demir", image: "/demo/people/elif-demir.png" },
};

const roleCopy = {
  admin: { eyebrow: "Program operations", title: "See what needs a decision", description: "Move from intake to program health without losing the audit trail." },
  mentor: { eyebrow: "Mentor workspace", title: "Keep every learner moving", description: "Review work, spot roadblocks, and keep follow-ups in one queue." },
  mentee: { eyebrow: "Learner workspace", title: "Know the next useful step", description: "Follow the roadmap, submit evidence, and ask for help without hunting for context." },
} as const;

export function MobileProductDemo({ initialRole = "admin", compact = false }: { initialRole?: MobileRole; compact?: boolean }) {
  const [role, setRole] = useState<MobileRole>(initialRole);
  const [screen, setScreen] = useState("home");
  const [notice, setNotice] = useState("");
  const allScreens = useMemo(() => [...primaryScreens[role], ...secondaryScreens[role]], [role]);
  const activeScreen = allScreens.find((item) => item.id === screen) ?? primaryScreens[role][0];

  function chooseRole(next: MobileRole) {
    setRole(next);
    setScreen("home");
    setNotice("");
  }

  function chooseScreen(next: string) {
    setScreen(next);
    setNotice("");
  }

  return (
    <div className={compact ? "" : "min-h-screen bg-[#eaf2ef]"}>
      <div className={compact ? "" : "mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8"}>
        <div className="rounded-[2rem] border border-[#c9dbd5] bg-[#f7faf9] p-4 shadow-[0_30px_90px_-45px_rgba(7,61,59,.42)] sm:p-6">
          <div className="flex flex-col gap-5 border-b border-[#dce7e3] pb-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[.18em] text-[#00766c]">Explore the Android app</p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-[#113d39] sm:text-3xl">Switch roles. Open every screen. Try the workflow.</h2>
            </div>
            <div role="tablist" aria-label="Choose mobile role" className="grid grid-cols-3 rounded-2xl border border-[#d3e2dc] bg-white p-1">
              {(["admin", "mentor", "mentee"] as MobileRole[]).map((item) => (
                <button key={item} type="button" role="tab" aria-selected={role === item} onClick={() => chooseRole(item)} className={`rounded-xl px-4 py-2.5 text-sm font-semibold capitalize transition ${role === item ? "bg-[#00766c] text-white shadow-sm" : "text-[#617773] hover:bg-[#edf5f2]"}`}>
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[260px_minmax(330px,440px)_minmax(300px,1fr)] xl:items-start">
            <aside className="order-2 xl:order-1" aria-label={`${role} mobile screens`}>
              <div className="rounded-2xl border border-[#dce7e3] bg-white p-3">
                <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-[.16em] text-[#839792]">Main navigation</p>
                <div className="grid grid-cols-2 gap-1 xl:grid-cols-1">
                  {primaryScreens[role].map((item) => <ScreenButton key={item.id} item={item} active={screen === item.id} onClick={() => chooseScreen(item.id)} />)}
                </div>
              </div>
              <details className="mt-3 rounded-2xl border border-[#dce7e3] bg-white p-3" open={!compact}>
                <summary className="flex cursor-pointer list-none items-center justify-between px-2 py-1 text-xs font-semibold text-[#244c47]">All {role} screens <span className="rounded-full bg-[#e7f5f1] px-2 py-1 text-[10px] text-[#00766c]">{secondaryScreens[role].length}</span></summary>
                <div className="mt-2 max-h-[360px] space-y-1 overflow-y-auto pr-1">
                  {secondaryScreens[role].map((item) => <ScreenButton key={item.id} item={item} active={screen === item.id} onClick={() => chooseScreen(item.id)} />)}
                </div>
              </details>
            </aside>

            <div className="order-1 mx-auto w-full max-w-[440px] xl:order-2">
              <div className="rounded-[2.6rem] border-[7px] border-[#082f2b] bg-[#082f2b] p-1.5 shadow-[0_32px_70px_-30px_rgba(7,46,42,.8)]">
                <div className="relative h-[760px] max-h-[78vh] min-h-[650px] overflow-hidden rounded-[2rem] bg-white">
                  <MobileStatusBar />
                  <div className="h-[calc(100%-42px)] overflow-y-auto pb-[84px]">
                    <MobileScreen role={role} screen={screen} notice={notice} setNotice={setNotice} onNavigate={chooseScreen} />
                  </div>
                  <MobileTabs role={role} screen={screen} onNavigate={chooseScreen} />
                </div>
              </div>
              <p className="mt-4 text-center text-xs leading-5 text-[#617773]">Fictional Dev Weekends data. Actions are simulated in this preview.</p>
            </div>

            <aside className="order-3">
              <div className="rounded-2xl border border-[#dce7e3] bg-white p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-[#008b7d]">{roleCopy[role].eyebrow}</p>
                <h3 className="mt-3 font-display text-2xl font-semibold text-[#123e3b]">{roleCopy[role].title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#617773]">{roleCopy[role].description}</p>
                <div className="mt-6 rounded-xl bg-[#edf6f3] p-4">
                  <p className="text-xs font-semibold text-[#123e3b]">Now viewing</p>
                  <p className="mt-1 text-base font-semibold text-[#00766c]">{activeScreen.label}</p>
                  <p className="mt-1 text-xs leading-5 text-[#617773]">{activeScreen.summary}</p>
                </div>
                <ul className="mt-6 space-y-3 text-sm text-[#365f59]">
                  <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#008b7d]" />Use the same five-tab structure as the native app.</li>
                  <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#008b7d]" />Open secondary screens from the complete role directory.</li>
                  <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#008b7d]" />Try safe local decisions, reviews, logs, and roadblocks.</li>
                </ul>
                <div className="mt-6 grid gap-2 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                  <Link href="/pricing" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00766c] px-4 py-3 text-sm font-semibold text-white">See plans <ArrowRight className="h-4 w-4" /></Link>
                  <Link href="/contact" className="inline-flex items-center justify-center rounded-xl border border-[#c9dbd5] px-4 py-3 text-sm font-semibold text-[#075e57]">Talk to us</Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScreenButton({ item, active, onClick }: { item: ScreenDefinition; active: boolean; onClick: () => void }) {
  const Icon = item.icon;
  return <button type="button" onClick={onClick} className={`flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left ${active ? "bg-[#e4f4ef] text-[#006b62]" : "text-[#58706b] hover:bg-[#f2f7f5]"}`}><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${active ? "bg-[#00766c] text-white" : "bg-[#edf3f1] text-[#69817c]"}`}><Icon className="h-4 w-4" /></span><span className="min-w-0"><strong className="block truncate text-xs">{item.label}</strong><span className="block truncate text-[10px] opacity-75">{item.summary}</span></span></button>;
}

function MobileStatusBar() {
  return <div className="flex h-[42px] items-center justify-between bg-[#00665d] px-5 text-[11px] font-semibold text-white"><span>9:41</span><div className="flex items-center gap-1.5"><span>5G</span><span className="flex items-end gap-px">{[2, 4, 6, 8].map((height) => <i key={height} className="w-0.5 rounded bg-white" style={{ height }} />)}</span><span className="h-2.5 w-5 rounded-sm border border-white/70"><i className="block h-full w-4/5 bg-white" /></span></div></div>;
}

function MobileTabs({ role, screen, onNavigate }: { role: MobileRole; screen: string; onNavigate: (screen: string) => void }) {
  return <nav aria-label={`${role} app tabs`} className="absolute inset-x-0 bottom-0 z-10 grid grid-cols-5 border-t border-[#dde8e4] bg-white/95 px-1 pb-2 pt-2 backdrop-blur">{primaryScreens[role].map((item) => { const Icon = item.icon; const active = item.id === screen || (!primaryScreens[role].some((tab) => tab.id === screen) && item.id === (role === "mentee" ? "you" : "more")); return <button key={item.id} type="button" onClick={() => onNavigate(item.id)} className={`flex flex-col items-center gap-1 py-1 text-[10px] font-medium ${active ? "text-[#00766c]" : "text-[#94a4a0]"}`}><Icon className="h-5 w-5" /><span>{item.label}</span></button>; })}</nav>;
}

function MobileHeader({ eyebrow, title, person, bell = true }: { eyebrow?: string; title: string; person?: keyof typeof people; bell?: boolean }) {
  return <header className="rounded-b-[2rem] bg-[#00665d] px-5 pb-9 pt-5 text-white"><div className="flex items-start justify-between gap-3"><div><p className="text-[11px] text-white/65">{eyebrow}</p><h2 className="mt-1 text-[28px] font-medium tracking-tight">{title}</h2></div><div className="flex items-center gap-2">{bell ? <button type="button" aria-label="Notifications" className="relative grid h-11 w-11 place-items-center rounded-full bg-white/10"><Bell className="h-5 w-5" /><span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[#e95e62] px-1 text-[9px]">3</span></button> : null}{person ? <Image src={people[person].image} alt={people[person].name} width={44} height={44} className="h-11 w-11 rounded-full border-2 border-white/30 object-cover" /> : null}</div></div></header>;
}

function MobileScreen({ role, screen, notice, setNotice, onNavigate }: { role: MobileRole; screen: string; notice: string; setNotice: (value: string) => void; onNavigate: (value: string) => void }) {
  if (role === "admin") return <AdminScreen screen={screen} notice={notice} setNotice={setNotice} onNavigate={onNavigate} />;
  if (role === "mentor") return <MentorScreen screen={screen} notice={notice} setNotice={setNotice} onNavigate={onNavigate} />;
  return <MenteeScreen screen={screen} notice={notice} setNotice={setNotice} onNavigate={onNavigate} />;
}

function AdminScreen({ screen, notice, setNotice, onNavigate }: ScreenProps) {
  if (screen === "home") return <><MobileHeader eyebrow="Your organization" title="Today" person="dana" /><div className="-mt-5 space-y-4 px-4"><ActionPanel label="Needs a decision" title="3 applications are waiting on you" body="Spring 2026 Cohort. The longest has waited 6 days." action="Open intake" onClick={() => onNavigate("intake")} /><SectionTitle title="Your clans" action="See all" onClick={() => onNavigate("clans")} /><div className="rounded-2xl border border-[#e0e9e6] bg-white">{[["MERN Fellows", "Aisha Khan · 20 mentees", "2 need support"], ["Node Guild", "Omar Farooq · 6 mentees", "On track"], ["Aisha's clan", "Aisha Khan · 1 mentee", "Starting"]].map(([title, sub, meta], index) => <ListItem key={title} title={title} subtitle={sub} meta={meta} last={index === 2} />)}</div></div></>;
  if (screen === "intake") return <><MobileHeader eyebrow="Admissions" title="Spring 2026" person="dana" /><div className="space-y-4 px-4 pt-5"><div className="grid grid-cols-3 gap-2"><MiniMetric value="3" label="Ready" /><MiniMetric value="18" label="Accepted" /><MiniMetric value="4" label="Places" /></div>{notice ? <SuccessNotice text={notice} /> : null}<SectionTitle title="Ready for a decision" action="Filters" />{[["Priya Sharma", "92% assessment · 6 days", "priya"], ["Elif Demir", "84% assessment · 3 days", "elif"], ["Maya Patel", "78% assessment · Today", "maya"]].map(([name, detail, person], index) => <div key={name} className="rounded-2xl border border-[#dce7e3] bg-white p-4"><div className="flex items-center gap-3"><Avatar person={person as keyof typeof people} /><div className="flex-1"><p className="text-sm font-semibold text-[#143e3a]">{name}</p><p className="mt-0.5 text-[11px] text-[#71847f]">{detail}</p></div><ChevronRight className="h-4 w-4 text-[#91a19d]" /></div>{index === 0 ? <div className="mt-4 grid grid-cols-2 gap-2"><button type="button" onClick={() => setNotice("Priya is accepted in this preview. No account was changed.")} className="rounded-xl bg-[#00766c] px-3 py-2 text-xs font-semibold text-white">Accept</button><button type="button" onClick={() => setNotice("Priya is held for review in this preview.")} className="rounded-xl border border-[#d5e1dd] px-3 py-2 text-xs font-semibold text-[#365f59]">Hold</button></div> : null}</div>)}</div></>;
  if (screen === "people") return <><MobileHeader eyebrow="Organization" title="People" person="dana" /><div className="space-y-4 px-4 pt-5"><div className="grid grid-cols-3 gap-2"><MiniMetric value="27" label="Mentees" /><MiniMetric value="3" label="Mentors" /><MiniMetric value="3" label="Clans" /></div><label className="flex items-center gap-2 rounded-xl border border-[#dce7e3] bg-white px-3 py-2"><Search className="h-4 w-4 text-[#879993]" /><span className="text-xs text-[#879993]">Search people</span></label><SectionTitle title="Mentors" action="View all" />{(["aisha", "priya", "elif"] as const).map((person, index) => <div key={person} className="rounded-2xl border border-[#dce7e3] bg-white p-4"><div className="flex items-center gap-3"><Avatar person={person} /><div className="flex-1"><p className="text-sm font-semibold text-[#143e3a]">{people[person].name}</p><p className="text-[11px] text-[#71847f]">{index === 0 ? "Lead mentor · MERN Fellows" : index === 1 ? "Mentee · 8 approved steps" : "Mentee · 1 open blocker"}</p></div><ChevronRight className="h-4 w-4 text-[#91a19d]" /></div></div>)}</div></>;
  if (screen === "inbox") return <InboxScreen title="Program inbox" person="dana" conversations={[["Aisha Khan", "Priya's review is ready", "2m", "aisha"], ["MERN Fellows", "Friday review starts at 4:00", "1h", "priya"], ["Elif Demir", "I added more blocker context", "3h", "elif"]]} />;
  if (screen === "more") return <MoreDirectory role="admin" onNavigate={onNavigate} />;
  return <SecondaryScreen role="admin" screen={screen} notice={notice} setNotice={setNotice} onBack={() => onNavigate("more")} />;
}

function MentorScreen({ screen, notice, setNotice, onNavigate }: ScreenProps) {
  if (screen === "home") return <><MobileHeader eyebrow="Good morning" title="Aisha" person="aisha" /><div className="-mt-5 space-y-4 px-4"><ActionPanel label="Needs you" title="Sara is 31 days quiet" body="No recent activity. Open her record before the weekly review." action="Open her record" onClick={() => onNavigate("attention")} /><div className="grid grid-cols-3 gap-2"><MiniMetric value="4" label="To review" /><MiniMetric value="20" label="Mentees" /><MiniMetric value="2" label="Blocked" /></div><SectionTitle title="Waiting on you" action="See all" onClick={() => onNavigate("review")} /><div className="rounded-2xl border border-[#e0e9e6] bg-white"><ListItem title="Priya Sharma" subtitle="Node fundamentals" meta="18 days" /><ListItem title="Elif Demir" subtitle="Express error handling" meta="9 days" last /></div></div></>;
  if (screen === "review") return <><MobileHeader eyebrow="Review queue" title="4 waiting" person="aisha" /><ReviewForm notice={notice} setNotice={setNotice} /></>;
  if (screen === "clan") return <><MobileHeader eyebrow="MERN Fellows" title="Your clan" person="aisha" /><div className="space-y-4 px-4 pt-5"><div className="grid grid-cols-3 gap-2"><MiniMetric value="20" label="Mentees" /><MiniMetric value="14" label="Checked in" /><MiniMetric value="2" label="Blocked" /></div><SectionTitle title="Needs a look" action="Review round" onClick={() => onNavigate("clan-review")} />{[["Sara Ali", "31 days quiet", "maya"], ["Elif Demir", "Roadblock open", "elif"], ["Priya Sharma", "2 reviews waiting", "priya"]].map(([name, detail, person]) => <div key={name} className="flex items-center gap-3 rounded-2xl border border-[#dce7e3] bg-white p-4"><Avatar person={person as keyof typeof people} /><div className="flex-1"><p className="text-sm font-semibold text-[#143e3a]">{name}</p><p className="text-[11px] text-[#71847f]">{detail}</p></div><ChevronRight className="h-4 w-4 text-[#91a19d]" /></div>)}</div></>;
  if (screen === "inbox") return <InboxScreen title="Mentor inbox" person="aisha" conversations={[["Priya Sharma", "I updated the evidence link", "4m", "priya"], ["Elif Demir", "Can we discuss middleware?", "48m", "elif"], ["MERN Fellows", "Aisha: Review notes are posted", "2h", "aisha"]]} />;
  if (screen === "more") return <MoreDirectory role="mentor" onNavigate={onNavigate} />;
  return <SecondaryScreen role="mentor" screen={screen} notice={notice} setNotice={setNotice} onBack={() => onNavigate("more")} />;
}

function MenteeScreen({ screen, notice, setNotice, onNavigate }: ScreenProps) {
  if (screen === "home") return <><MobileHeader eyebrow="Good afternoon" title="Maya" person="maya" /><div className="-mt-5 space-y-4 px-4"><div className="rounded-2xl border border-[#dce7e3] bg-white p-5 shadow-[0_12px_30px_-22px_rgba(7,61,59,.6)]"><div className="flex items-start justify-between"><div><p className="text-[10px] font-semibold uppercase tracking-wider text-[#008b7d]">Next step</p><h3 className="mt-2 text-lg font-semibold text-[#143e3a]">Connect an Express API</h3><p className="mt-1 text-xs text-[#71847f]">Node · Week 10 · Due Friday</p></div><span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#e5f5f1] text-[#00766c]"><ArrowRight className="h-5 w-5" /></span></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-[#e6eeeb]"><span className="block h-full w-[62%] rounded-full bg-[#008b7d]" /></div><p className="mt-2 text-[11px] text-[#71847f]">62% of the roadmap complete</p></div><div className="grid grid-cols-2 gap-3"><button type="button" onClick={() => onNavigate("daily-log")} className="rounded-2xl bg-[#00665d] p-4 text-left text-white"><CalendarDays className="h-5 w-5" /><p className="mt-8 text-lg font-medium">Log today</p><p className="mt-1 text-[11px] text-white/65">Takes two minutes</p></button><button type="button" onClick={() => onNavigate("blockers")} className="rounded-2xl bg-[#8d4305] p-4 text-left text-white"><AlertTriangle className="h-5 w-5" /><p className="mt-8 text-lg font-medium">I am stuck</p><p className="mt-1 text-[11px] text-white/65">Your mentor sees it</p></button></div><SectionTitle title="Recent feedback" action="Open" /><div className="rounded-2xl border border-[#dce7e3] bg-white p-4"><div className="flex items-center gap-3"><Avatar person="aisha" /><div><p className="text-sm font-semibold text-[#143e3a]">Aisha approved your task</p><p className="text-[11px] text-[#71847f]">Clear API structure. Add one error case next.</p></div></div></div></div></>;
  if (screen === "journey") return <><MobileHeader eyebrow="MERN Fellowship" title="Your journey" person="maya" /><div className="space-y-4 px-4 pt-5"><div className="flex gap-2">{["Now", "Path", "Done"].map((label, index) => <button type="button" key={label} className={`rounded-full px-4 py-2 text-xs font-semibold ${index === 0 ? "bg-[#0b2522] text-white" : "bg-[#eef3f1] text-[#758580]"}`}>{label}</button>)}</div><JourneyStep state="done" title="React components and state" meta="Approved · 15 points" /><JourneyStep state="active" title="Connect an Express API" meta="In progress · Due Friday" /><JourneyStep state="ready" title="Authentication and sessions" meta="Ready after this step" /><JourneyStep state="locked" title="Capstone API" meta="Unlocks in Week 12" /></div></>;
  if (screen === "clan") return <><MobileHeader eyebrow="Your people" title="MERN Fellows" person="maya" /><div className="space-y-4 px-4 pt-5"><div className="overflow-hidden rounded-2xl border border-[#dce7e3] bg-white"><div className="bg-[#e9f5f1] p-4"><p className="text-[10px] font-semibold uppercase tracking-wider text-[#00766c]">Lead mentor</p><div className="mt-3 flex items-center gap-3"><Avatar person="aisha" size="lg" /><div><p className="font-semibold text-[#143e3a]">Aisha Khan</p><p className="text-xs text-[#71847f]">Usually replies within a day</p></div></div></div><button type="button" className="flex w-full items-center justify-center gap-2 border-t border-[#dce7e3] py-3 text-xs font-semibold text-[#00766c]"><MessageCircle className="h-4 w-4" />Message Aisha</button></div><SectionTitle title="Your clan" action="20 people" />{(["priya", "elif"] as const).map((person) => <div key={person} className="flex items-center gap-3 rounded-2xl border border-[#dce7e3] bg-white p-4"><Avatar person={person} /><div className="flex-1"><p className="text-sm font-semibold text-[#143e3a]">{people[person].name}</p><p className="text-[11px] text-[#71847f]">Working through Node · Week 10</p></div></div>)}</div></>;
  if (screen === "inbox") return <InboxScreen title="Your inbox" person="maya" conversations={[["Aisha Khan", "Great work on the React task", "6m", "aisha"], ["MERN Fellows", "Priya: Does anyone have the API notes?", "1h", "priya"], ["Pathment", "Your weekly summary is ready", "Today", "maya"]]} />;
  if (screen === "you") return <><MobileHeader eyebrow="Your Pathment" title="Maya Patel" person="maya" /><div className="space-y-4 px-4 pt-5"><div className="grid grid-cols-3 gap-2"><MiniMetric value="620" label="Points" /><MiniMetric value="8" label="Approved" /><MiniMetric value="3" label="Badges" /></div><div className="rounded-2xl border border-[#dce7e3] bg-white p-4"><p className="text-[10px] font-semibold uppercase tracking-wider text-[#008b7d]">Latest badge</p><div className="mt-3 flex items-center gap-3"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#f5e8bd] text-[#7b5700]"><Award className="h-6 w-6" /></span><div><p className="text-sm font-semibold text-[#143e3a]">Consistent contributor</p><p className="text-[11px] text-[#71847f]">Earned for 14 active days</p></div></div></div><button type="button" onClick={() => onNavigate("points")} className="flex w-full items-center justify-between rounded-2xl border border-[#dce7e3] bg-white p-4 text-sm font-semibold text-[#143e3a]">Points and rewards <ChevronRight className="h-4 w-4" /></button><button type="button" onClick={() => onNavigate("certificates")} className="flex w-full items-center justify-between rounded-2xl border border-[#dce7e3] bg-white p-4 text-sm font-semibold text-[#143e3a]">Certificates <ChevronRight className="h-4 w-4" /></button><button type="button" onClick={() => onNavigate("settings")} className="flex w-full items-center justify-between rounded-2xl border border-[#dce7e3] bg-white p-4 text-sm font-semibold text-[#143e3a]">Profile and settings <ChevronRight className="h-4 w-4" /></button></div></>;
  return <SecondaryScreen role="mentee" screen={screen} notice={notice} setNotice={setNotice} onBack={() => onNavigate("you")} />;
}

type ScreenProps = { screen: string; notice: string; setNotice: (value: string) => void; onNavigate: (value: string) => void };

function MoreDirectory({ role, onNavigate }: { role: MobileRole; onNavigate: (value: string) => void }) {
  const person = role === "admin" ? "dana" : role === "mentor" ? "aisha" : "maya";
  return <><MobileHeader eyebrow="Every Pathment tool" title="More" person={person} /><div className="space-y-2 px-4 pt-5"><p className="pb-2 text-[10px] font-semibold uppercase tracking-[.16em] text-[#879893]">{role === "admin" ? "Run the organization" : "Your work"}</p>{secondaryScreens[role].map((item) => { const Icon = item.icon; return <button type="button" key={item.id} onClick={() => onNavigate(item.id)} className="flex w-full items-center gap-3 rounded-2xl border border-[#e0e9e6] bg-white p-3 text-left"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#e9f5f1] text-[#00766c]"><Icon className="h-5 w-5" /></span><span className="min-w-0 flex-1"><strong className="block text-sm text-[#143e3a]">{item.label}</strong><span className="block truncate text-[10px] text-[#71847f]">{item.summary}</span></span><ChevronRight className="h-4 w-4 text-[#9aaba6]" /></button>; })}</div></>;
}

function SecondaryScreen({ role, screen, notice, setNotice, onBack }: { role: MobileRole; screen: string; notice: string; setNotice: (value: string) => void; onBack: () => void }) {
  const item = secondaryScreens[role].find((candidate) => candidate.id === screen) ?? secondaryScreens[role][0];
  const Icon = item.icon;
  if (role === "mentee" && (screen === "daily-log" || screen === "blockers")) return <MenteeInputScreen kind={screen} notice={notice} setNotice={setNotice} onBack={onBack} />;
  const rows = detailRows(screen);
  return <><div className="bg-[#00665d] px-4 pb-6 pt-4 text-white"><button type="button" onClick={onBack} className="inline-flex items-center gap-1 text-[11px] font-semibold text-white/75"><ArrowLeft className="h-4 w-4" />All screens</button><div className="mt-5 flex items-center gap-3"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/12"><Icon className="h-6 w-6" /></span><div><p className="text-[10px] uppercase tracking-wider text-white/60">{role} workspace</p><h2 className="mt-1 text-2xl font-medium">{item.label}</h2></div></div><p className="mt-3 text-xs leading-5 text-white/70">{item.summary}</p></div><div className="space-y-4 px-4 pt-5">{notice ? <SuccessNotice text={notice} /> : null}<div className="grid grid-cols-3 gap-2"><MiniMetric value={rows.metricA[0]} label={rows.metricA[1]} /><MiniMetric value={rows.metricB[0]} label={rows.metricB[1]} /><MiniMetric value={rows.metricC[0]} label={rows.metricC[1]} /></div><SectionTitle title={rows.heading} action="Filters" /><div className="rounded-2xl border border-[#dce7e3] bg-white">{rows.items.map(([title, subtitle, meta], index) => <ListItem key={title} title={title} subtitle={subtitle} meta={meta} last={index === rows.items.length - 1} />)}</div>{role !== "mentee" ? <button type="button" onClick={() => setNotice(`${item.label} action completed in this preview. No workspace data changed.`)} className="w-full rounded-xl bg-[#00766c] px-4 py-3 text-xs font-semibold text-white">Try the primary action</button> : null}</div></>;
}

function detailRows(screen: string) {
  if (/insights|performance|progress|activity|records|reports|scoring/.test(screen)) return { metricA: ["82%", "On pace"], metricB: ["14", "Active"], metricC: ["3", "Needs help"], heading: "What changed this week", items: [["Completion moved up 6%", "Across MERN Fellows", "This week"], ["Review wait time is down", "Median is now 11 hours", "Healthy"], ["Two people need support", "Both have an assigned mentor", "Open"]] };
  if (/certificate|badge|reward|points|promotion|top-performers/.test(screen)) return { metricA: ["620", "Points"], metricB: ["3", "Badges"], metricC: ["1", "Ready"], heading: "Recognition with evidence", items: [["Maya Patel", "Consistent contributor", "Ready"], ["Priya Sharma", "Node milestone", "Reviewed"], ["Elif Demir", "Community helper", "Pending"]] };
  if (/cohort|assessment|invite|request|matching|enrollment|intake/.test(screen)) return { metricA: ["24", "Applicants"], metricB: ["18", "Accepted"], metricC: ["3", "Waiting"], heading: "Admission work", items: [["Priya Sharma", "Assessment scored 92%", "6 days"], ["Elif Demir", "Ready for decision", "3 days"], ["Jordan Tester", "Invite expires tomorrow", "Open"]] };
  if (/roadmap|program|schedule|rhythm|library|guide|kit|marking/.test(screen)) return { metricA: ["4", "Programs"], metricB: ["12", "Roadmaps"], metricC: ["8", "Published"], heading: "Learning operations", items: [["MERN engineering path", "10 of 16 weeks published", "Active"], ["Node foundations", "8 tasks and one interview", "Live"], ["Capstone launch", "Starts in two weeks", "Draft"]] };
  if (/clan|mentee|people|team|follow-up|attention/.test(screen)) return { metricA: ["20", "People"], metricB: ["14", "On pace"], metricC: ["2", "Blocked"], heading: "People needing context", items: [["Sara Ali", "No activity in 31 days", "Follow up"], ["Elif Demir", "Express blocker is open", "Today"], ["Priya Sharma", "Two reviews are waiting", "18 hours"]] };
  if (/meeting|one-to-one|community|announcement|feedback|inbox/.test(screen)) return { metricA: ["3", "Upcoming"], metricB: ["8", "Threads"], metricC: ["2", "Unread"], heading: "Recent conversations", items: [["Friday clan review", "20 people invited", "4:00 PM"], ["Maya and Aisha", "One to one notes", "Tomorrow"], ["Week 10 update", "Program announcement", "Sent"]] };
  return { metricA: ["1", "Workspace"], metricB: ["3", "Roles"], metricC: ["0", "Issues"], heading: "Workspace controls", items: [["Dev Weekends", "MERN Stack Engineering Fellowship", "Active"], ["Role access", "Admin, mentor, and mentee", "Current"], ["Review history", "Every decision keeps its context", "Recorded"]] };
}

function MenteeInputScreen({ kind, notice, setNotice, onBack }: { kind: string; notice: string; setNotice: (value: string) => void; onBack: () => void }) {
  const isLog = kind === "daily-log";
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const form = event.currentTarget; const data = new FormData(form); const value = String(data.get("entry") || "").trim(); if (!value) { setNotice("Add a short note before saving the preview."); return; } setNotice(isLog ? "Today's progress is saved for this preview only." : "Your simulated roadblock is now visible to Aisha."); form.reset(); }
  return <><div className="bg-[#00665d] px-4 pb-7 pt-4 text-white"><button type="button" onClick={onBack} className="inline-flex items-center gap-1 text-[11px] font-semibold text-white/75"><ArrowLeft className="h-4 w-4" />Back</button><h2 className="mt-5 text-2xl font-medium">{isLog ? "Log today" : "I am stuck"}</h2><p className="mt-2 text-xs leading-5 text-white/70">{isLog ? "A short note keeps your mentor informed." : "Give your mentor enough context to help."}</p></div><form onSubmit={submit} className="space-y-4 px-4 pt-5">{notice ? <SuccessNotice text={notice} /> : null}<label className="block text-xs font-semibold text-[#244c47]">{isLog ? "What did you work on?" : "What is blocking you?"}<textarea name="entry" rows={5} placeholder={isLog ? "Connected the task list to the Express API and handled the loading state." : "The API returns 401 after refresh and I am not sure where the token is lost."} className="mt-2 w-full resize-none rounded-2xl border border-[#ceddd8] p-4 text-sm leading-6 text-[#143e3a] outline-none focus:border-[#008b7d]" /></label><label className="block text-xs font-semibold text-[#244c47]">{isLog ? "Time spent" : "How urgent is it?"}<select className="mt-2 w-full rounded-xl border border-[#ceddd8] bg-white p-3 text-sm text-[#143e3a]"><option>{isLog ? "About one hour" : "I can continue elsewhere"}</option><option>{isLog ? "About two hours" : "It blocks today's work"}</option><option>{isLog ? "More than three hours" : "It blocks the whole roadmap"}</option></select></label><button type="submit" className="w-full rounded-xl bg-[#00766c] px-4 py-3 text-sm font-semibold text-white">{isLog ? "Save daily log" : "Share with Aisha"}</button><p className="text-center text-[10px] leading-4 text-[#7b8d88]">This is a safe simulation. Nothing is submitted to a Pathment workspace.</p></form></>;
}

function ReviewForm({ notice, setNotice }: { notice: string; setNotice: (value: string) => void }) {
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setNotice("Priya's simulated review is complete. The real workspace was not changed."); }
  return <form onSubmit={submit} className="space-y-4 px-4 pt-5">{notice ? <SuccessNotice text={notice} /> : null}<div className="rounded-2xl border border-[#dce7e3] bg-white p-4"><div className="flex items-center gap-3"><Avatar person="priya" /><div className="flex-1"><p className="text-sm font-semibold text-[#143e3a]">Priya Sharma</p><p className="text-[11px] text-[#71847f]">Node fundamentals · Waiting 18 days</p></div><span className="rounded-full bg-[#fff0e0] px-2 py-1 text-[10px] font-semibold text-[#8d4305]">Oldest</span></div><div className="mt-4 rounded-xl bg-[#f1f6f4] p-3"><p className="text-[10px] font-semibold uppercase tracking-wider text-[#71847f]">Evidence</p><p className="mt-1 text-xs text-[#365f59]">GitHub repository, API walkthrough, and three passing tests.</p></div></div><label className="block text-xs font-semibold text-[#244c47]">Feedback<textarea required rows={4} defaultValue="Clear module structure and good error handling. Add one test for an expired token." className="mt-2 w-full resize-none rounded-2xl border border-[#ceddd8] p-4 text-sm leading-6 text-[#143e3a] outline-none focus:border-[#008b7d]" /></label><div className="grid grid-cols-2 gap-3"><label className="text-xs font-semibold text-[#244c47]">Points<input type="number" defaultValue="15" min="0" max="20" className="mt-2 w-full rounded-xl border border-[#ceddd8] p-3 text-sm" /></label><label className="text-xs font-semibold text-[#244c47]">Decision<select className="mt-2 w-full rounded-xl border border-[#ceddd8] bg-white p-3 text-sm"><option>Approve</option><option>Request changes</option></select></label></div><button type="submit" className="w-full rounded-xl bg-[#00766c] px-4 py-3 text-sm font-semibold text-white">Complete simulated review</button></form>;
}

function InboxScreen({ title, person, conversations }: { title: string; person: keyof typeof people; conversations: string[][] }) {
  return <><MobileHeader eyebrow="Messages" title={title} person={person} /><div className="space-y-3 px-4 pt-5"><label className="flex items-center gap-2 rounded-xl border border-[#dce7e3] bg-white px-3 py-2.5"><Search className="h-4 w-4 text-[#879993]" /><span className="text-xs text-[#879993]">Search conversations</span></label>{conversations.map(([name, message, time, avatar], index) => <button type="button" key={name} className="flex w-full items-center gap-3 rounded-2xl border border-[#dce7e3] bg-white p-4 text-left"><Avatar person={avatar as keyof typeof people} /><span className="min-w-0 flex-1"><strong className="block text-sm text-[#143e3a]">{name}</strong><span className="block truncate text-[11px] text-[#71847f]">{message}</span></span><span className="self-start text-[9px] text-[#8b9a96]">{time}</span>{index === 0 ? <i className="h-2 w-2 rounded-full bg-[#008b7d]" /> : null}</button>)}</div></>;
}

function JourneyStep({ state, title, meta }: { state: "done" | "active" | "ready" | "locked"; title: string; meta: string }) {
  const styles = state === "active" ? "border-[#80cbbd] bg-[#eef9f6]" : "border-[#dce7e3] bg-white";
  return <div className={`flex items-center gap-3 rounded-2xl border p-4 ${styles}`}><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${state === "done" ? "bg-[#00766c] text-white" : state === "active" ? "bg-[#d7f0e9] text-[#00766c]" : "bg-[#eef2f1] text-[#849590]"}`}>{state === "done" ? <Check className="h-4 w-4" /> : state === "active" ? <ArrowRight className="h-4 w-4" /> : <span className="text-xs font-semibold">{state === "ready" ? "3" : "4"}</span>}</span><div><p className="text-sm font-semibold text-[#143e3a]">{title}</p><p className="mt-0.5 text-[10px] text-[#71847f]">{meta}</p></div></div>;
}

function ActionPanel({ label, title, body, action, onClick }: { label: string; title: string; body: string; action: string; onClick: () => void }) {
  return <div className="rounded-2xl border border-[#d8e5e0] bg-white p-5 shadow-[0_14px_30px_-24px_rgba(7,61,59,.8)]"><p className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#008b7d]">{label}</p><h3 className="mt-2 text-lg font-medium text-[#143e3a]">{title}</h3><p className="mt-2 text-xs leading-5 text-[#71847f]">{body}</p><button type="button" onClick={onClick} className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#00766c]">{action}<ArrowRight className="h-4 w-4" /></button></div>;
}

function SectionTitle({ title, action, onClick }: { title: string; action?: string; onClick?: () => void }) {
  return <div className="flex items-center justify-between"><h3 className="text-sm font-semibold text-[#143e3a]">{title}</h3>{action ? <button type="button" onClick={onClick} className="text-[11px] font-semibold text-[#008b7d]">{action}</button> : null}</div>;
}

function ListItem({ title, subtitle, meta, last = false }: { title: string; subtitle: string; meta: string; last?: boolean }) {
  return <button type="button" className={`flex w-full items-center gap-3 px-4 py-3.5 text-left ${last ? "" : "border-b border-[#e4ece9]"}`}><span className="min-w-0 flex-1"><strong className="block truncate text-xs text-[#143e3a]">{title}</strong><span className="mt-0.5 block truncate text-[10px] text-[#71847f]">{subtitle}</span></span><span className="text-[10px] font-medium text-[#00766c]">{meta}</span><ChevronRight className="h-3.5 w-3.5 text-[#9caaa6]" /></button>;
}

function MiniMetric({ value, label }: { value: string; label: string }) {
  return <div className="rounded-xl border border-[#dfe9e6] bg-white p-3"><strong className="block text-lg text-[#123e3b]">{value}</strong><span className="mt-1 block text-[9px] uppercase tracking-wide text-[#80928d]">{label}</span></div>;
}

function Avatar({ person, size = "md" }: { person: keyof typeof people; size?: "md" | "lg" }) {
  return <Image src={people[person].image} alt={people[person].name} width={size === "lg" ? 52 : 40} height={size === "lg" ? 52 : 40} className={`${size === "lg" ? "h-13 w-13" : "h-10 w-10"} shrink-0 rounded-full object-cover`} />;
}

function SuccessNotice({ text }: { text: string }) {
  return <div role="status" className="flex gap-2 rounded-xl border border-[#addbce] bg-[#ecf8f4] p-3 text-[11px] leading-5 text-[#145f55]"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />{text}</div>;
}
