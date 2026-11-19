import type { ReactNode } from "react";

export interface Param {
  name: string;
  type: string;
  required?: boolean;
  /** Shown after the type, e.g. "default 50". */
  meta?: string;
  description: ReactNode;
}

/**
 * Parameters or object fields as a stacked list. A list rather than a wide
 * table, so long descriptions stay readable and nothing scrolls sideways on a
 * phone.
 */
export function ParamTable({
  title,
  params,
  kind = "params",
}: {
  title?: string;
  params: Param[];
  /** "attributes" describes fields you get back, so required/optional labels are hidden. */
  kind?: "params" | "attributes";
}) {
  return (
    <div>
      {title ? (
        <p className="mb-1 border-b border-line pb-2.5 text-[0.8rem] font-semibold tracking-wide text-[var(--docs-heading)] uppercase">
          {title}
        </p>
      ) : null}
      <ul className="m-0 list-none p-0">
        {params.map((param) => (
          <li key={param.name} className="!mt-0 max-w-none border-b border-line py-4 last:border-b-0">
            <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
              <code className="!border-0 !bg-transparent !p-0 font-mono text-[0.875rem] font-semibold text-[var(--docs-heading)] [overflow-wrap:anywhere]">
                {param.name}
              </code>
              <span className="font-mono text-xs text-muted">{param.type}</span>
              {kind === "attributes" ? null : param.required ? (
                <span className="rounded bg-amber-100 px-1.5 py-px text-[10.5px] font-semibold tracking-wide text-amber-800 uppercase dark:bg-amber-400/10 dark:text-amber-300">
                  Required
                </span>
              ) : (
                <span className="text-[11px] text-muted">optional</span>
              )}
              {param.meta ? <span className="text-xs text-muted">· {param.meta}</span> : null}
            </div>
            <div className="mt-1.5 text-[0.925rem] leading-7 text-[var(--docs-body)] [&_code]:text-[0.8rem] [&>p+p]:mt-2">
              {param.description}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
