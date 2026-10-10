"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  Bell,
  BookOpen,
  CalendarClock,
  CalendarRange,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  Compass,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageCircle,
  MessageSquarePlus,
  RotateCcw,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Trophy,
  Trash2,
  Users,
  UsersRound,
  X,
  type LucideIcon,
} from "lucide-react";
import { track } from "../../lib/analytics";
import { DemoPage } from "./DemoScreens";
import { genericPages, people, tourSteps, type DemoPageId, type DemoRole } from "./demo-data";
import { demoWorkspaces, workspaceForPage, type DemoWorkspace } from "./demo-workspaces";

export type { DemoRole } from "./demo-data";

type NavItem = { label: string; page: DemoPageId; icon: LucideIcon; badge?: string };
type NavGroup = { label: string; icon: LucideIcon; children: NavItem[] };

const adminNavigation: NavItem[] = [
  { label: "Overview", page: "admin-dashboard", icon: LayoutDashboard },
  { label: "Admissions", page: "admin-intake", icon: CalendarRange },
  { label: "People", page: "admin-clans", icon: Users },
  { label: "Learning", page: "admin-programs", icon: BookOpen },
  { label: "Recognition", page: "admin-certificates", icon: Trophy },
  { label: "Community", page: "admin-announcements", icon: MessageSquarePlus },
  { label: "Insights", page: "admin-insights", icon: BarChart3 },
  { label: "Administration", page: "admin-access", icon: Settings },
  { label: "Messages", page: "admin-messages", icon: MessageCircle, badge: "2" },
  { label: "Settings", page: "admin-settings", icon: Settings },
];

const mentorNavigation: NavItem[] = [
  { label: "Cockpit", page: "mentor-dashboard", icon: LayoutDashboard },
  { label: "Clan Review", page: "mentor-review", icon: CalendarRange },
  { label: "Messages", page: "mentor-messages", icon: MessageCircle, badge: "3" },
  { label: "Approvals", page: "mentor-approvals", icon: ClipboardCheck, badge: "4" },
  { label: "My mentees", page: "mentor-mentees", icon: UsersRound },
  { label: "Curriculum", page: "mentor-roadmaps", icon: BookOpen },
  { label: "Recognition", page: "mentor-top-performers", icon: Trophy },
  { label: "Insights", page: "mentor-reports", icon: BarChart3 },
  { label: "Community", page: "mentor-community", icon: Users },
  { label: "Schedule", page: "mentor-schedule", icon: CalendarClock },
  { label: "Mentor Handbook", page: "mentor-handbook", icon: Compass },
  { label: "Settings", page: "mentor-settings", icon: Settings },
];

const menteeNavigation: NavItem[] = [
  { label: "This Week", page: "mentee-dashboard", icon: LayoutDashboard },
  { label: "My learning", page: "mentee-tasks", icon: BookOpen, badge: "2" },
  { label: "My progress", page: "mentee-progress", icon: BarChart3 },
  { label: "My support", page: "mentee-mentor", icon: CalendarClock },
  { label: "Community", page: "mentee-community", icon: Users },
  { label: "Messages", page: "mentee-messages", icon: MessageCircle, badge: "1" },
  { label: "Settings", page: "mentee-settings", icon: Settings },
];

const roleHome: Record<DemoRole, DemoPageId> = { admin: "admin-dashboard", mentor: "mentor-dashboard", mentee: "mentee-dashboard" };
const rolePerson = { admin: people.dana, mentor: people.aisha, mentee: people.maya } as const;

function isGroup(item: NavItem | NavGroup): item is NavGroup {
  return "children" in item;
}

