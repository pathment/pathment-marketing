"use client";

import { FaGooglePlay } from "react-icons/fa";
import { track } from "../../lib/analytics";
import { ANDROID_APP_URL } from "../../lib/links";

type Props = {
  /** Where on the page the click came from, for the analytics event. */
  source: string;
  /** `dark` sits on light surfaces (and on the mint card); `light` on the deep band. */
  tone?: "dark" | "light";
  className?: string;
};

/**
 * Store-badge styled link to the public Google Play listing. Built in our own
 * type rather than the bitmap badge so it stays crisp and matches the site.
 */
export function GooglePlayButton({ source, tone = "dark", className = "" }: Props) {
  const toneClasses =
    tone === "dark"
      ? "bg-[#04110f] text-white hover:bg-black"
      : "bg-white text-[#04110f] hover:bg-band-ink";

  return (
    <a
      href={ANDROID_APP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Get Pathment on Google Play"
      onClick={() => track("android_app_clicked", { source })}
      className={`group inline-flex items-center gap-3 rounded-xl px-4 py-2.5 shadow-[0_14px_30px_-18px_rgba(0,0,0,0.8)] transition-all hover:-translate-y-0.5 ${toneClasses} ${className}`}
    >
      <FaGooglePlay className="h-5 w-5 shrink-0" aria-hidden />
      <span className="flex flex-col text-left leading-none">
        <span className="text-[10px] font-medium uppercase tracking-[0.12em] opacity-70">
          Get it on
        </span>
        <span className="mt-1 font-display text-[17px] font-semibold tracking-tight">
          Google Play
        </span>
      </span>
    </a>
  );
}
