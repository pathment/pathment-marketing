"use client";

import Image from "next/image";
import Link from "next/link";
import type { MouseEvent } from "react";

export function Brand({
  compact = false,
  href = "/",
  inverse = false,
  scrollToTop = false,
}: {
  compact?: boolean;
  href?: string;
  inverse?: boolean;
  scrollToTop?: boolean;
}) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!scrollToTop || href !== "/" || window.location.pathname !== "/") return;

    event.preventDefault();
    window.history.replaceState(null, "", "/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Link
      href={href}
      aria-label="Pathment home"
      onClick={handleClick}
      className={`inline-flex items-center gap-2.5 font-display text-xl font-semibold tracking-tight ${inverse ? "text-white" : "text-ink"}`}
    >
      <Image
        src="/logo-mark.svg"
        alt=""
        width={compact ? 30 : 34}
        height={compact ? 30 : 34}
        priority
      />
      Pathment
    </Link>
  );
}
