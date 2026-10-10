"use client";

import Image from "next/image";
import { useState, type FormEvent, type ReactNode } from "react";
import {
  Activity,
  Award,
  Ban,
  Bell,
  BookOpen,
  Building2,
  Calendar,
  CalendarRange,
  CalendarClock,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Compass,
  Copy,
  Download,
  ExternalLink,
  Eye,
  FileCheck2,
  FileJson,
  FileText,
  Filter,
  Flag,
  Gift,
  GraduationCap,
  GripVertical,
  KeyRound,
  Link2,
  Lock,
  Mail,
  Megaphone,
  MoreVertical,
  Palette,
  Percent,
  Pencil,
  Plus,
  RefreshCw,
  Route,
  Save,
  Search,
  Send,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Star,
  Trash2,
  TrendingDown,
  TrendingUp,
  Trophy,
  User,
  UserCheck,
  UserPlus,
  Users,
  UsersRound,
  Video,
  X,
} from "lucide-react";
import { people, type DemoPageId, type PersonKey } from "./demo-data";

type AdminProductPageProps = {
  page: DemoPageId;
  onNavigate: (page: DemoPageId) => void;
  onOpenPanel: (title: string, content: ReactNode) => void;
};

type Tone = "green" | "amber" | "red" | "gray" | "purple" | "blue";

export const demoInputClass =
  "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-[#54b5a8] focus:ring-2 focus:ring-[#d8f0eb]";

export const demoPrimaryButton =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-[#008b7d] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#00766c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#54b5a8] focus-visible:ring-offset-2";

export const demoSecondaryButton =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#54b5a8]";

const inputClass = demoInputClass;
const primaryButton = demoPrimaryButton;
const secondaryButton = demoSecondaryButton;

export function AdminProductPage({ page, onNavigate, onOpenPanel }: AdminProductPageProps) {
  switch (page) {
    case "admin-intake":
      return <IntakePage onOpenPanel={onOpenPanel} />;
    case "admin-assessments":
      return <AssessmentsPage onOpenPanel={onOpenPanel} />;
    case "admin-invites":
      return <InvitesPage />;
    case "admin-clans":
      return <ClansPage onOpenPanel={onOpenPanel} />;
    case "admin-mentors":
      return <MentorsPage onOpenPanel={onOpenPanel} />;
    case "admin-mentees":
      return <MenteesPage onOpenPanel={onOpenPanel} />;
    case "admin-enrollments":
      return <EnrollmentsPage />;
    case "admin-requests":
      return <ClanRequestsPage onOpenPanel={onOpenPanel} />;
    case "admin-programs":
      return <ProgramsPage onOpenPanel={onOpenPanel} />;
    case "admin-roadmaps":
      return <RoadmapsPage onOpenPanel={onOpenPanel} />;
    case "admin-schedules":
      return <SchedulesPage onOpenPanel={onOpenPanel} />;
    case "admin-library":
      return <LibraryPage onOpenPanel={onOpenPanel} />;
    case "admin-handbook":
      return <HandbookPage />;
    case "admin-certificates":
      return <CertificatesPage onOpenPanel={onOpenPanel} />;
    case "admin-nominations":
      return <NominationsPage onOpenPanel={onOpenPanel} />;
    case "admin-top-performers":
      return <TopPerformersPage />;
    case "admin-rewards":
      return <RewardsPage onOpenPanel={onOpenPanel} />;
    case "admin-announcements":
      return <AnnouncementsPage />;
    case "admin-meetings":
      return <MeetingsPage />;
    case "admin-moderation":
      return <ModerationPage />;
    case "admin-feedback":
      return <FeedbackPage onOpenPanel={onOpenPanel} />;
    case "admin-insights":
      return <InsightsPage onNavigate={onNavigate} />;
    case "admin-review-records":
      return <ReviewRecordsPage onOpenPanel={onOpenPanel} />;
    case "admin-activity":
      return <ActivityPage />;
    case "admin-followups":
      return <FollowUpsPage onOpenPanel={onOpenPanel} />;
    case "admin-access":
      return <AccessPage onOpenPanel={onOpenPanel} />;
    case "admin-emails":
      return <EmailQueuePage />;
    case "admin-changelog":
      return <ChangelogPage onOpenPanel={onOpenPanel} />;
    case "admin-settings":
      return <AdminSettingsPage />;
    default:
      return null;
  }
}

export function DemoPageHeader({ title, subtitle, icon: Icon, actions }: { title: string; subtitle: string; icon?: typeof Users; actions?: ReactNode }) {
  return (
    <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          {Icon ? <Icon className="h-6 w-6 text-[#008b7d]" aria-hidden="true" /> : null}
          {title}
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{subtitle}</p>
      </div>
      {actions}
    </header>
  );
}

const PageHeader = DemoPageHeader;

export function DemoCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,.03)] ${className}`}>{children}</section>;
}

const Card = DemoCard;

export function DemoStatCard({ icon: Icon, label, value, sub, tone = "green" }: { icon: typeof Users; label: string; value: string; sub?: string; tone?: Tone }) {
  const colors: Record<Tone, string> = {
    green: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    red: "bg-rose-50 text-rose-700",
    gray: "bg-slate-100 text-slate-600",
    purple: "bg-purple-50 text-purple-700",
    blue: "bg-sky-50 text-sky-700",
  };
  return (
    <Card className="h-full p-4">
      <div className="flex items-start gap-3">
        <span className={`rounded-lg p-2 ${colors[tone]}`}><Icon className="h-4 w-4" /></span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium leading-5 text-slate-500">{label}</p>
          <p className="mt-1 text-2xl font-semibold leading-8 tracking-tight text-slate-900 tabular-nums">{value}</p>
          {sub ? <p className="mt-1 text-xs leading-4 text-slate-500">{sub}</p> : null}
        </div>
      </div>
    </Card>
  );
}

const StatCard = DemoStatCard;

export function DemoStatus({ children, tone = "green" }: { children: ReactNode; tone?: Tone }) {
  const colors: Record<Tone, string> = {
    green: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    red: "bg-rose-50 text-rose-700",
    gray: "bg-slate-100 text-slate-600",
    purple: "bg-purple-50 text-purple-700",
    blue: "bg-sky-50 text-sky-700",
  };
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${colors[tone]}`}>{children}</span>;
}

const Status = DemoStatus;

export function DemoAvatar({ person, size = 38 }: { person: PersonKey; size?: number }) {
  const profile = people[person];
  return <Image src={profile.image} alt={`${profile.name}, fictional demo profile`} width={size} height={size} className="shrink-0 rounded-full object-cover" style={{ width: size, height: size }} />;
}

const Avatar = DemoAvatar;

export function DemoPerson({ person, label }: { person: PersonKey; label?: string }) {
  return (
    <span className="flex min-w-0 items-center gap-3">
      <Avatar person={person} size={36} />
      <span className="min-w-0"><strong className="block truncate text-sm font-semibold text-slate-900">{people[person].name}</strong><span className="block truncate text-xs text-slate-500">{label ?? people[person].email}</span></span>
    </span>
  );
}

const Person = DemoPerson;

export function DemoSearchBox({ value, onChange, placeholder }: { value: string; onChange: (value: string) => void; placeholder: string }) {
  return (
    <label className="relative block min-w-0 flex-1">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <span className="sr-only">{placeholder}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#54b5a8] focus:ring-2 focus:ring-[#d8f0eb]" />
    </label>
  );
}

const SearchBox = DemoSearchBox;

type PreviewField = { label: string; placeholder?: string; type?: "text" | "email" | "number" | "date" | "textarea" | "select"; options?: string[]; value?: string };

export function DemoPreviewForm({ intro, fields, submitLabel, successMessage, children }: { intro: string; fields: PreviewField[]; submitLabel: string; successMessage: string; children?: ReactNode }) {
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState(() => fields.map((field) => field.value ?? ""));
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };
  if (submitted) {
    return (
      <div role="status" className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
        <CheckCircle2 className="h-6 w-6 text-emerald-700" />
        <h3 className="mt-3 font-semibold text-emerald-950">Preview updated</h3>
        <p className="mt-2 text-sm leading-6 text-emerald-800">{successMessage}</p>
        <p className="mt-3 text-xs text-emerald-700">This public demo stores nothing and does not contact the production API.</p>
        <button type="button" onClick={() => setSubmitted(false)} className="mt-4 text-sm font-semibold text-emerald-800 underline underline-offset-4">Edit the preview</button>
      </div>
    );
  }
  return (
    <form onSubmit={submit} className="space-y-5">
      <p className="text-sm leading-6 text-slate-600">{intro}</p>
      {fields.map((field, index) => (
        <label key={`${field.label}-${index}`} className="block text-sm font-medium text-slate-700">
          {field.label}
          {field.type === "textarea" ? (
            <textarea required value={values[index]} onChange={(event) => setValues((current) => current.map((value, itemIndex) => itemIndex === index ? event.target.value : value))} placeholder={field.placeholder} rows={4} className={inputClass} />
          ) : field.type === "select" ? (
            <select required value={values[index]} onChange={(event) => setValues((current) => current.map((value, itemIndex) => itemIndex === index ? event.target.value : value))} className={inputClass}>
              <option value="">Select…</option>{field.options?.map((option) => <option key={option}>{option}</option>)}
            </select>
          ) : (
            <input required type={field.type ?? "text"} value={values[index]} onChange={(event) => setValues((current) => current.map((value, itemIndex) => itemIndex === index ? event.target.value : value))} placeholder={field.placeholder} className={inputClass} />
          )}
        </label>
      ))}
      {children}
      <button type="submit" className={`${primaryButton} w-full`}><Check className="h-4 w-4" />{submitLabel}</button>
    </form>
  );
}

const PreviewForm = DemoPreviewForm;

