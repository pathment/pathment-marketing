"use client";

import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";
import { roleWorkspaces } from "./site-content";
import { TrackedLink } from "./TrackedLink";

/**
 * The product section. Pathment's real differentiator is that the same program
 * looks correct from three different seats, so the page shows all three rather
 * than averaging them into one generic "dashboard" shot.
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
      className="scroll-mt-20 border-b border-line bg-surface"
    >
      <div className="shell rhythm">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end lg:gap-16">
          <div>
            <p className="label">One program, three seats</p>
            <h2 id="workspaces-heading" className="display-lg mt-6">
              The same program, shown the way each person{" "}
              <span className="accent-serif">needs to see it.</span>
            </h2>
          </div>
          <p className="lede">
            A program lead, a mentor and a mentee want completely different
            things from Monday morning. Pathment gives each of them their own
            front door into one shared record.
          </p>
        </div>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Choose a Pathment role"
          className="mt-12 grid gap-2 sm:grid-cols-3 lg:mt-16"
        >
          {roleWorkspaces.map((item, index) => {
            const selected = index === active;
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
                className={`group rounded-xl border p-4 text-left transition-colors sm:p-5 ${
                  selected
                    ? "border-accent bg-accent text-white"
                    : "border-line bg-surface hover:border-accent/40 hover:bg-soft"
                }`}
              >
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.16em] ${
                    selected ? "text-white/70" : "text-muted"
                  }`}
                >
                  {item.role}
                </span>
                <span
                  className={`mt-2 block font-display text-xl font-semibold tracking-tight ${
                    selected ? "text-white" : "text-ink"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div
          role="tabpanel"
          id={`workspace-panel-${workspace.id}`}
          aria-labelledby={`workspace-tab-${workspace.id}`}
          tabIndex={0}
          className="mt-10"
        >
          {/* Copy above, product below: the screenshot is the argument, so it
              gets the full measure rather than a 40% column. */}
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
            <h3 className="display-md">{workspace.headline}</h3>
            <p className="mt-4 text-[15px] leading-7 text-muted">
              {workspace.body}
            </p>

            <TrackedLink
              href={`/demo?role=${workspace.id}`}
              eventName="demo_role_selected"
              eventProperties={{ role: workspace.id, source: "workspaces" }}
              className="btn btn-solid mt-7"
            >
              Open the {workspace.label.toLowerCase()} workspace
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
            </div>

            <div>
            <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line">
              {workspace.signals.map((signal) => (
                <div key={signal.label} className="bg-canvas px-3 py-3.5">
                  <dt className="sr-only">{signal.label}</dt>
                  <dd>
                    <span className="numeric block font-display text-xl font-semibold tracking-tight text-accent">
                      {signal.value}
                    </span>
                    <span className="mt-1 block text-[11px] leading-4 text-muted">
                      {signal.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            <ul className="mt-6 space-y-3">
              {workspace.capabilities.map((capability) => (
                <li key={capability} className="flex gap-3 text-[15px] leading-6 text-ink">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-accent" />
                  {capability}
                </li>
              ))}
            </ul>
            </div>
          </div>

          <figure className="screen mt-12">
            <div className="screen-bar">
              <div className="screen-dots">
                <span />
                <span />
                <span />
              </div>
              <span className="truncate rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-[10px] text-muted">
                app.pathment.me/w/pathment-demo/{workspace.id}
              </span>
            </div>
            <Image
              key={workspace.image}
              src={workspace.image}
              alt={workspace.alt}
              width={workspace.width}
              height={workspace.height}
              unoptimized
              className="h-auto w-full"
            />
            <figcaption className="sr-only">{workspace.alt}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
