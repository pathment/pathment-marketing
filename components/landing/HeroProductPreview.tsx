"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const previews = {
  admin: {
    label: "Admin",
    image: "/product/admin-dashboard.webp",
    width: 1425,
    height: 989,
    alt: "Pathment admin workspace with program health and decision signals.",
    title: "See the program before a problem grows.",
    items: ["3 applications waiting", "2 clans need support", "7 approvals ready"],
  },
  mentor: {
    label: "Mentor",
    image: "/product/mentor-dashboard.webp",
    width: 1424,
    height: 900,
    alt: "Pathment mentor workspace with mentees and reviews waiting.",
    title: "Know who needs attention first.",
    items: ["4 submissions to review", "2 open roadblocks", "Friday clan review"],
  },
  mentee: {
    label: "Mentee",
    image: "/product/mentee-dashboard.webp",
    width: 1424,
    height: 900,
    alt: "Pathment mentee workspace with next tasks and learning progress.",
    title: "Turn a roadmap into one clear next step.",
    items: ["Next task is visible", "Feedback stays in context", "Progress has evidence"],
  },
} as const;

type PreviewRole = keyof typeof previews;

export function HeroProductPreview() {
  const [role, setRole] = useState<PreviewRole>("admin");
  const preview = previews[role];
  return (
    <div className="relative">
      <div className="absolute -inset-10 -z-10 rounded-full bg-brand-200/35 blur-3xl" />
      <div className="overflow-hidden rounded-[1.75rem] border border-[#c7dbd4] bg-white shadow-[0_30px_90px_-45px_rgba(0,60,54,.55)]">
        <div className="flex flex-col gap-3 border-b border-[#dce7e3] bg-[#f8fbfa] p-3 sm:flex-row sm:items-center sm:justify-between">
          <div role="tablist" aria-label="Preview a Pathment role" className="grid grid-cols-3 rounded-xl border border-[#d5e3de] bg-white p-1">
            {(Object.keys(previews) as PreviewRole[]).map((item) => <button key={item} type="button" role="tab" aria-selected={role === item} onClick={() => setRole(item)} className={`rounded-lg px-3 py-2 text-[11px] font-semibold ${role === item ? "bg-[#00766c] text-white" : "text-[#617773] hover:bg-[#edf5f2]"}`}>{previews[item].label}</button>)}
          </div>
          <p className="px-1 text-[10px] font-medium uppercase tracking-[.13em] text-[#7d918b]">Fictional demo workspace</p>
        </div>
        <div>
          <figure className="flex min-w-0 items-start justify-center overflow-hidden bg-white">
            <Image
              key={preview.image}
              src={preview.image}
              alt={preview.alt}
              width={preview.width}
              height={preview.height}
              priority
              unoptimized
              className="h-auto w-full object-contain object-top"
            />
          </figure>
          <div className="grid gap-5 bg-[#073d3b] p-5 text-white sm:grid-cols-[1fr_auto] sm:items-center sm:p-6">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="w-fit rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[.13em] text-[#a7ddd0]">{preview.label} view</span>
                <h2 className="text-base font-semibold sm:text-lg">{preview.title}</h2>
              </div>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs leading-5 text-white/70">{preview.items.map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#75cbbb]" />{item}</li>)}</ul>
            </div>
            <Link href={`/demo?role=${role}`} className="inline-flex items-center gap-2 text-xs font-semibold text-[#8fe0ca] sm:justify-self-end">Open this workspace <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
