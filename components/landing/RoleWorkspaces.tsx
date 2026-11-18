"use client";

import Image from "next/image";
import { ArrowRight, Check, GraduationCap, UserCog, Users } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";
import { roleWorkspaces } from "./site-content";
import { TrackedLink } from "./TrackedLink";

const tabIcons = { admin: UserCog, mentor: GraduationCap, mentee: Users } as const;

/**
 * The same program looks correct from three different seats, so the section
 * lets the visitor switch seats instead of averaging them into one dashboard.
 */
export function RoleWorkspaces() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const workspace = roleWorkspaces[active];

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const last = roleWorkspaces.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowRight") next = active === last ? 0 : active + 1;
    if (event.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section
      id="workspaces"
      aria-labelledby="workspaces-heading"
      className="relative scroll-mt-20 overflow-hidden border-y border-line bg-gradient-to-b from-[var(--lp-tint)] to-white dark:to-black"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-[22%] top-24 h-80 w-80 rounded-full bg-[var(--leaf)]/20 blur-3xl"
      />
      <div className="shell relative grid gap-10 pt-14 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.5fr)_minmax(0,0.75fr)] lg:gap-8 lg:pt-16">
        <div className="lg:pt-6">
          <p className="lp-label">Tailored for every role</p>
          <h2
            id="workspaces-heading"
            className="lp-heading mt-3 text-[clamp(1.6rem,2.6vw,2rem)]"
          >
            A workspace that works for everyone in your program.
          </h2>
          <p className="mt-4 text-sm leading-6 text-muted">
            Give admins, mentors and mentees the right tools, in one connected
            workspace.
          </p>
        </div>

        <div className="min-w-0">
          <div
            role="tablist"
            aria-label="Choose a Pathment role"
            className="mx-auto flex w-full max-w-md rounded-full border border-line bg-surface p-1 shadow-[0_10px_30px_-22px_rgba(7,42,32,0.6)]"
          >
            {roleWorkspaces.map((item, index) => {
              const selected = index === active;
              const Icon = tabIcons[item.id];
              return (
                <button
                  key={item.id}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`workspace-tab-${item.id}`}
                  aria-selected={selected}
                  aria-controls={`workspace-panel-${item.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(index)}
                  onKeyDown={onTabKeyDown}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors ${
                    selected
                      ? "bg-[var(--forest)] text-white"
                      : "text-ink/80 hover:bg-soft"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Tablet frame; it bleeds off the bottom of the section on purpose. */}
          <div
            role="tabpanel"
            id={`workspace-panel-${workspace.id}`}
            aria-labelledby={`workspace-tab-${workspace.id}`}
            className="mt-6 h-[15rem] overflow-hidden sm:h-[22rem] lg:h-[20rem]"
          >
            <div className="rounded-t-[1.6rem] border border-b-0 border-black/10 bg-gradient-to-b from-[#d5d9da] to-[#b9bfc1] p-2.5 pb-0 shadow-[0_30px_70px_-35px_rgba(7,42,32,0.7)] dark:from-[#2b3033] dark:to-[#1a1d1f]">
              <div className="overflow-hidden rounded-t-[1.1rem] bg-white">
                <Image
                  key={workspace.image}
                  src={workspace.image}
                  alt={workspace.alt}
                  width={workspace.width}
                  height={workspace.height}
                  unoptimized
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pb-12 lg:pb-0 lg:pt-14">
          <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
            {workspace.audience}
          </h3>
          <ul className="mt-4 space-y-3">
            {workspace.highlights.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm leading-5 text-ink/85">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--lp-green)]" strokeWidth={2.5} />
                {item}
              </li>
            ))}
          </ul>
          <TrackedLink
            href={`/demo?role=${workspace.id}`}
            eventName="demo_role_selected"
            eventProperties={{ role: workspace.id, source: "workspaces" }}
            className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--lp-green)]"
          >
            Try the {workspace.label.toLowerCase()} workspace
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
