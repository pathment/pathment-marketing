"use client";

import { FaGooglePlay } from "react-icons/fa";
import { track } from "../../lib/analytics";
import { ANDROID_APP_URL } from "../../lib/links";

type Props = {
  /** Where on the page the click came from, for the analytics event. */
  source: string;
  /**
   * `badge` is the familiar black store badge with the four-colour mark.
   * `dark` sits on light surfaces; `light` on dark ones.
   */
  tone?: "badge" | "dark" | "light";
  className?: string;
};

/** The four-colour Google Play mark, drawn inline so it stays crisp. */
function PlayMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 26" aria-hidden className={className}>
      <path d="M1.2 0.6 13.5 13 1.2 25.4C.7 25.1.4 24.5.4 23.8V2.2C.4 1.5.7.9 1.2.6Z" fill="#00d7fe" />
      <path d="M17.6 8.9 13.5 13 1.2.6c.5-.3 1.2-.3 1.9.1l14.5 8.2Z" fill="#00f076" />
      <path d="M17.6 17.1 3.1 25.3c-.7.4-1.4.4-1.9.1L13.5 13l4.1 4.1Z" fill="#ff3a44" />
      <path d="M22.4 11.6c1.1.6 1.1 2.2 0 2.8l-4.8 2.7-4.1-4.1 4.1-4.1 4.8 2.7Z" fill="#ffd400" />
    </svg>
  );
}

/** Store-badge styled link to the public Google Play listing. */
export function GooglePlayButton({ source, tone = "badge", className = "" }: Props) {
  const toneClasses =
    tone === "badge"
      ? "border border-white/35 bg-black text-white hover:border-white/70"
      : tone === "dark"
        ? "bg-[#04110f] text-white hover:bg-black"
        : "bg-white text-[#04110f] hover:bg-band-ink";

  return (
    <a
      href={ANDROID_APP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Get Pathment on Google Play"
      onClick={() => track("android_app_clicked", { source })}
      className={`group inline-flex items-center gap-3 rounded-xl px-4 py-2 shadow-[0_14px_30px_-18px_rgba(0,0,0,0.8)] transition-all hover:-translate-y-0.5 ${toneClasses} ${className}`}
    >
      {tone === "badge" ? (
        <PlayMark className="h-7 w-[1.6rem] shrink-0" />
      ) : (
        <FaGooglePlay className="h-5 w-5 shrink-0" aria-hidden />
      )}
      <span className="flex flex-col text-left leading-none">
        <span className="text-[10px] font-medium uppercase tracking-[0.08em] opacity-80">
          Get it on
        </span>
        <span className="mt-1 text-[19px] font-medium tracking-tight">Google Play</span>
      </span>
    </a>
  );
}
