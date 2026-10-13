"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { APP_REGISTER_URL } from "../../lib/links";
import { heroRotation, heroStats } from "./site-content";
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
      className="relative inline-grid align-bottom"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Invisible sizer keeps the baseline and width stable across words. */}
      <span aria-hidden className="invisible col-start-1 row-start-1 pr-1">
        {widestWord}
      </span>
      <span
        key={index}
        className="word-in col-start-1 row-start-1 text-left font-semibold text-accent"
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
  return (
    <section className="hero-section relative overflow-hidden">
      <div className="shell pt-16 sm:pt-20 lg:pt-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
          <div className="max-w-3xl">
          <p className="label">Mentorship program operations</p>

          <h1 className="display-xl mt-7">
            Run mentorship programs that actually{" "}
            <span className="accent-serif">finish.</span>
          </h1>

          <p
            className="mt-6 flex flex-wrap items-baseline gap-x-2 font-display text-lg font-medium tracking-tight text-muted sm:text-xl"
            aria-hidden
          >
            Built for <RotatingAudience />
          </p>

          <p className="lede mt-5 max-w-2xl">
            One workspace from the application form to the certificate.
            Admissions, roadmaps, mentor reviews, roadblocks, recognition and
            reporting stay on the same record, so nobody has to reconstruct
            what happened at the end of term.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <TrackedLink
              href="/demo"
              eventName="demo_started"
              eventProperties={{ source: "hero" }}
              className="btn btn-lg btn-solid"
            >
              <Play className="h-4 w-4" />
              Explore the live demo
            </TrackedLink>
            <TrackedLink
              href={APP_REGISTER_URL}
              eventName="organization_signup_clicked"
              eventProperties={{ source: "hero" }}
              className="btn btn-lg btn-outline"
            >
              <Building2 className="h-4 w-4" />
              Create an organization
            </TrackedLink>
            <Link
              href="/pricing"
              className="group inline-flex items-center gap-1.5 px-2 py-3 text-sm font-semibold text-muted hover:text-accent sm:ml-2"
            >
              See plans
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <p className="mt-5 text-xs leading-5 text-muted">
            No account needed for the demo. It uses fictional data and never
            touches a live organization.
          </p>
          </div>

          {/* Facts about the product, not about traction. Bottom-aligned so the
              column anchors the headline instead of floating beside it. */}
          <dl className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3 lg:w-64 lg:grid-cols-1">
            {heroStats.map((stat) => (
              <div key={stat.label} className="bg-surface px-5 py-4">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="numeric font-display text-2xl font-semibold tracking-tight text-ink">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-muted">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Full-bleed product screen. Cropped at the fold so it reads as a real
          application continuing below, rather than a floating marketing tile. */}
      <div className="shell-wide mt-14 lg:mt-20">
        <div className="screen rounded-b-none border-b-0">
          <div className="screen-bar">
            <div className="screen-dots">
              <span />
              <span />
              <span />
            </div>
            <span className="truncate rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-[10px] text-muted">
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
      </div>
    </section>
  );
}
