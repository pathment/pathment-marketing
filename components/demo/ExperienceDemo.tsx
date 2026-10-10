"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Monitor, ShieldCheck, Smartphone, X } from "lucide-react";
import type { DemoPageId, DemoRole } from "./demo-data";
import type { MobileRole } from "../mobile/MobileProductDemo";

const InteractiveDemo = dynamic(() => import("./InteractiveDemo").then((module) => module.InteractiveDemo), { loading: () => <div className="min-h-screen bg-[#f4f8f7]" /> });
const MobileProductDemo = dynamic(() => import("../mobile/MobileProductDemo").then((module) => module.MobileProductDemo), { loading: () => <div className="min-h-screen bg-[#f4f8f7]" /> });

export type DemoDevice = "web" | "mobile";

const mobileViewportQuery = "(max-width: 1023px)";

const roleDetails = {
  admin: {
    label: "Admin",
    title: "See the whole program, then act where it matters.",
    copy: "Review admissions, compare clans, follow people who need support, and audit recognition decisions.",
    image: "/product/admin-dashboard.webp",
    width: 1425,
    height: 989,
    alt: "Pathment Admin workspace showing program health, priorities, and clan progress.",
    moments: ["Program health", "People needing support", "Decision history"],
    tint: "bg-[#dff5ee] text-[#006b62]",
  },
  mentor: {
    label: "Mentor",
    title: "Start with the mentee who needs you most.",
    copy: "Move from the review queue to learner context, feedback, and follow-up without losing the thread.",
    image: "/product/mentor-dashboard.webp",
    width: 1424,
    height: 900,
    alt: "Pathment Mentor workspace showing mentees, reviews, and follow-ups.",
    moments: ["Review queue", "Mentee context", "Focused feedback"],
    tint: "bg-[#eef0ff] text-[#4b55a3]",
  },
  mentee: {
    label: "Mentee",
    title: "Know the next step and why it matters.",
    copy: "Open the roadmap, complete work, read mentor feedback, and see progress become recognition.",
    image: "/product/mentee-dashboard.webp",
    width: 1424,
    height: 900,
    alt: "Pathment Mentee workspace showing next tasks, learning progress, and support.",
    moments: ["Next task", "Mentor feedback", "Earned progress"],
    tint: "bg-[#fff2df] text-[#8a4a06]",
  },
} as const;

