"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * The product loop in three moves, one per role. These are the demo
 * workspace's own fictional personas (the same people the screenshots show),
 * so the card illustrates the interface rather than quoting real members.
 */
const events = [
  {
    name: "Maya Patel",
    role: "Mentee",
    action: "submitted API validation & rate limiting",
    time: "10:14",
    avatar: "/demo/people/maya-patel.png",
    tone: "bg-[#e3f5e9] text-[#17784b]",
  },
  {
    name: "Aisha Khan",
    role: "Mentor",
    action: "approved it with feedback",
    time: "11:06",
    avatar: "/demo/people/aisha-khan.png",
    tone: "bg-[#ece9fb] text-[#5b4bc4]",
  },
  {
    name: "Dana Reyes",
    role: "Admin",
    action: "accepted 3 applicants into Spring 2026",
    time: "14:32",
    avatar: "/demo/people/dana-reyes.png",
    tone: "bg-[#fdefdc] text-[#a25d0b]",
  },
] as const;

/**
 * All three moves stay visible so the card never changes height; a highlight
 * walks through them in order, which reads as the loop happening live.
 */
export function HeroActivity() {
  const [active, setActive] = useState(events.length - 1);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(
      () => setActive((index) => (index + 1) % events.length),
      2400,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      aria-hidden
      className="w-[19.5rem] rounded-2xl border border-black/5 bg-white/95 p-4 text-left shadow-[0_30px_70px_-30px_rgba(4,30,22,0.75)] backdrop-blur dark:border-white/10 dark:bg-[#0b0d0c]/95"
    >
      <div className="flex items-center justify-between">
        <p className="text-[12px] font-semibold text-[#0f241d] dark:text-white">
          Live in your program
        </p>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#17784b] dark:text-[var(--leaf)]">
          <span className="lp-live-dot h-1.5 w-1.5 rounded-full bg-current" />
          Today
        </span>
      </div>
      <ol className="mt-3 space-y-2.5">
        {events.map((event, index) => (
          <li
            key={event.name}
            className={`flex items-start gap-3 rounded-xl border p-2.5 transition-all duration-500 ${
              index === active
                ? "scale-[1.02] border-[#17784b]/30 bg-[#ecf7f0] opacity-100 shadow-[0_10px_24px_-16px_rgba(23,120,75,0.8)] dark:border-[#8ee8ad]/30 dark:bg-[#0d1f17]"
                : "border-black/5 opacity-55 dark:border-white/10"
            }`}
          >
            <Image
              src={event.avatar}
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 shrink-0 rounded-full object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1.5 text-[12px] font-semibold text-[#0f241d] dark:text-white">
                {event.name}
                <span className={`rounded-full px-1.5 py-px text-[9px] font-bold uppercase tracking-wide ${event.tone}`}>
                  {event.role}
                </span>
              </p>
              <p className="mt-0.5 text-[11.5px] leading-4 text-[#4b5f57] dark:text-white/65">
                {event.action}
              </p>
            </div>
            <span className="numeric text-[10px] text-[#4b5f57]/70 dark:text-white/40">
              {event.time}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
