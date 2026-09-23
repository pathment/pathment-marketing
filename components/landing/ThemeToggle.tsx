"use client";
import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";
export function ThemeToggle() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const followSystem = () => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem("pathment-theme");
      } catch {}
      if (saved !== "light" && saved !== "dark")
        document.documentElement.dataset.theme = media.matches
          ? "dark"
          : "light";
    };
    media.addEventListener("change", followSystem);
    return () => media.removeEventListener("change", followSystem);
  }, []);
  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      title="Switch light or dark theme"
      className="theme-toggle inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors hover:bg-soft"
      onClick={() => {
        const next =
          document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        document.documentElement.dataset.theme = next;
        try {
          localStorage.setItem("pathment-theme", next);
        } catch {}
      }}
    >
      <Sun className="theme-sun" size={17} />
      <Moon className="theme-moon" size={17} />
    </button>
  );
}