export function InteractiveDemo({ initialRole, initialPage }: { initialRole: DemoRole; initialPage?: DemoPageId }) {
  const [role, setRole] = useState<DemoRole>(initialRole);
  const [page, setPage] = useState<DemoPageId>(initialPage ?? roleHome[initialRole]);
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set());
  const [mobileMenu, setMobileMenu] = useState(false);
  const [workspaceMenu, setWorkspaceMenu] = useState(false);
  const [clanMenu, setClanMenu] = useState(false);
  const [clan, setClan] = useState(initialRole === "mentor" ? "All clans" : "MERN Fellows · Standing clan");
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [guideOpen, setGuideOpen] = useState(false);
  const [completedPages, setCompletedPages] = useState<Set<string>>(new Set([initialPage ?? roleHome[initialRole]]));
  const [panel, setPanel] = useState<{ title: string; content: ReactNode } | null>(null);
  const [simulated, setSimulated] = useState(false);

  useEffect(() => {
    track("demo_started", { source: "demo_page", role: initialRole });
  }, [initialRole]);

  const navigation = role === "admin" ? adminNavigation : role === "mentor" ? mentorNavigation : menteeNavigation;
  const person = rolePerson[role];
  const flatNavigation = useMemo(() => navigation.flatMap((item) => isGroup(item) ? item.children : [item]), [navigation]);
  const searchItems = useMemo(() => {
    const workspaceItems = demoWorkspaces[role].flatMap((workspace) => workspace.tabs.map((tab) => ({ ...tab, icon: flatNavigation.find((item) => item.page === workspace.entry)?.icon ?? BookOpen })));
    return [...flatNavigation, ...workspaceItems.filter((tab) => !flatNavigation.some((item) => item.page === tab.page))];
  }, [flatNavigation, role]);
  const activeWorkspace = workspaceForPage(role, page);
  const currentLabel = activeWorkspace?.tabs.find((item) => item.page === page)?.label ?? flatNavigation.find((item) => item.page === page)?.label ?? genericPages[page]?.title ?? "Workspace";
  const clanOptions = role === "mentor" ? [
    { label: "All clans", image: "/demo/brand/dev-weekends-logo.svg" },
    { label: "MERN Fellows · Active program", image: "/demo/brand/dev-weekends-logo.svg" },
    { label: "Node Guild · Active program", image: "/demo/brand/badge-silver.png" },
  ] : [
    { label: "MERN Fellows · Standing clan", image: "/demo/brand/dev-weekends-logo.svg" },
    { label: "MERN Fellowship · Active program", image: "/demo/brand/badge-gold.png" },
  ];
  const selectedClan = clanOptions.find((item) => item.label === clan) ?? clanOptions[0];
  const steps = tourSteps[role];
  const completedStepCount = steps.filter((step) => completedPages.has(step.page)).length;

  function navigate(next: DemoPageId) {
    setPage(next);
    setMobileMenu(false);
    setSearchOpen(false);
    setCompletedPages((current) => new Set([...current, next]));
    const tourIndex = steps.findIndex((step) => step.page === next);
    if (tourIndex >= 0) track("demo_step_completed", { role, step: tourIndex + 1 });
  }

  function switchRole(next: DemoRole) {
    setRole(next);
    setPage(roleHome[next]);
    setOpenGroups(new Set());
    setMobileMenu(false);
    setClan(next === "mentor" ? "All clans" : "MERN Fellows · Standing clan");
    setCompletedPages(new Set([roleHome[next]]));
    setSimulated(false);
    track("demo_role_selected", { role: next, source: "demo_header" });
  }

  function restart() {
    setPage(roleHome[role]);
    setOpenGroups(new Set());
    setCompletedPages(new Set([roleHome[role]]));
    setSimulated(false);
    setGuideOpen(true);
  }

  function openPanel(title: string, content: ReactNode) {
    setPanel({ title, content });
  }

  return <div className="min-h-screen bg-[#f6f8f7] text-slate-900">
    <PreviewControls role={role} onRoleChange={switchRole} onRestart={restart} onOpenGuide={() => setGuideOpen(true)} />
    <div className="flex min-h-screen">
      {mobileMenu ? <button type="button" aria-label="Close navigation" onClick={() => setMobileMenu(false)} className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden" /> : null}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-100 bg-white transition-transform lg:translate-x-0 ${mobileMenu ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          <div className="flex items-center justify-between px-4 pb-3 pt-5"><div className="flex items-center gap-3"><Image src="/demo/brand/pathment-logo.png" alt="Pathment" width={44} height={44} className="h-11 w-11 rounded-2xl shadow-sm" /><div><p className="text-base font-bold leading-tight text-slate-900">Pathment</p><p className="mt-1 text-xs capitalize text-slate-400">{role} portal</p></div></div><button type="button" onClick={() => setMobileMenu(false)} aria-label="Close menu" className="rounded-lg p-2 text-slate-500 lg:hidden"><X className="h-5 w-5" /></button></div>
          <div className="mb-1 flex items-center gap-1 border-b border-slate-100 px-3 pb-3">
            <QuickButton label="Take a tour" icon={HelpCircle} onClick={() => setGuideOpen(true)} />
            <QuickButton label="What’s new" icon={Sparkles} onClick={() => openPanel("What’s new", <ChangelogPreview />)} />
            <QuickButton label="Notifications" icon={Bell} onClick={() => openPanel("Notifications", <Notifications role={role} />)} dot />
            <QuickButton label="Send feedback" icon={MessageSquarePlus} onClick={() => openPanel("Send feedback", <FeedbackPreview />)} />
            <QuickButton label="Settings" icon={Settings} onClick={() => navigate(`${role}-settings`)} />
          </div>

          <div className="relative px-3 pt-3"><button type="button" onClick={() => setWorkspaceMenu((open) => !open)} aria-expanded={workspaceMenu} className="flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-left hover:bg-slate-50"><Image src="/demo/brand/dev-weekends-logo.svg" alt="Dev Weekends" width={32} height={32} className="h-8 w-8 shrink-0 rounded-lg" /><span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold text-slate-700">Dev Weekends</span><span className="block truncate text-[11px] capitalize text-slate-500">{role === "admin" ? "admin" : "member"} workspace</span></span><ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${workspaceMenu ? "rotate-180" : ""}`} /></button>{workspaceMenu ? <div className="absolute left-3 right-3 top-[72px] z-20 rounded-xl border border-slate-200 bg-white p-2 shadow-xl"><p className="px-2 py-2 text-[10px] font-semibold uppercase tracking-wide text-slate-400">Your workspaces</p><button type="button" onClick={() => setWorkspaceMenu(false)} className="flex w-full items-center gap-3 rounded-lg bg-[#eaf6f3] p-2 text-left"><Image src="/demo/brand/dev-weekends-logo.svg" alt="" width={32} height={32} className="h-8 w-8 rounded-lg" /><span className="flex-1 text-sm font-semibold">Dev Weekends</span><Check className="h-4 w-4 text-[#008b7d]" /></button><button type="button" onClick={() => openPanel("Manage workspaces", <QuickList title="Workspace access" items={["Dev Weekends · Active", "This public preview contains one fictional workspace."]} />)} className="mt-1 flex w-full items-center gap-2 rounded-lg px-2 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"><Settings className="h-4 w-4" />Manage workspaces</button></div> : null}</div>

          {role !== "admin" ? <div className="relative px-3 pt-2"><button type="button" onClick={() => setClanMenu((open) => !open)} aria-expanded={clanMenu} className="flex w-full items-center gap-2.5 rounded-xl border border-slate-200 px-3 py-2.5 text-left text-sm font-medium text-slate-700"><Image src={selectedClan.image} alt="" width={30} height={30} className="h-7 w-7 shrink-0 rounded-lg object-cover" /><span className="min-w-0 flex-1 truncate">{selectedClan.label}</span><ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 ${clanMenu ? "rotate-180" : ""}`} /></button>{clanMenu ? <div className="absolute left-3 right-3 top-[62px] z-20 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">{clanOptions.map((item) => <button type="button" key={item.label} onClick={() => { setClan(item.label); setClanMenu(false); }} className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs ${clan === item.label ? "bg-[#eaf6f3] font-semibold text-[#00766c]" : "text-slate-600 hover:bg-slate-50"}`}><Image src={item.image} alt="" width={30} height={30} className="h-7 w-7 shrink-0 rounded-lg object-cover" /><span className="min-w-0 flex-1 truncate">{item.label}</span>{clan === item.label ? <Check className="h-3.5 w-3.5 shrink-0" /> : null}</button>)}</div> : null}</div> : null}

          <div className="px-3 pt-3"><button type="button" onClick={() => setSearchOpen(true)} className="flex w-full items-center gap-2.5 rounded-xl border border-slate-200 px-3 py-2 text-slate-400 hover:border-slate-300 hover:text-slate-600"><Search className="h-4 w-4" /><span className="flex-1 text-left text-sm">Search…</span><kbd className="rounded border border-slate-200 px-1.5 py-0.5 text-[10px]">⌘K</kbd></button></div>
          <nav className="flex-1 space-y-0.5 px-3 py-4" aria-label={`${role} workspace`}><div className="mb-1 flex items-center justify-between px-2"><span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Menu</span><button type="button" onClick={() => openPanel("Customize menu", <QuickList title="Navigation preferences" items={["Pin frequently used pages", "Reorder workspace sections", "Enable adaptive sorting"]} />)} aria-label="Customize menu" className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"><SlidersHorizontal className="h-3.5 w-3.5" /></button></div>{navigation.map((item) => isGroup(item) ? <NavigationGroup key={item.label} group={item} currentPage={page} open={openGroups.has(item.label)} onToggle={() => setOpenGroups((groups) => { const next = new Set(groups); if (next.has(item.label)) next.delete(item.label); else next.add(item.label); return next; })} onNavigate={navigate} /> : <NavigationItem key={item.page} item={item} active={page === item.page || demoWorkspaces[role].some((workspace) => workspace.entry === item.page && workspace.tabs.some((tab) => tab.page === page))} onNavigate={navigate} />)}</nav>
          <div className="space-y-1 border-t border-slate-100 px-3 py-4"><button type="button" onClick={() => navigate(`${role}-settings`)} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-slate-50"><Image src={person.image} alt={`${person.name}, fictional demo profile`} width={38} height={38} className="h-9.5 w-9.5 rounded-full object-cover" /><span className="min-w-0 flex-1"><strong className="block truncate text-sm text-slate-800">{person.name}</strong><span className="block text-xs capitalize text-slate-400">Profile & settings</span></span><ChevronRight className="h-4 w-4 text-slate-400" /></button><button type="button" onClick={() => openPanel("Leave preview", <LeavePreview />)} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-slate-500 hover:bg-rose-50 hover:text-rose-600"><LogOut className="h-4 w-4" /><span className="text-sm font-medium">Logout</span></button></div>
        </div>
      </aside>

      <main className="min-w-0 flex-1 lg:ml-64">
        <div className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-100 bg-white/95 px-4 backdrop-blur sm:px-6 lg:hidden"><div className="flex items-center gap-3"><button type="button" onClick={() => setMobileMenu(true)} aria-label="Open navigation" className="rounded-lg border border-slate-200 p-2 text-slate-600"><Menu className="h-5 w-5" /></button><div><p className="text-xs text-slate-400">Dev Weekends <span className="mx-1">/</span></p><p className="text-sm font-semibold text-slate-800">{currentLabel}</p></div></div><div className="flex items-center gap-1"><button type="button" onClick={() => setSearchOpen(true)} aria-label="Search" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><Search className="h-5 w-5" /></button><button type="button" onClick={() => openPanel("Notifications", <Notifications role={role} />)} aria-label="Notifications" className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100"><Bell className="h-5 w-5" /><span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-white bg-rose-400" /></button><button type="button" onClick={() => setGuideOpen(true)} aria-label="Open guided tour" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><CircleHelp className="h-5 w-5" /></button></div></div>
        <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">{activeWorkspace ? <WorkspaceTabs workspace={activeWorkspace} currentPage={page} onNavigate={navigate} /> : null}<DemoPage page={page} onNavigate={navigate} onOpenPanel={openPanel} onCompleteSimulation={() => { setSimulated(true); setCompletedPages((current) => new Set([...current, "mentor-review-submission"])); track("demo_completed", { role }); }} /></div>
      </main>
    </div>

    {guideOpen ? <TourPanel role={role} currentPage={page} completedPages={completedPages} simulated={simulated} onNavigate={navigate} onClose={() => setGuideOpen(false)} onRestart={restart} /> : <button type="button" onClick={() => setGuideOpen(true)} className="fixed bottom-[84px] right-5 z-30 inline-flex items-center gap-2 rounded-full bg-[#073d3b] px-4 py-3 text-xs font-semibold text-white shadow-xl"><Sparkles className="h-4 w-4" />Guided tour · {completedStepCount}/4</button>}
    {searchOpen ? <SearchDialog value={search} onChange={setSearch} items={searchItems} onNavigate={navigate} onClose={() => { setSearchOpen(false); setSearch(""); }} /> : null}
    {panel ? <SidePanel title={panel.title} onClose={() => setPanel(null)}>{panel.content}</SidePanel> : null}
  </div>;
}