export function DemoDataTable({ columns, rows, onRow }: { columns: string[]; rows: ReactNode[][]; onRow?: (index: number) => void }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] text-left">
        <thead><tr className="border-b border-slate-100 bg-slate-50/70">{columns.map((column) => <th key={column} className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500">{column}</th>)}</tr></thead>
        <tbody>{rows.map((row, rowIndex) => <tr key={rowIndex} onClick={onRow ? () => onRow(rowIndex) : undefined} className={`border-b border-slate-100 last:border-0 ${onRow ? "cursor-pointer hover:bg-slate-50" : ""}`}>{row.map((cell, cellIndex) => <td key={cellIndex} className="px-4 py-4 text-sm text-slate-600">{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

const DataTable = DemoDataTable;

function AssessmentsPage({ onOpenPanel }: Pick<AdminProductPageProps, "onOpenPanel">) {
  const assessments = [
    { title: "MERN readiness check", description: "Baseline JavaScript, web, and problem-solving assessment.", questions: 12, responses: 18, score: "70 points", time: "35 min", status: "Published" },
    { title: "Collaboration scenario", description: "Structured response on feedback, ownership, and team decisions.", questions: 5, responses: 18, score: "20 points", time: "15 min", status: "Published" },
    { title: "Capstone interview rubric", description: "Consistent evidence criteria for final project interviews.", questions: 8, responses: 0, score: "40 points", time: "—", status: "Draft" },
  ];
  const assessmentForm = (editing?: typeof assessments[number]) => (
    <PreviewForm
      intro={editing ? "Changes would apply wherever this assessment is used." : "Build the assessment here without leaving Admissions."}
      fields={[
        { label: "Assessment title", value: editing?.title, placeholder: "e.g. MERN readiness check" },
        { label: "Short description", type: "textarea", value: editing?.description, placeholder: "Shown to applicants" },
        { label: "Status", type: "select", value: editing?.status ?? "Draft", options: ["Draft", "Published", "Archived"] },
        { label: "Passing score", type: "number", value: editing ? "70" : "" },
        { label: "Time limit (minutes)", type: "number", value: editing ? "35" : "" },
        { label: "AI scoring guide", type: "textarea", placeholder: "What does a strong candidate look like?" },
      ]}
      submitLabel={editing ? "Save assessment" : "Create assessment"}
      successMessage={`${editing ? "Assessment changes" : "The new assessment draft"} now appear in this local preview.`}
    >
      <div className="rounded-xl border border-dashed border-slate-300 p-4">
        <p className="text-sm font-semibold text-slate-800">Questions</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">Add multiple choice, long answer, code, file upload, rating, or yes/no questions.</p>
        <div className="mt-3 flex flex-wrap gap-2">{["Multiple choice", "Long answer", "Code", "File upload"].map((type) => <button key={type} type="button" className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs text-slate-600 hover:border-[#8fd0c5]">+ {type}</button>)}</div>
      </div>
    </PreviewForm>
  );
  return (
    <div className="space-y-6">
      <PageHeader title="Assessments" subtitle="Create structured applicant assessments and reuse them in an intake." actions={<button type="button" onClick={() => onOpenPanel("New assessment", assessmentForm())} className={primaryButton}><Plus className="h-4 w-4" />New assessment</button>} />
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {assessments.map((assessment) => (
          <Card key={assessment.title} className="flex flex-col p-5 transition hover:-translate-y-0.5 hover:border-[#a9d9d1] hover:shadow-md">
            <div className="flex items-start justify-between gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#e8f5f2] text-[#00766c]"><FileCheck2 className="h-5 w-5" /></span><Status tone={assessment.status === "Draft" ? "gray" : "green"}>{assessment.status}</Status></div>
            <h2 className="mt-4 font-semibold text-slate-900">{assessment.title}</h2>
            <p className="mt-2 flex-1 text-sm leading-6 text-slate-500">{assessment.description}</p>
            <div className="mt-5 grid grid-cols-3 gap-2 border-y border-slate-100 py-3 text-center"><div><strong className="block text-sm text-slate-800">{assessment.questions}</strong><span className="text-[10px] text-slate-500">Questions</span></div><div><strong className="block text-sm text-slate-800">{assessment.responses}</strong><span className="text-[10px] text-slate-500">Responses</span></div><div><strong className="block text-sm text-slate-800">{assessment.time}</strong><span className="text-[10px] text-slate-500">Time limit</span></div></div>
            <button type="button" onClick={() => onOpenPanel(`Edit ${assessment.title}`, assessmentForm(assessment))} className="mt-4 inline-flex items-center gap-2 self-start text-sm font-semibold text-[#008b7d]"><Pencil className="h-4 w-4" />Edit assessment</button>
          </Card>
        ))}
      </div>
    </div>
  );
}

function InvitesPage() {
  const [createdUrl, setCreatedUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [filter, setFilter] = useState("All invites");
  const [csvReady, setCsvReady] = useState(false);
  const invites = [
    { person: "Maya Patel", email: "mentee.maya@demo.pathment.com", role: "Mentee", placement: "MERN Fellows", created: "Oct 3, 2026", expires: "Used Oct 4", status: "Accepted" },
    { person: "Priya Sharma", email: "priya.sharma@demo.pathment.com", role: "Mentee", placement: "MERN Fellows", created: "Oct 3, 2026", expires: "Used Oct 4", status: "Accepted" },
    { person: "Jordan Tester", email: "jordan@example.test", role: "Mentee", placement: "MERN Fellows", created: "Today", expires: "In 7 days", status: "Pending" },
    { person: "Omar Farooq", email: "omar@example.test", role: "Mentor", placement: "Node Guild", created: "Sep 12, 2026", expires: "Expired", status: "Expired" },
  ];
  const visible = filter === "All invites" ? invites : invites.filter((invite) => invite.status === filter);
  return (
    <div className="space-y-6">
      <PageHeader title="Invites" subtitle="Mentor and mentee signup is invite-only. Create secure, one-time links and track whether each invite was used." />
      <details className="group rounded-2xl border border-slate-200 bg-white p-5" open>
        <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-[#00766c]">Invite one person <ChevronDown className="h-4 w-4 transition group-open:rotate-180" /></summary>
        <form onSubmit={(event) => { event.preventDefault(); setCreatedUrl("https://app.pathment.me/register/invite/demo-jordan-7d"); }} className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <label className="text-sm font-medium text-slate-700">Email<input required type="email" defaultValue="jordan@example.test" className={inputClass} /></label>
          <label className="text-sm font-medium text-slate-700">Role<select defaultValue="Mentee" className={inputClass}><option>Mentee</option><option>Mentor</option></select></label>
          <label className="text-sm font-medium text-slate-700">Program<select defaultValue="MERN Stack Engineering Fellowship" className={inputClass}><option>MERN Stack Engineering Fellowship</option></select></label>
          <label className="text-sm font-medium text-slate-700">Clan<select defaultValue="MERN Fellows" className={inputClass}><option>MERN Fellows</option><option>Node Guild</option><option>Assign later</option></select></label>
          <label className="text-sm font-medium text-slate-700">Expires in<select defaultValue="7 days" className={inputClass}><option>24 hours</option><option>7 days</option><option>30 days</option></select></label>
          <div className="flex items-end md:col-span-2 xl:col-span-3"><button type="submit" className={primaryButton}><Link2 className="h-4 w-4" />Create invite link</button></div>
        </form>
        {createdUrl ? <div role="status" className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4"><p className="text-sm font-semibold text-emerald-900">New demo invite link generated</p><p className="mt-1 text-xs text-emerald-700">This fictional link is displayed locally and is not active.</p><div className="mt-3 flex gap-2"><input readOnly value={createdUrl} className="min-w-0 flex-1 rounded-lg border border-emerald-200 bg-white px-3 py-2 text-xs text-slate-600" /><button type="button" onClick={() => setCopied(true)} className="rounded-lg bg-emerald-700 px-3 text-white" aria-label="Copy invite link"><Copy className="h-4 w-4" /></button></div>{copied ? <p className="mt-2 text-xs text-emerald-800">Copied for this preview.</p> : null}</div> : null}
      </details>
      <details className="group rounded-2xl border border-slate-200 bg-white p-5">
        <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-[#00766c]">Invite a group with CSV <ChevronDown className="h-4 w-4 transition group-open:rotate-180" /></summary>
        <div className="mt-5 rounded-xl border-2 border-dashed border-slate-200 p-7 text-center"><Download className="mx-auto h-6 w-6 text-slate-400" /><p className="mt-3 text-sm font-semibold text-slate-800">Upload invite CSV</p><p className="mt-1 text-xs text-slate-500">email, role, program, clan, expiryHours</p><div className="mt-4 flex flex-wrap justify-center gap-2"><button type="button" onClick={() => setCsvReady(true)} className={secondaryButton}>Load sample CSV</button><button type="button" className="text-sm font-medium text-[#008b7d]">Download template</button></div></div>
        {csvReady ? <div className="mt-4 overflow-hidden rounded-xl border border-slate-200"><DataTable columns={["Email", "Role", "Program", "Clan", "Validation"]} rows={[["alex@example.test", "Mentee", "MERN Fellowship", "MERN Fellows", <Status key="v" tone="green">Valid</Status>], ["no-email", "Mentor", "MERN Fellowship", "Node Guild", <Status key="i" tone="red">Invalid email</Status>]]} /><div className="flex items-center justify-between border-t border-slate-100 p-3"><span className="text-xs text-slate-500">1 valid · 1 needs correction</span><button type="button" className={primaryButton}>Send 1 invite</button></div></div> : null}
      </details>
      <Card>
        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-semibold text-slate-900">Invite inventory</h2><p className="mt-1 text-xs text-slate-500">Links are single-use and grant registration for the invited role only.</p></div><div className="flex gap-2"><select value={filter} onChange={(event) => setFilter(event.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm"><option>All invites</option><option>Pending</option><option>Accepted</option><option>Expired</option></select><button type="button" className="rounded-xl border border-slate-200 p-2 text-slate-500" aria-label="Refresh invites"><RefreshCw className="h-4 w-4" /></button></div></div>
        <DataTable columns={["Person", "Role & placement", "Created", "Expiry", "Status", "Actions"]} rows={visible.map((invite) => [<span key="p"><strong className="block text-slate-900">{invite.person}</strong><span className="text-xs">{invite.email}</span></span>, <span key="r"><strong className="block font-medium text-slate-800">{invite.role}</strong><span className="text-xs">{invite.placement}</span></span>, invite.created, invite.expires, <Status key="s" tone={invite.status === "Accepted" ? "green" : invite.status === "Pending" ? "amber" : "gray"}>{invite.status}</Status>, <button key="a" type="button" className="text-xs font-semibold text-[#008b7d]">{invite.status === "Expired" ? "Reissue" : "Details"}</button>])} />
      </Card>
    </div>
  );
}

function ClanAvatar({ name, src }: { name: string; src: string }) {
  return <Image src={src} alt={`${name} fictional clan artwork`} width={44} height={44} className="h-11 w-11 rounded-xl border border-slate-200 bg-white object-cover" />;
}

function ClansPage({ onOpenPanel }: Pick<AdminProductPageProps, "onOpenPanel">) {
  const clans = [
    { name: "MERN Fellows", image: "/demo/brand/dev-weekends-logo.svg", program: "MERN Stack Engineering Fellowship", level: "Level 2", lead: "Aisha Khan", leadPerson: "aisha" as PersonKey, mentees: 20, mentors: 2, join: "Open", tags: ["JavaScript", "React", "Node"] },
    { name: "Node Guild", image: "/demo/brand/badge-silver.png", program: "MERN Stack Engineering Fellowship", level: "Level 1", lead: "Omar Farooq", leadPerson: "elif" as PersonKey, mentees: 6, mentors: 1, join: "Approval", tags: ["Node.js", "APIs"] },
  ];
  const clanDetail = (clan: typeof clans[number]) => <div className="space-y-5"><div className="flex items-center gap-4"><ClanAvatar name={clan.name} src={clan.image} /><div><h3 className="font-semibold text-slate-900">{clan.name}</h3><p className="text-sm text-slate-500">{clan.program} · {clan.level}</p></div></div><Card className="p-4"><h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Clan details</h4><dl className="mt-3 grid grid-cols-2 gap-3 text-sm"><div><dt className="text-slate-400">Lead mentor</dt><dd className="font-medium text-slate-800">{clan.lead}</dd></div><div><dt className="text-slate-400">Public joining</dt><dd className="font-medium text-slate-800">{clan.join}</dd></div><div><dt className="text-slate-400">Mentees</dt><dd className="font-medium text-slate-800">{clan.mentees}</dd></div><div><dt className="text-slate-400">Mentors</dt><dd className="font-medium text-slate-800">{clan.mentors}</dd></div></dl></Card><div><h4 className="text-sm font-semibold text-slate-800">Members</h4><div className="mt-3 space-y-2">{(["maya", "priya", "elif"] as PersonKey[]).slice(0, clan.name === "MERN Fellows" ? 3 : 2).map((person) => <div key={person} className="flex items-center justify-between rounded-xl border border-slate-200 p-3"><Person person={person} /><Status>{person === "maya" ? "Co-mentor" : "Mentee"}</Status></div>)}</div></div></div>;
  return (
    <div className="space-y-6">
      <PageHeader title="Clans" subtitle="Group mentees under lead and co-mentors, control public joining, and manage membership." actions={<button type="button" onClick={() => onOpenPanel("New clan", <PreviewForm intro="Create a mentor-led group inside the selected program." fields={[{ label: "Clan name", placeholder: "e.g. React Rangers" }, { label: "Program", type: "select", options: ["MERN Stack Engineering Fellowship"] }, { label: "Lead mentor", type: "select", options: ["Aisha Khan", "Omar Farooq"] }, { label: "Level label", placeholder: "e.g. Level 2" }, { label: "Public joining", type: "select", options: ["Open", "Requires approval", "Closed"] }]} submitLabel="Create clan" successMessage="The new clan and its local preview avatar have been added to this demo." />)} className={primaryButton}><Plus className="h-4 w-4" />New clan</button>} />
      <Card className="p-4"><div className="flex flex-col gap-3 sm:flex-row"><SearchBox value="" onChange={() => {}} placeholder="Search clans…" /><select className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"><option>All programs</option><option>MERN Stack Engineering Fellowship</option></select><button type="button" className={secondaryButton}><Filter className="h-4 w-4" />Filters</button></div></Card>
      <Card>
        <DataTable columns={["Clan & program", "Lead mentor", "Mentees", "Mentors", "Public joining", "Manage"]} rows={clans.map((clan) => [<span key="c" className="flex items-center gap-3"><ClanAvatar name={clan.name} src={clan.image} /><span><strong className="block text-slate-900">{clan.name}</strong><span className="block text-xs">{clan.program} · {clan.level}</span><span className="mt-1 block text-[10px] text-slate-400">{clan.tags.join(" · ")}</span></span></span>, <Person key="l" person={clan.leadPerson} label={clan.lead} />, String(clan.mentees), String(clan.mentors), <Status key="j" tone={clan.join === "Open" ? "green" : "amber"}>{clan.join}</Status>, <button key="m" type="button" onClick={(event) => { event.stopPropagation(); onOpenPanel(clan.name, clanDetail(clan)); }} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700">Manage</button>])} onRow={(index) => onOpenPanel(clans[index].name, clanDetail(clans[index]))} />
      </Card>
    </div>
  );
}

function MentorsPage({ onOpenPanel }: Pick<AdminProductPageProps, "onOpenPanel">) {
  const [query, setQuery] = useState("");
  const mentors = [
    { person: "aisha" as PersonKey, name: "Aisha Khan", title: "Senior Software Engineer", org: "Dev Weekends", current: 8, max: 10, clan: "MERN Fellows", clanRole: "Lead", specs: ["React", "Node.js"], rating: "4.9", accepting: true },
    { person: "dana" as PersonKey, name: "Omar Farooq", title: "Backend Engineering Lead", org: "Northstar Labs", current: 6, max: 8, clan: "Node Guild", clanRole: "Lead", specs: ["APIs", "Databases"], rating: "4.8", accepting: true },
    { person: "maya" as PersonKey, name: "Sam Rivera", title: "Product Engineer", org: "Independent", current: 4, max: 4, clan: "MERN Fellows", clanRole: "Co", specs: ["UX", "Frontend"], rating: "4.7", accepting: false },
  ].filter((mentor) => `${mentor.name} ${mentor.title} ${mentor.org}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="space-y-6">
      <PageHeader title="Mentors" subtitle="All registered mentors on the platform" />
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4"><StatCard icon={GraduationCap} label="Total mentors" value="3" tone="purple" /><StatCard icon={UserCheck} label="Accepting now" value="2" sub="on this page" /><StatCard icon={TrendingDown} label="At full capacity" value="1" sub="on this page" tone="amber" /><StatCard icon={Star} label="Avg rating" value="4.8" sub="on this page" tone="blue" /></div>
      <Card className="p-4"><div className="flex flex-col gap-3 sm:flex-row"><SearchBox value={query} onChange={setQuery} placeholder="Search by name or email…" /><select className="rounded-xl border border-slate-200 bg-white px-3 text-sm"><option>All availability</option><option>Accepting mentees</option><option>At capacity</option></select></div></Card>
      <Card><DataTable columns={["Mentor", "Title / Organization", "Capacity", "Clans", "Specializations", "Status", "Actions"]} rows={mentors.map((mentor) => [<Person key="p" person={mentor.person} label={mentor.name} />, <span key="t"><strong className="block font-medium text-slate-900">{mentor.title}</strong><span className="text-xs">{mentor.org}</span></span>, <span key="c" className="block min-w-28"><span className="flex justify-between text-xs"><strong>{mentor.current}/{mentor.max}</strong><span>{Math.round(mentor.current / mentor.max * 100)}%</span></span><span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-slate-100"><span className={`block h-full rounded-full ${mentor.current === mentor.max ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: `${mentor.current / mentor.max * 100}%` }} /></span></span>, <span key="cl" className="inline-flex items-center gap-1 text-xs"><span className={`rounded px-1.5 py-0.5 ${mentor.clanRole === "Lead" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100"}`}>{mentor.clanRole}</span>{mentor.clan}</span>, <span key="sp" className="flex flex-wrap gap-1">{mentor.specs.map((spec) => <span key={spec} className="rounded-full bg-purple-50 px-2 py-0.5 text-xs text-purple-700">{spec}</span>)}</span>, <Status key="s" tone={mentor.accepting ? "green" : "gray"}>{mentor.accepting ? "Accepting" : "At capacity"}</Status>, <button key="a" type="button" onClick={() => onOpenPanel(`${mentor.name} account`, <PreviewForm intro="Review shared account details and workspace membership." fields={[{ label: "Display name", value: mentor.name }, { label: "Title", value: mentor.title }, { label: "Maximum mentees", type: "number", value: String(mentor.max) }, { label: "Availability", type: "select", value: mentor.accepting ? "Accepting mentees" : "At capacity", options: ["Accepting mentees", "At capacity"] }]} submitLabel="Save account preview" successMessage="The mentor account preview has been updated locally." />)} className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium">Account</button>])} /></Card>
    </div>
  );
}

function MenteesPage({ onOpenPanel }: Pick<AdminProductPageProps, "onOpenPanel">) {
  const [expanded, setExpanded] = useState<string | null>("Maya Patel");
  const [query, setQuery] = useState("");
  const mentees = [
    { person: "maya" as PersonKey, clan: "MERN Fellows", background: "Frontend developer · Lahore", progress: 66, points: 1450, streak: 18, active: "Today", status: "Active" },
    { person: "priya" as PersonKey, clan: "MERN Fellows", background: "CS student · Karachi", progress: 75, points: 1320, streak: 11, active: "Today", status: "Active" },
    { person: "elif" as PersonKey, clan: "MERN Fellows", background: "Junior engineer · Istanbul", progress: 63, points: 1240, streak: 9, active: "Yesterday", status: "Active" },
  ].filter((mentee) => people[mentee.person].name.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="space-y-6">
      <PageHeader title="Mentees" subtitle="All registered mentees on the platform" />
      <Card className="border-amber-200 bg-amber-50/40 p-4"><div className="flex items-start gap-3"><Clock3 className="mt-0.5 h-5 w-5 text-amber-700" /><div><p className="text-sm font-semibold text-amber-950">Inactive mentees</p><p className="mt-1 text-xs leading-5 text-amber-800">One participant is approaching the pause threshold. Review activity before changing access.</p></div><button type="button" onClick={() => onOpenPanel("Inactive mentees", <p className="text-sm leading-6 text-slate-600">Sara Ali has not been active for 14 days. In the live product, this panel shows evidence, contact history, and pause controls.</p>)} className="ml-auto text-xs font-semibold text-amber-900">Review</button></div></Card>
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4"><StatCard icon={GraduationCap} label="Total mentees" value="26" /><StatCard icon={BookOpen} label="Currently enrolled" value="26" tone="blue" /><StatCard icon={CheckCircle2} label="Programs completed" value="7" /><StatCard icon={Trophy} label="Total points earned" value="28,430" tone="amber" /></div>
      <Card className="p-4"><SearchBox value={query} onChange={setQuery} placeholder="Search by name or email…" /></Card>
      <Card className="overflow-hidden">
        <div className="hidden grid-cols-12 gap-4 bg-slate-50 p-4 text-xs font-semibold text-slate-500 sm:grid"><span className="col-span-5">Mentee</span><span className="col-span-3">Clan</span><span className="col-span-3">Background</span><span className="col-span-1 text-right">Details</span></div>
        {mentees.map((mentee) => { const name = people[mentee.person].name; const isOpen = expanded === name; return <div key={name} className="border-t border-slate-100 first:border-0"><button type="button" onClick={() => setExpanded(isOpen ? null : name)} aria-expanded={isOpen} className="grid w-full grid-cols-1 items-center gap-3 p-4 text-left sm:grid-cols-12"><span className="sm:col-span-5"><Person person={mentee.person} /></span><span className="text-sm font-medium text-slate-700 sm:col-span-3">{mentee.clan}</span><span className="text-sm text-slate-500 sm:col-span-3">{mentee.background}</span><span className="flex justify-end sm:col-span-1"><ChevronDown className={`h-4 w-4 text-slate-400 transition ${isOpen ? "rotate-180" : ""}`} /></span></button>{isOpen ? <div className="border-t border-slate-100 bg-slate-50/70 p-4"><div className="grid gap-3 md:grid-cols-3"><MiniDetail icon={BookOpen} title="Current enrollment" rows={[["Program", "MERN Fellowship"], ["Progress", `${mentee.progress}%`], ["Clan", mentee.clan]]} /><MiniDetail icon={Trophy} title="Recognition" rows={[["Points", `${mentee.points.toLocaleString()} pts`], ["Certificates", "0 issued"], ["Badges", "3 earned"]]} /><MiniDetail icon={Activity} title="Activity status" rows={[["Current streak", `${mentee.streak} days`], ["Last active", mentee.active], ["Status", mentee.status]]} /></div><div className="mt-4 flex flex-wrap justify-end gap-2"><button type="button" onClick={() => onOpenPanel(`${name} account`, <PreviewForm intro="Review shared account and workspace details." fields={[{ label: "Name", value: name }, { label: "Clan", type: "select", value: mentee.clan, options: ["MERN Fellows", "Node Guild"] }, { label: "Status", type: "select", value: mentee.status, options: ["Active", "Paused", "Suspended"] }]} submitLabel="Save account preview" successMessage="The mentee account preview has been updated locally." />)} className={secondaryButton}>Account</button><button type="button" onClick={() => onOpenPanel(`Move ${name}`, <PreviewForm intro="Move this mentee while preserving progress and review history." fields={[{ label: "Destination clan", type: "select", options: ["MERN Fellows", "Node Guild"] }, { label: "Reason", type: "textarea", placeholder: "Why is this move appropriate?" }]} submitLabel="Preview clan move" successMessage="The clan assignment has been changed in this local preview." />)} className={primaryButton}>Move mentee</button></div></div> : null}</div>; })}
      </Card>
    </div>
  );
}

function MiniDetail({ icon: Icon, title, rows }: { icon: typeof Users; title: string; rows: string[][] }) {
  return <div className="rounded-xl border border-slate-200 bg-white p-4"><p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500"><Icon className="h-4 w-4" />{title}</p><dl className="mt-3 space-y-2">{rows.map(([label, value]) => <div key={label} className="flex justify-between gap-3 text-xs"><dt className="text-slate-500">{label}</dt><dd className="font-semibold text-slate-800">{value}</dd></div>)}</dl></div>;
}

function IntakePage({ onOpenPanel }: Pick<AdminProductPageProps, "onOpenPanel">) {
  const [selected, setSelected] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const cohorts = [
    { id: "spring", name: "Spring 2026 Cohort", program: "MERN Stack Engineering Fellowship", state: "open", applicants: 32, pending: 12, accepted: 18 },
    { id: "autumn", name: "Autumn 2026 Cohort", program: "MERN Stack Engineering Fellowship", state: "planning", applicants: 0, pending: 0, accepted: 0 },
    { id: "leadership", name: "Engineering Leadership — October", program: "Engineering Leadership Track", state: "closed", applicants: 14, pending: 0, accepted: 8 },
  ];
  if (selected) {
    const cohort = cohorts.find((item) => item.id === selected)!;
    return <CohortApplications cohort={cohort} onBack={() => setSelected(null)} onOpenPanel={onOpenPanel} />;
  }
  const visible = cohorts.filter((cohort) => (status === "all" || cohort.state === status) && `${cohort.name} ${cohort.program}`.toLowerCase().includes(query.toLowerCase()));
  return <div className="space-y-6">
    <div className="flex flex-col justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-start"><div><h1 className="text-3xl font-semibold tracking-tight">Intake</h1><p className="mt-2 max-w-3xl text-sm text-slate-600">Run registration in cohorts. Import applicants, review them, and accept them into a program.</p></div><button type="button" onClick={() => onOpenPanel("New cohort", <CreateCohortForm />)} className={primaryButton}><Plus className="h-4 w-4" />New cohort</button></div>
    <div className="flex flex-col gap-3 sm:flex-row"><SearchBox value={query} onChange={setQuery} placeholder="Find an intake or program…" /><select aria-label="Intake status" value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"><option value="all">All statuses</option><option value="planning">Planning</option><option value="open">Open</option><option value="closed">Closed</option><option value="running">Running</option><option value="completed">Completed</option></select></div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{visible.map((cohort) => <button key={cohort.id} onClick={() => setSelected(cohort.id)} className="group block rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:border-[#69b9ad] hover:shadow-sm"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="truncate font-medium text-slate-900">{cohort.name}</p><p className="mt-0.5 truncate text-xs text-slate-500">{cohort.program}</p></div><Status tone={cohort.state === "open" ? "green" : cohort.state === "closed" ? "gray" : "amber"}>{cohort.state[0].toUpperCase() + cohort.state.slice(1)}</Status></div><div className="mt-4 grid grid-cols-3 gap-2 text-center"><div className="rounded-lg bg-slate-50 py-2"><p className="text-sm font-semibold">{cohort.applicants}</p><p className="text-[11px] text-slate-500">applicants</p></div><div className="rounded-lg bg-slate-50 py-2"><p className="text-sm font-semibold">{cohort.pending}</p><p className="text-[11px] text-slate-500">in review</p></div><div className="rounded-lg bg-emerald-50 py-2"><p className="text-sm font-semibold text-emerald-700">{cohort.accepted}</p><p className="text-[11px] text-slate-500">accepted</p></div></div><div className="mt-3 flex items-center justify-end text-xs font-medium text-[#008b7d]">Review applications <ChevronRight className="ml-0.5 h-3.5 w-3.5" /></div></button>)}</div>
    {!visible.length ? <Card className="p-12 text-center"><CalendarRange className="mx-auto h-10 w-10 text-slate-300" /><p className="mt-3 text-sm text-slate-600">No intakes match these filters.</p></Card> : null}
  </div>;
}

function CreateCohortForm() {
  return <form className="space-y-5" onSubmit={(event) => event.preventDefault()}><label className="block text-sm font-medium">Program<select className={inputClass}><option>MERN Stack Engineering Fellowship</option><option>Engineering Leadership Track</option></select></label><label className="block text-sm font-medium">Name<input className={inputClass} defaultValue="Summer 2027 Cohort" /></label><label className="block text-sm font-medium">Status<select className={inputClass}><option>Planning</option><option>Open</option><option>Closed</option><option>Running</option><option>Completed</option></select></label><div className="rounded-xl border border-[#b8e0d8] bg-[#eef8f5] p-4 text-sm leading-6 text-[#386b63]">After creation, open the cohort to configure its public application link, window, capacity, levels, form fields, and assessment pool.</div><button type="submit" className={`${primaryButton} w-full`}>Preview cohort creation</button><p className="text-center text-xs text-slate-500">Demo only—no cohort is created.</p></form>;
}

function CohortApplications({ cohort, onBack, onOpenPanel }: { cohort: { name: string; program: string; state: string; applicants: number; pending: number; accepted: number }; onBack: () => void; onOpenPanel: AdminProductPageProps["onOpenPanel"] }) {
  const [tab, setTab] = useState("All");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const applicants = [
    { person: "maya" as PersonKey, level: "Intermediate", score: 91, fit: "Match", submitted: "Oct 8", state: "accepted" },
    { person: "priya" as PersonKey, level: "Intermediate", score: 86, fit: "Match", submitted: "Oct 9", state: "under review" },
    { person: "elif" as PersonKey, level: "Beginner", score: 78, fit: "Match", submitted: "Oct 9", state: "scored" },
    { person: "dana" as PersonKey, level: "Advanced", score: 64, fit: "Review", submitted: "Oct 10", state: "pending" },
  ];
  const tabs = [["All",32],["Not submitted",4],["To score",6],["Scored",8],["Passed",7],["Accepted",18],["Level mismatch",1]] as const;
  const visible = applicants.filter((applicant) => applicant.person && people[applicant.person].name.toLowerCase().includes(query.toLowerCase()) && (tab === "All" || (tab === "Accepted" && applicant.state === "accepted") || (tab === "Scored" && applicant.state === "scored") || (tab === "To score" && applicant.state === "under review")));
  return <div className="space-y-6"><header><button type="button" onClick={onBack} className="mb-3 inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-[#008b7d]">← Back to cohorts</button><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div><h1 className="text-3xl font-semibold">{cohort.name}</h1><p className="mt-2 text-sm text-slate-500">{cohort.program}</p></div><div className="flex flex-wrap gap-2"><select aria-label="Cohort status" defaultValue={cohort.state} className="rounded-xl border border-slate-200 bg-white px-3 text-sm"><option value="open">Open</option><option value="planning">Planning</option><option value="closed">Closed</option></select><button type="button" onClick={() => onOpenPanel("Import applicants", <ImportApplicants />)} className={secondaryButton}><Download className="h-4 w-4 rotate-180" />Import CSV</button></div></div></header>
    <Card><button type="button" onClick={() => setSettingsOpen((open) => !open)} className="flex w-full items-center gap-3 p-5 text-left"><span className="rounded-xl bg-[#e5f5f1] p-2 text-[#00766c]"><Link2 className="h-5 w-5" /></span><span className="flex-1"><strong className="block">Admissions settings</strong><span className="mt-1 block text-xs text-slate-500">Public link enabled · assessment required · 3 applicant levels</span></span><ChevronDown className={`h-4 w-4 text-slate-400 transition ${settingsOpen ? "rotate-180" : ""}`} /></button>{settingsOpen ? <div className="grid gap-4 border-t border-slate-100 p-5 md:grid-cols-2"><label className="text-xs font-medium text-slate-500">Public application link<div className="mt-2 flex gap-2"><code className="min-w-0 flex-1 truncate rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs">pathment.me/apply/spring-2026</code><button className="rounded-lg border border-slate-200 p-2"><Copy className="h-4 w-4" /></button></div></label><label className="text-xs font-medium text-slate-500">Application window<div className="mt-2 grid grid-cols-2 gap-2"><input type="date" defaultValue="2026-09-01" className={inputClass} /><input type="date" defaultValue="2026-10-15" className={inputClass} /></div></label><label className="text-xs font-medium text-slate-500">Seats<input type="number" defaultValue="30" className={inputClass} /></label><label className="text-xs font-medium text-slate-500">Pass threshold<input type="number" defaultValue="75" className={inputClass} /></label><div className="flex justify-end md:col-span-2"><button className={primaryButton}><Save className="h-4 w-4" />Preview settings</button></div></div> : null}</Card>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-7">{tabs.map(([label,value]) => <button key={label} onClick={() => setTab(label)} className={`rounded-2xl border p-4 text-left ${tab === label ? "border-[#54b5a8] bg-[#eef8f5]" : "border-slate-200 bg-white"}`}><p className="text-2xl font-semibold">{value}</p><p className="mt-1 text-xs text-slate-500">{label}</p></button>)}</div>
    <Card><div className="space-y-4 border-b border-slate-100 p-4"><div className="flex flex-wrap items-end gap-3"><label className="text-xs font-medium text-slate-500">Selection<select className={inputClass}><option>All applicants</option><option>First 10</option><option>Passed only</option></select></label><label className="text-xs font-medium text-slate-500">Pass threshold<input type="number" defaultValue="75" className={`${inputClass} w-28`} /></label><button className={secondaryButton}><Sparkles className="h-4 w-4" />Run intake scoring</button><button className={secondaryButton}><RefreshCw className="h-4 w-4" />Refresh</button></div><div className="flex flex-col gap-3 md:flex-row"><SearchBox value={query} onChange={setQuery} placeholder="Search applicants…" /><select className="rounded-xl border border-slate-200 px-3 text-sm"><option>Any score</option><option>Passed</option><option>Below threshold</option></select><select className="rounded-xl border border-slate-200 px-3 text-sm"><option>Any level fit</option><option>Match</option><option>Mismatch</option></select><select className="rounded-xl border border-slate-200 px-3 text-sm"><option>Newest first</option><option>Name A–Z</option><option>Highest score</option></select></div></div><DataTable columns={["Applicant", "Level", "Assessment", "Level fit", "Submitted", "Status", ""]} rows={visible.map((applicant) => [<Person key="p" person={applicant.person} />, applicant.level, `${applicant.score}%`, <Status key="fit" tone={applicant.fit === "Match" ? "green" : "amber"}>{applicant.fit}</Status>, applicant.submitted, <Status key="s" tone={applicant.state === "accepted" ? "green" : applicant.state === "under review" ? "amber" : "blue"}>{applicant.state}</Status>, <button key="o" className="text-xs font-semibold text-[#008b7d]">Open</button>])} onRow={(index) => onOpenPanel(people[visible[index].person].name, <ApplicantReview applicant={visible[index]} />)} /></Card>
  </div>;
}

function ImportApplicants() { return <div className="space-y-4"><div className="rounded-2xl border-2 border-dashed border-slate-300 p-10 text-center"><FileText className="mx-auto h-8 w-8 text-slate-300" /><p className="mt-3 text-sm font-medium">Choose a CSV file</p><p className="mt-1 text-xs text-slate-500">First name, last name, email, phone, and level</p><button className={`${secondaryButton} mt-4`}>Select file</button></div><p className="rounded-xl bg-[#eef8f5] p-3 text-xs text-[#386b63]">The public demo never reads or uploads a file.</p></div>; }

function ApplicantReview({ applicant }: { applicant: { person: PersonKey; level: string; score: number; fit: string; submitted: string; state: string } }) {
  return <div className="space-y-5"><Person person={applicant.person} /><div className="flex flex-wrap gap-2"><Status tone="amber">{applicant.state}</Status><Status tone="gray">{applicant.level}</Status><Status>{applicant.fit} level fit</Status></div><div className="grid grid-cols-2 gap-3"><div className="rounded-xl bg-slate-50 p-3"><p className="text-xs text-slate-500">Assessment score</p><p className="mt-1 text-xl font-semibold">{applicant.score}%</p></div><div className="rounded-xl bg-slate-50 p-3"><p className="text-xs text-slate-500">Submitted</p><p className="mt-1 text-xl font-semibold">{applicant.submitted}</p></div></div><label className="block text-sm font-medium">Reviewer notes<textarea className={inputClass} rows={4} defaultValue="Strong fundamentals and clear reasoning. Review project scope before final decision." /></label><div><p className="text-sm font-semibold">Application details</p><dl className="mt-2 divide-y divide-slate-100 rounded-xl border border-slate-200 text-sm"><div className="flex gap-3 p-3"><dt className="w-32 text-slate-500">Motivation</dt><dd className="flex-1">Build production-ready full-stack applications and strengthen backend fundamentals.</dd></div><div className="flex gap-3 p-3"><dt className="w-32 text-slate-500">Availability</dt><dd className="flex-1">12–15 hours per week</dd></div></dl></div><div className="flex justify-end gap-2"><button className="rounded-xl border border-rose-200 px-4 py-2 text-sm font-medium text-rose-700">Reject</button><button className={primaryButton}><CheckCircle2 className="h-4 w-4" />Preview accept & invite</button></div><p className="text-center text-xs text-slate-500">Decision controls are simulated and do not change applicant data.</p></div>;
}

function EnrollmentsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All statuses");
  const enrollments = [
    { person: "maya" as PersonKey, program: "MERN Fellowship", status: "Active", mentor: "Aisha Khan", clan: "MERN Fellows", progress: "66%", started: "Aug 4, 2026" },
    { person: "priya" as PersonKey, program: "MERN Fellowship", status: "Active", mentor: "Aisha Khan", clan: "MERN Fellows", progress: "75%", started: "Aug 4, 2026" },
    { person: "elif" as PersonKey, program: "MERN Fellowship", status: "Active", mentor: "Aisha Khan", clan: "MERN Fellows", progress: "63%", started: "Aug 4, 2026" },
  ].filter((row) => people[row.person].name.toLowerCase().includes(query.toLowerCase()) && (status === "All statuses" || row.status === status));
  return <div className="space-y-6"><PageHeader title="Enrollment Overview" subtitle="Track mentee-mentor pairings and program progress" actions={<button type="button" className={secondaryButton}><Download className="h-4 w-4" />Export CSV</button>} /><div className="grid grid-cols-2 gap-4 xl:grid-cols-4"><StatCard icon={Users} label="Total enrollments" value="26" /><StatCard icon={CheckCircle2} label="Active" value="26" /><StatCard icon={Calendar} label="Completed" value="0" tone="blue" /><StatCard icon={Clock3} label="Paused" value="0" tone="amber" /></div><Card className="p-4"><div className="flex flex-col gap-3 sm:flex-row"><SearchBox value={query} onChange={setQuery} placeholder="Search mentee name, email or program…" /><select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-xl border border-slate-200 px-3 text-sm"><option>All statuses</option><option>Active</option><option>Paused</option><option>Completed</option></select></div></Card><Card><DataTable columns={["Mentee", "Program", "Status", "Mentor", "Clan", "Progress", "Started", "Actions"]} rows={enrollments.map((row) => [<Person key="p" person={row.person} />, row.program, <Status key="s">{row.status}</Status>, row.mentor, row.clan, <span key="pr" className="font-semibold text-slate-800">{row.progress}</span>, row.started, <button key="a" type="button" aria-label={`More actions for ${people[row.person].name}`} className="rounded-lg p-2 hover:bg-slate-100"><MoreVertical className="h-4 w-4" /></button>])} /></Card></div>;
}

function ClanRequestsPage({ onOpenPanel }: Pick<AdminProductPageProps, "onOpenPanel">) {
  const [decision, setDecision] = useState<"pending" | "approved" | "declined">("pending");
  return <div className="space-y-6"><PageHeader title="Clan requests" subtitle="Review standing-clan join requests and grant temporary cross-clan mentor support." /><Card className="p-5"><div className="flex items-start gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-slate-100 text-sm font-semibold">JT</span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h2 className="font-semibold text-slate-900">Jordan Tester</h2><Status tone={decision === "approved" ? "green" : decision === "declined" ? "gray" : "amber"}>{decision}</Status></div><p className="mt-1 text-xs text-slate-500">Requested MERN Fellows · From public clan link · 2 hours ago</p><p className="mt-4 rounded-xl bg-slate-50 p-3 text-sm leading-6 text-slate-600">“I found the clan through the community and would love to join the weekly review sessions.”</p>{decision === "pending" ? <div className="mt-4 flex gap-2"><button type="button" onClick={() => setDecision("approved")} className={primaryButton}><Check className="h-4 w-4" />Approve</button><button type="button" onClick={() => setDecision("declined")} className={secondaryButton}><X className="h-4 w-4" />Decline</button></div> : <button type="button" onClick={() => setDecision("pending")} className="mt-4 text-xs font-semibold text-[#008b7d]">Reset demo decision</button>}</div></div></Card><section><div className="mb-3 flex items-center justify-between"><div><h2 className="font-semibold text-slate-900">Cross-clan support <span className="font-normal text-slate-400">· 1</span></h2><p className="mt-1 text-xs text-slate-500">Temporary co-mentor access to another clan.</p></div><button type="button" onClick={() => onOpenPanel("Grant cross-clan access", <PreviewForm intro="Give someone temporary co-mentor access to another clan." fields={[{ label: "Person", type: "select", options: ["Aisha Khan", "Omar Farooq", "Sam Rivera"] }, { label: "Clan", type: "select", options: ["MERN Fellows", "Node Guild"] }, { label: "Access until", type: "date" }, { label: "Reason", type: "textarea", placeholder: "What support will they provide?" }]} submitLabel="Grant demo access" successMessage="The temporary role is visible in this local preview." />)} className={secondaryButton}><UserPlus className="h-4 w-4" />Grant access</button></div><Card className="p-4"><div className="flex items-center gap-3"><Avatar person="aisha" /><div className="flex-1"><p className="text-sm font-semibold text-slate-900">Aisha Khan → Node Guild</p><p className="mt-1 text-xs text-slate-500">Co-mentor support · Until Oct 31 · Granted by Dana Reyes</p></div><Status tone="purple">Temporary</Status></div></Card></section></div>;
}

function ProgramsPage({ onOpenPanel }: Pick<AdminProductPageProps, "onOpenPanel">) {
  const [query, setQuery] = useState("");
  const programs = [
    { name: "MERN Stack Engineering Fellowship", description: "A mentor-led pathway from JavaScript foundations to a production capstone.", type: "Mentorship", dates: "Aug 4 – Nov 21, 2026", duration: "16 weeks", participants: 26, clans: 2, status: "Published", tags: ["MERN", "Career launch", "Evidence-based"] },
    { name: "Engineering Leadership Track", description: "An eight-week development program for emerging technical leads.", type: "Training", dates: "Jan 11 – Mar 7, 2027", duration: "8 weeks", participants: 0, clans: 0, status: "Draft", tags: ["Leadership", "Coaching"] },
  ].filter((program) => program.name.toLowerCase().includes(query.toLowerCase()));
  const create = <PreviewForm intro="Start with the essentials. Curriculum is added after the program is created." fields={[{ label: "Program name", placeholder: "e.g. Full-Stack Web Development" }, { label: "Description", type: "textarea", placeholder: "Objectives, outcomes, and focus areas" }, { label: "Type", type: "select", options: ["Internship", "Mentorship", "Training", "Onboarding"] }, { label: "Status", type: "select", options: ["Draft", "Published"] }, { label: "Visibility", type: "select", options: ["Private — invite-only", "Public — discoverable"] }, { label: "Duration (weeks)", type: "number", value: "12" }, { label: "Hours per week", type: "number", value: "8" }, { label: "Start date", type: "date" }, { label: "End date", type: "date" }]} submitLabel="Create program" successMessage="The program draft has been created in this local preview." />;
  return <div className="space-y-6"><PageHeader title="Programs" subtitle="Manage all mentorship programs" actions={<button type="button" onClick={() => onOpenPanel("Create program", create)} className={primaryButton}><Plus className="h-4 w-4" />Create Program</button>} /><Card className="p-4"><div className="flex flex-col gap-3 sm:flex-row"><SearchBox value={query} onChange={setQuery} placeholder="Search programs…" /><select className="rounded-xl border border-slate-200 px-3 text-sm"><option>All statuses</option><option>Published</option><option>Draft</option></select><select className="rounded-xl border border-slate-200 px-3 text-sm"><option>All types</option><option>Mentorship</option><option>Training</option></select></div></Card><div className="grid gap-5 lg:grid-cols-2">{programs.map((program) => <Card key={program.name} className="overflow-hidden"><div className="h-2 bg-gradient-to-r from-[#008b7d] via-[#48a997] to-[#b9e0d8]" /><div className="p-5"><div className="flex items-start justify-between gap-4"><div><Status tone={program.status === "Published" ? "green" : "gray"}>{program.status}</Status><h2 className="mt-3 text-lg font-semibold text-slate-900">{program.name}</h2><p className="mt-2 text-sm leading-6 text-slate-500">{program.description}</p></div><button type="button" aria-label={`More actions for ${program.name}`} className="rounded-lg p-2 hover:bg-slate-100"><MoreVertical className="h-4 w-4" /></button></div><div className="mt-4 flex flex-wrap gap-2">{program.tags.map((tag) => <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] text-slate-600">{tag}</span>)}</div><dl className="mt-5 grid grid-cols-2 gap-3 border-y border-slate-100 py-4 text-xs sm:grid-cols-4"><div><dt className="text-slate-400">Type</dt><dd className="mt-1 font-semibold text-slate-800">{program.type}</dd></div><div><dt className="text-slate-400">Duration</dt><dd className="mt-1 font-semibold text-slate-800">{program.duration}</dd></div><div><dt className="text-slate-400">People</dt><dd className="mt-1 font-semibold text-slate-800">{program.participants}</dd></div><div><dt className="text-slate-400">Clans</dt><dd className="mt-1 font-semibold text-slate-800">{program.clans}</dd></div></dl><div className="mt-4 flex items-center justify-between gap-3"><span className="text-xs text-slate-500">{program.dates}</span><div className="flex gap-2"><button type="button" onClick={() => onOpenPanel(`Edit ${program.name}`, create)} className={secondaryButton}><Pencil className="h-4 w-4" />Edit</button><button type="button" className={primaryButton}>Open</button></div></div></div></Card>)}</div></div>;
}

function RoadmapsPage({ onOpenPanel }: Pick<AdminProductPageProps, "onOpenPanel">) {
  const [query, setQuery] = useState("");
  const roadmaps = [
    { name: "MERN Stack Mastery", description: "Five progressive phases covering web foundations, React, Node, databases, and capstone delivery.", skills: ["JavaScript", "React", "Node.js"], steps: ["Web foundations", "React applications", "Node & Express", "Data modeling", "Capstone"] },
    { name: "Frontend Interview Preparation", description: "Practice track for JavaScript, React, system thinking, and communication.", skills: ["Interviews", "Frontend"], steps: ["JavaScript deep dive", "React patterns", "Mock interview"] },
  ].filter((roadmap) => roadMapText(roadmap).includes(query.toLowerCase()));
  const form = (name = "") => <PreviewForm intro="Build a reusable organization roadmap. Mentors can import it into their clan curriculum." fields={[{ label: "Roadmap name", value: name, placeholder: "e.g. MERN Stack Mastery" }, { label: "Description", type: "textarea", placeholder: "What will learners achieve?" }, { label: "Program", type: "select", options: ["Workspace library", "MERN Stack Engineering Fellowship"] }, { label: "Skill tags", placeholder: "JavaScript, React, Node.js" }]} submitLabel={name ? "Save roadmap" : "Create roadmap"} successMessage="The roadmap and its steps have been updated in this local preview." ><div className="rounded-xl border border-slate-200 p-4"><div className="flex items-center justify-between"><strong className="text-sm text-slate-800">Roadmap steps</strong><button type="button" className="text-xs font-semibold text-[#008b7d]">+ Add step</button></div>{["Orientation", "Core skills", "Applied project"].map((step, index) => <div key={step} className="mt-3 flex items-center gap-2 rounded-lg bg-slate-50 p-2.5"><GripVertical className="h-4 w-4 text-slate-300" /><span className="grid h-6 w-6 place-items-center rounded-full bg-white text-[10px] font-bold text-slate-500">{index + 1}</span><span className="text-sm text-slate-700">{step}</span></div>)}</div></PreviewForm>;
  return <div className="space-y-6"><PageHeader title="Org Roadmaps" subtitle="Reusable learning paths mentors can import and tailor for their clans." icon={Route} actions={<button type="button" onClick={() => onOpenPanel("New roadmap", form())} className={primaryButton}><Plus className="h-4 w-4" />New roadmap</button>} /><Card className="p-4"><SearchBox value={query} onChange={setQuery} placeholder="Search roadmaps or skills…" /></Card><div className="grid gap-4 lg:grid-cols-2">{roadmaps.map((roadmap) => <Card key={roadmap.name} className="p-5"><div className="flex items-start justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#e8f5f2] text-[#00766c]"><Route className="h-5 w-5" /></span><div className="flex gap-1"><button type="button" aria-label="Export as JSON" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><FileJson className="h-4 w-4" /></button><button type="button" onClick={() => onOpenPanel(`Edit ${roadmap.name}`, form(roadmap.name))} aria-label={`Edit ${roadmap.name}`} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><Pencil className="h-4 w-4" /></button></div></div><h2 className="mt-4 font-semibold text-slate-900">{roadmap.name}</h2><p className="mt-2 text-sm leading-6 text-slate-500">{roadmap.description}</p><div className="mt-3 flex gap-1.5">{roadmap.skills.map((skill) => <span key={skill} className="rounded-full bg-slate-100 px-2 py-1 text-[10px] text-slate-600">{skill}</span>)}</div><ol className="mt-5 space-y-2 border-t border-slate-100 pt-4">{roadmap.steps.map((step, index) => <li key={step} className="flex items-center gap-3 text-sm text-slate-600"><span className="grid h-6 w-6 place-items-center rounded-full bg-[#e8f5f2] text-[10px] font-bold text-[#00766c]">{index + 1}</span>{step}</li>)}</ol><div className="mt-5 flex items-center justify-between text-xs text-slate-500"><span>{roadmap.steps.length} steps</span><button type="button" onClick={() => onOpenPanel(`Edit ${roadmap.name}`, form(roadmap.name))} className="font-semibold text-[#008b7d]">Edit roadmap</button></div></Card>)}</div></div>;
}

function roadMapText(roadmap: { name: string; skills: string[] }) { return `${roadmap.name} ${roadmap.skills.join(" ")}`.toLowerCase(); }

function SchedulesPage({ onOpenPanel }: Pick<AdminProductPageProps, "onOpenPanel">) {
  const templates = [{ name: "Focused learning day", description: "A balanced day with a short standup, two focus blocks, and reflection.", blocks: [["09:00", "Daily standup", "Mon–Fri"], ["09:30", "Roadmap focus", "Mon–Fri"], ["15:30", "Evidence & reflection", "Mon, Wed, Fri"]] }, { name: "Review Friday", description: "A consistent end-of-week review rhythm for every clan.", blocks: [["15:00", "Submission cleanup", "Friday"], ["16:00", "Clan review", "Friday"], ["17:00", "Mentor follow-ups", "Friday"]] }];
  const form = (name = "") => <PreviewForm intro="Author a day-shape template. Mentors import it and connect each block to roadmap or recurring work." fields={[{ label: "Template name", value: name, placeholder: "e.g. Focused learning day" }, { label: "Description", type: "textarea" }]} submitLabel={name ? "Save template" : "Create template"} successMessage="The schedule template has been updated in this local preview."><div className="space-y-2"><p className="text-sm font-semibold text-slate-800">Blocks</p>{[["Daily standup", "09:00"], ["Roadmap focus", "09:30"]].map(([label, time]) => <div key={label} className="grid grid-cols-[88px_1fr] gap-2"><input type="time" defaultValue={time} className={inputClass} /><input defaultValue={label} className={inputClass} /></div>)}<button type="button" className="text-xs font-semibold text-[#008b7d]">+ Add block</button></div></PreviewForm>;
  return <div className="space-y-6"><PageHeader title="Org Schedule Templates" subtitle="Author day-shape templates—standups, study blocks, and rituals—that mentors can import." icon={CalendarClock} actions={<button type="button" onClick={() => onOpenPanel("New org template", form())} className={primaryButton}><Plus className="h-4 w-4" />New template</button>} /><div className="grid gap-4 lg:grid-cols-2">{templates.map((template) => <Card key={template.name} className="overflow-hidden"><div className="flex items-start justify-between border-b border-slate-100 p-5"><div><h2 className="font-semibold text-slate-900">{template.name}</h2><p className="mt-1 max-w-xl text-sm leading-6 text-slate-500">{template.description}</p></div><div className="flex"><button type="button" aria-label="Export template" className="rounded-lg p-2 text-slate-400"><FileJson className="h-4 w-4" /></button><button type="button" onClick={() => onOpenPanel(`Edit ${template.name}`, form(template.name))} aria-label={`Edit ${template.name}`} className="rounded-lg p-2 text-slate-400"><Pencil className="h-4 w-4" /></button></div></div><ul className="divide-y divide-slate-100">{template.blocks.map(([time, label, days]) => <li key={`${time}-${label}`} className="flex items-center gap-4 px-5 py-3"><span className="w-14 text-xs font-semibold text-[#00766c]">{time}</span><span className="flex-1 text-sm font-medium text-slate-800">{label}</span><span className="text-xs text-slate-400">{days}</span></li>)}</ul></Card>)}</div></div>;
}

function LibraryPage({ onOpenPanel }: Pick<AdminProductPageProps, "onOpenPanel">) {
  const [kind, setKind] = useState("All resources");
  const [query, setQuery] = useState("");
  const resources = [{ title: "Accessible React checklist", kind: "Document", topic: "Frontend", description: "A practical checklist for accessible components and interaction states.", icon: FileText }, { title: "Node API review rubric", kind: "Template", topic: "Backend", description: "Evidence criteria for routing, middleware, validation, and error handling.", icon: FileCheck2 }, { title: "Capstone deployment guide", kind: "Guide", topic: "Capstone", description: "From environment configuration to monitoring a production release.", icon: ExternalLink }].filter((resource) => (kind === "All resources" || resource.kind === kind) && resource.title.toLowerCase().includes(query.toLowerCase()));
  const form = <PreviewForm intro="Curate a reusable resource for mentors and mentees." fields={[{ label: "Title", placeholder: "Resource title" }, { label: "Description", type: "textarea" }, { label: "Type", type: "select", options: ["Document", "Template", "Guide", "Link"] }, { label: "Topic", type: "select", options: ["Frontend", "Backend", "Capstone", "Career"] }, { label: "Resource URL", placeholder: "https://…" }, { label: "Visibility", type: "select", options: ["Everyone", "Mentors", "Admins"] }]} submitLabel="Add resource" successMessage="The resource is now visible in this local library preview." />;
  return <div className="space-y-6"><PageHeader title="Library" subtitle="Shared organization resources for mentors and mentees." icon={BookOpen} actions={<button type="button" onClick={() => onOpenPanel("Add resource", form)} className={primaryButton}><Plus className="h-4 w-4" />Add resource</button>} /><Card className="p-4"><div className="flex flex-col gap-3 sm:flex-row"><SearchBox value={query} onChange={setQuery} placeholder="Search the library…" /><select value={kind} onChange={(event) => setKind(event.target.value)} className="rounded-xl border border-slate-200 px-3 text-sm"><option>All resources</option><option>Document</option><option>Template</option><option>Guide</option></select></div></Card><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{resources.map((resource) => { const Icon = resource.icon; return <Card key={resource.title} className="flex flex-col p-5"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#e8f5f2] text-[#00766c]"><Icon className="h-5 w-5" /></span><div className="mt-4 flex items-center gap-2"><Status tone="blue">{resource.kind}</Status><span className="text-xs text-slate-400">{resource.topic}</span></div><h2 className="mt-3 font-semibold text-slate-900">{resource.title}</h2><p className="mt-2 flex-1 text-sm leading-6 text-slate-500">{resource.description}</p><div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4"><span className="text-xs text-slate-400">Workspace resource</span><button type="button" onClick={() => onOpenPanel(resource.title, <div><p className="text-sm leading-6 text-slate-600">{resource.description}</p><button type="button" className={`${primaryButton} mt-4`}><Eye className="h-4 w-4" />Open preview</button></div>)} className="text-sm font-semibold text-[#008b7d]">Open</button></div></Card>; })}</div></div>;
}

function HandbookPage() {
  const [saved, setSaved] = useState(false);
  const sections = [{ title: "Intro", content: "Welcome mentors to the MERN Fellowship and explain how your work shapes learner outcomes." }, { title: "Principles", content: "Be specific, review evidence, unblock before instructing, and keep decisions visible." }, { title: "Time commitment", content: "Two review windows, one weekly clan session, and responsive roadblock support." }, { title: "Responsibilities", content: "Review submissions, track momentum, document follow-ups, and escalate operational risks." }, { title: "Code of conduct", content: "Create a respectful, inclusive, and evidence-led learning environment." }, { title: "FAQs", content: "Common guidance for missed reviews, paused mentees, extensions, and role boundaries." }];
  return <div className="space-y-6"><PageHeader title="Mentor handbook" subtitle="The operating guidance every mentor sees in their workspace." icon={Compass} actions={<button type="button" onClick={() => setSaved(true)} className={primaryButton}><Save className="h-4 w-4" />Save handbook</button>} />{saved ? <div role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">Handbook changes applied to this local preview. Nothing was sent.</div> : null}<div className="grid gap-5 xl:grid-cols-[220px_minmax(0,1fr)]"><Card className="h-fit p-3"><p className="px-2 py-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Sections</p>{sections.map((section) => <a key={section.title} href={`#demo-handbook-${section.title.toLowerCase().replaceAll(" ", "-")}`} className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">{section.title}</a>)}</Card><div className="space-y-4">{sections.map((section) => <Card key={section.title} className="p-5" ><div id={`demo-handbook-${section.title.toLowerCase().replaceAll(" ", "-")}`} className="scroll-mt-24"><div className="flex items-center justify-between"><h2 className="font-semibold text-slate-900">{section.title}</h2>{section.title !== "Intro" ? <button type="button" className="text-xs font-semibold text-[#008b7d]">+ Add</button> : null}</div>{section.title === "Intro" ? <textarea defaultValue={section.content} rows={4} className={`${inputClass} mt-4`} /> : <div className="mt-4 flex items-start gap-2 rounded-xl border border-slate-200 p-3"><GripVertical className="mt-2 h-4 w-4 text-slate-300" /><textarea defaultValue={section.content} rows={3} className="flex-1 resize-none bg-transparent text-sm leading-6 text-slate-700 outline-none" /><button type="button" aria-label={`Remove ${section.title} item`} className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"><Trash2 className="h-4 w-4" /></button></div>}</div></Card>)}</div></div></div>;
}

function CertificatesPage({ onOpenPanel }: Pick<AdminProductPageProps, "onOpenPanel">) {
  const templates = [{ name: "MERN Fellowship Certificate", program: "MERN Stack Engineering Fellowship", date: "Aug 1, 2026", creator: "Dana R.", tone: "from-[#064d47] to-[#0b8d80]" }, { name: "Capstone Distinction", program: "MERN Stack Engineering Fellowship", date: "Sep 18, 2026", creator: "Dana R.", tone: "from-[#4338ca] to-[#7c3aed]" }];
  const form = <PreviewForm intro="Create a certificate template with program, branding, and dynamic recipient fields." fields={[{ label: "Template name", placeholder: "e.g. MERN Fellowship Certificate" }, { label: "Program", type: "select", options: ["MERN Stack Engineering Fellowship"] }, { label: "Credential title", value: "Certificate of Completion" }, { label: "Signer name", value: "Dana Reyes" }, { label: "Eligibility rule", type: "select", options: ["Program completed", "Admin approval", "Mentor recommendation"] }]} submitLabel="Create template" successMessage="The certificate template is ready in this local preview." />;
  return <div className="space-y-6"><PageHeader title="Certificates" subtitle="Design templates, grade a cohort, and issue credentials clan by clan." actions={<div className="flex gap-3"><select className="rounded-xl border border-slate-200 px-3 text-sm"><option>All programs</option><option>MERN Stack Engineering Fellowship</option></select><button type="button" onClick={() => onOpenPanel("Create Template", form)} className={primaryButton}><Plus className="h-4 w-4" />Create Template</button></div>} /><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{templates.map((template) => <Card key={template.name} className="overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md"><div className={`relative aspect-[1.55] bg-gradient-to-br ${template.tone} p-5 text-white`}><div className="absolute inset-3 rounded-xl border border-white/30" /><div className="relative grid h-full place-items-center text-center"><div><Image src="/logo-inverse.svg" alt="Pathment" width={92} height={24} className="mx-auto h-6 w-auto" /><p className="mt-7 text-[10px] uppercase tracking-[.25em] text-white/70">Certificate of completion</p><p className="mt-2 font-serif text-xl">Maya Patel</p><p className="mt-2 text-[9px] text-white/70">MERN Stack Engineering Fellowship</p></div></div></div><div className="p-5"><Status>{template.program}</Status><h2 className="mt-3 font-semibold text-slate-900">{template.name}</h2><p className="mt-3 flex items-center gap-3 border-t border-slate-100 pt-3 text-[11px] text-slate-500"><Calendar className="h-3.5 w-3.5 text-[#008b7d]" />{template.date}<User className="ml-2 h-3.5 w-3.5 text-[#008b7d]" />{template.creator}</p><div className="mt-4 flex gap-2"><button type="button" onClick={() => onOpenPanel(`Issue & Manage — ${template.name}`, <CertificateManager />)} className={`${primaryButton} flex-1`}><Award className="h-4 w-4" />Issue & Manage</button><button type="button" aria-label={`Delete ${template.name}`} className="rounded-xl border border-rose-100 bg-rose-50 p-2 text-rose-600"><Trash2 className="h-4 w-4" /></button></div></div></Card>)}</div></div>;
}

function CertificateManager() {
  const [selected, setSelected] = useState("maya");
  const person = selected as PersonKey;
  return <div className="space-y-4"><p className="text-sm leading-6 text-slate-600">Review evidence and eligibility before issuing. This demo never creates a real credential.</p>{(["maya", "priya", "elif"] as PersonKey[]).map((key) => <button type="button" key={key} onClick={() => setSelected(key)} className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left ${selected === key ? "border-[#5dbbad] bg-[#eef8f5]" : "border-slate-200"}`}><Avatar person={key} /><span className="flex-1"><strong className="block text-sm text-slate-900">{people[key].name}</strong><span className="text-xs text-slate-500">{key === "maya" ? "21/32 steps · Recommended" : key === "priya" ? "24/32 steps · Review pending" : "20/32 steps"}</span></span>{selected === key ? <CheckCircle2 className="h-5 w-5 text-[#008b7d]" /> : null}</button>)}<button type="button" className={`${primaryButton} w-full`}><Award className="h-4 w-4" />Preview certificate for {people[person].name}</button></div>;
}

function NominationsPage({ onOpenPanel }: Pick<AdminProductPageProps, "onOpenPanel">) {
  const [decision, setDecision] = useState("Awaiting review");
  return <div className="space-y-6"><PageHeader title="Co-mentor nominations" subtitle="Review mentor recommendations, readiness, and willingness before granting responsibility. This is a role change—not a performance award." icon={TrendingUp} /><section><h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Awaiting your review (1)</h2><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"><Card className="p-5"><div className="flex items-start gap-3"><Avatar person="maya" size={44} /><div className="min-w-0 flex-1"><h3 className="font-semibold text-slate-900">Maya Patel</h3><p className="mt-1 text-xs text-slate-500">Nominated by Aisha Khan · MERN Fellows</p></div><Status tone={decision === "Approved" ? "green" : decision === "Declined" ? "gray" : "amber"}>{decision}</Status></div><blockquote className="mt-4 rounded-xl bg-slate-50 p-3 text-sm leading-6 text-slate-600">“Maya consistently unblocks peers, explains trade-offs clearly, and has five strong reviewed submissions.”</blockquote><div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs"><div className="rounded-lg border border-slate-100 p-2"><strong className="block text-slate-900">5</strong><span className="text-slate-400">reviews</span></div><div className="rounded-lg border border-slate-100 p-2"><strong className="block text-slate-900">92%</strong><span className="text-slate-400">on time</span></div><div className="rounded-lg border border-slate-100 p-2"><strong className="block text-slate-900">18d</strong><span className="text-slate-400">streak</span></div></div>{decision === "Awaiting review" ? <div className="mt-4 grid grid-cols-2 gap-2"><button type="button" onClick={() => onOpenPanel("Approve Maya Patel as co-mentor", <PreviewForm intro="This grants mentoring responsibilities. Choose the clan and scope they will support." fields={[{ label: "Clan", type: "select", options: ["MERN Fellows", "Node Guild"] }, { label: "Permission scope", type: "select", options: ["Reviews and feedback", "Full clan mentoring", "Community support only"] }, { label: "Decision note", type: "textarea", placeholder: "Document why this role is appropriate" }]} submitLabel="Approve nomination" successMessage="Maya is shown as a co-mentor in this local preview." />)} className={primaryButton}><Check className="h-4 w-4" />Approve</button><button type="button" onClick={() => setDecision("Declined")} className={secondaryButton}><X className="h-4 w-4" />Decline</button></div> : <button type="button" onClick={() => setDecision("Awaiting review")} className="mt-4 text-xs font-semibold text-[#008b7d]">Reset decision</button>}</Card></div></section></div>;
}

function TopPerformersPage() {
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("Nominated");
  return <div className="space-y-6"><PageHeader title="Top performers" subtitle="Mentors put people forward and say why. The record ranks them independently. You decide." icon={Trophy} actions={<select className="rounded-xl border border-slate-200 px-3 py-2 text-sm"><option>MERN Stack Engineering Fellowship</option></select>} /><section className="space-y-3"><h2 className="font-semibold text-slate-900">Waiting on you <span className="font-normal text-slate-500">(1)</span></h2><Card className="p-5"><div className="flex flex-wrap items-start justify-between gap-3"><Person person="maya" label="MERN Fellows · Nominated by Aisha Khan" /><Status tone={status === "Awarded" ? "green" : status === "Declined" ? "gray" : "amber"}>{status}</Status></div><div className="mt-4 grid gap-3 md:grid-cols-4"><MiniScore label="Roadmap progress" value="66%" /><MiniScore label="On-time rate" value="100%" /><MiniScore label="Peer support" value="8 notes" /><MiniScore label="Points" value="1,450" /></div><p className="mt-4 rounded-xl bg-slate-50 p-3 text-sm leading-6 text-slate-600">A consistent contributor who helps peers debug without taking over their work.</p>{status === "Nominated" ? <div className="mt-4"><textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Decision note (optional)" rows={2} className={inputClass} /><div className="mt-3 flex flex-wrap gap-2"><button type="button" onClick={() => setStatus("Shortlisted")} className={secondaryButton}>Shortlist</button><button type="button" onClick={() => setStatus("Awarded")} className={primaryButton}><Trophy className="h-4 w-4" />Confirm award</button><button type="button" onClick={() => setStatus("Declined")} className={secondaryButton}>Decline</button></div></div> : <button type="button" onClick={() => setStatus("Nominated")} className="mt-4 text-xs font-semibold text-[#008b7d]">Reset demo decision</button>}</Card></section></div>;
}

function MiniScore({ label, value }: { label: string; value: string }) { return <div className="rounded-xl border border-slate-200 p-3"><p className="text-xs text-slate-500">{label}</p><p className="mt-1 font-semibold text-slate-900">{value}</p></div>; }

function RewardsPage({ onOpenPanel }: Pick<AdminProductPageProps, "onOpenPanel">) {
  const [tab, setTab] = useState("Gifts");
  const gifts = [{ name: "Mentor office-hours pass", cost: "500 coins", stock: "12 available", image: "/demo/brand/badge-gold.png" }, { name: "Pathment notebook", cost: "750 coins", stock: "8 available", image: "/demo/brand/badge-silver.png" }];
  const badges = [{ name: "First Steps", rule: "Complete the first approved task", metric: "50 XP" }, { name: "On Fire", rule: "Maintain a seven-day activity streak", metric: "100 XP" }, { name: "Peer Helper", rule: "Mentor confirms meaningful peer support", metric: "150 XP" }];
  const giftForm = <PreviewForm intro="Create a redeemable gift for the workspace reward store." fields={[{ label: "Gift name", placeholder: "e.g. Mentor office-hours pass" }, { label: "Description", type: "textarea" }, { label: "Coin cost", type: "number", value: "500" }, { label: "Available quantity", type: "number", value: "10" }, { label: "Redemption instructions", type: "textarea" }]} submitLabel="Create gift" successMessage="The gift is now visible in the local reward-store preview." />;
  const badgeForm = <PreviewForm intro="Create a workspace badge using XP, lifetime coins, or task criteria." fields={[{ label: "Badge name", placeholder: "e.g. Peer Helper" }, { label: "Description", type: "textarea" }, { label: "Icon style", type: "select", options: ["Gold", "Silver", "Bronze", "Teal"] }, { label: "Criteria", type: "select", options: ["XP earned", "Lifetime coins", "Approved tasks", "Manual award"] }, { label: "Threshold", type: "number" }, { label: "Program scope", type: "select", options: ["Workspace-wide", "MERN Fellowship"] }]} submitLabel="Create badge" successMessage="The badge is now visible in this local recognition preview." />;
  return <div className="space-y-6"><PageHeader title="Rewards & badges" subtitle="Manage redeemable gifts and transparent achievement badges." icon={Gift} actions={<button type="button" onClick={() => onOpenPanel(tab === "Gifts" ? "New gift" : "New badge", tab === "Gifts" ? giftForm : badgeForm)} className={primaryButton}><Plus className="h-4 w-4" />New {tab === "Gifts" ? "gift" : "badge"}</button>} /><div className="inline-flex rounded-xl border border-slate-200 bg-white p-1">{["Gifts", "Badges"].map((item) => <button type="button" key={item} onClick={() => setTab(item)} className={`rounded-lg px-4 py-2 text-sm font-medium ${tab === item ? "bg-[#008b7d] text-white" : "text-slate-500"}`}>{item}</button>)}</div>{tab === "Gifts" ? <div className="grid gap-5 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,.6fr)]"><div className="grid gap-4 sm:grid-cols-2">{gifts.map((gift) => <Card key={gift.name} className="p-5"><div className="flex items-start gap-4"><Image src={gift.image} alt="Fictional reward artwork" width={58} height={58} className="h-14 w-14 rounded-xl object-cover" /><div className="flex-1"><h2 className="font-semibold text-slate-900">{gift.name}</h2><p className="mt-1 text-sm font-semibold text-amber-700">{gift.cost}</p><p className="mt-1 text-xs text-slate-500">{gift.stock}</p></div><button type="button" className="rounded-lg p-2 text-slate-400"><Pencil className="h-4 w-4" /></button></div></Card>)}</div><Card><div className="border-b border-slate-100 px-5 py-4"><h2 className="text-sm font-semibold text-slate-900">Recent redemptions</h2></div><div className="p-5 text-center"><CircleDollarSign className="mx-auto h-7 w-7 text-slate-300" /><p className="mt-2 text-sm text-slate-500">No redemptions yet.</p></div></Card></div> : <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{badges.map((badge, index) => <Card key={badge.name} className="p-5"><div className="flex items-start gap-4"><Image src={`/demo/brand/badge-${["bronze", "gold", "silver"][index]}.png`} alt={`${badge.name} fictional badge`} width={58} height={58} className="h-14 w-14 object-contain" /><div className="flex-1"><h2 className="font-semibold text-slate-900">{badge.name}</h2><p className="mt-1 text-xs leading-5 text-slate-500">{badge.rule}</p><p className="mt-2 text-sm font-semibold text-[#008b7d]">{badge.metric}</p></div></div><div className="mt-4 flex justify-end gap-2"><button type="button" className={secondaryButton}>Edit</button><button type="button" className={primaryButton}>Award</button></div></Card>)}</div>}</div>;
}

function AnnouncementsPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [audience, setAudience] = useState("Everyone");
  const [posted, setPosted] = useState(false);
  const submit = (event: FormEvent) => { event.preventDefault(); setPosted(true); };
  return <div className="max-w-5xl space-y-6"><PageHeader title="Announcements" subtitle="Broadcast to everyone, a role, a program, or a clan." icon={Megaphone} /><details className="group rounded-2xl border border-slate-200 bg-white p-5" open><summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-[#00766c]">Write an announcement <ChevronDown className="h-4 w-4 transition group-open:rotate-180" /></summary>{posted ? <div role="status" className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4"><p className="text-sm font-semibold text-emerald-900">Announcement preview posted</p><p className="mt-1 text-xs text-emerald-700">It appears below for this session only. No message was sent.</p><button type="button" onClick={() => { setPosted(false); setTitle(""); setBody(""); }} className="mt-3 text-xs font-semibold text-emerald-800 underline">Write another</button></div> : <form onSubmit={submit} className="mt-5 space-y-3"><div className="flex items-center gap-2"><Send className="h-4 w-4 text-[#008b7d]" /><h2 className="font-semibold text-slate-900">New announcement</h2></div><input required value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Title" className={inputClass} /><textarea required value={body} onChange={(event) => setBody(event.target.value)} rows={3} placeholder="What do people need to know?" className={inputClass} /><div className="flex flex-wrap items-center gap-2"><label className="text-sm text-slate-600">To</label><select value={audience} onChange={(event) => setAudience(event.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm"><option>Everyone</option><option>All mentors</option><option>All mentees</option><option>A program…</option><option>A clan…</option></select>{audience === "A program…" || audience === "A clan…" ? <select className="rounded-lg border border-slate-200 px-3 py-2 text-sm"><option>{audience === "A program…" ? "MERN Stack Engineering Fellowship" : "MERN Fellows"}</option></select> : null}<button type="submit" className={`${primaryButton} ml-auto`}><Send className="h-4 w-4" />Post</button></div></form>}</details><section><div className="mb-3 flex items-center justify-between"><h2 className="font-semibold text-slate-900">Announcement feed</h2><button type="button" className="rounded-lg border border-slate-200 p-2 text-slate-400" aria-label="Refresh feed"><RefreshCw className="h-4 w-4" /></button></div><div className="space-y-3">{posted ? <AnnouncementCard title={title} body={body} audience={audience} time="Just now" /> : null}<AnnouncementCard title="Week 10 — APIs & data modeling" body="This week we’re connecting React applications to production-style Express APIs. Bring one integration question to Friday’s clan review." audience="MERN Fellows" time="3 days ago" /><AnnouncementCard title="Capstone kickoff" body="Capstone briefs are available in the Library. Mentors will review scope during the next scheduled session." audience="All mentees" time="Oct 4" /></div></section></div>;
}

function AnnouncementCard({ title, body, audience, time }: { title: string; body: string; audience: string; time: string }) { return <Card className="p-5"><div className="flex items-start gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#e8f5f2] text-[#00766c]"><Megaphone className="h-5 w-5" /></span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="font-semibold text-slate-900">{title}</h3><Status>{audience}</Status></div><p className="mt-2 text-sm leading-6 text-slate-600">{body}</p><p className="mt-3 text-xs text-slate-400">Dana Reyes · {time}</p></div><button type="button" aria-label={`More options for ${title}`} className="rounded-lg p-2 text-slate-400"><MoreVertical className="h-4 w-4" /></button></div></Card>; }

function MeetingsPage() {
  const [scheduled, setScheduled] = useState(false);
  const [live, setLive] = useState(false);
  return <div className="space-y-6"><PageHeader title="Live meetings" subtitle="Host an org broadcast—pick who is invited, and they receive a calendar invite plus a live join banner." /><Card className="p-5"><h2 className="flex items-center gap-2 text-sm font-semibold text-slate-900"><Plus className="h-4 w-4" />Schedule a meeting</h2>{scheduled ? <div role="status" className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">Meeting added to this local schedule preview. No calendar invite was sent.</div> : <form onSubmit={(event) => { event.preventDefault(); setScheduled(true); }} className="mt-4 grid gap-3 sm:grid-cols-2"><label className="text-xs font-medium text-slate-600 sm:col-span-2">Title<input required defaultValue="Monthly fellowship all-hands" className={inputClass} /></label><label className="text-xs font-medium text-slate-600 sm:col-span-2">Description<textarea defaultValue="Progress, capstone milestones, and open questions." rows={2} className={inputClass} /></label><label className="text-xs font-medium text-slate-600">Audience<select className={inputClass}><option>Everyone</option><option>All mentors</option><option>A clan</option></select></label><label className="text-xs font-medium text-slate-600">Clan<select disabled className={inputClass}><option>Not needed</option></select></label><label className="text-xs font-medium text-slate-600">Date<input required type="date" defaultValue="2026-10-16" className={inputClass} /></label><div className="grid grid-cols-2 gap-3"><label className="text-xs font-medium text-slate-600">Time<input required type="time" defaultValue="16:00" className={inputClass} /></label><label className="text-xs font-medium text-slate-600">Duration<select className={inputClass}><option>60 minutes</option><option>30 minutes</option></select></label></div><div className="flex justify-end sm:col-span-2"><button type="submit" className={primaryButton}><CalendarClock className="h-4 w-4" />Schedule & invite</button></div></form>}</Card><MeetingList title="Upcoming & live" live={live} onLive={() => setLive((value) => !value)} scheduled={scheduled} /><MeetingList title="Past" past /></div>;
}

function MeetingList({ title, live = false, onLive, past = false, scheduled = false }: { title: string; live?: boolean; onLive?: () => void; past?: boolean; scheduled?: boolean }) {
  const items = past ? [{ title: "September all-hands", date: "Sep 18 · 4:00 PM", audience: "Everyone", status: "Ended" }] : [{ title: "MERN Fellows weekly review", date: "Friday · 4:00 PM", audience: "MERN Fellows", status: live ? "Live" : "Scheduled" }, ...(scheduled ? [{ title: "Monthly fellowship all-hands", date: "Oct 16 · 4:00 PM", audience: "Everyone", status: "Scheduled" }] : [])];
  return <Card><div className="border-b border-slate-100 px-5 py-3"><h2 className="text-sm font-semibold text-slate-900">{title}</h2></div><ul className="divide-y divide-slate-100">{items.map((item) => <li key={item.title} className="flex items-center gap-3 px-5 py-4"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-500"><Video className="h-4 w-4" /></span><div className="min-w-0 flex-1"><div className="flex items-center gap-2"><strong className="truncate text-sm text-slate-900">{item.title}</strong><Status tone={item.status === "Live" ? "red" : item.status === "Ended" ? "gray" : "green"}>{item.status}</Status></div><p className="mt-1 text-xs text-slate-500">{item.date} · {item.audience} · 60m</p></div>{!past ? <button type="button" onClick={onLive} className={item.status === "Live" ? secondaryButton : primaryButton}>{item.status === "Live" ? "End preview" : "Start"}</button> : null}</li>)}</ul></Card>;
}

function ModerationPage() {
  const [tab, setTab] = useState("Open");
  const [state, setState] = useState("Open");
  const empty = tab !== state;
  return <div className="space-y-6"><PageHeader title="Moderation" subtitle="Review content members flagged across community spaces." icon={ShieldAlert} actions={<div className="flex gap-1 rounded-xl border border-slate-200 bg-white p-1">{["Open", "Reviewed", "Dismissed"].map((item) => <button type="button" key={item} onClick={() => setTab(item)} className={`rounded-lg px-3 py-1.5 text-sm font-medium ${tab === item ? "bg-[#e8f5f2] text-[#00766c]" : "text-slate-600"}`}>{item}</button>)}</div>} />{empty ? <Card className="py-16 text-center"><ShieldAlert className="mx-auto h-10 w-10 text-slate-300" /><p className="mt-3 text-sm text-slate-600">No {tab.toLowerCase()} reports.</p></Card> : <Card className="p-5"><div className="flex items-center gap-2 text-xs"><Status tone="gray">Post</Status><span className="ml-auto text-slate-400">18 minutes ago</span></div><p className="mt-3 rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm leading-6 text-slate-700">“Here’s a link to a paid answer key for the assessment…”</p><p className="mt-2 text-xs text-slate-400">by Jordan Tester</p><p className="mt-3 flex items-start gap-2 text-sm text-slate-600"><Flag className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" /><span><strong>Priya Sharma</strong> reported: possible assessment integrity issue</span></p><div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={() => setState("Reviewed")} className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-3 py-2 text-sm font-medium text-white"><Trash2 className="h-4 w-4" />Remove content</button><button type="button" onClick={() => setState("Reviewed")} className={secondaryButton}><CheckCircle2 className="h-4 w-4" />Mark reviewed</button><button type="button" onClick={() => setState("Dismissed")} className={secondaryButton}><X className="h-4 w-4" />Dismiss</button></div></Card>}</div>;
}

function FeedbackPage({ onOpenPanel }: Pick<AdminProductPageProps, "onOpenPanel">) {
  const reports = [{ person: "priya" as PersonKey, title: "Review status did not update", type: "Bug", page: "/mentor/approvals", time: "Today · 10:42 AM", status: "Open", detail: "After my mentor approved the submission, the task remained under Awaiting review until I refreshed." }, { person: "aisha" as PersonKey, title: "Filter clan review by milestone", type: "Suggestion", page: "/mentor/clan-review", time: "Yesterday", status: "Open", detail: "A milestone filter would make the Friday review pass quicker for larger clans." }];
  return <div className="space-y-6"><PageHeader title="Feedback" subtitle="2 open · user-reported bugs and suggestions" actions={<button type="button" className={secondaryButton}><Copy className="h-4 w-4" />Copy all as Markdown</button>} />{reports.map((report) => <button type="button" key={report.title} onClick={() => onOpenPanel(report.title, <div className="space-y-4"><Person person={report.person} /><p className="rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">{report.detail}</p><MiniDetail icon={FileText} title="Report context" rows={[["Type", report.type], ["Page", report.page], ["Submitted", report.time], ["Status", report.status]]} /><div className="flex gap-2"><button type="button" className={primaryButton}>Mark resolved</button><button type="button" className={secondaryButton}>Close as duplicate</button></div></div>)} className="block w-full text-left"><Card className="p-5 transition hover:border-[#9ad5cb]"><div className="flex items-start gap-3"><Avatar person={report.person} /><div className="flex-1"><div className="flex flex-wrap items-center gap-2"><h2 className="font-semibold text-slate-900">{report.title}</h2><Status tone={report.type === "Bug" ? "red" : "blue"}>{report.type}</Status><Status tone="amber">{report.status}</Status></div><p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{report.detail}</p><p className="mt-3 text-xs text-slate-400">{people[report.person].name} · {report.page} · {report.time}</p></div><ChevronRight className="h-5 w-5 text-slate-300" /></div></Card></button>)}</div>;
}

function InsightsPage({ onNavigate }: Pick<AdminProductPageProps, "onNavigate">) {
  const [health, setHealth] = useState("All health states");
  const clans = [{ name: "Node Guild", completion: 48, followups: 3, tone: "red" as Tone }, { name: "MERN Fellows", completion: 71, followups: 2, tone: "amber" as Tone }, { name: "React Rangers", completion: 82, followups: 0, tone: "green" as Tone }].filter((clan) => health === "All health states" || (health === "High priority" ? clan.tone === "red" : health === "Watch" ? clan.tone === "amber" : clan.tone === "green"));
  return <div className="space-y-6"><PageHeader title="Insights" subtitle="26 active mentees · 3 clans · current snapshot" /><div className="grid grid-cols-2 gap-4 xl:grid-cols-4"><StatCard icon={Users} label="Active mentees" value="26" /><StatCard icon={UsersRound} label="Clans" value="3" tone="blue" /><StatCard icon={TrendingUp} label="Avg completion" value="66%" /><StatCard icon={Flag} label="Need follow-up" value="5" tone="amber" /></div><Card className="border-rose-200 bg-rose-50/40 p-5"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-rose-100 text-rose-700"><ShieldAlert className="h-5 w-5" /></span><div className="flex-1"><h2 className="font-semibold text-rose-950">1 clan needs priority attention</h2><p className="mt-1 text-sm text-rose-700">Node Guild has three mentees needing follow-up and the lowest completion rate.</p></div><button type="button" onClick={() => onNavigate("admin-followups")} className={secondaryButton}>Open queue</button></div></Card><Card><div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row"><SearchBox value="" onChange={() => {}} placeholder="Search clans…" /><select value={health} onChange={(event) => setHealth(event.target.value)} className="rounded-xl border border-slate-200 px-3 text-sm"><option>All health states</option><option>High priority</option><option>Watch</option><option>Healthy</option></select></div><DataTable columns={["Clan", "Completion", "Needs follow-up", ""]} rows={clans.map((clan) => [<span key="n" className="font-semibold text-slate-900">{clan.name}</span>, <span key="c" className="flex min-w-40 items-center gap-3"><span className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100"><span className="block h-full rounded-full bg-[#38a595]" style={{ width: `${clan.completion}%` }} /></span><strong>{clan.completion}%</strong></span>, <Status key="f" tone={clan.tone}>{clan.followups}</Status>, <button key="a" type="button" onClick={() => onNavigate("admin-followups")} className="text-xs font-semibold text-[#008b7d]">View</button>])} /></Card></div>;
}

function ReviewRecordsPage({ onOpenPanel }: Pick<AdminProductPageProps, "onOpenPanel">) {
  const sessions = [{ date: "Oct 9, 2026", clan: "MERN Fellows", mentor: "Aisha Khan", attendance: "18 / 20", reviewed: "18", video: "42 min" }, { date: "Oct 2, 2026", clan: "MERN Fellows", mentor: "Aisha Khan", attendance: "19 / 20", reviewed: "20", video: "38 min" }, { date: "Oct 1, 2026", clan: "Node Guild", mentor: "Omar Farooq", attendance: "5 / 6", reviewed: "6", video: "No video" }];
  const [clan, setClan] = useState("All clans");
  const [mentor, setMentor] = useState("All mentors");
  return <div className="space-y-6"><PageHeader title="Review records" subtitle="Cohort-review attendance and participation across the organization—clan-wise and mentor-wise." />
    <Card className="flex flex-wrap items-end gap-3 p-4"><label className="w-44 text-xs font-medium text-slate-600">Clan<select value={clan} onChange={(event) => setClan(event.target.value)} className={inputClass}><option>All clans</option><option>MERN Fellows</option><option>Node Guild</option></select></label><label className="w-44 text-xs font-medium text-slate-600">Mentor<select value={mentor} onChange={(event) => setMentor(event.target.value)} className={inputClass}><option>All mentors</option><option>Aisha Khan</option><option>Omar Farooq</option></select></label><label className="text-xs font-medium text-slate-600">From<input type="date" defaultValue="2026-09-01" className={inputClass} /></label><label className="text-xs font-medium text-slate-600">To<input type="date" defaultValue="2026-10-10" className={inputClass} /></label>{clan !== "All clans" || mentor !== "All mentors" ? <button type="button" onClick={() => { setClan("All clans"); setMentor("All mentors"); }} className={secondaryButton}><X className="h-4 w-4" />Clear</button> : null}</Card>
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4"><StatCard icon={CalendarRange} label="Sessions" value="12" sub="9 with live video" /><StatCard icon={Percent} label="Attendance" value="91%" sub="37 present · 3 absent · 1 excused" /><StatCard icon={Users} label="Mentees reviewed" value="26" sub="Across three active clans" /><StatCard icon={Clock3} label="Talk time" value="8h 24m" sub="Total across sessions" tone="purple" /></div>
    <div className="grid gap-4 xl:grid-cols-[1.25fr_.75fr]"><AttendanceTrend /><ReviewCoverage /></div>
    <div className="grid gap-4 xl:grid-cols-2"><ReviewGroup title="By clan" rows={[["MERN Fellows", "8", "93%", "5h 12m"], ["Node Guild", "4", "86%", "3h 12m"]]} /><ReviewGroup title="By mentor" rows={[["Aisha Khan", "8", "93%", "5h 12m"], ["Omar Farooq", "4", "86%", "3h 12m"]]} /></div>
    <Card><div className="flex items-center justify-between border-b border-slate-100 px-5 py-3"><div><h2 className="text-sm font-semibold text-slate-900">Sessions (12)</h2><p className="mt-1 text-xs text-slate-500">Attendance, review coverage, and recorded meeting context</p></div><div className="flex items-center gap-3 text-[10px] text-slate-500"><span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-emerald-500" />Present</span><span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-rose-400" />Absent</span><span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-amber-400" />Excused</span></div></div><DataTable columns={["Date", "Clan", "Mentor", "Attendance", "Reviewed", "Video", ""]} rows={sessions.map((session, index) => [session.date, session.clan, session.mentor, <span key="a" className="flex items-center gap-2"><span className="flex h-2 w-28 overflow-hidden rounded-full bg-slate-100"><span className="bg-emerald-500" style={{ width: `${index === 2 ? 83 : index === 1 ? 95 : 90}%` }} /><span className="bg-rose-400" style={{ width: `${index === 2 ? 17 : 5}%` }} /></span><span className="text-xs">{session.attendance}</span></span>, `${session.reviewed} / ${index === 2 ? 6 : 20}`, session.video === "No video" ? "—" : <span key="v" className="inline-flex items-center gap-1 text-emerald-700"><Video className="h-3.5 w-3.5" />{session.video}</span>, <button key="d" type="button" className="text-xs font-semibold text-[#008b7d]">View</button>])} onRow={(index) => onOpenPanel("Review session", <ReviewSessionDetail session={sessions[index]} />)} /></Card>
  </div>;
}

function ReviewGroup({ title, rows }: { title: string; rows: string[][] }) { return <Card><div className="border-b border-slate-100 px-5 py-3"><h2 className="text-sm font-semibold text-slate-900">{title}</h2></div><DataTable columns={[title.replace("By ", ""), "Sessions", "Attendance", "Talk"]} rows={rows} /></Card>; }

function AttendanceTrend() {
  const values = [{ week: "Sep 5", present: 82, absent: 12, excused: 6 }, { week: "Sep 12", present: 86, absent: 9, excused: 5 }, { week: "Sep 19", present: 89, absent: 7, excused: 4 }, { week: "Sep 26", present: 88, absent: 8, excused: 4 }, { week: "Oct 3", present: 92, absent: 5, excused: 3 }, { week: "Oct 10", present: 91, absent: 7, excused: 2 }];
  return <Card className="p-5"><div className="flex items-start justify-between"><div><h2 className="font-semibold">Attendance trend</h2><p className="mt-1 text-xs text-slate-500">Share of marked attendance across weekly review sessions</p></div><span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700"><TrendingUp className="h-4 w-4" />+9 pts</span></div><div className="mt-7 flex h-52 items-end gap-3" role="img" aria-label="Attendance rose from 82 percent to 91 percent over six weeks">{values.map((value) => <div key={value.week} className="flex h-full flex-1 flex-col justify-end"><span className="mb-2 text-center text-[10px] font-medium text-slate-500">{value.present}%</span><div className="flex w-full flex-col-reverse overflow-hidden rounded-t-lg bg-slate-100" style={{ height: `${value.present + value.absent + value.excused}%` }}><span className="bg-emerald-500" style={{ height: `${value.present}%` }} /><span className="bg-rose-400" style={{ height: `${value.absent}%` }} /><span className="bg-amber-400" style={{ height: `${value.excused}%` }} /></div><span className="mt-2 text-center text-[10px] text-slate-400">{value.week}</span></div>)}</div></Card>;
}

function ReviewCoverage() {
  const rows = [["MERN Fellows",93],["React Rangers",88],["Node Guild",76]] as const;
  return <Card className="p-5"><div><h2 className="font-semibold">Review coverage</h2><p className="mt-1 text-xs text-slate-500">Mentees reviewed in the latest round</p></div><div className="mt-7 space-y-6">{rows.map(([name,value]) => <div key={name}><div className="flex justify-between text-sm"><span className="font-medium text-slate-700">{name}</span><strong>{value}%</strong></div><div className="mt-2 h-3 rounded-full bg-slate-100"><div className={`h-3 rounded-full ${value < 80 ? "bg-amber-400" : "bg-[#43aa9a]"}`} style={{ width: `${value}%` }} /></div></div>)}</div><div className="mt-7 rounded-xl bg-[#eef8f5] p-3 text-xs leading-5 text-[#386b63]">Node Guild has the clearest coverage gap: one mentee missed the latest review and two had no recorded talk time.</div></Card>;
}

function ReviewSessionDetail({ session }: { session: { date: string; clan: string; mentor: string; attendance: string; reviewed: string; video: string } }) {
  return <div className="space-y-5"><div className="flex flex-wrap gap-2"><Status tone="gray">{session.mentor}</Status><Status>{session.attendance} present</Status><Status tone="amber">1 excused</Status>{session.video !== "No video" ? <Status tone="purple">{session.video} video</Status> : null}</div><div className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Session note</p><p className="mt-2 text-sm leading-6 text-slate-700">Reviewed the Node milestone, clarified this week’s evidence expectations, and assigned follow-ups for two mentees.</p></div><div><h3 className="text-sm font-semibold">Mentee participation</h3><div className="mt-3 space-y-2">{[["maya","6m","Present","+15 pts"],["priya","4m","Present","+12 pts"],["elif","0m","Excused","—"]].map(([person,talk,attendance,points]) => <div key={person} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3"><Avatar person={person as PersonKey} size={34} /><div className="min-w-0 flex-1"><p className="text-sm font-medium">{people[person as PersonKey].name}</p><p className="text-xs text-slate-500">Talk time {talk}</p></div><Status tone={attendance === "Present" ? "green" : "amber"}>{attendance}</Status><span className="text-xs font-semibold text-slate-600">{points}</span></div>)}</div></div><p className="rounded-xl bg-[#eef8f5] p-3 text-xs text-[#386b63]">This audit preview is read-only. No review record is changed.</p></div>;
}

function ActivityPage() {
  const [days, setDays] = useState("7 days");
  const rows = [{ person: "maya" as PersonKey, today: "2h 14m", total: "14h 31m", average: "2h 4m", days: "7 / 7", seen: "12 minutes ago", bars: [25, 60, 42, 76, 90, 68, 84] }, { person: "priya" as PersonKey, today: "1h 47m", total: "12h 8m", average: "1h 44m", days: "6 / 7", seen: "28 minutes ago", bars: [42, 65, 70, 56, 80, 0, 72] }, { person: "elif" as PersonKey, today: "42m", total: "7h 22m", average: "1h 3m", days: "5 / 7", seen: "Yesterday", bars: [70, 55, 20, 65, 0, 0, 38] }];
  return <div className="space-y-6"><PageHeader title="Activity" subtitle="See how consistently mentees are engaging with Pathment." actions={<select value={days} onChange={(event) => setDays(event.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm"><option>7 days</option><option>14 days</option><option>30 days</option></select>} /><div className="grid grid-cols-2 gap-4 xl:grid-cols-4"><StatCard icon={Clock3} label="Active time today" value="18h 24m" /><StatCard icon={Users} label="Active mentees" value="24" tone="blue" /><StatCard icon={Activity} label="Average / learner" value="1h 31m" tone="purple" /><StatCard icon={Flag} label="Inactive" value="2" tone="amber" /></div><Card className="p-4"><div className="flex gap-3"><SearchBox value="" onChange={() => {}} placeholder="Search mentees…" /><select className="rounded-xl border border-slate-200 px-3 text-sm"><option>All clans</option><option>MERN Fellows</option><option>Node Guild</option></select></div></Card><Card><DataTable columns={["Mentee", "Today", `Total (${days})`, "Avg / day", "Active days", "Last seen", `Trend (${days})`]} rows={rows.map((row) => [<Person key="p" person={row.person} />, row.today, row.total, row.average, <Status key="d" tone={row.days.startsWith("7") ? "green" : "amber"}>{row.days}</Status>, row.seen, <span key="b" className="flex h-7 items-end gap-1">{row.bars.map((height, index) => <span key={index} className="w-1.5 rounded-sm bg-[#53ad9f]" style={{ height: `${Math.max(height * .24, 2)}px` }} />)}</span>])} /></Card></div>;
}

function FollowUpsPage({ onOpenPanel }: Pick<AdminProductPageProps, "onOpenPanel">) {
  const rows = [{ person: "priya" as PersonKey, risk: "High priority", reason: "Three submissions have waited seven days for review.", clan: "MERN Fellows", progress: "75%", tone: "red" as Tone }, { person: "elif" as PersonKey, risk: "Needs follow-up", reason: "Momentum is slowing and a roadblock remains open.", clan: "MERN Fellows", progress: "63%", tone: "amber" as Tone }, { person: "maya" as PersonKey, risk: "Needs follow-up", reason: "Capstone scope is not yet confirmed.", clan: "MERN Fellows", progress: "66%", tone: "amber" as Tone }];
  return <div className="space-y-5"><PageHeader title="Mentee follow-ups" subtitle="A focused queue for coordinating support with clan mentors. High priority first, then lowest completion." /><Card className="p-4"><div className="flex flex-wrap gap-3"><SearchBox value="" onChange={() => {}} placeholder="Search name or email…" /><select className="rounded-xl border border-slate-200 px-3 text-sm"><option>All flagged mentees</option><option>High priority</option><option>Needs follow-up</option></select><select className="rounded-xl border border-slate-200 px-3 text-sm"><option>All clans</option><option>MERN Fellows</option><option>Node Guild</option></select><button type="button" className={secondaryButton}><RefreshCw className="h-4 w-4" />Refresh</button></div></Card><Card><DataTable columns={["Mentee", "Priority & reason", "Clan", "Completion"]} rows={rows.map((row) => [<Person key="p" person={row.person} />, <span key="r"><Status tone={row.tone}>{row.risk}</Status><span className="mt-1 block max-w-md text-xs leading-5">{row.reason}</span></span>, row.clan, <span key="c" className="font-semibold text-slate-900">{row.progress}</span>])} onRow={(index) => onOpenPanel(`${people[rows[index].person].name} follow-up`, <div className="space-y-4"><Person person={rows[index].person} /><MiniDetail icon={Flag} title="Support signal" rows={[["Priority", rows[index].risk], ["Reason", rows[index].reason], ["Clan", rows[index].clan], ["Completion", rows[index].progress]]} /><PreviewForm intro="Record the next operational follow-up without changing production data." fields={[{ label: "Owner", type: "select", options: ["Aisha Khan", "Dana Reyes"] }, { label: "Due date", type: "date" }, { label: "Note", type: "textarea", placeholder: "What should happen next?" }]} submitLabel="Add demo follow-up" successMessage="The follow-up is recorded in this local preview." /></div>)} /></Card></div>;
}

function AccessPage({ onOpenPanel }: Pick<AdminProductPageProps, "onOpenPanel">) {
  const [tab, setTab] = useState("People & access");
  const [filter, setFilter] = useState("All");
  const directory = [{ person: "dana" as PersonKey, role: "Admin", scope: "Workspace", access: "Full access" }, { person: "aisha" as PersonKey, role: "Mentor", scope: "MERN Fellows", access: "Clan, reviews, curriculum" }, { person: "maya" as PersonKey, role: "Co-mentor", scope: "MERN Fellows", access: "Reviews and feedback" }, { person: "priya" as PersonKey, role: "Mentee", scope: "MERN Fellowship", access: "Learning and community" }].filter((row) => filter === "All" || `${row.role}s` === filter || row.role === filter.replace(/s$/, ""));
  const roleForm = <PreviewForm intro="Bundle permissions into a reusable role. The selected scope controls where it can be granted." fields={[{ label: "Role name", placeholder: "e.g. Program reviewer" }, { label: "Description", type: "textarea" }, { label: "Scope", type: "select", options: ["Workspace", "Program", "Clan"] }]} submitLabel="Create custom role" successMessage="The custom role template appears in this local preview."><div><p className="text-sm font-medium text-slate-700">Permissions</p><div className="mt-2 grid grid-cols-2 gap-2">{["Review submissions", "Manage curriculum", "View insights", "Manage people", "Post announcements", "Issue certificates"].map((permission) => <label key={permission} className="flex items-center gap-2 rounded-lg border border-slate-200 p-2 text-xs text-slate-600"><input type="checkbox" className="accent-[#008b7d]" />{permission}</label>)}</div></div></PreviewForm>;
  return <div className="space-y-6"><PageHeader title="Roles & Access" subtitle="Grant scoped roles to people, and define custom roles. Changes take effect immediately." icon={ShieldCheck} /><div className="inline-flex gap-1 rounded-xl border border-slate-200 bg-white p-1">{["People & access", "Custom role templates"].map((item) => <button type="button" key={item} onClick={() => setTab(item)} className={`rounded-lg px-4 py-2 text-sm font-medium ${tab === item ? "bg-[#008b7d] text-white" : "text-slate-500"}`}>{item}</button>)}</div>{tab === "People & access" ? <Card className="p-5"><div className="flex gap-2"><SearchBox value="" onChange={() => {}} placeholder="Search people by name or email…" /><button type="button" onClick={() => onOpenPanel("Invite someone", <PreviewForm intro="They receive the selected role automatically when they register." fields={[{ label: "Email", type: "email", placeholder: "person@organization.org" }, { label: "Base role", type: "select", options: ["Mentor", "Mentee"] }, { label: "Additional role", type: "select", options: ["No additional role", "Program reviewer", "Community moderator"] }, { label: "Scope", type: "select", options: ["Workspace", "MERN Fellowship", "MERN Fellows"] }]} submitLabel="Create access invite" successMessage="The access invite is visible in this local preview." />)} className={primaryButton}><UserPlus className="h-4 w-4" />Invite</button></div><div className="mt-3 flex gap-1 overflow-x-auto">{["All", "Admins", "Mentors", "Mentees", "Blocked"].map((item) => <button type="button" key={item} onClick={() => setFilter(item)} className={`rounded-lg px-2.5 py-1 text-xs font-medium ${filter === item ? "bg-[#dff3ee] text-[#00766c]" : "text-slate-500"}`}>{item}</button>)}</div><div className="mt-4 divide-y divide-slate-100">{directory.map((row) => <button type="button" key={row.person} onClick={() => onOpenPanel("Access details", <div className="space-y-4"><Person person={row.person} /><MiniDetail icon={Shield} title="Granted access" rows={[["Role", row.role], ["Scope", row.scope], ["Capabilities", row.access]]} /><button type="button" className={`${primaryButton} w-full`}>Grant another role</button></div>)} className="flex w-full items-center gap-3 py-3 text-left"><Person person={row.person} /><span className="ml-auto hidden rounded-full bg-slate-100 px-3 py-1 text-xs sm:inline">{row.role}</span><span className="text-xs font-semibold text-[#008b7d]">Manage access →</span></button>)}</div></Card> : <div className="space-y-4"><div className="flex justify-end"><button type="button" onClick={() => onOpenPanel("New custom role", roleForm)} className={primaryButton}><Plus className="h-4 w-4" />New custom role</button></div><div className="grid gap-4 md:grid-cols-2">{[{ name: "Program reviewer", scope: "Program", people: 2, perms: ["Review submissions", "View insights", "Issue certificates"] }, { name: "Community moderator", scope: "Workspace", people: 1, perms: ["Moderate content", "Post announcements", "View people"] }].map((role) => <Card key={role.name} className="p-5"><div className="flex items-start justify-between"><div><h2 className="font-semibold text-slate-900">{role.name}</h2><p className="mt-1 text-xs text-slate-500">{role.scope} scope · {role.people} people</p></div><button type="button" onClick={() => onOpenPanel(`Edit ${role.name}`, roleForm)} className="rounded-lg p-2 text-slate-400"><Pencil className="h-4 w-4" /></button></div><div className="mt-4 flex flex-wrap gap-1.5">{role.perms.map((permission) => <span key={permission} className="rounded bg-slate-50 px-2 py-1 text-[11px] text-slate-600">{permission}</span>)}</div></Card>)}</div></div>}</div>;
}

function EmailQueuePage() {
  const [tab, setTab] = useState("All");
  const emails = [{ subject: "Weekly mentor summary", audience: "3 mentors", created: "Today · 8:00 AM", delivered: "Today · 8:01 AM", status: "Delivered" }, { subject: "Task review notification", audience: "Priya Sharma", created: "Today · 9:14 AM", delivered: "Today · 9:14 AM", status: "Delivered" }, { subject: "Friday review reminder", audience: "MERN Fellows", created: "Today · 10:00 AM", delivered: "—", status: "Queued" }].filter((email) => tab === "All" || email.status === tab);
  return <div className="space-y-6"><PageHeader title="Email queue" subtitle="Inspect operational email delivery without exposing private message content." icon={Mail} /><div className="flex gap-1 overflow-x-auto">{["All", "Queued", "Delivered", "Failed"].map((item) => <button type="button" key={item} onClick={() => setTab(item)} className={`rounded-lg px-3 py-2 text-sm font-medium ${tab === item ? "bg-[#008b7d] text-white" : "text-slate-500 hover:bg-white"}`}>{item}</button>)}</div><Card>{emails.length ? <DataTable columns={["Email", "Audience", "Created", "Delivered", "Status"]} rows={emails.map((email) => [<span key="e" className="font-semibold text-slate-900">{email.subject}</span>, email.audience, email.created, email.delivered, <Status key="s" tone={email.status === "Delivered" ? "green" : "amber"}>{email.status}</Status>])} /> : <div className="p-12 text-center"><Mail className="mx-auto h-8 w-8 text-slate-300" /><p className="mt-3 text-sm text-slate-500">No {tab.toLowerCase()} email jobs.</p></div>}</Card><Card><div className="flex items-center gap-2 border-b border-slate-100 p-4"><Ban className="h-4 w-4 text-slate-500" /><h2 className="text-sm font-semibold text-slate-900">Suppressed addresses</h2></div><p className="p-5 text-sm text-slate-400">No addresses are currently suppressed.</p></Card></div>;
}

function ChangelogPage({ onOpenPanel }: Pick<AdminProductPageProps, "onOpenPanel">) {
  const entries = [{ title: "Review records are easier to audit", type: "Improvement", audience: "Admins", date: "Oct 8", body: "Review sessions now keep attendance, participation, mentor, and video context together." }, { title: "Mentor queues show the oldest wait", type: "New feature", audience: "Mentors", date: "Oct 2", body: "Approvals now make waiting time visible so urgent reviews are easy to spot." }];
  const form = <PreviewForm intro="Write updates as a benefit for users, not as a commit message." fields={[{ label: "Title", placeholder: "What changed?" }, { label: "Type", type: "select", options: ["New feature", "Improvement", "Fix", "Announcement"] }, { label: "Audience", type: "select", options: ["All roles", "Admins", "Mentors", "Mentees"] }, { label: "Summary", type: "textarea", placeholder: "Describe the user benefit" }, { label: "Status", type: "select", options: ["Draft", "Published"] }]} submitLabel="Save update" successMessage="The product update is visible in this local preview." />;
  return <div className="space-y-6"><PageHeader title="What’s new" subtitle="Post product updates. Users see a role-filtered feed with an unread badge; major items can open once as a modal." icon={Sparkles} actions={<button type="button" onClick={() => onOpenPanel("New update", form)} className={primaryButton}><Plus className="h-4 w-4" />New update</button>} /><div className="space-y-3">{entries.map((entry) => <Card key={entry.title} className="p-5"><div className="flex items-start gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#e8f5f2] text-[#00766c]"><Sparkles className="h-5 w-5" /></span><div className="flex-1"><div className="flex flex-wrap items-center gap-2"><Status>{entry.type}</Status><Status tone="gray">{entry.audience}</Status><span className="text-xs text-slate-400">{entry.date}</span></div><h2 className="mt-3 font-semibold text-slate-900">{entry.title}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{entry.body}</p></div><div className="flex gap-1"><button type="button" aria-label={`Edit ${entry.title}`} onClick={() => onOpenPanel(`Edit ${entry.title}`, form)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><Pencil className="h-4 w-4" /></button><button type="button" aria-label={`Unpublish ${entry.title}`} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><Eye className="h-4 w-4" /></button></div></div></Card>)}</div></div>;
}

const settingsTabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "organization", label: "Organization", icon: Building2 },
  { id: "plan", label: "Plan & Usage", icon: CircleDollarSign },
  { id: "appearance", label: "Display", icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "ai", label: "AI Connections", icon: KeyRound },
  { id: "review-lock", label: "Review Lock", icon: Lock },
  { id: "security", label: "Security", icon: Shield },
];

function AdminSettingsPage() {
  const [tab, setTab] = useState("profile");
  const [saved, setSaved] = useState(false);
  return <div className="space-y-6"><PageHeader title="Admin Settings" subtitle="Manage your admin profile and preferences" /><div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]"><nav aria-label="Settings sections" className="flex gap-1 overflow-x-auto lg:flex-col">{settingsTabs.map((item) => { const Icon = item.icon; return <button type="button" key={item.id} onClick={() => { setTab(item.id); setSaved(false); }} aria-current={tab === item.id ? "page" : undefined} className={`inline-flex items-center gap-3 whitespace-nowrap rounded-xl px-4 py-3 text-left text-sm font-medium ${tab === item.id ? "bg-[#008b7d] text-white" : "text-slate-500 hover:bg-slate-100"}`}><Icon className="h-4 w-4" />{item.label}</button>; })}</nav><Card className="p-5 sm:p-8"><SettingsContent tab={tab} saved={saved} onSave={() => setSaved(true)} /></Card></div></div>;
}

function SettingsContent({ tab, saved, onSave }: { tab: string; saved: boolean; onSave: () => void }) {
  if (tab === "profile") return <SettingsSection title="Personal information" description="Your details inside Dev Weekends."><div className="mb-6 flex items-center gap-4"><Avatar person="dana" size={72} /><div><button type="button" className={secondaryButton}>Change photo</button><p className="mt-2 text-xs text-slate-400">JPG or PNG · up to 5 MB</p></div></div><FieldGrid fields={[{ label: "First name", value: "Dana" }, { label: "Last name", value: "Reyes" }, { label: "Email", value: "admin@demo.pathment.com", disabled: true }, { label: "Phone", value: "+92 300 555 0142" }, { label: "City", value: "Lahore" }, { label: "Timezone", value: "Asia/Karachi" }]} /><label className="mt-5 block text-sm font-medium text-slate-700">Bio<textarea defaultValue="Program administrator focused on mentorship operations and learner outcomes." rows={4} className={inputClass} /></label><SaveSettings saved={saved} onSave={onSave} /></SettingsSection>;
  if (tab === "organization") return <SettingsSection title="Organization settings" description="Member-facing identity and workspace defaults."><div className="mb-6 flex items-center gap-4"><Image src="/demo/brand/dev-weekends-logo.svg" alt="Dev Weekends fictional organization logo" width={72} height={72} className="h-18 w-18 rounded-2xl border border-slate-200 object-cover" /><div><button type="button" className={secondaryButton}>Change logo</button><p className="mt-2 text-xs text-slate-400">Square image recommended</p></div></div><FieldGrid fields={[{ label: "Organization name", value: "Dev Weekends" }, { label: "Workspace slug", value: "devweekends" }, { label: "Website", value: "https://devweekends.example" }, { label: "Default timezone", value: "Asia/Karachi" }]} /><SaveSettings saved={saved} onSave={onSave} /></SettingsSection>;
  if (tab === "plan") return <SettingsSection title="Plan & Usage" description="Current subscription and workspace consumption."><div className="grid gap-3 sm:grid-cols-3"><MiniScore label="Current plan" value="Organization" /><MiniScore label="Active members" value="30 / 50" /><MiniScore label="Storage" value="2.4 / 10 GB" /></div><div className="mt-6 rounded-xl border border-slate-200 p-4"><div className="flex justify-between text-sm"><span className="font-medium text-slate-700">Member seats</span><strong>60%</strong></div><span className="mt-3 block h-2 overflow-hidden rounded-full bg-slate-100"><span className="block h-full w-3/5 rounded-full bg-[#008b7d]" /></span></div></SettingsSection>;
  if (tab === "appearance") return <SettingsSection title="Display" description="Choose how the application looks for your account."><div className="grid gap-3 sm:grid-cols-3">{["System", "Light", "Dark"].map((mode, index) => <button type="button" key={mode} className={`rounded-xl border p-3 text-left ${index === 0 ? "border-[#49aa9b] bg-[#eef8f5]" : "border-slate-200"}`}><span className={`block h-24 rounded-lg border ${mode === "Dark" ? "border-slate-700 bg-slate-900" : "border-slate-200 bg-white"}`} /><span className="mt-2 block text-sm font-semibold text-slate-800">{mode}</span></button>)}</div></SettingsSection>;
  if (tab === "notifications") return <SettingsSection title="Notification preferences" description="Decide how you receive operational updates.">{["Review and approval activity", "Admissions and invite updates", "Clan requests and follow-ups", "Recognition decisions", "Product updates"].map((item, index) => <label key={item} className="flex items-center gap-3 border-b border-slate-100 py-4 last:border-0"><span className="flex-1 text-sm font-medium text-slate-700">{item}</span><input type="checkbox" defaultChecked={index !== 4} className="h-4 w-4 accent-[#008b7d]" /></label>)}<SaveSettings saved={saved} onSave={onSave} /></SettingsSection>;
  if (tab === "ai") return <SettingsSection title="AI Connections" description="Optional provider connections used only for concrete assisted workflows."><Connection name="OpenAI" detail="Not connected" /><Connection name="Anthropic" detail="Connected · key ending 7KQ2" connected /><p className="mt-5 rounded-xl bg-slate-50 p-4 text-xs leading-5 text-slate-500">Mentors and administrators keep review and approval control. Provider keys are encrypted in the live product and are never exposed here.</p></SettingsSection>;
  if (tab === "review-lock") return <SettingsSection title="Review Lock" description="Control edits after a review round has been finalized."><label className="flex items-start gap-3 rounded-xl border border-slate-200 p-4"><input type="checkbox" defaultChecked className="mt-1 accent-[#008b7d]" /><span><strong className="block text-sm text-slate-800">Lock completed review rounds</strong><span className="mt-1 block text-xs leading-5 text-slate-500">Admins can temporarily unlock a round from an approved request.</span></span></label><div className="mt-5"><h3 className="text-sm font-semibold text-slate-900">Unlock requests</h3><p className="mt-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">No pending unlock requests.</p></div></SettingsSection>;
  return <SettingsSection title="Security" description="Password, two-factor authentication, and active sessions."><Connection name="Password" detail="Last changed Aug 1, 2026" connected /><Connection name="Two-factor authentication" detail="Not enabled" /><Connection name="Active sessions" detail="1 current session" connected /><div className="mt-6 rounded-xl border border-slate-200 p-4"><h3 className="text-sm font-semibold text-slate-900">Recent security activity</h3><p className="mt-2 text-xs text-slate-500">Successful sign-in · Lahore, Pakistan · Today</p></div></SettingsSection>;
}

function SettingsSection({ title, description, children }: { title: string; description: string; children: ReactNode }) { return <div><h2 className="text-lg font-semibold text-slate-900">{title}</h2><p className="mt-1 text-sm text-slate-500">{description}</p><div className="mt-6">{children}</div></div>; }
function FieldGrid({ fields }: { fields: Array<{ label: string; value: string; disabled?: boolean }> }) { return <div className="grid gap-5 md:grid-cols-2">{fields.map((field) => <label key={field.label} className="text-sm font-medium text-slate-700">{field.label}<input defaultValue={field.value} disabled={field.disabled} className={`${inputClass} disabled:bg-slate-50 disabled:text-slate-400`} /></label>)}</div>; }
function SaveSettings({ saved, onSave }: { saved: boolean; onSave: () => void }) { return <div className="mt-6 flex items-center gap-3"><button type="button" onClick={onSave} className={primaryButton}><Save className="h-4 w-4" />Save Changes</button>{saved ? <span role="status" className="text-xs font-medium text-emerald-700">Saved in this local preview</span> : null}</div>; }
function Connection({ name, detail, connected = false }: { name: string; detail: string; connected?: boolean }) { return <div className="flex items-center gap-3 border-b border-slate-100 py-4 last:border-0"><span className={`grid h-10 w-10 place-items-center rounded-xl ${connected ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{connected ? <CheckCircle2 className="h-5 w-5" /> : <KeyRound className="h-5 w-5" />}</span><div className="flex-1"><p className="text-sm font-semibold text-slate-900">{name}</p><p className="mt-1 text-xs text-slate-500">{detail}</p></div><button type="button" className={secondaryButton}>{connected ? "Manage" : "Connect"}</button></div>; }
