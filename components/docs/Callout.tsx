import { AlertTriangle, Info, Lightbulb } from "lucide-react";
import type { ReactNode } from "react";

const styles = {
  note: {
    icon: Info,
    label: "Note",
    box: "border-sky-200 bg-sky-50/70 dark:border-sky-400/20 dark:bg-sky-400/[0.06]",
    iconClass: "text-sky-600 dark:text-sky-300",
  },
  tip: {
    icon: Lightbulb,
    label: "Tip",
    box: "border-brand-200 bg-brand-50/80 dark:border-brand-400/25 dark:bg-brand-400/[0.07]",
    iconClass: "text-brand-600 dark:text-brand-300",
  },
  warning: {
    icon: AlertTriangle,
    label: "Warning",
    box: "border-amber-200 bg-amber-50/80 dark:border-amber-400/25 dark:bg-amber-400/[0.07]",
    iconClass: "text-amber-600 dark:text-amber-300",
  },
} as const;

export function Callout({
  type = "note",
  title,
  children,
}: {
  type?: keyof typeof styles;
  title?: string;
  children: ReactNode;
}) {
  const style = styles[type];
  const Icon = style.icon;
  return (
    <aside
      aria-label={title ?? style.label}
      className={`flex gap-3.5 rounded-xl border px-4 py-3.5 text-[0.95rem] leading-7 sm:px-5 sm:py-4 ${style.box}`}
    >
      <Icon className={`mt-1 h-[1.1rem] w-[1.1rem] shrink-0 ${style.iconClass}`} aria-hidden />
      <div className="min-w-0 [&>*+*]:mt-2 [&_p]:max-w-none">
        {title ? <p className="font-semibold text-[var(--docs-heading)]">{title}</p> : null}
        {children}
      </div>
    </aside>
  );
}
