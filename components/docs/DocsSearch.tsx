"use client";

import { CornerDownLeft, FileText, Hash, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { searchDocs, searchIndex, suggestedSearches, type SearchEntry } from "../../lib/docs/search";

const noopSubscribe = () => () => {};

function useIsMac() {
  return useSyncExternalStore(
    noopSubscribe,
    () => /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent),
    () => false,
  );
}

const suggestions: SearchEntry[] = suggestedSearches
  .map((href) => searchIndex.find((entry) => entry.href === href))
  .filter((entry): entry is SearchEntry => Boolean(entry));

/** The search trigger in the top bar plus the ⌘K / Ctrl+K dialog. */
export function DocsSearch() {
  const [open, setOpen] = useState(false);
  const isMac = useIsMac();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      } else if (event.key === "/" && !open) {
        const target = event.target as HTMLElement | null;
        const typing = target?.closest("input, textarea, [contenteditable='true']");
        if (!typing) {
          event.preventDefault();
          setOpen(true);
        }
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search documentation"
        aria-haspopup="dialog"
        className="hidden h-9 w-full max-w-[17rem] items-center gap-2 rounded-lg border border-line bg-canvas px-3 text-left text-sm text-muted transition-colors hover:border-brand-400/50 hover:text-ink md:flex"
      >
        <Search className="h-4 w-4 shrink-0" aria-hidden />
        <span className="flex-1 truncate">Search docs</span>
        <kbd className="rounded border border-line bg-surface px-1.5 py-px font-mono text-[10.5px] text-muted">
          {isMac ? "⌘K" : "Ctrl K"}
        </kbd>
      </button>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search documentation"
        aria-haspopup="dialog"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-ink md:hidden"
      >
        <Search className="h-[1.05rem] w-[1.05rem]" aria-hidden />
      </button>
      {/* Rendered into <body>: the top bar's backdrop blur makes it the containing
          block for fixed children, which would clip the overlay to the bar. */}
      {open ? createPortal(<SearchDialog onClose={() => setOpen(false)} />, document.body) : null}
    </>
  );
}

function SearchDialog({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const returnFocus = useRef<Element | null>(null);
  const listId = useId();

  const results = useMemo(() => (query.trim() ? searchDocs(query) : suggestions), [query]);
  const activeIndex = Math.min(active, Math.max(results.length - 1, 0));

  useEffect(() => {
    returnFocus.current = document.activeElement;
    inputRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      if (returnFocus.current instanceof HTMLElement) returnFocus.current.focus();
    };
  }, []);

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const go = useCallback(
    (entry: SearchEntry) => {
      onClose();
      router.push(entry.href);
    },
    [onClose, router],
  );

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((activeIndex + 1) % Math.max(results.length, 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((activeIndex - 1 + results.length) % Math.max(results.length, 1));
    } else if (event.key === "Enter" && results[activeIndex]) {
      event.preventDefault();
      go(results[activeIndex]);
    } else if (event.key === "Tab") {
      // Keep focus inside the dialog: the input is the only stop.
      event.preventDefault();
    }
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[10vh] sm:pt-[14vh]" onKeyDown={onKeyDown}>
      <div className="absolute inset-0 bg-[#04110f]/45 backdrop-blur-[2px] dark:bg-black/70" onClick={onClose} aria-hidden />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search documentation"
        className="relative flex max-h-[75vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_40px_100px_-40px_rgba(4,17,15,0.55)]"
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search className="h-[1.1rem] w-[1.1rem] shrink-0 text-muted" aria-hidden />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            placeholder="Search guides and API reference"
            aria-label="Search"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={results[activeIndex] ? `${listId}-${activeIndex}` : undefined}
            autoComplete="off"
            spellCheck={false}
            className="h-14 min-w-0 flex-1 bg-transparent text-[0.975rem] text-ink outline-none placeholder:text-muted [&::-webkit-search-cancel-button]:hidden"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted hover:bg-soft hover:text-ink"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <div className="docs-scroll min-h-0 overflow-y-auto p-2">
          {!query.trim() ? (
            <p className="px-3 pt-2 pb-1.5 font-mono text-[10.5px] tracking-[0.16em] text-muted uppercase">
              Popular pages
            </p>
          ) : null}
          {results.length ? (
            <ul ref={listRef} id={listId} role="listbox" aria-label="Results">
              {results.map((entry, index) => {
                const selected = index === activeIndex;
                const Icon = entry.kind === "page" ? FileText : Hash;
                return (
                  <li
                    key={entry.href}
                    id={`${listId}-${index}`}
                    role="option"
                    aria-selected={selected}
                    data-index={index}
                    onMouseMove={() => setActive(index)}
                    onClick={() => go(entry)}
                    className={`flex cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5 ${
                      selected ? "bg-brand-50 dark:bg-brand-400/10" : ""
                    }`}
                  >
                    <Icon
                      className={`mt-0.5 h-4 w-4 shrink-0 ${selected ? "text-accent" : "text-muted"}`}
                      aria-hidden
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-ink">{entry.title}</span>
                      <span className="mt-0.5 block truncate text-xs text-muted">
                        {entry.context}
                        {entry.kind === "page" ? ` · ${entry.excerpt}` : ""}
                      </span>
                    </span>
                    {selected ? (
                      <CornerDownLeft className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted" aria-hidden />
                    ) : null}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="px-3 py-10 text-center text-sm text-muted">
              Nothing matches &ldquo;{query}&rdquo;. Try a field name, an error code or an endpoint.
            </p>
          )}
        </div>

        <div className="hidden items-center gap-4 border-t border-line px-4 py-2.5 text-[11px] text-muted sm:flex">
          <span>
            <kbd className="font-mono">↑</kbd> <kbd className="font-mono">↓</kbd> to move
          </span>
          <span>
            <kbd className="font-mono">Enter</kbd> to open
          </span>
          <span>
            <kbd className="font-mono">Esc</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
}
