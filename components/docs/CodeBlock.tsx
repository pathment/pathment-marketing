"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { tokenize, type HighlightLanguage } from "../../lib/docs/highlight";
import { CODE_LANGUAGES, useCodeLanguage, type CodeLanguage } from "../../lib/docs/language";

export type CodeSamples = Record<CodeLanguage, string>;

const SAMPLE_HIGHLIGHT: Record<CodeLanguage, HighlightLanguage> = {
  curl: "bash",
  node: "javascript",
  python: "python",
};

export function HighlightedCode({ code, language }: { code: string; language: HighlightLanguage }) {
  return (
    <pre tabIndex={0} aria-label="Code sample">
      <code>
        {tokenize(code, language).map((token, index) =>
          token.kind ? (
            <span key={index} className={`tok-${token.kind}`}>
              {token.text}
            </span>
          ) : (
            token.text
          ),
        )}
      </code>
    </pre>
  );
}

export function CopyButton({ text, label = "Copy code" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be unavailable (insecure context, denied permission).
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : label}
      className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium text-[var(--docs-code-muted)] transition-colors hover:bg-white/5 hover:text-white"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-[#5fd9bd]" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}

/**
 * A code sample. Pass `samples` for a request shown in cURL, Node.js and
 * Python (the chosen language is shared site-wide), or `code` + `language`
 * for a single snippet such as JSON.
 */
export function CodeBlock(
  props:
    | { samples: CodeSamples; title?: string; code?: never; language?: never }
    | { code: string; language: HighlightLanguage; title?: string; samples?: never },
) {
  if (props.samples) return <TabbedCode samples={props.samples} title={props.title} />;
  return (
    <div className="docs-code">
      <div className="docs-code-bar">
        <span className="truncate font-mono">{props.title ?? props.language}</span>
        <CopyButton text={props.code} />
      </div>
      <HighlightedCode code={props.code} language={props.language} />
    </div>
  );
}

function TabbedCode({ samples, title }: { samples: CodeSamples; title?: string }) {
  const [language, setLanguage] = useCodeLanguage();
  const baseId = useId();
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % CODE_LANGUAGES.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + CODE_LANGUAGES.length) % CODE_LANGUAGES.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = CODE_LANGUAGES.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    const next = CODE_LANGUAGES[nextIndex].id;
    setLanguage(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className="docs-code">
      <div className="docs-code-bar !pl-1">
        <div role="tablist" aria-label={title ? `${title}: language` : "Code language"} className="flex min-w-0 items-center overflow-x-auto">
          {title ? (
            <span className="hidden px-2.5 font-mono text-xs sm:inline">{title}</span>
          ) : null}
          {CODE_LANGUAGES.map((option, index) => {
            const selected = option.id === language;
            return (
              <button
                key={option.id}
                ref={(node) => {
                  tabRefs.current[option.id] = node;
                }}
                type="button"
                role="tab"
                id={`${baseId}-tab-${option.id}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setLanguage(option.id)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className="docs-code-tab"
              >
                {option.label}
              </button>
            );
          })}
        </div>
        <CopyButton text={samples[language]} />
      </div>
      <div role="tabpanel" id={`${baseId}-panel`} aria-labelledby={`${baseId}-tab-${language}`}>
        <HighlightedCode code={samples[language]} language={SAMPLE_HIGHLIGHT[language]} />
      </div>
    </div>
  );
}

/** A status line plus a JSON body, for example responses and error bodies. */
export function ResponseBlock({
  status,
  body,
  title = "Response",
}: {
  status: number;
  body: string;
  title?: string;
}) {
  const ok = status < 400;
  const statusText: Record<number, string> = {
    200: "OK",
    202: "Accepted",
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    409: "Conflict",
    429: "Too Many Requests",
    500: "Internal Server Error",
  };
  return (
    <div className="docs-code">
      <div className="docs-code-bar">
        <span className="flex min-w-0 items-center gap-2.5">
          <span className="truncate">{title}</span>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[11px] font-medium ${
              ok ? "bg-emerald-400/10 text-emerald-300" : "bg-rose-400/10 text-rose-300"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${ok ? "bg-emerald-300" : "bg-rose-300"}`} aria-hidden />
            {status} {statusText[status] ?? ""}
          </span>
        </span>
        <CopyButton text={body} label="Copy response" />
      </div>
      <HighlightedCode code={body} language="json" />
    </div>
  );
}

/** Stacks request and response blocks with even spacing. */
export function CodeStack({ children }: { children: ReactNode }) {
  return <div className="space-y-4">{children}</div>;
}
