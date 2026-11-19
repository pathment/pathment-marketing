import Link from "next/link";
import { ArrowRight, EyeOff, KeyRound, Lock, ShieldCheck, Sparkles, Trash2 } from "lucide-react";

/*
 * Only claims the product and the privacy policy already make. Do not add
 * certifications, hosting regions or integrations here until they are true.
 */
const trust = [
  { icon: ShieldCheck, label: "Access by role" },
  { icon: KeyRound, label: "Two-factor sign-in" },
  { icon: Lock, label: "Encrypted in transit" },
  { icon: EyeOff, label: "Data never sold" },
  { icon: Trash2, label: "Export or delete any time" },
  { icon: Sparkles, label: "Your own AI key" },
] as const;

/** A slim band of trust facts between the product story and the price. */
export function TrustStrip() {
  return (
    <section id="trust" aria-labelledby="trust-heading" className="lp-bg scroll-mt-20 border-y border-line">
      <div className="shell flex flex-col gap-6 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="shrink-0">
          <h2 id="trust-heading" className="lp-heading text-[1.35rem]">
            Your program&apos;s data stays yours.
          </h2>
          <Link
            href="/privacy"
            className="group mt-1 inline-flex items-center gap-1 text-[13px] font-semibold text-[var(--lp-green)]"
          >
            Read the privacy policy
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:flex lg:flex-wrap lg:justify-end lg:gap-x-7">
          {trust.map((item) => (
            <li key={item.label} className="inline-flex items-center gap-2 text-[13.5px] font-medium text-ink/85">
              <item.icon className="h-4 w-4 shrink-0 text-[var(--lp-green)]" />
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
