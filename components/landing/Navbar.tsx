"use client";

import Link from "next/link";
import {
  BarChart3,
  CalendarClock,
  ChevronDown,
  ClipboardCheck,
  ClipboardList,
  GraduationCap,
  Menu,
  MessageSquare,
  Route,
  Smartphone,
  Trophy,
  UserCog,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { APP_LOGIN_URL, APP_REGISTER_URL } from "../../lib/links";
import { Brand } from "./Brand";
import { ThemeToggle } from "./ThemeToggle";
import { TrackedLink } from "./TrackedLink";

interface MenuLink {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

interface MenuGroup {
  heading: string;
  links: MenuLink[];
}

const productMenu: MenuGroup[] = [
  {
    heading: "By role",
    links: [
      {
        href: "/#workspaces",
        label: "For program leads",
        description: "Admissions, placement and program health",
        icon: UserCog,
      },
      {
        href: "/#workspaces",
        label: "For mentors",
        description: "A review queue ordered by who needs you",
        icon: ClipboardCheck,
      },
      {
        href: "/#workspaces",
        label: "For mentees",
        description: "One roadmap, one obvious next step",
        icon: GraduationCap,
      },
    ],
  },
  {
    heading: "Capabilities",
    links: [
      {
        href: "/#capabilities",
        label: "Admissions & intake",
        description: "Apply links, assessments, placement",
        icon: ClipboardList,
      },
      {
        href: "/#capabilities",
        label: "Learning roadmaps",
        description: "Milestones and tasks that adjust",
        icon: Route,
      },
      {
        href: "/#capabilities",
        label: "Recognition",
        description: "Points, badges and certificates",
        icon: Trophy,
      },
      {
        href: "/#capabilities",
        label: "Scheduling & 1:1s",
        description: "Availability, booking and notes",
        icon: CalendarClock,
      },
      {
        href: "/#capabilities",
        label: "Messaging & community",
        description: "Scoped feeds and direct messages",
        icon: MessageSquare,
      },
      {
        href: "/#capabilities",
        label: "Insights",
        description: "At-risk detection and distribution",
        icon: BarChart3,
      },
    ],
  },
];

const solutionsMenu: MenuGroup[] = [
  {
    heading: "By program type",
    links: [
      {
        href: "/#audiences",
        label: "Fellowships & bootcamps",
        description: "Cohorts, clans and a shared curriculum",
        icon: Users,
      },
      {
        href: "/#audiences",
        label: "Internal L&D",
        description: "Prove the mentoring budget worked",
        icon: BarChart3,
      },
      {
        href: "/#audiences",
        label: "Universities & career services",
        description: "Alumni and campus mentoring at scale",
        icon: GraduationCap,
      },
      {
        href: "/#audiences",
        label: "Communities & nonprofits",
        description: "Grow past what volunteers can hold",
        icon: Trophy,
      },
    ],
  },
  {
    heading: "Explore",
    links: [
      {
        href: "/demo",
        label: "Interactive demo",
        description: "68 product screens, no account",
        icon: ClipboardCheck,
      },
      {
        href: "/#mobile",
        label: "Android app",
        description: "The native five-tab experience",
        icon: Smartphone,
      },
    ],
  },
];

const flatLinks = [
  { href: "/#lifecycle", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
] as const;

type OpenMenu = "product" | "solutions" | null;

function MenuPanel({ groups, onNavigate }: { groups: MenuGroup[]; onNavigate: () => void }) {
  return (
    <div className="grid gap-8 p-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] sm:p-7">
      {groups.map((group) => (
        <div key={group.heading}>
          <p className="label label-plain mb-4 text-[10px]">{group.heading}</p>
          <ul className="grid gap-1 sm:grid-cols-[repeat(auto-fit,minmax(13rem,1fr))]">
            {group.links.map((link) => (
              <li key={`${group.heading}-${link.label}`}>
                <Link
                  href={link.href}
                  onClick={onNavigate}
                  className="group flex gap-3 rounded-lg p-2.5 transition-colors hover:bg-soft"
                >
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line bg-canvas text-accent transition-colors group-hover:border-accent/40">
                    <link.icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-ink">
                      {link.label}
                    </span>
                    <span className="mt-0.5 block text-xs leading-5 text-muted">
                      {link.description}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (openMenu) setOpenMenu(null);
      else if (mobileOpen) {
        setMobileOpen(false);
        toggleRef.current?.focus();
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (!navRef.current?.contains(event.target as Node)) setOpenMenu(null);
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openMenu, mobileOpen]);

  // Pointer intent: a short grace period stops the panel flickering shut while
  // the cursor crosses the gap between the trigger and the panel.
  const scheduleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  useEffect(() => () => cancelClose(), [cancelClose]);

  function navigateFromMenu(event: MouseEvent<HTMLAnchorElement>, href: string) {
    setMobileOpen(false);
    setOpenMenu(null);
    if (href.startsWith("/#") && window.location.pathname === "/") {
      event.preventDefault();
      const sectionId = href.slice(2);
      window.history.pushState(null, "", `#${sectionId}`);
      window.requestAnimationFrame(() => {
        document.getElementById(sectionId)?.scrollIntoView({ block: "start" });
      });
    }
  }

  const triggers: { id: Exclude<OpenMenu, null>; label: string; groups: MenuGroup[] }[] = [
    { id: "product", label: "Product", groups: productMenu },
    { id: "solutions", label: "Solutions", groups: solutionsMenu },
  ];

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-surface/85 backdrop-blur-xl transition-colors ${
        scrolled ? "border-line" : "border-transparent"
      }`}
    >
      <nav
        ref={navRef}
        aria-label="Main navigation"
        className="shell flex h-16 items-center justify-between gap-6 lg:h-18"
      >
        <Brand scrollToTop />

        <div className="hidden items-center gap-1 lg:flex">
          {triggers.map((trigger) => {
            const open = openMenu === trigger.id;
            return (
              <div
                key={trigger.id}
                className="relative"
                onPointerEnter={() => {
                  cancelClose();
                  setOpenMenu(trigger.id);
                }}
                onPointerLeave={scheduleClose}
              >
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenMenu(open ? null : trigger.id)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    open ? "text-accent" : "text-muted hover:text-ink"
                  }`}
                >
                  {trigger.label}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
                  />
                </button>
                {open ? (
                  <div
                    onPointerEnter={cancelClose}
                    onPointerLeave={scheduleClose}
                    className="absolute left-1/2 top-[calc(100%+0.6rem)] w-[min(46rem,calc(100vw-3rem))] -translate-x-1/2 overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_32px_80px_-40px_rgba(4,17,15,0.5)]"
                  >
                    <MenuPanel groups={trigger.groups} onNavigate={() => setOpenMenu(null)} />
                  </div>
                ) : null}
              </div>
            );
          })}

          {flatLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <TrackedLink
            href={APP_LOGIN_URL}
            eventName="login_clicked"
            className="px-2 text-sm font-semibold text-muted hover:text-ink"
          >
            Sign in
          </TrackedLink>
          <TrackedLink
            href="/demo"
            eventName="demo_started"
            eventProperties={{ source: "header" }}
            className="btn btn-solid snake"
          >
            <span className="snake-label">Explore the demo</span>
          </TrackedLink>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={mobileOpen}
            aria-controls={menuId}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface text-ink"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {mobileOpen ? (
        <div
          id={menuId}
          className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto border-t border-line bg-surface lg:hidden"
        >
          <div className="shell py-6">
            {[...productMenu, ...solutionsMenu].map((group) => (
              <div key={group.heading} className="mb-7">
                <p className="label label-plain mb-3 text-[10px]">{group.heading}</p>
                <ul className="space-y-0.5">
                  {group.links.map((link) => (
                    <li key={`${group.heading}-m-${link.label}`}>
                      <Link
                        href={link.href}
                        onClick={(event) => navigateFromMenu(event, link.href)}
                        className="flex items-center gap-3 rounded-xl px-2 py-2.5 hover:bg-soft"
                      >
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line bg-canvas text-accent">
                          <link.icon className="h-4 w-4" />
                        </span>
                        <span className="text-sm font-medium text-ink">{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <hr className="hair my-6" />

            <div className="space-y-0.5">
              {flatLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(event) => navigateFromMenu(event, item.href)}
                  className="block rounded-xl px-2 py-3 text-base font-medium text-ink hover:bg-soft"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-6 space-y-3">
              <TrackedLink
                href="/demo"
                eventName="demo_started"
                eventProperties={{ source: "mobile_header" }}
                onClick={() => setMobileOpen(false)}
                className="btn btn-solid w-full"
              >
                Explore the demo
              </TrackedLink>
              <TrackedLink
                href={APP_REGISTER_URL}
                eventName="organization_signup_clicked"
                onClick={() => setMobileOpen(false)}
                className="btn btn-outline w-full"
              >
                Create an organization
              </TrackedLink>
              <TrackedLink
                href={APP_LOGIN_URL}
                eventName="login_clicked"
                onClick={() => setMobileOpen(false)}
                className="btn btn-outline w-full"
              >
                Sign in
              </TrackedLink>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
