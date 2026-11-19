export type HttpMethod = "GET" | "POST" | "DELETE";

const methodStyles: Record<HttpMethod, string> = {
  GET: "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/25",
  POST: "bg-brand-50 text-brand-700 ring-brand-600/20 dark:bg-brand-400/10 dark:text-brand-300 dark:ring-brand-400/25",
  DELETE: "bg-rose-50 text-rose-700 ring-rose-600/20 dark:bg-rose-400/10 dark:text-rose-300 dark:ring-rose-400/25",
};

export function MethodBadge({ method, size = "md" }: { method: HttpMethod; size?: "sm" | "md" }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-md font-mono font-semibold ring-1 ring-inset ${
        size === "sm" ? "px-1.5 py-px text-[9.5px] tracking-wide" : "px-2 py-0.5 text-[11.5px] tracking-wide"
      } ${methodStyles[method]}`}
    >
      {method}
    </span>
  );
}

/** Method + path, e.g. GET /intakes/{intakeId}. */
export function Endpoint({ method, path }: { method: HttpMethod; path: string }) {
  return (
    <div className="flex max-w-full items-center gap-3 overflow-x-auto rounded-xl border border-line bg-surface px-3.5 py-2.5">
      <MethodBadge method={method} />
      <code className="!border-0 !bg-transparent !p-0 font-mono text-[0.9rem] whitespace-nowrap text-[var(--docs-heading)]">
        {path.split(/(\{[^}]+\})/g).map((part, index) =>
          part.startsWith("{") ? (
            <span key={index} className="text-[var(--docs-link)]">
              {part}
            </span>
          ) : (
            part
          ),
        )}
      </code>
    </div>
  );
}
