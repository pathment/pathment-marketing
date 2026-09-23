"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

import { workspaceSlug, workspaceLoginUrl } from "../../lib/workspace";

export function WorkspaceSignIn() {
  const [open, setOpen] = useState(false);
  const [workspace, setWorkspace] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && open) {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const slug = workspaceSlug(workspace);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!slug) return;
    const destination = workspaceLoginUrl(workspace);
    if (destination) window.location.href = destination;
  }

  return (
    <div ref={containerRef} className="relative hidden sm:block">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        ref={triggerRef}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="text-sm font-medium text-muted transition-colors hover:text-accent"
      >
        Sign In
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Sign in to your workspace"
          className="absolute right-0 top-full z-50 mt-3 w-80 rounded-xl border border-line bg-surface p-4 shadow-lg-soft"
        >
          <p className="mb-1 text-sm font-semibold text-ink">
            Sign in to your workspace
          </p>
          <p className="mb-3 text-xs text-muted">
            Enter your workspace name to continue to your team&apos;s sign-in
            page.
          </p>
          <form onSubmit={handleSubmit} className="space-y-2.5">
            <div className="flex items-stretch overflow-hidden rounded-xl border border-line transition-all focus-within:border-brand-300 focus-within:ring-4 focus-within:ring-brand-500/10">
              <input
                ref={inputRef}
                type="text"
                value={workspace}
                onChange={(event) => setWorkspace(event.target.value)}
                aria-label="Workspace name or URL"
                placeholder="your-workspace"
                autoComplete="off"
                spellCheck={false}
                className="min-w-0 flex-1 bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none"
              />
              <span className="flex items-center bg-canvas px-3 text-xs font-medium text-muted">
                workspace
              </span>
            </div>
            <button
              type="submit"
              disabled={!slug}
              className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-700 enabled:hover:-translate-y-0.5 enabled:hover:shadow-md-soft disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          </form>
          {workspace.trim() && !slug ? (
            <p role="status" className="mt-2 text-xs text-red-700">
              Enter a valid workspace name or Pathment workspace URL.
            </p>
          ) : null}
          <p className="mt-3 text-xs text-muted">
            Don&apos;t have a workspace yet?{" "}
            <a
              href="/pricing"
              onClick={() => setOpen(false)}
              className="font-medium text-ink underline"
            >
              Browse plans
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