export function ExperienceDemo({ initialRole, initialPage, initialDevice }: { initialRole: DemoRole; initialPage?: DemoPageId; initialDevice?: DemoDevice }) {
  const [role, setRole] = useState<DemoRole>(initialRole);
  const [selectedDevice, setSelectedDevice] = useState<DemoDevice | null>(initialDevice ?? null);
  const device: DemoDevice = selectedDevice ?? "web";
  const [chooserOpen, setChooserOpen] = useState(true);
  const [hasLaunched, setHasLaunched] = useState(false);
  const [sessionKey, setSessionKey] = useState(0);
  const preview = roleDetails[role];

  useEffect(() => {
    if (initialDevice) return;
    const timer = window.setTimeout(() => {
      setSelectedDevice((current) => current ?? (window.matchMedia(mobileViewportQuery).matches ? "mobile" : "web"));
    }, 0);
    return () => window.clearTimeout(timer);
  }, [initialDevice]);

  function launch(nextDevice: DemoDevice) {
    setSelectedDevice(nextDevice);
    setHasLaunched(true);
    setSessionKey((value) => value + 1);
    setChooserOpen(false);
  }

  return (
    <div className="min-h-screen">
      <div className={!chooserOpen && hasLaunched ? "pt-16 sm:pt-0" : ""}>
        {hasLaunched ? device === "web" ? <InteractiveDemo key={`web-${role}-${sessionKey}`} initialRole={role} initialPage={initialPage} /> : <MobileProductDemo key={`mobile-${role}-${sessionKey}`} initialRole={role as MobileRole} /> : null}
      </div>

      {!chooserOpen && hasLaunched ? (
        <div className="fixed left-1/2 top-3 z-[90] flex -translate-x-1/2 items-center gap-1 rounded-2xl border border-white/15 bg-[#073d3b]/95 p-1.5 text-white shadow-2xl backdrop-blur" aria-label="Preview mode">
          <button type="button" onClick={() => setSelectedDevice("web")} className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-[11px] font-semibold ${device === "web" ? "bg-white text-[#075e57]" : "text-white/75 hover:bg-white/10"}`}><Monitor className="h-3.5 w-3.5" />Web</button>
          <button type="button" onClick={() => setSelectedDevice("mobile")} className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-[11px] font-semibold ${device === "mobile" ? "bg-white text-[#075e57]" : "text-white/75 hover:bg-white/10"}`}><Smartphone className="h-3.5 w-3.5" />Mobile</button>
          <span className="mx-1 h-5 w-px bg-white/15" />
          <button type="button" onClick={() => setChooserOpen(true)} className="rounded-xl px-3 py-2 text-[11px] font-semibold text-white/80 hover:bg-white/10">Switch role</button>
        </div>
      ) : null}

      {chooserOpen ? (
        <div role="dialog" aria-modal="true" aria-labelledby="experience-title" className="fixed inset-0 z-[100] overflow-y-auto bg-[#eaf3ef] text-[#153e3a]">
          <div className="min-h-full">
            <header className="border-b border-[#cfe0da] bg-white/80 px-5 backdrop-blur sm:px-8">
              <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
                <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#365f59]"><ArrowLeft className="h-4 w-4" />Back to Pathment</Link>
                <div className="hidden items-center gap-2 text-xs text-[#617773] sm:flex"><ShieldCheck className="h-4 w-4 text-[#008b7d]" />Fictional data. No account required.</div>
                {hasLaunched ? <button type="button" onClick={() => setChooserOpen(false)} aria-label="Close experience chooser" className="rounded-full border border-[#cfe0da] bg-white p-2.5 text-[#365f59] hover:bg-[#edf5f2]"><X className="h-4 w-4" /></button> : <Link href="/" aria-label="Close experience chooser" className="rounded-full border border-[#cfe0da] bg-white p-2.5 text-[#365f59] hover:bg-[#edf5f2]"><X className="h-4 w-4" /></Link>}
              </div>
            </header>

            <main className="mx-auto max-w-7xl px-5 py-7 sm:px-8 sm:py-9">
              <div className="grid gap-5 xl:grid-cols-[.9fr_1.1fr] xl:items-end">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[.17em] text-[#00766c]">Interactive product experience</p>
                  <h1 id="experience-title" className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-[1.08] tracking-[-.045em] sm:text-5xl">Choose a seat. Start inside the product.</h1>
                </div>
                <p className="max-w-2xl text-base leading-7 text-[#617773] xl:justify-self-end">Pick the perspective you care about. Then enter the complete Web workspace or the native mobile experience in one click.</p>
              </div>

              <div className="mt-6 inline-flex w-full gap-1.5 rounded-2xl border border-[#cfe0da] bg-white/60 p-1.5 sm:w-auto" role="tablist" aria-label="Choose a Pathment role">
                {(Object.keys(roleDetails) as DemoRole[]).map((item) => (
                  <button key={item} type="button" role="tab" aria-selected={role === item} onClick={() => setRole(item)} className={`flex-1 rounded-xl px-5 py-2.5 text-sm font-semibold transition sm:flex-none ${role === item ? "bg-[#00766c] text-white shadow-sm" : "text-[#526c66] hover:bg-white"}`}>{roleDetails[item].label}</button>
                ))}
              </div>

              <section className="mt-4 overflow-hidden rounded-[2rem] border border-[#c5d9d2] bg-white shadow-[0_35px_100px_-55px_rgba(7,61,59,.65)]">
                <div className="grid lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,.55fr)]">
                  <div className="relative overflow-hidden bg-[#f8fbfa] p-3 sm:p-5">
                    <div className="mb-3 flex items-center justify-between px-1"><span className="flex gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-[#ff8e7f]" /><i className="h-2.5 w-2.5 rounded-full bg-[#f5cf67]" /><i className="h-2.5 w-2.5 rounded-full bg-[#6dc9a6]" /></span><span className="text-[10px] font-semibold uppercase tracking-[.14em] text-[#82948f]">Live product preview</span></div>
                    <div className="overflow-hidden rounded-xl border border-[#d9e7e2] bg-white">
                      <Image key={preview.image} src={preview.image} alt={preview.alt} width={preview.width} height={preview.height} priority sizes="(max-width: 1023px) 100vw, 68vw" className="h-auto w-full" />
                    </div>
                  </div>
                  <div className="flex flex-col bg-[#073d3b] p-6 text-white sm:p-8">
                    <span className={`w-fit rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[.12em] ${preview.tint}`}>{preview.label} perspective</span>
                    <h2 className="mt-5 text-2xl font-semibold leading-tight">{preview.title}</h2>
                    <p className="mt-4 text-sm leading-7 text-white/67">{preview.copy}</p>
                    <ul className="mt-6 space-y-3 text-sm text-white/78">
                      {preview.moments.map((moment) => <li key={moment} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#75cbbb]" />{moment}</li>)}
                    </ul>
                    <div className="mt-8 space-y-3">
                      <button type="button" onClick={() => launch("web")} className="flex w-full items-center justify-between rounded-xl bg-[#8fe0ca] px-4 py-3.5 text-sm font-semibold text-[#073d3b] hover:bg-[#aeead9]"><span className="inline-flex items-center gap-2"><Monitor size={16} />Open Web workspace</span><ArrowRight size={16} /></button>
                      <button type="button" onClick={() => launch("mobile")} className="flex w-full items-center justify-between rounded-xl border border-white/18 px-4 py-3.5 text-sm font-semibold text-white hover:bg-white/8"><span className="inline-flex items-center gap-2"><Smartphone size={16} />Open mobile app</span><ArrowRight size={16} /></button>
                    </div>
                  </div>
                </div>
              </section>

              <div className="mt-5 flex flex-col justify-between gap-3 text-xs text-[#617773] sm:flex-row sm:items-center">
                <p>You can switch role or device at any time after entering.</p>
                <div className="flex gap-4"><Link href="/pricing" className="font-semibold text-[#00766c]">See plans</Link><Link href="/contact" className="font-semibold text-[#00766c]">Talk to us</Link></div>
              </div>
            </main>
          </div>
        </div>
      ) : null}
    </div>
  );
}
