"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { APP_LOGIN_URL, APP_REGISTER_URL } from "../../lib/links";
import { Brand } from "./Brand";
import { ThemeToggle } from "./ThemeToggle";
import { TrackedLink } from "./TrackedLink";

const navItems = [
  { href: "/#platform", label: "Platform" },
  { href: "/demo", label: "Demo" },
  { href: "/pricing", label: "Pricing" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  function navigateFromMenu(event: MouseEvent<HTMLAnchorElement>, href: string) {
    closeMenu();

    if (href.startsWith("/#") && window.location.pathname === "/") {
      event.preventDefault();
      const sectionId = href.slice(2);
      window.history.pushState(null, "", `#${sectionId}`);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          document.getElementById(sectionId)?.scrollIntoView();
        });
      });
    }
  }

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
          <Link href="/contact" className="text-sm font-semibold text-muted hover:text-accent">Talk to us</Link>
          <TrackedLink href={APP_LOGIN_URL} eventName="login_clicked" className="text-sm font-semibold text-ink hover:text-accent">Sign in</TrackedLink>
          <TrackedLink href="/demo" eventName="demo_started" eventProperties={{ source: "header" }} className="rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">Explore product</TrackedLink>
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
            {navItems.map((item) => <Link key={item.href} href={item.href} onClick={(event) => navigateFromMenu(event, item.href)} className="block rounded-xl px-3 py-3 text-base font-medium text-ink hover:bg-soft">{item.label}</Link>)}
            <div className="my-4 border-t border-line" />
            <TrackedLink href="/demo" eventName="demo_started" eventProperties={{ source: "mobile_header" }} onClick={() => closeMenu()} className="flex w-full justify-center rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white">Explore product</TrackedLink>
            <TrackedLink href={APP_LOGIN_URL} eventName="login_clicked" onClick={() => closeMenu()} className="flex w-full justify-center rounded-xl border border-line px-4 py-3 text-sm font-semibold text-ink">Sign in</TrackedLink>
            <TrackedLink href={APP_REGISTER_URL} eventName="organization_signup_clicked" onClick={() => closeMenu()} className="mt-3 flex w-full justify-center rounded-xl border border-line px-4 py-3 text-sm font-semibold text-ink">Create your organization</TrackedLink>
          </div>
        </div>
      ) : null}
    </header>
  );
}