function WorkspaceTabs({ workspace, currentPage, onNavigate }: { workspace: DemoWorkspace; currentPage: DemoPageId; onNavigate: (page: DemoPageId) => void }) {
  return <div className="mb-7"><p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">{workspace.label}</p><nav aria-label={`${workspace.label} pages`} className="flex gap-1 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-1.5">{workspace.tabs.map((tab) => <button type="button" key={tab.page} aria-current={tab.page === currentPage ? "page" : undefined} onClick={() => onNavigate(tab.page)} className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${tab.page === currentPage ? "bg-[#008b7d] text-white shadow-sm" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"}`}>{tab.label}</button>)}</nav></div>;
}

function PreviewControls({ role, onRoleChange, onRestart, onOpenGuide }: { role: DemoRole; onRoleChange: (role: DemoRole) => void; onRestart: () => void; onOpenGuide: () => void }) {
  const [open, setOpen] = useState(false);
  if (!open) return <button type="button" aria-expanded="false" onClick={() => setOpen(true)} className="fixed bottom-4 right-4 z-[60] inline-flex items-center gap-2 rounded-full border border-[#27524c] bg-[#073d3b] px-3.5 py-2.5 text-xs font-semibold capitalize text-white shadow-xl"><SlidersHorizontal className="h-4 w-4" />Preview · {role}</button>;
  return <aside aria-label="Preview controls" className="fixed bottom-4 right-4 z-[60] w-[min(330px,calc(100vw-32px))] rounded-2xl border border-[#27524c] bg-[#073d3b] p-2 text-white shadow-2xl"><div className="mb-1 flex items-center justify-between px-2 py-1"><p className="text-[10px] font-semibold uppercase tracking-widest text-emerald-200">Public product preview</p><button type="button" onClick={() => setOpen(false)} aria-label="Collapse preview controls" className="rounded-lg p-1 text-emerald-100 hover:bg-white/10"><X className="h-4 w-4" /></button></div><div role="tablist" aria-label="Switch demo role" className="grid grid-cols-3 rounded-xl bg-white/10 p-1">{(["admin", "mentor", "mentee"] as DemoRole[]).map((item) => <button type="button" role="tab" aria-selected={item === role} key={item} onClick={() => { onRoleChange(item); setOpen(false); }} className={`rounded-lg px-2.5 py-2 text-[11px] font-semibold capitalize ${item === role ? "bg-white text-[#075e57]" : "text-emerald-50 hover:bg-white/10"}`}>{item}</button>)}</div><div className="mt-1 grid grid-cols-4 gap-1"><Link href="/" className="grid place-items-center rounded-lg p-2 text-emerald-100 hover:bg-white/10" aria-label="Back to Pathment"><ArrowRight className="h-4 w-4 rotate-180" /></Link><button type="button" onClick={onOpenGuide} className="grid place-items-center rounded-lg p-2 text-emerald-100 hover:bg-white/10" aria-label="Guided tour"><HelpCircle className="h-4 w-4" /></button><button type="button" onClick={onRestart} className="grid place-items-center rounded-lg p-2 text-emerald-100 hover:bg-white/10" aria-label="Restart tour"><RotateCcw className="h-4 w-4" /></button><Link href="/contact" className="grid place-items-center rounded-lg bg-[#19a38f] px-3 py-2 text-xs font-semibold text-white hover:bg-[#1bb39d]">Talk</Link></div></aside>;
}

function QuickButton({ label, icon: Icon, onClick, dot = false }: { label: string; icon: LucideIcon; onClick: () => void; dot?: boolean }) {
  return <button type="button" onClick={onClick} title={label} aria-label={label} className="relative flex flex-1 items-center justify-center rounded-xl p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-900"><Icon className="h-5 w-5" />{dot ? <span className="absolute right-2 top-1.5 h-2 w-2 rounded-full border-2 border-white bg-rose-400" /> : null}</button>;
}

function NavigationItem({ item, active, onNavigate }: { item: NavItem; active: boolean; onNavigate: (page: DemoPageId) => void }) {
  const Icon = item.icon;
  return <button type="button" onClick={() => onNavigate(item.page)} className={`relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${active ? "bg-[#008b7d] text-white shadow-sm" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}><Icon className={`h-[18px] w-[18px] shrink-0 ${active ? "text-white" : "text-slate-400"}`} /><span className="flex-1 text-sm font-medium">{item.label}</span>{item.badge ? <span className={`grid min-w-5 place-items-center rounded-full px-1.5 py-0.5 text-[10px] font-bold ${active ? "bg-white/20 text-white" : "bg-[#e5f5f1] text-[#00766c]"}`}>{item.badge}</span> : null}</button>;
}

function NavigationGroup({ group, currentPage, open, onToggle, onNavigate }: { group: NavGroup; currentPage: DemoPageId; open: boolean; onToggle: () => void; onNavigate: (page: DemoPageId) => void }) {
  const Icon = group.icon;
  const active = group.children.some((child) => child.page === currentPage);
  return <div><button type="button" onClick={onToggle} aria-expanded={open} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${active && !open ? "bg-[#e5f5f1] text-[#00766c]" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}><Icon className={`h-[18px] w-[18px] shrink-0 ${active ? "text-[#008b7d]" : "text-slate-400"}`} /><span className="flex-1 text-sm font-medium">{group.label}</span><ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} /></button>{open ? <div className="ml-3 mt-1 space-y-0.5 border-l-2 border-slate-100 pb-1 pl-4">{group.children.map((item) => <NavigationItem key={item.page} item={item} active={item.page === currentPage} onNavigate={onNavigate} />)}</div> : null}</div>;
}

function TourPanel({ role, currentPage, completedPages, simulated, onNavigate, onClose, onRestart }: { role: DemoRole; currentPage: DemoPageId; completedPages: Set<string>; simulated: boolean; onNavigate: (page: DemoPageId) => void; onClose: () => void; onRestart: () => void }) {
  const steps = tourSteps[role];
  const done = steps.filter((step) => completedPages.has(step.page)).length;
  return <aside aria-label="Guided product tour" className="fixed bottom-[84px] right-5 z-40 w-[min(360px,calc(100vw-32px))] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"><div className="flex items-start justify-between bg-[#073d3b] p-4 text-white"><div><p className="text-xs font-semibold uppercase tracking-widest text-emerald-200">Guided {role} path</p><p className="mt-1 text-sm font-semibold">{done} of 4 explored</p></div><button type="button" onClick={onClose} aria-label="Dismiss guided tour" className="rounded-lg p-1 text-emerald-100 hover:bg-white/10"><X className="h-4 w-4" /></button></div><div className="space-y-1 p-3">{steps.map((step, index) => { const complete = completedPages.has(step.page) || (step.page === "mentor-review-submission" && simulated); const active = currentPage === step.page; return <button type="button" key={step.page} onClick={() => onNavigate(step.page)} className={`flex w-full gap-3 rounded-xl p-3 text-left ${active ? "bg-[#eaf6f3]" : "hover:bg-slate-50"}`}><span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${complete ? "bg-[#008b7d] text-white" : "bg-slate-100 text-slate-500"}`}>{complete ? <Check className="h-4 w-4" /> : index + 1}</span><span><strong className="block text-sm text-slate-800">{step.title}</strong><span className="mt-1 block text-xs leading-5 text-slate-500">{step.description}</span></span></button>; })}</div><div className="flex items-center justify-between border-t border-slate-100 px-4 py-3"><button type="button" onClick={onRestart} className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500"><RotateCcw className="h-3.5 w-3.5" />Restart</button><Link href="/contact" className="inline-flex items-center gap-2 text-xs font-semibold text-[#008b7d]">Talk to us <ArrowRight className="h-3.5 w-3.5" /></Link></div></aside>;
}

