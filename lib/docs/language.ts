"use client";

import { useCallback, useSyncExternalStore } from "react";

export type CodeLanguage = "curl" | "node" | "python";

export const CODE_LANGUAGES: { id: CodeLanguage; label: string }[] = [
  { id: "curl", label: "cURL" },
  { id: "node", label: "Node.js" },
  { id: "python", label: "Python" },
];

const STORAGE_KEY = "pathment-docs-language";
const DEFAULT_LANGUAGE: CodeLanguage = "curl";
const listeners = new Set<() => void>();
let current: CodeLanguage | null = null;

function isLanguage(value: unknown): value is CodeLanguage {
  return value === "curl" || value === "node" || value === "python";
}

function read(): CodeLanguage {
  if (current) return current;
  let saved: string | null = null;
  try {
    saved = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    // Storage can be blocked (private mode, strict settings). Fall back quietly.
  }
  current = isLanguage(saved) ? saved : DEFAULT_LANGUAGE;
  return current;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  function onStorage(event: StorageEvent) {
    if (event.key !== STORAGE_KEY) return;
    current = isLanguage(event.newValue) ? event.newValue : DEFAULT_LANGUAGE;
    listener();
  }
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/**
 * The reader's preferred code language, shared by every code block on the
 * site and remembered between visits. The server always renders cURL; the
 * saved choice takes over right after hydration.
 */
export function useCodeLanguage(): [CodeLanguage, (next: CodeLanguage) => void] {
  const language = useSyncExternalStore(subscribe, read, () => DEFAULT_LANGUAGE);
  const setLanguage = useCallback((next: CodeLanguage) => {
    current = next;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Not fatal: the choice still applies for this visit.
    }
    listeners.forEach((listener) => listener());
  }, []);
  return [language, setLanguage];
}
