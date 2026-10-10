"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { APP_LOGIN_URL, APP_REGISTER_URL } from "../../lib/links";
import { Brand } from "./Brand";
import { ThemeToggle } from "./ThemeToggle";
import { TrackedLink } from "./TrackedLink";

const navItems = [
  { href: "/#outcomes", label: "Outcomes" },
  { href: "/#roles", label: "Roles" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Talk to us" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/95 px-5 backdrop-blur sm:px-8">
      <nav aria-label="Main navigation" className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-5">
        <Brand />
        <div className="hidden items-center gap-6 text-sm font-medium text-muted lg:flex">
          {navItems.map((item) => <Link key={item.href} href={item.href} className="hover:text-accent">{item.label}</Link>)}
        </div>
        <div className="hidden items-center gap-4 lg:flex">
          <ThemeToggle />
          <TrackedLink href={APP_LOGIN_URL} eventName="login_clicked" className="text-sm font-semibold text-ink hover:text-accent">Sign in</TrackedLink>
          <TrackedLink href={APP_REGISTER_URL} eventName="organization_signup_clicked" className="rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">Create organization</TrackedLink>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button ref={toggleRef} type="button" aria-expanded={open} aria-controls={menuId} aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-ink">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
      {open ? (
        <div id={menuId} className="fixed inset-x-0 top-18 z-40 min-h-[calc(100dvh-4.5rem)] border-t border-line bg-surface p-5 lg:hidden">
          <div className="mx-auto max-w-xl space-y-1">
            {navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 text-base font-medium text-ink hover:bg-soft">{item.label}</Link>)}
            <div className="my-4 border-t border-line" />
            <TrackedLink href={APP_LOGIN_URL} eventName="login_clicked" onClick={() => setOpen(false)} className="flex w-full justify-center rounded-xl border border-line px-4 py-3 text-sm font-semibold text-ink">Sign in</TrackedLink>
            <TrackedLink href={APP_REGISTER_URL} eventName="organization_signup_clicked" onClick={() => setOpen(false)} className="mt-3 flex w-full justify-center rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white">Create your organization</TrackedLink>
          </div>
        </div>
      ) : null}
    </header>
  );
}