function SearchDialog({ value, onChange, items, onNavigate, onClose }: { value: string; onChange: (value: string) => void; items: NavItem[]; onNavigate: (page: DemoPageId) => void; onClose: () => void }) {
  const filtered = items.filter((item) => item.label.toLowerCase().includes(value.toLowerCase()));
  return <div role="dialog" aria-modal="true" aria-label="Search Pathment preview" className="fixed inset-0 z-[70] flex items-start justify-center bg-slate-950/40 px-4 pt-[10vh]"><button type="button" aria-label="Close search" onClick={onClose} className="absolute inset-0" /><div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"><label className="flex items-center gap-3 border-b border-slate-200 px-4"><Search className="h-5 w-5 text-slate-400" /><span className="sr-only">Search pages</span><input autoFocus value={value} onChange={(event) => onChange(event.target.value)} placeholder="Search pages and workspaces…" className="h-14 flex-1 bg-transparent text-sm outline-none" /><button type="button" onClick={onClose} className="rounded-md border border-slate-200 px-2 py-1 text-[10px] text-slate-500">ESC</button></label><div className="max-h-[420px] overflow-y-auto p-2">{filtered.map((item) => { const Icon = item.icon; return <button type="button" key={item.page} onClick={() => onNavigate(item.page)} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left hover:bg-slate-50"><span className="grid h-9 w-9 place-items-center rounded-lg bg-[#eaf6f3] text-[#00766c]"><Icon className="h-4 w-4" /></span><span className="flex-1 text-sm font-medium text-slate-700">{item.label}</span><ArrowRight className="h-4 w-4 text-slate-300" /></button>; })}{!filtered.length ? <p className="p-8 text-center text-sm text-slate-500">No pages match “{value}”.</p> : null}</div></div></div>;
}

