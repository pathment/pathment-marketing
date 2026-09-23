import Image from "next/image";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  LayoutGrid,
  MessageSquare,
  Route,
  Users,
} from "lucide-react";

export function HeroDashboard() {
  return (
    <figure className="relative min-w-0 rounded-[28px] bg-[#e9efec] p-3 sm:p-6 lg:-mr-2">
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_20px_60px_-25px_#193b3650]">
        <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3">
          <div className="flex items-center gap-2">
            <Image src="/logo-mark.svg" alt="" width={25} height={25} />
            <span className="text-xs font-semibold">Your workspace</span>
            <ChevronDown size={12} className="text-zinc-400" />
          </div>
          <span className="rounded-md bg-zinc-100 px-2 py-1 text-[9px] font-medium text-zinc-500">
            PROGRAM LEAD
          </span>
        </div>
        <div className="flex">
          <div
            aria-hidden="true"
            className="hidden w-12 shrink-0 space-y-5 border-r border-zinc-100 bg-zinc-50/60 px-3 py-6 sm:block"
          >
            <LayoutGrid size={18} className="text-brand-500" />
            <Users size={18} className="text-zinc-400" />
            <Route size={18} className="text-zinc-400" />
            <MessageSquare size={18} className="text-zinc-400" />
          </div>
          <div className="min-w-0 flex-1 p-4 sm:p-5">
            <div className="mb-5 flex items-start justify-between gap-2">
              <div>
                <p className="mb-1 text-[10px] text-zinc-500">
                  A little progress, every day
                </p>
                <h2 className="text-lg font-semibold tracking-tight">
                  Your program at a glance
                </h2>
              </div>
              <span className="mt-1 rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-medium text-[#006963]">
                On track
              </span>
            </div>
            <div className="mb-5 grid grid-cols-3 gap-2">
              {[
                ["24", "Active mentees"],
                ["8", "Mentors"],
                ["86%", "Milestones complete"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-lg border border-zinc-100 p-2.5"
                >
                  <p className="text-xl font-semibold tracking-tight text-brand-950">
                    {value}
                  </p>
                  <p className="mt-1 text-[9px] leading-4 text-zinc-500">
                    {label}
                  </p>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-zinc-200 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold">Learning roadmap</span>
                <span className="text-[9px] text-zinc-400">4 milestones</span>
              </div>
              <p className="mt-1 text-[10px] text-zinc-500">
                From foundations to your first real project
              </p>
              <div className="mt-4 space-y-4">
                {[
                  ["01", "Build your foundations", "Completed"],
                  ["02", "Put it into practice", "In progress"],
                  ["03", "Share your work", "Up next"],
                ].map(([n, title, status], i) => (
                  <div key={n} className="flex items-center gap-3">
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] ${i === 0 ? "bg-[#006963] text-white" : i === 1 ? "bg-brand-50 text-brand-600 ring-1 ring-brand-200" : "bg-zinc-100 text-zinc-400"}`}
                    >
                      {i === 0 ? <Check size={13} /> : n}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-medium">{title}</p>
                      <p className="mt-0.5 text-[9px] text-zinc-500">
                        {status}
                      </p>
                    </div>
                    {i === 1 ? (
                      <span className="h-1.5 w-10 overflow-hidden rounded bg-brand-100">
                        <span className="block h-full w-2/3 bg-brand-500" />
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2.5 rounded-xl bg-[#eff7f4] p-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#d3e9df] text-xs font-semibold text-[#006963]">
                SM
              </span>
              <div className="flex-1">
                <p className="text-[10px] font-semibold text-[#006963]">
                  A little feedback goes a long way
                </p>
                <p className="mt-0.5 text-[9px] text-zinc-600">
                  Sarah reviewed your latest submission.
                </p>
              </div>
              <ArrowUpRight size={14} className="text-[#006963]" />
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-[10px] font-medium tracking-wide text-[#52665d]">
        A look inside Pathment · Illustrative program data
      </figcaption>
    </figure>
  );
}
