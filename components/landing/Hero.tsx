import Image from "next/image";
import { ArrowRight, Check, Clock3, MessageSquareCheck, PlayCircle } from "lucide-react";
import { APP_REGISTER_URL } from "../../lib/links";
import { proof } from "./site-content";
import { TrackedLink } from "./TrackedLink";

const pillars = ["Applications", "Mentorship", "Learning", "Reviews", "Outcomes"] as const;

const books = [
  { label: "Mentorship", tone: "from-[#1d5a45] to-[#123d2f]", offset: "translate-x-3" },
  { label: "Cohorts", tone: "from-[#24694f] to-[#164835]", offset: "-translate-x-1" },
  { label: "Programs", tone: "from-[#1a5241] to-[#0f372a]", offset: "translate-x-1" },
] as const;

/** A few stylised leaves behind the laptop, drawn rather than photographed. */
function Plant() {
  const leaves = [
    { d: "M60 190 C 20 150, 10 90, 40 40 C 60 90, 70 140, 60 190Z", fill: "#2f7a52" },
    { d: "M64 190 C 80 130, 120 90, 170 80 C 140 120, 110 160, 64 190Z", fill: "#3f9163" },
    { d: "M62 190 C 40 140, 0 120, -20 120 C 0 160, 30 180, 62 190Z", fill: "#256643" },
    { d: "M62 190 C 70 120, 100 50, 130 20 C 120 80, 100 140, 62 190Z", fill: "#4ea371" },
    { d: "M60 190 C 50 150, 60 80, 90 60 C 90 110, 80 160, 60 190Z", fill: "#1f5a3b" },
  ];
  return (
    <svg
      viewBox="-30 0 210 205"
      aria-hidden
      className="pointer-events-none absolute -left-4 bottom-14 z-0 hidden w-40 lg:block xl:-left-12 xl:w-48"
    >
      {leaves.map((leaf) => (
        <path key={leaf.d} d={leaf.d} fill={leaf.fill} />
      ))}
      <path d="M44 186 h36 l-5 18 h-26z" fill="#e9e4d8" />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="lp-forest relative overflow-hidden">
      <div aria-hidden className="lp-dots pointer-events-none absolute inset-0" />
      <div className="shell relative grid items-center gap-12 pb-16 pt-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-6 lg:pb-20 lg:pt-16">
        <div className="hero-rise">
          <p className="lp-label !text-[#b9ecc9]">
            Built for mentorship programs
            <span aria-hidden className="h-px w-14 bg-current opacity-50" />
          </p>

          <h1 className="mt-6 font-display text-[clamp(2.4rem,4.3vw,3.7rem)] font-bold leading-[1.05] tracking-[-0.04em] text-white">
            Run mentorship programs that{" "}
            <span className="font-serif text-[1.12em] font-normal italic tracking-[-0.02em] text-[var(--leaf)]">
              actually deliver.
            </span>
          </h1>

          <p className="mt-6 max-w-md text-[1.05rem] leading-7 text-white/80">
            One workspace to run applications, match people, manage learning,
            review work, and prove outcomes.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <TrackedLink
              href="/demo"
              eventName="demo_started"
              eventProperties={{ source: "hero" }}
              className="lp-btn-leaf"
            >
              <PlayCircle className="h-[1.1rem] w-[1.1rem]" />
              Explore live demo
            </TrackedLink>
            <TrackedLink
              href={APP_REGISTER_URL}
              eventName="organization_signup_clicked"
              eventProperties={{ source: "hero" }}
              className="lp-btn-ghost group sm:min-w-[9.5rem]"
            >
              Start free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </TrackedLink>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-white/80">
            {pillars.map((pillar) => (
              <li key={pillar} className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-[var(--leaf)]" strokeWidth={2.5} />
                {pillar}
              </li>
            ))}
          </ul>
        </div>

        {/* Laptop on a plinth, with the program books stacked beside it. */}
        <div className="relative lg:pl-6">
          <Plant />
          <div className="lp-laptop relative z-10 mx-auto max-w-[640px] lg:ml-10">
            <div className="lp-laptop-bezel">
              <div className="mx-auto mb-2 h-1.5 w-1.5 rounded-full bg-white/20" aria-hidden />
              <div className="overflow-hidden rounded-md bg-white">
                <Image
                  src="/product/admin-dashboard-framed.webp"
                  alt="Pathment admin overview: active mentees, clans needing support, pending approvals, open roadblocks and completion distribution."
                  width={1408}
                  height={989}
                  priority
                  unoptimized
                  className="h-auto w-full"
                />
              </div>
            </div>
            <div
              aria-hidden
              className="h-3 w-[106%] -translate-x-[2.8%] rounded-b-2xl bg-gradient-to-b from-[#3a3f42] to-[#151819]"
            />
          </div>

          {/* Real figures from the verified proof block, floating over the scene. */}
          <div className="lp-chip lp-float absolute -left-2 top-6 z-30 hidden items-center gap-3 rounded-2xl px-4 py-3 sm:flex lg:-left-8">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--leaf)]/20 text-[var(--leaf)]">
              <MessageSquareCheck className="h-[1.1rem] w-[1.1rem]" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-lg font-bold text-white">
                {proof.metrics[1].value}
              </span>
              <span className="block text-[11px] text-white/70">{proof.metrics[1].label}</span>
            </span>
          </div>
          <div className="lp-chip lp-float-slow absolute bottom-24 left-0 z-30 hidden items-center gap-3 rounded-2xl px-4 py-3 md:flex lg:-left-10">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--leaf)]/20 text-[var(--leaf)]">
              <Clock3 className="h-[1.1rem] w-[1.1rem]" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-lg font-bold text-white">
                {proof.metrics[2].value}
              </span>
              <span className="block text-[11px] text-white/70">median time to review</span>
            </span>
          </div>

          {/* Plinth */}
          <div
            aria-hidden
            className="relative z-0 mx-auto -mt-8 h-16 w-[100%] rounded-[50%] border-t border-[#8ee8ad]/25 bg-gradient-to-b from-[#26755a] via-[#164a39] to-[#0a2e23] shadow-[0_40px_60px_-30px_rgba(0,0,0,0.9)]"
          />

          <ul
            aria-hidden
            className="absolute -bottom-3 right-0 z-20 hidden w-44 flex-col gap-1 sm:flex lg:-right-6 xl:-right-14"
          >
            {books.map((book) => (
              <li
                key={book.label}
                className={`rounded-l-md rounded-r-sm border-y border-l border-[#d9b96a]/35 bg-gradient-to-b ${book.tone} ${book.offset} px-4 py-2 [font-family:var(--font-fraunces)] text-[15px] font-semibold text-[#e7d7a6] shadow-[0_10px_20px_-10px_rgba(0,0,0,0.8)]`}
              >
                {book.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