function SidePanel({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  return <div className="fixed inset-0 z-[70]"><button type="button" aria-label="Close panel" onClick={onClose} className="absolute inset-0 bg-slate-950/40" /><aside role="dialog" aria-modal="true" aria-label={title} className="absolute inset-y-0 right-0 w-full max-w-md overflow-y-auto bg-white shadow-2xl"><div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4"><h2 className="text-lg font-semibold text-slate-900">{title}</h2><button type="button" onClick={onClose} aria-label="Close panel" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><X className="h-5 w-5" /></button></div><div className="p-5">{children}</div></aside></div>;
}

function Notifications({ role }: { role: DemoRole }) {
  const initial = role === "admin" ? [
    { title: "Co-mentor nomination ready", message: "Aisha Khan nominated Maya Patel with five reviewed tasks and peer-support evidence.", meta: "Today · Review nomination", unread: true, tone: "teal" },
    { title: "Standing clan request", message: "Jordan Tester requested to join MERN Fellows from the public clan link.", meta: "2 hours ago · Review request", unread: true, tone: "amber" },
    { title: "Review session finished", message: "Aisha completed the Friday clan review: 18 reviewed, 2 deferred.", meta: "Yesterday", unread: false, tone: "slate" },
  ] : role === "mentor" ? [
    { title: "Submission ready for review", message: "Priya Sharma submitted Node fundamentals & the module system.", meta: "18 minutes ago · Open submission", unread: true, tone: "teal" },
    { title: "Roadblock raised", message: "Elif Demir is blocked on Express error-handling middleware.", meta: "1 hour ago · View mentee", unread: true, tone: "amber" },
    { title: "Clan review reminder", message: "Your MERN Fellows weekly review starts Friday at 4:00 PM.", meta: "Yesterday", unread: false, tone: "slate" },
  ] : [
    { title: "Task approved", message: "Aisha approved React components & state and awarded 15 points.", meta: "Today · View feedback", unread: true, tone: "teal" },
    { title: "Upcoming deadline", message: "Frontend Interview is due October 11.", meta: "2 hours ago · Open task", unread: true, tone: "amber" },
    { title: "New announcement", message: "Week 10 — APIs & data modeling was published for MERN Fellows.", meta: "Yesterday", unread: false, tone: "slate" },
  ];
  const [items, setItems] = useState(initial);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const visible = filter === "unread" ? items.filter((item) => item.unread) : items;
  const unread = items.filter((item) => item.unread).length;
  return <div className="-m-5 flex min-h-[calc(100vh-73px)] flex-col"><div className="border-b border-slate-200 px-5 py-4"><p className="text-sm text-slate-500">{unread ? `${unread} unread` : "All caught up"} · <span className="capitalize">{role}</span></p></div><div className="flex gap-2 border-b border-slate-200 p-4">{(["all", "unread"] as const).map((value) => <button type="button" key={value} aria-pressed={filter === value} onClick={() => setFilter(value)} className={`rounded-full px-4 py-2 text-sm font-medium ${filter === value ? "bg-[#008b7d] text-white" : "bg-slate-100 text-slate-600"}`}>{value === "all" ? "All updates" : `Unread (${unread})`}</button>)}</div><div className="flex-1 space-y-3 bg-slate-50/60 p-3">{visible.map((item, index) => <div key={item.title} className={`rounded-2xl border border-slate-200 px-4 py-4 ${item.unread ? "bg-[#eaf6f3]" : "bg-white"}`}><div className="flex items-start gap-3"><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${item.tone === "amber" ? "bg-amber-50 text-amber-700" : item.tone === "teal" ? "bg-[#dff3ee] text-[#00766c]" : "bg-slate-100 text-slate-500"}`}>{index === 0 ? <CheckCircle2 className="h-4 w-4" /> : index === 1 ? <Users className="h-4 w-4" /> : <Bell className="h-4 w-4" />}</span><div className="min-w-0 flex-1"><div className="flex items-center gap-2"><button type="button" onClick={() => setItems((current) => current.map((entry) => entry.title === item.title ? { ...entry, unread: false } : entry))} className="text-left text-sm font-semibold leading-snug text-slate-900">{item.title}</button>{item.unread ? <span className="h-2 w-2 shrink-0 rounded-full bg-[#008b7d]" /> : null}</div><p className="mt-2 text-sm leading-relaxed text-slate-600">{item.message}</p><button type="button" onClick={() => setItems((current) => current.map((entry) => entry.title === item.title ? { ...entry, unread: false } : entry))} className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[#008b7d]">{item.meta} <ChevronRight className="h-3 w-3" /></button></div><div className="flex shrink-0 gap-1">{item.unread ? <button type="button" aria-label="Mark notification read" onClick={() => setItems((current) => current.map((entry) => entry.title === item.title ? { ...entry, unread: false } : entry))} className="rounded p-1.5 text-slate-400 hover:bg-white hover:text-[#008b7d]"><Check className="h-4 w-4" /></button> : null}<button type="button" aria-label="Delete notification" onClick={() => setItems((current) => current.filter((entry) => entry.title !== item.title))} className="rounded p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"><Trash2 className="h-4 w-4" /></button></div></div></div>)}{visible.length === 0 ? <div className="grid min-h-72 place-items-center text-center"><div><Bell className="mx-auto h-8 w-8 text-slate-300" /><p className="mt-3 text-sm text-slate-500">You’re all caught up</p></div></div> : null}</div><div className="grid grid-cols-2 gap-2 border-t border-slate-200 bg-white p-3"><button type="button" onClick={() => setItems((current) => current.map((item) => ({ ...item, unread: false })))} className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700">Mark all as read</button><button type="button" onClick={() => setFilter("all")} className="rounded-lg bg-[#008b7d] px-3 py-2 text-sm font-medium text-white">View all</button></div></div>;
}

function QuickList({ title, items }: { title: string; items: string[] }) {
  return <div><p className="text-sm leading-6 text-slate-500">{title}</p><div className="mt-4 space-y-2">{items.map((item, index) => <div key={item} className="flex gap-3 rounded-xl border border-slate-200 p-3"><span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${index === 0 ? "bg-[#008b7d]" : "bg-slate-300"}`} /><div><p className="text-sm font-medium text-slate-800">{item}</p><p className="mt-1 text-xs text-slate-400">{index === 0 ? "Today" : `${index + 1} days ago`}</p></div></div>)}</div></div>;
}

