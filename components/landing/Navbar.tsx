"use client";

import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Brand } from "./Brand";
import { WorkspaceSignIn } from "./WorkspaceSignIn";
import { navItems } from "./content";

import { workspaceSlug, workspaceLoginUrl } from "../../lib/workspace";

function MobileSignIn({ onNavigate }: { onNavigate: () => void }) {
  const [workspace, setWorkspace] = useState("");
  const slug = workspaceSlug(workspace);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!slug) return;
    onNavigate();
    const destination = workspaceLoginUrl(workspace);
    if (destination) window.location.href = destination;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <p className="text-xs font-semibold text-ink">
        Sign in to your workspace
      </p>
      <div className="flex items-stretch overflow-hidden rounded-xl border border-line bg-surface">
        <input
          type="text"
          value={workspace}
          onChange={(event) => setWorkspace(event.target.value)}
          aria-label="Workspace name or URL"
          placeholder="your-workspace"
          autoComplete="off"
          spellCheck={false}
          className="min-w-0 flex-1 px-3 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none"
        />
        <span className="flex items-center bg-canvas px-2.5 text-[11px] font-medium text-muted">
          workspace
        </span>
      </div>
      {workspace.trim() && !slug ? (
        <p role="status" className="text-xs text-red-700">
          Enter a valid workspace name or Pathment workspace URL.
        </p>
      ) : null}
      <button
        type="submit"
        disabled={!slug}
        className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        Continue <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/95 px-5">
      <nav
        aria-label="Main navigation"
        className="relative z-50 mx-auto flex h-20 max-w-7xl items-center justify-between gap-6"
      >
        <div className="min-w-0 lg:justify-self-start">
          <Brand />
        </div>

        <div className="hidden items-center justify-center gap-6 text-sm font-medium text-muted lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href.startsWith("#") ? `/${item.href}` : item.href}
              className="whitespace-nowrap transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center justify-end gap-3 sm:gap-4 lg:flex">
          <ThemeToggle />
          <WorkspaceSignIn />
          <Link
            href="/#request-access"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-md-soft"
          >
            Request Access
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Link
            href="/#request-access"
            onClick={closeMenu}
            className="hidden min-[440px]:inline-flex items-center justify-center whitespace-nowrap rounded-xl bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm-soft sm:px-4 sm:py-2 sm:text-sm"
          >
            Request Access
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            ref={toggleRef}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors hover:bg-canvas"
          >
            {menuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div ref={menuRef} id={menuId} className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Close menu overlay"
            className="absolute inset-0 bg-brand-950/20 backdrop-blur-[2px]"
            onClick={closeMenu}
          />
          <div className="absolute top-[4.75rem] right-3 left-3 max-h-[calc(100dvh-5.5rem)] overflow-y-auto rounded-2xl border border-line bg-surface p-4 shadow-lg-soft sm:top-[5rem] sm:right-4 sm:left-4 sm:p-5">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href.startsWith("#") ? `/${item.href}` : item.href}
                  onClick={closeMenu}
                  className="flex items-center rounded-xl px-3 py-3 text-sm font-medium text-ink transition-colors hover:bg-canvas"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="my-4 border-t border-line" />

            <MobileSignIn onNavigate={closeMenu} />

            <Link
              href="/#request-access"
              onClick={closeMenu}
              className="mt-4 flex w-full items-center justify-center rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Request Access
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
