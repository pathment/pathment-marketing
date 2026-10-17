"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { heroActivity, heroRotation, proof } from "./site-content";
import { TrackedLink } from "./TrackedLink";

/** Longest word reserves the inline width so the line never reflows mid-cycle. */
const widestWord = heroRotation.reduce((a, b) => (b.length > a.length ? b : a));

function RotatingAudience() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    const timer = setInterval(
      () => setIndex((value) => (value + 1) % heroRotation.length),
      2600,
    );
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <span
      className="relative inline-grid text-left align-baseline"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <span aria-hidden className="invisible col-start-1 row-start-1">
        {widestWord}
      </span>
      <span
        key={index}
        className="word-in col-start-1 row-start-1 text-[#8fe0ca]"
      >
        {heroRotation[index]}
      </span>
      {/* Screen readers get the full list once instead of a flickering word. */}
      <span className="sr-only">
        {heroRotation.join(", ")}, and other structured programs
      </span>
    </span>
  );
}

export function Hero() {
  // The two figures the side card shows. Pulled from the same verified block
  // the proof band uses, so the hero can never quote a number the rest of the
  // page has moved on from.
  const headline = proof.metrics[1];
  const speed = proof.metrics[2];

  return (
    <section className="hero-cinema">
      <div className="hero-cinema-light" aria-hidden />
      <div className="hero-grid" aria-hidden />
      <div className="hero-grain" aria-hidden />

      <div className="shell pb-10 pt-20 text-center sm:pt-24 lg:pb-12 lg:pt-28">
        <div className="hero-rise mx-auto max-w-4xl">
          <p className="hero-kicker">
            Built for <RotatingAudience />
          </p>

          <h1 className="hero-title mt-7">
            Run mentorship programs that{" "}
            <span className="accent-serif">actually finish.</span>
          </h1>

          <p className="hero-sub mx-auto mt-6 max-w-xl">
            One workspace from the application form to the certificate.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <TrackedLink
              href="/demo"
              eventName="demo_started"
              eventProperties={{ source: "hero" }}
              className="btn btn-lg snake"
            >
              <span className="snake-label">
                <Play className="h-4 w-4" />
                Explore the live demo
              </span>
            </TrackedLink>
            <Link
              href="/pricing"
              className="group inline-flex items-center gap-2 px-3 py-3 text-sm font-semibold text-white/70 transition-colors hover:text-white"
            >
              See plans
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* A real credential beats a generic reassurance line, and it does
              not repeat the figures the proof band shows next. */}
          <p className="mt-7 text-sm text-white/55">
            Running the Dev Weekends engineering fellowship since June 2026.
          </p>
          <p className="hero-note mt-2">
            No account needed. The demo uses fictional data and never touches a
            live organization.
          </p>
        </div>
      </div>

      {/* Three planes, bleeding past the section edge so the product reads as
          continuing below the fold rather than ending in a tidy box. */}
      <div className="hero-stage">
        <div className="hero-plane-main hero-rise">
          <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.04] px-4 py-3">
            <div className="flex gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            </div>
            <span className="truncate rounded-md bg-black/30 px-2.5 py-1 font-mono text-[10px] text-white/45">
              app.pathment.me/w/pathment-demo/overview
            </span>
          </div>
          <Image
            src="/product/admin-dashboard.webp"
            alt="The Pathment admin overview: active mentees, clans needing support, pending approvals, open roadblocks, completion distribution and ranked clan priorities."
            width={1425}
            height={989}
            priority
            unoptimized
            className="h-auto w-full"
          />
        </div>

        {/* Left plane: the product's core loop with faces on it. One task
            moving between three people says more in a glance than a shrunken
            second screenshot, and it puts people on a page that otherwise
            shows nothing but charts. */}
        <div className="hero-plane-side hero-plane-left">
          <div className="flex items-center gap-2.5 border-b border-white/10 px-4 py-3">
            <span className="hero-pulse" aria-hidden />
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#8fe0ca]">
              One task, three people
            </span>
          </div>
          <ul className="divide-y divide-white/[0.07]">
            {heroActivity.map((entry) => (
              <li key={entry.name} className="flex items-start gap-3 px-4 py-3">
                <Image
                  src={entry.avatar}
                  alt=""
                  width={72}
                  height={72}
                  className="h-8 w-8 shrink-0 rounded-full object-cover ring-1 ring-white/15"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="truncate text-[12px] font-semibold text-white">
                      {entry.name}
                    </span>
                    <span className="shrink-0 rounded-full bg-white/10 px-1.5 py-px text-[8px] font-semibold uppercase tracking-[0.1em] text-white/60">
                      {entry.role}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] leading-[1.45] text-white/55">
                    {entry.action}
                  </p>
                </div>
                <span className="numeric shrink-0 pt-0.5 text-[10px] text-white/35">
                  {entry.time}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right plane: live numbers, not decoration. */}
        <div className="hero-plane-side hero-plane-right">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#8fe0ca]">
            Last 4 months
          </p>
          <p className="numeric mt-3 font-display text-3xl font-semibold tracking-tight text-white">
            {headline.value}
          </p>
          <p className="mt-1 text-xs leading-5 text-white/55">
            {headline.label}
          </p>
          <div className="mt-4 border-t border-white/12 pt-3">
            <p className="numeric font-display text-xl font-semibold tracking-tight text-white">
              {speed.value}
            </p>
            <p className="mt-0.5 text-xs leading-5 text-white/55">
              {speed.label}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