function ChangelogPreview() {
  const updates = [
    { type: "Improvement", title: "Clearer review records", body: "Decision history now keeps the reviewer, evidence, reason, and timestamp together for easier program audits.", date: "October 8, 2026", icon: ClipboardCheck },
    { type: "New", title: "Mentor review queues", body: "Mentors can sort submitted work by age, task type, and support urgency before opening a review.", date: "October 2, 2026", icon: Sparkles },
    { type: "Improvement", title: "Progress with context", body: "Cohort progress now surfaces timing adjustments and active roadblocks beside the raw completion score.", date: "September 24, 2026", icon: BarChart3 },
  ];
  return <div className="-m-5 min-h-[calc(100vh-73px)] bg-slate-50/60"><div className="border-b border-slate-200 bg-white px-5 py-4"><p className="text-sm leading-6 text-slate-500">Recent Pathment product changes for program teams.</p></div><div className="space-y-3 p-4">{updates.map((update, index) => { const Icon = update.icon; return <article key={update.title} className="rounded-2xl border border-slate-200 bg-white p-4"><div className="flex items-start gap-3"><span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${index === 1 ? "bg-violet-50 text-violet-700" : "bg-[#e5f5f1] text-[#00766c]"}`}><Icon className="h-5 w-5" /></span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${update.type === "New" ? "bg-violet-50 text-violet-700" : "bg-[#e5f5f1] text-[#00766c]"}`}>{update.type}</span><time className="text-[11px] text-slate-400">{update.date}</time></div><h3 className="mt-2 text-sm font-semibold text-slate-900">{update.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{update.body}</p></div></div></article>; })}</div></div>;
}

function FeedbackPreview() {
  const [sent, setSent] = useState(false);
  return sent ? <div role="status" className="rounded-xl bg-emerald-50 p-4 text-sm leading-6 text-emerald-800"><strong>Feedback preview complete.</strong> A live workspace would send this to the product team. Nothing was transmitted from this public demo.</div> : <div><label className="text-sm font-semibold text-slate-700">What could be better?<textarea className="mt-2 min-h-32 w-full rounded-xl border border-slate-200 p-3 text-sm font-normal outline-none focus:border-[#43aa9a]" defaultValue="The guided workspace preview is helpful." /></label><button type="button" onClick={() => setSent(true)} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#008b7d] px-4 py-3 text-sm font-semibold text-white"><MessageSquarePlus className="h-4 w-4" />Simulate feedback</button></div>;
}

function LeavePreview() {
  return <div className="rounded-xl bg-slate-50 p-4"><ShieldCheck className="h-5 w-5 text-[#008b7d]" /><p className="mt-3 text-sm font-semibold text-slate-900">There is no active login</p><p className="mt-2 text-sm leading-6 text-slate-500">This public preview does not create a session or use cookies. Return to the marketing site or open the real application sign-in.</p><div className="mt-4 flex gap-2"><Link href="/" className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold">Marketing site</Link><Link href="https://app.pathment.me/login" className="rounded-xl bg-[#008b7d] px-3 py-2 text-xs font-semibold text-white">Real sign in</Link></div></div>;
}
